/**
 * Seeder: Demo Tournament Teams
 * 
 * This seeder creates sample tournament teams for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const tournamentTeams = [
      // Smith Team (Doubles)
      {
        id: 'ff0e8400-e29b-41d4-a716-446655440001',
        tournament_id: '880e8400-e29b-41d4-a716-446655440001', // Elite Club Championship
        team_name: 'Smith Team',
        captain_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        player1_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        player2_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin (partner)
        player3_id: null,
        player4_id: null,
        category: 'Men\'s Doubles',
        skill_level: '3.5',
        age_group: '25-45',
        gender_category: 'men',
        status: 'confirmed',
        seed_position: 8,
        final_rank: null,
        points_earned: 0,
        matches_won: 0,
        matches_lost: 0,
        games_won: 0,
        games_lost: 0,
        team_logo: 'https://example.com/logos/smith_team.jpg',
        team_colors: JSON.stringify({
          primary: '#1e40af',
          secondary: '#fbbf24',
          accent: '#dc2626'
        }),
        registration_date: new Date(2024, 5, 12, 10, 30, 0),
        confirmed_at: new Date(2024, 5, 12, 10, 35, 0),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        metadata: JSON.stringify({
          team_experience: 'intermediate',
          previous_tournaments: 2,
          preferred_style: 'aggressive'
        }),
        created_at: now,
        updated_at: now
      },

      // Community Team (Mixed Doubles)
      {
        id: 'ff0e8400-e29b-41d4-a716-446655440002',
        tournament_id: '880e8400-e29b-41d4-a716-446655440002', // Community Spring Tournament
        team_name: 'Community Stars',
        captain_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        player1_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        player2_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin (partner)
        player3_id: null,
        player4_id: null,
        category: 'Mixed Doubles',
        skill_level: '3.5',
        age_group: '25-45',
        gender_category: 'mixed',
        status: 'confirmed',
        seed_position: null,
        final_rank: null,
        points_earned: 0,
        matches_won: 0,
        matches_lost: 0,
        games_won: 0,
        games_lost: 0,
        team_logo: null,
        team_colors: JSON.stringify({
          primary: '#059669',
          secondary: '#f59e0b',
          accent: '#7c3aed'
        }),
        registration_date: new Date(2024, 3, 16, 14, 0, 0),
        confirmed_at: new Date(2024, 3, 16, 14, 5, 0),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        metadata: JSON.stringify({
          team_experience: 'beginner',
          first_tournament: true,
          community_focused: true
        }),
        created_at: now,
        updated_at: now
      },

      // Youth Team (Singles)
      {
        id: 'ff0e8400-e29b-41d4-a716-446655440003',
        tournament_id: '880e8400-e29b-41d4-a716-446655440003', // Youth Championship
        team_name: 'Youth Champion',
        captain_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin (representing youth)
        player1_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        player2_id: null,
        player3_id: null,
        player4_id: null,
        category: 'Youth Singles',
        skill_level: '3.0',
        age_group: '16-17',
        gender_category: 'open',
        status: 'pending',
        seed_position: null,
        final_rank: null,
        points_earned: 0,
        matches_won: 0,
        matches_lost: 0,
        games_won: 0,
        games_lost: 0,
        team_logo: null,
        team_colors: JSON.stringify({
          primary: '#dc2626',
          secondary: '#1d4ed8',
          accent: '#16a34a'
        }),
        registration_date: new Date(2024, 7, 6, 9, 0, 0),
        confirmed_at: null,
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        metadata: JSON.stringify({
          team_experience: 'beginner',
          youth_category: true,
          parent_consent: true
        }),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('tournament_teams', tournamentTeams, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tournament_teams', null, {});
  }
}; 