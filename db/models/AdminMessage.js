/**
 * Admin Message Model
 * 
 * This model handles admin broadcast messaging system for sending announcements
 * to different user types (players, coaches, clubs, states, etc.)
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../../config/database');

const AdminMessage = sequelize.define('AdminMessage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Message title/subject'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Message content body'
  },
  excerpt: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Short excerpt for preview'
  },
  message_type: {
    type: DataTypes.ENUM('announcement', 'notification', 'alert', 'reminder', 'newsletter'),
    defaultValue: 'announcement',
    allowNull: false,
    comment: 'Type of message'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium',
    allowNull: false,
    comment: 'Message priority level'
  },
  status: {
    type: DataTypes.ENUM('draft', 'scheduled', 'sending', 'sent', 'cancelled'),
    defaultValue: 'draft',
    allowNull: false,
    comment: 'Message status'
  },
  sender_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID of admin user who created the message',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  sender_name: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Name of sender (cached for display)'
  },
  target_audience: {
    type: DataTypes.ENUM(
      'all_users',           // All registered users
      'players',             // Only players
      'coaches',             // Only coaches  
      'clubs',               // Only clubs
      'partners',            // Only partners
      'states',              // Only state committees
      'players_coaches',     // Players and coaches
      'business_users',      // Clubs, partners, states
      'specific_users',      // Specific user list
      'by_location',         // By state/city
      'by_membership'        // By membership level
    ),
    defaultValue: 'all_users',
    allowNull: false,
    comment: 'Target audience for the message'
  },
  target_filters: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional filters: states, cities, membership levels, specific user IDs'
  },
  scheduled_send_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When to send the message (null for immediate)'
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When the message was actually sent'
  },
  total_recipients: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Total number of intended recipients'
  },
  sent_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of messages successfully sent'
  },
  read_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of recipients who read the message'
  },
  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of clicks on action buttons/links'
  },
  action_button_text: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Text for action button (e.g., "Register Now", "View Details")'
  },
  action_button_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL for action button'
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When the message expires and is no longer shown'
  },
  is_pinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether to pin the message at the top'
  },
  send_via_email: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether to also send via email'
  },
  send_via_notification: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether to send as in-app notification'
  },
  attachments: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'File attachments (images, PDFs, etc.)'
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional metadata for the message'
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Tags for categorizing messages'
  }
}, {
  tableName: 'admin_messages',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['sender_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['target_audience']
    },
    {
      fields: ['priority']
    },
    {
      fields: ['scheduled_send_at']
    },
    {
      fields: ['sent_at']
    },
    {
      fields: ['expires_at']
    },
    {
      fields: ['is_pinned']
    },
    {
      fields: ['created_at']
    }
  ]
});

// Admin Message Recipients tracking table
const AdminMessageRecipient = sequelize.define('AdminMessageRecipient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  admin_message_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'admin_messages',
      key: 'id'
    }
  },
  recipient_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  recipient_email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Cached email for delivery'
  },
  recipient_name: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Cached name for personalization'
  },
  recipient_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Cached user type for analytics'
  },
  delivery_status: {
    type: DataTypes.ENUM('pending', 'sent', 'delivered', 'failed', 'bounced'),
    defaultValue: 'pending',
    allowNull: false
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  delivered_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  read_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  clicked_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  error_message: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Error message if delivery failed'
  },
  is_dismissed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether recipient dismissed the message'
  },
  dismissed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'admin_message_recipients',
  timestamps: true,
  indexes: [
    {
      fields: ['admin_message_id']
    },
    {
      fields: ['recipient_id']
    },
    {
      fields: ['delivery_status']
    },
    {
      fields: ['sent_at']
    },
    {
      fields: ['read_at']
    },
    {
      unique: true,
      fields: ['admin_message_id', 'recipient_id']
    }
  ]
});

// Define associations
AdminMessage.hasMany(AdminMessageRecipient, {
  foreignKey: 'admin_message_id',
  as: 'recipients'
});

AdminMessageRecipient.belongsTo(AdminMessage, {
  foreignKey: 'admin_message_id',
  as: 'adminMessage'
});

// Instance methods
AdminMessage.prototype.getRecipientCount = async function() {
  return await AdminMessageRecipient.count({
    where: { admin_message_id: this.id }
  });
};

AdminMessage.prototype.getReadRate = function() {
  if (this.sent_count === 0) return 0;
  return (this.read_count / this.sent_count * 100).toFixed(1);
};

AdminMessage.prototype.getClickRate = function() {
  if (this.read_count === 0) return 0;
  return (this.click_count / this.read_count * 100).toFixed(1);
};

AdminMessage.prototype.canBeEdited = function() {
  return this.status === 'draft' || this.status === 'scheduled';
};

AdminMessage.prototype.canBeDeleted = function() {
  return this.status === 'draft' || this.status === 'scheduled';
};

AdminMessage.prototype.canBeSent = function() {
  return this.status === 'draft' || this.status === 'scheduled';
};

// Class methods
AdminMessage.getActiveMessages = function() {
  return this.findAll({
    where: {
      status: 'sent',
      [Op.or]: [
        { expires_at: null },
        { expires_at: { [Op.gt]: new Date() } }
      ]
    },
    order: [
      ['is_pinned', 'DESC'],
      ['priority', 'DESC'],
      ['sent_at', 'DESC']
    ]
  });
};

AdminMessage.getMessagesForUser = async function(userId, userType, userState, userCity) {
  // Get all admin messages that target this user
  const messages = await this.findAll({
    where: {
      status: 'sent',
      [Op.or]: [
        { expires_at: null },
        { expires_at: { [Op.gt]: new Date() } }
      ],
      [Op.or]: [
        { target_audience: 'all_users' },
        { target_audience: userType },
        { 
          target_audience: 'players_coaches',
          [Op.and]: [
            { [Op.or]: [userType === 'player', userType === 'coach'] }
          ]
        },
        {
          target_audience: 'business_users',
          [Op.and]: [
            { [Op.or]: [userType === 'club', userType === 'partner', userType === 'state'] }
          ]
        },
        {
          target_audience: 'by_location',
          [Op.or]: [
            { 'target_filters.states': { [Op.contains]: [userState] } },
            { 'target_filters.cities': { [Op.contains]: [userCity] } }
          ]
        },
        {
          target_audience: 'specific_users',
          'target_filters.user_ids': { [Op.contains]: [userId] }
        }
      ]
    },
    include: [{
      model: AdminMessageRecipient,
      as: 'recipients',
      where: { recipient_id: userId },
      required: false
    }],
    order: [
      ['is_pinned', 'DESC'],
      ['priority', 'DESC'], 
      ['sent_at', 'DESC']
    ]
  });

  return messages;
};

AdminMessage.getScheduledMessages = function() {
  return this.findAll({
    where: {
      status: 'scheduled',
      scheduled_send_at: { [Op.lte]: new Date() }
    },
    order: [['scheduled_send_at', 'ASC']]
  });
};

AdminMessage.getDraftMessages = function(senderId) {
  const where = { status: 'draft' };
  if (senderId) {
    where.sender_id = senderId;
  }
  
  return this.findAll({
    where,
    order: [['updated_at', 'DESC']]
  });
};

AdminMessage.getMessageStats = async function(messageId) {
  const message = await this.findByPk(messageId);
  if (!message) return null;

  const recipients = await AdminMessageRecipient.findAll({
    where: { admin_message_id: messageId },
    attributes: [
      'delivery_status',
      [sequelize.fn('COUNT', sequelize.col('id')), 'count']
    ],
    group: ['delivery_status'],
    raw: true
  });

  const stats = {
    total_recipients: message.total_recipients,
    sent_count: message.sent_count,
    read_count: message.read_count,
    click_count: message.click_count,
    read_rate: message.getReadRate(),
    click_rate: message.getClickRate(),
    delivery_breakdown: {}
  };

  recipients.forEach(r => {
    stats.delivery_breakdown[r.delivery_status] = parseInt(r.count);
  });

  return stats;
};

module.exports = { AdminMessage, AdminMessageRecipient };