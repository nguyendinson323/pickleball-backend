/**
 * Player Finders Seeder
 * 
 * Seeds the player_finders table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get player users from database
    const players = await queryInterface.sequelize.query(
      `SELECT id, state, city FROM users WHERE user_type = 'player' ORDER BY created_at LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (players.length < 5) {
      throw new Error('Not enough player users found. Please run users seeder first.');
    }

    const playerFinders = [
      {
        id: uuidv4(),
        searcher_id: players[0].id,
        skill_level_min: '4.0',
        skill_level_max: '5.0',
        preferred_gender: 'any',
        age_range_min: 25,
        age_range_max: 45,
        search_radius_km: 30,
        preferred_locations: JSON.stringify([
          'Guadalajara Centro',
          'Zapopan',
          'Tlaquepaque',
          'Club Deportivo Guadalajara'
        ]),
        match_type: 'doubles',
        availability_days: JSON.stringify([
          'monday',
          'wednesday',
          'friday',
          'saturday',
          'sunday'
        ]),
        availability_time_start: '17:00:00',
        availability_time_end: '21:00:00',
        contact_method: 'whatsapp',
        auto_notify: true,
        is_active: true,
        last_search_date: new Date('2024-11-15T19:30:00Z'),
        total_matches_found: 12,
        matches_contacted: 8,
        successful_matches: 3,
        search_criteria: JSON.stringify({
          priority: 'skill_level',
          secondary: 'location',
          avoid_beginners: true,
          tournament_players_preferred: true,
          regular_play_schedule: true
        }),
        notes: 'Looking for competitive doubles partners for tournament preparation. Prefer players with tournament experience.',
        created_at: new Date('2024-09-20T10:00:00Z'),
        updated_at: new Date('2024-11-15T19:30:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        searcher_id: players[1].id,
        skill_level_min: '3.0',
        skill_level_max: '4.0',
        preferred_gender: 'female',
        age_range_min: 30,
        age_range_max: 55,
        search_radius_km: 25,
        preferred_locations: JSON.stringify([
          'Monterrey Centro',
          'San Pedro Garza García',
          'Monterrey Pickleball Academy'
        ]),
        match_type: 'mixed_doubles',
        availability_days: JSON.stringify([
          'tuesday',
          'thursday',
          'saturday'
        ]),
        availability_time_start: '09:00:00',
        availability_time_end: '12:00:00',
        contact_method: 'email',
        auto_notify: true,
        is_active: true,
        last_search_date: new Date('2024-11-12T10:45:00Z'),
        total_matches_found: 8,
        matches_contacted: 6,
        successful_matches: 2,
        search_criteria: JSON.stringify({
          priority: 'gender',
          secondary: 'schedule_compatibility',
          women_only_search: true,
          morning_sessions_only: true,
          social_play_focus: true
        }),
        notes: 'Seeking female players for mixed doubles. Prefer morning sessions and social-focused games.',
        created_at: new Date('2024-10-05T14:20:00Z'),
        updated_at: new Date('2024-11-12T10:45:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        searcher_id: players[2].id,
        skill_level_min: '2.5',
        skill_level_max: '3.5',
        preferred_gender: 'any',
        age_range_min: 50,
        age_range_max: 70,
        search_radius_km: 15,
        preferred_locations: JSON.stringify([
          'Querétaro Centro',
          'Centro Recreativo Querétaro'
        ]),
        match_type: 'any',
        availability_days: JSON.stringify([
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday'
        ]),
        availability_time_start: '14:00:00',
        availability_time_end: '17:00:00',
        contact_method: 'phone',
        auto_notify: false,
        is_active: true,
        last_search_date: new Date('2024-11-08T15:20:00Z'),
        total_matches_found: 15,
        matches_contacted: 12,
        successful_matches: 7,
        search_criteria: JSON.stringify({
          priority: 'age_group',
          secondary: 'skill_level',
          senior_players_preferred: true,
          recreational_focus: true,
          flexible_schedule: true
        }),
        notes: 'Senior player looking for other mature players for recreational games. Flexible with skill levels and game types.',
        created_at: new Date('2024-08-15T11:30:00Z'),
        updated_at: new Date('2024-11-08T15:20:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        searcher_id: players[3].id,
        skill_level_min: '4.5',
        skill_level_max: '5.5',
        preferred_gender: 'any',
        age_range_min: 18,
        age_range_max: null,
        search_radius_km: 100,
        preferred_locations: JSON.stringify([
          'Cancún',
          'Playa del Carmen',
          'Cancún Beach Pickleball Resort',
          'Any beach location'
        ]),
        match_type: 'singles',
        availability_days: JSON.stringify([
          'saturday',
          'sunday'
        ]),
        availability_time_start: '06:00:00',
        availability_time_end: '18:00:00',
        contact_method: 'any',
        auto_notify: true,
        is_active: true,
        last_search_date: new Date('2024-11-18T08:15:00Z'),
        total_matches_found: 4,
        matches_contacted: 4,
        successful_matches: 1,
        search_criteria: JSON.stringify({
          priority: 'skill_level',
          secondary: 'location',
          professional_level_only: true,
          beach_courts_preferred: true,
          willing_to_travel: true,
          weekend_warrior: true
        }),
        notes: 'High-level player seeking challenging singles matches. Willing to travel for quality competition. Beach locations preferred.',
        created_at: new Date('2024-10-20T16:45:00Z'),
        updated_at: new Date('2024-11-18T08:15:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        searcher_id: players[4].id,
        skill_level_min: '3.0',
        skill_level_max: '3.5',
        preferred_gender: 'any',
        age_range_min: 20,
        age_range_max: 35,
        search_radius_km: 20,
        preferred_locations: JSON.stringify([
          'Puebla Centro',
          'Puebla Pickleball Club'
        ]),
        match_type: 'doubles',
        availability_days: JSON.stringify([
          'monday',
          'wednesday',
          'friday'
        ]),
        availability_time_start: '19:00:00',
        availability_time_end: '22:00:00',
        contact_method: 'email',
        auto_notify: false,
        is_active: false,
        last_search_date: new Date('2024-10-25T20:30:00Z'),
        total_matches_found: 6,
        matches_contacted: 3,
        successful_matches: 1,
        search_criteria: JSON.stringify({
          priority: 'schedule_compatibility',
          secondary: 'age_group',
          young_professionals: true,
          evening_play_only: true,
          learning_focused: true
        }),
        notes: 'INACTIVE - Young professional looking for evening doubles partners. Currently on hiatus due to work travel.',
        created_at: new Date('2024-09-10T18:00:00Z'),
        updated_at: new Date('2024-11-01T09:30:00Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('player_finders', playerFinders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('player_finders', null, {});
  }
};