/**
 * Migration: Create Digital Credentials Table
 * 
 * This migration creates the digital_credentials table for storing
 * player digital ID cards and credentials.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('digital_credentials', {
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
      credential_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      verification_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      federation_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: 'Pickleball Sports Federation'
      },
      federation_logo: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      player_name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      nrtp_level: {
        type: Sequelize.ENUM('2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'),
        allowNull: true
      },
      state_affiliation: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      nationality: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: 'Mexican'
      },
      affiliation_status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended', 'expired'),
        allowNull: false,
        defaultValue: 'active'
      },
      ranking_position: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      club_status: {
        type: Sequelize.ENUM('club_member', 'independent'),
        allowNull: false,
        defaultValue: 'independent'
      },
      club_name: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      qr_code_url: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      qr_code_data: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      issued_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      expiry_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_verified: {
        type: Sequelize.DATE,
        allowNull: true
      },
      verification_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      verification_notes: {
        type: Sequelize.TEXT,
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

    // Create indexes
    await queryInterface.addIndex('digital_credentials', ['credential_number'], {
      unique: true,
      name: 'idx_digital_credentials_credential_number'
    });

    await queryInterface.addIndex('digital_credentials', ['verification_code'], {
      unique: true,
      name: 'idx_digital_credentials_verification_code'
    });

    await queryInterface.addIndex('digital_credentials', ['user_id'], {
      name: 'idx_digital_credentials_user_id'
    });

    await queryInterface.addIndex('digital_credentials', ['affiliation_status'], {
      name: 'idx_digital_credentials_affiliation_status'
    });

    await queryInterface.addIndex('digital_credentials', ['state_affiliation'], {
      name: 'idx_digital_credentials_state_affiliation'
    });

    await queryInterface.addIndex('digital_credentials', ['is_verified'], {
      name: 'idx_digital_credentials_is_verified'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('digital_credentials');
  }
}; 