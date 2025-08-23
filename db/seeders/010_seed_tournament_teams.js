/**
 * Tournament Teams Seeder
 * 
 * Seeds the tournament_teams table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get tournaments and users from database
    const tournaments = await queryInterface.sequelize.query(
      `SELECT id FROM tournaments WHERE tournament_type = 'team' OR tournament_type = 'mixed' ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'player' ORDER BY created_at LIMIT 20`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (tournaments.length < 2 || users.length < 12) {
      throw new Error('Not enough tournaments or users found. Please run previous seeders first.');
    }

    const tournamentTeams = [
      {
        id: uuidv4(),
        tournament_id: tournaments[0].id,
        team_name: 'Guadalajara Thunder',
        captain_id: users[0].id,
        player1_id: users[0].id,
        player2_id: users[1].id,
        player3_id: users[2].id,
        player4_id: users[3].id,
        category: 'Professional',
        skill_level: '4.5',
        age_group: 'Open',
        gender_category: 'open',
        status: 'confirmed',
        seed_position: 1,
        final_rank: 1,
        points_earned: 400,
        matches_won: 6,
        matches_lost: 1,
        games_won: 15,
        games_lost: 8,
        team_logo: 'https://storage.pickleballmexico.com/teams/guadalajara_thunder_logo.png',
        team_colors: JSON.stringify({
          primary: '#1E3A8A',
          secondary: '#F59E0B',
          accent: '#FFFFFF'
        }),
        registration_date: new Date('2024-09-20T10:00:00Z'),
        confirmed_at: new Date('2024-09-20T14:30:00Z'),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        metadata: JSON.stringify({
          team_motto: 'Strike like thunder, play like champions',
          formation_year: 2022,
          home_club: 'Club Deportivo Guadalajara',
          coach_name: 'Roberto Martínez',
          team_achievements: ['State Champions 2023', 'Regional Runners-up 2024']
        }),
        created_at: new Date('2024-09-20T10:00:00Z'),
        updated_at: new Date('2024-12-17T19:30:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[0].id,
        team_name: 'Monterrey Eagles',
        captain_id: users[4].id,
        player1_id: users[4].id,
        player2_id: users[5].id,
        player3_id: users[6].id,
        player4_id: users[7].id,
        category: 'Professional',
        skill_level: '4.0',
        age_group: 'Open',
        gender_category: 'mixed',
        status: 'confirmed',
        seed_position: 3,
        final_rank: 2,
        points_earned: 300,
        matches_won: 5,
        matches_lost: 2,
        games_won: 13,
        games_lost: 10,
        team_logo: 'https://storage.pickleballmexico.com/teams/monterrey_eagles_logo.png',
        team_colors: JSON.stringify({
          primary: '#059669',
          secondary: '#DC2626',
          accent: '#F3F4F6'
        }),
        registration_date: new Date('2024-09-22T15:45:00Z'),
        confirmed_at: new Date('2024-09-22T16:20:00Z'),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        metadata: JSON.stringify({
          team_motto: 'Soar to victory',
          formation_year: 2021,
          home_club: 'Monterrey Pickleball Academy',
          mixed_team: true,
          average_age: 28
        }),
        created_at: new Date('2024-09-22T15:45:00Z'),
        updated_at: new Date('2024-12-17T19:30:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[1].id,
        team_name: 'Querétaro Warriors',
        captain_id: users[8].id,
        player1_id: users[8].id,
        player2_id: users[9].id,
        player3_id: users[10].id,
        player4_id: null,
        category: 'Amateur',
        skill_level: '3.5',
        age_group: '35+',
        gender_category: 'men',
        status: 'confirmed',
        seed_position: 5,
        final_rank: 4,
        points_earned: 150,
        matches_won: 3,
        matches_lost: 2,
        games_won: 8,
        games_lost: 7,
        team_logo: null,
        team_colors: JSON.stringify({
          primary: '#7C2D12',
          secondary: '#FBBF24'
        }),
        registration_date: new Date('2024-10-01T11:15:30Z'),
        confirmed_at: new Date('2024-10-01T13:45:00Z'),
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        metadata: JSON.stringify({
          team_motto: 'Honor and strength',
          formation_year: 2024,
          home_club: 'Centro Recreativo Querétaro',
          veteran_team: true,
          looking_for_fourth_player: true
        }),
        created_at: new Date('2024-10-01T11:15:30Z'),
        updated_at: new Date('2024-10-20T17:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[1].id,
        team_name: 'Cancún Beach Riders',
        captain_id: users[11].id,
        player1_id: users[11].id,
        player2_id: users[12].id,
        player3_id: users[13].id,
        player4_id: users[14].id,
        category: 'Professional',
        skill_level: '5.0',
        age_group: 'Open',
        gender_category: 'mixed',
        status: 'waitlisted',
        seed_position: null,
        final_rank: null,
        points_earned: 0,
        matches_won: 0,
        matches_lost: 0,
        games_won: 0,
        games_lost: 0,
        team_logo: 'https://storage.pickleballmexico.com/teams/cancun_beach_riders_logo.png',
        team_colors: JSON.stringify({
          primary: '#0EA5E9',
          secondary: '#F97316',
          accent: '#FEF3C7'
        }),
        registration_date: new Date('2025-01-30T18:20:15Z'),
        confirmed_at: null,
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        metadata: JSON.stringify({
          team_motto: 'Ride the waves to victory',
          formation_year: 2023,
          home_club: 'Cancún Beach Pickleball Resort',
          international_players: 2,
          waitlist_position: 2,
          vacation_tournament_specialists: true
        }),
        created_at: new Date('2025-01-30T18:20:15Z'),
        updated_at: new Date('2025-01-30T18:20:15Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        tournament_id: tournaments[1].id,
        team_name: 'Puebla Legends',
        captain_id: users[15].id,
        player1_id: users[15].id,
        player2_id: users[16].id,
        player3_id: users[17].id,
        player4_id: users[18].id,
        category: 'Senior',
        skill_level: '3.0',
        age_group: '55+',
        gender_category: 'mixed',
        status: 'cancelled',
        seed_position: null,
        final_rank: null,
        points_earned: 0,
        matches_won: 0,
        matches_lost: 0,
        games_won: 0,
        games_lost: 0,
        team_logo: null,
        team_colors: JSON.stringify({
          primary: '#7C2D12',
          secondary: '#FCD34D'
        }),
        registration_date: new Date('2024-11-05T14:30:45Z'),
        confirmed_at: null,
        cancelled_at: new Date('2024-11-20T10:15:30Z'),
        cancelled_by: users[15].id,
        cancellation_reason: 'Player injury - captain unable to participate due to knee surgery',
        metadata: JSON.stringify({
          team_motto: 'Experience and wisdom',
          formation_year: 2024,
          home_club: 'Puebla Pickleball Club',
          senior_team: true,
          medical_concerns: 'Captain knee surgery scheduled',
          looking_to_reregister: 'Next season'
        }),
        created_at: new Date('2024-11-05T14:30:45Z'),
        updated_at: new Date('2024-11-20T10:15:30Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('tournament_teams', tournamentTeams, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tournament_teams', null, {});
  }
};