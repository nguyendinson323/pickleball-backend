/**
 * Seeder: Demo Matches
 * 
 * This seeder creates sample matches for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const matches = [
      // Elite Championship Match
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        tournament_id: '880e8400-e29b-41d4-a716-446655440001', // Elite Club Championship
        court_id: '770e8400-e29b-41d4-a716-446655440001', // Elite Court 1
        match_type: 'doubles',
        category: 'Men\'s Doubles',
        round: 'Quarter Finals',
        match_number: 1,
        player1_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        player2_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        player3_id: null, // Opponent team
        player4_id: null, // Opponent team
        team1_id: 'ff0e8400-e29b-41d4-a716-446655440001', // Smith Team
        team2_id: null, // Opponent team
        scheduled_time: new Date(2024, 5, 15, 9, 0, 0), // June 15, 2024 9:00 AM
        actual_start_time: new Date(2024, 5, 15, 9, 5, 0),
        actual_end_time: new Date(2024, 5, 15, 9, 45, 0),
        duration_minutes: 40,
        status: 'completed',
        winner_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        winning_team_id: 'ff0e8400-e29b-41d4-a716-446655440001', // Smith Team
        score: JSON.stringify({
          game1: { team1: 11, team2: 8 },
          game2: { team1: 11, team2: 9 },
          game3: null
        }),
        games_played: 2,
        games_to_win: 2,
        points_to_win_game: 11,
        win_by_margin: 2,
        referee_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        scorekeeper_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        notes: 'Excellent match with great sportsmanship',
        is_featured: true,
        is_streamed: false,
        stream_url: null,
        highlights_url: null,
        metadata: JSON.stringify({
          match_quality: 'high',
          attendance: 45,
          weather: 'indoor'
        }),
        created_at: now,
        updated_at: now
      },

      // Community Tournament Match
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        tournament_id: '880e8400-e29b-41d4-a716-446655440002', // Community Spring Tournament
        court_id: '770e8400-e29b-41d4-a716-446655440003', // Community Court A
        match_type: 'mixed_doubles',
        category: 'Mixed Doubles',
        round: 'Round Robin',
        match_number: 5,
        player1_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        player2_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        player3_id: null, // Opponent team
        player4_id: null, // Opponent team
        team1_id: 'ff0e8400-e29b-41d4-a716-446655440002', // Community Stars
        team2_id: null, // Opponent team
        scheduled_time: new Date(2024, 3, 20, 10, 0, 0), // April 20, 2024 10:00 AM
        actual_start_time: new Date(2024, 3, 20, 10, 2, 0),
        actual_end_time: new Date(2024, 3, 20, 10, 35, 0),
        duration_minutes: 33,
        status: 'completed',
        winner_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        winning_team_id: 'ff0e8400-e29b-41d4-a716-446655440002', // Community Stars
        score: JSON.stringify({
          game1: { team1: 11, team2: 7 },
          game2: { team1: 8, team2: 11 },
          game3: { team1: 11, team2: 6 }
        }),
        games_played: 3,
        games_to_win: 2,
        points_to_win_game: 11,
        win_by_margin: 2,
        referee_id: null,
        scorekeeper_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        notes: 'Friendly community match',
        is_featured: false,
        is_streamed: false,
        stream_url: null,
        highlights_url: null,
        metadata: JSON.stringify({
          match_quality: 'medium',
          attendance: 12,
          weather: 'outdoor'
        }),
        created_at: now,
        updated_at: now
      },

      // Youth Championship Match
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        tournament_id: '880e8400-e29b-41d4-a716-446655440003', // Youth Championship
        court_id: '770e8400-e29b-41d4-a716-446655440002', // Elite Court 2
        match_type: 'singles',
        category: 'Youth Singles',
        round: 'Preliminary',
        match_number: 3,
        player1_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin (representing youth)
        player2_id: null, // Opponent
        player3_id: null,
        player4_id: null,
        team1_id: 'ff0e8400-e29b-41d4-a716-446655440003', // Youth Champion
        team2_id: null, // Opponent team
        scheduled_time: new Date(2024, 7, 10, 9, 30, 0), // August 10, 2024 9:30 AM
        actual_start_time: null,
        actual_end_time: null,
        duration_minutes: null,
        status: 'scheduled',
        winner_id: null,
        winning_team_id: null,
        score: null,
        games_played: 0,
        games_to_win: 2,
        points_to_win_game: 11,
        win_by_margin: 2,
        referee_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        scorekeeper_id: null,
        notes: 'Youth development match',
        is_featured: false,
        is_streamed: false,
        stream_url: null,
        highlights_url: null,
        metadata: JSON.stringify({
          match_quality: 'development',
          attendance: 8,
          weather: 'outdoor',
          youth_focused: true
        }),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('matches', matches, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('matches', null, {});
  }
}; 