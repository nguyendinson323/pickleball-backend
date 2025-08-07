/**
 * Seeder: Demo Courts
 * 
 * This seeder creates sample courts for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const courts = [
      // Elite Club Court 1
      {
        id: '770e8400-e29b-41d4-a716-446655440001',
        name: 'Elite Court 1',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Professional indoor court with premium synthetic surface',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440001', // Elite Pickleball Club
        court_number: 1,
        hourly_rate: 250.00,
        member_rate: 150.00,
        is_available: true,
        is_maintenance: false,
        is_featured: true,
        is_active: true,
        rating: 4.8,
        review_count: 23,
        total_hours: 1200.50,
        used_hours: 980.25,
        total_bookings: 245,
        total_revenue: 24500.00,
        average_rating: 4.8,
        amenities: JSON.stringify([
          'LED Lighting',
          'Air Conditioning',
          'Scoreboard',
          'Equipment Storage',
          'Water Dispenser'
        ]),
        operating_hours: JSON.stringify({
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        }),
        maintenance_schedule: JSON.stringify({
          last_maintenance: '2024-01-15',
          next_maintenance: '2024-04-15',
          maintenance_type: 'Surface cleaning and line repainting'
        }),
        created_at: now,
        updated_at: now
      },

      // Elite Club Court 2
      {
        id: '770e8400-e29b-41d4-a716-446655440002',
        name: 'Elite Court 2',
        court_type: 'outdoor',
        surface: 'concrete',
        description: 'Outdoor court with concrete surface and shade protection',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440001', // Elite Pickleball Club
        court_number: 2,
        hourly_rate: 200.00,
        member_rate: 120.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.5,
        review_count: 18,
        total_hours: 950.75,
        used_hours: 720.50,
        total_bookings: 180,
        total_revenue: 18000.00,
        average_rating: 4.5,
        amenities: JSON.stringify([
          'Shade Canopy',
          'Scoreboard',
          'Equipment Storage',
          'Water Dispenser',
          'Seating Area'
        ]),
        operating_hours: JSON.stringify({
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        }),
        maintenance_schedule: JSON.stringify({
          last_maintenance: '2024-02-01',
          next_maintenance: '2024-05-01',
          maintenance_type: 'Surface inspection and cleaning'
        }),
        created_at: now,
        updated_at: now
      },

      // Community Center Court
      {
        id: '770e8400-e29b-41d4-a716-446655440003',
        name: 'Community Court A',
        court_type: 'outdoor',
        surface: 'asphalt',
        description: 'Public outdoor court for community use',
        dimensions: '20m x 10m',
        capacity: 4,
        club_id: '660e8400-e29b-41d4-a716-446655440002', // Community Pickleball Center
        court_number: 1,
        hourly_rate: 50.00,
        member_rate: 25.00,
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: 4.2,
        review_count: 15,
        total_hours: 800.25,
        used_hours: 600.00,
        total_bookings: 150,
        total_revenue: 7500.00,
        average_rating: 4.2,
        amenities: JSON.stringify([
          'Basic Lighting',
          'Scoreboard',
          'Water Fountain',
          'Parking Nearby'
        ]),
        operating_hours: JSON.stringify({
          monday: { open: '08:00', close: '21:00' },
          tuesday: { open: '08:00', close: '21:00' },
          wednesday: { open: '08:00', close: '21:00' },
          thursday: { open: '08:00', close: '21:00' },
          friday: { open: '08:00', close: '21:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '09:00', close: '17:00' }
        }),
        maintenance_schedule: JSON.stringify({
          last_maintenance: '2024-01-20',
          next_maintenance: '2024-04-20',
          maintenance_type: 'Surface cleaning and line repainting'
        }),
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