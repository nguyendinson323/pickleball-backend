import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toast } from 'sonner';

interface Player {
  id: string;
  name: string;
  email: string;
  phone: string;
  skillLevel: string;
  location: string;
  availability: string[];
  photo?: string;
  isVisible: boolean;
  lastActive: string;
  bio?: string;
  preferredCourts?: string[];
  tournamentHistory?: string[];
  rating?: number;
  notifications?: Array<{
    id: string;
    from: string;
    message: string;
    timestamp: string;
    read: boolean;
  }>;
}

interface SearchFilters {
  skillLevel: string;
  location: string;
  availability: string[];
  maxDistance: number;
  hasPhoto: boolean;
  isActive: boolean;
}

const PlayerFinderPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    skillLevel: '',
    location: '',
    availability: [],
    maxDistance: 50,
    hasPhoto: false,
    isActive: false
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    isVisible: true,
    showEmail: true,
    showPhone: true,
    showLocation: true,
    allowContact: true
  });

  // Mock data - in real app this would come from API
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      name: 'Sarah M.',
      email: 'sarah.m@email.com',
      phone: '+52-33-1234-5678',
      skillLevel: '4.0',
      location: 'Guadalajara, Jalisco',
      availability: ['Weekdays', 'Weekends'],
      isVisible: true,
      lastActive: '2024-03-25',
      bio: 'Advanced player looking for competitive matches and tournament partners.',
      preferredCourts: ['Elite Pickleball Club', 'Sports Center'],
      tournamentHistory: ['Spring Championship 2024', 'Summer League 2023'],
      rating: 4.8
    },
    {
      id: '2',
      name: 'Mike R.',
      email: 'mike.r@email.com',
      phone: '+52-33-1234-5680',
      skillLevel: '3.0',
      location: 'Zapopan, Jalisco',
      availability: ['Weekends'],
      isVisible: true,
      lastActive: '2024-03-24',
      bio: 'Intermediate player learning the game, open to friendly matches.',
      preferredCourts: ['Community Center'],
      tournamentHistory: [],
      rating: 3.2
    },
    {
      id: '3',
      name: 'Lisa K.',
      email: 'lisa.k@email.com',
      phone: '+52-33-1234-5682',
      skillLevel: '4.5',
      location: 'Tlaquepaque, Jalisco',
      availability: ['Weekdays'],
      isVisible: false,
      lastActive: '2024-03-25',
      bio: 'Advanced player and former club champion. Available for coaching.',
      preferredCourts: ['Elite Pickleball Club'],
      tournamentHistory: ['Club Champion 2023', 'State Finals 2023'],
      rating: 4.9
    }
  ]);

  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  useEffect(() => {
    filterPlayers();
  }, [searchQuery, filters, players]);

  const filterPlayers = () => {
    let filtered = players.filter(player => player.isVisible);

    if (searchQuery) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.skillLevel) {
      filtered = filtered.filter(player => player.skillLevel === filters.skillLevel);
    }

    if (filters.location) {
      filtered = filtered.filter(player => 
        player.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.availability.length > 0) {
      filtered = filtered.filter(player =>
        filters.availability.some(avail => player.availability.includes(avail))
      );
    }

    if (filters.hasPhoto) {
      filtered = filtered.filter(player => player.photo);
    }

    if (filters.isActive) {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      filtered = filtered.filter(player => new Date(player.lastActive) >= lastWeek);
    }

    setFilteredPlayers(filtered);
  };

  const handleContactPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setShowContactModal(true);
  };

  const sendContactMessage = () => {
    if (!contactMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    // In a real app, this would send a notification to the player
    toast.success(`Message sent to ${selectedPlayer?.name}! They will be notified.`);
    
    // Add notification to the player (in real app this would be via API)
    const updatedPlayers = players.map(p => {
      if (p.id === selectedPlayer?.id) {
        return {
          ...p,
          notifications: [...(p.notifications || []), {
            id: Date.now().toString(),
            from: user?.name || 'Anonymous',
            message: contactMessage,
            timestamp: new Date().toISOString(),
            read: false
          }]
        };
      }
      return p;
    });
    
    setPlayers(updatedPlayers);
    setShowContactModal(false);
    setContactMessage('');
    setSelectedPlayer(null);
  };

  const updatePrivacySettings = () => {
    // In a real app, this would update the user's privacy settings via API
    const updatedPlayers = players.map(p => {
      if (p.id === user?.id) {
        return { ...p, ...privacySettings };
      }
      return p;
    });
    
    setPlayers(updatedPlayers);
    setShowPrivacySettings(false);
    toast.success('Privacy settings updated successfully!');
  };

  const getSkillLevelColor = (level: string) => {
    const numLevel = parseFloat(level);
    if (numLevel >= 4.5) return 'bg-purple-100 text-purple-800';
    if (numLevel >= 4.0) return 'bg-blue-100 text-blue-800';
    if (numLevel >= 3.5) return 'bg-green-100 text-green-800';
    if (numLevel >= 3.0) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getAvailabilityBadges = (availability: string[]) => {
    return availability.map(avail => (
      <span key={avail} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1">
        {avail}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Players</h1>
              <p className="text-gray-600">Connect with pickleball players in your area</p>
            </div>
            <button
              onClick={() => setShowPrivacySettings(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              Privacy Settings
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Players</label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, location, or bio..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                  <select
                    value={filters.skillLevel}
                    onChange={(e) => setFilters({...filters, skillLevel: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Levels</option>
                    <option value="2.5">2.5 - Beginner</option>
                    <option value="3.0">3.0 - Beginner+</option>
                    <option value="3.5">3.5 - Intermediate</option>
                    <option value="4.0">4.0 - Intermediate+</option>
                    <option value="4.5">4.5 - Advanced</option>
                    <option value="5.0">5.0+ - Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    placeholder="City, State, or Area"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Distance (km)</label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={filters.maxDistance}
                    onChange={(e) => setFilters({...filters, maxDistance: parseInt(e.target.value)})}
                    className="block w-full"
                  />
                  <span className="text-sm text-gray-600">{filters.maxDistance} km</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <div className="space-y-2">
                    {['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'].map(avail => (
                      <label key={avail} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.availability.includes(avail)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({...filters, availability: [...filters.availability, avail]});
                            } else {
                              setFilters({...filters, availability: filters.availability.filter(a => a !== avail)});
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{avail}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Filters</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.hasPhoto}
                        onChange={(e) => setFilters({...filters, hasPhoto: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Has Profile Photo</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.isActive}
                        onChange={(e) => setFilters({...filters, isActive: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Recently Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Found {filteredPlayers.length} player{filteredPlayers.length !== 1 ? 's' : ''} matching your criteria
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 h-16 w-16">
                    {player.photo ? (
                      <img className="h-16 w-16 rounded-full object-cover" src={player.photo} alt={player.name} />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-medium">
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{player.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(player.skillLevel)}`}>
                      {player.skillLevel}
                    </span>
                    {player.rating && (
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`h-4 w-4 ${i < Math.floor(player.rating!) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">({player.rating})</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="text-sm font-medium text-gray-900">{player.location}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Availability</p>
                    <div className="flex flex-wrap gap-1">
                      {getAvailabilityBadges(player.availability)}
                    </div>
                  </div>

                  {player.bio && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Bio</p>
                      <p className="text-sm text-gray-900 line-clamp-2">{player.bio}</p>
                    </div>
                  )}

                  {player.tournamentHistory && player.tournamentHistory.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Recent Tournaments</p>
                      <div className="space-y-1">
                        {player.tournamentHistory.slice(0, 2).map((tournament, index) => (
                          <p key={index} className="text-xs text-gray-600">• {tournament}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Last active: {new Date(player.lastActive).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleContactPlayer(player)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No players found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedPlayer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Contact {selectedPlayer.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Introduce yourself and explain why you'd like to connect..."
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Your message will be sent as a notification to {selectedPlayer.name}. They can choose to respond or block further contact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowContactModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={sendContactMessage}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings Modal */}
      {showPrivacySettings && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        These settings control how other players can find and contact you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={privacySettings.isVisible}
                      onChange={(e) => setPrivacySettings({...privacySettings, isVisible: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Can Be Found in Search</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={privacySettings.showEmail}
                      onChange={(e) => setPrivacySettings({...privacySettings, showEmail: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Show Email to Other Players</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={privacySettings.showPhone}
                      onChange={(e) => setPrivacySettings({...privacySettings, showPhone: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Show Phone to Other Players</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={privacySettings.showLocation}
                      onChange={(e) => setPrivacySettings({...privacySettings, showLocation: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Show Location to Other Players</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={privacySettings.allowContact}
                      onChange={(e) => setPrivacySettings({...privacySettings, allowContact: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Allow Other Players to Contact Me</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowPrivacySettings(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={updatePrivacySettings}
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerFinderPage; 