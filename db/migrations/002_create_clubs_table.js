/**
 * Migration: Create Clubs Table
 * 
 * This migration creates the clubs table with all necessary fields
 * for club management, location, and operational information.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clubs', {
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
      club_type: {
        type: Sequelize.ENUM('public', 'private', 'semi_private', 'resort', 'community'),
        allowNull: false,
        defaultValue: 'public'
      },
      owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      contact_person: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      website: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      logo_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      banner_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      zip_code: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: 'Mexico'
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true
      },
      operating_hours: {
        type: Sequelize.JSON,
        allowNull: true
      },
      amenities: {
        type: Sequelize.JSON,
        allowNull: true
      },
      membership_fees: {
        type: Sequelize.JSON,
        allowNull: true
      },
      court_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_verified: {
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
      total_members: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_tournaments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_revenue: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      social_media: {
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
    await queryInterface.addIndex('clubs', ['owner_id'], {
      name: 'clubs_owner_id_index'
    });

    await queryInterface.addIndex('clubs', ['club_type'], {
      name: 'clubs_club_type_index'
    });

    await queryInterface.addIndex('clubs', ['state'], {
      name: 'clubs_state_index'
    });

    await queryInterface.addIndex('clubs', ['city'], {
      name: 'clubs_city_index'
    });

    await queryInterface.addIndex('clubs', ['latitude', 'longitude'], {
      name: 'clubs_location_index'
    });

    await queryInterface.addIndex('clubs', ['is_verified'], {
      name: 'clubs_is_verified_index'
    });

    await queryInterface.addIndex('clubs', ['is_featured'], {
      name: 'clubs_is_featured_index'
    });

    await queryInterface.addIndex('clubs', ['is_active'], {
      name: 'clubs_is_active_index'
    });

    await queryInterface.addIndex('clubs', ['rating'], {
      name: 'clubs_rating_index'
    });

    await queryInterface.addIndex('clubs', ['created_at'], {
      name: 'clubs_created_at_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clubs');
  }
}; 