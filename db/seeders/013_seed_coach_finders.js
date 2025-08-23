/**
 * Coach Finders Seeder
 * 
 * Seeds the coach_finders table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get player and coach users from database
    const players = await queryInterface.sequelize.query(
      `SELECT id, email, state FROM users WHERE user_type = 'player' ORDER BY created_at LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const coaches = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'coach' ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (players.length < 5) {
      throw new Error('Not enough player users found. Please run users seeder first.');
    }

    const coachFinders = [
      {
        id: uuidv4(),
        searcher_id: players[0].id,
        preferred_skill_focus: JSON.stringify(['serve', 'strategy', 'positioning']),
        experience_level_required: 'advanced',
        lesson_type: 'individual',
        budget_range_min: '800.00',
        budget_range_max: '1200.00',
        preferred_location: 'Guadalajara, Jalisco',
        location_type: 'club',
        max_travel_distance: 25,
        availability_schedule: JSON.stringify({
          monday: ['18:00-20:00'],
          wednesday: ['18:00-20:00'],
          friday: ['18:00-20:00'],
          saturday: ['09:00-12:00']
        }),
        goals_and_notes: 'Preparing for tournament competition. Need help with advanced serve techniques and strategic positioning. Currently 4.5 level looking to reach 5.0.',
        language_preference: 'spanish',
        is_active: true,
        status: 'matched',
        matched_coach_id: coaches.length > 0 ? coaches[0].id : null,
        matched_at: new Date('2024-11-10T14:30:00Z'),
        contact_preference: 'whatsapp',
        phone_number: '+523312345678',
        email: players[0].email,
        urgency: 'high',
        expires_at: new Date('2025-02-15T23:59:59Z'),
        created_at: new Date('2024-11-05T10:15:00Z'),
        updated_at: new Date('2024-11-10T14:30:00Z')
      },
      {
        id: uuidv4(),
        searcher_id: players[1].id,
        preferred_skill_focus: JSON.stringify(['dinking', 'net_play', 'volleys']),
        experience_level_required: 'intermediate',
        lesson_type: 'group',
        budget_range_min: '400.00',
        budget_range_max: '600.00',
        preferred_location: 'Monterrey, Nuevo León',
        location_type: 'indoor_court',
        max_travel_distance: 20,
        availability_schedule: JSON.stringify({
          tuesday: ['09:00-11:00'],
          thursday: ['09:00-11:00'],
          saturday: ['10:00-12:00']
        }),
        goals_and_notes: 'Want to improve net play and soft game. Beginner level looking to build fundamentals with other players in group setting.',
        language_preference: 'spanish',
        is_active: true,
        status: 'searching',
        matched_coach_id: null,
        matched_at: null,
        contact_preference: 'email',
        phone_number: null,
        email: players[1].email,
        urgency: 'medium',
        expires_at: new Date('2025-01-15T23:59:59Z'),
        created_at: new Date('2024-11-18T16:20:00Z'),
        updated_at: new Date('2024-11-18T16:20:00Z')
      },
      {
        id: uuidv4(),
        searcher_id: players[2].id,
        preferred_skill_focus: JSON.stringify(['fundamentals', 'footwork', 'basic_strokes']),
        experience_level_required: 'beginner',
        lesson_type: 'individual',
        budget_range_min: '300.00',
        budget_range_max: '500.00',
        preferred_location: 'Querétaro, Querétaro',
        location_type: 'outdoor_court',
        max_travel_distance: 15,
        availability_schedule: JSON.stringify({
          monday: ['14:00-16:00'],
          wednesday: ['14:00-16:00'],
          friday: ['14:00-16:00']
        }),
        goals_and_notes: 'Complete beginner wanting to learn pickleball basics. Senior player (65 years old) looking for patient instructor who can work at slower pace.',
        language_preference: 'spanish',
        is_active: true,
        status: 'searching',
        matched_coach_id: null,
        matched_at: null,
        contact_preference: 'phone',
        phone_number: '+524423456789',
        email: players[2].email,
        urgency: 'low',
        expires_at: new Date('2024-12-31T23:59:59Z'),
        created_at: new Date('2024-11-20T11:45:00Z'),
        updated_at: new Date('2024-11-20T11:45:00Z')
      },
      {
        id: uuidv4(),
        searcher_id: players[3].id,
        preferred_skill_focus: JSON.stringify(['power_shots', 'athleticism', 'tournament_prep']),
        experience_level_required: 'professional',
        lesson_type: 'individual',
        budget_range_min: '1000.00',
        budget_range_max: '1500.00',
        preferred_location: 'Cancún, Quintana Roo',
        location_type: 'private_court',
        max_travel_distance: 50,
        availability_schedule: JSON.stringify({
          monday: ['06:00-08:00', '18:00-20:00'],
          tuesday: ['06:00-08:00', '18:00-20:00'],
          wednesday: ['06:00-08:00', '18:00-20:00'],
          thursday: ['06:00-08:00', '18:00-20:00'],
          friday: ['06:00-08:00', '18:00-20:00'],
          saturday: ['08:00-12:00'],
          sunday: ['08:00-12:00']
        }),
        goals_and_notes: 'Elite level player preparing for international competition. Need professional coach with tournament experience to refine power game and mental strategy.',
        language_preference: 'english',
        is_active: true,
        status: 'matched',
        matched_coach_id: coaches.length > 1 ? coaches[1].id : null,
        matched_at: new Date('2024-11-22T09:15:00Z'),
        contact_preference: 'in_app',
        phone_number: '+529982345678',
        email: players[3].email,
        urgency: 'urgent',
        expires_at: new Date('2025-03-01T23:59:59Z'),
        created_at: new Date('2024-11-15T13:30:00Z'),
        updated_at: new Date('2024-11-22T09:15:00Z')
      },
      {
        id: uuidv4(),
        searcher_id: players[4].id,
        preferred_skill_focus: JSON.stringify(['consistency', 'placement', 'doubles_strategy']),
        experience_level_required: 'intermediate',
        lesson_type: 'clinic',
        budget_range_min: '200.00',
        budget_range_max: '400.00',
        preferred_location: 'Puebla, Puebla',
        location_type: 'club',
        max_travel_distance: 30,
        availability_schedule: JSON.stringify({
          saturday: ['09:00-12:00'],
          sunday: ['09:00-12:00']
        }),
        goals_and_notes: 'Looking for weekend clinics to improve doubles play. Want to learn better court positioning and shot placement. Prefer group learning environment.',
        language_preference: 'spanish',
        is_active: false,
        status: 'completed',
        matched_coach_id: coaches.length > 2 ? coaches[2].id : null,
        matched_at: new Date('2024-10-15T16:00:00Z'),
        contact_preference: 'email',
        phone_number: null,
        email: players[4].email,
        urgency: 'low',
        expires_at: new Date('2024-11-30T23:59:59Z'),
        created_at: new Date('2024-10-01T12:00:00Z'),
        updated_at: new Date('2024-11-25T15:30:00Z')
      }
    ];

    await queryInterface.bulkInsert('coach_finders', coachFinders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('coach_finders', null, {});
  }
};