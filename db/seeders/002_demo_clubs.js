/**
 * Seeder: Demo Clubs
 * 
 * This seeder creates sample clubs for testing and development.
 * Includes clubs from different cities with various amenities and features.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const clubs = [
      // Guadalajara Clubs
      {
        id: '660e8400-e29b-41d4-a716-446655440001',
        name: 'Pickleball Guadalajara Club',
        description: 'Premier pickleball facility in Guadalajara with 8 indoor courts, professional coaching, and tournament hosting capabilities.',
        club_type: 'private',
        owner_id: '550e8400-e29b-41d4-a716-446655440004',
        contact_person: 'Ana Martínez',
        phone: '+52-33-4567-8901',
        email: 'info@pickleballguadalajara.mx',
        website: 'https://pickleballguadalajara.mx',
        logo_url: 'https://example.com/logos/guadalajara-club.png',
        banner_url: 'https://example.com/banners/guadalajara-club.jpg',
        address: 'Av. Chapultepec 123, Col. Americana, Guadalajara, Jalisco',
        state: 'Jalisco',
        city: 'Guadalajara',
        zip_code: '44160',
        country: 'Mexico',
        latitude: 20.6597,
        longitude: -103.3496,
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        amenities: ['pro_shop', 'locker_rooms', 'showers', 'parking', 'cafe', 'wifi', 'equipment_rental', 'coaching'],
        membership_fees: {
          monthly: 1500,
          quarterly: 4000,
          yearly: 15000,
          day_pass: 200
        },
        court_count: 8,
        is_verified: true,
        is_featured: true,
        is_active: true,
        rating: 4.8,
        review_count: 45,
        total_members: 120,
        total_tournaments: 12,
        total_revenue: 250000,
        social_media: {
          facebook: 'https://facebook.com/pickleballguadalajara',
          instagram: 'https://instagram.com/pickleballguadalajara',
          twitter: 'https://twitter.com/pickleballgdl'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '660e8400-e29b-41d4-a716-446655440002',
        name: 'Club Deportivo Vallarta',
        description: 'Multi-sport facility with 4 dedicated pickleball courts, swimming pool, and fitness center.',
        club_type: 'semi_private',
        owner_id: '550e8400-e29b-41d4-a716-446655440004',
        contact_person: 'Ana Martínez',
        phone: '+52-33-4567-8902',
        email: 'info@clubvallarta.mx',
        website: 'https://clubvallarta.mx',
        logo_url: 'https://example.com/logos/vallarta-club.png',
        banner_url: 'https://example.com/banners/vallarta-club.jpg',
        address: 'Av. Vallarta 456, Col. Providencia, Guadalajara, Jalisco',
        state: 'Jalisco',
        city: 'Guadalajara',
        zip_code: '44630',
        country: 'Mexico',
        latitude: 20.6597,
        longitude: -103.3496,
        operating_hours: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '21:00' },
          saturday: { open: '08:00', close: '19:00' },
          sunday: { open: '08:00', close: '17:00' }
        },
        amenities: ['pro_shop', 'locker_rooms', 'showers', 'parking', 'swimming_pool', 'fitness_center', 'wifi'],
        membership_fees: {
          monthly: 1200,
          quarterly: 3200,
          yearly: 12000,
          day_pass: 150
        },
        court_count: 4,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.5,
        review_count: 28,
        total_members: 85,
        total_tournaments: 6,
        total_revenue: 180000,
        social_media: {
          facebook: 'https://facebook.com/clubvallarta',
          instagram: 'https://instagram.com/clubvallarta'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '660e8400-e29b-41d4-a716-446655440003',
        name: 'Centro Recreativo Zapopan',
        description: 'Community recreation center with 2 outdoor pickleball courts, perfect for beginners and casual players.',
        club_type: 'public',
        owner_id: '550e8400-e29b-41d4-a716-446655440004',
        contact_person: 'Ana Martínez',
        phone: '+52-33-4567-8903',
        email: 'info@centrozapopan.mx',
        website: 'https://centrozapopan.mx',
        logo_url: 'https://example.com/logos/zapopan-club.png',
        banner_url: 'https://example.com/banners/zapopan-club.jpg',
        address: 'Calle Hidalgo 789, Centro, Zapopan, Jalisco',
        state: 'Jalisco',
        city: 'Zapopan',
        zip_code: '45100',
        country: 'Mexico',
        latitude: 20.7235,
        longitude: -103.3848,
        operating_hours: {
          monday: { open: '08:00', close: '20:00' },
          tuesday: { open: '08:00', close: '20:00' },
          wednesday: { open: '08:00', close: '20:00' },
          thursday: { open: '08:00', close: '20:00' },
          friday: { open: '08:00', close: '20:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '09:00', close: '16:00' }
        },
        amenities: ['parking', 'restrooms', 'equipment_rental'],
        membership_fees: {
          monthly: 500,
          quarterly: 1200,
          yearly: 4000,
          day_pass: 50
        },
        court_count: 2,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.2,
        review_count: 15,
        total_members: 45,
        total_tournaments: 2,
        total_revenue: 75000,
        social_media: {},
        created_at: now,
        updated_at: now
      },

      // Monterrey Clubs
      {
        id: '660e8400-e29b-41d4-a716-446655440004',
        name: 'Pickleball Monterrey Club',
        description: 'State-of-the-art pickleball facility in Monterrey with 6 indoor courts, professional coaching, and tournament hosting.',
        club_type: 'private',
        owner_id: '550e8400-e29b-41d4-a716-446655440005',
        contact_person: 'Roberto Hernández',
        phone: '+52-81-5678-9012',
        email: 'info@pickleballmonterrey.mx',
        website: 'https://pickleballmonterrey.mx',
        logo_url: 'https://example.com/logos/monterrey-club.png',
        banner_url: 'https://example.com/banners/monterrey-club.jpg',
        address: 'Av. San Pedro 456, Col. Valle del Campestre, Monterrey, NL',
        state: 'Nuevo León',
        city: 'Monterrey',
        zip_code: '66265',
        country: 'Mexico',
        latitude: 25.6866,
        longitude: -100.3161,
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        amenities: ['pro_shop', 'locker_rooms', 'showers', 'parking', 'cafe', 'wifi', 'equipment_rental', 'coaching', 'fitness_center'],
        membership_fees: {
          monthly: 1600,
          quarterly: 4300,
          yearly: 16000,
          day_pass: 220
        },
        court_count: 6,
        is_verified: true,
        is_featured: true,
        is_active: true,
        rating: 4.9,
        review_count: 52,
        total_members: 95,
        total_tournaments: 8,
        total_revenue: 220000,
        social_media: {
          facebook: 'https://facebook.com/pickleballmonterrey',
          instagram: 'https://instagram.com/pickleballmonterrey',
          twitter: 'https://twitter.com/pickleballmty'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '660e8400-e29b-41d4-a716-446655440005',
        name: 'Club Deportivo San Pedro',
        description: 'Exclusive sports club with 3 pickleball courts, tennis courts, and golf course.',
        club_type: 'private',
        owner_id: '550e8400-e29b-41d4-a716-446655440005',
        contact_person: 'Roberto Hernández',
        phone: '+52-81-5678-9013',
        email: 'info@clubsanpedro.mx',
        website: 'https://clubsanpedro.mx',
        logo_url: 'https://example.com/logos/sanpedro-club.png',
        banner_url: 'https://example.com/banners/sanpedro-club.jpg',
        address: 'Av. Vasconcelos 789, Col. Valle, San Pedro Garza García, NL',
        state: 'Nuevo León',
        city: 'San Pedro Garza García',
        zip_code: '66220',
        country: 'Mexico',
        latitude: 25.6598,
        longitude: -100.4023,
        operating_hours: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '21:00' },
          saturday: { open: '08:00', close: '19:00' },
          sunday: { open: '08:00', close: '17:00' }
        },
        amenities: ['pro_shop', 'locker_rooms', 'showers', 'parking', 'restaurant', 'wifi', 'golf_course', 'tennis_courts'],
        membership_fees: {
          monthly: 2000,
          quarterly: 5500,
          yearly: 20000,
          day_pass: 300
        },
        court_count: 3,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.7,
        review_count: 35,
        total_members: 65,
        total_tournaments: 4,
        total_revenue: 180000,
        social_media: {
          facebook: 'https://facebook.com/clubsanpedro',
          instagram: 'https://instagram.com/clubsanpedro'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '660e8400-e29b-41d4-a716-446655440006',
        name: 'Centro Comunitario Santa Catarina',
        description: 'Community center with 2 outdoor pickleball courts, basketball courts, and playground.',
        club_type: 'public',
        owner_id: '550e8400-e29b-41d4-a716-446655440005',
        contact_person: 'Roberto Hernández',
        phone: '+52-81-5678-9014',
        email: 'info@centrosantacatarina.mx',
        website: 'https://centrosantacatarina.mx',
        logo_url: 'https://example.com/logos/santacatarina-club.png',
        banner_url: 'https://example.com/banners/santacatarina-club.jpg',
        address: 'Av. Constitución 321, Centro, Santa Catarina, NL',
        state: 'Nuevo León',
        city: 'Santa Catarina',
        zip_code: '66350',
        country: 'Mexico',
        latitude: 25.6732,
        longitude: -100.4583,
        operating_hours: {
          monday: { open: '08:00', close: '20:00' },
          tuesday: { open: '08:00', close: '20:00' },
          wednesday: { open: '08:00', close: '20:00' },
          thursday: { open: '08:00', close: '20:00' },
          friday: { open: '08:00', close: '20:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '09:00', close: '16:00' }
        },
        amenities: ['parking', 'restrooms', 'playground', 'basketball_courts'],
        membership_fees: {
          monthly: 400,
          quarterly: 1000,
          yearly: 3500,
          day_pass: 40
        },
        court_count: 2,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.0,
        review_count: 12,
        total_members: 35,
        total_tournaments: 1,
        total_revenue: 50000,
        social_media: {},
        created_at: now,
        updated_at: now
      },

      // Tijuana Clubs
      {
        id: '660e8400-e29b-41d4-a716-446655440007',
        name: 'Pickleball Tijuana Club',
        description: 'Premier pickleball facility in Tijuana with 5 indoor courts, professional coaching, and tournament hosting.',
        club_type: 'private',
        owner_id: '550e8400-e29b-41d4-a716-446655440006',
        contact_person: 'Patricia López',
        phone: '+52-664-6789-0123',
        email: 'info@pickleballtijuana.mx',
        website: 'https://pickleballtijuana.mx',
        logo_url: 'https://example.com/logos/tijuana-club.png',
        banner_url: 'https://example.com/banners/tijuana-club.jpg',
        address: 'Blvd. Díaz Ordaz 789, Col. Centro, Tijuana, BC',
        state: 'Baja California',
        city: 'Tijuana',
        zip_code: '22000',
        country: 'Mexico',
        latitude: 32.5149,
        longitude: -117.0382,
        operating_hours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        },
        amenities: ['pro_shop', 'locker_rooms', 'showers', 'parking', 'cafe', 'wifi', 'equipment_rental', 'coaching'],
        membership_fees: {
          monthly: 1400,
          quarterly: 3800,
          yearly: 14000,
          day_pass: 180
        },
        court_count: 5,
        is_verified: true,
        is_featured: true,
        is_active: true,
        rating: 4.6,
        review_count: 38,
        total_members: 75,
        total_tournaments: 6,
        total_revenue: 160000,
        social_media: {
          facebook: 'https://facebook.com/pickleballtijuana',
          instagram: 'https://instagram.com/pickleballtijuana',
          twitter: 'https://twitter.com/pickleballtij'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '660e8400-e29b-41d4-a716-446655440008',
        name: 'Club Deportivo Playas de Tijuana',
        description: 'Beachfront sports club with 3 outdoor pickleball courts, swimming pool, and beach access.',
        club_type: 'semi_private',
        owner_id: '550e8400-e29b-41d4-a716-446655440006',
        contact_person: 'Patricia López',
        phone: '+52-664-6789-0124',
        email: 'info@clubplayas.mx',
        website: 'https://clubplayas.mx',
        logo_url: 'https://example.com/logos/playas-club.png',
        banner_url: 'https://example.com/banners/playas-club.jpg',
        address: 'Blvd. Costero 123, Playas de Tijuana, Tijuana, BC',
        state: 'Baja California',
        city: 'Tijuana',
        zip_code: '22500',
        country: 'Mexico',
        latitude: 32.5308,
        longitude: -117.1272,
        operating_hours: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '21:00' },
          saturday: { open: '08:00', close: '19:00' },
          sunday: { open: '08:00', close: '17:00' }
        },
        amenities: ['pro_shop', 'locker_rooms', 'showers', 'parking', 'swimming_pool', 'beach_access', 'wifi'],
        membership_fees: {
          monthly: 1300,
          quarterly: 3500,
          yearly: 13000,
          day_pass: 160
        },
        court_count: 3,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.4,
        review_count: 25,
        total_members: 55,
        total_tournaments: 3,
        total_revenue: 120000,
        social_media: {
          facebook: 'https://facebook.com/clubplayas',
          instagram: 'https://instagram.com/clubplayas'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '660e8400-e29b-41d4-a716-446655440009',
        name: 'Centro Recreativo Otay',
        description: 'Community recreation center with 2 outdoor pickleball courts, soccer fields, and basketball courts.',
        club_type: 'public',
        owner_id: '550e8400-e29b-41d4-a716-446655440006',
        contact_person: 'Patricia López',
        phone: '+52-664-6789-0125',
        email: 'info@centrootay.mx',
        website: 'https://centrootay.mx',
        logo_url: 'https://example.com/logos/otay-club.png',
        banner_url: 'https://example.com/banners/otay-club.jpg',
        address: 'Av. Industrial 456, Col. Otay, Tijuana, BC',
        state: 'Baja California',
        city: 'Tijuana',
        zip_code: '22440',
        country: 'Mexico',
        latitude: 32.5149,
        longitude: -117.0382,
        operating_hours: {
          monday: { open: '08:00', close: '20:00' },
          tuesday: { open: '08:00', close: '20:00' },
          wednesday: { open: '08:00', close: '20:00' },
          thursday: { open: '08:00', close: '20:00' },
          friday: { open: '08:00', close: '20:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '09:00', close: '16:00' }
        },
        amenities: ['parking', 'restrooms', 'soccer_fields', 'basketball_courts'],
        membership_fees: {
          monthly: 450,
          quarterly: 1100,
          yearly: 3800,
          day_pass: 45
        },
        court_count: 2,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.1,
        review_count: 18,
        total_members: 40,
        total_tournaments: 2,
        total_revenue: 60000,
        social_media: {},
        created_at: now,
        updated_at: now
      },

      // Additional Clubs
      {
        id: '660e8400-e29b-41d4-a716-446655440010',
        name: 'Resort Pickleball Cancún',
        description: 'Luxury resort with 4 pickleball courts, beach access, and all-inclusive amenities.',
        club_type: 'resort',
        owner_id: '550e8400-e29b-41d4-a716-446655440004',
        contact_person: 'Ana Martínez',
        phone: '+52-998-123-4567',
        email: 'info@resortpickleballcancun.mx',
        website: 'https://resortpickleballcancun.mx',
        logo_url: 'https://example.com/logos/cancun-resort.png',
        banner_url: 'https://example.com/banners/cancun-resort.jpg',
        address: 'Blvd. Kukulcán Km 12.5, Zona Hotelera, Cancún, QR',
        state: 'Quintana Roo',
        city: 'Cancún',
        zip_code: '77500',
        country: 'Mexico',
        latitude: 21.1743,
        longitude: -86.8466,
        operating_hours: {
          monday: { open: '07:00', close: '22:00' },
          tuesday: { open: '07:00', close: '22:00' },
          wednesday: { open: '07:00', close: '22:00' },
          thursday: { open: '07:00', close: '22:00' },
          friday: { open: '07:00', close: '22:00' },
          saturday: { open: '08:00', close: '20:00' },
          sunday: { open: '08:00', close: '18:00' }
        },
        amenities: ['pro_shop', 'locker_rooms', 'showers', 'parking', 'restaurant', 'wifi', 'beach_access', 'spa', 'pool'],
        membership_fees: {
          monthly: 2500,
          quarterly: 7000,
          yearly: 25000,
          day_pass: 400
        },
        court_count: 4,
        is_verified: true,
        is_featured: true,
        is_active: true,
        rating: 4.9,
        review_count: 65,
        total_members: 80,
        total_tournaments: 5,
        total_revenue: 300000,
        social_media: {
          facebook: 'https://facebook.com/resortpickleballcancun',
          instagram: 'https://instagram.com/resortpickleballcancun',
          twitter: 'https://twitter.com/resortpickleball'
        },
        created_at: now,
        updated_at: now
      },

      {
        id: '660e8400-e29b-41d4-a716-446655440011',
        name: 'Community Pickleball Center',
        description: 'Affordable community center with 3 outdoor courts, perfect for families and beginners.',
        club_type: 'community',
        owner_id: '550e8400-e29b-41d4-a716-446655440005',
        contact_person: 'Roberto Hernández',
        phone: '+52-55-9876-5432',
        email: 'info@communitypickleball.mx',
        website: 'https://communitypickleball.mx',
        logo_url: 'https://example.com/logos/community-center.png',
        banner_url: 'https://example.com/banners/community-center.jpg',
        address: 'Calle Comunidad 789, Col. Popular, Ciudad de México',
        state: 'Ciudad de México',
        city: 'Ciudad de México',
        zip_code: '03100',
        country: 'Mexico',
        latitude: 19.4326,
        longitude: -99.1332,
        operating_hours: {
          monday: { open: '08:00', close: '20:00' },
          tuesday: { open: '08:00', close: '20:00' },
          wednesday: { open: '08:00', close: '20:00' },
          thursday: { open: '08:00', close: '20:00' },
          friday: { open: '08:00', close: '20:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '09:00', close: '16:00' }
        },
        amenities: ['parking', 'restrooms', 'playground', 'picnic_area'],
        membership_fees: {
          monthly: 300,
          quarterly: 800,
          yearly: 2800,
          day_pass: 30
        },
        court_count: 3,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.3,
        review_count: 22,
        total_members: 60,
        total_tournaments: 3,
        total_revenue: 90000,
        social_media: {
          facebook: 'https://facebook.com/communitypickleball'
        },
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('clubs', clubs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clubs', null, {});
  }
}; 