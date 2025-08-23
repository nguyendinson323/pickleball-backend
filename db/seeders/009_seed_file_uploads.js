/**
 * File Uploads Seeder
 * 
 * Seeds the file_uploads table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get users and tournaments from database
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users ORDER BY created_at LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const tournaments = await queryInterface.sequelize.query(
      `SELECT id FROM tournaments ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length < 5) {
      throw new Error('Not enough users found. Please run users seeder first.');
    }

    const fileUploads = [
      {
        id: uuidv4(),
        user_id: users[0].id,
        tournament_id: tournaments.length > 0 ? tournaments[0].id : null,
        original_name: 'guadalajara_open_banner.jpg',
        file_name: '2024_guadalajara_open_banner_1234567890.jpg',
        file_path: '/uploads/tournaments/2024/guadalajara_open_banner_1234567890.jpg',
        file_url: 'https://storage.pickleballmexico.com/tournaments/2024/guadalajara_open_banner_1234567890.jpg',
        file_type: 'image',
        mime_type: 'image/jpeg',
        file_size: 2457600,
        file_extension: 'jpg',
        width: 1920,
        height: 1080,
        thumbnail_url: 'https://storage.pickleballmexico.com/thumbnails/guadalajara_open_banner_thumb_1234567890.jpg',
        is_public: true,
        is_approved: true,
        is_deleted: false,
        description: 'Official banner image for Guadalajara Open 2024 professional pickleball tournament',
        tags: JSON.stringify(['tournament', 'banner', 'guadalajara', 'professional', '2024']),
        metadata: JSON.stringify({
          upload_source: 'tournament_admin',
          image_quality: 'high',
          color_profile: 'sRGB',
          camera_make: 'Canon',
          camera_model: 'EOS R5',
          photographer: 'Carlos Martinez Photography'
        }),
        access_token: null,
        expires_at: null,
        download_count: 145,
        view_count: 3267,
        created_at: new Date('2024-09-15T10:30:00Z'),
        updated_at: new Date('2024-11-01T14:22:15Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[1].id,
        tournament_id: null,
        original_name: 'profile_photo_maria.png',
        file_name: 'user_profile_maria_gonzalez_9876543210.png',
        file_path: '/uploads/profiles/user_profile_maria_gonzalez_9876543210.png',
        file_url: 'https://storage.pickleballmexico.com/profiles/user_profile_maria_gonzalez_9876543210.png',
        file_type: 'profile_photo',
        mime_type: 'image/png',
        file_size: 524288,
        file_extension: 'png',
        width: 400,
        height: 400,
        thumbnail_url: 'https://storage.pickleballmexico.com/thumbnails/user_profile_maria_gonzalez_thumb_9876543210.png',
        is_public: false,
        is_approved: true,
        is_deleted: false,
        description: 'Profile photo for Maria Gonzalez - Coach at Monterrey Academy',
        tags: JSON.stringify(['profile', 'coach', 'monterrey', 'verified']),
        metadata: JSON.stringify({
          upload_source: 'mobile_app',
          face_detection: true,
          image_filters: 'none',
          upload_device: 'iPhone 14 Pro'
        }),
        access_token: null,
        expires_at: null,
        download_count: 23,
        view_count: 189,
        created_at: new Date('2024-08-20T16:45:30Z'),
        updated_at: new Date('2024-08-20T16:45:30Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[2].id,
        tournament_id: tournaments.length > 1 ? tournaments[1].id : null,
        original_name: 'tournament_rules_youth_championship.pdf',
        file_name: 'monterrey_youth_championship_rules_5555666677.pdf',
        file_path: '/uploads/documents/monterrey_youth_championship_rules_5555666677.pdf',
        file_url: 'https://storage.pickleballmexico.com/documents/monterrey_youth_championship_rules_5555666677.pdf',
        file_type: 'document',
        mime_type: 'application/pdf',
        file_size: 1048576,
        file_extension: 'pdf',
        width: null,
        height: null,
        thumbnail_url: 'https://storage.pickleballmexico.com/thumbnails/pdf_thumb_5555666677.png',
        is_public: true,
        is_approved: true,
        is_deleted: false,
        description: 'Official tournament rules and regulations for Monterrey Youth Championship 2024',
        tags: JSON.stringify(['tournament', 'rules', 'youth', 'monterrey', 'official']),
        metadata: JSON.stringify({
          document_version: '2.1',
          page_count: 12,
          language: 'Spanish',
          revision_date: '2024-10-01',
          approved_by: 'Tournament Director'
        }),
        access_token: null,
        expires_at: null,
        download_count: 234,
        view_count: 678,
        created_at: new Date('2024-10-05T09:15:45Z'),
        updated_at: new Date('2024-10-05T09:15:45Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[3].id,
        tournament_id: null,
        original_name: 'club_logo_queretaro.svg',
        file_name: 'queretaro_club_logo_8888999900.svg',
        file_path: '/uploads/logos/queretaro_club_logo_8888999900.svg',
        file_url: 'https://storage.pickleballmexico.com/logos/queretaro_club_logo_8888999900.svg',
        file_type: 'logo',
        mime_type: 'image/svg+xml',
        file_size: 65536,
        file_extension: 'svg',
        width: 200,
        height: 200,
        thumbnail_url: 'https://storage.pickleballmexico.com/thumbnails/queretaro_club_logo_thumb_8888999900.png',
        is_public: true,
        is_approved: true,
        is_deleted: false,
        description: 'Official logo for Centro Recreativo Querétaro Pickleball club',
        tags: JSON.stringify(['logo', 'club', 'queretaro', 'branding', 'official']),
        metadata: JSON.stringify({
          vector_format: true,
          color_palette: ['#1E40AF', '#F59E0B', '#FFFFFF'],
          design_software: 'Adobe Illustrator',
          logo_variants: ['full', 'icon', 'text']
        }),
        access_token: null,
        expires_at: null,
        download_count: 89,
        view_count: 445,
        created_at: new Date('2024-07-10T11:20:30Z'),
        updated_at: new Date('2024-07-10T11:20:30Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[4].id,
        tournament_id: tournaments.length > 2 ? tournaments[2].id : null,
        original_name: 'match_video_highlights.mp4',
        file_name: 'cancun_beach_cup_highlights_7777888899.mp4',
        file_path: '/uploads/videos/cancun_beach_cup_highlights_7777888899.mp4',
        file_url: 'https://storage.pickleballmexico.com/videos/cancun_beach_cup_highlights_7777888899.mp4',
        file_type: 'video',
        mime_type: 'video/mp4',
        file_size: 52428800,
        file_extension: 'mp4',
        width: 1920,
        height: 1080,
        thumbnail_url: 'https://storage.pickleballmexico.com/thumbnails/video_thumb_7777888899.jpg',
        is_public: false,
        is_approved: false,
        is_deleted: false,
        description: 'Tournament highlights video from Cancún Beach Paradise Cup finals match',
        tags: JSON.stringify(['video', 'highlights', 'cancun', 'finals', 'beach']),
        metadata: JSON.stringify({
          duration_seconds: 480,
          video_codec: 'H.264',
          audio_codec: 'AAC',
          frame_rate: '30fps',
          bitrate: '8000kbps',
          pending_approval: true
        }),
        access_token: 'temp_access_xyz789abc',
        expires_at: new Date('2025-02-20T23:59:59Z'),
        download_count: 0,
        view_count: 12,
        created_at: new Date('2025-02-17T20:30:45Z'),
        updated_at: new Date('2025-02-17T20:30:45Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('file_uploads', fileUploads, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('file_uploads', null, {});
  }
};