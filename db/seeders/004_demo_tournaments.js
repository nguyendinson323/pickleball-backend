/**
 * Seeder: Demo Tournaments
 * 
 * This seeder creates sample tournaments for testing and development.
 * Includes tournaments of different types, categories, and statuses.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const tournaments = [
      // Guadalajara Tournaments
      {
        id: '880e8400-e29b-41d4-a716-446655440001',
        name: 'Guadalajara Open 2024',
        description: 'Annual open tournament featuring the best players from Jalisco and surrounding states. Cash prizes and ranking points available.',
        tournament_type: 'doubles',
        category: 'amateur',
        skill_level_min: '3.5',
        skill_level_max: '5.5',
        age_group_min: 18,
        age_group_max: 65,
        gender_category: 'open',
        club_id: '660e8400-e29b-41d4-a716-446655440001',
        organizer_id: '550e8400-e29b-41d4-a716-446655440004',
        venue_name: 'Pickleball Guadalajara Club',
        venue_address: 'Av. Chapultepec 123, Col. Americana, Guadalajara, Jalisco',
        venue_city: 'Guadalajara',
        venue_state: 'Jalisco',
        venue_latitude: 20.6597,
        venue_longitude: -103.3496,
        start_date: new Date(2024, 5, 15, 8, 0, 0),
        end_date: new Date(2024, 5, 16, 18, 0, 0),
        registration_deadline: new Date(2024, 5, 10, 23, 59, 59),
        max_participants: 64,
        current_participants: 48,
        entry_fee: 800.00,
        prize_pool: 25000.00,
        prize_distribution: {
          first: 10000,
          second: 6000,
          third: 4000,
          fourth: 2500,
          fifth: 1500,
          sixth: 1000
        },
        status: 'registration_open',
        format: 'double_elimination',
        rules: 'Official USAPA rules apply. All matches best of 3 games to 11 points.',
        schedule: {
          day1: {
            '08:00': 'Check-in and warm-up',
            '09:00': 'Round 1 matches',
            '12:00': 'Lunch break',
            '13:00': 'Round 2 matches',
            '17:00': 'Day 1 concludes'
          },
          day2: {
            '08:00': 'Check-in and warm-up',
            '09:00': 'Quarterfinals',
            '12:00': 'Lunch break',
            '13:00': 'Semifinals',
            '15:00': 'Finals',
            '17:00': 'Awards ceremony'
          }
        },
        is_featured: true,
        is_verified: true,
        is_active: true,
        total_revenue: 38400.00,
        total_expenses: 15000.00,
        net_profit: 23400.00,
        created_at: now,
        updated_at: now
      },

      {
        id: '880e8400-e29b-41d4-a716-446655440002',
        name: 'Jalisco Mixed Doubles Championship',
        description: 'Mixed doubles tournament for players of all skill levels. Great opportunity for beginners to compete.',
        tournament_type: 'mixed_doubles',
        category: 'recreational',
        skill_level_min: '2.5',
        skill_level_max: '4.5',
        age_group_min: 16,
        age_group_max: 70,
        gender_category: 'mixed',
        club_id: '660e8400-e29b-41d4-a716-446655440001',
        organizer_id: '550e8400-e29b-41d4-a716-446655440004',
        venue_name: 'Pickleball Guadalajara Club',
        venue_address: 'Av. Chapultepec 123, Col. Americana, Guadalajara, Jalisco',
        venue_city: 'Guadalajara',
        venue_state: 'Jalisco',
        venue_latitude: 20.6597,
        venue_longitude: -103.3496,
        start_date: new Date(2024, 6, 20, 9, 0, 0),
        end_date: new Date(2024, 6, 20, 17, 0, 0),
        registration_deadline: new Date(2024, 6, 15, 23, 59, 59),
        max_participants: 32,
        current_participants: 24,
        entry_fee: 400.00,
        prize_pool: 8000.00,
        prize_distribution: {
          first: 3000,
          second: 2000,
          third: 1500,
          fourth: 1000,
          fifth: 500
        },
        status: 'registration_open',
        format: 'round_robin',
        rules: 'Friendly tournament with modified rules for beginners. All skill levels welcome.',
        schedule: {
          day1: {
            '09:00': 'Check-in and warm-up',
            '10:00': 'Round robin matches',
            '12:00': 'Lunch break',
            '13:00': 'Playoff matches',
            '16:00': 'Finals',
            '17:00': 'Awards ceremony'
          }
        },
        is_featured: false,
        is_verified: true,
        is_active: true,
        total_revenue: 9600.00,
        total_expenses: 4000.00,
        net_profit: 5600.00,
        created_at: now,
        updated_at: now
      },

      // Monterrey Tournaments
      {
        id: '880e8400-e29b-41d4-a716-446655440003',
        name: 'Monterrey Pro-Am Challenge',
        description: 'Professional-amateur tournament featuring top players from Northern Mexico.',
        tournament_type: 'doubles',
        category: 'professional',
        skill_level_min: '4.0',
        skill_level_max: '5.5',
        age_group_min: 18,
        age_group_max: 60,
        gender_category: 'open',
        club_id: '660e8400-e29b-41d4-a716-446655440004',
        organizer_id: '550e8400-e29b-41d4-a716-446655440005',
        venue_name: 'Pickleball Monterrey Club',
        venue_address: 'Av. San Pedro 456, Col. Valle del Campestre, Monterrey, NL',
        venue_city: 'Monterrey',
        venue_state: 'Nuevo León',
        venue_latitude: 25.6866,
        venue_longitude: -100.3161,
        start_date: new Date(2024, 7, 10, 8, 0, 0),
        end_date: new Date(2024, 7, 12, 18, 0, 0),
        registration_deadline: new Date(2024, 7, 5, 23, 59, 59),
        max_participants: 48,
        current_participants: 36,
        entry_fee: 1200.00,
        prize_pool: 40000.00,
        prize_distribution: {
          first: 15000,
          second: 9000,
          third: 6000,
          fourth: 4000,
          fifth: 2500,
          sixth: 1500,
          seventh: 1000,
          eighth: 500
        },
        status: 'registration_open',
        format: 'single_elimination',
        rules: 'Professional tournament with strict USAPA rules. Video review available for disputed calls.',
        schedule: {
          day1: {
            '08:00': 'Check-in and warm-up',
            '09:00': 'Qualifying rounds',
            '12:00': 'Lunch break',
            '13:00': 'Main draw round 1',
            '17:00': 'Day 1 concludes'
          },
          day2: {
            '08:00': 'Check-in and warm-up',
            '09:00': 'Round of 16',
            '12:00': 'Lunch break',
            '13:00': 'Quarterfinals',
            '17:00': 'Day 2 concludes'
          },
          day3: {
            '08:00': 'Check-in and warm-up',
            '09:00': 'Semifinals',
            '12:00': 'Lunch break',
            '13:00': 'Finals',
            '15:00': 'Awards ceremony'
          }
        },
        is_featured: true,
        is_verified: true,
        is_active: true,
        total_revenue: 43200.00,
        total_expenses: 20000.00,
        net_profit: 23200.00,
        created_at: now,
        updated_at: now
      },

      {
        id: '880e8400-e29b-41d4-a716-446655440004',
        name: 'Nuevo León Youth Championship',
        description: 'Youth tournament for players under 18. Great opportunity for young talent to showcase their skills.',
        tournament_type: 'singles',
        category: 'youth',
        skill_level_min: '2.5',
        skill_level_max: '4.5',
        age_group_min: 12,
        age_group_max: 17,
        gender_category: 'open',
        club_id: '660e8400-e29b-41d4-a716-446655440004',
        organizer_id: '550e8400-e29b-41d4-a716-446655440005',
        venue_name: 'Pickleball Monterrey Club',
        venue_address: 'Av. San Pedro 456, Col. Valle del Campestre, Monterrey, NL',
        venue_city: 'Monterrey',
        venue_state: 'Nuevo León',
        venue_latitude: 25.6866,
        venue_longitude: -100.3161,
        start_date: new Date(2024, 8, 5, 9, 0, 0),
        end_date: new Date(2024, 8, 5, 16, 0, 0),
        registration_deadline: new Date(2024, 8, 1, 23, 59, 59),
        max_participants: 24,
        current_participants: 18,
        entry_fee: 200.00,
        prize_pool: 3000.00,
        prize_distribution: {
          first: 1000,
          second: 600,
          third: 400,
          fourth: 300,
          fifth: 200,
          sixth: 100,
          seventh: 200,
          eighth: 200
        },
        status: 'registration_open',
        format: 'round_robin',
        rules: 'Youth-friendly tournament with modified rules. Parents welcome to watch.',
        schedule: {
          day1: {
            '09:00': 'Check-in and warm-up',
            '10:00': 'Round robin matches',
            '12:00': 'Lunch break',
            '13:00': 'Playoff matches',
            '15:00': 'Finals',
            '16:00': 'Awards ceremony'
          }
        },
        is_featured: false,
        is_verified: true,
        is_active: true,
        total_revenue: 3600.00,
        total_expenses: 1500.00,
        net_profit: 2100.00,
        created_at: now,
        updated_at: now
      },

      // Tijuana Tournaments
      {
        id: '880e8400-e29b-41d4-a716-446655440005',
        name: 'Tijuana Border Challenge',
        description: 'Cross-border tournament featuring players from Tijuana and San Diego.',
        tournament_type: 'doubles',
        category: 'amateur',
        skill_level_min: '3.0',
        skill_level_max: '5.0',
        age_group_min: 18,
        age_group_max: 65,
        gender_category: 'open',
        club_id: '660e8400-e29b-41d4-a716-446655440007',
        organizer_id: '550e8400-e29b-41d4-a716-446655440006',
        venue_name: 'Pickleball Tijuana Club',
        venue_address: 'Blvd. Díaz Ordaz 789, Col. Centro, Tijuana, BC',
        venue_city: 'Tijuana',
        venue_state: 'Baja California',
        venue_latitude: 32.5149,
        venue_longitude: -117.0382,
        start_date: new Date(2024, 9, 15, 8, 0, 0),
        end_date: new Date(2024, 9, 16, 18, 0, 0),
        registration_deadline: new Date(2024, 9, 10, 23, 59, 59),
        max_participants: 56,
        current_participants: 42,
        entry_fee: 600.00,
        prize_pool: 15000.00,
        prize_distribution: {
          first: 6000,
          second: 3500,
          third: 2500,
          fourth: 1500,
          fifth: 1000,
          sixth: 500
        },
        status: 'registration_open',
        format: 'double_elimination',
        rules: 'International tournament with bilingual referees. USAPA rules apply.',
        schedule: {
          day1: {
            '08:00': 'Check-in and warm-up',
            '09:00': 'Round 1 matches',
            '12:00': 'Lunch break',
            '13:00': 'Round 2 matches',
            '17:00': 'Day 1 concludes'
          },
          day2: {
            '08:00': 'Check-in and warm-up',
            '09:00': 'Quarterfinals',
            '12:00': 'Lunch break',
            '13:00': 'Semifinals',
            '15:00': 'Finals',
            '17:00': 'Awards ceremony'
          }
        },
        is_featured: true,
        is_verified: true,
        is_active: true,
        total_revenue: 25200.00,
        total_expenses: 12000.00,
        net_profit: 13200.00,
        created_at: now,
        updated_at: now
      },

      {
        id: '880e8400-e29b-41d4-a716-446655440006',
        name: 'Baja California Women\'s Championship',
        description: 'Women\'s doubles tournament celebrating female pickleball players.',
        tournament_type: 'doubles',
        category: 'amateur',
        skill_level_min: '3.0',
        skill_level_max: '4.5',
        age_group_min: 18,
        age_group_max: 70,
        gender_category: 'women',
        club_id: '660e8400-e29b-41d4-a716-446655440007',
        organizer_id: '550e8400-e29b-41d4-a716-446655440006',
        venue_name: 'Pickleball Tijuana Club',
        venue_address: 'Blvd. Díaz Ordaz 789, Col. Centro, Tijuana, BC',
        venue_city: 'Tijuana',
        venue_state: 'Baja California',
        venue_latitude: 32.5149,
        venue_longitude: -117.0382,
        start_date: new Date(2024, 10, 10, 9, 0, 0),
        end_date: new Date(2024, 10, 10, 17, 0, 0),
        registration_deadline: new Date(2024, 10, 5, 23, 59, 59),
        max_participants: 32,
        current_participants: 28,
        entry_fee: 500.00,
        prize_pool: 8000.00,
        prize_distribution: {
          first: 3000,
          second: 2000,
          third: 1500,
          fourth: 1000,
          fifth: 500
        },
        status: 'registration_open',
        format: 'round_robin',
        rules: 'Women\'s tournament with supportive atmosphere. All skill levels welcome.',
        schedule: {
          day1: {
            '09:00': 'Check-in and warm-up',
            '10:00': 'Round robin matches',
            '12:00': 'Lunch break',
            '13:00': 'Playoff matches',
            '16:00': 'Finals',
            '17:00': 'Awards ceremony'
          }
        },
        is_featured: false,
        is_verified: true,
        is_active: true,
        total_revenue: 14000.00,
        total_expenses: 6000.00,
        net_profit: 8000.00,
        created_at: now,
        updated_at: now
      },

      // Completed Tournaments
      {
        id: '880e8400-e29b-41d4-a716-446655440007',
        name: 'Spring Championship 2024',
        description: 'Spring championship tournament that was completed successfully.',
        tournament_type: 'doubles',
        category: 'amateur',
        skill_level_min: '3.5',
        skill_level_max: '5.0',
        age_group_min: 18,
        age_group_max: 65,
        gender_category: 'open',
        club_id: '660e8400-e29b-41d4-a716-446655440001',
        organizer_id: '550e8400-e29b-41d4-a716-446655440004',
        venue_name: 'Pickleball Guadalajara Club',
        venue_address: 'Av. Chapultepec 123, Col. Americana, Guadalajara, Jalisco',
        venue_city: 'Guadalajara',
        venue_state: 'Jalisco',
        venue_latitude: 20.6597,
        venue_longitude: -103.3496,
        start_date: new Date(2024, 2, 15, 8, 0, 0),
        end_date: new Date(2024, 2, 16, 18, 0, 0),
        registration_deadline: new Date(2024, 2, 10, 23, 59, 59),
        max_participants: 48,
        current_participants: 48,
        entry_fee: 600.00,
        prize_pool: 12000.00,
        prize_distribution: {
          first: 5000,
          second: 3000,
          third: 2000,
          fourth: 1200,
          fifth: 800
        },
        status: 'completed',
        format: 'single_elimination',
        rules: 'Standard tournament rules with USAPA guidelines.',
        results: {
          winner: 'Team Alpha',
          runner_up: 'Team Beta',
          third_place: 'Team Gamma',
          total_matches: 47,
          total_participants: 48
        },
        is_featured: false,
        is_verified: true,
        is_active: true,
        total_revenue: 28800.00,
        total_expenses: 15000.00,
        net_profit: 13800.00,
        created_at: now,
        updated_at: now
      },

      // Draft Tournaments
      {
        id: '880e8400-e29b-41d4-a716-446655440008',
        name: 'Winter Classic 2025',
        description: 'Winter classic tournament in planning phase.',
        tournament_type: 'singles',
        category: 'amateur',
        skill_level_min: '3.0',
        skill_level_max: '4.5',
        age_group_min: 18,
        age_group_max: 65,
        gender_category: 'open',
        club_id: '660e8400-e29b-41d4-a716-446655440004',
        organizer_id: '550e8400-e29b-41d4-a716-446655440005',
        venue_name: 'Pickleball Monterrey Club',
        venue_address: 'Av. San Pedro 456, Col. Valle del Campestre, Monterrey, NL',
        venue_city: 'Monterrey',
        venue_state: 'Nuevo León',
        venue_latitude: 25.6866,
        venue_longitude: -100.3161,
        start_date: new Date(2025, 0, 20, 9, 0, 0),
        end_date: new Date(2025, 0, 20, 17, 0, 0),
        registration_deadline: new Date(2025, 0, 15, 23, 59, 59),
        max_participants: 32,
        current_participants: 0,
        entry_fee: 400.00,
        prize_pool: 6000.00,
        prize_distribution: {
          first: 2500,
          second: 1500,
          third: 1000,
          fourth: 500,
          fifth: 500
        },
        status: 'draft',
        format: 'single_elimination',
        rules: 'Standard tournament rules. Registration opening soon.',
        is_featured: false,
        is_verified: false,
        is_active: true,
        total_revenue: 0.00,
        total_expenses: 0.00,
        net_profit: 0.00,
        created_at: now,
        updated_at: now
      },

      // Senior Tournaments
      {
        id: '880e8400-e29b-41d4-a716-446655440009',
        name: 'Senior Masters Championship',
        description: 'Tournament for senior players 50+ years old.',
        tournament_type: 'doubles',
        category: 'senior',
        skill_level_min: '3.0',
        skill_level_max: '4.5',
        age_group_min: 50,
        age_group_max: 80,
        gender_category: 'open',
        club_id: '660e8400-e29b-41d4-a716-446655440002',
        organizer_id: '550e8400-e29b-41d4-a716-446655440004',
        venue_name: 'Club Deportivo Vallarta',
        venue_address: 'Av. Vallarta 456, Col. Providencia, Guadalajara, Jalisco',
        venue_city: 'Guadalajara',
        venue_state: 'Jalisco',
        venue_latitude: 20.6597,
        venue_longitude: -103.3496,
        start_date: new Date(2024, 11, 5, 9, 0, 0),
        end_date: new Date(2024, 11, 5, 17, 0, 0),
        registration_deadline: new Date(2024, 11, 1, 23, 59, 59),
        max_participants: 24,
        current_participants: 16,
        entry_fee: 300.00,
        prize_pool: 4000.00,
        prize_distribution: {
          first: 1500,
          second: 1000,
          third: 750,
          fourth: 500,
          fifth: 250
        },
        status: 'registration_open',
        format: 'round_robin',
        rules: 'Senior-friendly tournament with modified rules and longer breaks.',
        schedule: {
          day1: {
            '09:00': 'Check-in and warm-up',
            '10:00': 'Round robin matches',
            '12:00': 'Lunch break',
            '13:30': 'Playoff matches',
            '16:00': 'Finals',
            '17:00': 'Awards ceremony'
          }
        },
        is_featured: false,
        is_verified: true,
        is_active: true,
        total_revenue: 4800.00,
        total_expenses: 2000.00,
        net_profit: 2800.00,
        created_at: now,
        updated_at: now
      },

      // Cancelled Tournament
      {
        id: '880e8400-e29b-41d4-a716-446655440010',
        name: 'Summer Heat Tournament',
        description: 'Summer tournament that was cancelled due to weather conditions.',
        tournament_type: 'doubles',
        category: 'amateur',
        skill_level_min: '3.0',
        skill_level_max: '4.5',
        age_group_min: 18,
        age_group_max: 65,
        gender_category: 'open',
        club_id: '660e8400-e29b-41d4-a716-446655440007',
        organizer_id: '550e8400-e29b-41d4-a716-446655440006',
        venue_name: 'Pickleball Tijuana Club',
        venue_address: 'Blvd. Díaz Ordaz 789, Col. Centro, Tijuana, BC',
        venue_city: 'Tijuana',
        venue_state: 'Baja California',
        venue_latitude: 32.5149,
        venue_longitude: -117.0382,
        start_date: new Date(2024, 6, 15, 8, 0, 0),
        end_date: new Date(2024, 6, 16, 18, 0, 0),
        registration_deadline: new Date(2024, 6, 10, 23, 59, 59),
        max_participants: 40,
        current_participants: 25,
        entry_fee: 500.00,
        prize_pool: 8000.00,
        prize_distribution: {
          first: 3000,
          second: 2000,
          third: 1500,
          fourth: 1000,
          fifth: 500
        },
        status: 'cancelled',
        format: 'double_elimination',
        rules: 'Tournament cancelled due to extreme weather conditions.',
        is_featured: false,
        is_verified: true,
        is_active: false,
        total_revenue: 12500.00,
        total_expenses: 8000.00,
        net_profit: 4500.00,
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