'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const notifications = [
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        type: 'tournament_registration',
        title: 'Tournament Registration Confirmed',
        message: 'Your registration for Spring Championship 2024 has been confirmed. Tournament starts on March 25th.',
        data: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440010',
          tournament_name: 'Spring Championship 2024',
          registration_date: '2024-03-15'
        }),
        is_read: false,
        created_at: new Date('2024-03-15T10:35:00Z'),
        updated_at: new Date('2024-03-15T10:35:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440002', // Sarah Coach
        type: 'payment_success',
        title: 'Payment Successful',
        message: 'Your premium subscription payment of $29.99 has been processed successfully.',
        data: JSON.stringify({
          amount: 29.99,
          currency: 'USD',
          payment_id: '550e8400-e29b-41d4-a716-446655440040'
        }),
        is_read: true,
        created_at: new Date('2024-03-10T14:25:00Z'),
        updated_at: new Date('2024-03-10T14:25:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440003', // Mike Club Owner
        type: 'court_reservation',
        title: 'Court Reservation Reminder',
        message: 'Your court reservation for Indoor Court 1 is tomorrow at 2:00 PM. Don\'t forget to bring your equipment!',
        data: JSON.stringify({
          court_id: '550e8400-e29b-41d4-a716-446655440020',
          court_name: 'Indoor Court 1',
          reservation_date: '2024-03-20',
          start_time: '14:00'
        }),
        is_read: false,
        created_at: new Date('2024-03-19T09:00:00Z'),
        updated_at: new Date('2024-03-19T09:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        type: 'match_request',
        title: 'New Match Request',
        message: 'David Smith has sent you a match request for this Saturday at 10:00 AM.',
        data: JSON.stringify({
          requester_id: '550e8400-e29b-41d4-a716-446655440005',
          requester_name: 'David Smith',
          match_date: '2024-03-23',
          match_time: '10:00'
        }),
        is_read: false,
        created_at: new Date('2024-03-18T15:30:00Z'),
        updated_at: new Date('2024-03-18T15:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        type: 'ranking_update',
        title: 'Ranking Points Updated',
        message: 'Congratulations! Your ranking points have increased by 50 points. You are now ranked #15 in your division.',
        data: JSON.stringify({
          points_gained: 50,
          new_rank: 15,
          division: 'intermediate'
        }),
        is_read: false,
        created_at: new Date('2024-03-17T12:00:00Z'),
        updated_at: new Date('2024-03-17T12:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        type: 'payment_failed',
        title: 'Payment Failed',
        message: 'Your tournament registration payment has failed. Please update your payment method and try again.',
        data: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440012',
          tournament_name: 'Beginner Friendly Tournament',
          amount: 35.00
        }),
        is_read: true,
        created_at: new Date('2024-03-14T13:25:00Z'),
        updated_at: new Date('2024-03-14T13:25:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440007', // Tom Club Owner
        type: 'club_approval',
        title: 'Club Registration Approved',
        message: 'Congratulations! Your club "Elite Pickleball Club" has been approved and is now live on the platform.',
        data: JSON.stringify({
          club_id: '550e8400-e29b-41d4-a716-446655440030',
          club_name: 'Elite Pickleball Club'
        }),
        is_read: true,
        created_at: new Date('2024-03-01T10:05:00Z'),
        updated_at: new Date('2024-03-01T10:05:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        type: 'tournament_reminder',
        title: 'Tournament Tomorrow',
        message: 'Reminder: Your tournament "Mixed Doubles Championship" starts tomorrow at 9:00 AM. Good luck!',
        data: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440013',
          tournament_name: 'Mixed Doubles Championship',
          start_time: '09:00'
        }),
        is_read: false,
        created_at: new Date('2024-03-21T18:00:00Z'),
        updated_at: new Date('2024-03-21T18:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        type: 'subscription_renewal',
        title: 'Subscription Renewal',
        message: 'Your premium subscription will renew on April 5th, 2024. You will be charged $99.99.',
        data: JSON.stringify({
          renewal_date: '2024-04-05',
          amount: 99.99,
          subscription_type: 'premium_annual'
        }),
        is_read: false,
        created_at: new Date('2024-03-25T10:00:00Z'),
        updated_at: new Date('2024-03-25T10:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        type: 'system_announcement',
        title: 'New Feature Available',
        message: 'We\'ve added a new Player Finder feature! Find nearby players and schedule matches easily.',
        data: JSON.stringify({
          feature: 'player_finder',
          link: '/player-finder'
        }),
        is_read: true,
        created_at: new Date('2024-03-20T11:00:00Z'),
        updated_at: new Date('2024-03-20T11:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440002', // Sarah Coach
        type: 'coaching_request',
        title: 'New Coaching Request',
        message: 'Emma Wilson has requested coaching sessions. Please review and respond to the request.',
        data: JSON.stringify({
          student_id: '550e8400-e29b-41d4-a716-446655440006',
          student_name: 'Emma Wilson',
          skill_level: 'beginner'
        }),
        is_read: false,
        created_at: new Date('2024-03-19T14:15:00Z'),
        updated_at: new Date('2024-03-19T14:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440003', // Mike Club Owner
        type: 'court_maintenance',
        title: 'Court Maintenance Notice',
        message: 'Indoor Court 2 will be closed for maintenance on March 17th. Your reservation has been refunded.',
        data: JSON.stringify({
          court_id: '550e8400-e29b-41d4-a716-446655440022',
          court_name: 'Indoor Court 2',
          maintenance_date: '2024-03-17',
          refund_amount: 30.00
        }),
        is_read: true,
        created_at: new Date('2024-03-16T16:00:00Z'),
        updated_at: new Date('2024-03-16T16:00:00Z')
      }
    ];

    await queryInterface.bulkInsert('notifications', notifications, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notifications', null, {});
  }
}; 