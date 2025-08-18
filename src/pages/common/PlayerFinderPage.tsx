import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { searchPlayers, fetchNearbyPlayers, fetchPlayerFinderPreferences, updatePlayerFinderPreferences, togglePlayerFinderStatus, sendMatchRequest } from '../../store/slices/playerFinderSlice';
import { User, UpdatePlayerFinderPreferencesRequest, SendMatchRequestRequest } from '../../types/api';
import { toast } from 'sonner';

// PlayerCard Component
interface PlayerCardProps {
  player: any;
  onFavorite: (playerId: string) => void;
  onShare: (player: any) => void;
  onViewProfile: (player: any) => void;
  onSendRequest: (playerId: string) => void;
  isFavorite: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  onFavorite,
  onShare,
  onViewProfile,
  onSendRequest,
  isFavorite
}) => {
  return (
    <div className="hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-lg animate-on-scroll">
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold flex items-center justify-center animate-on-scroll">
              {player.full_name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 animate-on-scroll">
                {player.full_name}
                {player.is_online && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-2 animate-on-scroll">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {player.city}, {player.state} • {player.distance_km.toFixed(1)}km away
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onFavorite(player.id)}
              className={`p-2 rounded-md hover:bg-gray-100 transition-colors animate-on-scroll ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            >
              <svg className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              onClick={() => onShare(player)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 animate-on-scroll"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
            <button
              onClick={() => onViewProfile(player)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 animate-on-scroll"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4 space-y-3">
        {/* Skill Level & Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-500 fill-current" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-semibold text-lg animate-on-scroll">{player.skill_level}</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 animate-on-scroll">
              Skill Level
            </span>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-500 fill-current" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="font-semibold animate-on-scroll">{player.rating}</span>
            </div>
            <p className="text-xs text-gray-500 animate-on-scroll">Rating</p>
          </div>
        </div>

        {/* Availability & Preferences */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium animate-on-scroll ${
              player.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {player.is_available ? 'Available' : 'Unavailable'}
            </span>
            {player.preferred_play_times && (
              <span className="text-gray-600 animate-on-scroll">
                {player.preferred_play_times}
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 animate-on-scroll">
              {player.distance_km.toFixed(1)}km away
            </div>
            <div className="text-xs text-gray-500 animate-on-scroll">Distance</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onSendRequest(player.id)}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
          >
            Send Match Request
          </button>
          <button
            onClick={() => onViewProfile(player)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const PlayerFinderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, nearbyPlayers, preferences, loading, error } = useSelector((state: RootState) => state.playerFinder);
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Enhanced state management
  const [activeTab, setActiveTab] = useState('search');
  const [searchParams, setSearchParams] = useState({
    skill_level: '4.0' as string,
    gender: 'any' as string,
    age_min: 18,
    age_max: 65,
    match_type: 'any' as string,
    radius: 50,
    availability: 'any' as string,
    experience_years: 'any' as string,
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferencesData, setPreferencesData] = useState<Partial<UpdatePlayerFinderPreferencesRequest>>({
    skill_level_min: '3.0',
    skill_level_max: '5.0',
    preferred_gender: 'any',
    age_range_min: 18,
    age_range_max: 65,
    search_radius_km: 50,
    match_type: 'any',
    contact_method: 'any',
    auto_notify: true,
  });

  // Comprehensive mock data for demonstration
  const mockPlayers = [
    {
      id: '1',
      full_name: 'Sarah Johnson',
      username: 'sarah_pickle',
      age: 28,
      gender: 'female',
      skill_level: '4.5',
      city: 'Guadalajara',
      state: 'Jalisco',
      distance_km: 2.3,
      availability: 'weekends',
      experience_years: 3,
      phone: '+52 33 1234 5678',
      email: 'sarah.j@email.com',
      bio: 'Competitive player looking for doubles partners. Available weekends and evenings.',
      achievements: ['Tournament Winner 2023', 'Club Champion 2022'],
      preferred_match_types: ['doubles', 'mixed_doubles'],
      rating: 4.8,
      is_online: true,
      last_active: '2 hours ago',
      profile_photo: '/img/1 (2).jpeg'
    },
    {
      id: '2',
      full_name: 'Carlos Rodriguez',
      username: 'carlos_ace',
      age: 35,
      gender: 'male',
      skill_level: '5.0',
      city: 'Zapopan',
      state: 'Jalisco',
      distance_km: 5.1,
      availability: 'anytime',
      experience_years: 8,
      phone: '+52 33 9876 5432',
      email: 'carlos.r@email.com',
      bio: 'Professional instructor and tournament player. Available for coaching and competitive matches.',
      achievements: ['State Champion 2023', 'National Finalist 2022', 'Certified Coach'],
      preferred_match_types: ['singles', 'doubles'],
      rating: 4.9,
      is_online: true,
      last_active: '30 minutes ago',
      profile_photo: '/img/1 (3).jpeg'
    },
    {
      id: '3',
      full_name: 'Maria Garcia',
      username: 'maria_serve',
      age: 42,
      gender: 'female',
      skill_level: '4.0',
      city: 'Tlaquepaque',
      state: 'Jalisco',
      distance_km: 8.7,
      availability: 'weekdays',
      experience_years: 5,
      phone: null, // Private contact
      email: null,
      bio: 'Recreational player who enjoys friendly matches. Looking for consistent playing partners.',
      achievements: ['Club League Winner 2023'],
      preferred_match_types: ['doubles', 'mixed_doubles'],
      rating: 4.2,
      is_online: false,
      last_active: '1 day ago',
      profile_photo: '/img/1 (4).jpeg'
    },
    {
      id: '4',
      full_name: 'David Martinez',
      username: 'david_smash',
      age: 31,
      gender: 'male',
      skill_level: '3.5',
      city: 'Guadalajara',
      state: 'Jalisco',
      distance_km: 1.2,
      availability: 'evenings',
      experience_years: 2,
      phone: '+52 33 5555 1234',
      email: 'david.m@email.com',
      bio: 'New to competitive play but improving quickly. Looking for practice partners.',
      achievements: ['Most Improved Player 2023'],
      preferred_match_types: ['singles', 'doubles'],
      rating: 4.0,
      is_online: true,
      last_active: '1 hour ago',
      profile_photo: '/img/1 (5).jpeg'
    },
    {
      id: '5',
      full_name: 'Ana Lopez',
      username: 'ana_volley',
      age: 26,
      gender: 'female',
      skill_level: '4.5',
      city: 'Zapopan',
      state: 'Jalisco',
      distance_km: 6.3,
      availability: 'weekends',
      experience_years: 4,
      phone: '+52 33 7777 8888',
      email: 'ana.l@email.com',
      bio: 'Tournament player specializing in mixed doubles. Looking for competitive partners.',
      achievements: ['Mixed Doubles Champion 2023', 'Regional Finalist 2022'],
      preferred_match_types: ['mixed_doubles', 'doubles'],
      rating: 4.7,
      is_online: false,
      last_active: '3 hours ago',
      profile_photo: '/img/1 (6).jpeg'
    },
    {
      id: '6',
      full_name: 'Roberto Silva',
      username: 'roberto_spin',
      age: 38,
      gender: 'male',
      skill_level: '3.0',
      city: 'Guadalajara',
      state: 'Jalisco',
      distance_km: 3.8,
      availability: 'anytime',
      experience_years: 1,
      phone: null,
      email: null,
      bio: 'Beginner player looking to improve. Available for practice and friendly matches.',
      achievements: [],
      preferred_match_types: ['doubles'],
      rating: 3.8,
      is_online: true,
      last_active: '45 minutes ago',
      profile_photo: '/img/1 (7).jpeg'
    }
  ];

  // Enhanced search results state
  const [filteredPlayers, setFilteredPlayers] = useState(mockPlayers);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      dispatch(fetchPlayerFinderPreferences());
      dispatch(fetchNearbyPlayers(10));
    }
  }, [dispatch, user]);

  // Enhanced search functionality
  const handleSearch = () => {
    setSearchPerformed(true);
    
    // Apply filters to mock data
    let filtered = [...mockPlayers];
    
    // Skill level filter
    if (searchParams.skill_level !== 'any') {
      filtered = filtered.filter(player => 
        parseFloat(player.skill_level) >= parseFloat(searchParams.skill_level as string)
      );
    }
    
    // Gender filter
    if (searchParams.gender !== 'any') {
      filtered = filtered.filter(player => player.gender === searchParams.gender);
    }
    
    // Age filter
    filtered = filtered.filter(player => 
      player.age >= searchParams.age_min && player.age <= searchParams.age_max
    );
    
    // Match type filter
    if (searchParams.match_type !== 'any') {
      filtered = filtered.filter(player => 
        player.preferred_match_types.includes(searchParams.match_type)
      );
    }
    
    // Availability filter
    if (searchParams.availability !== 'any') {
      filtered = filtered.filter(player => 
        player.availability === searchParams.availability
      );
    }
    
    // Experience filter
    if (searchParams.experience_years !== 'any') {
      const minYears = parseInt(searchParams.experience_years);
      filtered = filtered.filter(player => player.experience_years >= minYears);
    }
    
    // Distance filter (simulate)
    filtered = filtered.filter(player => player.distance_km <= searchParams.radius);
    
    setFilteredPlayers(filtered);
    
    // Add to recent searches
    const searchString = `Skill: ${searchParams.skill_level}, Gender: ${searchParams.gender}, Age: ${searchParams.age_min}-${searchParams.age_max}`;
    setRecentSearches(prev => [searchString, ...prev.slice(0, 4)]);
    
    toast.success(`Found ${filtered.length} players matching your criteria!`);
  };

  const handleQuickSearch = (skillLevel: string) => {
    setSearchParams(prev => ({ ...prev, skill_level: skillLevel as any }));
    setSearchPerformed(true);
    
    const filtered = mockPlayers.filter(player => 
      parseFloat(player.skill_level) >= parseFloat(skillLevel)
    );
    setFilteredPlayers(filtered);
    
    toast.success(`Found ${filtered.length} players with skill level ${skillLevel}+`);
  };

  const handleFavoritePlayer = (playerId: string) => {
    setFavorites(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
    
    const player = mockPlayers.find(p => p.id === playerId);
    if (player) {
      toast.success(
        favorites.includes(playerId) 
          ? `Removed ${player.full_name} from favorites`
          : `Added ${player.full_name} to favorites`
      );
    }
  };

  const handleSharePlayer = (player: any) => {
    const shareText = `Check out this pickleball player: ${player.full_name} (${player.skill_level} skill level)`;
    const shareUrl = `${window.location.origin}/players/${player.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: player.full_name,
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
        toast.success('Player profile link copied to clipboard!');
      });
    }
  };

  const handleViewProfile = (player: any) => {
    toast.info(`Viewing ${player.full_name}'s profile`, {
      description: `Skill: ${player.skill_level} • ${player.city}, ${player.state}`,
      duration: 3000
    });
    // In a real app, this would navigate to player profile
  };

  const handleUpdatePreferences = async () => {
    try {
      await dispatch(updatePlayerFinderPreferences(preferencesData as UpdatePlayerFinderPreferencesRequest)).unwrap();
      toast.success('Preferences updated successfully');
      setShowPreferences(false);
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  const handleToggleStatus = async () => {
    try {
      await dispatch(togglePlayerFinderStatus()).unwrap();
      toast.success('Player finder status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleSendMatchRequest = async (targetUserId: string) => {
    const message = prompt('Enter a message for your match request:');
    if (message) {
      try {
        await dispatch(sendMatchRequest({
          targetUserId,
          requestData: { message }
        })).unwrap();
        toast.success('Match request sent successfully');
      } catch (error) {
        toast.error('Failed to send match request');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Player Finder
          </h1>
          <p className="text-gray-600 mt-2">Connect with pickleball players in your area</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPreferences(true)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 00-1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Preferences
          </button>
          <button 
            onClick={handleToggleStatus}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
              preferences?.is_active 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.83 2.17a1 1 0 00-1.66 0L2.17 4.83a1 1 0 000 1.66L4.83 8.83a1 1 0 001.66 0L8.83 6.17a1 1 0 000-1.66L4.83 2.17zM4.83 15.17a1 1 0 00-1.66 0L2.17 17.83a1 1 0 000 1.66L4.83 21.83a1 1 0 001.66 0L8.83 19.17a1 1 0 000-1.66L4.83 15.17z" />
            </svg>
            {preferences?.is_active ? 'Active' : 'Inactive'}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-blue-600">Total Players</p>
                <p className="text-2xl font-bold text-blue-900">{mockPlayers.length}</p>
            </div>
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-green-600">Online Now</p>
                <p className="text-2xl font-bold text-green-900">{mockPlayers.filter(p => p.is_online).length}</p>
              </div>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Nearby (5km)</p>
                <p className="text-2xl font-bold text-purple-900">{mockPlayers.filter(p => p.distance_km <= 5).length}</p>
              </div>
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">High Skill (4.5+)</p>
                <p className="text-2xl font-bold text-orange-900">{mockPlayers.filter(p => parseFloat(p.skill_level) >= 4.5).length}</p>
              </div>
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="space-y-6">
        <div className="grid w-full grid-cols-4 bg-gray-100 rounded-lg p-1">
          <button 
            onClick={() => setActiveTab('search')}
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'search' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
          <button 
            onClick={() => setActiveTab('nearby')}
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'nearby' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Nearby
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'favorites' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Favorites
          </button>
          <button 
            onClick={() => setActiveTab('recent')}
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'recent' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent
          </button>
            </div>

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Privacy Notice */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Privacy Notice</p>
                  <p className="mt-1">
                    Only players who have enabled "Can Be Found in Search" appear in these results. 
                    Contact information is only shown for players who have enabled "Show Contact Information".
                    Skill levels are only visible when players have enabled "Show Skill Level".
                  </p>
                  <p className="mt-2 font-medium">How to respect privacy:</p>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    <li>Only contact players who have enabled contact information sharing</li>
                    <li>Use match requests for players who prefer platform-based communication</li>
                    <li>Respect when players choose to remain private</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <p className="text-xs text-blue-700">
                      <strong>Learn more:</strong> Read our{' '}
                      <a href="/privacy-policy" className="underline hover:text-blue-900 font-medium">
                        Privacy Policy
                      </a>{' '}
                      to understand how we protect your data and privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Search Buttons */}
            <div className="border border-gray-200 rounded-lg">
              <div className="p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Quick Search
                </h3>
                <p className="text-sm text-gray-600 mb-4">Find players by skill level quickly</p>
                <div className="flex flex-wrap gap-3">
                  {['2.5', '3.0', '3.5', '4.0', '4.5', '5.0'].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleQuickSearch(level)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {level}+ Skill
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Search */}
            <div className="border border-gray-200 rounded-lg">
              <div className="p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L6.293 13H5a1 1 0 01-1-1V4z" />
                  </svg>
                  Advanced Search
                </h3>
                <p className="text-sm text-gray-600 mb-4">Customize your search criteria</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
                    <label htmlFor="skill_level" className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                    <select
                      id="skill_level"
                      value={searchParams.skill_level}
                      onChange={(e) => setSearchParams({ ...searchParams, skill_level: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="any">Any</option>
                      <option value="2.5">2.5</option>
                      <option value="3.0">3.0</option>
                      <option value="3.5">3.5</option>
                      <option value="4.0">4.0</option>
                      <option value="4.5">4.5</option>
                      <option value="5.0">5.0</option>
                      <option value="5.5">5.5</option>
                    </select>
            </div>
            <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      id="gender"
                      value={searchParams.gender}
                      onChange={(e) => setSearchParams({ ...searchParams, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="any">Any</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
            </div>
            <div>
                    <label htmlFor="age_min" className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
                    <input
                id="age_min"
                type="number"
                value={searchParams.age_min}
                onChange={(e) => setSearchParams({ ...searchParams, age_min: parseInt(e.target.value) })}
                min="18"
                max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
                    <label htmlFor="age_max" className="block text-sm font-medium text-gray-700 mb-1">Max Age</label>
                    <input
                id="age_max"
                type="number"
                value={searchParams.age_max}
                onChange={(e) => setSearchParams({ ...searchParams, age_max: parseInt(e.target.value) })}
                min="18"
                max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label htmlFor="match_type" className="block text-sm font-medium text-gray-700 mb-1">Match Type</label>
                    <select
                      id="match_type"
                      value={searchParams.match_type}
                      onChange={(e) => setSearchParams({ ...searchParams, match_type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="any">Any</option>
                      <option value="singles">Singles</option>
                      <option value="doubles">Doubles</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">Search Radius (km)</label>
                    <select
                      id="radius"
                      value={searchParams.radius}
                      onChange={(e) => setSearchParams({ ...searchParams, radius: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="10">10 km</option>
                      <option value="25">25 km</option>
                      <option value="50">50 km</option>
                      <option value="100">100 km</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <select
                      id="availability"
                      value={searchParams.availability}
                      onChange={(e) => setSearchParams({ ...searchParams, availability: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="any">Any</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="evenings">Evenings</option>
                      <option value="anytime">Anytime</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700 mb-1">Min Experience</label>
                    <select
                      id="experience_years"
                      value={searchParams.experience_years}
                      onChange={(e) => setSearchParams({ ...searchParams, experience_years: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="any">Any</option>
                      <option value="1">1+ years</option>
                      <option value="2">2+ years</option>
                      <option value="3">3+ years</option>
                      <option value="5">5+ years</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
            Search Players
                  </button>
                  <button 
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    onClick={() => {
                      setSearchParams({
                        skill_level: '4.0',
                        gender: 'any',
                        age_min: 18,
                        age_max: 65,
                        match_type: 'any',
                        radius: 50,
                        availability: 'any',
                        experience_years: 'any',
                      });
                      setFilteredPlayers(mockPlayers);
                      setSearchPerformed(false);
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Search Results */}
            {searchPerformed && filteredPlayers.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    Search Results ({filteredPlayers.length} players found)
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlayers.map((player) => (
                      <PlayerCard 
                        key={player.id} 
                        player={player} 
                        onFavorite={handleFavoritePlayer}
                        onShare={handleSharePlayer}
                        onViewProfile={handleViewProfile}
                        onSendRequest={handleSendMatchRequest}
                        isFavorite={favorites.includes(player.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {searchPerformed && filteredPlayers.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-8 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No players found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria or expanding your search radius.</p>
                  <button onClick={() => setSearchPerformed(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nearby Tab */}
        <div className="space-y-6" style={{ display: activeTab === 'nearby' ? 'block' : 'none' }}>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Nearby Players
              </h3>
              <p className="text-sm text-gray-600 mt-1">Players in your area who are looking for matches</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPlayers
                  .filter(p => p.distance_km <= 10)
                  .sort((a, b) => a.distance_km - b.distance_km)
                  .map((player) => (
                    <PlayerCard 
                      key={player.id} 
                      player={player} 
                      onFavorite={handleFavoritePlayer}
                      onShare={handleSharePlayer}
                      onViewProfile={handleViewProfile}
                      onSendRequest={handleSendMatchRequest}
                      isFavorite={favorites.includes(player.id)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Tab */}
        <div className="space-y-6" style={{ display: activeTab === 'favorites' ? 'block' : 'none' }}>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorite Players
              </h3>
              <p className="text-sm text-gray-600 mt-1">Players you've marked as favorites</p>
            </div>
            <div className="p-6">
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockPlayers
                    .filter(p => favorites.includes(p.id))
                    .map((player) => (
                      <PlayerCard 
                        key={player.id} 
                        player={player} 
                        onFavorite={handleFavoritePlayer}
                        onShare={handleSharePlayer}
                        onViewProfile={handleViewProfile}
                        onSendRequest={handleSendMatchRequest}
                        isFavorite={true}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                  <p className="text-gray-600">Start searching for players and add them to your favorites!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Searches Tab */}
        <div className="space-y-6" style={{ display: activeTab === 'recent' ? 'block' : 'none' }}>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Searches
              </h3>
              <p className="text-sm text-gray-600 mt-1">Your recent search criteria</p>
            </div>
            <div className="p-6">
              {recentSearches.length > 0 ? (
                <div className="space-y-3">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{search}</span>
                      <button 
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        onClick={() => {
                          // Parse and apply the search
                          const skillMatch = search.match(/Skill: ([\d.]+)/);
                          if (skillMatch) {
                            handleQuickSearch(skillMatch[1]);
                          }
                        }}
                      >
                        Use Again
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent searches</h3>
                  <p className="text-gray-600">Your search history will appear here after you perform searches.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Player Finder Preferences</h3>
              <p className="text-sm text-gray-600 mt-1">Set your preferences for finding players</p>
            </div>
            <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="skill_level_min" className="block text-sm font-medium text-gray-700 mb-1">Min Skill Level</label>
                <select
                  id="skill_level_min"
                  value={preferencesData.skill_level_min}
                  onChange={(e) => setPreferencesData({ ...preferencesData, skill_level_min: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2.5">2.5</option>
                  <option value="3.0">3.0</option>
                  <option value="3.5">3.5</option>
                  <option value="4.0">4.0</option>
                  <option value="4.5">4.5</option>
                  <option value="5.0">5.0</option>
                  <option value="5.5">5.5</option>
                </select>
              </div>
              <div>
                <label htmlFor="skill_level_max" className="block text-sm font-medium text-gray-700 mb-1">Max Skill Level</label>
                <select
                  id="skill_level_max"
                  value={preferencesData.skill_level_max}
                  onChange={(e) => setPreferencesData({ ...preferencesData, skill_level_max: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2.5">2.5</option>
                  <option value="3.0">3.0</option>
                  <option value="3.5">3.5</option>
                  <option value="4.0">4.0</option>
                  <option value="4.5">4.5</option>
                  <option value="5.0">5.0</option>
                  <option value="5.5">5.5</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="age_min" className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
                <input
                  id="age_min"
                  type="number"
                  value={preferencesData.age_range_min}
                  onChange={(e) => setPreferencesData({ ...preferencesData, age_range_min: parseInt(e.target.value) })}
                  min="18"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="age_max" className="block text-sm font-medium text-gray-700 mb-1">Max Age</label>
                <input
                  id="age_max"
                  type="number"
                  value={preferencesData.age_range_max}
                  onChange={(e) => setPreferencesData({ ...preferencesData, age_range_max: parseInt(e.target.value) })}
                  min="18"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="search_radius" className="block text-sm font-medium text-gray-700 mb-1">Search Radius (km)</label>
                <input
                  id="search_radius"
                  type="number"
                  value={preferencesData.search_radius_km}
                  onChange={(e) => setPreferencesData({ ...preferencesData, search_radius_km: parseInt(e.target.value) })}
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="auto_notify"
                  checked={preferencesData.auto_notify}
                  onChange={(e) => setPreferencesData({ ...preferencesData, auto_notify: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="auto_notify" className="text-sm font-medium text-gray-700">Auto Notify</label>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleUpdatePreferences} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Save Preferences
              </button>
              <button onClick={() => setShowPreferences(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Cancel
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium">Privacy Notice</p>
                <p className="mt-1">
                  Only players who have enabled "Can Be Found in Search" appear in these results. 
                  Contact information is only shown for players who have enabled "Show Contact Information".
                  Skill levels are only visible when players have enabled "Show Skill Level".
                </p>
                <p className="mt-2 font-medium">How to respect privacy:</p>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li>Only contact players who have enabled contact information sharing</li>
                  <li>Use match requests for players who prefer platform-based communication</li>
                  <li>Respect when players choose to remain private</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-blue-700">
                    <strong>Learn more:</strong> Read our{' '}
                    <a href="/privacy-policy" className="underline hover:text-blue-900 font-medium">
                      Privacy Policy
                    </a>{' '}
                    to understand how we protect your data and privacy.
                </p>
              </div>
            </div>
          </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((player, index) => {
              // Only show players who are visible in search (this should be handled by the API)
              // For now, we'll assume the API already filters by privacy settings
              return (
                <div key={player.id}>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">{player.full_name || player.username}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {player.city}, {player.state}
                        {player.skill_level && ` • Skill: ${player.skill_level}`}
                      </p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-2">
                        {player.age && (
                          <div className="flex justify-between text-sm">
                            <span>Age:</span>
                            <span>{player.age}</span>
                          </div>
                        )}
                        {player.gender && (
                          <div className="flex justify-between text-sm">
                            <span>Gender:</span>
                            <span>{player.gender}</span>
                          </div>
                        )}
                        {/* Privacy-aware contact information display */}
                        {player.phone && (
                          <div className="flex justify-between text-sm">
                            <span>Phone:</span>
                            <span className="text-green-600 font-medium">✓ Available</span>
                          </div>
                        )}
                        {!player.phone && (
                          <div className="flex justify-between text-sm">
                            <span>Phone:</span>
                            <span className="text-gray-500">Private</span>
                          </div>
                        )}
                        {/* Privacy-aware skill level display */}
                        {player.skill_level && (
                          <div className="flex justify-between text-sm">
                            <span>Skill Level:</span>
                            <span className="text-blue-600 font-medium">{player.skill_level}</span>
                          </div>
                        )}
                        {!player.skill_level && (
                          <div className="flex justify-between text-sm">
                            <span>Skill Level:</span>
                            <span className="text-gray-500">Private</span>
                          </div>
                        )}
                        <div className="pt-2">
                          <button 
                            className="w-full px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          onClick={() => handleSendMatchRequest(player.id)}
                        >
                          Send Match Request
                          </button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Nearby Players */}
      {nearbyPlayers.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Nearby Players</h2>
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="h-5 w-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="text-sm text-green-800">
                <p className="font-medium">Nearby Players</p>
                <p className="mt-1">
                  These are players in your area who have enabled visibility in search results.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyPlayers.map((player, index) => {
              return (
                <div key={player.id}>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">{player.full_name || player.username}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {player.city}, {player.state} • {player.distance_km.toFixed(1)}km away
                      </p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-2">
                        {player.skill_level && (
                          <div className="flex justify-between text-sm">
                            <span>Skill Level:</span>
                            <span>{player.skill_level}</span>
                          </div>
                        )}
                        {player.age && (
                          <div className="flex justify-between text-sm">
                            <span>Age:</span>
                            <span>{player.age}</span>
                          </div>
                        )}
                        <button 
                          className="w-full px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          onClick={() => handleSendMatchRequest(player.id)}
                        >
                          Send Match Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerFinderPage; 