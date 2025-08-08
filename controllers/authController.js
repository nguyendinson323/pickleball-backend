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
  USER_ROLES,
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
      userType: user.user_type, 
      role: user.role 
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
      first_name,
      last_name,
      date_of_birth,
      gender,
      state,
      city,
      phone,
      skill_level,
      curp,
      business_name,
      contact_person,
      rfc,
      website
    } = req.body;
    
    // Log received data for debugging
    logger.info('Registration attempt:', {
      user_type,
      username,
      email,
      hasPassword: !!password,
      hasFirstName: !!first_name,
      hasLastName: !!last_name,
      hasDateOfBirth: !!date_of_birth,
      hasBusinessName: !!business_name,
      hasContactPerson: !!contact_person
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
      throw createError.conflict(
        'User already exists',
        existingUser.email === email.toLowerCase() ? 'Email already registered' : 'Username already taken'
      );
    }

    // Validate user type specific requirements
    if (user_type === USER_TYPES.PLAYER || user_type === USER_TYPES.COACH) {
      const missingFields = [];
      if (!first_name) missingFields.push('first_name');
      if (!last_name) missingFields.push('last_name');
      if (!date_of_birth) missingFields.push('date_of_birth');
      
      if (missingFields.length > 0) {
        logger.error('Validation failed for player/coach:', {
          user_type,
          first_name: !!first_name,
          last_name: !!last_name,
          date_of_birth: !!date_of_birth,
          missingFields,
          receivedData: { first_name, last_name, date_of_birth }
        });
        throw createError.validation(`Missing required fields for ${user_type}: ${missingFields.join(', ')}`);
      }
    }

    if (user_type === USER_TYPES.CLUB || user_type === USER_TYPES.PARTNER || user_type === USER_TYPES.STATE) {
      const missingFields = [];
      if (!business_name) missingFields.push('business_name');
      if (!contact_person) missingFields.push('contact_person');
      
      if (missingFields.length > 0) {
        logger.error('Validation failed for organization:', {
          user_type,
          business_name: !!business_name,
          contact_person: !!contact_person,
          missingFields,
          receivedData: { business_name, contact_person }
        });
        throw createError.validation(`Missing required fields for ${user_type}: ${missingFields.join(', ')}`);
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await User.create({
      user_type,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password_hash: passwordHash,
      first_name,
      last_name,
      date_of_birth,
      gender,
      state,
      city,
      phone,
      skill_level,
      curp,
      business_name,
      contact_person,
      rfc,
      website,
      email_verification_token: emailVerificationToken,
      email_verification_expires_at: emailVerificationExpires,
      role: user_type === 'super_admin' ? 'super_admin' : 'user'
    });

    // Send verification email
    try {
      await sendEmail({
        to: user.email,
        template: 'verification',
        data: {
          name: user.getDisplayName(),
          verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`
        }
      });
    } catch (emailError) {
      logger.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails
    }

    // Generate tokens
    const tokens = generateTokens(user);

    // Remove sensitive data from response
    const userResponse = {
      id: user.id,
      user_type: user.user_type,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      full_name: user.full_name,
      state: user.state,
      city: user.city,
      skill_level: user.skill_level,
      membership_status: user.membership_status,
      email_verified: user.email_verified,
      is_active: user.is_active,
      created_at: user.created_at
    };

    logger.info(`New user registered: ${user.email} (${user.user_type})`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_CREATED,
      data: {
        user: userResponse,
        tokens
      }
    });

  } catch (error) {
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

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      throw createError.unauthorized(API_MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    // Check if account is locked
    if (user.locked_until && new Date() < user.locked_until) {
      const remainingTime = Math.ceil((user.locked_until - new Date()) / 1000 / 60);
      throw createError.forbidden(`Account is temporarily locked. Try again in ${remainingTime} minutes.`);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      // Increment login attempts
      user.login_attempts += 1;
      await user.save();

      throw createError.unauthorized(API_MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    // Reset login attempts on successful login
    if (user.login_attempts > 0) {
      user.login_attempts = 0;
      user.locked_until = null;
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Generate tokens
    const tokens = generateTokens(user);

    // Remove sensitive data from response
    const userResponse = {
      id: user.id,
      user_type: user.user_type,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      full_name: user.full_name,
      state: user.state,
      city: user.city,
      skill_level: user.skill_level,
      membership_status: user.membership_status,
      email_verified: user.email_verified,
      is_active: user.is_active,
      role: user.role
    };

    logger.info(`User logged in: ${user.email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.LOGIN_SUCCESS,
      data: {
        user: userResponse,
        tokens
      }
    });

  } catch (error) {
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
    
    // Find user
    const user = await User.findByPk(decoded.userId);
    if (!user || !user.is_active) {
      throw createError.unauthorized('Invalid refresh token');
    }

    // Generate new tokens
    const tokens = generateTokens(user);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Token refreshed successfully',
      data: { tokens }
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      throw createError.unauthorized('Invalid refresh token');
    }
    throw error;
  }
};

/**
 * Logout user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logout = async (req, res) => {
  try {
    // In a more complex implementation, you might want to blacklist the token
    // For now, we'll just return a success response
    // The client should remove the token from storage

    logger.info(`User logged out: ${req.user.email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.LOGOUT_SUCCESS
    });

  } catch (error) {
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

    // Find user with this verification token
    const user = await User.findOne({
      where: {
        email_verification_token: token,
        email_verification_expires_at: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!user) {
      throw createError.badRequest('Invalid or expired verification token');
    }

    // Mark email as verified
    user.email_verified = true;
    user.email_verification_token = null;
    user.email_verification_expires_at = null;
    await user.save();

    logger.info(`Email verified for user: ${user.email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
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

    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists or not
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'If the email exists, a password reset link has been sent'
      });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.password_reset_token = resetToken;
    user.password_reset_expires_at = resetExpires;
    await user.save();

    // Send password reset email
    try {
      await sendEmail({
        to: user.email,
        template: 'password_reset',
        data: {
          name: user.getDisplayName(),
          resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
        }
      });
    } catch (emailError) {
      logger.error('Failed to send password reset email:', emailError);
      throw createError.server('Failed to send password reset email');
    }

    logger.info(`Password reset requested for: ${user.email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'If the email exists, a password reset link has been sent'
    });

  } catch (error) {
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

    // Find user with this reset token
    const user = await User.findOne({
      where: {
        password_reset_token: token,
        password_reset_expires_at: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!user) {
      throw createError.badRequest('Invalid or expired reset token');
    }

    // Hash and update password
    const passwordHash = await bcrypt.hash(password, 12);
    user.password_hash = passwordHash;
    user.password_reset_token = null;
    user.password_reset_expires_at = null;
    user.login_attempts = 0;
    user.locked_until = null;
    await user.save();

    logger.info(`Password reset for user: ${user.email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Get current user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    // Remove sensitive data
    const userResponse = {
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
      phone: user.phone,
      skill_level: user.skill_level,
      curp: user.curp,
      business_name: user.business_name,
      contact_person: user.contact_person,
      rfc: user.rfc,
      website: user.website,
      profile_photo: user.profile_photo,
      membership_status: user.membership_status,
      membership_expires_at: user.membership_expires_at,
      email_verified: user.email_verified,
      is_active: user.is_active,
      is_verified: user.is_verified,
      role: user.role,
      preferences: user.preferences,
      last_login: user.last_login,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { user: userResponse }
    });

  } catch (error) {
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
    const user = req.user;
    const updateData = req.body;

    // Remove fields that shouldn't be updated via this endpoint
    delete updateData.password_hash;
    delete updateData.email;
    delete updateData.username;
    delete updateData.user_type;
    delete updateData.role;
    delete updateData.membership_status;

    // Update user
    await user.update(updateData);

    // Remove sensitive data from response
    const userResponse = {
      id: user.id,
      user_type: user.user_type,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      full_name: user.full_name,
      state: user.state,
      city: user.city,
      skill_level: user.skill_level,
      membership_status: user.membership_status,
      email_verified: user.email_verified,
      is_active: user.is_active,
      updated_at: user.updated_at
    };

    logger.info(`Profile updated for user: ${user.email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_UPDATED,
      data: { user: userResponse }
    });

  } catch (error) {
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