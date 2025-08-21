/**
 * Authentication Middleware
 * 
 * This middleware handles JWT token verification and user authentication.
 * It provides different levels of authentication for various user types and roles.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { USER_ROLES, API_MESSAGES, HTTP_STATUS } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Verify JWT token and attach user to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: API_MESSAGES.ERROR.UNAUTHORIZED,
        error: 'Access token is required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: API_MESSAGES.ERROR.UNAUTHORIZED,
        error: 'Invalid token - user not found'
      });
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: API_MESSAGES.ERROR.FORBIDDEN,
        error: 'Account is deactivated'
      });
    }

    // Check if account is locked
    if (user.locked_until && new Date() < user.locked_until) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: API_MESSAGES.ERROR.FORBIDDEN,
        error: 'Account is temporarily locked'
      });
    }

    // Attach user to request
    req.user = user;
    req.userId = user.id;
    req.userType = user.user_type;
    req.userRole = user.user_type; // Use user_type as role since no separate role field exists

    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: API_MESSAGES.ERROR.UNAUTHORIZED,
        error: 'Token has expired'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: API_MESSAGES.ERROR.UNAUTHORIZED,
        error: 'Invalid token'
      });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: API_MESSAGES.ERROR.SERVER_ERROR,
      error: 'Authentication failed'
    });
  }
};

/**
 * Require specific user role
 * @param {string|Array} roles - Required role(s)
 * @returns {Function} Middleware function
 */
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: API_MESSAGES.ERROR.UNAUTHORIZED,
        error: 'Authentication required'
      });
    }

    const userRole = req.user.role;
    const requiredRoles = Array.isArray(roles) ? roles : [roles];

    if (!requiredRoles.includes(userRole)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: API_MESSAGES.ERROR.FORBIDDEN,
        error: 'Insufficient permissions'
      });
    }

    next();
  };
};

/**
 * Require specific user type
 * @param {string|Array} userTypes - Required user type(s)
 * @returns {Function} Middleware function
 */
const requireUserType = (userTypes) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: API_MESSAGES.ERROR.UNAUTHORIZED,
        error: 'Authentication required'
      });
    }

    const userType = req.user.user_type;
    const requiredTypes = Array.isArray(userTypes) ? userTypes : [userTypes];

    if (!requiredTypes.includes(userType)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: API_MESSAGES.ERROR.FORBIDDEN,
        error: 'Access restricted to specific user types'
      });
    }

    next();
  };
};

/**
 * Require active membership
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requireActiveMembership = (req, res, next) => {
  if (!req.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: API_MESSAGES.ERROR.UNAUTHORIZED,
      error: 'Authentication required'
    });
  }

  if (!req.user.isMembershipActive()) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: API_MESSAGES.ERROR.FORBIDDEN,
      error: 'Active membership required'
    });
  }

  next();
};

/**
 * Require premium subscription
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requirePremiumSubscription = (req, res, next) => {
  if (!req.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: API_MESSAGES.ERROR.UNAUTHORIZED,
      error: 'Authentication required'
    });
  }

  if (!req.user.canAccessPremiumFeatures()) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: API_MESSAGES.ERROR.FORBIDDEN,
      error: 'Premium subscription required'
    });
  }

  next();
};

/**
 * Optional authentication - doesn't fail if no token provided
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    
    if (user && user.is_active) {
      req.user = user;
      req.userId = user.id;
      req.userType = user.user_type;
      req.userRole = user.role;
    }

    next();
  } catch (error) {
    // Log error but don't fail the request
    logger.warn('Optional authentication failed:', error.message);
    next();
  }
};

/**
 * Verify email verification
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: API_MESSAGES.ERROR.UNAUTHORIZED,
      error: 'Authentication required'
    });
  }

  if (!req.user.email_verified) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: API_MESSAGES.ERROR.FORBIDDEN,
      error: 'Email verification required'
    });
  }

  next();
};

/**
 * Check if user owns the resource or has admin access
 * @param {string} resourceUserIdField - Field name containing user ID in resource
 * @returns {Function} Middleware function
 */
const requireOwnershipOrAdmin = (resourceUserIdField = 'user_id') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: API_MESSAGES.ERROR.UNAUTHORIZED,
        error: 'Authentication required'
      });
    }

    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    // Allow if user owns the resource or is admin/super admin
    if (req.user.id === resourceUserId || 
        req.user.role === USER_ROLES.ADMIN || 
        req.user.role === USER_ROLES.SUPER_ADMIN) {
      return next();
    }

    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: API_MESSAGES.ERROR.FORBIDDEN,
      error: 'Access denied - resource ownership required'
    });
  };
};

/**
 * Rate limiting for authentication attempts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

module.exports = {
  authenticateToken,
  requireRole,
  requireUserType,
  requireActiveMembership,
  requirePremiumSubscription,
  optionalAuth,
  requireEmailVerification,
  requireOwnershipOrAdmin,
}; 