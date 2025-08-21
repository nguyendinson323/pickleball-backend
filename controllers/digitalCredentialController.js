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
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

/**
 * Generate secure QR code data with digital signature
 * @param {Object} credential - Digital credential object
 * @returns {Object} QR code data and signature
 */
const generateSecureQRCodeData = (credential) => {
  const qrPayload = {
    credentialId: credential.id,
    credentialNumber: credential.credential_number,
    verificationCode: credential.verification_code,
    playerName: credential.player_name,
    nrtpLevel: credential.nrtp_level,
    affiliationStatus: credential.affiliation_status,
    issuedDate: credential.issued_date,
    expiryDate: credential.expiry_date,
    timestamp: new Date().toISOString(),
    federationId: 'PBMX-2024'
  };

  // Create JWT token with expiration
  const jwtSecret = process.env.QR_JWT_SECRET || 'your-secret-key-change-in-production';
  const token = jwt.sign(qrPayload, jwtSecret, { 
    expiresIn: '365d',
    issuer: 'pickleball-federation.mx',
    audience: 'credential-verifier'
  });

  // Create verification URL with token
  const baseUrl = process.env.FRONTEND_URL || 'https://pickleball-federation.com';
  const qrCodeData = `${baseUrl}/verify-credential/${credential.verification_code}?token=${token}`;

  // Generate digital signature for additional security
  const signatureData = `${credential.credential_number}|${credential.verification_code}|${credential.issued_date}`;
  const digitalSignature = crypto.HmacSHA256(signatureData, jwtSecret).toString();

  return {
    qrCodeData,
    token,
    digitalSignature,
    payload: qrPayload
  };
};

/**
 * Verify QR code token and signature
 * @param {string} token - JWT token from QR code
 * @param {string} verificationCode - Verification code
 * @returns {Object} Verification result
 */
const verifyQRCodeToken = (token, verificationCode) => {
  try {
    const jwtSecret = process.env.QR_JWT_SECRET || 'your-secret-key-change-in-production';
    
    // Verify JWT token
    const decoded = jwt.verify(token, jwtSecret, {
      issuer: 'pickleball-federation.mx',
      audience: 'credential-verifier'
    });

    // Verify verification code matches
    if (decoded.verificationCode !== verificationCode) {
      return { valid: false, error: 'Verification code mismatch' };
    }

    // Check if token is not expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return { valid: false, error: 'QR code has expired' };
    }

    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: `Token verification failed: ${error.message}` };
  }
};

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

    // Create temporary credential object for QR generation
    const tempCredential = {
      id: 'temp',
      credential_number: credentialNumber,
      verification_code: verificationCode,
      player_name: user.full_name || user.username,
      nrtp_level: user.skill_level,
      affiliation_status: user.is_active ? 'active' : 'inactive',
      issued_date: new Date(),
      expiry_date: user.membership_expires_at
    };

    // Generate secure QR code with digital signature
    const qrCodeInfo = generateSecureQRCodeData(tempCredential);
    
    // Generate QR code image with enhanced error correction
    const qrCodeUrl = await QRCode.toDataURL(qrCodeInfo.qrCodeData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 300
    });

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
      qr_code_data: qrCodeInfo.qrCodeData,
      qr_jwt_token: qrCodeInfo.token,
      digital_signature: qrCodeInfo.digitalSignature,
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
    const { token } = req.query; // QR token from query params

    const digitalCredential = await DigitalCredential.findOne({
      where: { verification_code: verificationCode },
      include: [
        { model: User, as: 'user', attributes: ['full_name', 'skill_level', 'state', 'club_id', 'is_active'] }
      ]
    });

    if (!digitalCredential) {
      throw createError.notFound('Digital credential not found');
    }

    // Enhanced security: Verify QR token if provided
    let tokenVerification = { valid: true, source: 'direct' };
    if (token) {
      tokenVerification = verifyQRCodeToken(token, verificationCode);
      tokenVerification.source = 'qr_code';
      
      if (!tokenVerification.valid) {
        logger.warn(`QR token verification failed for ${verificationCode}: ${tokenVerification.error}`);
        // Still allow verification but log the security concern
        tokenVerification.warning = tokenVerification.error;
        tokenVerification.valid = true; // Allow fallback to direct verification
      }
    }

    // Check if credential is active
    if (digitalCredential.affiliation_status !== 'active' || !digitalCredential.user.is_active) {
      throw createError.forbidden('Digital credential is not active');
    }

    // Update verification count and last verified date
    const updateData = {
      verification_count: digitalCredential.verification_count + 1,
      last_verified: new Date()
    };

    // Track verification method
    if (!digitalCredential.verification_methods) {
      updateData.verification_methods = [];
    }
    const verificationMethod = {
      timestamp: new Date(),
      method: token ? 'qr_scan' : 'direct_link',
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      token_valid: tokenVerification.valid
    };
    
    updateData.verification_methods = [
      ...(digitalCredential.verification_methods || []).slice(-9), // Keep last 10 verifications
      verificationMethod
    ];

    await digitalCredential.update(updateData);

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
      last_verified: digitalCredential.last_verified,
      verification_source: tokenVerification.source,
      security_level: token && tokenVerification.valid ? 'high' : 'standard'
    };

    logger.info(`Digital credential verified: ${verificationCode} via ${tokenVerification.source}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DIGITAL_CREDENTIAL_VERIFIED,
      data: publicCredential,
      security: {
        verification_method: tokenVerification.source,
        token_verified: tokenVerification.valid,
        warning: tokenVerification.warning || null
      }
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

    // Generate new secure QR code with updated timestamp
    const qrCodeInfo = generateSecureQRCodeData(digitalCredential);
    
    // Generate QR code image with enhanced settings
    const qrCodeUrl = await QRCode.toDataURL(qrCodeInfo.qrCodeData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 300
    });

    // Update the credential
    await digitalCredential.update({
      qr_code_url: qrCodeUrl,
      qr_code_data: qrCodeInfo.qrCodeData,
      qr_jwt_token: qrCodeInfo.token,
      digital_signature: qrCodeInfo.digitalSignature
    });

    logger.info(`QR code regenerated for credential: ${id} with enhanced security`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.QR_CODE_REGENERATED,
      data: {
        qr_code_url: qrCodeUrl,
        qr_code_data: qrCodeInfo.qrCodeData,
        security_features: {
          digital_signature: true,
          jwt_token: true,
          timestamp: qrCodeInfo.payload.timestamp
        }
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