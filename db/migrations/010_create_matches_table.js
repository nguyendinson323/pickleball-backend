/**
 * Migration: Create Matches Table
 * 
 * This migration creates the matches table with all necessary fields
 * for match management, scoring, and results tracking.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      tournament_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tournaments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      court_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'courts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      match_type: {
        type: Sequelize.ENUM('singles', 'doubles', 'mixed_doubles'),
        allowNull: false
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      round: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      match_number: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      player1_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
      team1_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tournament_teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      team2_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tournament_teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      scheduled_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      actual_start_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      actual_end_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      duration_minutes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('scheduled', 'in_progress', 'completed', 'cancelled', 'postponed', 'forfeit'),
        allowNull: false,
        defaultValue: 'scheduled'
      },
      winner_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      winning_team_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tournament_teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      score: {
        type: Sequelize.JSON,
        allowNull: true
      },
      games_played: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      games_to_win: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2
      },
      points_to_win_game: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 11
      },
      win_by_margin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2
      },
      referee_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      scorekeeper_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_streamed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      stream_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      highlights_url: {
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
    await queryInterface.addIndex('matches', ['tournament_id'], {
      name: 'matches_tournament_id_index'
    });

    await queryInterface.addIndex('matches', ['court_id'], {
      name: 'matches_court_id_index'
    });

    await queryInterface.addIndex('matches', ['match_type'], {
      name: 'matches_match_type_index'
    });

    await queryInterface.addIndex('matches', ['status'], {
      name: 'matches_status_index'
    });

    await queryInterface.addIndex('matches', ['player1_id'], {
      name: 'matches_player1_id_index'
    });

    await queryInterface.addIndex('matches', ['player2_id'], {
      name: 'matches_player2_id_index'
    });

    await queryInterface.addIndex('matches', ['player3_id'], {
      name: 'matches_player3_id_index'
    });

    await queryInterface.addIndex('matches', ['player4_id'], {
      name: 'matches_player4_id_index'
    });

    await queryInterface.addIndex('matches', ['team1_id'], {
      name: 'matches_team1_id_index'
    });

    await queryInterface.addIndex('matches', ['team2_id'], {
      name: 'matches_team2_id_index'
    });

    await queryInterface.addIndex('matches', ['winner_id'], {
      name: 'matches_winner_id_index'
    });

    await queryInterface.addIndex('matches', ['winning_team_id'], {
      name: 'matches_winning_team_id_index'
    });

    await queryInterface.addIndex('matches', ['referee_id'], {
      name: 'matches_referee_id_index'
    });

    await queryInterface.addIndex('matches', ['scorekeeper_id'], {
      name: 'matches_scorekeeper_id_index'
    });

    await queryInterface.addIndex('matches', ['scheduled_time'], {
      name: 'matches_scheduled_time_index'
    });

    await queryInterface.addIndex('matches', ['actual_start_time'], {
      name: 'matches_actual_start_time_index'
    });

    await queryInterface.addIndex('matches', ['is_featured'], {
      name: 'matches_is_featured_index'
    });

    await queryInterface.addIndex('matches', ['created_at'], {
      name: 'matches_created_at_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
}; 