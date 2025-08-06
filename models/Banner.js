/**
 * Banner Model
 * 
 * This model represents banners for the homepage carousel and promotional displays.
 * Banners can be used for tournaments, events, promotions, and general announcements.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Banner = sequelize.define('Banner', {
  // Primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  // Banner information
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Banner title'
  },

  subtitle: {
    type: DataTypes.STRING(300),
    allowNull: true,
    comment: 'Banner subtitle or description'
  },

  // Image and media
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      isUrl: true
    },
    comment: 'Banner image URL'
  },

  thumbnail_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: true
    },
    comment: 'Banner thumbnail URL'
  },

  // Action and navigation
  action_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: true
    },
    comment: 'URL to navigate when banner is clicked'
  },

  action_text: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Text for the action button'
  },

  // Banner settings
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Display order position'
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: 'Whether banner is active and visible'
  },

  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Whether banner is featured (prominent display)'
  },

  // Display settings
  display_type: {
    type: DataTypes.ENUM('carousel', 'sidebar', 'popup', 'notification'),
    defaultValue: 'carousel',
    allowNull: false,
    comment: 'Where the banner should be displayed'
  },

  target_audience: {
    type: DataTypes.ENUM('all', 'players', 'coaches', 'clubs', 'partners', 'admins'),
    defaultValue: 'all',
    allowNull: false,
    comment: 'Target audience for the banner'
  },

  // Timing and scheduling
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When banner should start being displayed'
  },

  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When banner should stop being displayed'
  },

  // Related content
  related_tournament_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'Related tournament ID if banner is for a tournament'
  },

  related_club_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'Related club ID if banner is for a club'
  },

  related_event_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'Related event ID if banner is for an event'
  },

  // Analytics and tracking
  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of times banner was clicked'
  },

  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: 'Number of times banner was viewed'
  },

  // Metadata
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Tags for categorizing banners'
  },

  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional metadata for the banner'
  },

  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin notes about the banner'
  }

}, {
  tableName: 'banners',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['is_active', 'display_type']
    },
    {
      fields: ['start_date', 'end_date']
    },
    {
      fields: ['position']
    },
    {
      fields: ['target_audience']
    }
  ]
});

// Instance methods
Banner.prototype.incrementView = async function() {
  this.view_count += 1;
  await this.save();
};

Banner.prototype.incrementClick = async function() {
  this.click_count += 1;
  await this.save();
};

Banner.prototype.isCurrentlyActive = function() {
  const now = new Date();
  
  // Check if banner is marked as active
  if (!this.is_active) return false;
  
  // Check start date
  if (this.start_date && now < this.start_date) return false;
  
  // Check end date
  if (this.end_date && now > this.end_date) return false;
  
  return true;
};

// Class methods
Banner.getActiveBanners = async function(displayType = 'carousel', targetAudience = 'all') {
  const now = new Date();
  
  return await this.findAll({
    where: {
      is_active: true,
      display_type: displayType,
      [sequelize.Op.or]: [
        { target_audience: 'all' },
        { target_audience: targetAudience }
      ],
      [sequelize.Op.or]: [
        { start_date: null },
        { start_date: { [sequelize.Op.lte]: now } }
      ],
      [sequelize.Op.or]: [
        { end_date: null },
        { end_date: { [sequelize.Op.gte]: now } }
      ]
    },
    order: [
      ['is_featured', 'DESC'],
      ['position', 'ASC'],
      ['created_at', 'DESC']
    ]
  });
};

Banner.getCarouselBanners = async function() {
  return await this.getActiveBanners('carousel');
};

Banner.getSidebarBanners = async function() {
  return await this.getActiveBanners('sidebar');
};

module.exports = Banner; 