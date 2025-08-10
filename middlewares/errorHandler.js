/**
 * Error Handler Middleware
 * 
 * This middleware handles all errors in the application and provides
 * consistent error responses across all endpoints.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { API_MESSAGES, HTTP_STATUS } = require('../config/constants');
const logger = require('../config/logger');

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.logError(err, req);

  // Default error response
  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = API_MESSAGES.ERROR.SERVER_ERROR;
  let error = 'Internal server error';

  // Handle different types of errors
  if (err.name === 'SequelizeValidationError') {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    message = API_MESSAGES.ERROR.VALIDATION_ERROR;
    error = err.errors.map(e => e.message).join(', ');
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = HTTP_STATUS.CONFLICT;
    message = 'Duplicate entry';
    error = err.errors.map(e => e.message).join(', ');
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid reference';
    error = 'Referenced record does not exist';
  } else if (err.name === 'SequelizeDatabaseError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Database error';
    error = 'Invalid database operation';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = API_MESSAGES.ERROR.UNAUTHORIZED;
    error = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = API_MESSAGES.ERROR.UNAUTHORIZED;
    error = 'Token expired';
  } else if (err.name === 'MulterError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'File upload error';
    error = err.message;
  } else if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = API_MESSAGES.ERROR.VALIDATION_ERROR;
    error = err.message;
  } else if (err.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid ID format';
    error = 'Invalid identifier provided';
  } else if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'File too large';
    error = 'Uploaded file exceeds size limit';
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Unexpected file field';
    error = 'Invalid file field name';
  } else if (err.status) {
    // Custom error with status code
    statusCode = err.status;
    message = err.message || API_MESSAGES.ERROR.SERVER_ERROR;
    error = err.error || 'An error occurred';
  } else if (err.message) {
    // Error with message but no status
    message = err.message;
    error = err.message;
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    error = 'Something went wrong';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    error,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err
    })
  });
};

/**
 * Async error wrapper - catches async errors and passes them to error handler
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Wrapped function
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Custom error class for application errors
 */
class AppError extends Error {
  constructor(message, statusCode, error = null) {
    super(message);
    this.status = statusCode;
    this.error = error;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create custom errors
 */
const createError = {
  badRequest: (message = 'Bad request', error = null) => 
    new AppError(message, HTTP_STATUS.BAD_REQUEST, error),
  
  unauthorized: (message = API_MESSAGES.ERROR.UNAUTHORIZED, error = null) => 
    new AppError(message, HTTP_STATUS.UNAUTHORIZED, error),
  
  forbidden: (message = API_MESSAGES.ERROR.FORBIDDEN, error = null) => 
    new AppError(message, HTTP_STATUS.FORBIDDEN, error),
  
  notFound: (message = 'Resource not found', error = null) => 
    new AppError(message, HTTP_STATUS.NOT_FOUND, error),
  
  conflict: (message = 'Resource conflict', error = null) => 
    new AppError(message, HTTP_STATUS.CONFLICT, error),
  
  validation: (message = API_MESSAGES.ERROR.VALIDATION_ERROR, error = null) => 
    new AppError(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, error),
  
  server: (message = API_MESSAGES.ERROR.SERVER_ERROR, error = null) => 
    new AppError(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, error)
};

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = {
  errorHandler,
  asyncHandler,
  AppError,
  createError
}; 