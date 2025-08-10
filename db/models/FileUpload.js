/**
 * File Upload Model
 * 
 * This model represents file uploads in the Pickleball Federation system.
 * It handles all types of file uploads including images, documents, and media files.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { UPLOAD_TYPES } = require('../../config/constants');

const FileUpload = sequelize.define('FileUpload', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Foreign keys
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the user who uploaded the file'
  },

  tournament_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of the tournament (for tournament-related files)'
  },

  // File information
  original_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Original file name'
  },

  file_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Generated file name'
  },

  file_path: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: 'File path on server'
  },

  file_url: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: 'Public URL to access the file'
  },

  file_type: {
    type: DataTypes.ENUM(Object.values(UPLOAD_TYPES)),
    allowNull: false,
    comment: 'Type of file upload'
  },

  mime_type: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'MIME type of the file'
  },

  file_size: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'File size in bytes'
  },

  file_extension: {
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: 'File extension'
  },

  // Image specific fields
  width: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Image width (for images only)'
  },

  height: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Image height (for images only)'
  },

  thumbnail_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Thumbnail URL (for images only)'
  },

  // File status
  is_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether file is publicly accessible'
  },

  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether file has been approved by admin'
  },

  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether file has been deleted'
  },

  // Metadata
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'File description'
  },

  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'File tags for categorization'
  },

  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional file metadata'
  },

  // Security
  access_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Access token for private files'
  },

  expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When file access expires'
  },

  // Usage tracking
  download_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of times file has been downloaded'
  },

  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of times file has been viewed'
  },

  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the file'
  }

}, {
  tableName: 'file_uploads',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['tournament_id']
    },
    {
      fields: ['file_type']
    },
    {
      fields: ['is_public']
    },
    {
      fields: ['is_approved']
    },
    {
      fields: ['created_at']
    }
  ]
});

// Instance methods
FileUpload.prototype.isImage = function() {
  return this.mime_type.startsWith('image/');
};

FileUpload.prototype.isDocument = function() {
  return this.mime_type.startsWith('application/') || 
         this.mime_type.startsWith('text/');
};

FileUpload.prototype.isVideo = function() {
  return this.mime_type.startsWith('video/');
};

FileUpload.prototype.isAudio = function() {
  return this.mime_type.startsWith('audio/');
};

FileUpload.prototype.isExpired = function() {
  if (!this.expires_at) return false;
  return new Date() > this.expires_at;
};

FileUpload.prototype.canAccess = function(userId) {
  if (this.is_public) return true;
  if (this.user_id === userId) return true;
  return false;
};

FileUpload.prototype.incrementDownload = async function() {
  this.download_count += 1;
  await this.save();
};

FileUpload.prototype.incrementView = async function() {
  this.view_count += 1;
  await this.save();
};

// Class methods
FileUpload.findByUser = function(userId) {
  return this.findAll({
    where: { user_id: userId },
    order: [['created_at', 'DESC']]
  });
};

FileUpload.findByTournament = function(tournamentId) {
  return this.findAll({
    where: { tournament_id: tournamentId },
    order: [['created_at', 'DESC']]
  });
};

FileUpload.findByType = function(fileType) {
  return this.findAll({
    where: { file_type: fileType },
    order: [['created_at', 'DESC']]
  });
};

FileUpload.findPublic = function() {
  return this.findAll({
    where: { 
      is_public: true,
      is_approved: true,
      is_deleted: false
    },
    order: [['created_at', 'DESC']]
  });
};

FileUpload.findPendingApproval = function() {
  return this.findAll({
    where: { is_approved: false },
    order: [['created_at', 'ASC']]
  });
};

module.exports = FileUpload; 