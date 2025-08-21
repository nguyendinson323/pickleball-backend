/**
 * Digital Credential Model
 * 
 * This model represents digital credentials for players in the Pickleball Federation system.
 * It handles digital ID cards, QR codes, and credential verification.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const DigitalCredential = sequelize.define('DigitalCredential', {
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
    allowNull: false,
    comment: 'ID of the user this credential belongs to'
  },

  // Credential identification
  credential_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: 'Unique system-generated credential number (e.g., PB-2024-001)'
  },

  verification_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: 'Unique verification code for online verification'
  },

  // Federation information
  federation_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: 'Pickleball Sports Federation',
    comment: 'Official federation name'
  },

  federation_logo: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL to federation logo'
  },

  // Player information
  player_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Full registered player name'
  },

  nrtp_level: {
    type: DataTypes.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
    allowNull: true,
    comment: 'Current NRTP skill rating'
  },

  state_affiliation: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'State the player belongs to'
  },

  nationality: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: 'Mexican',
    comment: 'Player nationality'
  },

  // Status and affiliation
  affiliation_status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended', 'expired'),
    allowNull: false,
    defaultValue: 'active',
    comment: 'Current affiliation status'
  },

  ranking_position: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Current ranking position (auto-updated)'
  },

  club_status: {
    type: DataTypes.ENUM('club_member', 'independent'),
    allowNull: false,
    defaultValue: 'independent',
    comment: 'Whether player is club member or independent'
  },

  club_name: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Name of club if player is a member'
  },

  // Credential details
  qr_code_url: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: 'URL to QR code for credential verification'
  },

  qr_code_data: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Data encoded in QR code (usually verification URL)'
  },

  issued_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Date credential was issued'
  },

  expiry_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Date credential expires (if applicable)'
  },

  last_verified: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Last time credential was verified'
  },

  verification_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of times credential has been verified'
  },

  // Security and verification
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether credential has been verified by federation'
  },

  verification_notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Notes from verification process'
  },

  // Enhanced QR Security Features
  qr_jwt_token: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JWT token for secure QR code verification'
  },

  digital_signature: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Digital signature for tamper-proof verification'
  },

  verification_methods: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'History of verification methods and timestamps'
  },

  // Metadata
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional metadata for the credential'
  }

}, {
  tableName: 'digital_credentials',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      unique: true,
      fields: ['credential_number']
    },
    {
      unique: true,
      fields: ['verification_code']
    },
    {
      fields: ['user_id']
    },
    {
      fields: ['affiliation_status']
    },
    {
      fields: ['state_affiliation']
    },
    {
      fields: ['is_verified']
    }
  ]
});

// Instance methods
DigitalCredential.prototype.isExpired = function() {
  if (!this.expiry_date) return false;
  return new Date() > this.expiry_date;
};

DigitalCredential.prototype.isActive = function() {
  return this.affiliation_status === 'active' && !this.isExpired();
};

DigitalCredential.prototype.getDaysUntilExpiry = function() {
  if (!this.expiry_date) return null;
  const today = new Date();
  const expiry = new Date(this.expiry_date);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

DigitalCredential.prototype.generateQRCodeData = function() {
  // Generate verification URL for QR code
  const baseUrl = process.env.FRONTEND_URL || 'https://pickleball-federation.com';
  return `${baseUrl}/verify-credential/${this.verification_code}`;
};

// Class methods
DigitalCredential.generateCredentialNumber = function() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `PB-${year}-${random}`;
};

DigitalCredential.generateVerificationCode = function() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

module.exports = DigitalCredential; 