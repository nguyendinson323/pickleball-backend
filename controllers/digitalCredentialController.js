/**
 * Digital Credential Controller
 * 
 * This controller handles all digital credential operations including
 * creation, retrieval, verification, and updates for player digital IDs.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DigitalCredential, User, Club, Ranking } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS } = require('../config/constants');
const logger = require('../config/logger');
const QRCode = require('qrcode');

/**
 * Create a new digital credential for a player
 * @route POST /api/v1/digital-credentials
 * @access Private (Player)
 */
const createDigitalCredential = async (req, res) => {
  try {
    const { user_id } = req.user;
    
    // Check if user already has a digital credential
    const existingCredential = await DigitalCredential.findOne({
      where: { user_id }
    });

    if (existingCredential) {
      throw createError.conflict('User already has a digital credential');
    }

    // Get user information
    const user = await User.findByPk(user_id, {
      include: [
        { model: Club, as: 'club' },
        { model: Ranking, as: 'rankings', where: { category: 'singles' }, required: false }
      ]
    });

    if (!user) {
      throw createError.notFound('User not found');
    }

    if (user.user_type !== 'player') {
      throw createError.forbidden('Only players can create digital credentials');
    }

    // Generate unique credential number and verification code
    const credentialNumber = DigitalCredential.generateCredentialNumber();
    const verificationCode = DigitalCredential.generateVerificationCode();

    // Generate QR code data
    const qrCodeData = `${process.env.FRONTEND_URL || 'https://pickleball-federation.com'}/verify-credential/${verificationCode}`;
    
    // Generate QR code image
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

    // Determine club status
    const clubStatus = user.club_id ? 'club_member' : 'independent';
    const clubName = user.club ? user.club.name : null;

    // Get current ranking position
    const currentRanking = user.rankings && user.rankings.length > 0 ? user.rankings[0] : null;
    const rankingPosition = currentRanking ? currentRanking.position : null;

    // Create digital credential
    const digitalCredential = await DigitalCredential.create({
      user_id,
      credential_number: credentialNumber,
      verification_code: verificationCode,
      player_name: user.full_name || user.username,
      nrtp_level: user.skill_level,
      state_affiliation: user.state,
      nationality: 'Mexican', // Default for Mexican federation
      affiliation_status: user.is_active ? 'active' : 'inactive',
      ranking_position: rankingPosition,
      club_status: clubStatus,
      club_name: clubName,
      qr_code_url: qrCodeUrl,
      qr_code_data: qrCodeData,
      issued_date: new Date(),
      expiry_date: user.membership_expires_at,
      is_verified: true // Auto-verified for federation members
    });

    logger.info(`Digital credential created for user ${user_id}: ${credentialNumber}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DIGITAL_CREDENTIAL_CREATED,
      data: digitalCredential
    });
  } catch (error) {
    logger.error('Error in createDigitalCredential:', error);
    throw error;
  }
};

/**
 * Get digital credential for the authenticated user
 * @route GET /api/v1/digital-credentials/my-credential
 * @access Private (Player)
 */
const getMyDigitalCredential = async (req, res) => {
  try {
    const { user_id } = req.user;

    const digitalCredential = await DigitalCredential.findOne({
      where: { user_id },
      include: [
        { model: User, as: 'user', attributes: ['full_name', 'skill_level', 'state', 'club_id'] }
      ]
    });

    if (!digitalCredential) {
      throw createError.notFound('Digital credential not found');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DIGITAL_CREDENTIAL_RETRIEVED,
      data: digitalCredential
    });
  } catch (error) {
    logger.error('Error in getMyDigitalCredential:', error);
    throw error;
  }
};

/**
 * Get digital credential by verification code (public endpoint)
 * @route GET /api/v1/digital-credentials/verify/:verificationCode
 * @access Public
 */
const verifyDigitalCredential = async (req, res) => {
  try {
    const { verificationCode } = req.params;

    const digitalCredential = await DigitalCredential.findOne({
      where: { verification_code: verificationCode },
      include: [
        { model: User, as: 'user', attributes: ['full_name', 'skill_level', 'state', 'club_id', 'is_active'] }
      ]
    });

    if (!digitalCredential) {
      throw createError.notFound('Digital credential not found');
    }

    // Check if credential is active
    if (digitalCredential.affiliation_status !== 'active' || !digitalCredential.user.is_active) {
      throw createError.forbidden('Digital credential is not active');
    }

    // Update verification count and last verified date
    await digitalCredential.update({
      verification_count: digitalCredential.verification_count + 1,
      last_verified: new Date()
    });

    // Return public credential information
    const publicCredential = {
      credential_number: digitalCredential.credential_number,
      player_name: digitalCredential.player_name,
      nrtp_level: digitalCredential.nrtp_level,
      state_affiliation: digitalCredential.state_affiliation,
      nationality: digitalCredential.nationality,
      affiliation_status: digitalCredential.affiliation_status,
      ranking_position: digitalCredential.ranking_position,
      club_status: digitalCredential.club_status,
      club_name: digitalCredential.club_name,
      issued_date: digitalCredential.issued_date,
      federation_name: digitalCredential.federation_name,
      is_verified: digitalCredential.is_verified,
      last_verified: digitalCredential.last_verified
    };

    logger.info(`Digital credential verified: ${verificationCode}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DIGITAL_CREDENTIAL_VERIFIED,
      data: publicCredential
    });
  } catch (error) {
    logger.error('Error in verifyDigitalCredential:', error);
    throw error;
  }
};

/**
 * Update digital credential
 * @route PUT /api/v1/digital-credentials/:id
 * @access Private (Player)
 */
const updateDigitalCredential = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    const updateData = req.body;

    const digitalCredential = await DigitalCredential.findOne({
      where: { id, user_id }
    });

    if (!digitalCredential) {
      throw createError.notFound('Digital credential not found');
    }

    // Update allowed fields only
    const allowedFields = ['qr_code_url', 'qr_code_data', 'metadata'];
    const filteredData = {};
    
    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    });

    // Update the credential
    await digitalCredential.update(filteredData);

    logger.info(`Digital credential updated: ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DIGITAL_CREDENTIAL_UPDATED,
      data: digitalCredential
    });
  } catch (error) {
    logger.error('Error in updateDigitalCredential:', error);
    throw error;
  }
};

/**
 * Get all digital credentials (admin only)
 * @route GET /api/v1/digital-credentials
 * @access Private (Admin)
 */
const getAllDigitalCredentials = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      affiliation_status,
      state_affiliation,
      is_verified
    } = req.query;

    // Build where clause
    const whereClause = {};
    
    if (affiliation_status) {
      whereClause.affiliation_status = affiliation_status;
    }
    
    if (state_affiliation) {
      whereClause.state_affiliation = state_affiliation;
    }
    
    if (is_verified !== undefined) {
      whereClause.is_verified = is_verified === 'true';
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get credentials with pagination
    const { count, rows: credentials } = await DigitalCredential.findAndCountAll({
      where: whereClause,
      include: [
        { model: User, as: 'user', attributes: ['full_name', 'email', 'user_type'] }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DIGITAL_CREDENTIALS_RETRIEVED,
      data: {
        credentials,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getAllDigitalCredentials:', error);
    throw error;
  }
};

/**
 * Regenerate QR code for a digital credential
 * @route POST /api/v1/digital-credentials/:id/regenerate-qr
 * @access Private (Player)
 */
const regenerateQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;

    const digitalCredential = await DigitalCredential.findOne({
      where: { id, user_id }
    });

    if (!digitalCredential) {
      throw createError.notFound('Digital credential not found');
    }

    // Generate new QR code data and image
    const qrCodeData = digitalCredential.generateQRCodeData();
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

    // Update the credential
    await digitalCredential.update({
      qr_code_url: qrCodeUrl,
      qr_code_data: qrCodeData
    });

    logger.info(`QR code regenerated for credential: ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.QR_CODE_REGENERATED,
      data: {
        qr_code_url: qrCodeUrl,
        qr_code_data: qrCodeData
      }
    });
  } catch (error) {
    logger.error('Error in regenerateQRCode:', error);
    throw error;
  }
};

module.exports = {
  createDigitalCredential,
  getMyDigitalCredential,
  verifyDigitalCredential,
  updateDigitalCredential,
  getAllDigitalCredentials,
  regenerateQRCode
}; 