/**
 * Rankings Seeder
 * 
 * Seeds the rankings table with sample data
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
      `SELECT id, state FROM users WHERE user_type = 'player' ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (players.length < 5) {
      throw new Error('Not enough player users found. Please run users seeder first.');
    }

    const rankings = [
      {
        id: uuidv4(),
        user_id: players[0].id,
        category: 'doubles',
        skill_level: '4.5',
        age_group: 'Open',
        gender_category: 'men',
        state: players[0].state || 'Jalisco',
        region: 'Centro-Occidente',
        national_rank: 15,
        state_rank: 3,
        regional_rank: 7,
        points: 2850,
        total_tournaments: 18,
        tournaments_won: 4,
        tournaments_runner_up: 3,
        tournaments_semi_final: 6,
        total_matches: 89,
        matches_won: 67,
        matches_lost: 22,
        win_percentage: '75.28',
        total_games: 234,
        games_won: 169,
        games_lost: 65,
        game_win_percentage: '72.22',
        current_streak: 5,
        longest_streak: 12,
        last_tournament_date: new Date('2024-10-15T18:00:00Z'),
        last_match_date: new Date('2024-10-15T16:45:00Z'),
        ranking_date: new Date('2024-11-01T00:00:00Z'),
        previous_rank: 17,
        rank_change: 2,
        previous_points: 2650,
        points_change: 200,
        is_active: true,
        metadata: JSON.stringify({
          ranking_period: '2024-Q4',
          tournaments_this_quarter: 4,
          best_result: '1st Place - Guadalajara Open 2024',
          notable_wins: ['Beat #8 ranked player', 'Tournament winner streak: 2'],
          playing_partners: ['Juan Carlos M.', 'Roberto G.']
        }),
        created_at: new Date('2024-01-15T00:00:00Z'),
        updated_at: new Date('2024-11-01T00:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: players[1].id,
        category: 'singles',
        skill_level: '4.0',
        age_group: 'Open',
        gender_category: 'women',
        state: players[1].state || 'Nuevo León',
        region: 'Noreste',
        national_rank: 28,
        state_rank: 5,
        regional_rank: 12,
        points: 2340,
        total_tournaments: 14,
        tournaments_won: 2,
        tournaments_runner_up: 4,
        tournaments_semi_final: 3,
        total_matches: 76,
        matches_won: 52,
        matches_lost: 24,
        win_percentage: '68.42',
        total_games: 187,
        games_won: 128,
        games_lost: 59,
        game_win_percentage: '68.45',
        current_streak: 3,
        longest_streak: 8,
        last_tournament_date: new Date('2024-11-10T17:30:00Z'),
        last_match_date: new Date('2024-11-10T15:20:00Z'),
        ranking_date: new Date('2024-11-01T00:00:00Z'),
        previous_rank: 32,
        rank_change: 4,
        previous_points: 2180,
        points_change: 160,
        is_active: true,
        metadata: JSON.stringify({
          ranking_period: '2024-Q4',
          tournaments_this_quarter: 3,
          best_result: '2nd Place - Monterrey Youth Championship',
          improvement_trend: 'Rising',
          coaching_academy: 'Monterrey Pickleball Academy'
        }),
        created_at: new Date('2024-02-20T00:00:00Z'),
        updated_at: new Date('2024-11-01T00:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: players[2].id,
        category: 'mixed_doubles',
        skill_level: '3.5',
        age_group: '35+',
        gender_category: 'mixed',
        state: players[2].state || 'Querétaro',
        region: 'Centro',
        national_rank: 45,
        state_rank: 8,
        regional_rank: 18,
        points: 1850,
        total_tournaments: 10,
        tournaments_won: 1,
        tournaments_runner_up: 2,
        tournaments_semi_final: 2,
        total_matches: 54,
        matches_won: 34,
        matches_lost: 20,
        win_percentage: '62.96',
        total_games: 142,
        games_won: 89,
        games_lost: 53,
        game_win_percentage: '62.68',
        current_streak: 2,
        longest_streak: 6,
        last_tournament_date: new Date('2024-10-20T16:00:00Z'),
        last_match_date: new Date('2024-10-20T14:30:00Z'),
        ranking_date: new Date('2024-11-01T00:00:00Z'),
        previous_rank: 48,
        rank_change: 3,
        previous_points: 1720,
        points_change: 130,
        is_active: true,
        metadata: JSON.stringify({
          ranking_period: '2024-Q4',
          tournaments_this_quarter: 2,
          best_result: '1st Place - Querétaro Senior Classic',
          age_category_specialist: true,
          regular_partner: 'Maria Elena R.'
        }),
        created_at: new Date('2024-03-10T00:00:00Z'),
        updated_at: new Date('2024-11-01T00:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: players[3].id,
        category: 'overall',
        skill_level: '5.0',
        age_group: 'Open',
        gender_category: 'open',
        state: players[3].state || 'Quintana Roo',
        region: 'Sureste',
        national_rank: 8,
        state_rank: 1,
        regional_rank: 2,
        points: 3650,
        total_tournaments: 22,
        tournaments_won: 8,
        tournaments_runner_up: 5,
        tournaments_semi_final: 7,
        total_matches: 124,
        matches_won: 98,
        matches_lost: 26,
        win_percentage: '79.03',
        total_games: 312,
        games_won: 241,
        games_lost: 71,
        game_win_percentage: '77.24',
        current_streak: 8,
        longest_streak: 15,
        last_tournament_date: new Date('2025-02-16T19:00:00Z'),
        last_match_date: new Date('2025-02-16T17:15:00Z'),
        ranking_date: new Date('2024-11-01T00:00:00Z'),
        previous_rank: 12,
        rank_change: 4,
        previous_points: 3350,
        points_change: 300,
        is_active: true,
        metadata: JSON.stringify({
          ranking_period: '2024-Q4',
          tournaments_this_quarter: 5,
          best_result: 'Multiple tournament wins',
          professional_status: 'Semi-professional',
          international_experience: true,
          resort_pro: 'Cancún Beach Pickleball Resort'
        }),
        created_at: new Date('2023-12-01T00:00:00Z'),
        updated_at: new Date('2024-11-01T00:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: players[4].id,
        category: 'doubles',
        skill_level: '3.0',
        age_group: 'Open',
        gender_category: 'women',
        state: players[4].state || 'Puebla',
        region: 'Centro-Sur',
        national_rank: 78,
        state_rank: 15,
        regional_rank: 32,
        points: 1250,
        total_tournaments: 7,
        tournaments_won: 0,
        tournaments_runner_up: 1,
        tournaments_semi_final: 1,
        total_matches: 38,
        matches_won: 22,
        matches_lost: 16,
        win_percentage: '57.89',
        total_games: 95,
        games_won: 56,
        games_lost: 39,
        game_win_percentage: '58.95',
        current_streak: 1,
        longest_streak: 4,
        last_tournament_date: new Date('2024-12-08T17:00:00Z'),
        last_match_date: new Date('2024-12-08T15:45:00Z'),
        ranking_date: new Date('2024-11-01T00:00:00Z'),
        previous_rank: 85,
        rank_change: 7,
        previous_points: 1080,
        points_change: 170,
        is_active: true,
        metadata: JSON.stringify({
          ranking_period: '2024-Q4',
          tournaments_this_quarter: 3,
          best_result: '2nd Place - Puebla State Championship Qualifier',
          improvement_rate: 'Steady',
          club_member: 'Puebla Pickleball Club',
          development_program: true
        }),
        created_at: new Date('2024-06-15T00:00:00Z'),
        updated_at: new Date('2024-11-01T00:00:00Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('rankings', rankings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rankings', null, {});
  }
};