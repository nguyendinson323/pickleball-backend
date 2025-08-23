/**
 * Matches Seeder
 * 
 * Seeds the matches table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get tournaments, courts, users, and teams from database
    const tournaments = await queryInterface.sequelize.query(
      `SELECT id FROM tournaments ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const courts = await queryInterface.sequelize.query(
      `SELECT id FROM courts ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'player' ORDER BY created_at LIMIT 20`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const teams = await queryInterface.sequelize.query(
      `SELECT id FROM tournament_teams ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (tournaments.length < 3 || courts.length < 3 || users.length < 8) {
      throw new Error('Not enough related records found. Please run previous seeders first.');
    }

    const matches = [
      {
        id: uuidv4(),
        tournament_id: tournaments[0].id,
        court_id: courts[0].id,
        match_type: 'doubles',
        category: 'Professional',
        round: 'Finals',
        match_number: 1,
        player1_id: users[0].id,
        player2_id: users[1].id,
        player3_id: users[2].id,
        player4_id: users[3].id,
        team1_id: teams.length > 0 ? teams[0].id : null,
        team2_id: teams.length > 1 ? teams[1].id : null,
        scheduled_time: new Date('2024-12-17T16:00:00Z'),
        actual_start_time: new Date('2024-12-17T16:05:30Z'),
        actual_end_time: new Date('2024-12-17T17:23:45Z'),
        duration_minutes: 78,
        status: 'completed',
        winner_id: users[0].id,
        winning_team_id: teams.length > 0 ? teams[0].id : null,
        score: JSON.stringify({
          games: [
            {
              game_number: 1,
              team1_score: 11,
              team2_score: 8,
              duration_minutes: 28
            },
            {
              game_number: 2,
              team1_score: 9,
              team2_score: 11,
              duration_minutes: 25
            },
            {
              game_number: 3,
              team1_score: 11,
              team2_score: 6,
              duration_minutes: 25
            }
          ],
          final_score: {
            team1_games: 2,
            team2_games: 1,
            total_points_team1: 31,
            total_points_team2: 25
          }
        }),
        games_played: 3,
        games_to_win: 2,
        points_to_win_game: 11,
        win_by_margin: 2,
        referee_id: users[18].id,
        scorekeeper_id: users[19].id,
        notes: 'Championship final match. Excellent play from both teams. Team 1 showed great composure in the deciding game.',
        is_featured: true,
        is_streamed: true,
        stream_url: 'https://stream.pickleballmexico.com/guadalajara-open-2024-finals',
        highlights_url: 'https://highlights.pickleballmexico.com/guadalajara-open-2024-finals-highlights',
        metadata: JSON.stringify({
          attendance: 250,
          prize_money: 30000,
          broadcast_language: 'Spanish',
          commentary_team: ['José Luis Rivera', 'Ana Martínez'],
          weather_conditions: 'Perfect - 24°C, no wind',
          match_rating: 'A+'
        }),
        created_at: new Date('2024-12-10T09:00:00Z'),
        updated_at: new Date('2024-12-17T17:25:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[1].id,
        court_id: courts[1].id,
        match_type: 'mixed_doubles',
        category: 'Youth',
        round: 'Semifinals',
        match_number: 2,
        player1_id: users[4].id,
        player2_id: users[5].id,
        player3_id: users[6].id,
        player4_id: users[7].id,
        team1_id: null,
        team2_id: null,
        scheduled_time: new Date('2024-11-26T14:30:00Z'),
        actual_start_time: new Date('2024-11-26T14:35:15Z'),
        actual_end_time: new Date('2024-11-26T15:42:30Z'),
        duration_minutes: 67,
        status: 'completed',
        winner_id: users[4].id,
        winning_team_id: null,
        score: JSON.stringify({
          games: [
            {
              game_number: 1,
              team1_score: 11,
              team2_score: 9,
              duration_minutes: 22
            },
            {
              game_number: 2,
              team1_score: 11,
              team2_score: 7,
              duration_minutes: 20
            }
          ],
          final_score: {
            team1_games: 2,
            team2_games: 0,
            total_points_team1: 22,
            total_points_team2: 16
          }
        }),
        games_played: 2,
        games_to_win: 2,
        points_to_win_game: 11,
        win_by_margin: 2,
        referee_id: users[16].id,
        scorekeeper_id: users[17].id,
        notes: 'Great youth match showcasing future talent. Coaching allowed between points as per youth rules.',
        is_featured: false,
        is_streamed: false,
        stream_url: null,
        highlights_url: null,
        metadata: JSON.stringify({
          youth_tournament: true,
          parents_present: 15,
          coaching_allowed: true,
          skill_development_focus: true,
          age_range: '14-17'
        }),
        created_at: new Date('2024-11-20T10:00:00Z'),
        updated_at: new Date('2024-11-26T15:45:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[2].id,
        court_id: courts[2].id,
        match_type: 'doubles',
        category: 'Senior',
        round: 'Round Robin',
        match_number: 5,
        player1_id: users[8].id,
        player2_id: users[9].id,
        player3_id: users[10].id,
        player4_id: users[11].id,
        team1_id: null,
        team2_id: null,
        scheduled_time: new Date('2024-10-20T15:00:00Z'),
        actual_start_time: new Date('2024-10-20T15:08:20Z'),
        actual_end_time: new Date('2024-10-20T16:05:45Z'),
        duration_minutes: 57,
        status: 'completed',
        winner_id: users[8].id,
        winning_team_id: null,
        score: JSON.stringify({
          games: [
            {
              game_number: 1,
              team1_score: 11,
              team2_score: 5,
              duration_minutes: 18
            },
            {
              game_number: 2,
              team1_score: 11,
              team2_score: 8,
              duration_minutes: 21
            }
          ],
          final_score: {
            team1_games: 2,
            team2_games: 0,
            total_points_team1: 22,
            total_points_team2: 13
          }
        }),
        games_played: 2,
        games_to_win: 2,
        points_to_win_game: 11,
        win_by_margin: 2,
        referee_id: users[15].id,
        scorekeeper_id: users[14].id,
        notes: 'Senior match with extended rest periods. All players showed excellent sportsmanship and fitness.',
        is_featured: false,
        is_streamed: false,
        stream_url: null,
        highlights_url: null,
        metadata: JSON.stringify({
          senior_tournament: true,
          extended_rest: '10 minutes between games',
          medical_staff_present: true,
          age_range: '55+',
          focus: 'fitness and fun'
        }),
        created_at: new Date('2024-10-15T12:00:00Z'),
        updated_at: new Date('2024-10-20T16:10:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[3].id,
        court_id: courts[3].id,
        match_type: 'mixed_doubles',
        category: 'Amateur',
        round: 'Quarterfinals',
        match_number: 3,
        player1_id: users[12].id,
        player2_id: users[13].id,
        player3_id: users[14].id,
        player4_id: users[15].id,
        team1_id: null,
        team2_id: null,
        scheduled_time: new Date('2025-02-15T18:00:00Z'),
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
        referee_id: users[16].id,
        scorekeeper_id: users[17].id,
        notes: 'Beachside sunset match scheduled. Premium court with ocean view.',
        is_featured: true,
        is_streamed: true,
        stream_url: 'https://stream.pickleballmexico.com/cancun-beach-cup-2025',
        highlights_url: null,
        metadata: JSON.stringify({
          beach_tournament: true,
          sunset_timing: true,
          ocean_view: true,
          premium_court: true,
          vacation_tournament: true,
          international_participants: true
        }),
        created_at: new Date('2025-02-01T10:00:00Z'),
        updated_at: new Date('2025-02-01T10:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[4].id,
        court_id: courts[4].id,
        match_type: 'singles',
        category: 'Amateur',
        round: 'First Round',
        match_number: 12,
        player1_id: users[16].id,
        player2_id: users[17].id,
        player3_id: null,
        player4_id: null,
        team1_id: null,
        team2_id: null,
        scheduled_time: new Date('2024-12-07T10:30:00Z'),
        actual_start_time: new Date('2024-12-07T10:35:00Z'),
        actual_end_time: null,
        duration_minutes: null,
        status: 'forfeit',
        winner_id: users[16].id,
        winning_team_id: null,
        score: JSON.stringify({
          forfeit: true,
          reason: 'Player 2 did not show up',
          walkover: true
        }),
        games_played: 0,
        games_to_win: 2,
        points_to_win_game: 11,
        win_by_margin: 2,
        referee_id: users[18].id,
        scorekeeper_id: null,
        notes: 'Player 2 did not show up for scheduled match. Automatic forfeit declared after 15-minute grace period.',
        is_featured: false,
        is_streamed: false,
        stream_url: null,
        highlights_url: null,
        metadata: JSON.stringify({
          forfeit_reason: 'no_show',
          grace_period: '15 minutes',
          walkover_awarded: true,
          state_championship: true,
          ranking_points_affected: false
        }),
        created_at: new Date('2024-12-01T14:00:00Z'),
        updated_at: new Date('2024-12-07T10:50:00Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('matches', matches, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('matches', null, {});
  }
};