/**
 * Expense Model
 * 
 * This model represents expense records for tournaments, clubs, and other
 * pickleball federation activities.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Expense = sequelize.define('Expense', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [3, 255]
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    category: {
      type: DataTypes.ENUM(
        'tournament_expense',
        'club_expense', 
        'court_maintenance',
        'equipment',
        'facility',
        'other'
      ),
      allowNull: false,
      defaultValue: 'other'
    },
    tournament_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Tournaments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    club_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Clubs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    expense_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    receipt_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'paid'),
      allowNull: false,
      defaultValue: 'pending'
    },
    approved_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    payment_reference: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'expenses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['tournament_id']
      },
      {
        fields: ['club_id']
      },
      {
        fields: ['created_by']
      },
      {
        fields: ['category']
      },
      {
        fields: ['status']
      },
      {
        fields: ['expense_date']
      }
    ],
    validate: {
      eitherTournamentOrClub() {
        if (!this.tournament_id && !this.club_id) {
          throw new Error('Either tournament_id or club_id must be provided');
        }
      }
    }
  });

module.exports = Expense;