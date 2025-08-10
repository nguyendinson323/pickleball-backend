/**
 * Seeder: Demo Banners
 * 
 * This seeder creates sample banners for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const banners = [
      // Elite Club Championship Banner
      {
        id: '990e8400-e29b-41d4-a716-446655440001',
        title: 'Elite Club Championship 2024',
        subtitle: 'Join the most prestigious tournament of the year',
        image_url: 'https://example.com/banners/elite_championship_2024.jpg',
        thumbnail_url: 'https://example.com/banners/thumbnails/elite_championship_2024_thumb.jpg',
        action_url: '/tournaments/880e8400-e29b-41d4-a716-446655440001',
        action_text: 'Register Now',
        position: 1,
        is_active: true,
        is_featured: true,
        display_type: 'carousel',
        target_audience: 'all',
        start_date: new Date(2024, 4, 1, 0, 0, 0), // May 1, 2024
        end_date: new Date(2024, 5, 10, 23, 59, 59), // June 10, 2024
        related_tournament_id: '880e8400-e29b-41d4-a716-446655440001',
        related_club_id: '660e8400-e29b-41d4-a716-446655440001',
        click_count: 156,
        view_count: 1247,
        tags: JSON.stringify(['tournament', 'championship', 'elite', '2024']),
        metadata: JSON.stringify({
          priority: 'high',
          category: 'tournament',
          season: 'summer'
        }),
        notes: 'Main promotional banner for Elite Club Championship',
        created_at: now,
        updated_at: now
      },

      // Community Tournament Banner
      {
        id: '990e8400-e29b-41d4-a716-446655440002',
        title: 'Community Spring Tournament',
        subtitle: 'Fun tournament for all skill levels - Everyone welcome!',
        image_url: 'https://example.com/banners/community_spring_2024.jpg',
        thumbnail_url: 'https://example.com/banners/thumbnails/community_spring_2024_thumb.jpg',
        action_url: '/tournaments/880e8400-e29b-41d4-a716-446655440002',
        action_text: 'Learn More',
        position: 2,
        is_active: true,
        is_featured: false,
        display_type: 'carousel',
        target_audience: 'players',
        start_date: new Date(2024, 2, 1, 0, 0, 0), // March 1, 2024
        end_date: new Date(2024, 3, 15, 23, 59, 59), // April 15, 2024
        related_tournament_id: '880e8400-e29b-41d4-a716-446655440002',
        related_club_id: '660e8400-e29b-41d4-a716-446655440002',
        click_count: 89,
        view_count: 567,
        tags: JSON.stringify(['community', 'spring', 'recreational', 'beginner-friendly']),
        metadata: JSON.stringify({
          priority: 'medium',
          category: 'community',
          season: 'spring'
        }),
        notes: 'Community-focused tournament banner',
        created_at: now,
        updated_at: now
      },

      // Youth Championship Banner
      {
        id: '990e8400-e29b-41d4-a716-446655440003',
        title: 'Youth Pickleball Championship',
        subtitle: 'Developing the next generation of pickleball stars',
        image_url: 'https://example.com/banners/youth_championship_2024.jpg',
        thumbnail_url: 'https://example.com/banners/thumbnails/youth_championship_2024_thumb.jpg',
        action_url: '/tournaments/880e8400-e29b-41d4-a716-446655440003',
        action_text: 'Register Youth',
        position: 3,
        is_active: true,
        is_featured: true,
        display_type: 'carousel',
        target_audience: 'all',
        start_date: new Date(2024, 6, 1, 0, 0, 0), // July 1, 2024
        end_date: new Date(2024, 7, 5, 23, 59, 59), // August 5, 2024
        related_tournament_id: '880e8400-e29b-41d4-a716-446655440003',
        related_club_id: '660e8400-e29b-41d4-a716-446655440003',
        click_count: 234,
        view_count: 892,
        tags: JSON.stringify(['youth', 'championship', 'development', 'future-stars']),
        metadata: JSON.stringify({
          priority: 'high',
          category: 'youth',
          season: 'summer'
        }),
        notes: 'Youth development tournament banner',
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('banners', banners, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('banners', null, {});
  }
}; 