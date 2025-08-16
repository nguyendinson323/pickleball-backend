/**
 * Migration: Create Users Table
 * 
 * This migration creates the users table with all necessary fields
 * for user management, authentication, and profile information.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      full_name: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      profile_photo: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      user_type: {
        type: Sequelize.ENUM('player', 'coach', 'club', 'partner', 'state', 'admin'),
        allowNull: false,
        defaultValue: 'player'
      },
      skill_level: {
        type: Sequelize.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
        allowNull: true
      },
      membership_status: {
        type: Sequelize.ENUM('free', 'basic', 'premium', 'elite'),
        allowNull: false,
        defaultValue: 'free'
      },
      membership_expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      email_verification_token: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      email_verification_expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      password_reset_token: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      password_reset_expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
      },
      login_attempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      locked_until: {
        type: Sequelize.DATE,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true
      },
      timezone: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      // Organization specific fields
      business_name: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      contact_person: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      job_title: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      curp: {
        type: Sequelize.STRING(18),
        allowNull: true,
        unique: true
      },
      rfc: {
        type: Sequelize.STRING(13),
        allowNull: true
      },
      website: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      verification_documents: {
        type: Sequelize.JSON,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      preferences: {
        type: Sequelize.JSON,
        allowNull: true
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true
      },
      club_id: {
        type: Sequelize.UUID,
        allowNull: true
      },
      can_be_found: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether player can be found in player search (privacy setting)'
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
    await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'users_email_unique'
    });

    await queryInterface.addIndex('users', ['username'], {
      unique: true,
      name: 'users_username_unique'
    });

    await queryInterface.addIndex('users', ['user_type'], {
      name: 'users_user_type_index'
    });

    await queryInterface.addIndex('users', ['skill_level'], {
      name: 'users_skill_level_index'
    });

    await queryInterface.addIndex('users', ['membership_status'], {
      name: 'users_membership_status_index'
    });

    await queryInterface.addIndex('users', ['state'], {
      name: 'users_state_index'
    });

    await queryInterface.addIndex('users', ['city'], {
      name: 'users_city_index'
    });

    await queryInterface.addIndex('users', ['latitude', 'longitude'], {
      name: 'users_location_index'
    });

    await queryInterface.addIndex('users', ['is_active'], {
      name: 'users_is_active_index'
    });

    await queryInterface.addIndex('users', ['created_at'], {
      name: 'users_created_at_index'
    });

    await queryInterface.addIndex('users', ['can_be_found'], {
      name: 'users_can_be_found_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
}; 