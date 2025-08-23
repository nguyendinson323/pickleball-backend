/**
 * Court Reservations Seeder
 * 
 * Seeds the court_reservations table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get courts, users, clubs, and payments from database
    const courts = await queryInterface.sequelize.query(
      `SELECT id, club_id, hourly_rate FROM courts ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'player' ORDER BY created_at LIMIT 10`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const clubs = await queryInterface.sequelize.query(
      `SELECT id FROM clubs ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const payments = await queryInterface.sequelize.query(
      `SELECT id FROM payments WHERE payment_type = 'court_rental' ORDER BY created_at LIMIT 3`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (courts.length < 3 || users.length < 5 || clubs.length < 3) {
      throw new Error('Not enough related records found. Please run previous seeders first.');
    }

    const courtReservations = [
      {
        id: uuidv4(),
        court_id: courts[0].id,
        user_id: users[0].id,
        club_id: courts[0].club_id || clubs[0].id,
        start_time: new Date('2024-11-25T18:00:00Z'),
        end_time: new Date('2024-11-25T21:00:00Z'),
        reservation_date: new Date('2024-11-25'),
        duration_hours: '3.00',
        purpose: 'Training session with coach for tournament preparation',
        match_type: 'doubles',
        participants: JSON.stringify([
          {
            name: 'Miguel Torres',
            role: 'primary_player',
            user_id: users[0].id
          },
          {
            name: 'Carlos González',
            role: 'partner',
            user_id: users[1].id
          },
          {
            name: 'Coach Roberto',
            role: 'coach',
            external: true
          }
        ]),
        guest_count: 1,
        hourly_rate: '450.00',
        total_amount: '1350.00',
        member_discount: '100.00',
        final_amount: '1250.00',
        payment_status: 'completed',
        payment_id: payments.length > 0 ? payments[0].id : null,
        status: 'completed',
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: '0.00',
        special_requests: 'Please have court net height checked before session. Need equipment storage space.',
        equipment_needed: JSON.stringify([
          'practice_balls',
          'ball_machine',
          'scoreboard'
        ]),
        notes: 'Excellent training session. Court was in perfect condition. Coach very satisfied with facilities.',
        checked_in_at: new Date('2024-11-25T17:55:30Z'),
        checked_out_at: new Date('2024-11-25T21:05:45Z'),
        actual_start_time: new Date('2024-11-25T18:02:15Z'),
        actual_end_time: new Date('2024-11-25T20:58:30Z'),
        rating: 5,
        feedback: 'Perfect court conditions, great lighting, and excellent customer service. Will definitely book again.',
        booking_source: 'web',
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        created_at: new Date('2024-11-20T14:30:00Z'),
        updated_at: new Date('2024-11-25T21:10:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        court_id: courts[1].id,
        user_id: users[2].id,
        club_id: courts[1].club_id || clubs[1].id,
        start_time: new Date('2024-12-05T10:00:00Z'),
        end_time: new Date('2024-12-05T12:00:00Z'),
        reservation_date: new Date('2024-12-05'),
        duration_hours: '2.00',
        purpose: 'Youth coaching session - skill development',
        match_type: 'lesson',
        participants: JSON.stringify([
          {
            name: 'Ana Martínez',
            role: 'student',
            user_id: users[2].id,
            age: 16
          },
          {
            name: 'Luis Rodríguez',
            role: 'student',
            user_id: users[3].id,
            age: 15
          },
          {
            name: 'Coach María',
            role: 'instructor',
            external: true
          }
        ]),
        guest_count: 0,
        hourly_rate: '380.00',
        total_amount: '760.00',
        member_discount: '60.00',
        final_amount: '700.00',
        payment_status: 'completed',
        payment_id: null,
        status: 'confirmed',
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: '0.00',
        special_requests: 'Youth session - please ensure parental consent forms are available. Need extra balls for drills.',
        equipment_needed: JSON.stringify([
          'practice_balls',
          'cones',
          'training_paddles'
        ]),
        notes: 'Upcoming youth coaching session. Parents will be present for observation.',
        checked_in_at: null,
        checked_out_at: null,
        actual_start_time: null,
        actual_end_time: null,
        rating: null,
        feedback: null,
        booking_source: 'phone',
        ip_address: null,
        user_agent: null,
        created_at: new Date('2024-11-28T09:15:00Z'),
        updated_at: new Date('2024-11-28T09:15:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        court_id: courts[2].id,
        user_id: users[4].id,
        club_id: courts[2].club_id || clubs[2].id,
        start_time: new Date('2024-11-30T15:00:00Z'),
        end_time: new Date('2024-11-30T17:00:00Z'),
        reservation_date: new Date('2024-11-30'),
        duration_hours: '2.00',
        purpose: 'Senior recreational doubles match',
        match_type: 'doubles',
        participants: JSON.stringify([
          {
            name: 'Roberto Silva',
            role: 'primary_player',
            user_id: users[4].id
          },
          {
            name: 'Carmen López',
            role: 'partner',
            user_id: users[5].id
          },
          {
            name: 'Eduardo Mendoza',
            role: 'opponent_1',
            external: true
          },
          {
            name: 'Luz Fernández',
            role: 'opponent_2',
            external: true
          }
        ]),
        guest_count: 2,
        hourly_rate: '250.00',
        total_amount: '500.00',
        member_discount: '50.00',
        final_amount: '450.00',
        payment_status: 'completed',
        payment_id: null,
        status: 'completed',
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: '0.00',
        special_requests: 'Senior group - please provide shade seating area between games for rest periods.',
        equipment_needed: JSON.stringify([
          'water_station',
          'first_aid_kit',
          'shade_umbrella'
        ]),
        notes: 'Regular senior group booking. Very friendly and appreciative players.',
        checked_in_at: new Date('2024-11-30T14:50:00Z'),
        checked_out_at: new Date('2024-11-30T17:15:00Z'),
        actual_start_time: new Date('2024-11-30T15:05:00Z'),
        actual_end_time: new Date('2024-11-30T17:10:00Z'),
        rating: 4,
        feedback: 'Good outdoor court. Would appreciate better shade options during hot afternoons.',
        booking_source: 'in_person',
        ip_address: null,
        user_agent: null,
        created_at: new Date('2024-11-25T11:00:00Z'),
        updated_at: new Date('2024-11-30T17:20:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        court_id: courts[3].id,
        user_id: users[6].id,
        club_id: courts[3].club_id || clubs[3].id,
        start_time: new Date('2024-12-10T19:00:00Z'),
        end_time: new Date('2024-12-10T22:00:00Z'),
        reservation_date: new Date('2024-12-10'),
        duration_hours: '3.00',
        purpose: 'Beach resort vacation tournament practice',
        match_type: 'mixed_doubles',
        participants: JSON.stringify([
          {
            name: 'Carlos Ramírez',
            role: 'primary_player',
            user_id: users[6].id
          },
          {
            name: 'Sofia Martinez',
            role: 'partner',
            user_id: users[7].id
          }
        ]),
        guest_count: 0,
        hourly_rate: '650.00',
        total_amount: '1950.00',
        member_discount: '0.00',
        final_amount: '1950.00',
        payment_status: 'pending',
        payment_id: null,
        status: 'confirmed',
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: '0.00',
        special_requests: 'Premium beachfront court for sunset practice session. Photography permitted for vacation memories.',
        equipment_needed: JSON.stringify([
          'premium_balls',
          'towel_service',
          'refreshments'
        ]),
        notes: 'VIP beach court reservation for tournament-bound couple. Premium experience expected.',
        checked_in_at: null,
        checked_out_at: null,
        actual_start_time: null,
        actual_end_time: null,
        rating: null,
        feedback: null,
        booking_source: 'web',
        ip_address: '201.175.84.102',
        user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        created_at: new Date('2024-12-01T20:30:00Z'),
        updated_at: new Date('2024-12-01T20:30:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        court_id: courts[4].id,
        user_id: users[8].id,
        club_id: courts[4].club_id || clubs[4].id,
        start_time: new Date('2024-11-22T16:00:00Z'),
        end_time: new Date('2024-11-22T18:00:00Z'),
        reservation_date: new Date('2024-11-22'),
        duration_hours: '2.00',
        purpose: 'Team practice for state championship',
        match_type: 'practice',
        participants: JSON.stringify([
          {
            name: 'María González',
            role: 'team_captain',
            user_id: users[8].id
          },
          {
            name: 'Felipe Torres',
            role: 'team_member',
            user_id: users[9].id
          }
        ]),
        guest_count: 0,
        hourly_rate: '320.00',
        total_amount: '640.00',
        member_discount: '80.00',
        final_amount: '560.00',
        payment_status: 'failed',
        payment_id: null,
        status: 'cancelled',
        cancelled_at: new Date('2024-11-22T10:30:00Z'),
        cancelled_by: users[8].id,
        cancellation_reason: 'Payment processing failed - unable to resolve before reservation time',
        refund_amount: '0.00',
        special_requests: 'Championship preparation session - need video recording setup if possible.',
        equipment_needed: JSON.stringify([
          'professional_balls',
          'video_camera',
          'timing_equipment'
        ]),
        notes: 'CANCELLED - Payment issues could not be resolved in time. Team rescheduled for following week.',
        checked_in_at: null,
        checked_out_at: null,
        actual_start_time: null,
        actual_end_time: null,
        rating: null,
        feedback: null,
        booking_source: 'mobile',
        ip_address: '187.141.162.205',
        user_agent: 'PickleballMexico/2.1.0 (iOS 16.0; iPhone 13 Pro)',
        created_at: new Date('2024-11-20T09:45:00Z'),
        updated_at: new Date('2024-11-22T10:30:00Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('court_reservations', courtReservations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('court_reservations', null, {});
  }
};