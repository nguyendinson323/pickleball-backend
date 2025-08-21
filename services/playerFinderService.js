/**
 * Player Finder Service
 * 
 * Handles location-based player matching, notifications,
 * and privacy-controlled discovery features.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Op } = require('sequelize');
const User = require('../db/models/User');
const PlayerFinder = require('../db/models/PlayerFinder');
const Notification = require('../db/models/Notification');
const emailService = require('./emailService');
const logger = require('../config/logger');

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (deg) => deg * (Math.PI / 180);

/**
 * Find nearby players based on location and criteria
 * @param {Object} searchParams - Search parameters
 * @returns {Array} Array of matching players
 */
const findNearbyPlayers = async (searchParams) => {
  const {
    searcherId,
    latitude,
    longitude,
    radius = 50,
    skillLevel,
    gender,
    ageRange,
    matchType,
    availability,
    excludeIds = []
  } = searchParams;

  try {
    // Build query conditions
    const whereClause = {
      id: { [Op.notIn]: [searcherId, ...excludeIds] },
      user_type: { [Op.in]: ['player', 'coach'] },
      is_active: true,
      email_verified: true,
      can_be_found: true, // Privacy control - only show players who opted in
      latitude: { [Op.not]: null },
      longitude: { [Op.not]: null }
    };

    // Apply skill level filter
    if (skillLevel) {
      if (skillLevel.min && skillLevel.max) {
        const levels = ['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'];
        const minIndex = levels.indexOf(skillLevel.min);
        const maxIndex = levels.indexOf(skillLevel.max);
        whereClause.skill_level = {
          [Op.in]: levels.slice(minIndex, maxIndex + 1)
        };
      } else if (skillLevel.exact) {
        whereClause.skill_level = skillLevel.exact;
      }
    }

    // Apply gender filter
    if (gender && gender !== 'any') {
      whereClause.gender = gender;
    }

    // Apply age range filter
    if (ageRange) {
      whereClause.date_of_birth = {};
      
      if (ageRange.max) {
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - ageRange.max - 1);
        whereClause.date_of_birth[Op.gte] = minDate;
      }
      
      if (ageRange.min) {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - ageRange.min);
        whereClause.date_of_birth[Op.lte] = maxDate;
      }
    }

    // Fetch potential matches
    const players = await User.findAll({
      where: whereClause,
      attributes: [
        'id',
        'username',
        'full_name',
        'email',
        'phone',
        'skill_level',
        'gender',
        'date_of_birth',
        'state',
        'city',
        'latitude',
        'longitude',
        'profile_photo',
        'membership_status',
        'last_login',
        'preferences'
      ]
    });

    // Filter by distance
    const nearbyPlayers = players.filter(player => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(player.latitude),
        parseFloat(player.longitude)
      );
      
      player.distance = Math.round(distance * 10) / 10; // Round to 1 decimal
      return distance <= radius;
    });

    // Sort by distance
    nearbyPlayers.sort((a, b) => a.distance - b.distance);

    // Add match score based on preferences
    nearbyPlayers.forEach(player => {
      let matchScore = 100;
      
      // Adjust score based on skill level difference
      if (skillLevel && skillLevel.exact && player.skill_level) {
        const levels = ['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'];
        const diff = Math.abs(
          levels.indexOf(skillLevel.exact) - 
          levels.indexOf(player.skill_level)
        );
        matchScore -= diff * 10;
      }
      
      // Adjust score based on distance
      matchScore -= player.distance * 0.5;
      
      // Adjust score based on activity (last login)
      if (player.last_login) {
        const daysSinceLogin = Math.floor(
          (new Date() - new Date(player.last_login)) / (1000 * 60 * 60 * 24)
        );
        matchScore -= Math.min(daysSinceLogin * 2, 30);
      }
      
      player.matchScore = Math.max(0, Math.round(matchScore));
    });

    // Sort by match score (secondary sort)
    nearbyPlayers.sort((a, b) => {
      if (Math.abs(a.distance - b.distance) < 5) {
        return b.matchScore - a.matchScore;
      }
      return a.distance - b.distance;
    });

    return nearbyPlayers;

  } catch (error) {
    logger.error('Error finding nearby players:', error);
    throw error;
  }
};

/**
 * Find coaches near a location
 * @param {Object} searchParams - Search parameters
 * @returns {Array} Array of matching coaches
 */
const findNearbyCoaches = async (searchParams) => {
  const modifiedParams = {
    ...searchParams,
    userType: 'coach'
  };
  
  const whereClause = {
    user_type: 'coach',
    is_active: true,
    email_verified: true,
    can_be_found: true,
    latitude: { [Op.not]: null },
    longitude: { [Op.not]: null }
  };

  // Similar logic to findNearbyPlayers but specifically for coaches
  return findNearbyPlayers(modifiedParams);
};

/**
 * Send match notification to players
 * @param {Object} match - Match details
 */
const sendMatchNotification = async (match) => {
  const { searcher, foundPlayer, matchDetails } = match;

  try {
    // Create in-app notification for both players
    await Notification.create({
      user_id: foundPlayer.id,
      type: 'player_match',
      title: 'New Player Match Found!',
      message: `${searcher.full_name} is looking for players in your area. They match your preferences!`,
      data: {
        searcher_id: searcher.id,
        match_score: matchDetails.matchScore,
        distance: matchDetails.distance
      },
      is_read: false
    });

    await Notification.create({
      user_id: searcher.id,
      type: 'player_match',
      title: 'Player Found!',
      message: `We found ${foundPlayer.full_name} who matches your search criteria.`,
      data: {
        player_id: foundPlayer.id,
        match_score: matchDetails.matchScore,
        distance: matchDetails.distance
      },
      is_read: false
    });

    // Send email notifications
    if (foundPlayer.email) {
      await emailService.sendEmail({
        to: foundPlayer.email,
        subject: 'New Player Match - Pickleball Federation',
        html: `
          <h2>New Player Match Found!</h2>
          <p>Hello ${foundPlayer.full_name},</p>
          <p>${searcher.full_name} is looking for players in your area and you match their preferences!</p>
          <p><strong>Match Details:</strong></p>
          <ul>
            <li>Distance: ${matchDetails.distance} km</li>
            <li>Skill Level: ${searcher.skill_level || 'Not specified'}</li>
            <li>Match Type: ${matchDetails.matchType || 'Any'}</li>
          </ul>
          <p>Log in to your account to connect with this player.</p>
          <p>Best regards,<br>Pickleball Federation Team</p>
        `
      });
    }

    // Send SMS notification if phone number is available
    // This would integrate with a service like Twilio
    if (foundPlayer.phone) {
      // await smsService.sendSMS({
      //   to: foundPlayer.phone,
      //   message: `New Pickleball match! ${searcher.full_name} wants to play in your area. Check your app for details.`
      // });
      logger.info(`SMS notification would be sent to ${foundPlayer.phone}`);
    }

    logger.info(`Match notifications sent for searcher ${searcher.id} and player ${foundPlayer.id}`);

  } catch (error) {
    logger.error('Error sending match notification:', error);
    throw error;
  }
};

/**
 * Save a player finder search request
 * @param {Object} searchRequest - Search request details
 */
const saveSearchRequest = async (searchRequest) => {
  try {
    const savedRequest = await PlayerFinder.create(searchRequest);
    
    // Automatically search for matches when a new request is saved
    const matches = await findNearbyPlayers({
      searcherId: searchRequest.searcher_id,
      latitude: searchRequest.search_location?.latitude,
      longitude: searchRequest.search_location?.longitude,
      radius: searchRequest.search_radius_km,
      skillLevel: {
        min: searchRequest.skill_level_min,
        max: searchRequest.skill_level_max
      },
      gender: searchRequest.preferred_gender,
      ageRange: {
        min: searchRequest.age_range_min,
        max: searchRequest.age_range_max
      },
      matchType: searchRequest.match_type
    });

    // Send notifications for top matches
    if (matches.length > 0) {
      const searcher = await User.findByPk(searchRequest.searcher_id);
      const topMatches = matches.slice(0, 3); // Notify top 3 matches
      
      for (const match of topMatches) {
        await sendMatchNotification({
          searcher,
          foundPlayer: match,
          matchDetails: {
            matchScore: match.matchScore,
            distance: match.distance,
            matchType: searchRequest.match_type
          }
        });
      }
    }

    return savedRequest;

  } catch (error) {
    logger.error('Error saving search request:', error);
    throw error;
  }
};

/**
 * Update player visibility settings
 * @param {string} userId - User ID
 * @param {boolean} canBeFound - Visibility setting
 */
const updatePlayerVisibility = async (userId, canBeFound) => {
  try {
    const updated = await User.update(
      { can_be_found: canBeFound },
      { where: { id: userId } }
    );

    if (updated[0] === 0) {
      throw new Error('User not found');
    }

    logger.info(`Player visibility updated for user ${userId}: ${canBeFound}`);
    return { success: true, can_be_found: canBeFound };

  } catch (error) {
    logger.error('Error updating player visibility:', error);
    throw error;
  }
};

module.exports = {
  findNearbyPlayers,
  findNearbyCoaches,
  sendMatchNotification,
  saveSearchRequest,
  updatePlayerVisibility,
  calculateDistance
};