/**
 * Seeder: Demo Notifications
 * 
 * This seeder creates sample notifications for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const notifications = [
      // Tournament Registration Confirmation
      {
        id: 'cc0e8400-e29b-41d4-a716-446655440001',
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        type: 'tournament',
        title: 'Tournament Registration Confirmed',
        message: 'Your registration for Elite Club Championship 2024 has been confirmed. Tournament starts on June 15, 2024.',
        is_read: false,
        is_sent: true,
        sent_at: new Date(2024, 5, 12, 10, 35, 0),
        read_at: null,
        priority: 'normal',
        delivery_method: 'in_app',
        related_tournament_id: '880e8400-e29b-41d4-a716-446655440001',
        related_club_id: '660e8400-e29b-41d4-a716-446655440001',
        action_url: '/tournaments/880e8400-e29b-41d4-a716-446655440001',
        action_text: 'View Tournament',
        metadata: JSON.stringify({
          tournament_name: 'Elite Club Championship 2024',
          registration_date: '2024-06-12',
          category: 'doubles'
        }),
        scheduled_for: null,
        expires_at: new Date(2024, 5, 20, 23, 59, 59),
        created_at: now,
        updated_at: now
      },

      // Payment Confirmation
      {
        id: 'cc0e8400-e29b-41d4-a716-446655440002',
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        type: 'payment',
        title: 'Payment Successful',
        message: 'Your payment of $250.00 MXN for court rental has been processed successfully.',
        is_read: true,
        is_sent: true,
        sent_at: new Date(2024, 5, 10, 18, 5, 0),
        read_at: new Date(2024, 5, 10, 18, 10, 0),
        priority: 'normal',
        delivery_method: 'email',
        related_payment_id: 'bb0e8400-e29b-41d4-a716-446655440002',
        action_url: '/payments/bb0e8400-e29b-41d4-a716-446655440002',
        action_text: 'View Receipt',
        metadata: JSON.stringify({
          payment_amount: 250.00,
          payment_method: 'credit_card',
          court_name: 'Elite Court 1',
          rental_date: '2024-06-10'
        }),
        scheduled_for: null,
        expires_at: new Date(2024, 5, 17, 23, 59, 59),
        created_at: now,
        updated_at: now
      },

      // System Announcement
      {
        id: 'cc0e8400-e29b-41d4-a716-446655440003',
        user_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        type: 'announcement',
        title: 'New Features Available',
        message: 'We have added new features to the platform including advanced court booking and player matching. Check them out!',
        is_read: false,
        is_sent: true,
        sent_at: new Date(2024, 5, 1, 9, 0, 0),
        read_at: null,
        priority: 'high',
        delivery_method: 'in_app',
        action_url: '/features',
        action_text: 'Learn More',
        metadata: JSON.stringify({
          feature_type: 'platform_update',
          version: '2.1.0',
          release_date: '2024-06-01'
        }),
        scheduled_for: null,
        expires_at: new Date(2024, 5, 30, 23, 59, 59),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('notifications', notifications, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notifications', null, {});
  }
}; 