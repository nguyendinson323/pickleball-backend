/**
 * Tournaments Seeder
 * 
 * Seeds the tournaments table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get clubs and organizers (club users) from database
    const clubs = await queryInterface.sequelize.query(
      `SELECT id FROM clubs ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const organizers = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'club' ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (clubs.length < 5 || organizers.length < 5) {
      throw new Error('Not enough clubs or organizers found. Please run previous seeders first.');
    }

    const tournaments = [
      {
        id: uuidv4(),
        name: 'Guadalajara Open 2024',
        description: 'Premier international pickleball tournament featuring professional and amateur divisions. Over $50,000 in prize money across all divisions.',
        tournament_type: 'doubles',
        category: 'professional',
        skill_level_min: '4.0',
        skill_level_max: '5.5',
        age_group_min: 18,
        age_group_max: null,
        gender_category: 'open',
        club_id: clubs[0].id,
        organizer_id: organizers[0].id,
        venue_name: 'Centro Deportivo Guadalajara',
        venue_address: 'Av. Patria 1234, Zapopan, Jalisco',
        venue_city: 'Guadalajara',
        venue_state: 'Jalisco',
        venue_latitude: '20.710481',
        venue_longitude: '-103.410765',
        start_date: new Date('2024-12-15T08:00:00Z'),
        end_date: new Date('2024-12-17T18:00:00Z'),
        registration_deadline: new Date('2024-12-01T23:59:59Z'),
        max_participants: 128,
        current_participants: 96,
        entry_fee: '2500.00',
        prize_pool: '125000.00',
        prize_distribution: JSON.stringify({
          '1st': 30000,
          '2nd': 18000,
          '3rd': 12000,
          '4th': 8000,
          'quarterfinalists': 4500,
          'round_of_16': 2500
        }),
        status: 'registration_open',
        format: 'single_elimination',
        rules: 'Official IPF and USAPA rules apply. Matches are best of 3 games to 11 points, win by 2. Time limit of 45 minutes per match.',
        schedule: JSON.stringify({
          'day1': {
            'morning': ['Round 1: 8:00 AM - 12:00 PM'],
            'afternoon': ['Round 2: 1:00 PM - 5:00 PM']
          },
          'day2': {
            'morning': ['Quarterfinals: 9:00 AM - 1:00 PM'],
            'afternoon': ['Semifinals: 2:00 PM - 6:00 PM']
          },
          'day3': {
            'morning': ['Finals: 10:00 AM - 2:00 PM'],
            'afternoon': ['Awards Ceremony: 3:00 PM']
          }
        }),
        brackets: JSON.stringify({
          'main_draw': {
            'type': 'single_elimination',
            'rounds': 7,
            'participants': 128
          }
        }),
        results: null,
        is_featured: true,
        is_verified: true,
        is_active: true,
        total_revenue: '240000.00',
        total_expenses: '115000.00',
        net_profit: '125000.00',
        metadata: JSON.stringify({
          'sponsors': ['Paddle Pro', 'Mexican Federation', 'Sports Direct'],
          'live_stream': true,
          'international_players': 32,
          'prize_money_currency': 'MXN'
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Monterrey Youth Championship',
        description: 'Annual youth tournament promoting pickleball among young players ages 12-17. Development-focused with coaching clinics included.',
        tournament_type: 'mixed',
        category: 'youth',
        skill_level_min: '2.5',
        skill_level_max: '4.5',
        age_group_min: 12,
        age_group_max: 17,
        gender_category: 'mixed',
        club_id: clubs[1].id,
        organizer_id: organizers[1].id,
        venue_name: 'Monterrey Pickleball Academy',
        venue_address: 'Calle Sierra Madre 567, San Pedro Garza García',
        venue_city: 'Monterrey',
        venue_state: 'Nuevo León',
        venue_latitude: '25.651990',
        venue_longitude: '-100.359719',
        start_date: new Date('2024-11-25T09:00:00Z'),
        end_date: new Date('2024-11-26T17:00:00Z'),
        registration_deadline: new Date('2024-11-15T23:59:59Z'),
        max_participants: 64,
        current_participants: 48,
        entry_fee: '800.00',
        prize_pool: '15000.00',
        prize_distribution: JSON.stringify({
          '1st': 5000,
          '2nd': 3000,
          '3rd': 2000,
          'participation_awards': 5000
        }),
        status: 'registration_open',
        format: 'round_robin',
        rules: 'Modified youth rules: Games to 11 points, win by 2. No time limits. Coaching allowed between points.',
        schedule: JSON.stringify({
          'day1': {
            'morning': ['Registration & Check-in: 9:00 AM', 'Coaching Clinic: 9:30 AM - 11:00 AM'],
            'afternoon': ['Round Robin Pool Play: 11:30 AM - 5:00 PM']
          },
          'day2': {
            'morning': ['Knockout Rounds: 9:00 AM - 1:00 PM'],
            'afternoon': ['Finals & Awards: 2:00 PM - 5:00 PM']
          }
        }),
        brackets: JSON.stringify({
          'pools': 8,
          'pool_size': 8,
          'playoff_format': 'single_elimination'
        }),
        results: null,
        is_featured: false,
        is_verified: true,
        is_active: true,
        total_revenue: '38400.00',
        total_expenses: '23400.00',
        net_profit: '15000.00',
        metadata: JSON.stringify({
          'coaching_clinic_included': true,
          'parent_spectators_welcome': true,
          'equipment_provided': true
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Querétaro Senior Classic',
        description: 'Recreational tournament for senior players 55+. Focus on fun, fitness, and friendship with multiple skill divisions.',
        tournament_type: 'doubles',
        category: 'senior',
        skill_level_min: '2.5',
        skill_level_max: '4.0',
        age_group_min: 55,
        age_group_max: null,
        gender_category: 'open',
        club_id: clubs[2].id,
        organizer_id: organizers[2].id,
        venue_name: 'Centro Recreativo Querétaro',
        venue_address: 'Blvd. Bernardo Quintana 234',
        venue_city: 'Querétaro',
        venue_state: 'Querétaro',
        venue_latitude: '20.593372',
        venue_longitude: '-100.391350',
        start_date: new Date('2024-10-20T10:00:00Z'),
        end_date: new Date('2024-10-20T17:00:00Z'),
        registration_deadline: new Date('2024-10-15T23:59:59Z'),
        max_participants: 32,
        current_participants: 28,
        entry_fee: '400.00',
        prize_pool: '5000.00',
        prize_distribution: JSON.stringify({
          'trophies_medals': 3000,
          'lunch_reception': 2000
        }),
        status: 'registration_closed',
        format: 'round_robin',
        rules: 'Recreational format with extended rest periods. Games to 11, win by 2. 10-minute rest between matches.',
        schedule: JSON.stringify({
          'morning': ['10:00 AM - Check-in & Warm-up', '10:30 AM - Round Robin Phase 1'],
          'afternoon': ['12:30 PM - Lunch Break', '2:00 PM - Round Robin Phase 2', '4:00 PM - Finals & Awards']
        }),
        brackets: JSON.stringify({
          'skill_divisions': ['2.5-3.0', '3.5-4.0'],
          'format': 'round_robin_with_playoffs'
        }),
        results: null,
        is_featured: false,
        is_verified: true,
        is_active: true,
        total_revenue: '11200.00',
        total_expenses: '6200.00',
        net_profit: '5000.00',
        metadata: JSON.stringify({
          'health_screening_required': true,
          'medical_staff_on_site': true,
          'awards_for_all': true
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Cancún Beach Paradise Cup',
        description: 'Luxury beachside tournament combining vacation with competitive pickleball. International field with ocean-view courts.',
        tournament_type: 'mixed_doubles',
        category: 'amateur',
        skill_level_min: '3.5',
        skill_level_max: '5.0',
        age_group_min: 21,
        age_group_max: null,
        gender_category: 'mixed',
        club_id: clubs[3].id,
        organizer_id: organizers[3].id,
        venue_name: 'Cancún Beach Pickleball Resort',
        venue_address: 'Blvd. Kukulcan Km 12.5, Zona Hotelera',
        venue_city: 'Cancún',
        venue_state: 'Quintana Roo',
        venue_latitude: '21.105925',
        venue_longitude: '-86.764016',
        start_date: new Date('2025-02-14T08:00:00Z'),
        end_date: new Date('2025-02-16T19:00:00Z'),
        registration_deadline: new Date('2025-01-31T23:59:59Z'),
        max_participants: 96,
        current_participants: 24,
        entry_fee: '4500.00',
        prize_pool: '85000.00',
        prize_distribution: JSON.stringify({
          '1st': 25000,
          '2nd': 15000,
          '3rd': 10000,
          'quarterfinals': 6000,
          'consolation_prizes': 29000
        }),
        status: 'published',
        format: 'double_elimination',
        rules: 'International rules. Best of 3 games to 11 points. Dress code: Resort casual. Sunset matches allowed.',
        schedule: JSON.stringify({
          'day1': {
            'morning': ['8:00 AM - Registration & Beach Breakfast'],
            'afternoon': ['10:00 AM - Opening Ceremony', '11:00 AM - First Round Matches'],
            'evening': ['7:00 PM - Welcome Reception']
          },
          'day2': {
            'full_day': 'Tournament Matches 9:00 AM - 6:00 PM',
            'evening': ['8:00 PM - Beachside Dinner & Entertainment']
          },
          'day3': {
            'morning': ['9:00 AM - Semifinal Matches'],
            'afternoon': ['3:00 PM - Finals', '5:00 PM - Awards Ceremony'],
            'evening': ['7:00 PM - Farewell Dinner']
          }
        }),
        brackets: JSON.stringify({
          'main_draw': 'double_elimination',
          'consolation_draw': 'single_elimination',
          'special_events': ['Skills Competition', 'Beach Volleyball Mixer']
        }),
        results: null,
        is_featured: true,
        is_verified: true,
        is_active: true,
        total_revenue: '108000.00',
        total_expenses: '23000.00',
        net_profit: '85000.00',
        metadata: JSON.stringify({
          'resort_packages_available': true,
          'international_participants_expected': 40,
          'live_streaming': true,
          'photographer_included': true
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Puebla State Championship',
        description: 'Official state championship qualifying tournament for national competition. All skill levels welcome with separate divisions.',
        tournament_type: 'singles',
        category: 'amateur',
        skill_level_min: '2.5',
        skill_level_max: '5.5',
        age_group_min: 16,
        age_group_max: null,
        gender_category: 'open',
        club_id: clubs[4].id,
        organizer_id: organizers[4].id,
        venue_name: 'Puebla Pickleball Club',
        venue_address: 'Av. Juárez 1890, Centro Histórico',
        venue_city: 'Puebla',
        venue_state: 'Puebla',
        venue_latitude: '19.042701',
        venue_longitude: '-98.198727',
        start_date: new Date('2024-12-07T08:30:00Z'),
        end_date: new Date('2024-12-08T18:00:00Z'),
        registration_deadline: new Date('2024-11-30T23:59:59Z'),
        max_participants: 80,
        current_participants: 67,
        entry_fee: '1200.00',
        prize_pool: '35000.00',
        prize_distribution: JSON.stringify({
          'men_open': {
            '1st': 8000,
            '2nd': 5000,
            '3rd': 3000
          },
          'women_open': {
            '1st': 8000,
            '2nd': 5000,
            '3rd': 3000
          },
          'skill_divisions': 8000
        }),
        status: 'registration_open',
        format: 'single_elimination',
        rules: 'Official Mexican Pickleball Federation rules. Singles matches best of 3 games to 11 points, win by 2.',
        schedule: JSON.stringify({
          'day1': {
            'morning': ['8:30 AM - Player Check-in', '9:30 AM - First Round'],
            'afternoon': ['1:00 PM - Second Round', '4:00 PM - Round of 16']
          },
          'day2': {
            'morning': ['9:00 AM - Quarterfinals'],
            'afternoon': ['1:00 PM - Semifinals', '4:00 PM - Finals', '6:00 PM - Awards']
          }
        }),
        brackets: JSON.stringify({
          'divisions': {
            'men_open': 20,
            'women_open': 18,
            'men_3.5': 12,
            'women_3.5': 10,
            'men_4.0+': 15,
            'women_4.0+': 12
          }
        }),
        results: null,
        is_featured: false,
        is_verified: true,
        is_active: true,
        total_revenue: '80400.00',
        total_expenses: '45400.00',
        net_profit: '35000.00',
        metadata: JSON.stringify({
          'state_championship_qualifier': true,
          'ranking_points_awarded': true,
          'drug_testing': false,
          'referee_certification_required': true
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('tournaments', tournaments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tournaments', null, {});
  }
};