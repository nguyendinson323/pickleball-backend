'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const payments = [
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        amount: 50.00,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
        status: 'completed',
        type: 'tournament_registration',
        description: 'Spring Tournament Registration',
        metadata: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440010',
          tournament_name: 'Spring Championship 2024'
        }),
        created_at: new Date('2024-03-15T10:30:00Z'),
        updated_at: new Date('2024-03-15T10:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440002', // Sarah Coach
        amount: 29.99,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p7',
        status: 'completed',
        type: 'premium_subscription',
        description: 'Premium Monthly Subscription',
        metadata: JSON.stringify({
          subscription_type: 'premium',
          duration: 'monthly'
        }),
        created_at: new Date('2024-03-10T14:20:00Z'),
        updated_at: new Date('2024-03-10T14:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440003', // Mike Club Owner
        amount: 25.00,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p8',
        status: 'completed',
        type: 'court_reservation',
        description: 'Court 1 - 2 hours',
        metadata: JSON.stringify({
          court_id: '550e8400-e29b-41d4-a716-446655440020',
          court_name: 'Indoor Court 1',
          reservation_date: '2024-03-20',
          start_time: '14:00',
          end_time: '16:00'
        }),
        created_at: new Date('2024-03-18T09:15:00Z'),
        updated_at: new Date('2024-03-18T09:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        amount: 75.00,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p9',
        status: 'completed',
        type: 'tournament_registration',
        description: 'Pro Division Tournament',
        metadata: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440011',
          tournament_name: 'Pro Division Championship'
        }),
        created_at: new Date('2024-03-12T16:45:00Z'),
        updated_at: new Date('2024-03-12T16:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        amount: 19.99,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p0',
        status: 'pending',
        type: 'premium_subscription',
        description: 'Premium Monthly Subscription',
        metadata: JSON.stringify({
          subscription_type: 'premium',
          duration: 'monthly'
        }),
        created_at: new Date('2024-03-19T11:30:00Z'),
        updated_at: new Date('2024-03-19T11:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        amount: 35.00,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p1',
        status: 'failed',
        type: 'tournament_registration',
        description: 'Beginner Tournament',
        metadata: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440012',
          tournament_name: 'Beginner Friendly Tournament'
        }),
        created_at: new Date('2024-03-14T13:20:00Z'),
        updated_at: new Date('2024-03-14T13:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440007', // Tom Club Owner
        amount: 200.00,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p2',
        status: 'completed',
        type: 'club_registration',
        description: 'Club Registration Fee',
        metadata: JSON.stringify({
          club_id: '550e8400-e29b-41d4-a716-446655440030',
          club_name: 'Elite Pickleball Club'
        }),
        created_at: new Date('2024-03-01T10:00:00Z'),
        updated_at: new Date('2024-03-01T10:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        amount: 15.00,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p3',
        status: 'completed',
        type: 'court_reservation',
        description: 'Outdoor Court - 1 hour',
        metadata: JSON.stringify({
          court_id: '550e8400-e29b-41d4-a716-446655440021',
          court_name: 'Outdoor Court 3',
          reservation_date: '2024-03-22',
          start_time: '10:00',
          end_time: '11:00'
        }),
        created_at: new Date('2024-03-20T08:45:00Z'),
        updated_at: new Date('2024-03-20T08:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        amount: 99.99,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p4',
        status: 'completed',
        type: 'premium_subscription',
        description: 'Premium Annual Subscription',
        metadata: JSON.stringify({
          subscription_type: 'premium',
          duration: 'annual'
        }),
        created_at: new Date('2024-03-05T15:30:00Z'),
        updated_at: new Date('2024-03-05T15:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        amount: 40.00,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p5',
        status: 'completed',
        type: 'tournament_registration',
        description: 'Doubles Tournament',
        metadata: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440013',
          tournament_name: 'Mixed Doubles Championship'
        }),
        created_at: new Date('2024-03-16T12:15:00Z'),
        updated_at: new Date('2024-03-16T12:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440002', // Sarah Coach
        amount: 150.00,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
        status: 'completed',
        type: 'coaching_certification',
        description: 'Coaching Certification Program',
        metadata: JSON.stringify({
          program_type: 'certification',
          level: 'advanced'
        }),
        created_at: new Date('2024-03-08T09:00:00Z'),
        updated_at: new Date('2024-03-08T09:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440003', // Mike Club Owner
        amount: 30.00,
        currency: 'USD',
        payment_method: 'stripe',
        payment_intent_id: 'pi_3Oa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p7',
        status: 'refunded',
        type: 'court_reservation',
        description: 'Court 2 - 2 hours (Refunded)',
        metadata: JSON.stringify({
          court_id: '550e8400-e29b-41d4-a716-446655440022',
          court_name: 'Indoor Court 2',
          reservation_date: '2024-03-17',
          start_time: '16:00',
          end_time: '18:00',
          refund_reason: 'Court maintenance'
        }),
        created_at: new Date('2024-03-15T14:30:00Z'),
        updated_at: new Date('2024-03-17T10:00:00Z')
      }
    ];

    await queryInterface.bulkInsert('payments', payments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payments', null, {});
  }
}; 