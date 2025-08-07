'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const matches = [
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440010', // Spring Championship 2024
        court_id: '550e8400-e29b-41d4-a716-446655440020', // Indoor Court 1
        player1_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        player2_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'intermediate',
        round: 'quarterfinal',
        match_number: 1,
        scheduled_time: new Date('2024-03-25T10:00:00Z'),
        start_time: new Date('2024-03-25T10:05:00Z'),
        end_time: new Date('2024-03-25T10:45:00Z'),
        duration_minutes: 40,
        player1_score: 21,
        player2_score: 15,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        status: 'completed',
        notes: 'Quarterfinal match - John wins in straight sets',
        created_at: new Date('2024-03-20T09:00:00Z'),
        updated_at: new Date('2024-03-25T10:45:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440011', // Pro Division Championship
        court_id: '550e8400-e29b-41d4-a716-446655440022', // Indoor Court 2
        player1_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        player2_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'advanced',
        round: 'final',
        match_number: 1,
        scheduled_time: new Date('2024-03-28T14:00:00Z'),
        start_time: new Date('2024-03-28T14:02:00Z'),
        end_time: new Date('2024-03-28T15:15:00Z'),
        duration_minutes: 73,
        player1_score: 21,
        player2_score: 19,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        status: 'completed',
        notes: 'Championship final - Lisa wins in a close match',
        created_at: new Date('2024-03-25T10:00:00Z'),
        updated_at: new Date('2024-03-28T15:15:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440013', // Mixed Doubles Championship
        court_id: '550e8400-e29b-41d4-a716-446655440023', // Indoor Court 3
        player1_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        player2_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        player3_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        player4_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        match_type: 'doubles',
        division: 'intermediate',
        round: 'semifinal',
        match_number: 2,
        scheduled_time: new Date('2024-03-26T11:00:00Z'),
        start_time: new Date('2024-03-26T11:03:00Z'),
        end_time: new Date('2024-03-26T11:55:00Z'),
        duration_minutes: 52,
        player1_score: 21,
        player2_score: 18,
        player3_score: 15,
        player4_score: 21,
        winner_id: '550e8400-e29b-41d4-a716-446655440001', // John/Anna team
        status: 'completed',
        notes: 'Semifinal doubles match - John/Anna advance',
        created_at: new Date('2024-03-24T08:00:00Z'),
        updated_at: new Date('2024-03-26T11:55:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440010', // Spring Championship 2024
        court_id: '550e8400-e29b-41d4-a716-446655440021', // Outdoor Court 3
        player1_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        player2_id: '550e8400-e29b-41d4-a716-446655440011', // Robert Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'intermediate',
        round: 'semifinal',
        match_number: 3,
        scheduled_time: new Date('2024-03-26T15:00:00Z'),
        start_time: new Date('2024-03-26T15:05:00Z'),
        end_time: new Date('2024-03-26T15:40:00Z'),
        duration_minutes: 35,
        player1_score: 21,
        player2_score: 12,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        status: 'completed',
        notes: 'Semifinal match - Anna dominates',
        created_at: new Date('2024-03-25T11:00:00Z'),
        updated_at: new Date('2024-03-26T15:40:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440012', // Beginner Friendly Tournament
        court_id: '550e8400-e29b-41d4-a716-446655440024', // Outdoor Court 1
        player1_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        player2_id: '550e8400-e29b-41d4-a716-446655440013', // Michael Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'beginner',
        round: 'first_round',
        match_number: 1,
        scheduled_time: new Date('2024-03-30T09:00:00Z'),
        start_time: new Date('2024-03-30T09:02:00Z'),
        end_time: new Date('2024-03-30T09:35:00Z'),
        duration_minutes: 33,
        player1_score: 21,
        player2_score: 17,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        status: 'completed',
        notes: 'First round beginner match - Emma wins',
        created_at: new Date('2024-03-28T10:00:00Z'),
        updated_at: new Date('2024-03-30T09:35:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440014', // Senior Championship
        court_id: '550e8400-e29b-41d4-a716-446655440025', // Outdoor Court 2
        player1_id: '550e8400-e29b-41d4-a716-446655440010', // Maria Player
        player2_id: '550e8400-e29b-41d4-a716-446655440014', // Senior Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'beginner',
        round: 'final',
        match_number: 1,
        scheduled_time: new Date('2024-04-01T10:00:00Z'),
        start_time: new Date('2024-04-01T10:05:00Z'),
        end_time: new Date('2024-04-01T10:50:00Z'),
        duration_minutes: 45,
        player1_score: 21,
        player2_score: 19,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440010', // Maria Player
        status: 'completed',
        notes: 'Senior championship final - Maria wins',
        created_at: new Date('2024-03-30T08:00:00Z'),
        updated_at: new Date('2024-04-01T10:50:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440015', // Youth Championship
        court_id: '550e8400-e29b-41d4-a716-446655440020', // Indoor Court 1
        player1_id: '550e8400-e29b-41d4-a716-446655440013', // Michael Player
        player2_id: '550e8400-e29b-41d4-a716-446655440015', // Youth Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'beginner',
        round: 'semifinal',
        match_number: 2,
        scheduled_time: new Date('2024-04-02T14:00:00Z'),
        start_time: new Date('2024-04-02T14:03:00Z'),
        end_time: new Date('2024-04-02T14:35:00Z'),
        duration_minutes: 32,
        player1_score: 18,
        player2_score: 21,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440015', // Youth Player
        status: 'completed',
        notes: 'Youth semifinal - Youth Player advances',
        created_at: new Date('2024-04-01T09:00:00Z'),
        updated_at: new Date('2024-04-02T14:35:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440017', // Charity Tournament
        court_id: '550e8400-e29b-41d4-a716-446655440022', // Indoor Court 2
        player1_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        player2_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        player3_id: '550e8400-e29b-41d4-a716-446655440016', // Partner 1
        player4_id: '550e8400-e29b-41d4-a716-446655440017', // Partner 2
        match_type: 'doubles',
        division: 'advanced',
        round: 'final',
        match_number: 1,
        scheduled_time: new Date('2024-04-03T16:00:00Z'),
        start_time: new Date('2024-04-03T16:05:00Z'),
        end_time: new Date('2024-04-03T17:20:00Z'),
        duration_minutes: 75,
        player1_score: 21,
        player2_score: 19,
        player3_score: 18,
        player4_score: 21,
        winner_id: '550e8400-e29b-41d4-a716-446655440009', // Chris/Partner team
        status: 'completed',
        notes: 'Charity tournament final - Chris/Partner win',
        created_at: new Date('2024-04-02T10:00:00Z'),
        updated_at: new Date('2024-04-03T17:20:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440018', // Holiday Special Tournament
        court_id: '550e8400-e29b-41d4-a716-446655440023', // Indoor Court 3
        player1_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        player2_id: '550e8400-e29b-41d4-a716-446655440018', // Holiday Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'intermediate',
        round: 'quarterfinal',
        match_number: 1,
        scheduled_time: new Date('2024-04-05T10:00:00Z'),
        start_time: new Date('2024-04-05T10:02:00Z'),
        end_time: new Date('2024-04-05T10:40:00Z'),
        duration_minutes: 38,
        player1_score: 21,
        player2_score: 16,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        status: 'completed',
        notes: 'Holiday tournament quarterfinal - Anna advances',
        created_at: new Date('2024-04-03T08:00:00Z'),
        updated_at: new Date('2024-04-05T10:40:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440019', // Women\'s Championship
        court_id: '550e8400-e29b-41d4-a716-446655440020', // Indoor Court 1
        player1_id: '550e8400-e29b-41d4-a716-446655440012', // Jennifer Player
        player2_id: '550e8400-e29b-41d4-a716-446655440019', // Women Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'advanced',
        round: 'final',
        match_number: 1,
        scheduled_time: new Date('2024-04-06T14:00:00Z'),
        start_time: new Date('2024-04-06T14:03:00Z'),
        end_time: new Date('2024-04-06T15:10:00Z'),
        duration_minutes: 67,
        player1_score: 21,
        player2_score: 18,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440012', // Jennifer Player
        status: 'completed',
        notes: 'Women\'s championship final - Jennifer wins',
        created_at: new Date('2024-04-04T09:00:00Z'),
        updated_at: new Date('2024-04-06T15:10:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440020', // Men\'s Championship
        court_id: '550e8400-e29b-41d4-a716-446655440022', // Indoor Court 2
        player1_id: '550e8400-e29b-41d4-a716-446655440011', // Robert Player
        player2_id: '550e8400-e29b-41d4-a716-446655440020', // Men Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'intermediate',
        round: 'semifinal',
        match_number: 1,
        scheduled_time: new Date('2024-04-07T11:00:00Z'),
        start_time: new Date('2024-04-07T11:05:00Z'),
        end_time: new Date('2024-04-07T11:45:00Z'),
        duration_minutes: 40,
        player1_score: 19,
        player2_score: 21,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440020', // Men Player
        status: 'completed',
        notes: 'Men\'s semifinal - Men Player advances',
        created_at: new Date('2024-04-05T10:00:00Z'),
        updated_at: new Date('2024-04-07T11:45:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440021', // Team Tournament
        court_id: '550e8400-e29b-41d4-a716-446655440023', // Indoor Court 3
        player1_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        player2_id: '550e8400-e29b-41d4-a716-446655440021', // Team A Captain
        player3_id: '550e8400-e29b-41d4-a716-446655440022', // Team A Player
        player4_id: '550e8400-e29b-41d4-a716-446655440023', // Team B Player
        match_type: 'team',
        division: 'intermediate',
        round: 'first_round',
        match_number: 1,
        scheduled_time: new Date('2024-04-08T09:00:00Z'),
        start_time: new Date('2024-04-08T09:03:00Z'),
        end_time: new Date('2024-04-08T10:15:00Z'),
        duration_minutes: 72,
        player1_score: 21,
        player2_score: 18,
        player3_score: 19,
        player4_score: 21,
        winner_id: '550e8400-e29b-41d4-a716-446655440001', // John\'s team
        status: 'completed',
        notes: 'Team tournament first round - John\'s team wins',
        created_at: new Date('2024-04-06T08:00:00Z'),
        updated_at: new Date('2024-04-08T10:15:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440022', // Regional Championship
        court_id: '550e8400-e29b-41d4-a716-446655440020', // Indoor Court 1
        player1_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        player2_id: '550e8400-e29b-41d4-a716-446655440024', // Regional Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'advanced',
        round: 'final',
        match_number: 1,
        scheduled_time: new Date('2024-04-09T15:00:00Z'),
        start_time: new Date('2024-04-09T15:05:00Z'),
        end_time: new Date('2024-04-09T16:25:00Z'),
        duration_minutes: 80,
        player1_score: 21,
        player2_score: 19,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        status: 'completed',
        notes: 'Regional championship final - Chris wins',
        created_at: new Date('2024-04-07T09:00:00Z'),
        updated_at: new Date('2024-04-09T16:25:00Z')
      },
      {
        id: uuidv4(),
        tournament_id: '550e8400-e29b-41d4-a716-446655440010', // Spring Championship 2024
        court_id: '550e8400-e29b-41d4-a716-446655440021', // Outdoor Court 3
        player1_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        player2_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        player3_id: null,
        player4_id: null,
        match_type: 'singles',
        division: 'intermediate',
        round: 'final',
        match_number: 1,
        scheduled_time: new Date('2024-03-27T14:00:00Z'),
        start_time: new Date('2024-03-27T14:05:00Z'),
        end_time: new Date('2024-03-27T15:10:00Z'),
        duration_minutes: 65,
        player1_score: 21,
        player2_score: 18,
        player3_score: null,
        player4_score: null,
        winner_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        status: 'completed',
        notes: 'Spring Championship final - John wins the tournament!',
        created_at: new Date('2024-03-26T10:00:00Z'),
        updated_at: new Date('2024-03-27T15:10:00Z')
      }
    ];

    await queryInterface.bulkInsert('matches', matches, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('matches', null, {});
  }
}; 