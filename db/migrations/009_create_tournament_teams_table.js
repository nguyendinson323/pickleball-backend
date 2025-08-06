/**
 * Migration: Create Tournament Teams Table
 * 
 * This migration creates the tournament_teams table with all necessary fields
 * for team management in tournaments.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tournament_teams', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      tournament_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tournaments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      team_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      captain_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      player1_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      player2_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      player3_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      player4_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      skill_level: {
        type: Sequelize.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
        allowNull: true
      },
      age_group: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      gender_category: {
        type: Sequelize.ENUM('men', 'women', 'mixed', 'open'),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'waitlisted', 'cancelled', 'withdrawn'),
        allowNull: false,
        defaultValue: 'pending'
      },
      seed_position: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      final_rank: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      points_earned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      matches_won: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      matches_lost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      games_won: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      games_lost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      team_logo: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      team_colors: {
        type: Sequelize.JSON,
        allowNull: true
      },
      registration_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      confirmed_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      cancelled_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      cancelled_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      cancellation_reason: {
        type: Sequelize.STRING(500),
        allowNull: true
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
    await queryInterface.addIndex('tournament_teams', ['tournament_id'], {
      name: 'tournament_teams_tournament_id_index'
    });

    await queryInterface.addIndex('tournament_teams', ['captain_id'], {
      name: 'tournament_teams_captain_id_index'
    });

    await queryInterface.addIndex('tournament_teams', ['player1_id'], {
      name: 'tournament_teams_player1_id_index'
    });

    await queryInterface.addIndex('tournament_teams', ['player2_id'], {
      name: 'tournament_teams_player2_id_index'
    });

    await queryInterface.addIndex('tournament_teams', ['player3_id'], {
      name: 'tournament_teams_player3_id_index'
    });

    await queryInterface.addIndex('tournament_teams', ['player4_id'], {
      name: 'tournament_teams_player4_id_index'
    });

    await queryInterface.addIndex('tournament_teams', ['status'], {
      name: 'tournament_teams_status_index'
    });

    await queryInterface.addIndex('tournament_teams', ['skill_level'], {
      name: 'tournament_teams_skill_level_index'
    });

    await queryInterface.addIndex('tournament_teams', ['gender_category'], {
      name: 'tournament_teams_gender_category_index'
    });

    await queryInterface.addIndex('tournament_teams', ['seed_position'], {
      name: 'tournament_teams_seed_position_index'
    });

    await queryInterface.addIndex('tournament_teams', ['final_rank'], {
      name: 'tournament_teams_final_rank_index'
    });

    await queryInterface.addIndex('tournament_teams', ['registration_date'], {
      name: 'tournament_teams_registration_date_index'
    });

    await queryInterface.addIndex('tournament_teams', ['created_at'], {
      name: 'tournament_teams_created_at_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tournament_teams');
  }
}; 