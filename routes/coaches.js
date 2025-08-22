/**
 * Coach Routes
 * 
 * API routes for coach-related operations including search, profiles,
 * and lesson booking functionality.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');
const { authenticateToken, requireMembership } = require('../middlewares/auth');

// Public routes (no authentication required)

// Search coaches with filters
router.get('/search', coachController.searchCoaches);

// Get coach profile by ID
router.get('/:coachId/profile', coachController.getCoachProfile);

// Protected routes (authentication required)

// Create or update coach search preferences
router.post('/search/create', 
  authenticateToken, 
  coachController.createCoachSearch
);

// Get user's coach searches
router.get('/search/my-searches', 
  authenticateToken, 
  coachController.getMyCoachSearches
);

// Perform search with existing criteria
router.post('/search/:searchId/perform', 
  authenticateToken, 
  coachController.performCoachSearch
);

// Get coach search statistics
router.get('/search/stats', 
  authenticateToken, 
  coachController.getCoachSearchStats
);

// Contact a coach
router.post('/:coachId/contact', 
  authenticateToken, 
  coachController.contactCoach
);

module.exports = router;