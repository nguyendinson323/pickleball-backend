/**
 * Seeder: Demo File Uploads
 * 
 * This seeder creates sample file uploads for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const fileUploads = [
      // Tournament Banner Image
      {
        id: 'dd0e8400-e29b-41d4-a716-446655440001',
        user_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        tournament_id: '880e8400-e29b-41d4-a716-446655440001',
        original_name: 'elite_championship_banner.jpg',
        file_name: 'elite_championship_banner_20240615.jpg',
        file_path: '/uploads/tournaments/elite_championship_banner_20240615.jpg',
        file_url: 'https://example.com/uploads/tournaments/elite_championship_banner_20240615.jpg',
        file_type: 'image',
        mime_type: 'image/jpeg',
        file_size: 2048576,
        file_extension: 'jpg',
        width: 1920,
        height: 1080,
        thumbnail_url: 'https://example.com/uploads/tournaments/thumbnails/elite_championship_banner_20240615_thumb.jpg',
        is_public: true,
        is_approved: true,
        is_deleted: false,
        description: 'Official banner for Elite Club Championship 2024',
        tags: JSON.stringify(['tournament', 'banner', 'championship', '2024']),
        metadata: JSON.stringify({
          tournament_name: 'Elite Club Championship 2024',
          upload_purpose: 'tournament_banner',
          image_quality: 'high',
          color_profile: 'RGB'
        }),
        access_token: null,
        expires_at: null,
        download_count: 45,
        view_count: 234,
        created_at: now,
        updated_at: now
      },

      // Player Profile Photo
      {
        id: 'dd0e8400-e29b-41d4-a716-446655440002',
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        tournament_id: null,
        original_name: 'john_smith_profile.jpg',
        file_name: 'john_smith_profile_20240610.jpg',
        file_path: '/uploads/profiles/john_smith_profile_20240610.jpg',
        file_url: 'https://example.com/uploads/profiles/john_smith_profile_20240610.jpg',
        file_type: 'image',
        mime_type: 'image/jpeg',
        file_size: 512000,
        file_extension: 'jpg',
        width: 400,
        height: 400,
        thumbnail_url: 'https://example.com/uploads/profiles/thumbnails/john_smith_profile_20240610_thumb.jpg',
        is_public: true,
        is_approved: true,
        is_deleted: false,
        description: 'Profile photo for John Smith',
        tags: JSON.stringify(['profile', 'player', 'john_smith']),
        metadata: JSON.stringify({
          player_name: 'John Smith',
          upload_purpose: 'profile_photo',
          image_quality: 'medium',
          aspect_ratio: '1:1'
        }),
        access_token: null,
        expires_at: null,
        download_count: 12,
        view_count: 89,
        created_at: now,
        updated_at: now
      },

      // Tournament Rules Document
      {
        id: 'dd0e8400-e29b-41d4-a716-446655440003',
        user_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        tournament_id: '880e8400-e29b-41d4-a716-446655440001',
        original_name: 'tournament_rules_2024.pdf',
        file_name: 'tournament_rules_20240615.pdf',
        file_path: '/uploads/documents/tournament_rules_20240615.pdf',
        file_url: 'https://example.com/uploads/documents/tournament_rules_20240615.pdf',
        file_type: 'document',
        mime_type: 'application/pdf',
        file_size: 1048576,
        file_extension: 'pdf',
        width: null,
        height: null,
        thumbnail_url: null,
        is_public: true,
        is_approved: true,
        is_deleted: false,
        description: 'Official tournament rules and regulations for Elite Club Championship 2024',
        tags: JSON.stringify(['document', 'rules', 'tournament', 'championship']),
        metadata: JSON.stringify({
          tournament_name: 'Elite Club Championship 2024',
          document_type: 'rules',
          page_count: 8,
          language: 'English'
        }),
        access_token: 'access_token_123456789',
        expires_at: new Date(2024, 11, 31, 23, 59, 59),
        download_count: 156,
        view_count: 445,
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('file_uploads', fileUploads, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('file_uploads', null, {});
  }
}; 