/**
 * Seeder: Demo Court Reservations
 * 
 * This seeder creates sample court reservations for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const courtReservations = [
      // John's Court Reservation
      {
        id: '550e8400-e29b-41d4-a716-446655440030',
        court_id: '770e8400-e29b-41d4-a716-446655440001', // Elite Court 1
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        club_id: '660e8400-e29b-41d4-a716-446655440001', // Elite Pickleball Club
        start_time: new Date(2024, 5, 10, 18, 0, 0), // June 10, 2024 6:00 PM
        end_time: new Date(2024, 5, 10, 20, 0, 0), // June 10, 2024 8:00 PM
        reservation_date: '2024-06-10',
        duration_hours: 2.00,
        purpose: 'Doubles match with friends',
        match_type: 'doubles',
        participants: JSON.stringify([
          { name: 'John Smith', user_id: '550e8400-e29b-41d4-a716-446655440002' },
          { name: 'Partner 1', user_id: null },
          { name: 'Partner 2', user_id: null },
          { name: 'Partner 3', user_id: null }
        ]),
        guest_count: 3,
        hourly_rate: 250.00,
        total_amount: 500.00,
        member_discount: 100.00,
        final_amount: 400.00,
        payment_status: 'completed',
        payment_id: 'bb0e8400-e29b-41d4-a716-446655440002',
        status: 'completed',
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: 0.00,
        special_requests: 'Prefer indoor court if available',
        equipment_needed: JSON.stringify(['paddles', 'balls']),
        notes: 'Great session, court was in excellent condition',
        checked_in_at: new Date(2024, 5, 10, 17, 55, 0),
        checked_out_at: new Date(2024, 5, 10, 20, 5, 0),
        actual_start_time: new Date(2024, 5, 10, 18, 0, 0),
        actual_end_time: new Date(2024, 5, 10, 20, 0, 0),
        rating: 5,
        feedback: 'Excellent court and facilities. Will definitely book again!',
        booking_source: 'web',
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        created_at: now,
        updated_at: now
      },

      // Community Court Reservation
      {
        id: '550e8400-e29b-41d4-a716-446655440031',
        court_id: '770e8400-e29b-41d4-a716-446655440003', // Community Court A
        user_id: '550e8400-e29b-41d4-a716-446655440002', // john_player
        club_id: '660e8400-e29b-41d4-a716-446655440002', // Community Pickleball Center
        start_time: new Date(2024, 3, 15, 14, 0, 0), // April 15, 2024 2:00 PM
        end_time: new Date(2024, 3, 15, 16, 0, 0), // April 15, 2024 4:00 PM
        reservation_date: '2024-04-15',
        duration_hours: 2.00,
        purpose: 'Practice session',
        match_type: 'practice',
        participants: JSON.stringify([
          { name: 'John Smith', user_id: '550e8400-e29b-41d4-a716-446655440002' }
        ]),
        guest_count: 0,
        hourly_rate: 50.00,
        total_amount: 100.00,
        member_discount: 25.00,
        final_amount: 75.00,
        payment_status: 'completed',
        payment_id: null,
        status: 'completed',
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: 0.00,
        special_requests: null,
        equipment_needed: JSON.stringify(['paddles', 'balls']),
        notes: 'Good practice session',
        checked_in_at: new Date(2024, 3, 15, 13, 55, 0),
        checked_out_at: new Date(2024, 3, 15, 16, 5, 0),
        actual_start_time: new Date(2024, 3, 15, 14, 0, 0),
        actual_end_time: new Date(2024, 3, 15, 16, 0, 0),
        rating: 4,
        feedback: 'Good court for practice, friendly staff',
        booking_source: 'mobile',
        ip_address: '192.168.1.101',
        user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
        created_at: now,
        updated_at: now
      },

      // Future Reservation
      {
        id: '550e8400-e29b-41d4-a716-446655440032',
        court_id: '770e8400-e29b-41d4-a716-446655440002', // Elite Court 2
        user_id: '550e8400-e29b-41d4-a716-446655440001', // superadmin
        club_id: '660e8400-e29b-41d4-a716-446655440001', // Elite Pickleball Club
        start_time: new Date(2024, 7, 20, 10, 0, 0), // August 20, 2024 10:00 AM
        end_time: new Date(2024, 7, 20, 12, 0, 0), // August 20, 2024 12:00 PM
        reservation_date: '2024-08-20',
        duration_hours: 2.00,
        purpose: 'Coaching session',
        match_type: 'lesson',
        participants: JSON.stringify([
          { name: 'Super Admin', user_id: '550e8400-e29b-41d4-a716-446655440001' },
          { name: 'Student 1', user_id: null },
          { name: 'Student 2', user_id: null }
        ]),
        guest_count: 2,
        hourly_rate: 200.00,
        total_amount: 400.00,
        member_discount: 0.00,
        final_amount: 400.00,
        payment_status: 'pending',
        payment_id: null,
        status: 'confirmed',
        cancelled_at: null,
        cancelled_by: null,
        cancellation_reason: null,
        refund_amount: 0.00,
        special_requests: 'Need coaching equipment and video recording setup',
        equipment_needed: JSON.stringify(['paddles', 'balls', 'video_camera', 'coaching_materials']),
        notes: 'Advanced coaching session for intermediate players',
        checked_in_at: null,
        checked_out_at: null,
        actual_start_time: null,
        actual_end_time: null,
        rating: null,
        feedback: null,
        booking_source: 'web',
        ip_address: '192.168.1.102',
        user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('court_reservations', courtReservations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('court_reservations', null, {});
  }
}; 