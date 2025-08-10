/**
 * Migration: Create Tournament Registrations Table
 * 
 * This migration creates the tournament_registrations table with all necessary fields
 * for tournament registration management and participant tracking.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tournament_registrations', {
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
      partner_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      registration_type: {
        type: Sequelize.ENUM('singles', 'doubles', 'mixed_doubles'),
        allowNull: false
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
      payment_status: {
        type: Sequelize.ENUM('pending', 'processing', 'completed', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'pending'
      },
      payment_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'payments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      entry_fee: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0
      },
      paid_amount: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0
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
      refund_amount: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0
      },
      special_requests: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      medical_info: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      emergency_contact: {
        type: Sequelize.JSON,
        allowNull: true
      },
      team_name: {
        type: Sequelize.STRING(100),
        allowNull: true
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
    await queryInterface.addIndex('tournament_registrations', ['tournament_id'], {
      name: 'tournament_registrations_tournament_id_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['user_id'], {
      name: 'tournament_registrations_user_id_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['partner_id'], {
      name: 'tournament_registrations_partner_id_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['registration_type'], {
      name: 'tournament_registrations_registration_type_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['status'], {
      name: 'tournament_registrations_status_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['payment_status'], {
      name: 'tournament_registrations_payment_status_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['payment_id'], {
      name: 'tournament_registrations_payment_id_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['skill_level'], {
      name: 'tournament_registrations_skill_level_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['gender_category'], {
      name: 'tournament_registrations_gender_category_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['registration_date'], {
      name: 'tournament_registrations_registration_date_index'
    });

    await queryInterface.addIndex('tournament_registrations', ['tournament_id', 'user_id'], {
      unique: true,
      name: 'tournament_registrations_tournament_user_unique'
    });

    await queryInterface.addIndex('tournament_registrations', ['created_at'], {
      name: 'tournament_registrations_created_at_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tournament_registrations');
  }
}; 