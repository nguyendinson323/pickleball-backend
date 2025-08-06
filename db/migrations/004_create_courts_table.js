/**
 * Migration: Create Courts Table
 * 
 * This migration creates the courts table with all necessary fields
 * for court management, availability, and operational details.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      court_type: {
        type: Sequelize.ENUM('indoor', 'outdoor', 'covered'),
        allowNull: false,
        defaultValue: 'outdoor'
      },
      surface: {
        type: Sequelize.ENUM('concrete', 'asphalt', 'synthetic', 'grass', 'clay'),
        allowNull: false,
        defaultValue: 'concrete'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dimensions: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: true
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
      court_number: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      hourly_rate: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0
      },
      member_rate: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: true
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      is_maintenance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: true
      },
      review_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_hours: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0
      },
      used_hours: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0
      },
      total_bookings: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_revenue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      average_rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: true
      },
      amenities: {
        type: Sequelize.JSON,
        allowNull: true
      },
      operating_hours: {
        type: Sequelize.JSON,
        allowNull: true
      },
      maintenance_schedule: {
        type: Sequelize.JSON,
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
    await queryInterface.addIndex('courts', ['club_id'], {
      name: 'courts_club_id_index'
    });

    await queryInterface.addIndex('courts', ['court_type'], {
      name: 'courts_court_type_index'
    });

    await queryInterface.addIndex('courts', ['surface'], {
      name: 'courts_surface_index'
    });

    await queryInterface.addIndex('courts', ['is_available'], {
      name: 'courts_is_available_index'
    });

    await queryInterface.addIndex('courts', ['is_maintenance'], {
      name: 'courts_is_maintenance_index'
    });

    await queryInterface.addIndex('courts', ['is_featured'], {
      name: 'courts_is_featured_index'
    });

    await queryInterface.addIndex('courts', ['is_active'], {
      name: 'courts_is_active_index'
    });

    await queryInterface.addIndex('courts', ['hourly_rate'], {
      name: 'courts_hourly_rate_index'
    });

    await queryInterface.addIndex('courts', ['rating'], {
      name: 'courts_rating_index'
    });

    await queryInterface.addIndex('courts', ['created_at'], {
      name: 'courts_created_at_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courts');
  }
}; 