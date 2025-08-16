/**
 * Authentication Routes
 * 
 * This file defines all authentication-related routes including
 * registration, login, password reset, and email verification.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Import controllers and middleware
const authController = require('../controllers/authController');
const { 
  authenticateToken, 
  checkLoginAttempts,
  requireEmailVerification 
} = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');
const { registrationUpload, handleUploadError } = require('../middlewares/fileUpload');

// Validation schemas
const registerValidation = [
  body('user_type')
    .isIn(['player', 'coach', 'club', 'partner', 'state', 'federation'])
    .withMessage('Invalid user type'),
  body('username')
    .isLength({ min: 3, max: 50 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-50 characters and contain only letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must be at least 8 characters and contain uppercase, lowercase, number, and special character'),
  body('full_name')
    .optional()
    .isLength({ min: 2, max: 200 })
    .withMessage('Full name must be 2-200 characters'),
  body('date_of_birth')
    .optional()
    .isISO8601()
    .withMessage('Valid date of birth is required'),
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other', 'prefer_not_to_say'])
    .withMessage('Invalid gender'),
  body('state')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('State must be 2-100 characters'),
  body('city')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be 2-100 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Valid phone number is required'),
  body('skill_level')
    .optional()
    .isIn(['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'])
    .withMessage('Invalid skill level'),
  body('curp')
    .optional()
    .isLength({ min: 18, max: 18 })
    .withMessage('CURP must be exactly 18 characters'),
  body('business_name')
    .optional()
    .isLength({ min: 2, max: 200 })
    .withMessage('Business name must be 2-200 characters'),
  body('contact_person')
    .optional()
    .isLength({ min: 2, max: 200 })
    .withMessage('Contact person must be 2-200 characters'),
  body('rfc')
    .optional()
    .isLength({ min: 12, max: 13 })
    .withMessage('RFC must be 12-13 characters'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Valid website URL is required'),
  body('privacy_policy_accepted')
    .isBoolean()
    .custom((value) => {
      if (!value) {
        throw new Error('You must accept the privacy policy to register');
      }
      return true;
    })
    .withMessage('You must accept the privacy policy to register')
];

const passwordResetValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required')
];

const resetPasswordValidation = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must be at least 8 characters and contain uppercase, lowercase, number, and special character')
];

const refreshTokenValidation = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
];

const updateProfileValidation = [
  body('date_of_birth')
    .optional()
    .isISO8601()
    .withMessage('Valid date of birth is required'),
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other', 'prefer_not_to_say'])
    .withMessage('Invalid gender'),
  body('state')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('State must be 2-100 characters'),
  body('city')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be 2-100 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Valid phone number is required'),
  body('skill_level')
    .optional()
    .isIn(['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'])
    .withMessage('Invalid skill level'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Valid website URL is required')
];

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', 
  registrationUpload, 
  handleUploadError,
  registerValidation, 
  asyncHandler(authController.register)
);

/**
 * @route   POST /auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', asyncHandler(authController.login));

/**
 * @route   POST /auth/refresh-token
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh-token', refreshTokenValidation, asyncHandler(authController.refreshToken));

/**
 * @route   POST /auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticateToken, asyncHandler(authController.logout));

/**
 * @route   GET /auth/verify-email/:token
 * @desc    Verify email address
 * @access  Public
 */
router.get('/verify-email/:token', asyncHandler(authController.verifyEmail));

/**
 * @route   POST /auth/request-password-reset
 * @desc    Request password reset
 * @access  Public
 */
router.post('/request-password-reset', passwordResetValidation, asyncHandler(authController.requestPasswordReset));

/**
 * @route   POST /auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', resetPasswordValidation, asyncHandler(authController.resetPassword));

/**
 * @route   GET /auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authenticateToken, asyncHandler(authController.getProfile));

/**
 * @route   PUT /auth/profile
 * @desc    Update current user profile
 * @access  Private
 */
router.put('/profile', authenticateToken, updateProfileValidation, asyncHandler(authController.updateProfile));

module.exports = router; 