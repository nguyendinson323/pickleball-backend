/**
 * Migration: Create Rankings Table
 * 
 * This migration creates the rankings table with all necessary fields
 * for player ranking management and statistics tracking.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rankings', {
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
      category: {
        type: Sequelize.ENUM('singles', 'doubles', 'mixed_doubles', 'overall'),
        allowNull: false
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
      state: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      region: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      national_rank: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      state_rank: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      regional_rank: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_tournaments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tournaments_won: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tournaments_runner_up: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tournaments_semi_final: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_matches: {
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
      win_percentage: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0
      },
      total_games: {
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
      game_win_percentage: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0
      },
      current_streak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      longest_streak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      last_tournament_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_match_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      ranking_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      previous_rank: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      rank_change: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      previous_points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      points_change: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.addIndex('rankings', ['user_id'], {
      name: 'rankings_user_id_index'
    });

    await queryInterface.addIndex('rankings', ['category'], {
      name: 'rankings_category_index'
    });

    await queryInterface.addIndex('rankings', ['skill_level'], {
      name: 'rankings_skill_level_index'
    });

    await queryInterface.addIndex('rankings', ['gender_category'], {
      name: 'rankings_gender_category_index'
    });

    await queryInterface.addIndex('rankings', ['state'], {
      name: 'rankings_state_index'
    });

    await queryInterface.addIndex('rankings', ['region'], {
      name: 'rankings_region_index'
    });

    await queryInterface.addIndex('rankings', ['national_rank'], {
      name: 'rankings_national_rank_index'
    });

    await queryInterface.addIndex('rankings', ['state_rank'], {
      name: 'rankings_state_rank_index'
    });

    await queryInterface.addIndex('rankings', ['regional_rank'], {
      name: 'rankings_regional_rank_index'
    });

    await queryInterface.addIndex('rankings', ['points'], {
      name: 'rankings_points_index'
    });

    await queryInterface.addIndex('rankings', ['win_percentage'], {
      name: 'rankings_win_percentage_index'
    });

    await queryInterface.addIndex('rankings', ['ranking_date'], {
      name: 'rankings_ranking_date_index'
    });

    await queryInterface.addIndex('rankings', ['is_active'], {
      name: 'rankings_is_active_index'
    });

    await queryInterface.addIndex('rankings', ['created_at'], {
      name: 'rankings_created_at_index'
    });

    // Composite indexes for efficient ranking queries
    await queryInterface.addIndex('rankings', ['category', 'skill_level', 'gender_category', 'state', 'points'], {
      name: 'rankings_category_skill_gender_state_points_index'
    });

    await queryInterface.addIndex('rankings', ['category', 'national_rank'], {
      name: 'rankings_category_national_rank_index'
    });

    await queryInterface.addIndex('rankings', ['category', 'state', 'state_rank'], {
      name: 'rankings_category_state_rank_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rankings');
  }
}; 