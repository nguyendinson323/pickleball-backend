/**
 * Not Found Handler Middleware
 * 
 * This middleware handles 404 errors when routes are not found.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { HTTP_STATUS } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Handle 404 errors for undefined routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const notFoundHandler = (req, res, next) => {
  // Log the 404 request
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Send 404 response
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  });
};

module.exports = notFoundHandler; 