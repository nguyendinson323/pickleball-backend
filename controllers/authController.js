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

    // Handle file uploads
    const profile_photo = req.files?.profile_photo?.[0];
    const verification_document = req.files?.verification_document?.[0];

    // Log received data for debugging
    // logger.info('Registration attempt:', {
    //   user_type,
    //   username,
    //   email,
    //   hasPassword: !!password,
    //   hasFullName: !!full_name,
    //   hasDateOfBirth: !!date_of_birth,
    //   hasBusinessName: !!business_name,
    //   hasContactPerson: !!contact_person
    // });

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

    // Remove sensitive data from response
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      user_type: user.user_type,
      email_verified: user.email_verified,
      is_active: user.is_active,
      created_at: user.created_at
    };

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
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw createError.validation('Email and password are required');
    }

    // Find user by email
          const user = await User.findOne({
        where: { email: email.toLowerCase() }
      });
      
      if (!user) {
      throw createError.unauthorized('Invalid credentials');
    }


    // Check if account is locked
    if (user.locked_until && new Date() < user.locked_until) {
      throw createError.forbidden('Account is temporarily locked. Please try again later.');
    }
    
    // Check if account is active
    if (!user.is_active) {
      throw createError.forbidden('Account is deactivated');
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
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
    const { accessToken, refreshToken } = generateTokens(user);

    // Remove sensitive data from response
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      user_type: user.user_type,
      email_verified: user.email_verified,
      is_active: user.is_active,
      membership_status: user.membership_status,
      last_login: user.last_login
    };

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
  } catch (error) {
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

    // Get fresh user data
    const userProfile = await User.findByPk(user.id, {
      attributes: { exclude: ['password_hash', 'email_verification_token', 'password_reset_token'] }
    });

    if (!userProfile) {
      throw createError.notFound('User not found');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PROFILE_RETRIEVED,
      data: { user: userProfile }
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

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PROFILE_UPDATED,
      data: { user: updatedUser }
    });
  } catch (error) {
    logger.error('Error in updateProfile:', error);
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
  updateProfile
}; 