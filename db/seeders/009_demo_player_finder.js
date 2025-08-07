'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const playerFinderRecords = [
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        is_active: true,
        skill_level: 'intermediate',
        preferred_skill_levels: JSON.stringify(['intermediate', 'advanced']),
        preferred_age_groups: JSON.stringify(['25-35', '36-45']),
        preferred_gender: 'any',
        max_distance: 25,
        preferred_playing_times: JSON.stringify(['weekends', 'evenings']),
        preferred_courts: JSON.stringify(['indoor', 'outdoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'Intermediate player looking for regular matches. Prefer competitive but friendly games.',
        availability_schedule: JSON.stringify({
          monday: ['18:00', '20:00'],
          tuesday: ['18:00', '20:00'],
          wednesday: ['18:00', '20:00'],
          thursday: ['18:00', '20:00'],
          friday: ['18:00', '20:00'],
          saturday: ['09:00', '17:00'],
          sunday: ['09:00', '17:00']
        }),
        contact_preferences: JSON.stringify(['in_app', 'email']),
        created_at: new Date('2024-03-01T10:00:00Z'),
        updated_at: new Date('2024-03-20T15:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        is_active: true,
        skill_level: 'advanced',
        preferred_skill_levels: JSON.stringify(['advanced']),
        preferred_age_groups: JSON.stringify(['25-35', '36-45', '46-55']),
        preferred_gender: 'any',
        max_distance: 30,
        preferred_playing_times: JSON.stringify(['weekends', 'mornings']),
        preferred_courts: JSON.stringify(['indoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'Advanced player seeking competitive matches. Available for tournaments and regular play.',
        availability_schedule: JSON.stringify({
          monday: ['06:00', '08:00'],
          tuesday: ['06:00', '08:00'],
          wednesday: ['06:00', '08:00'],
          thursday: ['06:00', '08:00'],
          friday: ['06:00', '08:00'],
          saturday: ['08:00', '16:00'],
          sunday: ['08:00', '16:00']
        }),
        contact_preferences: JSON.stringify(['in_app', 'phone']),
        created_at: new Date('2024-03-05T09:00:00Z'),
        updated_at: new Date('2024-03-18T12:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        is_active: true,
        skill_level: 'intermediate',
        preferred_skill_levels: JSON.stringify(['beginner', 'intermediate']),
        preferred_age_groups: JSON.stringify(['18-24', '25-35']),
        preferred_gender: 'any',
        max_distance: 20,
        preferred_playing_times: JSON.stringify(['evenings', 'weekends']),
        preferred_courts: JSON.stringify(['outdoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'Intermediate player who enjoys teaching beginners. Looking for friendly matches and practice partners.',
        availability_schedule: JSON.stringify({
          monday: ['19:00', '21:00'],
          tuesday: ['19:00', '21:00'],
          wednesday: ['19:00', '21:00'],
          thursday: ['19:00', '21:00'],
          friday: ['19:00', '21:00'],
          saturday: ['10:00', '18:00'],
          sunday: ['10:00', '18:00']
        }),
        contact_preferences: JSON.stringify(['in_app', 'email']),
        created_at: new Date('2024-03-10T14:00:00Z'),
        updated_at: new Date('2024-03-19T16:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        is_active: true,
        skill_level: 'beginner',
        preferred_skill_levels: JSON.stringify(['beginner', 'intermediate']),
        preferred_age_groups: JSON.stringify(['18-24', '25-35']),
        preferred_gender: 'female',
        max_distance: 15,
        preferred_playing_times: JSON.stringify(['weekends', 'afternoons']),
        preferred_courts: JSON.stringify(['indoor', 'outdoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'New to pickleball and looking for patient players to learn from. Prefer female playing partners.',
        availability_schedule: JSON.stringify({
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: ['12:00', '18:00'],
          sunday: ['12:00', '18:00']
        }),
        contact_preferences: JSON.stringify(['in_app']),
        created_at: new Date('2024-03-15T11:00:00Z'),
        updated_at: new Date('2024-03-20T10:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        is_active: true,
        skill_level: 'intermediate',
        preferred_skill_levels: JSON.stringify(['intermediate', 'advanced']),
        preferred_age_groups: JSON.stringify(['25-35', '36-45']),
        preferred_gender: 'any',
        max_distance: 35,
        preferred_playing_times: JSON.stringify(['mornings', 'weekends']),
        preferred_courts: JSON.stringify(['indoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'Intermediate player with tournament experience. Looking for competitive matches and tournament partners.',
        availability_schedule: JSON.stringify({
          monday: ['07:00', '09:00'],
          tuesday: ['07:00', '09:00'],
          wednesday: ['07:00', '09:00'],
          thursday: ['07:00', '09:00'],
          friday: ['07:00', '09:00'],
          saturday: ['08:00', '16:00'],
          sunday: ['08:00', '16:00']
        }),
        contact_preferences: JSON.stringify(['in_app', 'phone']),
        created_at: new Date('2024-03-08T08:00:00Z'),
        updated_at: new Date('2024-03-17T14:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        is_active: true,
        skill_level: 'advanced',
        preferred_skill_levels: JSON.stringify(['advanced']),
        preferred_age_groups: JSON.stringify(['25-35', '36-45', '46-55']),
        preferred_gender: 'any',
        max_distance: 40,
        preferred_playing_times: JSON.stringify(['mornings', 'weekends']),
        preferred_courts: JSON.stringify(['indoor', 'outdoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'Advanced player and former tournament champion. Available for high-level matches and coaching.',
        availability_schedule: JSON.stringify({
          monday: ['06:00', '10:00'],
          tuesday: ['06:00', '10:00'],
          wednesday: ['06:00', '10:00'],
          thursday: ['06:00', '10:00'],
          friday: ['06:00', '10:00'],
          saturday: ['07:00', '17:00'],
          sunday: ['07:00', '17:00']
        }),
        contact_preferences: JSON.stringify(['in_app', 'phone', 'email']),
        created_at: new Date('2024-03-01T06:00:00Z'),
        updated_at: new Date('2024-03-20T18:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440010', // Maria Player
        is_active: false,
        skill_level: 'beginner',
        preferred_skill_levels: JSON.stringify(['beginner']),
        preferred_age_groups: JSON.stringify(['46-55', '56-65']),
        preferred_gender: 'any',
        max_distance: 10,
        preferred_playing_times: JSON.stringify(['mornings', 'afternoons']),
        preferred_courts: JSON.stringify(['outdoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'Senior beginner player. Looking for relaxed, social games with other beginners.',
        availability_schedule: JSON.stringify({
          monday: ['09:00', '12:00'],
          tuesday: ['09:00', '12:00'],
          wednesday: ['09:00', '12:00'],
          thursday: ['09:00', '12:00'],
          friday: ['09:00', '12:00'],
          saturday: ['09:00', '15:00'],
          sunday: ['09:00', '15:00']
        }),
        contact_preferences: JSON.stringify(['in_app']),
        created_at: new Date('2024-03-12T09:00:00Z'),
        updated_at: new Date('2024-03-18T11:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440011', // Robert Player
        is_active: true,
        skill_level: 'intermediate',
        preferred_skill_levels: JSON.stringify(['intermediate']),
        preferred_age_groups: JSON.stringify(['36-45', '46-55']),
        preferred_gender: 'male',
        max_distance: 25,
        preferred_playing_times: JSON.stringify(['evenings', 'weekends']),
        preferred_courts: JSON.stringify(['indoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'Intermediate player looking for regular male partners for evening games.',
        availability_schedule: JSON.stringify({
          monday: ['18:00', '21:00'],
          tuesday: ['18:00', '21:00'],
          wednesday: ['18:00', '21:00'],
          thursday: ['18:00', '21:00'],
          friday: ['18:00', '21:00'],
          saturday: ['14:00', '20:00'],
          sunday: ['14:00', '20:00']
        }),
        contact_preferences: JSON.stringify(['in_app', 'phone']),
        created_at: new Date('2024-03-14T16:00:00Z'),
        updated_at: new Date('2024-03-19T20:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440012', // Jennifer Player
        is_active: true,
        skill_level: 'advanced',
        preferred_skill_levels: JSON.stringify(['advanced']),
        preferred_age_groups: JSON.stringify(['25-35', '36-45']),
        preferred_gender: 'female',
        max_distance: 30,
        preferred_playing_times: JSON.stringify(['mornings', 'weekends']),
        preferred_courts: JSON.stringify(['indoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'Advanced female player seeking competitive matches with other women. Tournament experience preferred.',
        availability_schedule: JSON.stringify({
          monday: ['07:00', '09:00'],
          tuesday: ['07:00', '09:00'],
          wednesday: ['07:00', '09:00'],
          thursday: ['07:00', '09:00'],
          friday: ['07:00', '09:00'],
          saturday: ['08:00', '16:00'],
          sunday: ['08:00', '16:00']
        }),
        contact_preferences: JSON.stringify(['in_app', 'email']),
        created_at: new Date('2024-03-06T07:00:00Z'),
        updated_at: new Date('2024-03-20T09:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440013', // Michael Player
        is_active: true,
        skill_level: 'beginner',
        preferred_skill_levels: JSON.stringify(['beginner', 'intermediate']),
        preferred_age_groups: JSON.stringify(['18-24', '25-35']),
        preferred_gender: 'any',
        max_distance: 20,
        preferred_playing_times: JSON.stringify(['afternoons', 'weekends']),
        preferred_courts: JSON.stringify(['outdoor']),
        location_latitude: 19.4326,
        location_longitude: -99.1332,
        location_address: 'Mexico City, CDMX, Mexico',
        bio: 'Young beginner player eager to learn and improve. Looking for patient partners and practice sessions.',
        availability_schedule: JSON.stringify({
          monday: ['15:00', '18:00'],
          tuesday: ['15:00', '18:00'],
          wednesday: ['15:00', '18:00'],
          thursday: ['15:00', '18:00'],
          friday: ['15:00', '18:00'],
          saturday: ['12:00', '18:00'],
          sunday: ['12:00', '18:00']
        }),
        contact_preferences: JSON.stringify(['in_app']),
        created_at: new Date('2024-03-16T13:00:00Z'),
        updated_at: new Date('2024-03-20T17:15:00Z')
      }
    ];

    await queryInterface.bulkInsert('player_finders', playerFinderRecords, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('player_finders', null, {});
  }
}; 