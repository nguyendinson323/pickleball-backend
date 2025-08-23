/**
 * Announcements Seeder
 * 
 * Seeds the announcements table with sample data
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
      `SELECT id FROM users WHERE user_type = 'admin' ORDER BY created_at LIMIT 5`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (adminUsers.length < 2) {
      throw new Error('Not enough admin users found. Please run users seeder first.');
    }

    const announcements = [
      {
        id: uuidv4(),
        title: 'Lanzamiento Oficial de la Plataforma Digital 2024',
        content: `¡Nos complace anunciar el lanzamiento oficial de la nueva plataforma digital de la Federación Mexicana de Pickleball!

Después de meses de desarrollo y pruebas, estamos emocionados de presentar una plataforma completamente renovada que revolucionará la experiencia del pickleball en México.

## Nuevas Características:

### 🎾 Gestión de Torneos Avanzada
- Registro en línea simplificado
- Seguimiento de brackets en tiempo real
- Notificaciones automáticas de horarios

### 👥 Comunidad Conectada
- Búsqueda inteligente de compañeros de juego
- Sistema de mensajería integrado
- Perfiles detallados de jugadores

### 🏆 Sistema de Rankings Nacional
- Rankings actualizados en tiempo real
- Historial completo de participación
- Estadísticas personalizadas

### 📱 Credenciales Digitales
- Tarjetas de identificación oficial digitales
- Códigos QR para verificación rápida
- Integración con torneos

¡Únete a la nueva era del pickleball digital en México!`,
        excerpt: 'Lanzamiento oficial de la nueva plataforma digital con funciones avanzadas de torneos, comunidad y rankings.',
        announcement_type: 'system_update',
        priority: 'high',
        status: 'published',
        visibility: 'public',
        created_by: adminUsers[0].id,
        published_at: new Date('2024-11-01T09:00:00Z'),
        expires_at: null,
        is_featured: true,
        is_sticky: true,
        display_until: new Date('2024-12-31T23:59:59Z'),
        image_url: 'https://storage.pickleballmexico.com/announcements/platform_launch_2024.jpg',
        action_button_text: 'Explorar Plataforma',
        action_button_url: '/dashboard',
        tags: JSON.stringify(['platform', 'launch', 'features', 'digital', 'important']),
        view_count: 2847,
        click_count: 1423,
        metadata: JSON.stringify({
          launch_campaign: true,
          featured_on_homepage: true,
          press_release_sent: true,
          social_media_campaign: 'active'
        }),
        send_notification: true,
        notification_sent: true,
        notification_sent_at: new Date('2024-11-01T09:05:00Z'),
        created_at: new Date('2024-10-25T14:30:00Z'),
        updated_at: new Date('2024-11-01T09:05:00Z')
      },
      {
        id: uuidv4(),
        title: 'Nuevas Reglas de Torneos 2025 - Cambios Importantes',
        content: `La Federación Mexicana de Pickleball anuncia cambios importantes en las reglas de torneos que entrarán en vigor el 1 de enero de 2025.

## Cambios Principales:

### ⏱️ Formato de Tiempo
- Límite de tiempo por partido: 1 hora máximo
- Tiempo muerto: 2 por equipo por juego
- Entre juegos: 2 minutos máximo

### 🎯 Sistema de Puntuación
- Adopción del sistema DUPR para rankings
- Puntos de torneo actualizados según participación
- Bonificación por torneos nacionales e internacionales

### 👕 Código de Vestimenta
- Obligatorio usar ropa deportiva apropiada
- Colores permitidos: blancos y tonos pastel
- Logos comerciales limitados a 6 cm²

### 📋 Registro y Documentación
- Credenciales digitales obligatorias para todos los torneos
- Verificación médica requerida para mayores de 65 años
- Seguro deportivo obligatorio para divisiones profesionales

Estos cambios buscan alinear nuestros torneos con estándares internacionales y mejorar la experiencia competitiva.

Para más detalles, consulte el manual completo de reglas 2025.`,
        excerpt: 'Importantes cambios en reglas de torneos que entran en vigor el 1 de enero de 2025.',
        announcement_type: 'policy_change',
        priority: 'high',
        status: 'published',
        visibility: 'members_only',
        created_by: adminUsers[0].id,
        published_at: new Date('2024-11-15T12:00:00Z'),
        expires_at: new Date('2025-01-31T23:59:59Z'),
        is_featured: true,
        is_sticky: false,
        display_until: new Date('2025-01-01T00:00:00Z'),
        image_url: 'https://storage.pickleballmexico.com/announcements/rules_2025_changes.jpg',
        action_button_text: 'Descargar Manual',
        action_button_url: '/documents/tournament-rules-2025.pdf',
        tags: JSON.stringify(['rules', '2025', 'tournaments', 'policy', 'important']),
        view_count: 1567,
        click_count: 834,
        metadata: JSON.stringify({
          effective_date: '2025-01-01',
          rule_version: '2025.1',
          consultation_period_ended: '2024-10-31',
          feedback_incorporated: true
        }),
        send_notification: true,
        notification_sent: true,
        notification_sent_at: new Date('2024-11-15T12:10:00Z'),
        created_at: new Date('2024-11-10T16:45:00Z'),
        updated_at: new Date('2024-11-15T12:10:00Z')
      },
      {
        id: uuidv4(),
        title: 'Mantenimiento Programado del Sistema - 15 de Diciembre',
        content: `**AVISO IMPORTANTE**: Mantenimiento Programado del Sistema

Estimados usuarios,

Informamos que realizaremos un mantenimiento programado de nuestros sistemas para implementar mejoras importantes y nuevas funcionalidades.

## 📅 Detalles del Mantenimiento:
- **Fecha**: Domingo 15 de diciembre de 2024
- **Horario**: 02:00 - 06:00 AM (GMT-6)
- **Duración estimada**: 4 horas

## ❌ Servicios No Disponibles:
Durante este período, los siguientes servicios estarán temporalmente fuera de línea:
- Plataforma web completa
- Aplicación móvil
- Sistema de reservas de canchas
- Procesamiento de pagos
- API para desarrolladores

## ✅ Servicios No Afectados:
- Torneos en progreso (los resultados se actualizarán después del mantenimiento)
- Credenciales digitales (funcionarán sin conexión)

## 🚀 Nuevas Funcionalidades Post-Mantenimiento:
- **Búsqueda mejorada de compañeros de juego** con algoritmos de compatibilidad avanzados
- **Calendario personal de torneos** con sincronización automática
- **Chat en tiempo real mejorado** con notificaciones push
- **Estadísticas avanzadas de jugador** con análisis detallado
- **Sistema de reservas optimizado** con confirmación instantánea

Lamentamos cualquier inconveniente que esto pueda causar y agradecemos su paciencia mientras mejoramos la plataforma para brindarles una mejor experiencia.

Para preguntas urgentes durante el mantenimiento, contacten a soporte@pickleballmexico.com`,
        excerpt: 'Mantenimiento programado del sistema el 15 de diciembre de 2:00-6:00 AM con nuevas funcionalidades.',
        announcement_type: 'maintenance_notice',
        priority: 'medium',
        status: 'published',
        visibility: 'public',
        created_by: adminUsers[1].id,
        published_at: new Date('2024-12-10T18:00:00Z'),
        expires_at: new Date('2024-12-16T12:00:00Z'),
        is_featured: false,
        is_sticky: true,
        display_until: new Date('2024-12-15T12:00:00Z'),
        image_url: 'https://storage.pickleballmexico.com/announcements/maintenance_notice.jpg',
        action_button_text: 'Ver Horario Completo',
        action_button_url: '/maintenance/schedule',
        tags: JSON.stringify(['maintenance', 'system', 'downtime', 'improvements', 'December']),
        view_count: 3245,
        click_count: 456,
        metadata: JSON.stringify({
          maintenance_window: {
            start: '2024-12-15T08:00:00Z',
            end: '2024-12-15T12:00:00Z',
            timezone: 'America/Mexico_City'
          },
          affected_services: ['web', 'mobile', 'api', 'payments'],
          new_features_count: 5,
          downtime_type: 'scheduled'
        }),
        send_notification: true,
        notification_sent: true,
        notification_sent_at: new Date('2024-12-10T18:15:00Z'),
        created_at: new Date('2024-12-02T10:30:00Z'),
        updated_at: new Date('2024-12-10T18:15:00Z')
      },
      {
        id: uuidv4(),
        title: 'Convocatoria: Selección Nacional de Pickleball 2025',
        content: `🏆 **CONVOCATORIA OFICIAL**
# Selección Nacional de Pickleball México 2025

La Federación Mexicana de Pickleball convoca a todos los jugadores mexicanos de alto rendimiento a participar en el proceso de selección para integrar las Selecciones Nacionales 2025.

## 🎯 Categorías Convocadas:
- **Juvenil** (16-18 años)
- **Abierta** (19-49 años)  
- **Senior** (50+ años)
- **Todas las modalidades**: Singles, Doubles, Mixed Doubles

## 📋 Requisitos de Participación:
- Nacionalidad mexicana (acta de nacimiento)
- Ranking nacional vigente
- Nivel mínimo: 4.5 NRTP
- Examen médico-deportivo
- Seguro deportivo internacional
- Disponibilidad para competir internacionalmente

## 📅 Proceso de Selección:

### Fase 1: Pre-selección (Enero 2025)
- Análisis de rankings y resultados 2024
- Invitación a 50 mejores jugadores por categoría

### Fase 2: Tryouts Regionales (Febrero 2025)
- **Norte**: Monterrey (8-9 Feb)
- **Centro**: Ciudad de México (15-16 Feb) 
- **Sur**: Mérida (22-23 Feb)

### Fase 3: Campo de Entrenamiento Nacional (Marzo 2025)
- Aguascalientes (15-22 Marzo)
- Selección final de 16 jugadores por categoría
- Entrenamiento intensivo con técnicos internacionales

### Fase 4: Anuncio Oficial (Marzo 30, 2025)
- Presentación oficial de las selecciones
- Calendario de competencias internacionales 2025

## 🌍 Competencias Internacionales 2025:
- **World Pickleball Championships** (Utah, USA - Julio)
- **Pan American Games** (Brasil - Agosto) 
- **Americas Cup** (Colombia - Octubre)
- **International Series** (Múltiples sedes)

## 📧 Registro e Información:
Los jugadores interesados deben enviar su solicitud antes del **15 de enero de 2025** a: seleccion@pickleballmexico.com

Incluir:
- Curriculum deportivo completo
- Resultados de torneos 2024
- Carta de motivación
- Documentos de identidad

**¡Esta es tu oportunidad de representar a México en el mundo!**

#VamosMéxico #PickleballMéxico2025`,
        excerpt: 'Convocatoria oficial para integrar las Selecciones Nacionales de Pickleball México 2025.',
        announcement_type: 'tournament_announcement',
        priority: 'urgent',
        status: 'published',
        visibility: 'players_only',
        created_by: adminUsers[0].id,
        published_at: new Date('2024-12-01T10:00:00Z'),
        expires_at: new Date('2025-01-15T23:59:59Z'),
        is_featured: true,
        is_sticky: true,
        display_until: new Date('2025-01-16T00:00:00Z'),
        image_url: 'https://storage.pickleballmexico.com/announcements/national_team_2025.jpg',
        action_button_text: 'Aplicar Ahora',
        action_button_url: '/national-team/application-2025',
        tags: JSON.stringify(['national_team', '2025', 'selection', 'tryouts', 'international', 'Mexico']),
        view_count: 1876,
        click_count: 987,
        metadata: JSON.stringify({
          application_deadline: '2025-01-15T23:59:59Z',
          categories: ['juvenile', 'open', 'senior'],
          total_positions: 48,
          international_competitions: 4,
          selection_process_stages: 4
        }),
        send_notification: true,
        notification_sent: true,
        notification_sent_at: new Date('2024-12-01T10:30:00Z'),
        created_at: new Date('2024-11-20T14:15:00Z'),
        updated_at: new Date('2024-12-01T10:30:00Z')
      },
      {
        id: uuidv4(),
        title: 'Programa de Becas Deportivas para Jóvenes Talentos',
        content: `🎓 **PROGRAMA DE BECAS DEPORTIVAS 2025**
# "Futuro del Pickleball Mexicano"

La Federación Mexicana de Pickleball, en alianza con instituciones educativas y patrocinadores, lanza el programa de becas deportivas para jóvenes talentos del pickleball.

## 🎯 Objetivo:
Apoyar el desarrollo académico y deportivo de jóvenes promesas del pickleball mexicano, garantizando que el talento no se limite por recursos económicos.

## 🏆 Beneficios de la Beca:
- **Beca académica**: Hasta $50,000 MXN anuales para educación
- **Entrenamiento especializado**: Con técnicos certificados internacionalmente
- **Equipo completo**: Raquetas, ropa deportiva y accesorios
- **Participación en torneos**: Inscripciones y viajes pagados
- **Seguro médico deportivo**: Cobertura completa
- **Mentoring**: Seguimiento personalizado de desarrollo

## 📊 Perfil del Becario:
- **Edad**: 14-18 años
- **Nivel académico**: Mínimo 8.0 de promedio
- **Nivel deportivo**: Potencial de élite (3.5+ NRTP)
- **Situación económica**: Recursos limitados (estudio socioeconómico)
- **Compromiso**: Dedicación al deporte y estudios

## 📅 Cronograma 2025:
- **Convocatoria**: Hasta 31 de enero 2025
- **Evaluación deportiva**: Febrero 2025
- **Evaluación académica**: Febrero 2025
- **Estudio socioeconómico**: Marzo 2025
- **Resultados**: 15 de marzo 2025
- **Inicio del programa**: Abril 2025

## 📋 Documentos Requeridos:
- Solicitud oficial completa
- Certificado de calificaciones (últimos 2 años)
- Carta de recomendación de entrenador
- Video deportivo (máximo 10 minutos)
- Documentación socioeconómica familiar
- Ensayo personal (500 palabras máximo)

## 💰 Patrocinadores y Aliados:
- **Instituciones educativas**: Universidad Anáhuac, Tecnológico de Monterrey
- **Empresas**: Paddle Pro México, Deportes Martí
- **Fundaciones**: Fundación Telmex, Unidos por el Deporte

## 👥 Cupos Disponibles:
- **Total**: 20 becarios
- **Por región**: Norte (6), Centro (8), Sur (6)
- **Por género**: Paridad de género garantizada

¡No dejes que el talento se quede sin oportunidades!

Para más información y solicitud: becas@pickleballmexico.com`,
        excerpt: 'Programa de becas deportivas para jóvenes talentos con apoyo académico y deportivo integral.',
        announcement_type: 'event_notice',
        priority: 'medium',
        status: 'draft',
        visibility: 'public',
        created_by: adminUsers[0].id,
        published_at: null,
        expires_at: new Date('2025-01-31T23:59:59Z'),
        is_featured: false,
        is_sticky: false,
        display_until: new Date('2025-02-01T00:00:00Z'),
        image_url: 'https://storage.pickleballmexico.com/announcements/scholarship_program_2025.jpg',
        action_button_text: 'Solicitar Beca',
        action_button_url: '/scholarships/application-2025',
        tags: JSON.stringify(['scholarships', 'youth', 'education', 'development', '2025']),
        view_count: 0,
        click_count: 0,
        metadata: JSON.stringify({
          application_deadline: '2025-01-31T23:59:59Z',
          total_scholarships: 20,
          max_annual_amount: 50000,
          age_range: '14-18',
          partner_institutions: 4
        }),
        send_notification: false,
        notification_sent: false,
        notification_sent_at: null,
        created_at: new Date('2024-12-05T11:20:00Z'),
        updated_at: new Date('2024-12-05T11:20:00Z')
      }
    ];

    await queryInterface.bulkInsert('announcements', announcements, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('announcements', null, {});
  }
};