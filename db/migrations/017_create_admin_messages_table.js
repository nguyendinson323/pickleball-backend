/**
 * Migration: Create Admin Messages Table
 * 
 * Creates the admin_messages table for admin broadcast messaging system.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin_messages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Message title/subject'
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Message content body'
      },
      excerpt: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Short excerpt for preview'
      },
      message_type: {
        type: Sequelize.ENUM('announcement', 'notification', 'alert', 'reminder', 'newsletter'),
        defaultValue: 'announcement',
        allowNull: false,
        comment: 'Type of message'
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high', 'urgent'),
        defaultValue: 'medium',
        allowNull: false,
        comment: 'Message priority level'
      },
      status: {
        type: Sequelize.ENUM('draft', 'scheduled', 'sending', 'sent', 'cancelled'),
        defaultValue: 'draft',
        allowNull: false,
        comment: 'Message status'
      },
      sender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        comment: 'ID of admin user who created the message',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      sender_name: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: 'Name of sender (cached for display)'
      },
      target_audience: {
        type: Sequelize.ENUM(
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
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Additional filters: states, cities, membership levels, specific user IDs'
      },
      scheduled_send_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When to send the message (null for immediate)'
      },
      sent_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When the message was actually sent'
      },
      total_recipients: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Total number of intended recipients'
      },
      sent_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Number of messages successfully sent'
      },
      read_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Number of recipients who read the message'
      },
      click_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Number of clicks on action buttons/links'
      },
      action_button_text: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Text for action button (e.g., "Register Now", "View Details")'
      },
      action_button_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'URL for action button'
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When the message expires and is no longer shown'
      },
      is_pinned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether to pin the message at the top'
      },
      send_via_email: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether to also send via email'
      },
      send_via_notification: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: 'Whether to send as in-app notification'
      },
      attachments: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'File attachments (images, PDFs, etc.)'
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Additional metadata for the message'
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Tags for categorizing messages'
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
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Add indexes
    await queryInterface.addIndex('admin_messages', ['sender_id']);
    await queryInterface.addIndex('admin_messages', ['status']);
    await queryInterface.addIndex('admin_messages', ['target_audience']);
    await queryInterface.addIndex('admin_messages', ['priority']);
    await queryInterface.addIndex('admin_messages', ['scheduled_send_at']);
    await queryInterface.addIndex('admin_messages', ['sent_at']);
    await queryInterface.addIndex('admin_messages', ['expires_at']);
    await queryInterface.addIndex('admin_messages', ['is_pinned']);
    await queryInterface.addIndex('admin_messages', ['created_at']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin_messages');
  }
};