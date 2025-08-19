/**
 * Digital Credentials Routes
 * 
 * This file defines all routes related to digital credentials including
 * creation, retrieval, verification, and updates for player digital IDs.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, requireUserType } = require('../middlewares/auth');
const {
  createDigitalCredential,
  getMyDigitalCredential,
  verifyDigitalCredential,
  updateDigitalCredential,
  getAllDigitalCredentials,
  regenerateQRCode
} = require('../controllers/digitalCredentialController');

// Public routes
router.get('/verify/:verificationCode', verifyDigitalCredential);

// Protected routes (require authentication)
router.use(authenticateToken);

// Player routes
router.post('/', requireUserType(['player']), createDigitalCredential);
router.get('/my-credential', requireUserType(['player']), getMyDigitalCredential);
router.put('/:id', requireUserType(['player']), updateDigitalCredential);
router.post('/:id/regenerate-qr', requireUserType(['player']), regenerateQRCode);

// Admin routes
router.get('/', requireUserType(['admin']), getAllDigitalCredentials);

module.exports = router; 