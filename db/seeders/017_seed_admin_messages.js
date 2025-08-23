/**
 * Admin Messages Seeder
 * 
 * Seeds the admin_messages table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get admin users from database
    const adminUsers = await queryInterface.sequelize.query(
      `SELECT id, full_name FROM users WHERE user_type = 'admin' ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (adminUsers.length < 2) {
      throw new Error('Not enough admin users found. Please run users seeder first.');
    }

    const adminMessages = [
      {
        id: uuidv4(),
        title: 'Nueva Plataforma de Pickleball México - ¡Bienvenidos!',
        content: `Estimados miembros de la comunidad de pickleball,

Nos complace anunciar el lanzamiento oficial de nuestra nueva plataforma digital de la Federación Mexicana de Pickleball.

Esta plataforma incluye:
• Sistema de registro y gestión de torneos
• Búsqueda de compañeros de juego
• Rankings nacionales en tiempo real
• Reserva de canchas en línea
• Credenciales digitales oficiales
• Sistema de mensajería entre jugadores

Agradecemos su paciencia durante la fase de desarrollo y esperamos que disfruten de estas nuevas funcionalidades.

¡Nos vemos en las canchas!

Federación Mexicana de Pickleball`,
        excerpt: 'Lanzamiento oficial de la nueva plataforma digital con funciones avanzadas para toda la comunidad.',
        message_type: 'announcement',
        priority: 'high',
        status: 'sent',
        sender_id: adminUsers[0].id,
        sender_name: adminUsers[0].full_name || 'Director Nacional',
        target_audience: 'all_users',
        target_filters: null,
        scheduled_send_at: new Date('2024-11-01T09:00:00Z'),
        sent_at: new Date('2024-11-01T09:02:15Z'),
        total_recipients: 1847,
        sent_count: 1847,
        read_count: 1423,
        click_count: 892,
        action_button_text: 'Explorar Funciones',
        action_button_url: '/dashboard',
        expires_at: null,
        is_pinned: true,
        send_via_email: true,
        send_via_notification: true,
        attachments: JSON.stringify([
          {
            name: 'guia_plataforma.pdf',
            url: 'https://storage.pickleballmexico.com/attachments/platform_guide.pdf',
            type: 'application/pdf',
            size: 2458960
          }
        ]),
        metadata: JSON.stringify({
          launch_campaign: true,
          marketing_campaign_id: 'platform_launch_2024',
          featured_on_homepage: true,
          press_release: true
        }),
        tags: JSON.stringify(['platform', 'launch', 'welcome', 'features', 'important']),
        created_at: new Date('2024-10-25T14:30:00Z'),
        updated_at: new Date('2024-11-01T09:02:15Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        title: 'Recordatorio: Renovación de Membresías 2025',
        content: `Estimados miembros,

Les recordamos que el período de renovación de membresías para el año 2025 está abierto.

Fechas importantes:
• Inicio de renovaciones: 1 de diciembre de 2024
• Descuento por pronto pago (10% de descuento): hasta el 31 de diciembre de 2024
• Fecha límite de renovación: 31 de enero de 2025

Beneficios de la membresía 2025:
• Acceso a todos los torneos nacionales
• Descuentos en registro de torneos
• Credencial digital oficial
• Acceso prioritario a canchas afiliadas
• Ranking nacional oficial

Para renovar su membresía, ingrese a su perfil y seleccione "Renovar Membresía".

¡Gracias por ser parte de nuestra comunidad!`,
        excerpt: 'Renovación de membresías 2025 abierta con descuento por pronto pago hasta el 31 de diciembre.',
        message_type: 'reminder',
        priority: 'medium',
        status: 'sent',
        sender_id: adminUsers[0].id,
        sender_name: adminUsers[0].full_name || 'Director Nacional',
        target_audience: 'all_users',
        target_filters: JSON.stringify({
          membership_status: ['active', 'expired'],
          exclude_new_members: true
        }),
        scheduled_send_at: new Date('2024-12-01T08:00:00Z'),
        sent_at: new Date('2024-12-01T08:01:30Z'),
        total_recipients: 1654,
        sent_count: 1654,
        read_count: 987,
        click_count: 234,
        action_button_text: 'Renovar Ahora',
        action_button_url: '/membership/renew',
        expires_at: new Date('2025-02-01T23:59:59Z'),
        is_pinned: false,
        send_via_email: true,
        send_via_notification: true,
        attachments: null,
        metadata: JSON.stringify({
          renewal_campaign: true,
          early_bird_discount: 0.10,
          deadline_reminders_scheduled: true
        }),
        tags: JSON.stringify(['membership', 'renewal', '2025', 'reminder', 'deadline']),
        created_at: new Date('2024-11-25T10:15:00Z'),
        updated_at: new Date('2024-12-01T08:01:30Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        title: 'Actualización de Seguridad - Acción Requerida',
        content: `IMPORTANTE - Actualización de Seguridad

Estimados usuarios,

Hemos implementado mejoras importantes de seguridad en nuestra plataforma para proteger mejor sus datos personales y de pago.

Cambios implementados:
• Autenticación de dos factores disponible
• Nuevos protocolos de encriptación de datos
• Verificación adicional para cambios de información sensible
• Monitoreo mejorado de actividad sospechosa

ACCIÓN REQUERIDA:
Por favor, actualice su contraseña y active la autenticación de dos factores en su perfil dentro de los próximos 7 días.

Su seguridad es nuestra prioridad.

Equipo Técnico
Federación Mexicana de Pickleball`,
        excerpt: 'Actualización crítica de seguridad - se requiere actualizar contraseña y activar 2FA.',
        message_type: 'alert',
        priority: 'urgent',
        status: 'sent',
        sender_id: adminUsers[1].id,
        sender_name: adminUsers[1].full_name || 'Administrador Técnico',
        target_audience: 'all_users',
        target_filters: null,
        scheduled_send_at: null,
        sent_at: new Date('2024-11-15T16:30:00Z'),
        total_recipients: 1847,
        sent_count: 1847,
        read_count: 1756,
        click_count: 1234,
        action_button_text: 'Actualizar Seguridad',
        action_button_url: '/profile/security',
        expires_at: new Date('2024-11-22T23:59:59Z'),
        is_pinned: true,
        send_via_email: true,
        send_via_notification: true,
        attachments: JSON.stringify([
          {
            name: 'guia_seguridad_2fa.pdf',
            url: 'https://storage.pickleballmexico.com/attachments/security_guide_2fa.pdf',
            type: 'application/pdf',
            size: 1024576
          }
        ]),
        metadata: JSON.stringify({
          security_update: true,
          compliance_requirement: true,
          deadline_enforced: true,
          follow_up_required: true
        }),
        tags: JSON.stringify(['security', 'urgent', '2fa', 'password', 'required_action']),
        created_at: new Date('2024-11-15T16:25:00Z'),
        updated_at: new Date('2024-11-15T16:30:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        title: 'Invitación Especial: Torneo de Exhibición de Navidad',
        content: `¡Celebremos la temporada navideña jugando pickleball!

Invitación especial al Torneo de Exhibición Navideño 2024

📅 Fecha: 21-22 de diciembre de 2024
🏆 Formato: Torneos por categorías con temática navideña
🎁 Premios especiales y regalos sorpresa
🍽️ Cena navideña incluida para todos los participantes

Categorías especiales:
• "Renos Voladores" (Juvenil)
• "Elfos Traviesos" (Recreativo)
• "Santa's Champions" (Competitivo)
• "Posada Mix" (Mixto familiar)

¡Venga con su familia y amigos!
Habrá actividades especiales para niños y un intercambio de regalos opcional.

Registro limitado a 120 participantes.

¡Ho ho ho, nos vemos en las canchas!`,
        excerpt: 'Invitación especial al Torneo de Exhibición Navideño con cena incluida y premios sorpresa.',
        message_type: 'announcement',
        priority: 'medium',
        status: 'scheduled',
        sender_id: adminUsers[0].id,
        sender_name: adminUsers[0].full_name || 'Director Nacional',
        target_audience: 'players_coaches',
        target_filters: JSON.stringify({
          exclude_states: [],
          membership_levels: ['basic', 'premium', 'elite'],
          active_players_only: true
        }),
        scheduled_send_at: new Date('2024-12-05T10:00:00Z'),
        sent_at: null,
        total_recipients: 0,
        sent_count: 0,
        read_count: 0,
        click_count: 0,
        action_button_text: 'Registrarse Ahora',
        action_button_url: '/tournaments/christmas-exhibition-2024',
        expires_at: new Date('2024-12-20T23:59:59Z'),
        is_pinned: false,
        send_via_email: true,
        send_via_notification: true,
        attachments: JSON.stringify([
          {
            name: 'christmas_tournament_poster.jpg',
            url: 'https://storage.pickleballmexico.com/attachments/christmas_2024_poster.jpg',
            type: 'image/jpeg',
            size: 3145728
          }
        ]),
        metadata: JSON.stringify({
          special_event: true,
          holiday_tournament: true,
          family_friendly: true,
          limited_capacity: 120,
          dinner_included: true
        }),
        tags: JSON.stringify(['tournament', 'christmas', 'exhibition', 'family', 'special']),
        created_at: new Date('2024-11-28T12:00:00Z'),
        updated_at: new Date('2024-11-28T12:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        title: 'Mantenimiento Programado del Sistema',
        content: `Estimados usuarios,

Les informamos que realizaremos un mantenimiento programado del sistema para mejorar el rendimiento y añadir nuevas funcionalidades.

📅 Fecha: Domingo 15 de diciembre de 2024
🕐 Horario: 02:00 - 06:00 AM (GMT-6)
⏰ Duración estimada: 4 horas

Durante este período:
❌ La plataforma no estará disponible
❌ No se podrán hacer reservas de canchas
❌ Los torneos en curso no se verán afectados
❌ Las notificaciones se enviarán después del mantenimiento

Nuevas funciones después del mantenimiento:
✅ Búsqueda mejorada de compañeros de juego
✅ Calendario personalizado de torneos
✅ Chat en tiempo real mejorado
✅ Estadísticas avanzadas de jugador

Disculpe las molestias y gracias por su comprensión.

Equipo Técnico`,
        excerpt: 'Mantenimiento programado del sistema el 15 de diciembre de 2:00-6:00 AM con nuevas funciones.',
        message_type: 'notification',
        priority: 'medium',
        status: 'draft',
        sender_id: adminUsers[1].id,
        sender_name: adminUsers[1].full_name || 'Administrador Técnico',
        target_audience: 'all_users',
        target_filters: null,
        scheduled_send_at: new Date('2024-12-10T18:00:00Z'),
        sent_at: null,
        total_recipients: 0,
        sent_count: 0,
        read_count: 0,
        click_count: 0,
        action_button_text: 'Ver Detalles',
        action_button_url: '/system/maintenance-schedule',
        expires_at: new Date('2024-12-16T12:00:00Z'),
        is_pinned: false,
        send_via_email: false,
        send_via_notification: true,
        attachments: null,
        metadata: JSON.stringify({
          maintenance_window: {
            start: '2024-12-15T08:00:00Z',
            end: '2024-12-15T12:00:00Z'
          },
          affected_services: ['web_platform', 'mobile_app', 'court_booking'],
          new_features: ['enhanced_player_finder', 'tournament_calendar', 'improved_chat', 'advanced_stats']
        }),
        tags: JSON.stringify(['maintenance', 'system', 'downtime', 'features', 'technical']),
        created_at: new Date('2024-12-02T15:30:00Z'),
        updated_at: new Date('2024-12-02T15:30:00Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('admin_messages', adminMessages, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin_messages', null, {});
  }
};