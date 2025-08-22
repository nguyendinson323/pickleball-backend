/**
 * Message Model
 * 
 * Represents private messages between users in the federation system.
 * Supports both direct messages and system notifications.
 * 
 * @fileoverview Sequelize model for managing user messages
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Message Content
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    },
    comment: 'Message subject line'
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 10000]
    },
    comment: 'Message body content'
  },

  message_type: {
    type: DataTypes.ENUM(
      'direct_message',
      'system_notification',
      'announcement_notification',
      'match_request',
      'tournament_notification',
      'payment_notification',
      'verification_notification'
    ),
    allowNull: false,
    defaultValue: 'direct_message',
    comment: 'Type of message for categorization'
  },

  // Sender Information
  sender_id: {
    type: DataTypes.UUID,
    allowNull: true, // Null for system messages
    references: {
      model: 'users',
      key: 'id'
    },
    comment: 'User who sent the message (null for system messages)'
  },

  sender_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Display name of sender'
  },

  sender_type: {
    type: DataTypes.ENUM('user', 'system', 'admin'),
    allowNull: false,
    defaultValue: 'user',
    comment: 'Type of sender'
  },

  // Recipient Information
  recipient_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    comment: 'User who should receive the message'
  },

  // Message Status
  status: {
    type: DataTypes.ENUM('sent', 'delivered', 'read', 'archived', 'deleted'),
    allowNull: false,
    defaultValue: 'sent',
    comment: 'Message delivery status'
  },

  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether recipient has read the message'
  },

  read_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When message was read by recipient'
  },

  is_starred: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether recipient has starred the message'
  },

  is_archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether message has been archived'
  },

  // Priority and Categorization
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    allowNull: false,
    defaultValue: 'medium',
    comment: 'Message priority level'
  },

  category: {
    type: DataTypes.ENUM(
      'general',
      'tournament',
      'club',
      'coaching',
      'support',
      'payment',
      'verification',
      'match_request',
      'system'
    ),
    allowNull: false,
    defaultValue: 'general',
    comment: 'Message category for organization'
  },

  // Automation and System Fields
  is_automated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether message was sent automatically by system'
  },

  automation_trigger: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'What triggered automated message (e.g., payment_due, tournament_reminder)'
  },

  // Related Entity References
  related_entity_type: {
    type: DataTypes.ENUM(
      'announcement',
      'tournament',
      'match',
      'payment',
      'club',
      'coaching_session',
      'credential'
    ),
    allowNull: true,
    comment: 'Type of related entity if applicable'
  },

  related_entity_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID of related entity if applicable'
  },

  // Action and Response
  action_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether message requires recipient action'
  },

  action_button_text: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Text for action button if applicable'
  },

  action_button_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL for action button if applicable'
  },

  // Delivery Tracking
  delivery_attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of delivery attempts made'
  },

  last_delivery_attempt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When last delivery attempt was made'
  },

  delivery_error: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Error message if delivery failed'
  },

  // Analytics
  opened_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of times message was opened'
  },

  last_opened_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When message was last opened'
  },

  // Metadata
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional message metadata'
  }

}, {
  tableName: 'messages',
  timestamps: true,
  indexes: [
    {
      fields: ['recipient_id', 'status']
    },
    {
      fields: ['sender_id']
    },
    {
      fields: ['message_type', 'status']
    },
    {
      fields: ['priority', 'created_at']
    },
    {
      fields: ['category']
    },
    {
      fields: ['is_read', 'recipient_id']
    },
    {
      fields: ['related_entity_type', 'related_entity_id']
    }
  ]
});

// Instance methods
Message.prototype.markAsRead = async function() {
  if (!this.is_read) {
    await this.update({
      is_read: true,
      read_at: new Date(),
      status: 'read'
    });
  }
  return this;
};

Message.prototype.markAsStarred = async function(starred = true) {
  await this.update({ is_starred: starred });
  return this;
};

Message.prototype.archive = async function() {
  await this.update({ is_archived: true });
  return this;
};

Message.prototype.incrementOpenCount = async function() {
  await this.update({
    opened_count: this.opened_count + 1,
    last_opened_at: new Date()
  });
  return this;
};

// Static methods
Message.getUnreadCount = async function(userId) {
  return await this.count({
    where: {
      recipient_id: userId,
      is_read: false,
      status: { [sequelize.Op.ne]: 'deleted' }
    }
  });
};

Message.getMessagesForUser = async function(userId, options = {}) {
  const {
    type = 'inbox', // inbox, sent, starred, archived
    category = null,
    priority = null,
    limit = 20,
    offset = 0,
    includeArchived = false
  } = options;

  let whereClause = {};
  
  if (type === 'inbox') {
    whereClause.recipient_id = userId;
    if (!includeArchived) {
      whereClause.is_archived = false;
    }
  } else if (type === 'sent') {
    whereClause.sender_id = userId;
  } else if (type === 'starred') {
    whereClause.recipient_id = userId;
    whereClause.is_starred = true;
  } else if (type === 'archived') {
    whereClause.recipient_id = userId;
    whereClause.is_archived = true;
  }

  whereClause.status = { [sequelize.Op.ne]: 'deleted' };

  if (category) {
    whereClause.category = category;
  }

  if (priority) {
    whereClause.priority = priority;
  }

  return await this.findAll({
    where: whereClause,
    order: [
      ['priority', 'DESC'],
      ['created_at', 'DESC']
    ],
    limit,
    offset,
    include: [
      {
        model: sequelize.models.User,
        as: 'sender',
        attributes: ['id', 'full_name', 'username', 'email', 'user_type']
      },
      {
        model: sequelize.models.User,
        as: 'recipient',
        attributes: ['id', 'full_name', 'username', 'email', 'user_type']
      }
    ]
  });
};

module.exports = Message;