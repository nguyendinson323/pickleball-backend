'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fileUploads = [
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        file_name: 'profile_photo_john.jpg',
        original_name: 'john_profile.jpg',
        file_path: '/uploads/profiles/john_profile_20240315.jpg',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/profiles/john_profile_20240315.jpg',
        file_size: 245760,
        mime_type: 'image/jpeg',
        file_type: 'profile_photo',
        upload_type: 'profile',
        metadata: JSON.stringify({
          width: 800,
          height: 600,
          format: 'JPEG'
        }),
        is_public: true,
        created_at: new Date('2024-03-15T10:00:00Z'),
        updated_at: new Date('2024-03-15T10:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        file_name: 'tournament_certificate_lisa.pdf',
        original_name: 'lisa_tournament_cert.pdf',
        file_path: '/uploads/certificates/lisa_tournament_cert_20240312.pdf',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/certificates/lisa_tournament_cert_20240312.pdf',
        file_size: 512000,
        mime_type: 'application/pdf',
        file_type: 'certificate',
        upload_type: 'tournament',
        metadata: JSON.stringify({
          tournament_name: 'Pro Division Championship',
          issue_date: '2024-03-12',
          certificate_type: 'winner'
        }),
        is_public: true,
        created_at: new Date('2024-03-12T16:45:00Z'),
        updated_at: new Date('2024-03-12T16:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440003', // Mike Club Owner
        file_name: 'club_logo_mike.png',
        original_name: 'elite_club_logo.png',
        file_path: '/uploads/clubs/elite_club_logo_20240301.png',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/clubs/elite_club_logo_20240301.png',
        file_size: 102400,
        mime_type: 'image/png',
        file_type: 'logo',
        upload_type: 'club',
        metadata: JSON.stringify({
          width: 400,
          height: 400,
          format: 'PNG',
          club_id: '550e8400-e29b-41d4-a716-446655440030'
        }),
        is_public: true,
        created_at: new Date('2024-03-01T10:00:00Z'),
        updated_at: new Date('2024-03-01T10:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440002', // Sarah Coach
        file_name: 'coaching_cert_sarah.pdf',
        original_name: 'sarah_coaching_cert.pdf',
        file_path: '/uploads/certificates/sarah_coaching_cert_20240308.pdf',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/certificates/sarah_coaching_cert_20240308.pdf',
        file_size: 768000,
        mime_type: 'application/pdf',
        file_type: 'certificate',
        upload_type: 'coaching',
        metadata: JSON.stringify({
          certification_type: 'advanced_coaching',
          issue_date: '2024-03-08',
          valid_until: '2026-03-08'
        }),
        is_public: false,
        created_at: new Date('2024-03-08T09:00:00Z'),
        updated_at: new Date('2024-03-08T09:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        file_name: 'medical_clearance_david.pdf',
        original_name: 'david_medical_clearance.pdf',
        file_path: '/uploads/medical/david_medical_clearance_20240320.pdf',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/medical/david_medical_clearance_20240320.pdf',
        file_size: 256000,
        mime_type: 'application/pdf',
        file_type: 'medical',
        upload_type: 'tournament',
        metadata: JSON.stringify({
          doctor_name: 'Dr. Smith',
          issue_date: '2024-03-20',
          valid_until: '2025-03-20'
        }),
        is_public: false,
        created_at: new Date('2024-03-20T11:45:00Z'),
        updated_at: new Date('2024-03-20T11:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        file_name: 'profile_photo_emma.jpg',
        original_name: 'emma_profile.jpg',
        file_path: '/uploads/profiles/emma_profile_20240315.jpg',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/profiles/emma_profile_20240315.jpg',
        file_size: 184320,
        mime_type: 'image/jpeg',
        file_type: 'profile_photo',
        upload_type: 'profile',
        metadata: JSON.stringify({
          width: 600,
          height: 600,
          format: 'JPEG'
        }),
        is_public: true,
        created_at: new Date('2024-03-15T11:00:00Z'),
        updated_at: new Date('2024-03-15T11:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440007', // Tom Club Owner
        file_name: 'club_brochure_tom.pdf',
        original_name: 'elite_club_brochure.pdf',
        file_path: '/uploads/clubs/elite_club_brochure_20240301.pdf',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/clubs/elite_club_brochure_20240301.pdf',
        file_size: 1536000,
        mime_type: 'application/pdf',
        file_type: 'brochure',
        upload_type: 'club',
        metadata: JSON.stringify({
          pages: 4,
          club_id: '550e8400-e29b-41d4-a716-446655440030',
          language: 'English'
        }),
        is_public: true,
        created_at: new Date('2024-03-01T10:05:00Z'),
        updated_at: new Date('2024-03-01T10:05:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        file_name: 'tournament_photo_anna.jpg',
        original_name: 'anna_tournament_photo.jpg',
        file_path: '/uploads/tournaments/anna_tournament_photo_20240316.jpg',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/tournaments/anna_tournament_photo_20240316.jpg',
        file_size: 307200,
        mime_type: 'image/jpeg',
        file_type: 'photo',
        upload_type: 'tournament',
        metadata: JSON.stringify({
          width: 1200,
          height: 800,
          format: 'JPEG',
          tournament_id: '550e8400-e29b-41d4-a716-446655440013'
        }),
        is_public: true,
        created_at: new Date('2024-03-16T12:15:00Z'),
        updated_at: new Date('2024-03-16T12:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        file_name: 'coaching_video_chris.mp4',
        original_name: 'chris_coaching_tips.mp4',
        file_path: '/uploads/videos/chris_coaching_tips_20240320.mp4',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/videos/chris_coaching_tips_20240320.mp4',
        file_size: 52428800,
        mime_type: 'video/mp4',
        file_type: 'video',
        upload_type: 'coaching',
        metadata: JSON.stringify({
          duration: 300,
          resolution: '1920x1080',
          format: 'MP4'
        }),
        is_public: true,
        created_at: new Date('2024-03-20T18:00:00Z'),
        updated_at: new Date('2024-03-20T18:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440010', // Maria Player
        file_name: 'profile_photo_maria.jpg',
        original_name: 'maria_profile.jpg',
        file_path: '/uploads/profiles/maria_profile_20240312.jpg',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/profiles/maria_profile_20240312.jpg',
        file_size: 204800,
        mime_type: 'image/jpeg',
        file_type: 'profile_photo',
        upload_type: 'profile',
        metadata: JSON.stringify({
          width: 700,
          height: 700,
          format: 'JPEG'
        }),
        is_public: true,
        created_at: new Date('2024-03-12T09:00:00Z'),
        updated_at: new Date('2024-03-12T09:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440011', // Robert Player
        file_name: 'tournament_registration_robert.pdf',
        original_name: 'robert_registration_form.pdf',
        file_path: '/uploads/forms/robert_registration_form_20240327.pdf',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/forms/robert_registration_form_20240327.pdf',
        file_size: 128000,
        mime_type: 'application/pdf',
        file_type: 'form',
        upload_type: 'tournament',
        metadata: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440020',
          form_type: 'registration',
          submission_date: '2024-03-27'
        }),
        is_public: false,
        created_at: new Date('2024-03-27T16:20:00Z'),
        updated_at: new Date('2024-03-27T16:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440012', // Jennifer Player
        file_name: 'tournament_highlight_jennifer.mp4',
        original_name: 'jennifer_highlight_reel.mp4',
        file_path: '/uploads/videos/jennifer_highlight_reel_20240326.mp4',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/videos/jennifer_highlight_reel_20240326.mp4',
        file_size: 104857600,
        mime_type: 'video/mp4',
        file_type: 'video',
        upload_type: 'tournament',
        metadata: JSON.stringify({
          duration: 180,
          resolution: '1920x1080',
          format: 'MP4',
          tournament_id: '550e8400-e29b-41d4-a716-446655440019'
        }),
        is_public: true,
        created_at: new Date('2024-03-26T13:45:00Z'),
        updated_at: new Date('2024-03-26T13:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440013', // Michael Player
        file_name: 'parent_consent_michael.pdf',
        original_name: 'michael_parent_consent.pdf',
        file_path: '/uploads/forms/michael_parent_consent_20240318.pdf',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/forms/michael_parent_consent_20240318.pdf',
        file_size: 96000,
        mime_type: 'application/pdf',
        file_type: 'form',
        upload_type: 'tournament',
        metadata: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440015',
          form_type: 'parent_consent',
          parent_name: 'John Michael'
        }),
        is_public: false,
        created_at: new Date('2024-03-18T14:20:00Z'),
        updated_at: new Date('2024-03-18T14:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        file_name: 'tournament_bracket_john.pdf',
        original_name: 'spring_championship_bracket.pdf',
        file_path: '/uploads/tournaments/spring_championship_bracket_20240325.pdf',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/tournaments/spring_championship_bracket_20240325.pdf',
        file_size: 384000,
        mime_type: 'application/pdf',
        file_type: 'bracket',
        upload_type: 'tournament',
        metadata: JSON.stringify({
          tournament_id: '550e8400-e29b-41d4-a716-446655440010',
          bracket_type: 'singles_intermediate',
          round: 'final'
        }),
        is_public: true,
        created_at: new Date('2024-03-25T10:00:00Z'),
        updated_at: new Date('2024-03-25T10:00:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        file_name: 'coaching_plan_lisa.pdf',
        original_name: 'lisa_coaching_plan.pdf',
        file_path: '/uploads/coaching/lisa_coaching_plan_20240322.pdf',
        file_url: 'https://pickleball-federation.s3.amazonaws.com/coaching/lisa_coaching_plan_20240322.pdf',
        file_size: 192000,
        mime_type: 'application/pdf',
        file_type: 'plan',
        upload_type: 'coaching',
        metadata: JSON.stringify({
          plan_type: 'training_plan',
          duration: '8_weeks',
          skill_level: 'advanced'
        }),
        is_public: false,
        created_at: new Date('2024-03-22T15:30:00Z'),
        updated_at: new Date('2024-03-22T15:30:00Z')
      }
    ];

    await queryInterface.bulkInsert('file_uploads', fileUploads, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('file_uploads', null, {});
  }
}; 