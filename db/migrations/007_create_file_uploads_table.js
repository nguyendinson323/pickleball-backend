/**
 * Migration: Create File Uploads Table
 * 
 * This migration creates the file_uploads table with all necessary fields
 * for file management, storage tracking, and access control.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('file_uploads', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      tournament_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tournaments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      original_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      file_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      file_path: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      file_url: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      file_type: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      mime_type: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      file_size: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      file_extension: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      thumbnail_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      is_public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true
      },
      access_token: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      download_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      view_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.addIndex('file_uploads', ['user_id'], {
      name: 'file_uploads_user_id_index'
    });

    await queryInterface.addIndex('file_uploads', ['tournament_id'], {
      name: 'file_uploads_tournament_id_index'
    });

    await queryInterface.addIndex('file_uploads', ['file_type'], {
      name: 'file_uploads_file_type_index'
    });

    await queryInterface.addIndex('file_uploads', ['mime_type'], {
      name: 'file_uploads_mime_type_index'
    });

    await queryInterface.addIndex('file_uploads', ['is_public'], {
      name: 'file_uploads_is_public_index'
    });

    await queryInterface.addIndex('file_uploads', ['is_approved'], {
      name: 'file_uploads_is_approved_index'
    });

    await queryInterface.addIndex('file_uploads', ['is_deleted'], {
      name: 'file_uploads_is_deleted_index'
    });

    await queryInterface.addIndex('file_uploads', ['access_token'], {
      name: 'file_uploads_access_token_index'
    });

    await queryInterface.addIndex('file_uploads', ['expires_at'], {
      name: 'file_uploads_expires_at_index'
    });

    await queryInterface.addIndex('file_uploads', ['created_at'], {
      name: 'file_uploads_created_at_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('file_uploads');
  }
}; 