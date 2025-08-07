/**
 * Seeder: Demo Users
 * 
 * This seeder creates sample users for testing and development.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const now = new Date();

    const users = [
      // Super Admin
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        username: 'superadmin',
        email: 'admin@pickleballfederation.mx',
        password_hash: hashedPassword,
        first_name: 'Super',
        last_name: 'Administrator',
        full_name: 'Super Administrator',
        date_of_birth: '1980-01-15',
        gender: 'male',
        phone: '+52-55-1234-5678',
        profile_photo: 'https://example.com/photos/admin.jpg',
        bio: 'System administrator for Pickleball Federation',
        user_type: 'super_admin',
        role: 'super_admin',
        skill_level: '5.0',
        membership_status: 'elite',
        membership_expires_at: new Date(2025, 11, 31),
        email_verified: true,
        is_active: true,
        is_verified: true,
        last_login: now,
        state: 'Jalisco',
        city: 'Guadalajara',
        address: 'Av. Vallarta 1234, Guadalajara, Jalisco',
        latitude: 20.6597,
        longitude: -103.3496,
        timezone: 'America/Mexico_City',
        preferences: JSON.stringify({ notifications: true, language: 'es' }),
        created_at: now,
        updated_at: now
      },

      // Player
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        username: 'john_player',
        email: 'john@email.com',
        password_hash: hashedPassword,
        first_name: 'John',
        last_name: 'Smith',
        full_name: 'John Smith',
        date_of_birth: '1990-03-15',
        gender: 'male',
        phone: '+52-55-6789-0123',
        profile_photo: 'https://example.com/photos/john.jpg',
        bio: 'Intermediate player looking for regular matches',
        user_type: 'player',
        role: 'user',
        skill_level: '3.5',
        membership_status: 'premium',
        membership_expires_at: new Date(2025, 11, 31),
        email_verified: true,
        is_active: true,
        is_verified: true,
        last_login: now,
        state: 'Jalisco',
        city: 'Guadalajara',
        address: 'Calle Libertad 123, Guadalajara, Jalisco',
        latitude: 20.6597,
        longitude: -103.3496,
        timezone: 'America/Mexico_City',
        preferences: JSON.stringify({ notifications: true, language: 'en' }),
        created_at: now,
        updated_at: now
      },

      // Club
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        username: 'elite_club',
        email: 'info@elitepickleball.com',
        password_hash: hashedPassword,
        first_name: 'Elite',
        last_name: 'Pickleball Club',
        full_name: 'Elite Pickleball Club',
        date_of_birth: '1990-01-01',
        gender: 'other',
        phone: '+52-55-4567-8901',
        profile_photo: 'https://example.com/photos/elite_club.jpg',
        bio: 'Premium pickleball club with multiple courts',
        user_type: 'club',
        role: 'user',
        skill_level: null,
        membership_status: 'premium',
        membership_expires_at: new Date(2025, 11, 31),
        email_verified: true,
        is_active: true,
        is_verified: true,
        last_login: now,
        state: 'Jalisco',
        city: 'Guadalajara',
        address: 'Av. Chapultepec 456, Guadalajara, Jalisco',
        latitude: 20.6597,
        longitude: -103.3496,
        timezone: 'America/Mexico_City',
        preferences: JSON.stringify({ notifications: true, language: 'es' }),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
}; 