'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const courtReservations = [
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        court_id: '550e8400-e29b-41d4-a716-446655440020', // Indoor Court 1
        reservation_date: '2024-03-20',
        start_time: '14:00',
        end_time: '16:00',
        duration_hours: 2,
        total_price: 25.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Regular practice session',
        created_at: new Date('2024-03-18T09:15:00Z'),
        updated_at: new Date('2024-03-18T09:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440003', // Mike Club Owner
        court_id: '550e8400-e29b-41d4-a716-446655440021', // Outdoor Court 3
        reservation_date: '2024-03-22',
        start_time: '10:00',
        end_time: '11:00',
        duration_hours: 1,
        total_price: 15.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Morning practice',
        created_at: new Date('2024-03-20T08:45:00Z'),
        updated_at: new Date('2024-03-20T08:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        court_id: '550e8400-e29b-41d4-a716-446655440022', // Indoor Court 2
        reservation_date: '2024-03-25',
        start_time: '09:00',
        end_time: '11:00',
        duration_hours: 2,
        total_price: 30.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Tournament preparation',
        created_at: new Date('2024-03-21T14:30:00Z'),
        updated_at: new Date('2024-03-21T14:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        court_id: '550e8400-e29b-41d4-a716-446655440023', // Indoor Court 3
        reservation_date: '2024-03-23',
        start_time: '16:00',
        end_time: '18:00',
        duration_hours: 2,
        total_price: 25.00,
        payment_status: 'pending',
        status: 'pending',
        notes: 'Doubles match with friends',
        created_at: new Date('2024-03-22T10:20:00Z'),
        updated_at: new Date('2024-03-22T10:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        court_id: '550e8400-e29b-41d4-a716-446655440024', // Outdoor Court 1
        reservation_date: '2024-03-24',
        start_time: '14:00',
        end_time: '15:00',
        duration_hours: 1,
        total_price: 12.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Beginner lesson',
        created_at: new Date('2024-03-23T11:45:00Z'),
        updated_at: new Date('2024-03-23T11:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        court_id: '550e8400-e29b-41d4-a716-446655440025', // Outdoor Court 2
        reservation_date: '2024-03-26',
        start_time: '07:00',
        end_time: '09:00',
        duration_hours: 2,
        total_price: 20.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Early morning practice',
        created_at: new Date('2024-03-24T16:15:00Z'),
        updated_at: new Date('2024-03-24T16:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        court_id: '550e8400-e29b-41d4-a716-446655440020', // Indoor Court 1
        reservation_date: '2024-03-27',
        start_time: '18:00',
        end_time: '20:00',
        duration_hours: 2,
        total_price: 25.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Advanced training session',
        created_at: new Date('2024-03-25T09:30:00Z'),
        updated_at: new Date('2024-03-25T09:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        court_id: '550e8400-e29b-41d4-a716-446655440021', // Outdoor Court 3
        reservation_date: '2024-03-28',
        start_time: '15:00',
        end_time: '17:00',
        duration_hours: 2,
        total_price: 20.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Weekend doubles',
        created_at: new Date('2024-03-26T13:20:00Z'),
        updated_at: new Date('2024-03-26T13:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        court_id: '550e8400-e29b-41d4-a716-446655440022', // Indoor Court 2
        reservation_date: '2024-03-29',
        start_time: '10:00',
        end_time: '12:00',
        duration_hours: 2,
        total_price: 30.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Tournament practice',
        created_at: new Date('2024-03-27T15:45:00Z'),
        updated_at: new Date('2024-03-27T15:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440005', // David Player
        court_id: '550e8400-e29b-41d4-a716-446655440023', // Indoor Court 3
        reservation_date: '2024-03-30',
        start_time: '19:00',
        end_time: '21:00',
        duration_hours: 2,
        total_price: 25.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Evening league match',
        created_at: new Date('2024-03-28T12:10:00Z'),
        updated_at: new Date('2024-03-28T12:10:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440006', // Emma Player
        court_id: '550e8400-e29b-41d4-a716-446655440024', // Outdoor Court 1
        reservation_date: '2024-03-31',
        start_time: '13:00',
        end_time: '14:00',
        duration_hours: 1,
        total_price: 12.00,
        payment_status: 'pending',
        status: 'pending',
        notes: 'Sunday practice',
        created_at: new Date('2024-03-29T10:30:00Z'),
        updated_at: new Date('2024-03-29T10:30:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440008', // Anna Player
        court_id: '550e8400-e29b-41d4-a716-446655440025', // Outdoor Court 2
        reservation_date: '2024-04-01',
        start_time: '08:00',
        end_time: '10:00',
        duration_hours: 2,
        total_price: 20.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Morning training',
        created_at: new Date('2024-03-30T14:20:00Z'),
        updated_at: new Date('2024-03-30T14:20:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440009', // Chris Player
        court_id: '550e8400-e29b-41d4-a716-446655440020', // Indoor Court 1
        reservation_date: '2024-04-02',
        start_time: '17:00',
        end_time: '19:00',
        duration_hours: 2,
        total_price: 25.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Coaching session',
        created_at: new Date('2024-03-31T11:15:00Z'),
        updated_at: new Date('2024-03-31T11:15:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440001', // John Player
        court_id: '550e8400-e29b-41d4-a716-446655440021', // Outdoor Court 3
        reservation_date: '2024-04-03',
        start_time: '16:00',
        end_time: '18:00',
        duration_hours: 2,
        total_price: 20.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Team practice',
        created_at: new Date('2024-04-01T09:45:00Z'),
        updated_at: new Date('2024-04-01T09:45:00Z')
      },
      {
        id: uuidv4(),
        user_id: '550e8400-e29b-41d4-a716-446655440004', // Lisa Player
        court_id: '550e8400-e29b-41d4-a716-446655440022', // Indoor Court 2
        reservation_date: '2024-04-04',
        start_time: '11:00',
        end_time: '13:00',
        duration_hours: 2,
        total_price: 30.00,
        payment_status: 'paid',
        status: 'confirmed',
        notes: 'Tournament preparation',
        created_at: new Date('2024-04-02T16:30:00Z'),
        updated_at: new Date('2024-04-02T16:30:00Z')
      }
    ];

    await queryInterface.bulkInsert('court_reservations', courtReservations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('court_reservations', null, {});
  }
}; 