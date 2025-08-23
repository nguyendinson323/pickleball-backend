/**
 * Tournament Team Members Seeder
 * 
 * Seeds the tournament_team_members table with sample data
 * Creates relationships between tournament teams and users
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get first tournament team and users for relationships
    const [tournamentTeams, users] = await Promise.all([
      queryInterface.sequelize.query(
        `SELECT id FROM tournament_teams ORDER BY created_at LIMIT 2`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      ),
      queryInterface.sequelize.query(
        `SELECT id FROM users WHERE user_type = 'player' ORDER BY created_at LIMIT 5`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      )
    ]);

    if (tournamentTeams.length < 2 || users.length < 5) {
      throw new Error('Not enough tournament teams or users found. Please run previous seeders first.');
    }

    const tournamentTeamMembers = [
      {
        id: uuidv4(),
        team_id: tournamentTeams[0].id,
        user_id: users[0].id,
        role: 'captain',
        joined_at: new Date('2024-09-15T10:00:00Z'),
        is_active: true,
        created_at: new Date('2024-09-15T10:00:00Z'),
        updated_at: new Date('2024-12-17T19:30:00Z')
      },
      {
        id: uuidv4(),
        team_id: tournamentTeams[0].id,
        user_id: users[1].id,
        role: 'player',
        joined_at: new Date('2024-09-16T11:30:00Z'),
        is_active: true,
        created_at: new Date('2024-09-16T11:30:00Z'),
        updated_at: new Date('2024-12-17T19:30:00Z')
      },
      {
        id: uuidv4(),
        team_id: tournamentTeams[0].id,
        user_id: users[2].id,
        role: 'substitute',
        joined_at: new Date('2024-10-05T14:15:00Z'),
        is_active: true,
        created_at: new Date('2024-10-05T14:15:00Z'),
        updated_at: new Date('2024-12-17T19:30:00Z')
      },
      {
        id: uuidv4(),
        team_id: tournamentTeams[1].id,
        user_id: users[3].id,
        role: 'captain',
        joined_at: new Date('2024-09-20T09:45:00Z'),
        is_active: true,
        created_at: new Date('2024-09-20T09:45:00Z'),
        updated_at: new Date('2024-12-17T19:30:00Z')
      },
      {
        id: uuidv4(),
        team_id: tournamentTeams[1].id,
        user_id: users[4].id,
        role: 'player',
        joined_at: new Date('2024-09-22T16:20:00Z'),
        is_active: false,
        created_at: new Date('2024-09-22T16:20:00Z'),
        updated_at: new Date('2024-11-10T12:30:00Z')
      }
    ];

    await queryInterface.bulkInsert('tournament_team_members', tournamentTeamMembers, {});
    console.log('✅ Successfully seeded 5 tournament team members');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tournament_team_members', null, {});
    console.log('🗑️ All seeded tournament team members have been removed');
  }
};