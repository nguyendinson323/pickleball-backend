/**
 * Migration: Create Coach Finders Table
 * 
 * Creates the coach_finders table for location-based coach search functionality.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coach_finders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      searcher_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'ID of the player searching for a coach'
      },
      preferred_skill_focus: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Array of skills to focus on (e.g., ["serve", "volley", "strategy"])'
      },
      experience_level_required: {
        type: Sequelize.ENUM('beginner', 'intermediate', 'advanced', 'professional', 'any'),
        defaultValue: 'any',
        allowNull: false,
        comment: 'Required coach experience level'
      },
      lesson_type: {
        type: Sequelize.ENUM('individual', 'group', 'clinic', 'any'),
        defaultValue: 'any',
        allowNull: false,
        comment: 'Preferred lesson type'
      },
      budget_range_min: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        comment: 'Minimum budget per lesson in pesos'
      },
      budget_range_max: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        comment: 'Maximum budget per lesson in pesos'
      },
      preferred_location: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Preferred location for lessons'
      },
      location_type: {
        type: Sequelize.ENUM('outdoor_court', 'indoor_court', 'club', 'private_court', 'any'),
        defaultValue: 'any',
        allowNull: false,
        comment: 'Preferred location type'
      },
      max_travel_distance: {
        type: Sequelize.INTEGER,
        defaultValue: 50,
        allowNull: false,
        comment: 'Maximum distance willing to travel in kilometers'
      },
      availability_schedule: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Available schedule for lessons'
      },
      goals_and_notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Learning goals and additional notes'
      },
      language_preference: {
        type: Sequelize.STRING(50),
        defaultValue: 'spanish',
        allowNull: false,
        comment: 'Preferred lesson language'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: 'Whether the search request is active'
      },
      status: {
        type: Sequelize.ENUM('searching', 'matched', 'inactive', 'completed'),
        defaultValue: 'searching',
        allowNull: false,
        comment: 'Current status of the search'
      },
      matched_coach_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'ID of matched coach if found'
      },
      matched_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When the match was made'
      },
      contact_preference: {
        type: Sequelize.ENUM('email', 'phone', 'whatsapp', 'in_app'),
        defaultValue: 'in_app',
        allowNull: false,
        comment: 'Preferred contact method'
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
        comment: 'Phone number for contact'
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Email for contact'
      },
      urgency: {
        type: Sequelize.ENUM('low', 'medium', 'high', 'urgent'),
        defaultValue: 'medium',
        allowNull: false,
        comment: 'Urgency of finding a coach'
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When the search request expires'
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
    await queryInterface.addIndex('coach_finders', ['searcher_id']);
    await queryInterface.addIndex('coach_finders', ['is_active']);
    await queryInterface.addIndex('coach_finders', ['status']);
    await queryInterface.addIndex('coach_finders', ['preferred_location']);
    await queryInterface.addIndex('coach_finders', ['experience_level_required']);
    await queryInterface.addIndex('coach_finders', ['lesson_type']);
    await queryInterface.addIndex('coach_finders', ['matched_coach_id']);
    await queryInterface.addIndex('coach_finders', ['expires_at']);
    await queryInterface.addIndex('coach_finders', ['created_at']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('coach_finders');
  }
};