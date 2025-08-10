/**
 * Seeder: Demo Clubs
 * 
 * This seeder creates sample clubs for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const clubs = [
      // Elite Pickleball Club
      {
        id: '660e8400-e29b-41d4-a716-446655440001',
        name: 'Elite Pickleball Club',
        description: 'Premium pickleball club with multiple indoor and outdoor courts',
        club_type: 'private',
        owner_id: '550e8400-e29b-41d4-a716-446655440003', // elite_club user
        contact_person: 'Mike Johnson',
        phone: '+52-55-4567-8901',
        email: 'info@elitepickleball.com',
        website: 'https://elitepickleball.com',
        logo_url: 'https://example.com/logos/elite_club.jpg',
        banner_url: 'https://example.com/banners/elite_club.jpg',
        address: 'Av. Chapultepec 456, Guadalajara, Jalisco',
        state: 'Jalisco',
        city: 'Guadalajara',
        zip_code: '44100',
        country: 'Mexico',
        latitude: 20.6597,
        longitude: -103.3496,
        operating_hours: JSON.stringify({
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '18:00' }
        }),
        amenities: JSON.stringify([
          'Indoor Courts',
          'Outdoor Courts',
          'Pro Shop',
          'Locker Rooms',
          'Shower Facilities',
          'Equipment Rental',
          'Coaching Services',
          'Tournament Hosting'
        ]),
        membership_fees: JSON.stringify({
          monthly: 1500,
          quarterly: 4000,
          yearly: 15000,
          day_pass: 200
        }),
        court_count: 8,
        is_verified: true,
        is_featured: true,
        is_active: true,
        rating: 4.8,
        review_count: 45,
        total_members: 120,
        total_tournaments: 12,
        total_revenue: 180000.00,
        social_media: JSON.stringify({
          facebook: 'https://facebook.com/elitepickleball',
          instagram: 'https://instagram.com/elitepickleball',
          twitter: 'https://twitter.com/elitepickleball'
        }),
        created_at: now,
        updated_at: now
      },

      // Community Pickleball Center
      {
        id: '660e8400-e29b-41d4-a716-446655440002',
        name: 'Community Pickleball Center',
        description: 'Public community center with pickleball courts for all skill levels',
        club_type: 'public',
        owner_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        contact_person: 'María González',
        phone: '+52-55-2345-6789',
        email: 'info@communitypickleball.mx',
        website: 'https://communitypickleball.mx',
        logo_url: 'https://example.com/logos/community_center.jpg',
        banner_url: 'https://example.com/banners/community_center.jpg',
        address: 'Av. Constitución 567, Monterrey, Nuevo León',
        state: 'Nuevo León',
        city: 'Monterrey',
        zip_code: '64000',
        country: 'Mexico',
        latitude: 25.6866,
        longitude: -100.3161,
        operating_hours: JSON.stringify({
          monday: { open: '08:00', close: '21:00' },
          tuesday: { open: '08:00', close: '21:00' },
          wednesday: { open: '08:00', close: '21:00' },
          thursday: { open: '08:00', close: '21:00' },
          friday: { open: '08:00', close: '21:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '09:00', close: '17:00' }
        }),
        amenities: JSON.stringify([
          'Outdoor Courts',
          'Equipment Rental',
          'Basic Training',
          'Community Events',
          'Parking',
          'Restrooms'
        ]),
        membership_fees: JSON.stringify({
          monthly: 500,
          quarterly: 1200,
          yearly: 4000,
          day_pass: 50
        }),
        court_count: 4,
        is_verified: true,
        is_featured: false,
        is_active: true,
        rating: 4.2,
        review_count: 28,
        total_members: 85,
        total_tournaments: 6,
        total_revenue: 45000.00,
        social_media: JSON.stringify({
          facebook: 'https://facebook.com/communitypickleball',
          instagram: 'https://instagram.com/communitypickleball'
        }),
        created_at: now,
        updated_at: now
      },

      // Resort Pickleball Club
      {
        id: '660e8400-e29b-41d4-a716-446655440003',
        name: 'Resort Pickleball Club',
        description: 'Luxury resort pickleball club with premium facilities and services',
        club_type: 'resort',
        owner_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        contact_person: 'Carlos Rodríguez',
        phone: '+52-55-3456-7890',
        email: 'info@resortpickleball.com',
        website: 'https://resortpickleball.com',
        logo_url: 'https://example.com/logos/resort_club.jpg',
        banner_url: 'https://example.com/banners/resort_club.jpg',
        address: 'Carretera Costera 789, Puerto Vallarta, Jalisco',
        state: 'Jalisco',
        city: 'Puerto Vallarta',
        zip_code: '48300',
        country: 'Mexico',
        latitude: 20.6534,
        longitude: -105.2253,
        operating_hours: JSON.stringify({
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '21:00' },
          saturday: { open: '07:00', close: '20:00' },
          sunday: { open: '07:00', close: '19:00' }
        }),
        amenities: JSON.stringify([
          'Indoor Courts',
          'Outdoor Courts',
          'Pro Shop',
          'Luxury Locker Rooms',
          'Spa Services',
          'Restaurant',
          'Bar',
          'Swimming Pool',
          'Fitness Center',
          'Tennis Courts',
          'Golf Course',
          'Beach Access'
        ]),
        membership_fees: JSON.stringify({
          monthly: 2500,
          quarterly: 6500,
          yearly: 25000,
          day_pass: 400
        }),
        court_count: 12,
        is_verified: true,
        is_featured: true,
        is_active: true,
        rating: 4.9,
        review_count: 67,
        total_members: 200,
        total_tournaments: 18,
        total_revenue: 350000.00,
        social_media: JSON.stringify({
          facebook: 'https://facebook.com/resortpickleball',
          instagram: 'https://instagram.com/resortpickleball',
          twitter: 'https://twitter.com/resortpickleball',
          youtube: 'https://youtube.com/resortpickleball'
        }),
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