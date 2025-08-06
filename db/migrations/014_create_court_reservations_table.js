/**
 * Migration: Create Court Reservations Table
 * 
 * This migration creates the court_reservations table with all necessary fields
 * for court booking management, scheduling, and payment tracking.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('court_reservations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      court_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courts',
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
      start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      reservation_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      duration_hours: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false
      },
      purpose: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      match_type: {
        type: Sequelize.ENUM('singles', 'doubles', 'mixed_doubles', 'practice', 'lesson', 'other'),
        allowNull: true
      },
      participants: {
        type: Sequelize.JSON,
        allowNull: true
      },
      guest_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      hourly_rate: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      member_discount: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0
      },
      final_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      payment_status: {
        type: Sequelize.ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'),
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
      status: {
        type: Sequelize.ENUM('confirmed', 'pending', 'cancelled', 'completed', 'no_show'),
        allowNull: false,
        defaultValue: 'pending'
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
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      special_requests: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      equipment_needed: {
        type: Sequelize.JSON,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      checked_in_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      checked_out_at: {
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
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      booking_source: {
        type: Sequelize.ENUM('web', 'mobile', 'phone', 'in_person'),
        allowNull: false,
        defaultValue: 'web'
      },
      ip_address: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      user_agent: {
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
    await queryInterface.addIndex('court_reservations', ['court_id'], {
      name: 'court_reservations_court_id_index'
    });

    await queryInterface.addIndex('court_reservations', ['user_id'], {
      name: 'court_reservations_user_id_index'
    });

    await queryInterface.addIndex('court_reservations', ['club_id'], {
      name: 'court_reservations_club_id_index'
    });

    await queryInterface.addIndex('court_reservations', ['start_time'], {
      name: 'court_reservations_start_time_index'
    });

    await queryInterface.addIndex('court_reservations', ['end_time'], {
      name: 'court_reservations_end_time_index'
    });

    await queryInterface.addIndex('court_reservations', ['reservation_date'], {
      name: 'court_reservations_reservation_date_index'
    });

    await queryInterface.addIndex('court_reservations', ['status'], {
      name: 'court_reservations_status_index'
    });

    await queryInterface.addIndex('court_reservations', ['payment_status'], {
      name: 'court_reservations_payment_status_index'
    });

    await queryInterface.addIndex('court_reservations', ['payment_id'], {
      name: 'court_reservations_payment_id_index'
    });

    await queryInterface.addIndex('court_reservations', ['match_type'], {
      name: 'court_reservations_match_type_index'
    });

    await queryInterface.addIndex('court_reservations', ['booking_source'], {
      name: 'court_reservations_booking_source_index'
    });

    await queryInterface.addIndex('court_reservations', ['cancelled_by'], {
      name: 'court_reservations_cancelled_by_index'
    });

    await queryInterface.addIndex('court_reservations', ['checked_in_at'], {
      name: 'court_reservations_checked_in_at_index'
    });

    await queryInterface.addIndex('court_reservations', ['rating'], {
      name: 'court_reservations_rating_index'
    });

    await queryInterface.addIndex('court_reservations', ['created_at'], {
      name: 'court_reservations_created_at_index'
    });

    // Composite indexes for efficient reservation queries
    await queryInterface.addIndex('court_reservations', ['court_id', 'start_time', 'end_time'], {
      name: 'court_reservations_court_time_overlap_index'
    });

    await queryInterface.addIndex('court_reservations', ['court_id', 'reservation_date', 'status'], {
      name: 'court_reservations_court_date_status_index'
    });

    await queryInterface.addIndex('court_reservations', ['user_id', 'status'], {
      name: 'court_reservations_user_status_index'
    });

    await queryInterface.addIndex('court_reservations', ['club_id', 'reservation_date'], {
      name: 'court_reservations_club_date_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('court_reservations');
  }
}; 