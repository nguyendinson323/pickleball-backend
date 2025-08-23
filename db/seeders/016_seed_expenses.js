/**
 * Expenses Seeder
 * 
 * Seeds the expenses table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get tournaments, clubs, and admin users from database
    const tournaments = await queryInterface.sequelize.query(
      `SELECT id FROM tournaments ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const clubs = await queryInterface.sequelize.query(
      `SELECT id FROM clubs ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type IN ('admin', 'club') ORDER BY created_at LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (tournaments.length < 3 || clubs.length < 3 || users.length < 5) {
      throw new Error('Not enough related records found. Please run previous seeders first.');
    }

    const expenses = [
      {
        id: uuidv4(),
        description: 'Guadalajara Open 2024 - Prize money payout to winners',
        amount: '30000.00',
        category: 'tournament_expense',
        tournament_id: tournaments[0].id,
        club_id: clubs[0].id,
        created_by: users[0].id,
        expense_date: new Date('2024-12-17T19:00:00Z'),
        receipt_url: 'https://storage.pickleballmexico.com/receipts/guadalajara_open_2024_prize_payout.pdf',
        notes: 'Championship prize money distributed to winning teams as per tournament regulations. First place professional doubles division.',
        status: 'paid',
        approved_by: users[1].id,
        approved_at: new Date('2024-12-17T20:30:00Z'),
        payment_method: 'Bank Transfer',
        payment_reference: 'SPEI-240001234567',
        created_at: new Date('2024-12-17T19:15:00Z'),
        updated_at: new Date('2024-12-17T21:00:00Z')
      },
      {
        id: uuidv4(),
        description: 'Court resurfacing - Training Court A synthetic surface renewal',
        amount: '45000.00',
        category: 'court_maintenance',
        tournament_id: null,
        club_id: clubs[1].id,
        created_by: users[2].id,
        expense_date: new Date('2024-10-15T14:30:00Z'),
        receipt_url: 'https://storage.pickleballmexico.com/receipts/court_resurfacing_invoice_MTY001.pdf',
        notes: 'Annual court maintenance - Training Court A complete surface renewal with premium synthetic material. Includes line repainting and net replacement.',
        status: 'paid',
        approved_by: users[3].id,
        approved_at: new Date('2024-10-16T09:00:00Z'),
        payment_method: 'Check',
        payment_reference: 'CHK-2024-001567',
        created_at: new Date('2024-10-15T14:45:00Z'),
        updated_at: new Date('2024-10-20T16:30:00Z')
      },
      {
        id: uuidv4(),
        description: 'Professional sound system rental for Monterrey Youth Championship',
        amount: '8500.00',
        category: 'tournament_expense',
        tournament_id: tournaments[1].id,
        club_id: clubs[1].id,
        created_by: users[4].id,
        expense_date: new Date('2024-11-25T10:00:00Z'),
        receipt_url: 'https://storage.pickleballmexico.com/receipts/audio_rental_youth_championship.pdf',
        notes: 'Professional PA system rental for youth tournament announcement, music, and ceremony. 3-day rental including setup and breakdown.',
        status: 'approved',
        approved_by: users[0].id,
        approved_at: new Date('2024-11-26T08:30:00Z'),
        payment_method: 'Credit Card',
        payment_reference: 'CC-4567-****-1234',
        created_at: new Date('2024-11-25T10:15:00Z'),
        updated_at: new Date('2024-11-26T08:30:00Z')
      },
      {
        id: uuidv4(),
        description: 'Monthly electricity and utilities - Centro Recreativo Querétaro',
        amount: '12750.00',
        category: 'facility',
        tournament_id: null,
        club_id: clubs[2].id,
        created_by: users[5].id,
        expense_date: new Date('2024-11-01T00:00:00Z'),
        receipt_url: 'https://storage.pickleballmexico.com/receipts/utilities_november_2024_QRO.pdf',
        notes: 'November 2024 utility expenses including electricity, water, and facility maintenance for all courts and common areas.',
        status: 'pending',
        approved_by: null,
        approved_at: null,
        payment_method: null,
        payment_reference: null,
        created_at: new Date('2024-11-05T09:30:00Z'),
        updated_at: new Date('2024-11-05T09:30:00Z')
      },
      {
        id: uuidv4(),
        description: 'New pickleball paddles and balls inventory - Pro Shop restock',
        amount: '23400.00',
        category: 'equipment',
        tournament_id: null,
        club_id: clubs[3].id,
        created_by: users[6].id,
        expense_date: new Date('2024-11-20T16:45:00Z'),
        receipt_url: 'https://storage.pickleballmexico.com/receipts/equipment_purchase_cancun_beach.pdf',
        notes: 'Quarterly inventory restock for pro shop: 50 professional paddles, 200 tournament balls, court maintenance supplies, and rental equipment.',
        status: 'rejected',
        approved_by: users[1].id,
        approved_at: new Date('2024-11-21T11:15:00Z'),
        payment_method: null,
        payment_reference: null,
        created_at: new Date('2024-11-20T17:00:00Z'),
        updated_at: new Date('2024-11-21T11:15:00Z')
      }
    ];

    await queryInterface.bulkInsert('expenses', expenses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expenses', null, {});
  }
};