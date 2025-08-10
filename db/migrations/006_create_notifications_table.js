/**
 * Migration: Create Notifications Table
 * 
 * This migration creates the notifications table with all necessary fields
 * for notification management, delivery, and user preferences.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('tournament', 'match', 'payment', 'membership', 'system', 'reminder', 'announcement', 'match_request'),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_sent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      sent_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      read_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      priority: {
        type: Sequelize.ENUM('low', 'normal', 'high', 'urgent'),
        allowNull: false,
        defaultValue: 'normal'
      },
      delivery_method: {
        type: Sequelize.ENUM('email', 'sms', 'push', 'in_app'),
        allowNull: false,
        defaultValue: 'in_app'
      },
      related_tournament_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tournaments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      related_match_id: {
        type: Sequelize.UUID,
        allowNull: true
      },
      related_payment_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'payments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      related_club_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'clubs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      action_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      action_text: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true
      },
      scheduled_for: {
        type: Sequelize.DATE,
        allowNull: true
      },
      expires_at: {
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
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Add indexes
    await queryInterface.addIndex('notifications', ['user_id'], {
      name: 'notifications_user_id_index'
    });

    await queryInterface.addIndex('notifications', ['type'], {
      name: 'notifications_type_index'
    });

    await queryInterface.addIndex('notifications', ['is_read'], {
      name: 'notifications_is_read_index'
    });

    await queryInterface.addIndex('notifications', ['is_sent'], {
      name: 'notifications_is_sent_index'
    });

    await queryInterface.addIndex('notifications', ['priority'], {
      name: 'notifications_priority_index'
    });

    await queryInterface.addIndex('notifications', ['delivery_method'], {
      name: 'notifications_delivery_method_index'
    });

    await queryInterface.addIndex('notifications', ['related_tournament_id'], {
      name: 'notifications_related_tournament_id_index'
    });

    await queryInterface.addIndex('notifications', ['related_payment_id'], {
      name: 'notifications_related_payment_id_index'
    });

    await queryInterface.addIndex('notifications', ['related_club_id'], {
      name: 'notifications_related_club_id_index'
    });

    await queryInterface.addIndex('notifications', ['scheduled_for'], {
      name: 'notifications_scheduled_for_index'
    });

    await queryInterface.addIndex('notifications', ['expires_at'], {
      name: 'notifications_expires_at_index'
    });

    await queryInterface.addIndex('notifications', ['created_at'], {
      name: 'notifications_created_at_index'
    });

    await queryInterface.addIndex('notifications', ['user_id', 'is_read'], {
      name: 'notifications_user_read_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notifications');
  }
}; 