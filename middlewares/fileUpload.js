/**
 * File Upload Middleware
 * 
 * Handles file uploads for profile photos and verification documents
 * using multer with proper validation and storage configuration.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadsDir;
    
    // Organize files by type
    if (file.fieldname === 'profile_photo') {
      uploadPath = path.join(uploadsDir, 'profile-photos');
    } else if (file.fieldname === 'verification_document') {
      uploadPath = path.join(uploadsDir, 'verification-documents');
    }
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedDocumentTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  
  if (file.fieldname === 'profile_photo') {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Profile photo must be a valid image file (JPEG, PNG, WebP)'), false);
    }
  } else if (file.fieldname === 'verification_document') {
    if (allowedDocumentTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Verification document must be a valid file (PDF, JPEG, PNG)'), false);
    }
  } else {
    cb(new Error('Invalid file field'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 2 // Maximum 2 files (profile photo + verification document)
  }
});

// Middleware for registration file uploads
const registrationUpload = upload.fields([
  { name: 'profile_photo', maxCount: 1 },
  { name: 'verification_document', maxCount: 1 }
]);

// Middleware for profile photo upload only
const profilePhotoUpload = upload.single('profile_photo');

// Middleware for verification document upload only
const verificationDocumentUpload = upload.single('verification_document');

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files uploaded.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.'
      });
    }
  }
  
  if (error.message.includes('Profile photo must be')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  if (error.message.includes('Verification document must be')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next(error);
};

module.exports = {
  registrationUpload,
  profilePhotoUpload,
  verificationDocumentUpload,
  handleUploadError
}; 