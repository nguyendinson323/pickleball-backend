/**
 * Announcement Model
 * 
 * Represents system announcements created by administrators
 * for communication with federation members.
 * 
 * @fileoverview Sequelize model for managing federation announcements
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const Announcement = sequelize.define('Announcement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Content Fields
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    },
    comment: 'Announcement title/headline'
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 10000]
    },
    comment: 'Full announcement content/body'
  },

  excerpt: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Short summary/excerpt for previews'
  },

  // Classification Fields
  category: {
    type: DataTypes.ENUM(
      'general',
      'tournament',
      'safety',
      'training',
      'equipment',
      'club',
      'coaching',
      'membership',
      'news',
      'emergency'
    ),
    allowNull: false,
    defaultValue: 'general',
    comment: 'Announcement category for organization'
  },

  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    allowNull: false,
    defaultValue: 'medium',
    comment: 'Priority level affecting display order and styling'
  },

  // Status and Publishing
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived', 'scheduled'),
    allowNull: false,
    defaultValue: 'draft',
    comment: 'Publication status'
  },

  publish_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When announcement should be published'
  },

  expiry_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When announcement expires and is hidden'
  },

  // Targeting and Visibility
  target_audience: {
    type: DataTypes.ENUM(
      'all_members',
      'players',
      'coaches',
      'club_managers',
      'tournament_directors',
      'officials',
      'specific_groups'
    ),
    allowNull: false,
    defaultValue: 'all_members',
    comment: 'Who should see this announcement'
  },

  target_groups: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Specific group IDs when target_audience is specific_groups'
  },

  target_states: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Specific states/regions if geographically targeted'
  },

  // Author Information
  author_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    comment: 'Admin user who created the announcement'
  },

  author_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Name of announcement author'
  },

  author_title: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Title/role of announcement author'
  },

  // Display and Formatting
  is_pinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether announcement appears at top of lists'
  },

  banner_image: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Optional banner image URL'
  },

  display_style: {
    type: DataTypes.ENUM('standard', 'banner', 'alert', 'notice'),
    allowNull: false,
    defaultValue: 'standard',
    comment: 'How announcement should be displayed'
  },

  // Engagement Tracking
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of times announcement was viewed'
  },

  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of times announcement was clicked/opened'
  },

  like_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of likes/reactions'
  },

  // Notification Settings
  send_notification: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether to send push notifications'
  },

  notification_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether notification has been sent'
  },

  notification_sent_at: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When notification was sent'
  },

  // External Links and Actions
  action_button_text: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Text for optional action button'
  },

  action_button_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL for optional action button'
  },

  external_link: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Optional external link'
  },

  // Tags and Search
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of tags for categorization and search'
  },

  search_keywords: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional keywords for search optimization'
  },

  // Analytics and Metadata
  analytics_data: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Analytics tracking data'
  },

  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional metadata for extensions'
  }

}, {
  tableName: 'announcements',
  timestamps: true,
  indexes: [
    {
      fields: ['status', 'publish_date']
    },
    {
      fields: ['category', 'priority']
    },
    {
      fields: ['target_audience']
    },
    {
      fields: ['author_id']
    },
    {
      fields: ['expiry_date']
    },
    {
      fields: ['is_pinned', 'priority', 'publish_date']
    }
  ]
});

// Model associations will be defined in the associations file

// Instance methods
Announcement.prototype.isActive = function() {
  const now = new Date();
  return this.status === 'published' && 
         (!this.expiry_date || this.expiry_date > now) &&
         (!this.publish_date || this.publish_date <= now);
};

Announcement.prototype.isExpired = function() {
  const now = new Date();
  return this.expiry_date && this.expiry_date <= now;
};

Announcement.prototype.canBeViewedBy = function(userType, userState = null, userGroups = []) {
  // Check target audience
  if (this.target_audience === 'all_members') return true;
  if (this.target_audience === userType) return true;
  
  // Check specific groups
  if (this.target_audience === 'specific_groups' && this.target_groups) {
    return userGroups.some(group => this.target_groups.includes(group));
  }
  
  // Check state targeting
  if (this.target_states && this.target_states.length > 0) {
    return this.target_states.includes(userState);
  }
  
  return false;
};

// Static methods
Announcement.getActiveAnnouncements = async function(options = {}) {
  const {
    userType = 'players',
    userState = null,
    userGroups = [],
    category = null,
    limit = 10,
    offset = 0
  } = options;

  const whereClause = {
    status: 'published'
  };

  const now = new Date();
  whereClause[sequelize.Op.and] = [
    {
      [sequelize.Op.or]: [
        { publish_date: null },
        { publish_date: { [sequelize.Op.lte]: now } }
      ]
    },
    {
      [sequelize.Op.or]: [
        { expiry_date: null },
        { expiry_date: { [sequelize.Op.gt]: now } }
      ]
    }
  ];

  if (category) {
    whereClause.category = category;
  }

  const announcements = await this.findAll({
    where: whereClause,
    order: [
      ['is_pinned', 'DESC'],
      ['priority', 'DESC'],
      ['publish_date', 'DESC'],
      ['created_at', 'DESC']
    ],
    limit,
    offset
  });

  // Filter by user permissions
  return announcements.filter(announcement => 
    announcement.canBeViewedBy(userType, userState, userGroups)
  );
};

module.exports = Announcement;