/**
 * Seeder: Demo Tournament Registrations
 * 
 * This seeder creates sample tournament registrations for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const tournamentRegistrations = [
      // John's Doubles Registration
      {
        id: 'ee0e8400-e29b-41d4-a716-446655440001',
        tournament_id: '880e8400-e29b-41d4-a716-446655440001', // Elite Club Championship
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        partner_id: null, // Will be assigned later
        registration_type: 'doubles',
        category: 'Men\'s Doubles',
        skill_level: '3.5',
        age_group: '25-45',
        gender_category: 'men',
        status: 'confirmed',
        payment_status: 'completed',
        payment_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        entry_fee: 500.00,
        paid_amount: 500.00,
        registration_date: new Date(2024, 5, 12, 10, 30, 0),
        confirmed_at: new Date(2024, 5, 12, 10, 35, 0),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: 0.00,
        special_requests: 'Prefer morning matches if possible',
        medical_info: 'No medical conditions',
        emergency_contact: JSON.stringify({
          name: 'Jane Smith',
          relationship: 'Spouse',
          phone: '+52-55-1234-5678',
          email: 'jane@email.com'
        }),
        team_name: 'Smith Team',
        seed_position: 8,
        final_rank: null,
        points_earned: 0,
        metadata: JSON.stringify({
          registration_source: 'web',
          previous_tournaments: 2,
          preferred_court: 'indoor'
        }),
        created_at: now,
        updated_at: now
      },

      // Community Tournament Registration
      {
        id: 'ee0e8400-e29b-41d4-a716-446655440002',
        tournament_id: '880e8400-e29b-41d4-a716-446655440002', // Community Spring Tournament
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        partner_id: null,
        registration_type: 'mixed_doubles',
        category: 'Mixed Doubles',
        skill_level: '3.5',
        age_group: '25-45',
        gender_category: 'mixed',
        status: 'confirmed',
        payment_status: 'completed',
        payment_id: null, // Separate payment record
        entry_fee: 100.00,
        paid_amount: 100.00,
        registration_date: new Date(2024, 3, 16, 14, 0, 0),
        confirmed_at: new Date(2024, 3, 16, 14, 5, 0),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: 0.00,
        special_requests: null,
        medical_info: 'No medical conditions',
        emergency_contact: JSON.stringify({
          name: 'Jane Smith',
          relationship: 'Spouse',
          phone: '+52-55-1234-5678',
          email: 'jane@email.com'
        }),
        team_name: null,
        seed_position: null,
        final_rank: null,
        points_earned: 0,
        metadata: JSON.stringify({
          registration_source: 'mobile_app',
          first_tournament: true,
          beginner_friendly: true
        }),
        created_at: now,
        updated_at: now
      },

      // Youth Tournament Registration
      {
        id: 'ee0e8400-e29b-41d4-a716-446655440003',
        tournament_id: '880e8400-e29b-41d4-a716-446655440003', // Youth Championship
        user_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin (representing a youth player)
        partner_id: null,
        registration_type: 'singles',
        category: 'Youth Singles',
        skill_level: '3.0',
        age_group: '16-17',
        gender_category: 'open',
        status: 'pending',
        payment_status: 'pending',
        payment_id: null,
        entry_fee: 75.00,
        paid_amount: 0.00,
        registration_date: new Date(2024, 7, 6, 9, 0, 0),
        confirmed_at: null,
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: 0.00,
        special_requests: 'Parent consent provided',
        medical_info: 'No medical conditions',
        emergency_contact: JSON.stringify({
          name: 'Parent Name',
          relationship: 'Parent',
          phone: '+52-55-9876-5432',
          email: 'parent@email.com'
        }),
        team_name: null,
        seed_position: null,
        final_rank: null,
        points_earned: 0,
        metadata: JSON.stringify({
          registration_source: 'web',
          parent_consent: true,
          youth_category: true
        }),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('tournament_registrations', tournamentRegistrations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tournament_registrations', null, {});
  }
}; 