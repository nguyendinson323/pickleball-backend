'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tournamentRegistrations = [
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440010', // Spring Championship 2024
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        registration_date: '2024-03-15',
        category: 'singles',
        division: 'intermediate',
        partner_id: null,
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Looking forward to competing!',
        created_at: new Date('2024-03-15T10:30:00Z'),
        updated_at: new Date('2024-03-15T10:30:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440011', // Pro Division Championship
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        registration_date: '2024-03-12',
        category: 'singles',
        division: 'advanced',
        partner_id: null,
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Ready for the challenge!',
        created_at: new Date('2024-03-12T16:45:00Z'),
        updated_at: new Date('2024-03-12T16:45:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440012', // Beginner Friendly Tournament
        user_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        registration_date: '2024-03-14',
        category: 'singles',
        division: 'beginner',
        partner_id: null,
        payment_status: 'failed',
        registration_status: 'pending',
        notes: 'First tournament, excited to participate!',
        created_at: new Date('2024-03-14T13:20:00Z'),
        updated_at: new Date('2024-03-14T13:20:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440013', // Mixed Doubles Championship
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        registration_date: '2024-03-16',
        category: 'doubles',
        division: 'intermediate',
        partner_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Team registration with Anna',
        created_at: new Date('2024-03-16T12:15:00Z'),
        updated_at: new Date('2024-03-16T12:15:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440013', // Mixed Doubles Championship
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        registration_date: '2024-03-16',
        category: 'doubles',
        division: 'intermediate',
        partner_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Team registration with John',
        created_at: new Date('2024-03-16T12:15:00Z'),
        updated_at: new Date('2024-03-16T12:15:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440014', // Senior Championship
        user_id: '550e8400-e29b-41d4-a716-446655440010', // Maria Player
        registration_date: '2024-03-10',
        category: 'singles',
        division: 'beginner',
        partner_id: null,
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Senior division participant',
        created_at: new Date('2024-03-10T09:30:00Z'),
        updated_at: new Date('2024-03-10T09:30:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440015', // Youth Championship
        user_id: '550e8400-e29b-41d4-a716-446655440013', // Michael Player
        registration_date: '2024-03-18',
        category: 'singles',
        division: 'beginner',
        partner_id: null,
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Youth division - first tournament',
        created_at: new Date('2024-03-18T14:20:00Z'),
        updated_at: new Date('2024-03-18T14:20:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440016', // Club Championship
        user_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        registration_date: '2024-03-20',
        category: 'singles',
        division: 'intermediate',
        partner_id: null,
        payment_status: 'pending',
        registration_status: 'pending',
        notes: 'Club member registration',
        created_at: new Date('2024-03-20T11:45:00Z'),
        updated_at: new Date('2024-03-20T11:45:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440017', // Charity Tournament
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        registration_date: '2024-03-22',
        category: 'doubles',
        division: 'advanced',
        partner_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Charity event - supporting local community',
        created_at: new Date('2024-03-22T15:30:00Z'),
        updated_at: new Date('2024-03-22T15:30:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440017', // Charity Tournament
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        registration_date: '2024-03-22',
        category: 'doubles',
        division: 'advanced',
        partner_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Charity event - supporting local community',
        created_at: new Date('2024-03-22T15:30:00Z'),
        updated_at: new Date('2024-03-22T15:30:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440018', // Holiday Special Tournament
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        registration_date: '2024-03-25',
        category: 'singles',
        division: 'intermediate',
        partner_id: null,
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Holiday tournament - special pricing',
        created_at: new Date('2024-03-25T10:15:00Z'),
        updated_at: new Date('2024-03-25T10:15:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440019', // Women\'s Championship
        user_id: '550e8400-e29b-41d4-a716-446655440012', // Jennifer Player
        registration_date: '2024-03-26',
        category: 'singles',
        division: 'advanced',
        partner_id: null,
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Women\'s division championship',
        created_at: new Date('2024-03-26T13:45:00Z'),
        updated_at: new Date('2024-03-26T13:45:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440020', // Men\'s Championship
        user_id: '550e8400-e29b-41d4-a716-446655440011', // Robert Player
        registration_date: '2024-03-27',
        category: 'singles',
        division: 'intermediate',
        partner_id: null,
        payment_status: 'pending',
        registration_status: 'pending',
        notes: 'Men\'s division championship',
        created_at: new Date('2024-03-27T16:20:00Z'),
        updated_at: new Date('2024-03-27T16:20:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440021', // Team Tournament
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        registration_date: '2024-03-28',
        category: 'team',
        division: 'intermediate',
        partner_id: null,
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Team tournament registration',
        created_at: new Date('2024-03-28T09:30:00Z'),
        updated_at: new Date('2024-03-28T09:30:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440022', // Regional Championship
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        registration_date: '2024-03-29',
        category: 'singles',
        division: 'advanced',
        partner_id: null,
        payment_status: 'paid',
        registration_status: 'confirmed',
        notes: 'Regional championship - qualifying event',
        created_at: new Date('2024-03-29T12:00:00Z'),
        updated_at: new Date('2024-03-29T12:00:00Z')
      }
    ];

    await queryInterface.bulkInsert('tournament_registrations', tournamentRegistrations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tournament_registrations', null, {});
  }
}; 