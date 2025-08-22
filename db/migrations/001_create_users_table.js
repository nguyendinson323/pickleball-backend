/**
 * Migration: Create Integrated Users Table
 * 
 * This migration creates the users table with all necessary fields including
 * user management, authentication, profile information, coaching features,
 * and microsite functionality - all integrated in one comprehensive migration.
 * 
 * @author Pickleball Federation Team
 * @version 2.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      // Core Identity Fields
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
      
      // Personal Information
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
      
      // User Classification
      user_type: {
        type: Sequelize.ENUM('player', 'coach', 'club', 'partner', 'state', 'admin'),
        allowNull: false,
        defaultValue: 'player'
      },
      skill_level: {
        type: Sequelize.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
        allowNull: true
      },
      
      // Membership and Status
      membership_status: {
        type: Sequelize.ENUM('free', 'basic', 'premium', 'elite'),
        allowNull: false,
        defaultValue: 'free'
      },
      membership_expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      
      // Authentication and Security
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
      
      // Location Information
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
      
      // Organization/Business Fields
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
      
      // System Fields
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
      
      // Player Search Features
      can_be_found: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether player can be found in player search (privacy setting)'
      },
      
      // Coach-Specific Fields
      is_findable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: 'Whether coach can be found in coach search (privacy setting)'
      },
      coaching_experience: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Years of coaching experience'
      },
      specializations: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Array of coaching specializations (serve, volley, strategy, etc.)'
      },
      hourly_rate: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: true,
        comment: 'Hourly coaching rate'
      },
      available_for_lessons: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: 'Whether coach is currently accepting new students'
      },
      coaching_languages: {
        type: Sequelize.JSON,
        defaultValue: JSON.stringify(['English']),
        allowNull: false,
        comment: 'Languages coach can teach in'
      },
      coaching_locations: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Preferred coaching locations or travel radius'
      },
      lesson_types_offered: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Types of lessons offered (individual, group, clinic, etc.)'
      },
      coaching_schedule: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Available days and times for coaching'
      },
      coaching_bio: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Coach biography and teaching philosophy'
      },
      certifications: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Array of coaching certifications and credentials'
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: true,
        comment: 'Average rating from students (0.0 to 5.0)'
      },
      reviews_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Total number of reviews received'
      },
      total_students: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Total number of students coached'
      },
      active_students: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Current number of active students'
      },
      
      // Microsite Fields
      microsite_status: {
        type: Sequelize.ENUM('active', 'inactive', 'pending', 'maintenance', 'suspended'),
        defaultValue: 'active',
        allowNull: false,
        comment: 'Status of user\'s microsite'
      },
      microsite_template: {
        type: Sequelize.ENUM('basic', 'professional', 'premium', 'custom'),
        defaultValue: 'basic',
        allowNull: false,
        comment: 'Template used for user\'s microsite'
      },
      microsite_custom_domain: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Custom domain for user\'s microsite'
      },
      microsite_settings: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'JSON object containing microsite configuration and settings'
      },
      
      // Timestamps
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

    // Add Core Indexes
    await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'users_email_unique'
    });

    await queryInterface.addIndex('users', ['username'], {
      unique: true,
      name: 'users_username_unique'
    });

    // Classification and Status Indexes
    await queryInterface.addIndex('users', ['user_type'], {
      name: 'users_user_type_index'
    });

    await queryInterface.addIndex('users', ['skill_level'], {
      name: 'users_skill_level_index'
    });

    await queryInterface.addIndex('users', ['membership_status'], {
      name: 'users_membership_status_index'
    });

    await queryInterface.addIndex('users', ['is_active'], {
      name: 'users_is_active_index'
    });

    // Location Indexes
    await queryInterface.addIndex('users', ['state'], {
      name: 'users_state_index'
    });

    await queryInterface.addIndex('users', ['city'], {
      name: 'users_city_index'
    });

    await queryInterface.addIndex('users', ['latitude', 'longitude'], {
      name: 'users_location_index'
    });

    // Time-based Indexes
    await queryInterface.addIndex('users', ['created_at'], {
      name: 'users_created_at_index'
    });

    // Player Search Indexes
    await queryInterface.addIndex('users', ['can_be_found'], {
      name: 'users_can_be_found_index'
    });

    // Coach-specific Indexes
    await queryInterface.addIndex('users', ['is_findable'], {
      name: 'users_is_findable_index'
    });

    await queryInterface.addIndex('users', ['coaching_experience'], {
      name: 'users_coaching_experience_index'
    });

    await queryInterface.addIndex('users', ['hourly_rate'], {
      name: 'users_hourly_rate_index'
    });

    await queryInterface.addIndex('users', ['available_for_lessons'], {
      name: 'users_available_for_lessons_index'
    });

    await queryInterface.addIndex('users', ['rating'], {
      name: 'users_rating_index'
    });

    await queryInterface.addIndex('users', ['reviews_count'], {
      name: 'users_reviews_count_index'
    });

    // Microsite Indexes
    await queryInterface.addIndex('users', ['microsite_status'], {
      name: 'users_microsite_status_index'
    });

    await queryInterface.addIndex('users', ['microsite_template'], {
      name: 'users_microsite_template_index'
    });

    await queryInterface.addIndex('users', ['microsite_custom_domain'], {
      name: 'users_microsite_custom_domain_index'
    });

    // Composite Indexes for Performance Optimization
    await queryInterface.addIndex('users', ['user_type', 'is_findable', 'available_for_lessons', 'is_active'], {
      name: 'users_coach_search_index'
    });

    await queryInterface.addIndex('users', ['user_type', 'can_be_found', 'is_active'], {
      name: 'users_player_search_index'
    });

    await queryInterface.addIndex('users', ['microsite_status', 'microsite_template'], {
      name: 'users_microsite_search_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};