/**
 * Migration: Create Tournaments Table
 * 
 * This migration creates the tournaments table with all necessary fields
 * for tournament management, scheduling, and competition details.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tournaments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tournament_type: {
        type: Sequelize.ENUM('singles', 'doubles', 'mixed_doubles', 'team', 'round_robin', 'elimination', 'mixed'),
        allowNull: false,
        defaultValue: 'doubles'
      },
      category: {
        type: Sequelize.ENUM('amateur', 'professional', 'recreational', 'youth', 'senior', 'mixed'),
        allowNull: false,
        defaultValue: 'amateur'
      },
      skill_level_min: {
        type: Sequelize.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
        allowNull: true
      },
      skill_level_max: {
        type: Sequelize.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
        allowNull: true
      },
      age_group_min: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      age_group_max: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      gender_category: {
        type: Sequelize.ENUM('men', 'women', 'mixed', 'open'),
        allowNull: false,
        defaultValue: 'open'
      },
      club_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'clubs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      organizer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      venue_name: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      venue_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      venue_city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      venue_state: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      venue_latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
      },
      venue_longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      registration_deadline: {
        type: Sequelize.DATE,
        allowNull: true
      },
      max_participants: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      current_participants: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      entry_fee: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0
      },
      prize_pool: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      prize_distribution: {
        type: Sequelize.JSON,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('draft', 'published', 'registration_open', 'registration_closed', 'in_progress', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'draft'
      },
      format: {
        type: Sequelize.ENUM('single_elimination', 'double_elimination', 'round_robin', 'swiss_system', 'custom'),
        allowNull: false,
        defaultValue: 'single_elimination'
      },
      rules: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      schedule: {
        type: Sequelize.JSON,
        allowNull: true
      },
      brackets: {
        type: Sequelize.JSON,
        allowNull: true
      },
      results: {
        type: Sequelize.JSON,
        allowNull: true
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      total_revenue: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      total_expenses: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      net_profit: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      metadata: {
        type: Sequelize.JSON,
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
    await queryInterface.addIndex('tournaments', ['club_id'], {
      name: 'tournaments_club_id_index'
    });

    await queryInterface.addIndex('tournaments', ['organizer_id'], {
      name: 'tournaments_organizer_id_index'
    });

    await queryInterface.addIndex('tournaments', ['tournament_type'], {
      name: 'tournaments_tournament_type_index'
    });

    await queryInterface.addIndex('tournaments', ['category'], {
      name: 'tournaments_category_index'
    });

    await queryInterface.addIndex('tournaments', ['skill_level_min', 'skill_level_max'], {
      name: 'tournaments_skill_level_index'
    });

    await queryInterface.addIndex('tournaments', ['gender_category'], {
      name: 'tournaments_gender_category_index'
    });

    await queryInterface.addIndex('tournaments', ['start_date'], {
      name: 'tournaments_start_date_index'
    });

    await queryInterface.addIndex('tournaments', ['end_date'], {
      name: 'tournaments_end_date_index'
    });

    await queryInterface.addIndex('tournaments', ['status'], {
      name: 'tournaments_status_index'
    });

    await queryInterface.addIndex('tournaments', ['venue_state'], {
      name: 'tournaments_venue_state_index'
    });

    await queryInterface.addIndex('tournaments', ['venue_city'], {
      name: 'tournaments_venue_city_index'
    });

    await queryInterface.addIndex('tournaments', ['is_featured'], {
      name: 'tournaments_is_featured_index'
    });

    await queryInterface.addIndex('tournaments', ['is_verified'], {
      name: 'tournaments_is_verified_index'
    });

    await queryInterface.addIndex('tournaments', ['is_active'], {
      name: 'tournaments_is_active_index'
    });

    await queryInterface.addIndex('tournaments', ['created_at'], {
      name: 'tournaments_created_at_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tournaments');
  }
}; 