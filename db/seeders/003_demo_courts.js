/**
 * Seeder: Demo Courts
 * 
 * This seeder creates sample courts for testing and development.
 * Includes courts from different clubs with various types and surfaces.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const courts = [
      // Pickleball Guadalajara Club Courts
      {
        id: '770e8400-e29b-41d4-a716-446655440001',
        name: 'Court 1 - Indoor Premium',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Premium indoor court with professional lighting and climate control',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440001',
        court_number: 1,
        hourly_rate: 250.00,
        member_rate: 200.00,
        is_available: true,
        is_maintenance: false,
        is_featured: true,
        is_active: true,
        rating: 4.9,
        review_count: 25,
        total_hours: 120.5,
        used_hours: 98.2,
        total_bookings: 45,
        total_revenue: 24500.00,
        average_rating: 4.9,
        amenities: ['lighting', 'climate_control', 'scoreboard', 'seating'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-15',
          next_maintenance: '2024-04-15',
          maintenance_notes: 'Regular surface inspection and cleaning'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '770e8400-e29b-41d4-a716-446655440002',
        name: 'Court 2 - Indoor Standard',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Standard indoor court with good lighting',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440001',
        court_number: 2,
        hourly_rate: 200.00,
        member_rate: 160.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.7,
        review_count: 18,
        total_hours: 95.3,
        used_hours: 78.1,
        total_bookings: 38,
        total_revenue: 19500.00,
        average_rating: 4.7,
        amenities: ['lighting', 'scoreboard'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-10',
          next_maintenance: '2024-04-10',
          maintenance_notes: 'Surface cleaning and line repainting'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '770e8400-e29b-41d4-a716-446655440003',
        name: 'Court 3 - Indoor Tournament',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Tournament-grade court with professional equipment',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440001',
        court_number: 3,
        hourly_rate: 300.00,
        member_rate: 240.00,
        is_available: true,
        is_maintenance: false,
        is_featured: true,
        is_active: true,
        rating: 5.0,
        review_count: 32,
        total_hours: 85.7,
        used_hours: 72.3,
        total_bookings: 28,
        total_revenue: 21600.00,
        average_rating: 5.0,
        amenities: ['lighting', 'climate_control', 'scoreboard', 'seating', 'streaming_equipment'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-20',
          next_maintenance: '2024-04-20',
          maintenance_notes: 'Professional surface treatment and equipment calibration'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '770e8400-e29b-41d4-a716-446655440004',
        name: 'Court 4 - Indoor Practice',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Practice court for lessons and training',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440001',
        court_number: 4,
        hourly_rate: 150.00,
        member_rate: 120.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.5,
        review_count: 12,
        total_hours: 110.2,
        used_hours: 89.7,
        total_bookings: 52,
        total_revenue: 16500.00,
        average_rating: 4.5,
        amenities: ['lighting', 'training_equipment'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-05',
          next_maintenance: '2024-04-05',
          maintenance_notes: 'Regular cleaning and equipment check'
        },
        created_at: now,
        updated_at: now
      },

      // Club Deportivo Vallarta Courts
      {
        id: '770e8400-e29b-41d4-a716-446655440005',
        name: 'Court 1 - Outdoor Covered',
        court_type: 'covered',
        surface: 'concrete',
        description: 'Covered outdoor court with protection from weather',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440002',
        court_number: 1,
        hourly_rate: 180.00,
        member_rate: 144.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.6,
        review_count: 15,
        total_hours: 88.4,
        used_hours: 71.2,
        total_bookings: 35,
        total_revenue: 15840.00,
        average_rating: 4.6,
        amenities: ['lighting', 'scoreboard', 'shade'],
        operating_hours: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '21:00' },
          saturday: { open: '08:00', close: '19:00' },
          sunday: { open: '08:00', close: '17:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-12',
          next_maintenance: '2024-04-12',
          maintenance_notes: 'Surface cleaning and line repainting'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '770e8400-e29b-41d4-a716-446655440006',
        name: 'Court 2 - Outdoor Standard',
        court_type: 'outdoor',
        surface: 'concrete',
        description: 'Standard outdoor court with good drainage',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440002',
        court_number: 2,
        hourly_rate: 150.00,
        member_rate: 120.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.3,
        review_count: 10,
        total_hours: 92.1,
        used_hours: 75.8,
        total_bookings: 42,
        total_revenue: 13815.00,
        average_rating: 4.3,
        amenities: ['lighting'],
        operating_hours: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '21:00' },
          saturday: { open: '08:00', close: '19:00' },
          sunday: { open: '08:00', close: '17:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-08',
          next_maintenance: '2024-04-08',
          maintenance_notes: 'Surface cleaning and drainage check'
        },
        created_at: now,
        updated_at: now
      },

      // Pickleball Monterrey Club Courts
      {
        id: '770e8400-e29b-41d4-a716-446655440007',
        name: 'Court 1 - Premium Indoor',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Premium indoor court with professional lighting and climate control',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440004',
        court_number: 1,
        hourly_rate: 280.00,
        member_rate: 224.00,
        is_available: true,
        is_maintenance: false,
        is_featured: true,
        is_active: true,
        rating: 4.9,
        review_count: 28,
        total_hours: 105.6,
        used_hours: 87.3,
        total_bookings: 41,
        total_revenue: 29568.00,
        average_rating: 4.9,
        amenities: ['lighting', 'climate_control', 'scoreboard', 'seating'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-18',
          next_maintenance: '2024-04-18',
          maintenance_notes: 'Professional surface treatment and equipment maintenance'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '770e8400-e29b-41d4-a716-446655440008',
        name: 'Court 2 - Standard Indoor',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Standard indoor court with good lighting',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440004',
        court_number: 2,
        hourly_rate: 220.00,
        member_rate: 176.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.7,
        review_count: 22,
        total_hours: 98.7,
        used_hours: 81.5,
        total_bookings: 38,
        total_revenue: 21714.00,
        average_rating: 4.7,
        amenities: ['lighting', 'scoreboard'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-14',
          next_maintenance: '2024-04-14',
          maintenance_notes: 'Surface cleaning and line repainting'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '770e8400-e29b-41d4-a716-446655440009',
        name: 'Court 3 - Tournament Indoor',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Tournament-grade court with professional equipment',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440004',
        court_number: 3,
        hourly_rate: 320.00,
        member_rate: 256.00,
        is_available: true,
        is_maintenance: false,
        is_featured: true,
        is_active: true,
        rating: 5.0,
        review_count: 35,
        total_hours: 82.3,
        used_hours: 68.9,
        total_bookings: 25,
        total_revenue: 26336.00,
        average_rating: 5.0,
        amenities: ['lighting', 'climate_control', 'scoreboard', 'seating', 'streaming_equipment'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-22',
          next_maintenance: '2024-04-22',
          maintenance_notes: 'Professional surface treatment and equipment calibration'
        },
        created_at: now,
        updated_at: now
      },

      // Pickleball Tijuana Club Courts
      {
        id: '770e8400-e29b-41d4-a716-446655440010',
        name: 'Court 1 - Indoor Premium',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Premium indoor court with professional lighting',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440007',
        court_number: 1,
        hourly_rate: 240.00,
        member_rate: 192.00,
        is_available: true,
        is_maintenance: false,
        is_featured: true,
        is_active: true,
        rating: 4.8,
        review_count: 26,
        total_hours: 96.8,
        used_hours: 79.2,
        total_bookings: 39,
        total_revenue: 23232.00,
        average_rating: 4.8,
        amenities: ['lighting', 'climate_control', 'scoreboard', 'seating'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-16',
          next_maintenance: '2024-04-16',
          maintenance_notes: 'Professional surface treatment and equipment maintenance'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '770e8400-e29b-41d4-a716-446655440011',
        name: 'Court 2 - Standard Indoor',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Standard indoor court with good lighting',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440007',
        court_number: 2,
        hourly_rate: 200.00,
        member_rate: 160.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.6,
        review_count: 20,
        total_hours: 89.4,
        used_hours: 73.1,
        total_bookings: 36,
        total_revenue: 17880.00,
        average_rating: 4.6,
        amenities: ['lighting', 'scoreboard'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-11',
          next_maintenance: '2024-04-11',
          maintenance_notes: 'Surface cleaning and line repainting'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '770e8400-e29b-41d4-a716-446655440012',
        name: 'Court 3 - Practice Indoor',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Practice court for lessons and training',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440007',
        court_number: 3,
        hourly_rate: 160.00,
        member_rate: 128.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.4,
        review_count: 14,
        total_hours: 102.7,
        used_hours: 85.3,
        total_bookings: 48,
        total_revenue: 16432.00,
        average_rating: 4.4,
        amenities: ['lighting', 'training_equipment'],
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-07',
          next_maintenance: '2024-04-07',
          maintenance_notes: 'Regular cleaning and equipment check'
        },
        created_at: now,
        updated_at: now
      },

      // Additional Courts
      {
        id: '770e8400-e29b-41d4-a716-446655440013',
        name: 'Court 1 - Outdoor Community',
        court_type: 'outdoor',
        surface: 'asphalt',
        description: 'Community outdoor court with basic amenities',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440003',
        court_number: 1,
        hourly_rate: 80.00,
        member_rate: 64.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.2,
        review_count: 8,
        total_hours: 75.6,
        used_hours: 62.4,
        total_bookings: 31,
        total_revenue: 6048.00,
        average_rating: 4.2,
        amenities: ['lighting'],
        operating_hours: {
          monday: { open: '08:00', close: '20:00' },
          tuesday: { open: '08:00', close: '20:00' },
          wednesday: { open: '08:00', close: '20:00' },
          thursday: { open: '08:00', close: '20:00' },
          friday: { open: '08:00', close: '20:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '09:00', close: '16:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-03',
          next_maintenance: '2024-04-03',
          maintenance_notes: 'Surface cleaning and line repainting'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '770e8400-e29b-41d4-a716-446655440014',
        name: 'Court 2 - Outdoor Community',
        court_type: 'outdoor',
        surface: 'asphalt',
        description: 'Community outdoor court with basic amenities',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440003',
        court_number: 2,
        hourly_rate: 80.00,
        member_rate: 64.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.1,
        review_count: 7,
        total_hours: 68.9,
        used_hours: 56.7,
        total_bookings: 28,
        total_revenue: 5512.00,
        average_rating: 4.1,
        amenities: ['lighting'],
        operating_hours: {
          monday: { open: '08:00', close: '20:00' },
          tuesday: { open: '08:00', close: '20:00' },
          wednesday: { open: '08:00', close: '20:00' },
          thursday: { open: '08:00', close: '20:00' },
          friday: { open: '08:00', close: '20:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '09:00', close: '16:00' }
        },
        maintenance_schedule: {
          last_maintenance: '2024-01-01',
          next_maintenance: '2024-04-01',
          maintenance_notes: 'Surface cleaning and line repainting'
        },
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('courts', courts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courts', null, {});
  }
}; 