/**
 * Migration: Create Tournament Team Members Table
 * 
 * Creates the tournament_team_members table as a through table for team tournaments.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tournament_team_members', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tournament_teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      role: {
        type: Sequelize.ENUM('captain', 'player', 'substitute'),
        defaultValue: 'player',
        allowNull: false,
        comment: 'Role of the member in the team'
      },
      joined_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'When the member joined the team'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: 'Whether the member is currently active'
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
    await queryInterface.addIndex('tournament_team_members', ['team_id'], {
      name: 'tournament_team_members_team_id_index'
    });

    await queryInterface.addIndex('tournament_team_members', ['user_id'], {
      name: 'tournament_team_members_user_id_index'
    });

    // Add unique constraint to prevent duplicate memberships
    await queryInterface.addIndex('tournament_team_members', ['team_id', 'user_id'], {
      name: 'tournament_team_members_team_user_unique',
      unique: true
    });

    // Add composite index for active members
    await queryInterface.addIndex('tournament_team_members', ['team_id', 'is_active'], {
      name: 'tournament_team_members_team_active_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tournament_team_members');
  }
};