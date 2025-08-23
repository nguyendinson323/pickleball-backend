/**
 * Digital Credentials Seeder
 * 
 * Seeds the digital_credentials table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get player and coach users from database
    const users = await queryInterface.sequelize.query(
      `SELECT id, full_name, state, skill_level FROM users WHERE user_type IN ('player', 'coach') ORDER BY created_at LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const clubs = await queryInterface.sequelize.query(
      `SELECT id, name FROM clubs ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length < 5) {
      throw new Error('Not enough users found. Please run users seeder first.');
    }

    const digitalCredentials = [
      {
        id: uuidv4(),
        user_id: users[0].id,
        credential_number: 'PSFMX-2024-001234',
        verification_code: 'VRF-789ABC',
        federation_name: 'Federación Mexicana de Pickleball',
        federation_logo: 'https://storage.pickleballmexico.com/federation/logo_official.png',
        player_name: users[0].full_name || 'Miguel Ángel Torres García',
        nrtp_level: users[0].skill_level || '4.5',
        state_affiliation: users[0].state || 'Jalisco',
        nationality: 'Mexicana',
        affiliation_status: 'active',
        ranking_position: 15,
        club_status: 'club_member',
        club_name: clubs.length > 0 ? clubs[0].name : 'Club Deportivo Guadalajara',
        qr_code_url: 'https://qr.pickleballmexico.com/credentials/PSFMX-2024-001234.png',
        qr_code_data: JSON.stringify({
          credential_id: 'PSFMX-2024-001234',
          verification_code: 'VRF-789ABC',
          player_name: users[0].full_name || 'Miguel Ángel Torres García',
          nrtp_level: users[0].skill_level || '4.5',
          state: users[0].state || 'Jalisco',
          issued_date: '2024-03-15',
          verification_url: 'https://verify.pickleballmexico.com/VRF-789ABC'
        }),
        issued_date: new Date('2024-03-15T10:00:00Z'),
        expiry_date: new Date('2025-03-15T23:59:59Z'),
        last_verified: new Date('2024-11-18T14:30:00Z'),
        verification_count: 23,
        is_verified: true,
        verification_notes: 'Digital credential verified at multiple tournaments. Player identity confirmed with official documents.',
        metadata: JSON.stringify({
          issued_by: 'Regional Director - Jalisco',
          tournament_participations: 18,
          last_tournament: 'Guadalajara Open 2024',
          membership_tier: 'Professional',
          photo_verified: true,
          document_types_verified: ['INE', 'CURP']
        }),
        created_at: new Date('2024-03-15T10:00:00Z'),
        updated_at: new Date('2024-11-18T14:30:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[1].id,
        credential_number: 'PSFMX-2024-002567',
        verification_code: 'VRF-456DEF',
        federation_name: 'Federación Mexicana de Pickleball',
        federation_logo: 'https://storage.pickleballmexico.com/federation/logo_official.png',
        player_name: users[1].full_name || 'María Elena González Martínez',
        nrtp_level: users[1].skill_level || '4.0',
        state_affiliation: users[1].state || 'Nuevo León',
        nationality: 'Mexicana',
        affiliation_status: 'active',
        ranking_position: 28,
        club_status: 'club_member',
        club_name: clubs.length > 1 ? clubs[1].name : 'Monterrey Pickleball Academy',
        qr_code_url: 'https://qr.pickleballmexico.com/credentials/PSFMX-2024-002567.png',
        qr_code_data: JSON.stringify({
          credential_id: 'PSFMX-2024-002567',
          verification_code: 'VRF-456DEF',
          player_name: users[1].full_name || 'María Elena González Martínez',
          nrtp_level: users[1].skill_level || '4.0',
          state: users[1].state || 'Nuevo León',
          issued_date: '2024-05-20',
          verification_url: 'https://verify.pickleballmexico.com/VRF-456DEF'
        }),
        issued_date: new Date('2024-05-20T11:30:00Z'),
        expiry_date: new Date('2025-05-20T23:59:59Z'),
        last_verified: new Date('2024-11-10T16:45:00Z'),
        verification_count: 14,
        is_verified: true,
        verification_notes: 'Coach credential with teaching certification verified. Academy association confirmed.',
        metadata: JSON.stringify({
          issued_by: 'Regional Director - Nuevo León',
          coaching_certification: 'Level 2 Instructor',
          students_coached: 45,
          academy_affiliation: true,
          specializations: ['Youth Development', 'Singles Strategy'],
          background_check: 'completed'
        }),
        created_at: new Date('2024-05-20T11:30:00Z'),
        updated_at: new Date('2024-11-10T16:45:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[2].id,
        credential_number: 'PSFMX-2024-003890',
        verification_code: 'VRF-123GHI',
        federation_name: 'Federación Mexicana de Pickleball',
        federation_logo: 'https://storage.pickleballmexico.com/federation/logo_official.png',
        player_name: users[2].full_name || 'Roberto Carlos Silva Mendoza',
        nrtp_level: users[2].skill_level || '3.5',
        state_affiliation: users[2].state || 'Querétaro',
        nationality: 'Mexicana',
        affiliation_status: 'active',
        ranking_position: 45,
        club_status: 'club_member',
        club_name: clubs.length > 2 ? clubs[2].name : 'Centro Recreativo Querétaro',
        qr_code_url: 'https://qr.pickleballmexico.com/credentials/PSFMX-2024-003890.png',
        qr_code_data: JSON.stringify({
          credential_id: 'PSFMX-2024-003890',
          verification_code: 'VRF-123GHI',
          player_name: users[2].full_name || 'Roberto Carlos Silva Mendoza',
          nrtp_level: users[2].skill_level || '3.5',
          state: users[2].state || 'Querétaro',
          issued_date: '2024-07-08',
          verification_url: 'https://verify.pickleballmexico.com/VRF-123GHI'
        }),
        issued_date: new Date('2024-07-08T14:15:00Z'),
        expiry_date: new Date('2025-07-08T23:59:59Z'),
        last_verified: new Date('2024-10-20T17:20:00Z'),
        verification_count: 8,
        is_verified: true,
        verification_notes: 'Senior player credential verified. Age group tournament participation confirmed.',
        metadata: JSON.stringify({
          issued_by: 'Regional Director - Querétaro',
          age_category: '55+',
          senior_tournaments: 4,
          recreational_focus: true,
          medical_clearance: 'on_file',
          emergency_contact: 'verified'
        }),
        created_at: new Date('2024-07-08T14:15:00Z'),
        updated_at: new Date('2024-10-20T17:20:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[3].id,
        credential_number: 'PSFMX-2024-004123',
        verification_code: 'VRF-987JKL',
        federation_name: 'Federación Mexicana de Pickleball',
        federation_logo: 'https://storage.pickleballmexico.com/federation/logo_official.png',
        player_name: users[3].full_name || 'Carlos Eduardo Ramírez López',
        nrtp_level: users[3].skill_level || '5.0',
        state_affiliation: users[3].state || 'Quintana Roo',
        nationality: 'Mexicana',
        affiliation_status: 'active',
        ranking_position: 8,
        club_status: 'club_member',
        club_name: clubs.length > 3 ? clubs[3].name : 'Cancún Beach Pickleball Resort',
        qr_code_url: 'https://qr.pickleballmexico.com/credentials/PSFMX-2024-004123.png',
        qr_code_data: JSON.stringify({
          credential_id: 'PSFMX-2024-004123',
          verification_code: 'VRF-987JKL',
          player_name: users[3].full_name || 'Carlos Eduardo Ramírez López',
          nrtp_level: users[3].skill_level || '5.0',
          state: users[3].state || 'Quintana Roo',
          issued_date: '2024-02-10',
          verification_url: 'https://verify.pickleballmexico.com/VRF-987JKL'
        }),
        issued_date: new Date('2024-02-10T09:45:00Z'),
        expiry_date: new Date('2025-02-10T23:59:59Z'),
        last_verified: new Date('2024-11-20T10:15:00Z'),
        verification_count: 35,
        is_verified: true,
        verification_notes: 'Elite player credential. International tournament participation verified. Resort professional status confirmed.',
        metadata: JSON.stringify({
          issued_by: 'National Director',
          professional_status: 'Resort Pro',
          international_tournaments: 12,
          ranking_points: 3650,
          beach_specialist: true,
          languages: ['Spanish', 'English', 'French'],
          resort_certification: 'active'
        }),
        created_at: new Date('2024-02-10T09:45:00Z'),
        updated_at: new Date('2024-11-20T10:15:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        user_id: users[4].id,
        credential_number: 'PSFMX-2024-005456',
        verification_code: 'VRF-654MNO',
        federation_name: 'Federación Mexicana de Pickleball',
        federation_logo: 'https://storage.pickleballmexico.com/federation/logo_official.png',
        player_name: users[4].full_name || 'Ana Lucía Fernández Morales',
        nrtp_level: users[4].skill_level || '3.0',
        state_affiliation: users[4].state || 'Puebla',
        nationality: 'Mexicana',
        affiliation_status: 'expired',
        ranking_position: 78,
        club_status: 'independent',
        club_name: null,
        qr_code_url: 'https://qr.pickleballmexico.com/credentials/PSFMX-2024-005456.png',
        qr_code_data: JSON.stringify({
          credential_id: 'PSFMX-2024-005456',
          verification_code: 'VRF-654MNO',
          player_name: users[4].full_name || 'Ana Lucía Fernández Morales',
          nrtp_level: users[4].skill_level || '3.0',
          state: users[4].state || 'Puebla',
          issued_date: '2023-08-15',
          expiry_date: '2024-08-15',
          status: 'EXPIRED',
          verification_url: 'https://verify.pickleballmexico.com/VRF-654MNO'
        }),
        issued_date: new Date('2023-08-15T13:20:00Z'),
        expiry_date: new Date('2024-08-15T23:59:59Z'),
        last_verified: new Date('2024-07-10T11:30:00Z'),
        verification_count: 5,
        is_verified: false,
        verification_notes: 'EXPIRED CREDENTIAL - Player did not renew annual registration. Last tournament participation: Puebla State Championship 2024.',
        metadata: JSON.stringify({
          issued_by: 'Regional Director - Puebla',
          expiry_reason: 'annual_renewal_not_completed',
          last_tournament: 'Puebla State Championship 2024',
          renewal_reminders_sent: 3,
          grace_period_expired: true,
          eligible_for_renewal: true
        }),
        created_at: new Date('2023-08-15T13:20:00Z'),
        updated_at: new Date('2024-08-16T00:00:00Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('digital_credentials', digitalCredentials, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('digital_credentials', null, {});
  }
};