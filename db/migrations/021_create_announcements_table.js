/**
 * Migration: Create Announcements Table
 * 
 * Creates the announcements table for system announcements.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('announcements', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Announcement title/headline'
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Full announcement content/body'
      },
      excerpt: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Short summary/excerpt for previews'
      },
      announcement_type: {
        type: Sequelize.ENUM(
          'general_announcement',
          'tournament_announcement',
          'maintenance_notice',
          'system_update',
          'policy_change',
          'event_notice',
          'urgent_notice'
        ),
        defaultValue: 'general_announcement',
        allowNull: false,
        comment: 'Type/category of announcement'
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high', 'urgent'),
        defaultValue: 'medium',
        allowNull: false,
        comment: 'Announcement priority level'
      },
      status: {
        type: Sequelize.ENUM('draft', 'published', 'archived', 'expired'),
        defaultValue: 'draft',
        allowNull: false,
        comment: 'Current status of the announcement'
      },
      visibility: {
        type: Sequelize.ENUM(
          'public',
          'members_only', 
          'players_only',
          'coaches_only',
          'clubs_only',
          'admins_only'
        ),
        defaultValue: 'public',
        allowNull: false,
        comment: 'Who can see this announcement'
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        comment: 'ID of admin who created the announcement'
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When the announcement was published'
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When the announcement expires'
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether to feature this announcement prominently'
      },
      is_sticky: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether to keep announcement at top of list'
      },
      display_until: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Display announcement until this date'
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Featured image URL for the announcement'
      },
      action_button_text: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Text for call-to-action button'
      },
      action_button_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'URL for call-to-action button'
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Tags for categorizing announcements'
      },
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Number of times announcement has been viewed'
      },
      click_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Number of times action button has been clicked'
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Additional metadata for the announcement'
      },
      send_notification: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: 'Whether to send push notification when published'
      },
      notification_sent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether notification has been sent'
      },
      notification_sent_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When notification was sent'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    // Add indexes
    await queryInterface.addIndex('announcements', ['created_by']);
    await queryInterface.addIndex('announcements', ['status']);
    await queryInterface.addIndex('announcements', ['announcement_type']);
    await queryInterface.addIndex('announcements', ['priority']);
    await queryInterface.addIndex('announcements', ['visibility']);
    await queryInterface.addIndex('announcements', ['published_at']);
    await queryInterface.addIndex('announcements', ['expires_at']);
    await queryInterface.addIndex('announcements', ['display_until']);
    await queryInterface.addIndex('announcements', ['is_featured']);
    await queryInterface.addIndex('announcements', ['is_sticky']);
    await queryInterface.addIndex('announcements', ['created_at']);
    
    // Composite indexes for common queries
    await queryInterface.addIndex('announcements', ['status', 'visibility'], {
      name: 'announcements_status_visibility_index'
    });
    
    await queryInterface.addIndex('announcements', ['is_featured', 'is_sticky'], {
      name: 'announcements_featured_sticky_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('announcements');
  }
};