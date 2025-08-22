/**
 * Banner Controller
 * 
 * Handles all banner-related operations including CRUD operations,
 * banner display logic, and analytics tracking.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Op } = require('sequelize');
const createError = require('http-errors');
const Banner = require('../db/models/Banner');
const Tournament = require('../db/models/Tournament');
const Club = require('../db/models/Club');
const { HTTP_STATUS, API_MESSAGES } = require('../config/constants');
const logger = require('../config/logger');
const { asyncHandler } = require('../middlewares/errorHandler');

/**
 * Get all banners with filtering and pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBanners = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      display_type,
      target_audience,
      is_active,
      is_featured,
      search,
      start_date,
      end_date
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    // Apply filters
    if (display_type) {
      whereClause.display_type = display_type;
    }

    if (target_audience) {
      whereClause.target_audience = target_audience;
    }

    if (is_active !== undefined) {
      whereClause.is_active = is_active === 'true';
    }

    if (is_featured !== undefined) {
      whereClause.is_featured = is_featured === 'true';
    }

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { subtitle: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (start_date || end_date) {
      whereClause[Op.and] = [];
      
      if (start_date) {
        whereClause[Op.and].push({
          [Op.or]: [
            { start_date: null },
            { start_date: { [Op.gte]: new Date(start_date) } }
          ]
        });
      }
      
      if (end_date) {
        whereClause[Op.and].push({
          [Op.or]: [
            { end_date: null },
            { end_date: { [Op.lte]: new Date(end_date) } }
          ]
        });
      }
    }

    const { count, rows: banners } = await Banner.findAndCountAll({
      where: whereClause,
      order: [
        ['is_featured', 'DESC'],
        ['position', 'ASC'],
        ['created_at', 'DESC']
      ],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    logger.info(`Banners fetched: ${banners.length} of ${count}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: {
        data: {
        banner
      }s
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: totalPages
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Get active banners for display
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getActiveBanners = async (req, res) => {
  try {
    const { display_type = 'carousel', target_audience = 'all' } = req.query;

    const banners = await Banner.getActiveBanners(display_type, target_audience);

    logger.info(`Active banners fetched: ${banners.length} for ${display_type}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: {
        data: {
        banner
      }s
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Get carousel banners for homepage
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCarouselBanners = async (req, res) => {
  try {
    const banners = await Banner.getCarouselBanners();

    logger.info(`Carousel banners fetched: ${banners.length}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: {
        data: {
        banner
      }s
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Get banner by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByPk(id);

    if (!banner) {
      throw createError.notFound('Banner not found');
    }

    logger.info(`Banner fetched: ${banner.id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: {
        banner
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Create new banner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createBanner = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      image_url,
      thumbnail_url,
      action_url,
      action_text,
      position,
      is_active,
      is_featured,
      display_type,
      target_audience,
      start_date,
      end_date,
      related_tournament_id,
      related_club_id,
      related_event_id,
      tags,
      metadata,
      notes
    } = req.body;

    // Validate related entities if provided
    if (related_tournament_id) {
      const tournament = await Tournament.findByPk(related_tournament_id);
      if (!tournament) {
        throw createError.badRequest('Related tournament not found');
      }
    }

    if (related_club_id) {
      const club = await Club.findByPk(related_club_id);
      if (!club) {
        throw createError.badRequest('Related club not found');
      }
    }

    const banner = await Banner.create({
      title,
      subtitle,
      image_url,
      thumbnail_url,
      action_url,
      action_text,
      position: position || 0,
      is_active: is_active !== undefined ? is_active : true,
      is_featured: is_featured || false,
      display_type: display_type || 'carousel',
      target_audience: target_audience || 'all',
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
      related_tournament_id,
      related_club_id,
      related_event_id,
      tags,
      metadata,
      notes
    });

    logger.info(`Banner created: ${banner.id} - ${banner.title}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.SUCCESS.BANNER_CREATED,
      data: {
        banner
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Update banner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const banner = await Banner.findByPk(id);

    if (!banner) {
      throw createError.notFound('Banner not found');
    }

    // Validate related entities if provided
    if (updateData.related_tournament_id) {
      const tournament = await Tournament.findByPk(updateData.related_tournament_id);
      if (!tournament) {
        throw createError.badRequest('Related tournament not found');
      }
    }

    if (updateData.related_club_id) {
      const club = await Club.findByPk(updateData.related_club_id);
      if (!club) {
        throw createError.badRequest('Related club not found');
      }
    }

    // Convert date strings to Date objects
    if (updateData.start_date) {
      updateData.start_date = new Date(updateData.start_date);
    }

    if (updateData.end_date) {
      updateData.end_date = new Date(updateData.end_date);
    }

    await banner.update(updateData);

    logger.info(`Banner updated: ${banner.id} - ${banner.title}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.BANNER_UPDATED,
      data: {
        banner
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Delete banner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByPk(id);

    if (!banner) {
      throw createError.notFound('Banner not found');
    }

    await banner.destroy();

    logger.info(`Banner deleted: ${banner.id} - ${banner.title}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.BANNER_DELETED
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Toggle banner active status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const toggleBannerStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByPk(id);

    if (!banner) {
      throw createError.notFound('Banner not found');
    }

    banner.is_active = !banner.is_active;
    await banner.save();

    logger.info(`Banner status toggled: ${banner.id} - ${banner.is_active ? 'active' : 'inactive'}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: banner.is_active ? 'Banner activated' : 'Banner deactivated',
      data: {
        banner
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Update banner position
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateBannerPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { position } = req.body;

    if (position === undefined || position < 0) {
      throw createError.badRequest('Valid position is required');
    }

    const banner = await Banner.findByPk(id);

    if (!banner) {
      throw createError.notFound('Banner not found');
    }

    banner.position = position;
    await banner.save();

    logger.info(`Banner position updated: ${banner.id} - position ${position}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Banner position updated',
      data: {
        banner
      }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Track banner view
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const trackBannerView = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByPk(id);

    if (!banner) {
      throw createError.notFound('Banner not found');
    }

    await banner.incrementView();

    logger.info(`Banner view tracked: ${banner.id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Banner view tracked'
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Track banner click
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const trackBannerClick = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByPk(id);

    if (!banner) {
      throw createError.notFound('Banner not found');
    }

    await banner.incrementClick();

    logger.info(`Banner click tracked: ${banner.id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Banner click tracked'
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Get banner analytics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBannerAnalytics = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const whereClause = {};

    if (start_date || end_date) {
      whereClause.created_at = {};
      
      if (start_date) {
        whereClause.created_at[Op.gte] = new Date(start_date);
      }
      
      if (end_date) {
        whereClause.created_at[Op.lte] = new Date(end_date);
      }
    }

    const banners = await Banner.findAll({
      where: whereClause,
      attributes: [
        'id',
        'title',
        'display_type',
        'target_audience',
        'view_count',
        'click_count',
        'created_at'
      ],
      order: [['view_count', 'DESC']]
    });

    const totalViews = banners.reduce((sum, banner) => sum + banner.view_count, 0);
    const totalClicks = banners.reduce((sum, banner) => sum + banner.click_count, 0);
    const clickThroughRate = totalViews > 0 ? (totalClicks / totalViews * 100).toFixed(2) : 0;

    const analytics = {
      total_banners: banners.length,
      total_views: totalViews,
      total_clicks: totalClicks,
      click_through_rate: parseFloat(clickThroughRate),
      top_performing_banners: banners.slice(0, 10),
      banners_by_display_type: {},
      banners_by_audience: {}
    };

    // Group by display type
    banners.forEach(banner => {
      const type = banner.display_type;
      if (!analytics.banners_by_display_type[type]) {
        analytics.banners_by_display_type[type] = {
          count: 0,
          views: 0,
          clicks: 0
        };
      }
      analytics.banners_by_display_type[type].count++;
      analytics.banners_by_display_type[type].views += banner.view_count;
      analytics.banners_by_display_type[type].clicks += banner.click_count;
    });

    // Group by target audience
    banners.forEach(banner => {
      const audience = banner.target_audience;
      if (!analytics.banners_by_audience[audience]) {
        analytics.banners_by_audience[audience] = {
          count: 0,
          views: 0,
          clicks: 0
        };
      }
      analytics.banners_by_audience[audience].count++;
      analytics.banners_by_audience[audience].views += banner.view_count;
      analytics.banners_by_audience[audience].clicks += banner.click_count;
    });

    logger.info(`Banner analytics generated: ${banners.length} banners analyzed`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: analytics
    });

  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBanners,
  getActiveBanners,
  getCarouselBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
  updateBannerPosition,
  trackBannerView,
  trackBannerClick,
  getBannerAnalytics
}; 