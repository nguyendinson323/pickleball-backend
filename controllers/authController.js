/**
 * Authentication Controller
 * 
 * This controller handles user authentication, registration, and token management.
 * It includes login, register, password reset, and email verification functionality.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User } = require('../db/models');
const { Op } = require('sequelize');
const { 
  API_MESSAGES, 
  HTTP_STATUS, 
  USER_TYPES, 
  JWT_EXPIRATION 
} = require('../config/constants');
const { createError } = require('../middlewares/errorHandler');
const { sendEmail } = require('../services/emailService');
const logger = require('../config/logger');
const fs = require('fs');
const path = require('path');

/**
 * Helper function to create consistent user response (excluding sensitive data)
 * This ensures that all user types (player, coach, club, partner, state, admin) 
 * receive their complete profile information in all API responses, while 
 * maintaining security by excluding sensitive fields like passwords and tokens.
 * 
 * @param {Object} user - User object from database
 * @returns {Object} - Cleaned user response object with all profile fields
 */
const createUserResponse = (user) => {
  return {
    id: user.id,
    user_type: user.user_type,
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    full_name: user.full_name,
    date_of_birth: user.date_of_birth,
    age: user.age,
    gender: user.gender,
    state: user.state,
    city: user.city,
    address: user.address,
    latitude: user.latitude,
    longitude: user.longitude,
    phone: user.phone,
    whatsapp: user.whatsapp,
    skill_level: user.skill_level,
    curp: user.curp,
    rfc: user.rfc,
    business_name: user.business_name,
    contact_person: user.contact_person,
    job_title: user.job_title,
    website: user.website,
    social_media: user.social_media,
    profile_photo: user.profile_photo,
    logo: user.logo,
    membership_status: user.membership_status,
    membership_expires_at: user.membership_expires_at,
    subscription_plan: user.subscription_plan,
    email_verified: user.email_verified,
    last_login: user.last_login,
    preferences: user.preferences,
    is_active: user.is_active,
    is_verified: user.is_verified,
    verification_documents: user.verification_documents,
    notes: user.notes,
    can_be_found: user.can_be_found,
    club_id: user.club_id,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
};

/**
 * Generate JWT tokens
 * @param {Object} user - User object
 * @returns {Object} Tokens object
 */
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { 
      userId: user.id, 
      userType: user.user_type
    },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRATION.ACCESS_TOKEN }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: JWT_EXPIRATION.REFRESH_TOKEN }
  );

  return { accessToken, refreshToken };
};

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const register = async (req, res) => {
  try {
    const {
      user_type,
      username,
      email,
      password,
      full_name,
      date_of_birth,
      gender,
      phone,
      bio,
      skill_level,
      state,
      city,
      address,
      latitude,
      longitude,
      timezone,
      business_name,
      contact_person,
      job_title,
      curp,
      rfc,
      website,
      privacy_policy_accepted
    } = req.body;

    // Handle file uploads - ONLY use files processed by multer
    const profile_photo = req.files?.profile_photo?.[0];
    const verification_document = req.files?.verification_document?.[0];

    // Log received data for debugging
    logger.info('Registration attempt:', {
      user_type,
      username,
      email,
      hasPassword: !!password,
      hasFullName: !!full_name,
      hasDateOfBirth: !!date_of_birth,
      hasBusinessName: !!business_name,
      hasContactPerson: !!contact_person,
      privacy_policy_accepted,
      privacy_policy_accepted_type: typeof privacy_policy_accepted,
      req_body_keys: Object.keys(req.body),
      req_files_keys: req.files ? Object.keys(req.files) : 'no files',
      hasProfilePhoto: !!profile_photo,
      hasVerificationDocument: !!verification_document,
      profile_photo_filename: profile_photo?.filename,
      verification_document_filename: verification_document?.filename,
      contentType: req.headers['content-type']
    });

    // Validate basic required fields
    const basicRequiredFields = [];
    if (!user_type) basicRequiredFields.push('user_type');
    if (!username) basicRequiredFields.push('username');
    if (!email) basicRequiredFields.push('email');
    if (!password) basicRequiredFields.push('password');
    
    if (basicRequiredFields.length > 0) {
      throw createError.validation(`Missing required fields: ${basicRequiredFields.join(', ')}`);
    }

    // Validate user type specific required fields
    if (['player', 'coach', 'admin'].includes(user_type)) {
      if (!full_name) {
        throw createError.validation('full_name is required for this user type');
      }
      
      // Require privacy policy acceptance for players and coaches
      if (!privacy_policy_accepted) {
        throw createError.validation('You must accept the privacy policy to register');
      }
      
      // Require verification document for players and coaches
      if (!verification_document) {
        throw createError.validation('Verification document (INE or passport) is required for registration');
      }
    }
    
    if (['club', 'partner', 'state'].includes(user_type)) {
      if (!business_name) {
        throw createError.validation('business_name is required for this user type');
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      throw createError.conflict('User with this email or username already exists');
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Generate email verification token
    const email_verification_token = crypto.randomBytes(32).toString('hex');
    const email_verification_expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user data object
    const userData = {
      user_type,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password_hash,
      full_name,
      date_of_birth,
      gender,
      phone,
      profile_photo: profile_photo ? `/uploads/profile-photos/${profile_photo.filename}` : null,
      bio,
      skill_level,
      state,
      city,
      address,
      latitude,
      longitude,
      timezone,
      business_name,
      contact_person,
      job_title,
      curp,
      rfc,
      website,
      verification_documents: verification_document ? {
        id_document: {
          filename: verification_document.filename,
          originalName: verification_document.originalname,
          mimetype: verification_document.mimetype,
          path: `/uploads/verification-documents/${verification_document.filename}`,
          uploadedAt: new Date()
        }
      } : null,
      email_verification_token,
      email_verification_expires_at,
      membership_status: 'free',
      email_verified: false,
      is_active: true,
      is_verified: false,
      login_attempts: 0,
      can_be_found: true // Default to visible for new players
    };

    // Create user
    const user = await User.create(userData);

    // Send email verification
    try {
      await sendEmail({
        to: email,
        template: 'emailVerification',
        data: {
          username: user.username,
          verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${email_verification_token}`
        }
      });
    } catch (emailError) {
      logger.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Send complete user data (excluding sensitive fields)
    const userResponse = createUserResponse(user);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_REGISTERED,
      data: {
        user: userResponse,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    logger.error('Error in register:', error);
    throw error;
  }
};

/**
 * Login user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = async (req, res) => {
  try {
    console.log('=== LOGIN DEBUG ===');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    const { email, password } = req.body;
    
    console.log('Email:', email);
    console.log('Password provided:', !!password);
    
    if (!email || !password) {
      throw createError.validation('Email and password are required');
    }

    console.log('✅ Basic validation passed');
    
    // Find user by email
    const user = await User.findOne({
      where: { email: email.toLowerCase() }
    });
    
    console.log('User found:', !!user);
    
    if (!user) {
      throw createError.unauthorized('Invalid credentials');
    }


    // Check if account is locked
    if (user.locked_until && new Date() < user.locked_until) {
      console.log('❌ Account is locked');
      throw createError.forbidden('Account is temporarily locked. Please try again later.');
    }
    
    // Check if account is active
    if (!user.is_active) {
      console.log('❌ Account is deactivated');
      throw createError.forbidden('Account is deactivated');
    }
    
    console.log('✅ Account status checks passed');
    
    // Verify password
    console.log('🔐 Verifying password...');
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password');
      // Increment login attempts
      const newLoginAttempts = user.login_attempts + 1;
      const updateData = { login_attempts: newLoginAttempts };
      
      // Lock account after 5 failed attempts
      if (newLoginAttempts >= 5) {
        updateData.locked_until = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
      }
      
      await User.update(updateData, { where: { id: user.id } });
      
      throw createError.unauthorized('Invalid credentials');
    }
    
    console.log('✅ Password verified successfully');
    
    // Reset login attempts on successful login
    if (user.login_attempts > 0) {
      await User.update(
        { 
          login_attempts: 0, 
          locked_until: null,
          last_login: new Date()
        },
        { where: { id: user.id } }
      );
    } else {
      await User.update(
        { last_login: new Date() },
        { where: { id: user.id } }
      );
    }

    // Generate tokens
    console.log('🎫 Generating tokens...');
    const { accessToken, refreshToken } = generateTokens(user);
    console.log('✅ Tokens generated');

    // Send complete user data (excluding sensitive fields)
    const userResponse = createUserResponse(user);

    console.log('📤 Sending response...');
    console.log('User response:', userResponse);
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_LOGGED_IN,
      data: {
        user: userResponse,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
    
    console.log('✅ Login completed successfully');
    console.log('=== END LOGIN DEBUG ===');
  } catch (error) {
    console.log('❌ Login error:', error);
    console.log('=== END LOGIN DEBUG ===');
    logger.error('Error in login:', error);
    throw error;
  }
};

/**
 * Refresh access token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw createError.unauthorized('Refresh token is required');
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Get user
    const user = await User.findByPk(decoded.userId);
    
    if (!user || !user.is_active) {
      throw createError.unauthorized('Invalid refresh token');
    }

    // Generate new tokens
    const tokens = generateTokens(user);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.TOKEN_REFRESHED,
      data: { tokens }
    });
  } catch (error) {
    logger.error('Error in refreshToken:', error);
    throw createError.unauthorized('Invalid refresh token');
  }
};

/**
 * Logout user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logout = async (req, res) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // by removing the token from storage
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_LOGGED_OUT
    });
  } catch (error) {
    logger.error('Error in logout:', error);
    throw error;
  }
};

/**
 * Verify email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      throw createError.validation('Verification token is required');
    }

    // Find user with this token
    const user = await User.findOne({
      where: {
        email_verification_token: token,
        email_verification_expires_at: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      throw createError.badRequest('Invalid or expired verification token');
    }

    // Update user
    await User.update(
      {
        email_verified: true,
        email_verification_token: null,
        email_verification_expires_at: null
      },
      { where: { id: user.id } }
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.EMAIL_VERIFIED
    });
  } catch (error) {
    logger.error('Error in verifyEmail:', error);
    throw error;
  }
};

/**
 * Request password reset
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createError.validation('Email is required');
    }

    // Find user
    const user = await User.findOne({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      // Don't reveal if user exists or not
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent'
      });
      return;
    }

    // Generate reset token
    const password_reset_token = crypto.randomBytes(32).toString('hex');
    const password_reset_expires_at = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Update user
    await User.update(
      {
        password_reset_token,
        password_reset_expires_at
      },
      { where: { id: user.id } }
    );

    // Send reset email
    try {
      await sendEmail({
        to: email,
        template: 'passwordReset',
        data: {
          username: user.username,
          resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${password_reset_token}`
        }
      });
    } catch (emailError) {
      logger.error('Failed to send password reset email:', emailError);
      throw createError.server('Failed to send password reset email');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'If an account with this email exists, a password reset link has been sent'
    });
  } catch (error) {
    logger.error('Error in requestPasswordReset:', error);
    throw error;
  }
};

/**
 * Reset password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      throw createError.validation('Token and new password are required');
    }

    if (password.length < 6) {
      throw createError.validation('Password must be at least 6 characters long');
    }

    // Find user with this token
    const user = await User.findOne({
      where: {
        password_reset_token: token,
        password_reset_expires_at: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      throw createError.badRequest('Invalid or expired reset token');
    }

    // Hash new password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Update user
    await User.update(
      {
        password_hash,
        password_reset_token: null,
        password_reset_expires_at: null
      },
      { where: { id: user.id } }
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PASSWORD_RESET
    });
  } catch (error) {
    logger.error('Error in resetPassword:', error);
    throw error;
  }
};

/**
 * Get user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getProfile = async (req, res) => {
  try {
    const { user } = req;

    // Get fresh user data with club information if available
    const userProfile = await User.findByPk(user.id, {
      attributes: { exclude: ['password_hash', 'email_verification_token', 'password_reset_token'] },
      include: [
        {
          model: require('../db/models').Club,
          as: 'club',
          attributes: ['id', 'name', 'city', 'state', 'club_type', 'description'],
          required: false
        }
      ]
    });

    if (!userProfile) {
      throw createError.notFound('User not found');
    }

    // Send complete user data (excluding sensitive fields)
    const userResponse = createUserResponse(userProfile);

    // Add club information if available
    if (userProfile.club) {
      userResponse.club = userProfile.club;
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PROFILE_RETRIEVED,
      data: userResponse
    });
  } catch (error) {
    logger.error('Error in getProfile:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateProfile = async (req, res) => {
  try {
    const { user } = req;
    const {
      full_name,
      date_of_birth,
      gender,
      phone,
      profile_photo,
      bio,
      skill_level,
      state,
      city,
      address,
      latitude,
      longitude,
      timezone,
      business_name,
      contact_person,
      job_title,
      curp,
      rfc,
      website,
      can_be_found
    } = req.body;

    // Get current user
    const currentUser = await User.findByPk(user.id);
    
    if (!currentUser) {
      throw createError.notFound('User not found');
    }

    // Prepare update data
    const updateData = {};
    
    if (full_name !== undefined) updateData.full_name = full_name;
    if (date_of_birth !== undefined) updateData.date_of_birth = date_of_birth;
    if (gender !== undefined) updateData.gender = gender;
    if (phone !== undefined) updateData.phone = phone;
    if (profile_photo !== undefined) updateData.profile_photo = profile_photo;
    if (bio !== undefined) updateData.bio = bio;
    if (skill_level !== undefined) updateData.skill_level = skill_level;
    if (state !== undefined) updateData.state = state;
    if (city !== undefined) updateData.city = city;
    if (address !== undefined) updateData.address = address;
    if (latitude !== undefined) updateData.latitude = latitude;
    if (longitude !== undefined) updateData.longitude = longitude;
    if (timezone !== undefined) updateData.timezone = timezone;
    if (business_name !== undefined) updateData.business_name = business_name;
    if (contact_person !== undefined) updateData.contact_person = contact_person;
    if (job_title !== undefined) updateData.job_title = job_title;
    if (curp !== undefined) updateData.curp = curp;
    if (rfc !== undefined) updateData.rfc = rfc;
    if (website !== undefined) updateData.website = website;
    if (can_be_found !== undefined) updateData.can_be_found = can_be_found;

    // Update user
    await User.update(updateData, { where: { id: user.id } });

    // Get updated user
    const updatedUser = await User.findByPk(user.id, {
      attributes: { exclude: ['password_hash', 'email_verification_token', 'password_reset_token'] }
    });

    // Send complete user data (excluding sensitive fields)
    const userResponse = createUserResponse(updatedUser);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PROFILE_UPDATED,
      data: userResponse
    });
  } catch (error) {
    logger.error('Error in updateProfile:', error);
    throw error;
  }
};

/**
 * Upload profile photo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const uploadProfilePhoto = async (req, res) => {
  try {
    const { user } = req;
    const profile_photo = req.file;

    if (!profile_photo) {
      throw createError.validation('Profile photo is required');
    }

    // Get current user
    const currentUser = await User.findByPk(user.id);
    
    if (!currentUser) {
      throw createError.notFound('User not found');
    }

    // Delete old profile photo if it exists
    if (currentUser.profile_photo) {
      const oldPhotoPath = path.join(__dirname, '..', currentUser.profile_photo);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    // Update profile photo path
    const photoPath = `/uploads/profile-photos/${profile_photo.filename}`;
    await User.update({ profile_photo: photoPath }, { where: { id: user.id } });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Profile photo uploaded successfully',
      data: { 
        profile_photo: photoPath,
        filename: profile_photo.filename
      }
    });
  } catch (error) {
    logger.error('Error in uploadProfilePhoto:', error);
    throw error;
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  getProfile,
  updateProfile,
  uploadProfilePhoto
}; 