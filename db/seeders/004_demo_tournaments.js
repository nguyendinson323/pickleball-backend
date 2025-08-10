/**
 * Seeder: Demo Tournaments
 * 
 * This seeder creates sample tournaments for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const tournaments = [
      // Elite Club Championship
      {
        id: '880e8400-e29b-41d4-a716-446655440001',
        name: 'Elite Club Championship 2024',
        description: 'Annual championship tournament for elite players',
        tournament_type: 'doubles',
        category: 'professional',
        skill_level_min: '4.0',
        skill_level_max: '5.5',
        age_group_min: 18,
        age_group_max: 65,
        gender_category: 'mixed',
        club_id: '660e8400-e29b-41d4-a716-446655440001', // Elite Pickleball Club
        organizer_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        venue_name: 'Elite Pickleball Club',
        venue_address: 'Av. Chapultepec 456, Guadalajara, Jalisco',
        venue_city: 'Guadalajara',
        venue_state: 'Jalisco',
        venue_latitude: 20.6597,
        venue_longitude: -103.3496,
        start_date: new Date(2024, 5, 15, 8, 0, 0), // June 15, 2024
        end_date: new Date(2024, 5, 16, 18, 0, 0), // June 16, 2024
        registration_deadline: new Date(2024, 5, 10, 23, 59, 59), // June 10, 2024
        max_participants: 64,
        current_participants: 48,
        entry_fee: 500.00,
        prize_pool: 10000.00,
        prize_distribution: JSON.stringify({
          first_place: 5000,
          second_place: 3000,
          third_place: 1500,
          fourth_place: 500
        }),
        status: 'registration_open',
        format: 'double_elimination',
        rules: 'Official USAPA rules apply. All matches best of 3 games to 11 points.',
        schedule: JSON.stringify({
          day1: {
            '08:00': 'Check-in and warm-up',
            '09:00': 'Round 1 matches',
            '12:00': 'Lunch break',
            '13:00': 'Round 2 matches',
            '17:00': 'Day 1 concludes'
          },
          day2: {
            '08:00': 'Semi-finals',
            '12:00': 'Lunch break',
            '13:00': 'Finals',
            '16:00': 'Awards ceremony'
          }
        }),
        is_featured: true,
        is_verified: true,
        is_active: true,
        total_revenue: 24000.00,
        total_expenses: 8000.00,
        net_profit: 16000.00,
        created_at: now,
        updated_at: now
      },

      // Community Tournament
      {
        id: '880e8400-e29b-41d4-a716-446655440002',
        name: 'Community Spring Tournament',
        description: 'Fun tournament for all skill levels',
        tournament_type: 'mixed_doubles',
        category: 'recreational',
        skill_level_min: '2.5',
        skill_level_max: '4.0',
        age_group_min: 16,
        age_group_max: 80,
        gender_category: 'mixed',
        club_id: '660e8400-e29b-41d4-a716-446655440002', // Community Pickleball Center
        organizer_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        venue_name: 'Community Pickleball Center',
        venue_address: 'Av. Constitución 567, Monterrey, Nuevo León',
        venue_city: 'Monterrey',
        venue_state: 'Nuevo León',
        venue_latitude: 25.6866,
        venue_longitude: -100.3161,
        start_date: new Date(2024, 3, 20, 9, 0, 0), // April 20, 2024
        end_date: new Date(2024, 3, 20, 17, 0, 0), // April 20, 2024
        registration_deadline: new Date(2024, 3, 15, 23, 59, 59), // April 15, 2024
        max_participants: 32,
        current_participants: 24,
        entry_fee: 100.00,
        prize_pool: 1000.00,
        prize_distribution: JSON.stringify({
          first_place: 500,
          second_place: 300,
          third_place: 200
        }),
        status: 'registration_open',
        format: 'round_robin',
        rules: 'Friendly tournament rules. All skill levels welcome.',
        schedule: JSON.stringify({
          '09:00': 'Check-in and warm-up',
          '10:00': 'Round robin matches begin',
          '12:00': 'Lunch break',
          '13:00': 'Playoff matches',
          '16:00': 'Awards ceremony'
        }),
        is_featured: false,
        is_verified: true,
        is_active: true,
        total_revenue: 2400.00,
        total_expenses: 800.00,
        net_profit: 1600.00,
        created_at: now,
        updated_at: now
      },

      // Youth Tournament
      {
        id: '880e8400-e29b-41d4-a716-446655440003',
        name: 'Youth Pickleball Championship',
        description: 'Tournament for young players under 18',
        tournament_type: 'singles',
        category: 'youth',
        skill_level_min: '2.5',
        skill_level_max: '4.5',
        age_group_min: 12,
        age_group_max: 17,
        gender_category: 'open',
        club_id: '660e8400-e29b-41d4-a716-446655440003', // Tijuana Resort Pickleball Club
        organizer_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        venue_name: 'Tijuana Resort Pickleball Club',
        venue_address: 'Blvd. Agua Caliente 890, Tijuana, Baja California',
        venue_city: 'Tijuana',
        venue_state: 'Baja California',
        venue_latitude: 32.5149,
        venue_longitude: -117.0382,
        start_date: new Date(2024, 7, 10, 8, 0, 0), // August 10, 2024
        end_date: new Date(2024, 7, 11, 16, 0, 0), // August 11, 2024
        registration_deadline: new Date(2024, 7, 5, 23, 59, 59), // August 5, 2024
        max_participants: 48,
        current_participants: 36,
        entry_fee: 75.00,
        prize_pool: 2000.00,
        prize_distribution: JSON.stringify({
          first_place: 1000,
          second_place: 600,
          third_place: 400
        }),
        status: 'published',
        format: 'single_elimination',
        rules: 'Youth tournament rules. Parental consent required.',
        schedule: JSON.stringify({
          day1: {
            '08:00': 'Check-in and warm-up',
            '09:00': 'Preliminary rounds',
            '12:00': 'Lunch break',
            '13:00': 'Quarter-finals',
            '16:00': 'Day 1 concludes'
          },
          day2: {
            '09:00': 'Semi-finals',
            '12:00': 'Lunch break',
            '13:00': 'Finals',
            '15:00': 'Awards ceremony'
          }
        }),
        is_featured: true,
        is_verified: true,
        is_active: true,
        total_revenue: 2700.00,
        total_expenses: 1200.00,
        net_profit: 1500.00,
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('tournaments', tournaments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tournaments', null, {});
  }
}; 