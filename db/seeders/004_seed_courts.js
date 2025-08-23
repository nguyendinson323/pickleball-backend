/**
 * Courts Seeder
 * 
 * Seeds the courts table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get clubs from database
    const clubs = await queryInterface.sequelize.query(
      `SELECT id FROM clubs ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (clubs.length < 5) {
      throw new Error('Not enough clubs found. Please run clubs seeder first.');
    }

    const courts = [
      {
        id: uuidv4(),
        name: 'Centro Court',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Premium indoor court with professional lighting and climate control. Perfect for tournaments and professional training.',
        dimensions: '20m x 44m',
        capacity: 150,
        club_id: clubs[0].id,
        court_number: 1,
        hourly_rate: '450.00',
        member_rate: '350.00',
        is_available: true,
        is_maintenance: false,
        is_featured: true,
        is_active: true,
        rating: '4.95',
        review_count: 87,
        total_hours: '2840.50',
        used_hours: '2346.75',
        total_bookings: 342,
        total_revenue: '156780.00',
        average_rating: '4.95',
        amenities: JSON.stringify([
          'Professional Lighting',
          'Climate Control',
          'Sound System',
          'Video Recording',
          'Spectator Seating',
          'Score Display'
        ]),
        operating_hours: JSON.stringify({
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '23:00' },
          saturday: { open: '07:00', close: '23:00' },
          sunday: { open: '07:00', close: '21:00' }
        }),
        maintenance_schedule: JSON.stringify({
          daily_cleaning: '05:30',
          weekly_deep_clean: 'Sunday 21:00-06:00',
          monthly_inspection: 'First Sunday of month',
          surface_maintenance: 'Quarterly'
        }),
        metadata: JSON.stringify({
          last_renovation: '2023-01-15',
          tournament_approved: true,
          professional_grade: true,
          camera_count: 4
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Training Court A',
        court_type: 'indoor',
        surface: 'synthetic',
        description: 'Specialized training court with video analysis system and coaching amenities. Ideal for skill development.',
        dimensions: '20m x 44m',
        capacity: 50,
        club_id: clubs[1].id,
        court_number: 1,
        hourly_rate: '380.00',
        member_rate: '280.00',
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: '4.78',
        review_count: 124,
        total_hours: '2150.25',
        used_hours: '1876.50',
        total_bookings: 289,
        total_revenue: '98450.00',
        average_rating: '4.78',
        amenities: JSON.stringify([
          'Video Analysis System',
          'Ball Machine Mount',
          'Coaching Boards',
          'Equipment Storage',
          'First Aid Station'
        ]),
        operating_hours: JSON.stringify({
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '21:00' },
          saturday: { open: '08:00', close: '20:00' },
          sunday: { open: '08:00', close: '18:00' }
        }),
        maintenance_schedule: JSON.stringify({
          daily_cleaning: '06:30',
          weekly_maintenance: 'Monday 06:00-07:00',
          equipment_check: 'Daily before opening'
        }),
        metadata: JSON.stringify({
          video_system_brand: 'CourtVision Pro',
          coaching_certification_required: true,
          junior_friendly: true
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Outdoor Court #1',
        court_type: 'outdoor',
        surface: 'concrete',
        description: 'Basic outdoor court perfect for recreational play and casual games. Great for beginners and family play.',
        dimensions: '20m x 44m',
        capacity: 20,
        club_id: clubs[2].id,
        court_number: 1,
        hourly_rate: '250.00',
        member_rate: '200.00',
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: '4.25',
        review_count: 43,
        total_hours: '1650.75',
        used_hours: '1234.25',
        total_bookings: 156,
        total_revenue: '45670.00',
        average_rating: '4.25',
        amenities: JSON.stringify([
          'Shade Structure',
          'Bench Seating',
          'Water Station',
          'Equipment Hooks'
        ]),
        operating_hours: JSON.stringify({
          monday: { open: '08:00', close: '20:00' },
          tuesday: { open: '08:00', close: '20:00' },
          wednesday: { open: '08:00', close: '20:00' },
          thursday: { open: '08:00', close: '20:00' },
          friday: { open: '08:00', close: '21:00' },
          saturday: { open: '09:00', close: '21:00' },
          sunday: { open: '09:00', close: '19:00' }
        }),
        maintenance_schedule: JSON.stringify({
          daily_sweep: '07:30',
          weekly_wash: 'Saturday evening',
          monthly_crack_inspection: 'Last Friday of month'
        }),
        metadata: JSON.stringify({
          weather_dependent: true,
          family_friendly: true,
          beginner_recommended: true
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Beach Paradise Court #1',
        court_type: 'outdoor',
        surface: 'synthetic',
        description: 'Luxury beachfront court with ocean views. Premium surface with resort amenities and breathtaking scenery.',
        dimensions: '20m x 44m',
        capacity: 100,
        club_id: clubs[3].id,
        court_number: 1,
        hourly_rate: '650.00',
        member_rate: '500.00',
        is_available: true,
        is_maintenance: false,
        is_featured: true,
        is_active: true,
        rating: '4.89',
        review_count: 267,
        total_hours: '3200.00',
        used_hours: '2845.50',
        total_bookings: 456,
        total_revenue: '324570.00',
        average_rating: '4.89',
        amenities: JSON.stringify([
          'Ocean View',
          'Beach Access',
          'Premium Shade Sails',
          'Refreshment Station',
          'Spectator Deck',
          'Photography Backdrop',
          'Tropical Landscaping'
        ]),
        operating_hours: JSON.stringify({
          monday: { open: '06:00', close: '23:00' },
          tuesday: { open: '06:00', close: '23:00' },
          wednesday: { open: '06:00', close: '23:00' },
          thursday: { open: '06:00', close: '23:00' },
          friday: { open: '06:00', close: '23:00' },
          saturday: { open: '06:00', close: '23:00' },
          sunday: { open: '06:00', close: '23:00' }
        }),
        maintenance_schedule: JSON.stringify({
          dawn_cleaning: '05:30',
          sand_removal: 'Twice daily',
          surface_wash: 'After each session',
          salt_air_protection: 'Weekly'
        }),
        metadata: JSON.stringify({
          sunset_bookings_premium: true,
          wedding_events_available: true,
          instagram_hotspot: true,
          hurricane_season_closure: 'June-November weather dependent'
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Heritage Court',
        court_type: 'covered',
        surface: 'concrete',
        description: 'Historic downtown court with covered pavilion. Combines traditional architecture with modern playing surface.',
        dimensions: '20m x 44m',
        capacity: 75,
        club_id: clubs[4].id,
        court_number: 1,
        hourly_rate: '320.00',
        member_rate: '250.00',
        is_available: true,
        is_maintenance: false,
        is_featured: false,
        is_active: true,
        rating: '4.42',
        review_count: 89,
        total_hours: '1980.25',
        used_hours: '1567.75',
        total_bookings: 234,
        total_revenue: '78450.00',
        average_rating: '4.42',
        amenities: JSON.stringify([
          'Historic Pavilion Cover',
          'Natural Ventilation',
          'Traditional Seating',
          'Heritage Lighting',
          'Downtown Views'
        ]),
        operating_hours: JSON.stringify({
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '22:00' },
          saturday: { open: '08:00', close: '22:00' },
          sunday: { open: '08:00', close: '20:00' }
        }),
        maintenance_schedule: JSON.stringify({
          morning_prep: '06:30',
          heritage_preservation: 'Monthly inspection',
          structural_check: 'Quarterly professional inspection'
        }),
        metadata: JSON.stringify({
          historic_building: true,
          heritage_protected: true,
          downtown_location: true,
          architectural_tours_available: true
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('courts', courts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courts', null, {});
  }
};