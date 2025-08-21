/**
 * Message Routes
 * 
 * Defines all message-related API endpoints for the
 * messaging system including direct messages and notifications.
 * 
 * @fileoverview Express router for message endpoints
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();

// Import controllers
const {
  sendMessage,
  getMessages,
  getUnreadCount,
  markMessageAsRead,
  markAllMessagesAsRead,
  toggleStarMessage,
  archiveMessage,
  deleteMessage,
  getMessageById,
  sendSystemNotification,
  sendBroadcastMessage,
  getMessageStatistics
} = require('../controllers/messageController');

// Import middlewares
const { authenticateToken } = require('../middlewares/auth');
const { validateAdmin } = require('../middlewares/roleValidation');
const { rateLimiter } = require('../middlewares/rateLimiter');

// All routes require authentication
router.use(authenticateToken);

// User message operations
router.post('/', rateLimiter, sendMessage);
router.get('/', getMessages);
router.get('/unread-count', getUnreadCount);
router.get('/:id', getMessageById);

// Message status management
router.put('/:id/read', markMessageAsRead);
router.put('/read-all', markAllMessagesAsRead);
router.put('/:id/star', toggleStarMessage);
router.put('/:id/archive', archiveMessage);
router.delete('/:id', deleteMessage);

// Admin-only routes
router.post('/system-notification', validateAdmin, rateLimiter, sendSystemNotification);
router.post('/broadcast', validateAdmin, rateLimiter, sendBroadcastMessage);
router.get('/stats', validateAdmin, getMessageStatistics);

module.exports = router;