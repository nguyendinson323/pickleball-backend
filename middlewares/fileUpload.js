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
  console.log('Created uploads directory:', uploadsDir);
}

// Create subdirectories
const subdirs = ['profile-photos', 'verification-documents', 'tournaments', 'clubs', 'courts'];
subdirs.forEach(subdir => {
  const subdirPath = path.join(uploadsDir, subdir);
  if (!fs.existsSync(subdirPath)) {
    fs.mkdirSync(subdirPath, { recursive: true });
    console.log('Created subdirectory:', subdirPath);
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadsDir;
    console.log('🔄 Multer storage destination called for file:', file.fieldname);
    
    // Organize files by type
    if (file.fieldname === 'profile_photo') {
      uploadPath = path.join(uploadsDir, 'profile-photos');
    } else if (file.fieldname === 'verification_document') {
      uploadPath = path.join(uploadsDir, 'verification-documents');
    } else if (file.fieldname === 'tournament_image') {
      uploadPath = path.join(uploadsDir, 'tournaments');
    } else if (file.fieldname === 'club_logo') {
      uploadPath = path.join(uploadsDir, 'clubs');
    } else if (file.fieldname === 'court_image') {
      uploadPath = path.join(uploadsDir, 'courts');
    }
    
    console.log('📁 Upload path determined:', uploadPath);
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log('✅ Created directory:', uploadPath);
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    console.log('📝 Generated filename:', uniqueName, 'for original:', file.originalname);
    cb(null, uniqueName);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  console.log('🔍 File filter called for:', file.fieldname, 'with mimetype:', file.mimetype);
  
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const allowedDocumentTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
  
  if (file.fieldname === 'profile_photo') {
    if (allowedImageTypes.includes(file.mimetype)) {
      console.log('✅ Profile photo accepted');
      cb(null, true);
    } else {
      console.log('❌ Profile photo rejected - invalid mimetype');
      cb(new Error('Profile photo must be a valid image file (JPEG, PNG, WebP, GIF)'), false);
    }
  } else if (file.fieldname === 'verification_document') {
    if (allowedDocumentTypes.includes(file.mimetype)) {
      console.log('✅ Verification document accepted');
      cb(null, true);
    } else {
      console.log('❌ Verification document rejected - invalid mimetype');
      cb(new Error('Verification document must be a valid file (PDF, JPEG, PNG)'), false);
    }
  } else if (['tournament_image', 'club_logo', 'court_image'].includes(file.fieldname)) {
    if (allowedImageTypes.includes(file.mimetype)) {
      console.log('✅ Image accepted');
      cb(null, true);
    } else {
      console.log('❌ Image rejected - invalid mimetype');
      cb(new Error('Image must be a valid image file (JPEG, PNG, WebP, GIF)'), false);
    }
  } else {
    console.log('❌ Unknown field name:', file.fieldname);
    cb(new Error('Invalid file field'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (increased from 5MB)
    files: 5 // Maximum 5 files
  }
});

// Add debugging to registration upload
const registrationUpload = (req, res, next) => {
  console.log('=== REGISTRATION UPLOAD DEBUG ===');
  console.log('Request headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  
  // Temporarily allow all content types for debugging
  console.log('⚠️  WARNING: Allowing all content types for debugging');
  
  // Check if this is a multipart form data request
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    console.log('❌ WARNING: Request is not multipart/form-data');
    console.log('Content-Type received:', req.headers['content-type']);
    console.log('⚠️  ALLOWING REQUEST TO PROCEED FOR DEBUGGING');
    // return res.status(400).json({
    //   success: false,
    //   message: 'Request must be multipart/form-data for file uploads'
    // });
  }
  
  console.log('✅ Proceeding with file upload processing');
  
  upload.fields([
    { name: 'profile_photo', maxCount: 1 },
    { name: 'verification_document', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) {
      console.log('❌ Multer error:', err);
      return next(err);
    }
    
    console.log('✅ Multer processing completed successfully');
    console.log('Files received by multer:', req.files);
    console.log('Body received:', Object.keys(req.body));
    console.log('Full body content:', req.body);
    
    // Ensure files are properly processed
    if (req.files) {
      console.log('Files processed by multer:', {
        profile_photo: req.files.profile_photo ? req.files.profile_photo[0] : null,
        verification_document: req.files.verification_document ? req.files.verification_document[0] : null
      });
      
      // Check if files were actually saved
      if (req.files.profile_photo) {
        const profilePhotoPath = req.files.profile_photo[0].path;
        console.log('Profile photo saved to:', profilePhotoPath);
        console.log('File exists:', fs.existsSync(profilePhotoPath));
        console.log('Profile photo details:', {
          filename: req.files.profile_photo[0].filename,
          originalname: req.files.profile_photo[0].originalname,
          mimetype: req.files.profile_photo[0].mimetype,
          size: req.files.profile_photo[0].size
        });
      }
      
      if (req.files.verification_document) {
        const docPath = req.files.verification_document[0].path;
        console.log('Verification document saved to:', docPath);
        console.log('File exists:', fs.existsSync(docPath));
        console.log('Verification document details:', {
          filename: req.files.verification_document[0].filename,
          originalname: req.files.verification_document[0].originalname,
          mimetype: req.files.verification_document[0].mimetype,
          size: req.files.verification_document[0].size
        });
      }
    } else {
      console.log('❌ No files received by multer');
      console.log('This means multer did not process any files');
      console.log('Possible reasons:');
      console.log('1. Request is not multipart/form-data');
      console.log('2. Files are not being sent with correct field names');
      console.log('3. Multer configuration issue');
    }
    
    console.log('=== END REGISTRATION UPLOAD DEBUG ===');
    next();
  });
};

// Middleware for profile photo upload only
const profilePhotoUpload = upload.single('profile_photo');

// Middleware for verification document upload only
const verificationDocumentUpload = upload.single('verification_document');

// Middleware for tournament image upload
const tournamentImageUpload = upload.single('tournament_image');

// Middleware for club logo upload
const clubLogoUpload = upload.single('club_logo');

// Middleware for court image upload
const courtImageUpload = upload.single('court_image');

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB.'
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
  
  if (error.message.includes('Image must be')) {
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
  tournamentImageUpload,
  clubLogoUpload,
  courtImageUpload,
  handleUploadError
}; 