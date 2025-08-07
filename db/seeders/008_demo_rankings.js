'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rankings = [
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        division: 'intermediate',
        category: 'singles',
        points: 1250,
        rank: 8,
        wins: 45,
        losses: 12,
        win_percentage: 78.95,
        tournaments_played: 12,
        tournaments_won: 3,
        last_updated: new Date('2024-03-17T12:00:00Z'),
        created_at: new Date('2024-01-15T10:00:00Z'),
        updated_at: new Date('2024-03-17T12:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        division: 'intermediate',
        category: 'doubles',
        points: 1180,
        rank: 12,
        wins: 38,
        losses: 15,
        win_percentage: 71.70,
        tournaments_played: 10,
        tournaments_won: 2,
        last_updated: new Date('2024-03-16T14:30:00Z'),
        created_at: new Date('2024-01-15T10:00:00Z'),
        updated_at: new Date('2024-03-16T14:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        division: 'advanced',
        category: 'singles',
        points: 1850,
        rank: 3,
        wins: 67,
        losses: 8,
        win_percentage: 89.33,
        tournaments_played: 18,
        tournaments_won: 8,
        last_updated: new Date('2024-03-18T16:45:00Z'),
        created_at: new Date('2024-01-10T09:00:00Z'),
        updated_at: new Date('2024-03-18T16:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        division: 'advanced',
        category: 'doubles',
        points: 1720,
        rank: 5,
        wins: 58,
        losses: 12,
        win_percentage: 82.86,
        tournaments_played: 15,
        tournaments_won: 6,
        last_updated: new Date('2024-03-15T11:20:00Z'),
        created_at: new Date('2024-01-10T09:00:00Z'),
        updated_at: new Date('2024-03-15T11:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        division: 'intermediate',
        category: 'singles',
        points: 1100,
        rank: 15,
        wins: 32,
        losses: 18,
        win_percentage: 64.00,
        tournaments_played: 8,
        tournaments_won: 1,
        last_updated: new Date('2024-03-17T12:00:00Z'),
        created_at: new Date('2024-02-01T14:00:00Z'),
        updated_at: new Date('2024-03-17T12:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        division: 'intermediate',
        category: 'doubles',
        points: 1050,
        rank: 18,
        wins: 28,
        losses: 22,
        win_percentage: 56.00,
        tournaments_played: 7,
        tournaments_won: 0,
        last_updated: new Date('2024-03-16T09:15:00Z'),
        created_at: new Date('2024-02-01T14:00:00Z'),
        updated_at: new Date('2024-03-16T09:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        division: 'beginner',
        category: 'singles',
        points: 450,
        rank: 5,
        wins: 15,
        losses: 8,
        win_percentage: 65.22,
        tournaments_played: 4,
        tournaments_won: 1,
        last_updated: new Date('2024-03-14T13:20:00Z'),
        created_at: new Date('2024-02-15T11:30:00Z'),
        updated_at: new Date('2024-03-14T13:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        division: 'beginner',
        category: 'doubles',
        points: 380,
        rank: 8,
        wins: 12,
        losses: 10,
        win_percentage: 54.55,
        tournaments_played: 3,
        tournaments_won: 0,
        last_updated: new Date('2024-03-13T10:45:00Z'),
        created_at: new Date('2024-02-15T11:30:00Z'),
        updated_at: new Date('2024-03-13T10:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        division: 'intermediate',
        category: 'singles',
        points: 1350,
        rank: 6,
        wins: 52,
        losses: 14,
        win_percentage: 78.79,
        tournaments_played: 14,
        tournaments_won: 4,
        last_updated: new Date('2024-03-19T15:30:00Z'),
        created_at: new Date('2024-01-20T08:00:00Z'),
        updated_at: new Date('2024-03-19T15:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        division: 'intermediate',
        category: 'doubles',
        points: 1280,
        rank: 9,
        wins: 45,
        losses: 16,
        win_percentage: 73.77,
        tournaments_played: 12,
        tournaments_won: 3,
        last_updated: new Date('2024-03-18T12:15:00Z'),
        created_at: new Date('2024-01-20T08:00:00Z'),
        updated_at: new Date('2024-03-18T12:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        division: 'advanced',
        category: 'singles',
        points: 2100,
        rank: 1,
        wins: 89,
        losses: 5,
        win_percentage: 94.68,
        tournaments_played: 22,
        tournaments_won: 12,
        last_updated: new Date('2024-03-20T18:00:00Z'),
        created_at: new Date('2024-01-05T10:00:00Z'),
        updated_at: new Date('2024-03-20T18:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        division: 'advanced',
        category: 'doubles',
        points: 1950,
        rank: 2,
        wins: 78,
        losses: 8,
        win_percentage: 90.70,
        tournaments_played: 20,
        tournaments_won: 10,
        last_updated: new Date('2024-03-19T14:20:00Z'),
        created_at: new Date('2024-01-05T10:00:00Z'),
        updated_at: new Date('2024-03-19T14:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440010', // Maria Player
        division: 'beginner',
        category: 'singles',
        points: 320,
        rank: 12,
        wins: 8,
        losses: 12,
        win_percentage: 40.00,
        tournaments_played: 3,
        tournaments_won: 0,
        last_updated: new Date('2024-03-16T16:30:00Z'),
        created_at: new Date('2024-03-01T13:00:00Z'),
        updated_at: new Date('2024-03-16T16:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440010', // Maria Player
        division: 'beginner',
        category: 'doubles',
        points: 280,
        rank: 15,
        wins: 6,
        losses: 14,
        win_percentage: 30.00,
        tournaments_played: 2,
        tournaments_won: 0,
        last_updated: new Date('2024-03-15T11:45:00Z'),
        created_at: new Date('2024-03-01T13:00:00Z'),
        updated_at: new Date('2024-03-15T11:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440011', // Robert Player
        division: 'intermediate',
        category: 'singles',
        points: 980,
        rank: 22,
        wins: 25,
        losses: 20,
        win_percentage: 55.56,
        tournaments_played: 6,
        tournaments_won: 0,
        last_updated: new Date('2024-03-14T09:30:00Z'),
        created_at: new Date('2024-02-10T15:00:00Z'),
        updated_at: new Date('2024-03-14T09:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440011', // Robert Player
        division: 'intermediate',
        category: 'doubles',
        points: 920,
        rank: 25,
        wins: 22,
        losses: 23,
        win_percentage: 48.89,
        tournaments_played: 5,
        tournaments_won: 0,
        last_updated: new Date('2024-03-13T14:15:00Z'),
        created_at: new Date('2024-02-10T15:00:00Z'),
        updated_at: new Date('2024-03-13T14:15:00Z')
      }
    ];

    await queryInterface.bulkInsert('rankings', rankings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rankings', null, {});
  }
}; 