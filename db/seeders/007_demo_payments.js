/**
 * Seeder: Demo Payments
 * 
 * This seeder creates sample payments for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const payments = [
      // Tournament Entry Payment
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440001',
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        payment_type: 'tournament_entry',
        payment_method: 'stripe',
        amount: 500.00,
        currency: 'MXN',
        status: 'completed',
        stripe_payment_intent_id: 'pi_3OqK8v2eZvKYlo2C1gQ1234',
        stripe_charge_id: 'ch_3OqK8v2eZvKYlo2C1gQ5678',
        transaction_id: 'txn_123456789',
        description: 'Elite Club Championship 2024 - Entry Fee',
        metadata: JSON.stringify({
          tournament_name: 'Elite Club Championship 2024',
          player_name: 'John Smith',
          category: 'doubles'
        }),
        related_tournament_id: '880e8400-e29b-41d4-a716-446655440001',
        related_club_id: '660e8400-e29b-41d4-a716-446655440001',
        refund_amount: 0.00,
        processed_at: new Date(2024, 5, 12, 10, 30, 0),
        created_at: now,
        updated_at: now
      },

      // Court Rental Payment
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440002',
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        payment_type: 'court_rental',
        payment_method: 'credit_card',
        amount: 250.00,
        currency: 'MXN',
        status: 'completed',
        stripe_payment_intent_id: 'pi_3OqK8v2eZvKYlo2C1gQ9012',
        stripe_charge_id: 'ch_3OqK8v2eZvKYlo2C1gQ3456',
        transaction_id: 'txn_987654321',
        description: 'Elite Court 1 - 2 hour rental',
        metadata: JSON.stringify({
          court_name: 'Elite Court 1',
          rental_duration: '2 hours',
          rental_date: '2024-06-10',
          rental_time: '18:00-20:00'
        }),
        related_court_id: '770e8400-e29b-41d4-a716-446655440001',
        related_club_id: '660e8400-e29b-41d4-a716-446655440001',
        refund_amount: 0.00,
        processed_at: new Date(2024, 5, 10, 18, 0, 0),
        created_at: now,
        updated_at: now
      },

      // Membership Payment
      {
        id: 'bb0e8400-e29b-41d4-a716-446655440003',
        user_id: '550e8400-e29b-41d4-a716-446655440003', // elite_club
        payment_type: 'membership',
        payment_method: 'bank_transfer',
        amount: 15000.00,
        currency: 'MXN',
        status: 'completed',
        transaction_id: 'txn_456789123',
        description: 'Premium Membership - Annual',
        metadata: JSON.stringify({
          membership_type: 'premium',
          duration: '1 year',
          start_date: '2024-01-01',
          end_date: '2024-12-31'
        }),
        related_club_id: '660e8400-e29b-41d4-a716-446655440001',
        refund_amount: 0.00,
        processed_at: new Date(2024, 0, 1, 9, 0, 0),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('payments', payments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payments', null, {});
  }
}; 