/**
 * Coach Controller
 * 
 * Handles coach-related operations including coach search, profile management,
 * and coaching lesson booking functionality.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { User, CoachFinder } = require('../db/models');
const { Op } = require('sequelize');

// Find coaches based on search criteria
exports.searchCoaches = async (req, res) => {
  try {
    const {
      location,
      radius = 50,
      skillLevel,
      experienceLevel,
      maxRate,
      language = 'English',
      specialization,
      lessonType,
      limit = 20,
      offset = 0
    } = req.query;

    // Build search criteria
    const whereClause = {
      user_type: 'coach',
      is_findable: true,
      available_for_lessons: true,
      is_active: true
    };

    // Add budget filter
    if (maxRate) {
      whereClause.hourly_rate = { [Op.lte]: parseFloat(maxRate) };
    }

    // Add experience filter
    if (experienceLevel && experienceLevel !== 'any') {
      const minExperience = {
        'beginner': 0,
        'intermediate': 2,
        'advanced': 5,
        'professional': 10
      }[experienceLevel] || 0;
      
      whereClause.coaching_experience = { [Op.gte]: minExperience };
    }

    // Add language filter
    if (language && language !== 'any') {
      whereClause[Op.or] = [
        { coaching_languages: { [Op.contains]: [language] } },
        { coaching_languages: null } // Default to English
      ];
    }

    // Add skill level filter (coach skill should be equal or higher)
    if (skillLevel) {
      const skillLevels = ['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'];
      const minSkillIndex = skillLevels.indexOf(skillLevel);
      if (minSkillIndex !== -1) {
        const validSkills = skillLevels.slice(minSkillIndex);
        whereClause.skill_level = { [Op.in]: validSkills };
      }
    }

    // Find coaches
    const coaches = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id', 'username', 'full_name', 'profile_photo', 'bio',
        'state', 'city', 'skill_level', 'coaching_experience',
        'specializations', 'hourly_rate', 'coaching_languages',
        'coaching_bio', 'certifications', 'rating', 'reviews_count',
        'total_students', 'active_students', 'lesson_types_offered',
        'coaching_schedule', 'created_at'
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ['rating', 'DESC'],
        ['coaching_experience', 'DESC'],
        ['reviews_count', 'DESC']
      ]
    });

    // Calculate distance and apply specialization filter
    let filteredCoaches = coaches.rows;

    if (specialization) {
      filteredCoaches = filteredCoaches.filter(coach => {
        const coachSpecializations = coach.specializations || [];
        return coachSpecializations.includes(specialization);
      });
    }

    // Add calculated fields
    const enrichedCoaches = filteredCoaches.map(coach => {
      const coachData = coach.toJSON();
      return {
        ...coachData,
        experience_level: getExperienceLevel(coachData.coaching_experience),
        availability_status: getAvailabilityStatus(coachData),
        match_score: calculateMatchScore(coachData, req.query)
      };
    });

    res.json({
      success: true,
      data: {
        coaches: enrichedCoaches,
        total: coaches.count,
        page: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(coaches.count / limit),
        filters_applied: {
          location,
          radius,
          skillLevel,
          experienceLevel,
          maxRate,
          language,
          specialization,
          lessonType
        }
      }
    });
  } catch (error) {
    console.error('Error searching coaches:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search coaches',
      error: error.message
    });
  }
};

// Get coach profile details
exports.getCoachProfile = async (req, res) => {
  try {
    const { coachId } = req.params;

    const coach = await User.findOne({
      where: {
        id: coachId,
        user_type: 'coach',
        is_active: true
      },
      attributes: [
        'id', 'username', 'full_name', 'profile_photo', 'bio',
        'state', 'city', 'skill_level', 'coaching_experience',
        'specializations', 'hourly_rate', 'coaching_languages',
        'coaching_bio', 'certifications', 'rating', 'reviews_count',
        'total_students', 'active_students', 'lesson_types_offered',
        'coaching_schedule', 'coaching_locations', 'website',
        'phone', 'email', 'created_at'
      ]
    });

    if (!coach) {
      return res.status(404).json({
        success: false,
        message: 'Coach not found'
      });
    }

    const coachData = coach.toJSON();
    
    res.json({
      success: true,
      data: {
        coach: {
          ...coachData,
          experience_level: getExperienceLevel(coachData.coaching_experience),
          availability_status: getAvailabilityStatus(coachData),
          response_rate: calculateResponseRate(coachData),
          average_session_duration: '90 minutes', // Would be calculated from booking data
          next_available: getNextAvailableSlot(coachData.coaching_schedule)
        }
      }
    });
  } catch (error) {
    console.error('Error getting coach profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get coach profile',
      error: error.message
    });
  }
};

// Create or update coach finder search
exports.createCoachSearch = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      preferred_skill_focus,
      experience_level_required,
      lesson_type,
      search_radius_km,
      preferred_locations,
      travel_willing,
      preferred_days,
      preferred_time_start,
      preferred_time_end,
      budget_min,
      budget_max,
      preferred_language,
      contact_method,
      urgent_request,
      skill_level,
      goals,
      special_requirements,
      notes
    } = req.body;

    // Check if user already has an active search
    let coachSearch = await CoachFinder.findOne({
      where: {
        searcher_id: userId,
        is_active: true
      }
    });

    const searchData = {
      searcher_id: userId,
      preferred_skill_focus,
      experience_level_required,
      lesson_type,
      search_radius_km,
      preferred_locations,
      travel_willing,
      preferred_days,
      preferred_time_start,
      preferred_time_end,
      budget_min,
      budget_max,
      preferred_language,
      contact_method,
      urgent_request,
      skill_level,
      goals,
      special_requirements,
      notes,
      is_active: true,
      search_criteria: req.body
    };

    if (coachSearch) {
      // Update existing search
      await coachSearch.update(searchData);
    } else {
      // Create new search
      coachSearch = await CoachFinder.create(searchData);
    }

    // Perform initial search
    const searchResults = await coachSearch.performSearch();

    res.json({
      success: true,
      data: {
        search: coachSearch,
        results: searchResults,
        message: coachSearch ? 'Coach search updated successfully' : 'Coach search created successfully'
      }
    });
  } catch (error) {
    console.error('Error creating coach search:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create coach search',
      error: error.message
    });
  }
};

// Get user's coach searches
exports.getMyCoachSearches = async (req, res) => {
  try {
    const userId = req.user.id;

    const searches = await CoachFinder.findAll({
      where: { searcher_id: userId },
      order: [['created_at', 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      data: { searches }
    });
  } catch (error) {
    console.error('Error getting coach searches:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get coach searches',
      error: error.message
    });
  }
};

// Perform search with existing criteria
exports.performCoachSearch = async (req, res) => {
  try {
    const { searchId } = req.params;
    const userId = req.user.id;

    const coachSearch = await CoachFinder.findOne({
      where: {
        id: searchId,
        searcher_id: userId
      }
    });

    if (!coachSearch) {
      return res.status(404).json({
        success: false,
        message: 'Coach search not found'
      });
    }

    const results = await coachSearch.performSearch();

    res.json({
      success: true,
      data: {
        search: coachSearch,
        results,
        total_found: results.length
      }
    });
  } catch (error) {
    console.error('Error performing coach search:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform coach search',
      error: error.message
    });
  }
};

// Get coach search statistics
exports.getCoachSearchStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await CoachFinder.getSearchStats(userId);

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Error getting coach search stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get coach search statistics',
      error: error.message
    });
  }
};

// Contact coach (record interaction)
exports.contactCoach = async (req, res) => {
  try {
    const { coachId } = req.params;
    const { searchId, message, contact_method } = req.body;
    const userId = req.user.id;

    // Verify coach exists
    const coach = await User.findOne({
      where: {
        id: coachId,
        user_type: 'coach',
        is_active: true
      }
    });

    if (!coach) {
      return res.status(404).json({
        success: false,
        message: 'Coach not found'
      });
    }

    // Update search statistics if search ID provided
    if (searchId) {
      const coachSearch = await CoachFinder.findOne({
        where: {
          id: searchId,
          searcher_id: userId
        }
      });

      if (coachSearch) {
        await coachSearch.update({
          coaches_contacted: coachSearch.coaches_contacted + 1
        });
      }
    }

    // Here you would typically:
    // 1. Send notification to coach
    // 2. Create conversation/message thread
    // 3. Send email/SMS based on contact_method
    
    res.json({
      success: true,
      data: {
        message: 'Contact request sent successfully',
        coach: {
          id: coach.id,
          name: coach.full_name,
          response_time: '24 hours' // Would be calculated from historical data
        }
      }
    });
  } catch (error) {
    console.error('Error contacting coach:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to contact coach',
      error: error.message
    });
  }
};

// Helper functions
function getExperienceLevel(years) {
  if (years >= 10) return 'professional';
  if (years >= 5) return 'advanced';
  if (years >= 2) return 'intermediate';
  return 'beginner';
}

function getAvailabilityStatus(coach) {
  if (!coach.available_for_lessons) return 'unavailable';
  if (coach.active_students >= 20) return 'limited';
  return 'available';
}

function calculateMatchScore(coach, searchCriteria) {
  let score = 0;
  
  // Base score for active coach
  score += 20;
  
  // Experience match
  if (searchCriteria.experienceLevel) {
    const coachLevel = getExperienceLevel(coach.coaching_experience);
    if (coachLevel === searchCriteria.experienceLevel) score += 30;
    else if (coachLevel === 'professional' && searchCriteria.experienceLevel === 'advanced') score += 25;
  }
  
  // Budget compatibility
  if (searchCriteria.maxRate && coach.hourly_rate) {
    if (coach.hourly_rate <= parseFloat(searchCriteria.maxRate)) score += 25;
    else if (coach.hourly_rate <= parseFloat(searchCriteria.maxRate) * 1.2) score += 15;
  }
  
  // Language match
  if (searchCriteria.language && coach.coaching_languages) {
    if (coach.coaching_languages.includes(searchCriteria.language)) score += 15;
  }
  
  // Rating bonus
  if (coach.rating) {
    score += coach.rating * 2;
  }
  
  return Math.min(score, 100);
}

function calculateResponseRate(coach) {
  // Would be calculated from actual response data
  return 85; // Placeholder
}

function getNextAvailableSlot(schedule) {
  // Would parse coaching_schedule JSON and find next available slot
  return 'Tomorrow 2:00 PM'; // Placeholder
}