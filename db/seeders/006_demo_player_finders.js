/**
 * Seeder: Demo Player Finders
 * 
 * This seeder creates sample player finder entries for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const playerFinders = [
      // John's Player Finder
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440001',
        searcher_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        skill_level_min: '3.0',
        skill_level_max: '4.0',
        preferred_gender: 'any',
        age_range_min: 25,
        age_range_max: 45,
        search_radius_km: 30,
        preferred_locations: JSON.stringify([
          { name: 'Guadalajara', latitude: 20.6597, longitude: -103.3496 },
          { name: 'Zapopan', latitude: 20.7235, longitude: -103.3848 }
        ]),
        match_type: 'doubles',
        availability_days: JSON.stringify(['monday', 'wednesday', 'friday', 'saturday']),
        availability_time_start: '18:00:00',
        availability_time_end: '21:00:00',
        contact_method: 'whatsapp',
        auto_notify: true,
        is_active: true,
        last_search_date: now,
        total_matches_found: 8,
        matches_contacted: 5,
        successful_matches: 3,
        search_criteria: JSON.stringify({
          experience_years: '2-5',
          playing_style: 'competitive',
          equipment: 'own_paddles'
        }),
        notes: 'Looking for regular doubles partners for evening games',
        created_at: now,
        updated_at: now
      },

      // Sarah's Player Finder (Coach) - Using superadmin instead
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440002',
        searcher_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        skill_level_min: '4.0',
        skill_level_max: '5.5',
        preferred_gender: 'any',
        age_range_min: 18,
        age_range_max: 60,
        search_radius_km: 50,
        preferred_locations: JSON.stringify([
          { name: 'Monterrey', latitude: 25.6866, longitude: -100.3161 },
          { name: 'San Pedro Garza García', latitude: 25.6591, longitude: -100.4024 }
        ]),
        match_type: 'any',
        availability_days: JSON.stringify(['tuesday', 'thursday', 'saturday', 'sunday']),
        availability_time_start: '09:00:00',
        availability_time_end: '17:00:00',
        contact_method: 'email',
        auto_notify: true,
        is_active: true,
        last_search_date: now,
        total_matches_found: 15,
        matches_contacted: 12,
        successful_matches: 8,
        search_criteria: JSON.stringify({
          experience_years: '5+',
          playing_style: 'coaching_focused',
          equipment: 'provided'
        }),
        notes: 'Professional coach looking for advanced players for training sessions',
        created_at: now,
        updated_at: now
      },

      // Elite Club Player Finder
      {
        id: 'aa0e8400-e29b-41d4-a716-446655440003',
        searcher_id: '550e8400-e29b-41d4-a716-446655440003', // elite_club
        skill_level_min: '2.5',
        skill_level_max: '5.5',
        preferred_gender: 'any',
        age_range_min: 16,
        age_range_max: 80,
        search_radius_km: 25,
        preferred_locations: JSON.stringify([
          { name: 'Guadalajara', latitude: 20.6597, longitude: -103.3496 }
        ]),
        match_type: 'any',
        availability_days: JSON.stringify(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
        availability_time_start: '06:00:00',
        availability_time_end: '22:00:00',
        contact_method: 'any',
        auto_notify: false,
        is_active: true,
        last_search_date: now,
        total_matches_found: 45,
        matches_contacted: 30,
        successful_matches: 25,
        search_criteria: JSON.stringify({
          experience_years: 'any',
          playing_style: 'any',
          equipment: 'rental_available',
          membership_required: false
        }),
        notes: 'Club looking for players of all levels to join our community',
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('player_finders', playerFinders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('player_finders', null, {});
  }
}; 