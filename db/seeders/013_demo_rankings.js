/**
 * Seeder: Demo Rankings
 * 
 * This seeder creates sample rankings for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const rankings = [
      // John's Doubles Ranking
      {
        id: '550e8400-e29b-41d4-a716-446655440020',
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        category: 'doubles',
        skill_level: '3.5',
        age_group: '25-45',
        gender_category: 'men',
        state: 'Jalisco',
        region: 'West Mexico',
        national_rank: 45,
        state_rank: 8,
        regional_rank: 12,
        points: 1250,
        total_tournaments: 5,
        tournaments_won: 1,
        tournaments_runner_up: 2,
        tournaments_semi_final: 1,
        total_matches: 18,
        matches_won: 12,
        matches_lost: 6,
        win_percentage: 66.67,
        total_games: 54,
        games_won: 35,
        games_lost: 19,
        game_win_percentage: 64.81,
        current_streak: 3,
        longest_streak: 5,
        last_tournament_date: new Date(2024, 5, 15, 0, 0, 0),
        last_match_date: new Date(2024, 5, 15, 9, 45, 0),
        ranking_date: new Date(2024, 5, 16, 0, 0, 0),
        previous_rank: 52,
        rank_change: 7,
        previous_points: 1100,
        points_change: 150,
        is_active: true,
        metadata: JSON.stringify({
          ranking_period: 'monthly',
          tournament_weight: 'high',
          consistency_factor: 0.85
        }),
        created_at: now,
        updated_at: now
      },

      // John's Overall Ranking
      {
        id: '550e8400-e29b-41d4-a716-446655440021',
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        category: 'overall',
        skill_level: '3.5',
        age_group: '25-45',
        gender_category: 'open',
        state: 'Jalisco',
        region: 'West Mexico',
        national_rank: 78,
        state_rank: 15,
        regional_rank: 22,
        points: 2100,
        total_tournaments: 8,
        tournaments_won: 2,
        tournaments_runner_up: 3,
        tournaments_semi_final: 2,
        total_matches: 32,
        matches_won: 22,
        matches_lost: 10,
        win_percentage: 68.75,
        total_games: 96,
        games_won: 62,
        games_lost: 34,
        game_win_percentage: 64.58,
        current_streak: 4,
        longest_streak: 6,
        last_tournament_date: new Date(2024, 5, 15, 0, 0, 0),
        last_match_date: new Date(2024, 5, 15, 9, 45, 0),
        ranking_date: new Date(2024, 5, 16, 0, 0, 0),
        previous_rank: 85,
        rank_change: 7,
        previous_points: 1950,
        points_change: 150,
        is_active: true,
        metadata: JSON.stringify({
          ranking_period: 'monthly',
          multi_category_bonus: true,
          activity_score: 0.92
        }),
        created_at: now,
        updated_at: now
      },

      // Super Admin's Singles Ranking
      {
        id: '550e8400-e29b-41d4-a716-446655440022',
        user_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        category: 'singles',
        skill_level: '5.0',
        age_group: '40-60',
        gender_category: 'men',
        state: 'Jalisco',
        region: 'West Mexico',
        national_rank: 12,
        state_rank: 2,
        regional_rank: 3,
        points: 3200,
        total_tournaments: 15,
        tournaments_won: 8,
        tournaments_runner_up: 4,
        tournaments_semi_final: 2,
        total_matches: 67,
        matches_won: 58,
        matches_lost: 9,
        win_percentage: 86.57,
        total_games: 201,
        games_won: 178,
        games_lost: 23,
        game_win_percentage: 88.56,
        current_streak: 8,
        longest_streak: 12,
        last_tournament_date: new Date(2024, 4, 20, 0, 0, 0),
        last_match_date: new Date(2024, 4, 20, 16, 30, 0),
        ranking_date: new Date(2024, 5, 1, 0, 0, 0),
        previous_rank: 15,
        rank_change: 3,
        previous_points: 3050,
        points_change: 150,
        is_active: true,
        metadata: JSON.stringify({
          ranking_period: 'monthly',
          elite_player: true,
          coaching_credits: 5
        }),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('rankings', rankings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rankings', null, {});
  }
}; 