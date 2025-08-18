import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { imageBaseURL } from '../../lib/const';
import { 
  User, 
  MapPin, 
  Trophy,
  Target,
  Edit3,
  Save,
  X,
  Calendar,
  Eye,
  EyeOff,
  Shield,
  Camera
} from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

const PlayerProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  
  // Debug: Log user data including profile photo
  console.log('🖼️ PlayerProfile - User data:', {
    id: user?.id,
    username: user?.username,
    full_name: user?.full_name,
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    profile_photo: user?.profile_photo,
    hasProfilePhoto: !!user?.profile_photo,
    user_type: user?.user_type
  });
  
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    state: user?.state || '',
    dateOfBirth: user?.date_of_birth || '',
    skillLevel: user?.skill_level || 'beginner',
    playingStyle: user?.preferences?.playing_style || 'all-around',
    bio: user?.bio || 'Tell us about your pickleball journey...',
    profilePhoto: user?.profile_photo || ''
  });

  // Privacy settings state - use real user data as defaults
  const [privacySettings, setPrivacySettings] = useState({
    isVisibleInSearch: user?.can_be_found ?? true,
    showContactInfo: user?.preferences?.show_contact_info ?? false,
    showSkillLevel: user?.preferences?.show_skill_level ?? true
  });

  // Update profile data when user data changes
  React.useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        phone: user.phone || '',
        city: user.city || '',
        state: user.state || '',
        dateOfBirth: user.date_of_birth || '',
        skillLevel: user.skill_level || 'beginner',
        playingStyle: user.preferences?.playing_style || 'all-around',
        bio: user.bio || 'Tell us about your pickleball journey...',
        profilePhoto: user.profile_photo || ''
      });

      setPrivacySettings({
        isVisibleInSearch: user.can_be_found ?? true,
        showContactInfo: user.preferences?.show_contact_info ?? false,
        showSkillLevel: user.preferences?.show_skill_level ?? true
      });
    }
  }, [user]);

  // Mock player statistics
  const playerStats = {
    tournamentsPlayed: 12,
    tournamentsWon: 3,
    currentRanking: 45,
    totalMatches: 89,
    winRate: 67,
    averageScore: 21.5,
    bestScore: 25,
    skillLevel: 'Intermediate',
    playingStyle: 'All-Around',
    experience: '3 years',
    favoriteCourt: 'Central Park Courts',
    achievements: [
      'Tournament Champion - Spring 2024',
      'Most Improved Player - 2023',
      'Sportsmanship Award - 2022'
    ]
  };

  const handleSave = async () => {
    try {
      // Update profile data
      const response = await api.put(`/users/${user?.id}/profile`, {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone: profileData.phone,
        city: profileData.city,
        state: profileData.state,
        date_of_birth: profileData.dateOfBirth,
        skill_level: profileData.skillLevel,
        preferences: {
          playing_style: profileData.playingStyle,
          show_contact_info: privacySettings.showContactInfo,
          show_skill_level: privacySettings.showSkillLevel
        },
        bio: profileData.bio
      });

      // Check if the response was successful
      if (response && typeof response === 'object' && 'status' in response && response.status === 200) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset to original user data
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        phone: user.phone || '',
        city: user.city || '',
        state: user.state || '',
        dateOfBirth: user.date_of_birth || '',
        skillLevel: user.skill_level || 'beginner',
        playingStyle: user.preferences?.playing_style || 'all-around',
        bio: user.bio || 'Tell us about your pickleball journey...',
        profilePhoto: user.profile_photo || ''
      });

      setPrivacySettings({
        isVisibleInSearch: user.can_be_found ?? true,
        showContactInfo: user.preferences?.show_contact_info ?? false,
        showSkillLevel: user.preferences?.show_skill_level ?? true
      });
    }
    setIsEditing(false);
  };

  const updateField = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePrivacySetting = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getSkillLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Profile</h1>
            <p className="text-gray-600">Manage your profile and preferences</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <span>Basic Information</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={profileData.username}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => updateField('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={profileData.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Playing Preferences */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <span>Playing Preferences</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                    <select
                      value={profileData.skillLevel}
                      onChange={(e) => updateField('skillLevel', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Playing Style</label>
                    <select
                      value={profileData.playingStyle}
                      onChange={(e) => updateField('playingStyle', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="all-around">All-Around</option>
                      <option value="aggressive">Aggressive</option>
                      <option value="defensive">Defensive</option>
                      <option value="strategic">Strategic</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="Tell us about your pickleball journey..."
                  />
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  <span>Privacy Settings</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Visible in Search</h4>
                      <p className="text-sm text-gray-600">Allow other players to find you</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.isVisibleInSearch}
                        onChange={(e) => updatePrivacySetting('isVisibleInSearch', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Show Contact Info</h4>
                      <p className="text-sm text-gray-600">Display phone and email to other players</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.showContactInfo}
                        onChange={(e) => updatePrivacySetting('showContactInfo', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Show Skill Level</h4>
                      <p className="text-sm text-gray-600">Display your skill level to other players</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.showSkillLevel}
                        onChange={(e) => updatePrivacySetting('showSkillLevel', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Photo & Stats */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-pink-500" />
                  <span>Profile Photo</span>
                </h3>
              </div>
              <div className="p-6 text-center">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto.startsWith('http') ? profileData.profilePhoto : `${imageBaseURL}${profileData.profilePhoto}`}
                    alt="Profile Photo"
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-4xl mx-auto mb-4">
                    {profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}
                  </div>
                )}
                {isEditing && (
                  <button className="w-full px-4 py-2 text-blue-600 hover:text-blue-800 text-sm border border-blue-300 rounded-md hover:bg-blue-50 transition-colors duration-200">
                    Change Photo
                  </button>
                )}
              </div>
            </div>

            {/* Player Statistics */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Player Statistics</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tournaments Played</span>
                    <span className="font-semibold text-blue-600">{playerStats.tournamentsPlayed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tournaments Won</span>
                    <span className="font-semibold text-green-600">{playerStats.tournamentsWon}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Ranking</span>
                    <span className="font-semibold text-purple-600">#{playerStats.currentRanking}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Matches</span>
                    <span className="font-semibold text-gray-900">{playerStats.totalMatches}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Win Rate</span>
                    <span className="font-semibold text-green-600">{playerStats.winRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Score</span>
                    <span className="font-semibold text-blue-600">{playerStats.averageScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Current Status</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Skill Level</span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSkillLevelColor(playerStats.skillLevel)}`}>
                      {playerStats.skillLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Playing Style</span>
                    <span className="font-medium text-gray-900">{playerStats.playingStyle}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Experience</span>
                    <span className="font-medium text-gray-900">{playerStats.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Favorite Court</span>
                    <span className="font-medium text-gray-900">{playerStats.favoriteCourt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Recent Achievements</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {playerStats.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <span className="text-sm text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile; 