/**
 * Admin Message Recipients Seeder
 * 
 * Seeds the admin_message_recipients table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get admin messages and users from database
    const adminMessages = await queryInterface.sequelize.query(
      `SELECT id, status FROM admin_messages WHERE status = 'sent' ORDER BY created_at LIMIT 3`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const users = await queryInterface.sequelize.query(
      `SELECT id, email, full_name, user_type FROM users ORDER BY created_at LIMIT 20`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (adminMessages.length < 2 || users.length < 10) {
      throw new Error('Not enough admin messages or users found. Please run previous seeders first.');
    }

    const recipients = [];

    // Create recipients for the first admin message (platform launch - all users read it)
    for (let i = 0; i < 10; i++) {
      recipients.push({
        id: uuidv4(),
        admin_message_id: adminMessages[0].id,
        recipient_id: users[i].id,
        recipient_email: users[i].email,
        recipient_name: users[i].full_name,
        recipient_type: users[i].user_type,
        delivery_status: 'delivered',
        sent_at: new Date('2024-11-01T09:02:15Z'),
        delivered_at: new Date('2024-11-01T09:02:45Z'),
        read_at: new Date(`2024-11-${String(i + 1).padStart(2, '0')}T${String(10 + i).padStart(2, '0')}:30:00Z`),
        clicked_at: i < 7 ? new Date(`2024-11-${String(i + 1).padStart(2, '0')}T${String(10 + i).padStart(2, '0')}:35:00Z`) : null,
        error_message: null,
        is_dismissed: false,
        dismissed_at: null,
        created_at: new Date('2024-11-01T09:02:15Z'),
        updated_at: new Date(`2024-11-${String(i + 1).padStart(2, '0')}T${String(10 + i).padStart(2, '0')}:35:00Z`)
      });
    }

    // Create recipients for the second admin message (membership renewal reminder)
    for (let i = 10; i < 18; i++) {
      const userIndex = i - 10;
      const isRead = userIndex < 6;
      const isClicked = userIndex < 3;
      
      recipients.push({
        id: uuidv4(),
        admin_message_id: adminMessages[1].id,
        recipient_id: users[i].id,
        recipient_email: users[i].email,
        recipient_name: users[i].full_name,
        recipient_type: users[i].user_type,
        delivery_status: 'delivered',
        sent_at: new Date('2024-12-01T08:01:30Z'),
        delivered_at: new Date('2024-12-01T08:02:00Z'),
        read_at: isRead ? new Date(`2024-12-0${userIndex + 2}T09:${String(15 + userIndex * 5).padStart(2, '0')}:00Z`) : null,
        clicked_at: isClicked ? new Date(`2024-12-0${userIndex + 2}T09:${String(20 + userIndex * 5).padStart(2, '0')}:00Z`) : null,
        error_message: null,
        is_dismissed: userIndex === 7,
        dismissed_at: userIndex === 7 ? new Date('2024-12-03T14:30:00Z') : null,
        created_at: new Date('2024-12-01T08:01:30Z'),
        updated_at: isRead ? new Date(`2024-12-0${userIndex + 2}T09:${String(20 + userIndex * 5).padStart(2, '0')}:00Z`) : new Date('2024-12-01T08:02:00Z')
      });
    }

    // Create recipients for the third admin message (security alert - high engagement)
    for (let i = 0; i < 15; i++) {
      const isRead = i < 14;
      const isClicked = i < 12;
      const isFailed = i === 14; // One failed delivery
      
      recipients.push({
        id: uuidv4(),
        admin_message_id: adminMessages[2].id,
        recipient_id: users[i].id,
        recipient_email: users[i].email,
        recipient_name: users[i].full_name,
        recipient_type: users[i].user_type,
        delivery_status: isFailed ? 'failed' : 'delivered',
        sent_at: new Date('2024-11-15T16:30:00Z'),
        delivered_at: isFailed ? null : new Date('2024-11-15T16:30:30Z'),
        read_at: isRead ? new Date(`2024-11-15T${String(17 + Math.floor(i / 3)).padStart(2, '0')}:${String((i % 3) * 15 + 10).padStart(2, '0')}:00Z`) : null,
        clicked_at: isClicked ? new Date(`2024-11-15T${String(17 + Math.floor(i / 3)).padStart(2, '0')}:${String((i % 3) * 15 + 15).padStart(2, '0')}:00Z`) : null,
        error_message: isFailed ? 'SMTP Error: Invalid email address format' : null,
        is_dismissed: false,
        dismissed_at: null,
        created_at: new Date('2024-11-15T16:30:00Z'),
        updated_at: isRead ? new Date(`2024-11-15T${String(17 + Math.floor(i / 3)).padStart(2, '0')}:${String((i % 3) * 15 + 15).padStart(2, '0')}:00Z`) : new Date('2024-11-15T16:30:30Z')
      });
    }

    await queryInterface.bulkInsert('admin_message_recipients', recipients, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin_message_recipients', null, {});
  }
};