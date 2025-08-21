/**
 * Announcement Routes
 * 
 * Defines all announcement-related API endpoints for the
 * admin messaging system.
 * 
 * @fileoverview Express router for announcement endpoints
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();

// Import controllers
const {
  createAnnouncement,
  getAnnouncements,
  getPublicAnnouncements,
  updateAnnouncement,
  publishAnnouncement,
  archiveAnnouncement,
  deleteAnnouncement,
  togglePinAnnouncement,
  getAnnouncementAnalytics,
  sendBulkAnnouncement
} = require('../controllers/announcementController');

// Import middlewares
const { authenticateToken } = require('../middlewares/auth');
const { validateAdmin } = require('../middlewares/roleValidation');
const { rateLimiter } = require('../middlewares/rateLimiter');

// Public routes (for users to view announcements)
router.get('/public', authenticateToken, getPublicAnnouncements);

// Admin routes (require admin authentication)
router.use(authenticateToken);
router.use(validateAdmin);

// CRUD operations
router.post('/', rateLimiter, createAnnouncement);
router.get('/', getAnnouncements);
router.put('/:id', rateLimiter, updateAnnouncement);
router.delete('/:id', rateLimiter, deleteAnnouncement);

// Status management
router.post('/:id/publish', rateLimiter, publishAnnouncement);
router.post('/:id/archive', rateLimiter, archiveAnnouncement);
router.post('/:id/pin', rateLimiter, togglePinAnnouncement);

// Bulk operations
router.post('/:id/send-bulk', rateLimiter, sendBulkAnnouncement);

// Analytics
router.get('/:id/analytics', getAnnouncementAnalytics);

module.exports = router;