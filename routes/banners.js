/**
 * Banner Routes
 * 
 * API routes for banner management including CRUD operations,
 * banner display, and analytics tracking.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');

const { authenticateToken, requireRole, requireUserType } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');
const bannerController = require('../controllers/bannerController');

// Validation schemas
const bannerValidation = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be 1-200 characters'),
  body('image_url').isURL().withMessage('Valid image URL is required'),
  body('thumbnail_url').optional().isURL().withMessage('Valid thumbnail URL is required'),
  body('action_url').optional().isURL().withMessage('Valid action URL is required'),
  body('action_text').optional().isLength({ max: 100 }).withMessage('Action text must be 100 characters or less'),
  body('position').optional().isInt({ min: 0 }).withMessage('Position must be a non-negative integer'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
  body('is_featured').optional().isBoolean().withMessage('is_featured must be a boolean'),
  body('display_type').optional().isIn(['carousel', 'sidebar', 'popup', 'notification']).withMessage('Invalid display type'),
  body('target_audience').optional().isIn(['all', 'players', 'coaches', 'clubs', 'partners', 'admins']).withMessage('Invalid target audience'),
  body('start_date').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('end_date').optional().isISO8601().withMessage('End date must be a valid date'),
  body('related_tournament_id').optional().isUUID().withMessage('Invalid tournament ID'),
  body('related_club_id').optional().isUUID().withMessage('Invalid club ID'),
  body('related_event_id').optional().isUUID().withMessage('Invalid event ID'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('metadata').optional().isObject().withMessage('Metadata must be an object'),
  body('notes').optional().isLength({ max: 1000 }).withMessage('Notes must be 1000 characters or less')
];

const bannerQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('display_type').optional().isIn(['carousel', 'sidebar', 'popup', 'notification']).withMessage('Invalid display type'),
  query('target_audience').optional().isIn(['all', 'players', 'coaches', 'clubs', 'partners', 'admins']).withMessage('Invalid target audience'),
  query('is_active').optional().isIn(['true', 'false']).withMessage('is_active must be true or false'),
  query('is_featured').optional().isIn(['true', 'false']).withMessage('is_featured must be true or false'),
  query('search').optional().isLength({ max: 100 }).withMessage('Search term must be 100 characters or less'),
  query('start_date').optional().isISO8601().withMessage('Start date must be a valid date'),
  query('end_date').optional().isISO8601().withMessage('End date must be a valid date')
];

const bannerIdValidation = [
  param('id').isUUID().withMessage('Invalid banner ID')
];

const positionValidation = [
  body('position').isInt({ min: 0 }).withMessage('Position must be a non-negative integer')
];

// Public routes (no authentication required)
router.get('/carousel', asyncHandler(bannerController.getCarouselBanners));
router.get('/active', bannerQueryValidation, asyncHandler(bannerController.getActiveBanners));
router.get('/:id', bannerIdValidation, asyncHandler(bannerController.getBannerById));

// Tracking routes (no authentication required)
router.post('/:id/view', bannerIdValidation, asyncHandler(bannerController.trackBannerView));
router.post('/:id/click', bannerIdValidation, asyncHandler(bannerController.trackBannerClick));

// Admin routes (authentication and admin role required)
router.get('/', authenticateToken, requireRole(['admin', 'super_admin']), bannerQueryValidation, asyncHandler(bannerController.getBanners));
router.post('/', authenticateToken, requireRole(['admin', 'super_admin']), bannerValidation, asyncHandler(bannerController.createBanner));
router.put('/:id', authenticateToken, requireRole(['admin', 'super_admin']), bannerIdValidation, bannerValidation, asyncHandler(bannerController.updateBanner));
router.delete('/:id', authenticateToken, requireRole(['admin', 'super_admin']), bannerIdValidation, asyncHandler(bannerController.deleteBanner));

// Banner management routes
router.patch('/:id/toggle', authenticateToken, requireRole(['admin', 'super_admin']), bannerIdValidation, asyncHandler(bannerController.toggleBannerStatus));
router.patch('/:id/position', authenticateToken, requireRole(['admin', 'super_admin']), bannerIdValidation, positionValidation, asyncHandler(bannerController.updateBannerPosition));

// Analytics routes
router.get('/analytics/overview', authenticateToken, requireRole(['admin', 'super_admin']), asyncHandler(bannerController.getBannerAnalytics));

module.exports = router; 