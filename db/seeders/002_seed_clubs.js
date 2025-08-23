/**
 * Clubs Seeder
 * 
 * Seeds the clubs table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get club users from the users table
    const clubUsers = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'club' ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (clubUsers.length < 5) {
      throw new Error('Not enough club users found. Please run user seeder first.');
    }

    const clubs = [
      {
        id: uuidv4(),
        name: 'Club Deportivo Guadalajara Pickleball',
        description: 'Premier pickleball club in Guadalajara offering professional courts, coaching, and tournaments. We have 8 indoor courts with professional lighting and climate control.',
        club_type: 'competitive',
        owner_id: clubUsers[0].id,
        contact_person: 'Miguel Ángel Torres',
        phone: '+523312345678',
        email: 'info@gdlpickleball.mx',
        website: 'https://www.gdlpickleball.mx',
        logo_url: 'https://storage.example.com/clubs/gdl-pickleball-logo.png',
        banner_url: 'https://storage.example.com/clubs/gdl-pickleball-banner.jpg',
        address: 'Av. Patria 1234, Zapopan',
        state: 'Jalisco',
        city: 'Guadalajara',
        zip_code: '45010',
        country: 'Mexico',
        latitude: 20.710481,
        longitude: -103.410765,
        operating_hours: JSON.stringify({
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '23:00' },
          saturday: { open: '07:00', close: '23:00' },
          sunday: { open: '07:00', close: '21:00' }
        }),
        amenities: JSON.stringify([
          'Pro Shop',
          'Locker Rooms',
          'Showers',
          'Parking',
          'Restaurant',
          'Equipment Rental',
          'Ball Machine',
          'Video Analysis'
        ]),
        membership_fees: JSON.stringify({
          monthly: 1500,
          quarterly: 4000,
          annual: 14000,
          day_pass: 200,
          court_rental_hour: 400
        }),
        court_count: 8,
        is_verified: true,
        is_featured: true,
        is_active: true,
        rating: 4.85,
        review_count: 127,
        total_members: 342,
        total_tournaments: 18,
        total_revenue: 2450000.00,
        social_media: JSON.stringify({
          facebook: 'https://facebook.com/gdlpickleball',
          instagram: '@gdlpickleball',
          twitter: '@gdlpickleballmx'
        }),
        metadata: JSON.stringify({
          founded_year: 2019,
          certifications: ['IPF Certified', 'USAPA Approved'],
          parking_spaces: 80
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Monterrey Pickleball Academy',
        description: 'Leading pickleball training academy in Northern Mexico. Specialized in youth development and competitive training programs.',
        club_type: 'training',
        owner_id: clubUsers[1].id,
        contact_person: 'Roberto González Martínez',
        phone: '+528134567890',
        email: 'academy@mtypaddle.com',
        website: 'https://www.mtypaddle.com',
        logo_url: 'https://storage.example.com/clubs/mty-academy-logo.png',
        banner_url: 'https://storage.example.com/clubs/mty-academy-banner.jpg',
        address: 'Calle Sierra Madre 567, San Pedro Garza García',
        state: 'Nuevo León',
        city: 'Monterrey',
        zip_code: '66220',
        country: 'Mexico',
        latitude: 25.651990,
        longitude: -100.359719,
        operating_hours: JSON.stringify({
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '21:00' },
          saturday: { open: '08:00', close: '20:00' },
          sunday: { open: '08:00', close: '18:00' }
        }),
        amenities: JSON.stringify([
          'Training Center',
          'Fitness Gym',
          'Physical Therapy',
          'Nutrition Consulting',
          'Video Library',
          'Kids Area'
        ]),
        membership_fees: JSON.stringify({
          monthly: 2000,
          quarterly: 5500,
          annual: 20000,
          drop_in_class: 300,
          private_lesson: 800
        }),
        court_count: 6,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.92,
        review_count: 89,
        total_members: 256,
        total_tournaments: 12,
        total_revenue: 1890000.00,
        social_media: JSON.stringify({
          facebook: 'https://facebook.com/mtypickleballacademy',
          instagram: '@mtypaddle',
          youtube: 'https://youtube.com/mtypickleballacademy'
        }),
        metadata: JSON.stringify({
          coaches_certified: 8,
          junior_programs: true,
          international_camps: 3
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Centro Recreativo Querétaro Pickleball',
        description: 'Family-friendly recreational pickleball center with courts for all skill levels. Perfect for beginners and casual players.',
        club_type: 'recreational',
        owner_id: clubUsers[2].id,
        contact_person: 'Ana Lucía Mendoza',
        phone: '+524423456789',
        email: 'hola@qropickleball.mx',
        website: null,
        logo_url: 'https://storage.example.com/clubs/qro-rec-logo.png',
        banner_url: null,
        address: 'Blvd. Bernardo Quintana 234',
        state: 'Querétaro',
        city: 'Querétaro',
        zip_code: '76090',
        country: 'Mexico',
        latitude: 20.593372,
        longitude: -100.391350,
        operating_hours: JSON.stringify({
          monday: { open: '08:00', close: '20:00' },
          tuesday: { open: '08:00', close: '20:00' },
          wednesday: { open: '08:00', close: '20:00' },
          thursday: { open: '08:00', close: '20:00' },
          friday: { open: '08:00', close: '21:00' },
          saturday: { open: '09:00', close: '21:00' },
          sunday: { open: '09:00', close: '19:00' }
        }),
        amenities: JSON.stringify([
          'Beginner Courts',
          'Equipment Rental',
          'Snack Bar',
          'Free Parking',
          'Shade Areas'
        ]),
        membership_fees: JSON.stringify({
          monthly: 800,
          quarterly: 2200,
          annual: 8000,
          day_pass: 100,
          court_rental_hour: 250
        }),
        court_count: 4,
        is_verified: false,
        is_featured: false,
        is_active: true,
        rating: 4.35,
        review_count: 42,
        total_members: 178,
        total_tournaments: 4,
        total_revenue: 567000.00,
        social_media: JSON.stringify({
          facebook: 'https://facebook.com/qropickleball'
        }),
        metadata: JSON.stringify({
          family_friendly: true,
          senior_programs: true
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Cancún Beach Pickleball Resort',
        description: 'Luxury beachfront pickleball resort with ocean view courts. Combines vacation paradise with world-class pickleball facilities.',
        club_type: 'mixed',
        owner_id: clubUsers[3].id,
        contact_person: 'Carlos Eduardo Ramírez',
        phone: '+529982345678',
        email: 'reservations@cancunpickleball.com',
        website: 'https://www.cancunpickleball.com',
        logo_url: 'https://storage.example.com/clubs/cancun-beach-logo.png',
        banner_url: 'https://storage.example.com/clubs/cancun-beach-banner.jpg',
        address: 'Blvd. Kukulcan Km 12.5, Zona Hotelera',
        state: 'Quintana Roo',
        city: 'Cancún',
        zip_code: '77500',
        country: 'Mexico',
        latitude: 21.105925,
        longitude: -86.764016,
        operating_hours: JSON.stringify({
          monday: { open: '06:00', close: '23:00' },
          tuesday: { open: '06:00', close: '23:00' },
          wednesday: { open: '06:00', close: '23:00' },
          thursday: { open: '06:00', close: '23:00' },
          friday: { open: '06:00', close: '23:00' },
          saturday: { open: '06:00', close: '23:00' },
          sunday: { open: '06:00', close: '23:00' }
        }),
        amenities: JSON.stringify([
          'Beach Access',
          'Swimming Pool',
          'Spa Services',
          'Restaurant & Bar',
          'Tournament Hosting',
          'Resort Accommodation',
          'Equipment Shop',
          'Professional Coaching'
        ]),
        membership_fees: JSON.stringify({
          weekly_package: 8000,
          monthly: 3000,
          annual: 30000,
          day_pass: 500,
          vacation_package: 15000
        }),
        court_count: 10,
        is_verified: true,
        is_featured: true,
        is_active: true,
        rating: 4.78,
        review_count: 234,
        total_members: 456,
        total_tournaments: 24,
        total_revenue: 5670000.00,
        social_media: JSON.stringify({
          facebook: 'https://facebook.com/cancunbeachpickleball',
          instagram: '@cancunpickleball',
          twitter: '@cancunpickle',
          tripadvisor: 'https://tripadvisor.com/cancunpickleball'
        }),
        metadata: JSON.stringify({
          resort_partner: 'Beach Paradise Hotels',
          international_tournaments: 6,
          languages: ['Spanish', 'English', 'French']
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuidv4(),
        name: 'Puebla Pickleball Club',
        description: 'Historic city center pickleball club with modern facilities. Promoting pickleball growth in central Mexico.',
        club_type: 'competitive',
        owner_id: clubUsers[4].id,
        contact_person: 'María Fernanda López',
        phone: '+522224567890',
        email: 'contacto@pueblapickleball.mx',
        website: 'https://www.pueblapickleball.mx',
        logo_url: 'https://storage.example.com/clubs/puebla-club-logo.png',
        banner_url: 'https://storage.example.com/clubs/puebla-club-banner.jpg',
        address: 'Av. Juárez 1890, Centro Histórico',
        state: 'Puebla',
        city: 'Puebla',
        zip_code: '72000',
        country: 'Mexico',
        latitude: 19.042701,
        longitude: -98.198727,
        operating_hours: JSON.stringify({
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '22:00' },
          saturday: { open: '08:00', close: '22:00' },
          sunday: { open: '08:00', close: '20:00' }
        }),
        amenities: JSON.stringify([
          'Indoor Courts',
          'Outdoor Courts',
          'Pro Shop',
          'Café',
          'Locker Rooms',
          'League Play'
        ]),
        membership_fees: JSON.stringify({
          monthly: 1200,
          quarterly: 3300,
          annual: 12000,
          day_pass: 150,
          court_rental_hour: 350
        }),
        court_count: 5,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.52,
        review_count: 67,
        total_members: 198,
        total_tournaments: 9,
        total_revenue: 1234000.00,
        social_media: JSON.stringify({
          facebook: 'https://facebook.com/pueblapickleball',
          instagram: '@pueblapickle'
        }),
        metadata: JSON.stringify({
          historic_building: true,
          founded_year: 2020,
          league_divisions: 4
        }),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('clubs', clubs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clubs', null, {});
  }
};