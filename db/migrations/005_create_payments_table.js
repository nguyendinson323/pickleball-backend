/**
 * Migration: Create Payments Table
 * 
 * This migration creates the payments table with all necessary fields
 * for payment processing, tracking, and financial management.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
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
      payment_type: {
        type: Sequelize.ENUM('membership', 'tournament_entry', 'court_rental', 'equipment', 'lesson', 'subscription', 'other'),
        allowNull: false
      },
      payment_method: {
        type: Sequelize.ENUM('credit_card', 'debit_card', 'bank_transfer', 'paypal', 'stripe', 'cash', 'check'),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: 'MXN'
      },
      status: {
        type: Sequelize.ENUM('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'),
        allowNull: false,
        defaultValue: 'pending'
      },
      stripe_payment_intent_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      stripe_charge_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      transaction_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true
      },
      related_tournament_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tournaments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      related_court_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'courts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      related_club_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'clubs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      refund_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      refund_reason: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      refunded_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      refunded_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      failure_reason: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      failure_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      processed_at: {
        type: Sequelize.DATE,
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
    await queryInterface.addIndex('payments', ['user_id'], {
      name: 'payments_user_id_index'
    });

    await queryInterface.addIndex('payments', ['payment_type'], {
      name: 'payments_payment_type_index'
    });

    await queryInterface.addIndex('payments', ['payment_method'], {
      name: 'payments_payment_method_index'
    });

    await queryInterface.addIndex('payments', ['status'], {
      name: 'payments_status_index'
    });

    await queryInterface.addIndex('payments', ['stripe_payment_intent_id'], {
      name: 'payments_stripe_payment_intent_id_index'
    });

    await queryInterface.addIndex('payments', ['stripe_charge_id'], {
      name: 'payments_stripe_charge_id_index'
    });

    await queryInterface.addIndex('payments', ['transaction_id'], {
      name: 'payments_transaction_id_index'
    });

    await queryInterface.addIndex('payments', ['related_tournament_id'], {
      name: 'payments_related_tournament_id_index'
    });

    await queryInterface.addIndex('payments', ['related_court_id'], {
      name: 'payments_related_court_id_index'
    });

    await queryInterface.addIndex('payments', ['related_club_id'], {
      name: 'payments_related_club_id_index'
    });

    await queryInterface.addIndex('payments', ['amount'], {
      name: 'payments_amount_index'
    });

    await queryInterface.addIndex('payments', ['processed_at'], {
      name: 'payments_processed_at_index'
    });

    await queryInterface.addIndex('payments', ['created_at'], {
      name: 'payments_created_at_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
}; 