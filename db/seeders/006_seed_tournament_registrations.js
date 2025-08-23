/**
 * Tournament Registrations Seeder
 * 
 * Seeds the tournament_registrations table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get tournaments, users, and payments from database
    const tournaments = await queryInterface.sequelize.query(
      `SELECT id FROM tournaments ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'player' ORDER BY created_at LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const payments = await queryInterface.sequelize.query(
      `SELECT id FROM payments WHERE payment_type = 'tournament_entry' ORDER BY created_at LIMIT 3`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (tournaments.length < 3 || users.length < 6) {
      throw new Error('Not enough tournaments or users found. Please run previous seeders first.');
    }

    const tournamentRegistrations = [
      {
        id: uuidv4(),
        tournament_id: tournaments[0].id,
        user_id: users[0].id,
        partner_id: users[1].id,
        registration_type: 'doubles',
        category: 'Professional',
        skill_level: '4.5',
        age_group: 'Open',
        gender_category: 'men',
        status: 'confirmed',
        payment_status: 'completed',
        payment_id: payments.length > 0 ? payments[0].id : null,
        entry_fee: '2500.00',
        paid_amount: '2500.00',
        registration_date: new Date('2024-10-15T14:20:12Z'),
        confirmed_at: new Date('2024-10-15T14:23:45Z'),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: '0.00',
        special_requests: 'Preferred court time: Morning sessions. Dietary restriction: Vegetarian lunch option requested.',
        medical_info: 'Previous knee injury - may need extra warm-up time between matches.',
        emergency_contact: JSON.stringify({
          name: 'María González López',
          relationship: 'Spouse',
          phone: '+523312345679',
          email: 'maria.gonzalez@email.com'
        }),
        team_name: 'Guadalajara Thunder',
        seed_position: 3,
        final_rank: 1,
        points_earned: 300,
        metadata: JSON.stringify({
          registration_source: 'online_portal',
          early_bird_discount: false,
          t_shirt_size: 'L',
          accommodation_needed: false,
          transportation_arranged: true,
          previous_tournaments: 15
        }),
        created_at: new Date('2024-10-15T14:20:12Z'),
        updated_at: new Date('2024-12-17T19:30:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[1].id,
        user_id: users[2].id,
        partner_id: users[3].id,
        registration_type: 'mixed_doubles',
        category: 'Youth',
        skill_level: '3.5',
        age_group: '12-17',
        gender_category: 'mixed',
        status: 'confirmed',
        payment_status: 'completed',
        payment_id: payments.length > 1 ? payments[1].id : null,
        entry_fee: '800.00',
        paid_amount: '800.00',
        registration_date: new Date('2024-11-08T10:30:15Z'),
        confirmed_at: new Date('2024-11-08T10:35:20Z'),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: '0.00',
        special_requests: 'Parent will be present as chaperone. Need equipment loan for both rackets and balls.',
        medical_info: 'Mild asthma - inhaler will be available courtside. No other restrictions.',
        emergency_contact: JSON.stringify({
          name: 'Dr. Roberto Martínez',
          relationship: 'Father/Coach',
          phone: '+528134567891',
          email: 'dr.martinez@email.com'
        }),
        team_name: 'Monterrey Juniors',
        seed_position: 8,
        final_rank: 4,
        points_earned: 75,
        metadata: JSON.stringify({
          registration_source: 'coach_registration',
          parent_consent_form: true,
          coaching_clinic_participation: true,
          school_excuse_letter: 'provided',
          first_tournament: false
        }),
        created_at: new Date('2024-11-08T10:30:15Z'),
        updated_at: new Date('2024-11-26T18:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[2].id,
        user_id: users[4].id,
        partner_id: users[5].id,
        registration_type: 'doubles',
        category: 'Senior',
        skill_level: '3.0',
        age_group: '55+',
        gender_category: 'open',
        status: 'confirmed',
        payment_status: 'completed',
        payment_id: null,
        entry_fee: '400.00',
        paid_amount: '400.00',
        registration_date: new Date('2024-10-12T09:15:30Z'),
        confirmed_at: new Date('2024-10-12T09:20:45Z'),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: '0.00',
        special_requests: 'Request for shade between matches. Prefer afternoon start times due to joint stiffness in morning.',
        medical_info: 'Arthritis in hands - may need longer rest periods. Blood pressure medication taken daily.',
        emergency_contact: JSON.stringify({
          name: 'Ana Lucía Mendoza',
          relationship: 'Daughter',
          phone: '+524423456790',
          email: 'ana.mendoza@email.com'
        }),
        team_name: 'Golden Eagles',
        seed_position: 12,
        final_rank: 8,
        points_earned: 25,
        metadata: JSON.stringify({
          registration_source: 'in_person',
          senior_discount_applied: true,
          lunch_participation: true,
          medical_clearance: 'provided',
          years_playing: 8
        }),
        created_at: new Date('2024-10-12T09:15:30Z'),
        updated_at: new Date('2024-10-20T17:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[3].id,
        user_id: users[6].id,
        partner_id: users[7].id,
        registration_type: 'mixed_doubles',
        category: 'Amateur',
        skill_level: '4.0',
        age_group: 'Open',
        gender_category: 'mixed',
        status: 'waitlisted',
        payment_status: 'pending',
        payment_id: null,
        entry_fee: '4500.00',
        paid_amount: '0.00',
        registration_date: new Date('2025-01-28T16:45:22Z'),
        confirmed_at: null,
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: '0.00',
        special_requests: 'Resort accommodation package preferred. Request ocean view court for finals if possible.',
        medical_info: 'No medical restrictions. Excellent physical condition.',
        emergency_contact: JSON.stringify({
          name: 'Carlos Eduardo Ramírez',
          relationship: 'Brother',
          phone: '+529982345679',
          email: 'carlos.ramirez@email.com'
        }),
        team_name: 'Beach Lovers',
        seed_position: null,
        final_rank: null,
        points_earned: 0,
        metadata: JSON.stringify({
          registration_source: 'resort_website',
          vacation_package: 'deluxe_oceanview',
          international_travelers: true,
          airport_pickup_needed: true,
          waitlist_position: 3
        }),
        created_at: new Date('2025-01-28T16:45:22Z'),
        updated_at: new Date('2025-01-28T16:45:22Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[1].id,
        user_id: users[8].id,
        partner_id: null,
        registration_type: 'singles',
        category: 'Youth',
        skill_level: '2.5',
        age_group: '12-17',
        gender_category: 'women',
        status: 'cancelled',
        payment_status: 'failed',
        payment_id: payments.length > 2 ? payments[2].id : null,
        entry_fee: '800.00',
        paid_amount: '0.00',
        registration_date: new Date('2024-11-10T20:45:33Z'),
        confirmed_at: null,
        cancelled_at: new Date('2024-11-10T21:00:00Z'),
        cancelled_by: users[8].id,
        cancellation_reason: 'Payment failed - insufficient funds. Unable to secure alternative payment method before deadline.',
        refund_amount: '0.00',
        special_requests: 'Financial assistance requested due to family hardship.',
        medical_info: 'No medical restrictions.',
        emergency_contact: JSON.stringify({
          name: 'Isabella Fernández',
          relationship: 'Mother',
          phone: '+522224567891',
          email: 'isabella.fernandez@email.com'
        }),
        team_name: null,
        seed_position: null,
        final_rank: null,
        points_earned: 0,
        metadata: JSON.stringify({
          registration_source: 'school_program',
          scholarship_application: 'submitted',
          payment_attempts: 3,
          alternative_payment_offered: false,
          reregistration_eligible: true
        }),
        created_at: new Date('2024-11-10T20:45:33Z'),
        updated_at: new Date('2024-11-10T21:00:00Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('tournament_registrations', tournamentRegistrations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tournament_registrations', null, {});
  }
};