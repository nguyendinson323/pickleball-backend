/**
 * Migration: Create Player Finders Table
 * 
 * This migration creates the player_finders table with all necessary fields
 * for player search preferences and matching functionality.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('player_finders', {
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
        onDelete: 'CASCADE'
      },
      skill_level_min: {
        type: Sequelize.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
        allowNull: true
      },
      skill_level_max: {
        type: Sequelize.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
        allowNull: true
      },
      preferred_gender: {
        type: Sequelize.ENUM('male', 'female', 'any'),
        allowNull: false,
        defaultValue: 'any'
      },
      age_range_min: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      age_range_max: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      search_radius_km: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 50
      },
      preferred_locations: {
        type: Sequelize.JSON,
        allowNull: true
      },
      match_type: {
        type: Sequelize.ENUM('singles', 'doubles', 'mixed_doubles', 'any'),
        allowNull: false,
        defaultValue: 'any'
      },
      availability_days: {
        type: Sequelize.JSON,
        allowNull: true
      },
      availability_time_start: {
        type: Sequelize.TIME,
        allowNull: true
      },
      availability_time_end: {
        type: Sequelize.TIME,
        allowNull: true
      },
      contact_method: {
        type: Sequelize.ENUM('email', 'phone', 'whatsapp', 'any'),
        allowNull: false,
        defaultValue: 'any'
      },
      auto_notify: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      last_search_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      total_matches_found: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      matches_contacted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      successful_matches: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      search_criteria: {
        type: Sequelize.JSON,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex('player_finders', ['searcher_id'], {
      name: 'player_finders_searcher_id_index'
    });

    await queryInterface.addIndex('player_finders', ['skill_level_min'], {
      name: 'player_finders_skill_level_min_index'
    });

    await queryInterface.addIndex('player_finders', ['skill_level_max'], {
      name: 'player_finders_skill_level_max_index'
    });

    await queryInterface.addIndex('player_finders', ['preferred_gender'], {
      name: 'player_finders_preferred_gender_index'
    });

    await queryInterface.addIndex('player_finders', ['match_type'], {
      name: 'player_finders_match_type_index'
    });

    await queryInterface.addIndex('player_finders', ['contact_method'], {
      name: 'player_finders_contact_method_index'
    });

    await queryInterface.addIndex('player_finders', ['is_active'], {
      name: 'player_finders_is_active_index'
    });

    await queryInterface.addIndex('player_finders', ['last_search_date'], {
      name: 'player_finders_last_search_date_index'
    });

    await queryInterface.addIndex('player_finders', ['total_matches_found'], {
      name: 'player_finders_total_matches_found_index'
    });

    await queryInterface.addIndex('player_finders', ['successful_matches'], {
      name: 'player_finders_successful_matches_index'
    });

    await queryInterface.addIndex('player_finders', ['created_at'], {
      name: 'player_finders_created_at_index'
    });

    // Unique constraint to ensure one finder per user
    await queryInterface.addIndex('player_finders', ['searcher_id'], {
      unique: true,
      name: 'player_finders_searcher_id_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('player_finders');
  }
}; 