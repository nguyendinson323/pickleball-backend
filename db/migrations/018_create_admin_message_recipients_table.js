/**
 * Migration: Create Admin Message Recipients Table
 * 
 * Creates the admin_message_recipients table for tracking delivery of admin messages.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin_message_recipients', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      admin_message_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'admin_messages',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      recipient_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      recipient_email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Cached email for delivery'
      },
      recipient_name: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: 'Cached name for personalization'
      },
      recipient_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'Cached user type for analytics'
      },
      delivery_status: {
        type: Sequelize.ENUM('pending', 'sent', 'delivered', 'failed', 'bounced'),
        defaultValue: 'pending',
        allowNull: false
      },
      sent_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      delivered_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      read_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      clicked_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      error_message: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Error message if delivery failed'
      },
      is_dismissed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether recipient dismissed the message'
      },
      dismissed_at: {
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.addIndex('admin_message_recipients', ['admin_message_id'], {
      name: 'admin_message_recipients_admin_message_id_index'
    });

    await queryInterface.addIndex('admin_message_recipients', ['recipient_id'], {
      name: 'admin_message_recipients_recipient_id_index'
    });

    await queryInterface.addIndex('admin_message_recipients', ['delivery_status'], {
      name: 'admin_message_recipients_delivery_status_index'
    });

    await queryInterface.addIndex('admin_message_recipients', ['sent_at'], {
      name: 'admin_message_recipients_sent_at_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin_message_recipients');
  }
};