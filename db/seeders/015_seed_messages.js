/**
 * Messages Seeder
 * 
 * Seeds the messages table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get users from database
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users ORDER BY created_at LIMIT 15`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length < 10) {
      throw new Error('Not enough users found. Please run users seeder first.');
    }

    const threadId1 = uuidv4();
    const threadId2 = uuidv4();
    const message1Id = uuidv4();
    const message3Id = uuidv4();

    const messages = [
      {
        id: message1Id,
        subject: 'Invitación a juego de dobles - Este sábado',
        content: 'Hola! ¿Te interesaría jugar dobles este sábado por la mañana? Tengo reservada una cancha en el Club Deportivo Guadalajara de 10:00 a 12:00. Somos nivel 4.0-4.5. ¡Sería genial tenerte en el juego!',
        message_type: 'match_request',
        sender_id: users[0].id,
        recipient_id: users[1].id,
        parent_message_id: null,
        thread_id: threadId1,
        priority: 'normal',
        is_read: true,
        read_at: new Date('2024-11-20T16:45:00Z'),
        is_archived_by_sender: false,
        is_archived_by_recipient: false,
        is_starred_by_sender: false,
        is_starred_by_recipient: true,
        sender_deleted_at: null,
        recipient_deleted_at: null,
        attachments: null,
        metadata: JSON.stringify({
          match_details: {
            date: '2024-11-23',
            time: '10:00-12:00',
            location: 'Club Deportivo Guadalajara',
            skill_level: '4.0-4.5',
            match_type: 'doubles'
          }
        }),
        expires_at: new Date('2024-11-23T12:00:00Z'),
        delivery_status: 'delivered',
        created_at: new Date('2024-11-20T14:30:00Z'),
        updated_at: new Date('2024-11-20T16:45:00Z')
      },
      {
        id: uuidv4(),
        subject: 'Re: Invitación a juego de dobles - Este sábado',
        content: '¡Excelente! Me encantaría jugar. Confirmo para el sábado 10:00 AM. ¿Necesito llevar pelotas o ya tienes? También, ¿quiénes son los otros dos jugadores?',
        message_type: 'direct_message',
        sender_id: users[1].id,
        recipient_id: users[0].id,
        parent_message_id: message1Id,
        thread_id: threadId1,
        priority: 'normal',
        is_read: true,
        read_at: new Date('2024-11-20T18:20:00Z'),
        is_archived_by_sender: false,
        is_archived_by_recipient: false,
        is_starred_by_sender: false,
        is_starred_by_recipient: false,
        sender_deleted_at: null,
        recipient_deleted_at: null,
        attachments: null,
        metadata: JSON.stringify({
          reply_to_match_request: true
        }),
        expires_at: null,
        delivery_status: 'delivered',
        created_at: new Date('2024-11-20T17:15:00Z'),
        updated_at: new Date('2024-11-20T18:20:00Z')
      },
      {
        id: message3Id,
        subject: 'Búsqueda de entrenador para hijo adolescente',
        content: 'Buenas tardes,\n\nEstoy buscando un entrenador de pickleball para mi hijo de 16 años. Es principiante pero muy entusiasta. ¿Ofrecen clases para jóvenes? Preferimos horarios de fin de semana.\n\nGracias por su tiempo.',
        message_type: 'direct_message',
        sender_id: users[2].id,
        recipient_id: users[3].id,
        parent_message_id: null,
        thread_id: threadId2,
        priority: 'normal',
        is_read: false,
        read_at: null,
        is_archived_by_sender: false,
        is_archived_by_recipient: false,
        is_starred_by_sender: false,
        is_starred_by_recipient: false,
        sender_deleted_at: null,
        recipient_deleted_at: null,
        attachments: null,
        metadata: JSON.stringify({
          coaching_inquiry: true,
          student_age: 16,
          skill_level: 'beginner'
        }),
        expires_at: null,
        delivery_status: 'delivered',
        created_at: new Date('2024-11-22T15:20:00Z'),
        updated_at: new Date('2024-11-22T15:20:00Z')
      },
      {
        id: uuidv4(),
        subject: 'Confirmación de registro - Torneo Guadalajara Open',
        content: 'Estimado participante,\n\nSu registro para el Torneo Guadalajara Open 2024 ha sido confirmado exitosamente.\n\nDetalles:\n- División: Dobles Profesional\n- Fecha: 15-17 de diciembre\n- Lugar: Club Deportivo Guadalajara\n- Número de equipo: #03\n\nRecibirá más información sobre horarios una semana antes del evento.\n\n¡Nos vemos en las canchas!',
        message_type: 'tournament_notification',
        sender_id: users[9].id,
        recipient_id: users[0].id,
        parent_message_id: null,
        thread_id: null,
        priority: 'high',
        is_read: true,
        read_at: new Date('2024-10-15T14:35:00Z'),
        is_archived_by_sender: false,
        is_archived_by_recipient: true,
        is_starred_by_sender: false,
        is_starred_by_recipient: true,
        sender_deleted_at: null,
        recipient_deleted_at: null,
        attachments: JSON.stringify([
          {
            name: 'reglamento_torneo.pdf',
            url: 'https://storage.pickleballmexico.com/tournaments/guadalajara_open_rules.pdf',
            type: 'application/pdf',
            size: 1048576
          }
        ]),
        metadata: JSON.stringify({
          tournament_id: 'guadalajara_open_2024',
          team_number: 3,
          division: 'professional_doubles',
          confirmation_code: 'GO2024-001234'
        }),
        expires_at: null,
        delivery_status: 'delivered',
        created_at: new Date('2024-10-15T14:25:00Z'),
        updated_at: new Date('2024-10-15T14:35:00Z')
      },
      {
        id: uuidv4(),
        subject: 'Pago procesado exitosamente',
        content: 'Su pago de $2,500.00 MXN para el registro del torneo ha sido procesado exitosamente.\n\nDetalles del pago:\n- Monto: $2,500.00 MXN\n- Método: Tarjeta de crédito\n- Referencia: TXN-240001234\n- Fecha: 15 de octubre, 2024\n\nEste recibo sirve como comprobante de pago.',
        message_type: 'payment_notification',
        sender_id: users[9].id,
        recipient_id: users[0].id,
        parent_message_id: null,
        thread_id: null,
        priority: 'high',
        is_read: true,
        read_at: new Date('2024-10-15T14:28:00Z'),
        is_archived_by_sender: false,
        is_archived_by_recipient: false,
        is_starred_by_sender: false,
        is_starred_by_recipient: false,
        sender_deleted_at: null,
        recipient_deleted_at: null,
        attachments: JSON.stringify([
          {
            name: 'recibo_pago_torneo.pdf',
            url: 'https://storage.pickleballmexico.com/receipts/payment_240001234.pdf',
            type: 'application/pdf',
            size: 256789
          }
        ]),
        metadata: JSON.stringify({
          payment_amount: 2500.00,
          payment_method: 'credit_card',
          transaction_id: 'TXN-240001234',
          payment_for: 'tournament_registration'
        }),
        expires_at: null,
        delivery_status: 'delivered',
        created_at: new Date('2024-10-15T14:26:30Z'),
        updated_at: new Date('2024-10-15T14:28:00Z')
      }
    ];

    await queryInterface.bulkInsert('messages', messages, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};