/**
 * Migration: Create Banners Table
 * 
 * This migration creates the banners table with all necessary fields
 * for banner management, display, and analytics tracking.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banners', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      subtitle: {
        type: Sequelize.STRING(300),
        allowNull: true
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      thumbnail_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      action_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      action_text: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      display_type: {
        type: Sequelize.ENUM('carousel', 'sidebar', 'popup', 'notification'),
        allowNull: false,
        defaultValue: 'carousel'
      },
      target_audience: {
        type: Sequelize.ENUM('all', 'players', 'coaches', 'clubs', 'partners', 'admins'),
        allowNull: false,
        defaultValue: 'all'
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      end_date: {
        type: Sequelize.DATE,
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
      related_event_id: {
        type: Sequelize.UUID,
        allowNull: true
      },
      click_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      view_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true
      },
      notes: {
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
    await queryInterface.addIndex('banners', ['display_type'], {
      name: 'banners_display_type_index'
    });

    await queryInterface.addIndex('banners', ['target_audience'], {
      name: 'banners_target_audience_index'
    });

    await queryInterface.addIndex('banners', ['is_active'], {
      name: 'banners_is_active_index'
    });

    await queryInterface.addIndex('banners', ['is_featured'], {
      name: 'banners_is_featured_index'
    });

    await queryInterface.addIndex('banners', ['position'], {
      name: 'banners_position_index'
    });

    await queryInterface.addIndex('banners', ['start_date'], {
      name: 'banners_start_date_index'
    });

    await queryInterface.addIndex('banners', ['end_date'], {
      name: 'banners_end_date_index'
    });

    await queryInterface.addIndex('banners', ['related_tournament_id'], {
      name: 'banners_related_tournament_id_index'
    });

    await queryInterface.addIndex('banners', ['related_club_id'], {
      name: 'banners_related_club_id_index'
    });

    await queryInterface.addIndex('banners', ['click_count'], {
      name: 'banners_click_count_index'
    });

    await queryInterface.addIndex('banners', ['view_count'], {
      name: 'banners_view_count_index'
    });

    await queryInterface.addIndex('banners', ['created_at'], {
      name: 'banners_created_at_index'
    });

    // Composite indexes for efficient banner queries
    await queryInterface.addIndex('banners', ['display_type', 'target_audience', 'is_active'], {
      name: 'banners_display_target_active_index'
    });

    await queryInterface.addIndex('banners', ['is_active', 'is_featured', 'position'], {
      name: 'banners_active_featured_position_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('banners');
  }
}; 