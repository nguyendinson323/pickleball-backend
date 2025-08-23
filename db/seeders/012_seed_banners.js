/**
 * Banners Seeder
 * 
 * Seeds the banners table with sample data
 * Ensures all data types match the migration schema exactly
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get tournaments and clubs from database
    const tournaments = await queryInterface.sequelize.query(
      `SELECT id FROM tournaments ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const clubs = await queryInterface.sequelize.query(
      `SELECT id FROM clubs ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const banners = [
      {
        id: uuidv4(),
        title: 'Guadalajara Open 2024 - ¡Regístrate Ahora!',
        subtitle: 'Torneo profesional de pickleball con más de $125,000 MXN en premios',
        image_url: 'https://storage.pickleballmexico.com/banners/guadalajara_open_2024_main.jpg',
        thumbnail_url: 'https://storage.pickleballmexico.com/banners/thumbnails/guadalajara_open_2024_thumb.jpg',
        action_url: '/tournaments/guadalajara-open-2024/register',
        action_text: 'Regístrate Ahora',
        position: 1,
        is_active: true,
        is_featured: true,
        display_type: 'carousel',
        target_audience: 'all',
        start_date: new Date('2024-09-15T00:00:00Z'),
        end_date: new Date('2024-12-01T23:59:59Z'),
        related_tournament_id: tournaments.length > 0 ? tournaments[0].id : null,
        related_club_id: clubs.length > 0 ? clubs[0].id : null,
        related_event_id: null,
        click_count: 847,
        view_count: 12456,
        tags: JSON.stringify(['tournament', 'professional', 'guadalajara', 'registration', 'featured']),
        metadata: JSON.stringify({
          campaign_id: 'guadalajara_open_2024_main',
          designer: 'Marketing Team',
          color_scheme: ['#1E40AF', '#F59E0B', '#FFFFFF'],
          call_to_action_performance: 'high',
          target_demographics: 'professional_players'
        }),
        notes: 'Main promotional banner for Guadalajara Open 2024. High-performing banner with excellent conversion rate.',
        created_at: new Date('2024-09-15T09:00:00Z'),
        updated_at: new Date('2024-11-15T14:30:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        title: 'Únete a Nuestros Clubes Afiliados',
        subtitle: 'Descubre clubes de pickleball cerca de ti y encuentra tu comunidad perfecta',
        image_url: 'https://storage.pickleballmexico.com/banners/clubs_network_banner.jpg',
        thumbnail_url: 'https://storage.pickleballmexico.com/banners/thumbnails/clubs_network_thumb.jpg',
        action_url: '/clubs/find-near-me',
        action_text: 'Buscar Clubes',
        position: 2,
        is_active: true,
        is_featured: false,
        display_type: 'carousel',
        target_audience: 'players',
        start_date: new Date('2024-08-01T00:00:00Z'),
        end_date: null,
        related_tournament_id: null,
        related_club_id: null,
        related_event_id: null,
        click_count: 423,
        view_count: 8901,
        tags: JSON.stringify(['clubs', 'network', 'community', 'find', 'membership']),
        metadata: JSON.stringify({
          campaign_id: 'clubs_network_promotion',
          geolocation_enabled: true,
          success_metric: 'club_inquiries',
          conversion_rate: 0.047,
          target_states: 'all'
        }),
        notes: 'Evergreen banner promoting club membership and community building.',
        created_at: new Date('2024-08-01T10:00:00Z'),
        updated_at: new Date('2024-10-20T16:45:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        title: 'Capacitación de Entrenadores Certificados',
        subtitle: 'Programa de certificación oficial - Próxima clase en enero 2025',
        image_url: 'https://storage.pickleballmexico.com/banners/coach_certification_banner.jpg',
        thumbnail_url: 'https://storage.pickleballmexico.com/banners/thumbnails/coach_certification_thumb.jpg',
        action_url: '/coaching/certification-program',
        action_text: 'Más Información',
        position: 5,
        is_active: true,
        is_featured: false,
        display_type: 'sidebar',
        target_audience: 'coaches',
        start_date: new Date('2024-11-01T00:00:00Z'),
        end_date: new Date('2025-01-31T23:59:59Z'),
        related_tournament_id: null,
        related_club_id: null,
        related_event_id: uuidv4(),
        click_count: 156,
        view_count: 2334,
        tags: JSON.stringify(['coaching', 'certification', 'training', 'professional', 'education']),
        metadata: JSON.stringify({
          campaign_id: 'coach_cert_jan_2025',
          program_duration: '40 hours',
          certification_level: 'Level 1',
          instructor: 'Dr. Patricia González',
          max_participants: 25
        }),
        notes: 'Targeted banner for coaching certification program. Limited to coaching audience for relevance.',
        created_at: new Date('2024-11-01T08:00:00Z'),
        updated_at: new Date('2024-11-01T08:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        title: 'Sistema de Reservas de Canchas',
        subtitle: '¡Reserva tu cancha favorita en línea! Disponible 24/7',
        image_url: 'https://storage.pickleballmexico.com/banners/court_booking_system.jpg',
        thumbnail_url: 'https://storage.pickleballmexico.com/banners/thumbnails/court_booking_thumb.jpg',
        action_url: '/court-booking',
        action_text: 'Reservar Ahora',
        position: 3,
        is_active: false,
        is_featured: false,
        display_type: 'notification',
        target_audience: 'players',
        start_date: new Date('2024-07-01T00:00:00Z'),
        end_date: new Date('2024-10-31T23:59:59Z'),
        related_tournament_id: null,
        related_club_id: null,
        related_event_id: null,
        click_count: 689,
        view_count: 15432,
        tags: JSON.stringify(['court', 'booking', 'reservation', 'system', 'convenience']),
        metadata: JSON.stringify({
          campaign_id: 'court_booking_launch',
          feature_launch: 'court_reservation_system',
          success_metric: 'reservation_conversions',
          campaign_ended: 'system_fully_adopted',
          final_conversion_rate: 0.045
        }),
        notes: 'Promotional banner for court booking system launch. Campaign ended successfully - system fully adopted.',
        created_at: new Date('2024-07-01T09:00:00Z'),
        updated_at: new Date('2024-11-01T12:00:00Z'),
        deleted_at: null
      },
      {
        id: uuidv4(),
        title: 'Actualización de la Plataforma',
        subtitle: 'Nuevas funciones disponibles: Búsqueda de compañeros de juego y rankings en tiempo real',
        image_url: 'https://storage.pickleballmexico.com/banners/platform_update_v2.jpg',
        thumbnail_url: 'https://storage.pickleballmexico.com/banners/thumbnails/platform_update_thumb.jpg',
        action_url: '/features/new-features',
        action_text: 'Explorar Funciones',
        position: 4,
        is_active: true,
        is_featured: true,
        display_type: 'popup',
        target_audience: 'all',
        start_date: new Date('2024-11-15T00:00:00Z'),
        end_date: new Date('2024-12-31T23:59:59Z'),
        related_tournament_id: null,
        related_club_id: null,
        related_event_id: null,
        click_count: 234,
        view_count: 4567,
        tags: JSON.stringify(['platform', 'update', 'features', 'player_finder', 'rankings']),
        metadata: JSON.stringify({
          campaign_id: 'platform_update_v2_announcement',
          new_features: ['player_finder', 'live_rankings', 'enhanced_messaging'],
          release_version: '2.1.0',
          popup_frequency: 'once_per_user',
          dismissible: true
        }),
        notes: 'Feature announcement banner for platform update v2.1. Popup format for maximum visibility.',
        created_at: new Date('2024-11-15T14:00:00Z'),
        updated_at: new Date('2024-11-15T14:00:00Z'),
        deleted_at: null
      }
    ];

    await queryInterface.bulkInsert('banners', banners, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('banners', null, {});
  }
};