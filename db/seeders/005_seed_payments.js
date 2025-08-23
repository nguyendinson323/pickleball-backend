/**
 * Payments Seeder
 * 
 * Seeds the payments table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get users, tournaments, courts, and clubs from database
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users ORDER BY created_at LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const tournaments = await queryInterface.sequelize.query(
      `SELECT id FROM tournaments ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const courts = await queryInterface.sequelize.query(
      `SELECT id FROM courts ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const clubs = await queryInterface.sequelize.query(
      `SELECT id FROM clubs ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length < 5 || tournaments.length < 3 || courts.length < 3 || clubs.length < 3) {
      throw new Error('Not enough related records found. Please run previous seeders first.');
    }

    const payments = [
      {
        id: uuidv4(),
        user_id: users[0].id,
        payment_type: 'tournament_entry',
        payment_method: 'credit_card',
        amount: '2500.00',
        currency: 'MXN',
        status: 'completed',
        stripe_payment_intent_id: 'pi_1234567890abcdef',
        stripe_charge_id: 'ch_1234567890abcdef',
        transaction_id: 'txn_guadalajara_open_2024_001',
        description: 'Entry fee for Guadalajara Open 2024 - Professional Doubles Division',
        metadata: JSON.stringify({
          tournament_name: 'Guadalajara Open 2024',
          division: 'Professional Doubles',
          early_bird_discount: false,
          refund_policy: 'standard',
          receipt_sent: true
        }),
        related_tournament_id: tournaments[0].id,
        related_court_id: null,
        related_club_id: clubs[0].id,
        refund_amount: '0.00',
        refund_reason: null,
        refunded_at: null,
        refunded_by: null,
        failure_reason: null,
        failure_code: null,
        processed_at: new Date('2024-10-15T14:23:45Z'),
        created_at: new Date('2024-10-15T14:20:12Z'),
        updated_at: new Date('2024-10-15T14:23:45Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[1].id,
        payment_type: 'membership',
        payment_method: 'bank_transfer',
        amount: '14000.00',
        currency: 'MXN',
        status: 'completed',
        stripe_payment_intent_id: null,
        stripe_charge_id: null,
        transaction_id: 'txn_membership_annual_2024_002',
        description: 'Annual Premium Membership - Club Deportivo Guadalajara Pickleball',
        metadata: JSON.stringify({
          membership_type: 'annual',
          membership_tier: 'premium',
          benefits: ['Unlimited court access', 'Guest privileges', 'Tournament discounts'],
          auto_renewal: true,
          membership_card_issued: true
        }),
        related_tournament_id: null,
        related_court_id: null,
        related_club_id: clubs[0].id,
        refund_amount: '0.00',
        refund_reason: null,
        refunded_at: null,
        refunded_by: null,
        failure_reason: null,
        failure_code: null,
        processed_at: new Date('2024-09-20T09:15:30Z'),
        created_at: new Date('2024-09-20T09:12:18Z'),
        updated_at: new Date('2024-09-20T09:15:30Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[2].id,
        payment_type: 'court_rental',
        payment_method: 'stripe',
        amount: '1350.00',
        currency: 'MXN',
        status: 'completed',
        stripe_payment_intent_id: 'pi_9876543210fedcba',
        stripe_charge_id: 'ch_9876543210fedcba',
        transaction_id: 'txn_court_rental_003',
        description: 'Court rental - Training Court A for 3 hours (Prime time)',
        metadata: JSON.stringify({
          rental_duration: 3,
          court_name: 'Training Court A',
          time_slot: '18:00-21:00',
          prime_time: true,
          equipment_rental: false,
          booking_fee: 50.00
        }),
        related_tournament_id: null,
        related_court_id: courts[1].id,
        related_club_id: clubs[1].id,
        refund_amount: '0.00',
        refund_reason: null,
        refunded_at: null,
        refunded_by: null,
        failure_reason: null,
        failure_code: null,
        processed_at: new Date('2024-11-08T16:45:22Z'),
        created_at: new Date('2024-11-08T16:42:15Z'),
        updated_at: new Date('2024-11-08T16:45:22Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[3].id,
        payment_type: 'lesson',
        payment_method: 'paypal',
        amount: '1600.00',
        currency: 'MXN',
        status: 'refunded',
        stripe_payment_intent_id: null,
        stripe_charge_id: null,
        transaction_id: 'txn_lesson_private_004',
        description: 'Private coaching lesson - 2 hours with certified instructor',
        metadata: JSON.stringify({
          lesson_type: 'private',
          instructor_name: 'Coach Martinez',
          skill_focus: ['serve', 'volley', 'strategy'],
          lesson_duration: 2,
          cancellation_notice: 48
        }),
        related_tournament_id: null,
        related_court_id: courts[2].id,
        related_club_id: clubs[2].id,
        refund_amount: '1600.00',
        refund_reason: 'Instructor illness - lesson cancelled with 48hr notice',
        refunded_at: new Date('2024-10-28T11:30:45Z'),
        refunded_by: users[9].id,
        failure_reason: null,
        failure_code: null,
        processed_at: new Date('2024-10-25T13:15:30Z'),
        created_at: new Date('2024-10-25T13:12:18Z'),
        updated_at: new Date('2024-10-28T11:30:45Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[4].id,
        payment_type: 'tournament_entry',
        payment_method: 'debit_card',
        amount: '800.00',
        currency: 'MXN',
        status: 'failed',
        stripe_payment_intent_id: 'pi_failed_12345678',
        stripe_charge_id: null,
        transaction_id: 'txn_youth_championship_005',
        description: 'Entry fee for Monterrey Youth Championship - Mixed Division',
        metadata: JSON.stringify({
          tournament_name: 'Monterrey Youth Championship',
          division: 'Mixed 12-17',
          parent_consent: true,
          medical_clearance: true,
          retry_attempts: 3
        }),
        related_tournament_id: tournaments[1].id,
        related_court_id: null,
        related_club_id: clubs[1].id,
        refund_amount: '0.00',
        refund_reason: null,
        refunded_at: null,
        refunded_by: null,
        failure_reason: 'Insufficient funds - card declined by bank',
        failure_code: 'card_declined',
        processed_at: null,
        created_at: new Date('2024-11-10T20:45:33Z'),
        updated_at: new Date('2024-11-10T20:47:12Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('payments', payments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payments', null, {});
  }
};