/**
 * Migration: Create Messages Table
 * 
 * Creates the messages table for private messaging between users.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Message subject line'
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Message body content'
      },
      message_type: {
        type: Sequelize.ENUM(
          'direct_message',
          'system_notification',
          'announcement_notification',
          'match_request',
          'tournament_notification',
          'payment_notification',
          'reminder'
        ),
        defaultValue: 'direct_message',
        allowNull: false,
        comment: 'Type of message'
      },
      sender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'ID of user who sent the message'
      },
      recipient_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'ID of user who receives the message'
      },
      parent_message_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'messages',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'ID of parent message if this is a reply'
      },
      thread_id: {
        type: Sequelize.UUID,
        allowNull: true,
        comment: 'ID to group related messages in a conversation'
      },
      priority: {
        type: Sequelize.ENUM('low', 'normal', 'high', 'urgent'),
        defaultValue: 'normal',
        allowNull: false,
        comment: 'Message priority level'
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether message has been read by recipient'
      },
      read_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When the message was read'
      },
      is_archived_by_sender: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether sender has archived this message'
      },
      is_archived_by_recipient: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether recipient has archived this message'
      },
      is_starred_by_sender: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether sender has starred this message'
      },
      is_starred_by_recipient: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Whether recipient has starred this message'
      },
      sender_deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When sender deleted the message'
      },
      recipient_deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When recipient deleted the message'
      },
      attachments: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Array of attachment file URLs and metadata'
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Additional message metadata'
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When the message expires (for temporary messages)'
      },
      delivery_status: {
        type: Sequelize.ENUM('pending', 'sent', 'delivered', 'failed'),
        defaultValue: 'sent',
        allowNull: false,
        comment: 'Message delivery status'
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
    await queryInterface.addIndex('messages', ['sender_id']);
    await queryInterface.addIndex('messages', ['recipient_id']);
    await queryInterface.addIndex('messages', ['parent_message_id']);
    await queryInterface.addIndex('messages', ['thread_id']);
    await queryInterface.addIndex('messages', ['message_type']);
    await queryInterface.addIndex('messages', ['is_read']);
    await queryInterface.addIndex('messages', ['priority']);
    await queryInterface.addIndex('messages', ['created_at']);
    await queryInterface.addIndex('messages', ['expires_at']);
    
    // Composite indexes for common queries
    await queryInterface.addIndex('messages', ['recipient_id', 'is_read'], {
      name: 'messages_recipient_read_index'
    });
    
    await queryInterface.addIndex('messages', ['sender_id', 'recipient_id'], {
      name: 'messages_conversation_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  }
};