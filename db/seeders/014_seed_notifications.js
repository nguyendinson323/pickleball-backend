/**
 * Notifications Seeder
 * 
 * Seeds the notifications table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get users, tournaments, payments, and clubs from database
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users ORDER BY created_at LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const tournaments = await queryInterface.sequelize.query(
      `SELECT id FROM tournaments ORDER BY created_at LIMIT 3`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const payments = await queryInterface.sequelize.query(
      `SELECT id FROM payments ORDER BY created_at LIMIT 3`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const clubs = await queryInterface.sequelize.query(
      `SELECT id FROM clubs ORDER BY created_at LIMIT 3`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length < 5) {
      throw new Error('Not enough users found. Please run users seeder first.');
    }

    const notifications = [
      {
        id: uuidv4(),
        user_id: users[0].id,
        type: 'tournament',
        title: 'Tournament Registration Confirmed',
        message: 'Your registration for Guadalajara Open 2024 has been confirmed! Your payment of $2,500 MXN was processed successfully. Check your email for detailed tournament information and schedule.',
        is_read: true,
        is_sent: true,
        sent_at: new Date('2024-10-15T14:25:00Z'),
        read_at: new Date('2024-10-15T16:45:00Z'),
        priority: 'high',
        delivery_method: 'email',
        related_tournament_id: tournaments.length > 0 ? tournaments[0].id : null,
        related_match_id: null,
        related_payment_id: payments.length > 0 ? payments[0].id : null,
        related_club_id: clubs.length > 0 ? clubs[0].id : null,
        action_url: '/tournaments/guadalajara-open-2024',
        action_text: 'View Tournament',
        metadata: JSON.stringify({
          tournament_name: 'Guadalajara Open 2024',
          division: 'Professional Doubles',
          registration_number: 'GO2024-001',
          email_sent: true,
          sms_sent: false
        }),
        scheduled_for: null,
        expires_at: new Date('2024-12-20T23:59:59Z'),
        created_at: new Date('2024-10-15T14:25:00Z'),
        updated_at: new Date('2024-10-15T16:45:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[1].id,
        type: 'payment',
        title: 'Membership Payment Processed',
        message: 'Your annual premium membership payment has been successfully processed. Welcome to Club Deportivo Guadalajara Pickleball! Your membership card will arrive within 3-5 business days.',
        is_read: false,
        is_sent: true,
        sent_at: new Date('2024-09-20T09:16:00Z'),
        read_at: null,
        priority: 'normal',
        delivery_method: 'in_app',
        related_tournament_id: null,
        related_match_id: null,
        related_payment_id: payments.length > 1 ? payments[1].id : null,
        related_club_id: clubs.length > 0 ? clubs[0].id : null,
        action_url: '/membership/dashboard',
        action_text: 'View Membership',
        metadata: JSON.stringify({
          membership_type: 'annual_premium',
          amount: 14000.00,
          currency: 'MXN',
          benefits_activated: true,
          card_shipping_address_confirmed: true
        }),
        scheduled_for: null,
        expires_at: new Date('2025-09-20T23:59:59Z'),
        created_at: new Date('2024-09-20T09:16:00Z'),
        updated_at: new Date('2024-09-20T09:16:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[2].id,
        type: 'reminder',
        title: 'Court Reservation Reminder',
        message: 'Reminder: You have a court reservation tomorrow at Training Court A from 6:00 PM to 9:00 PM. Please arrive 15 minutes early for check-in. Cancel at least 2 hours in advance to avoid charges.',
        is_read: false,
        is_sent: true,
        sent_at: new Date('2024-11-07T20:00:00Z'),
        read_at: null,
        priority: 'normal',
        delivery_method: 'push',
        related_tournament_id: null,
        related_match_id: null,
        related_payment_id: payments.length > 2 ? payments[2].id : null,
        related_club_id: clubs.length > 1 ? clubs[1].id : null,
        action_url: '/reservations/manage',
        action_text: 'Manage Reservation',
        metadata: JSON.stringify({
          reservation_date: '2024-11-08',
          court_name: 'Training Court A',
          time_slot: '18:00-21:00',
          duration_hours: 3,
          reminder_type: '24_hour'
        }),
        scheduled_for: new Date('2024-11-07T20:00:00Z'),
        expires_at: new Date('2024-11-08T21:00:00Z'),
        created_at: new Date('2024-11-07T12:00:00Z'),
        updated_at: new Date('2024-11-07T20:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[3].id,
        type: 'system',
        title: 'Lesson Refund Processed',
        message: 'Your coaching lesson has been cancelled due to instructor illness. A full refund of $1,600 MXN has been processed and will appear in your account within 3-5 business days. We apologize for the inconvenience.',
        is_read: true,
        is_sent: true,
        sent_at: new Date('2024-10-28T11:35:00Z'),
        read_at: new Date('2024-10-28T12:15:00Z'),
        priority: 'high',
        delivery_method: 'email',
        related_tournament_id: null,
        related_match_id: null,
        related_payment_id: payments.length > 3 ? payments[3].id : null,
        related_club_id: clubs.length > 2 ? clubs[2].id : null,
        action_url: '/payments/refunds',
        action_text: 'View Refund Details',
        metadata: JSON.stringify({
          refund_amount: 1600.00,
          refund_reason: 'Instructor illness',
          refund_method: 'original_payment_method',
          estimated_days: '3-5',
          apology_voucher: '10% off next lesson'
        }),
        scheduled_for: null,
        expires_at: null,
        created_at: new Date('2024-10-28T11:35:00Z'),
        updated_at: new Date('2024-10-28T12:15:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[4].id,
        type: 'match_request',
        title: 'Player Match Request',
        message: 'Carlos M. (4.0 level) is looking for a doubles partner for weekend games in Monterrey. Your skill levels and location are a great match! Interested in connecting?',
        is_read: false,
        is_sent: false,
        sent_at: null,
        read_at: null,
        priority: 'low',
        delivery_method: 'in_app',
        related_tournament_id: null,
        related_match_id: uuidv4(),
        related_payment_id: null,
        related_club_id: clubs.length > 1 ? clubs[1].id : null,
        action_url: '/match-finder/requests',
        action_text: 'View Request',
        metadata: JSON.stringify({
          requester_name: 'Carlos M.',
          requester_skill_level: '4.0',
          play_type: 'doubles',
          preferred_days: ['Saturday', 'Sunday'],
          preferred_times: ['morning', 'afternoon'],
          location: 'Monterrey, Nuevo León',
          match_finder_algorithm_score: 0.87
        }),
        scheduled_for: new Date('2024-11-12T09:00:00Z'),
        expires_at: new Date('2024-11-26T23:59:59Z'),
        created_at: new Date('2024-11-11T18:30:00Z'),
        updated_at: new Date('2024-11-11T18:30:00Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('notifications', notifications, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notifications', null, {});
  }
};