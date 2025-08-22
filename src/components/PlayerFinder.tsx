import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  Search,
  MapPin,
  Star,
  MessageSquare,
  Filter,
  Users,
  Shield,
  Navigation
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../lib/api';
import { User } from '../types/api';

interface SearchFilters {
  location?: string;
  radius?: number;
  skillLevel?: string;
  minAge?: number;
  maxAge?: number;
  gender?: string;
  state?: string;
  city?: string;
}

interface PlayerMatch extends User {
  distance?: number;
  matchScore: number;
}

interface SearchResults {
  players: PlayerMatch[];
  currentPage: number;
  totalPages: number;
  total: number;
}

interface PlayerFinderProps {
  className?: string;
}

const PlayerFinder = ({ className }: PlayerFinderProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [players, setPlayers] = useState<PlayerMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    radius: 25, // Default 25km radius
    skillLevel: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults>({
    players: [],
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerMatch | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  // Privacy check - ensure user has enabled "can be found"
  const canUsePlayerFinder = user?.can_be_found !== false;

  const searchPlayers = useCallback(async (page = 1) => {
    if (!canUsePlayerFinder) {
      toast.error('Please enable "Can Be Found" in your privacy settings to use Player Finder');
      return;
    }

    try {
      setLoading(true);
      const searchParams: Record<string, string> = {
        limit: '12',
        offset: ((page - 1) * 12).toString()
      };

      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams[key] = value.toString();
        }
      });

      const response = await api.get('/players/find-nearby', {
        params: searchParams
      }) as any;

      if (response.success && response.data) {
        setPlayers(response.data.players || []);
        setSearchResults({
          players: response.data.players || [],
          currentPage: page,
          totalPages: response.data.totalPages || 1,
          total: response.data.total || 0
        });
      }
    } catch (error) {
      console.error('Error searching players:', error);
      toast.error('Failed to search for players');
    } finally {
      setLoading(false);
    }
  }, [filters, canUsePlayerFinder]);

  useEffect(() => {
    if (canUsePlayerFinder) {
      searchPlayers();
    }
  }, [searchPlayers]);

  const handleContactPlayer = async (player: PlayerMatch, message: string) => {
    try {
      const response = await api.post(`/players/${player.id}/contact`, {
        message,
        contact_type: 'play_request'
      }) as any;

      if (response.success) {
        toast.success('Play request sent successfully! The player will be notified.');
        setShowContactModal(false);
        setSelectedPlayer(null);
      }
    } catch (error) {
      toast.error('Failed to send play request');
      console.error('Error contacting player:', error);
    }
  };

  const getSkillLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      '2.5': 'bg-green-100 text-green-800',
      '3.0': 'bg-blue-100 text-blue-800',
      '3.5': 'bg-yellow-100 text-yellow-800',
      '4.0': 'bg-orange-100 text-orange-800',
      '4.5': 'bg-red-100 text-red-800',
      '5.0': 'bg-purple-100 text-purple-800',
      '5.5': 'bg-gray-100 text-gray-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  if (!canUsePlayerFinder) {
    return (
      <div className={`max-w-4xl mx-auto p-6 ${className}`}>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <Shield className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Privacy Setting Required
          </h3>
          <p className="text-yellow-700 mb-4">
            To use the Player Finder feature, you need to enable the "Can Be Found" option in your privacy settings. 
            This allows other players to find you as well, creating a fair and reciprocal system.
          </p>
          <button
            onClick={() => window.location.href = '/player/settings'}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
          >
            Update Privacy Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Users className="h-8 w-8 mr-3 text-blue-600" />
          Find Players to Play With
        </h1>
        <p className="text-gray-600">
          Connect with pickleball players near you or in your travel destination
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter city, state, or address"
                value={filters.location || ''}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => searchPlayers()}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            <Search className="h-5 w-5 mr-2" />
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Radius
                </label>
                <select
                  value={filters.radius || 25}
                  onChange={(e) => setFilters({ ...filters, radius: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={25}>25 km</option>
                  <option value={50}>50 km</option>
                  <option value={100}>100 km</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Level
                </label>
                <select
                  value={filters.skillLevel || ''}
                  onChange={(e) => setFilters({ ...filters, skillLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Level</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={filters.gender || ''}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minAge || ''}
                    onChange={(e) => setFilters({ ...filters, minAge: parseInt(e.target.value) || undefined })}
                    className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAge || ''}
                    onChange={(e) => setFilters({ ...filters, maxAge: parseInt(e.target.value) || undefined })}
                    className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {searchResults.total > 0 
              ? `Found ${searchResults.total} players` 
              : 'No players found'
            }
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <div key={player.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {player.profile_photo ? (
                        <img
                          src={player.profile_photo}
                          alt={player.full_name || player.username}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                      )}
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {player.full_name || player.username}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {player.city}, {player.state}
                          {player.distance && (
                            <span className="ml-2">
                              ({player.distance.toFixed(1)} km away)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {player.skill_level && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(player.skill_level)}`}>
                          Level {player.skill_level}
                        </span>
                      </div>
                    )}
                    {player.age && (
                      <div className="text-sm text-gray-600">
                        Age: {player.age}
                      </div>
                    )}
                    {player.club && (
                      <div className="text-sm text-gray-600">
                        Club: {player.club.name}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPlayer(player);
                      setShowContactModal(true);
                    }}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Play Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedPlayer && (
        <ContactPlayerModal
          player={selectedPlayer}
          onClose={() => {
            setShowContactModal(false);
            setSelectedPlayer(null);
          }}
          onSubmit={handleContactPlayer}
        />
      )}
    </div>
  );
};

// Contact Player Modal Component
interface ContactPlayerModalProps {
  player: PlayerMatch;
  onClose: () => void;
  onSubmit: (player: PlayerMatch, message: string) => void;
}

const ContactPlayerModal = ({ player, onClose, onSubmit }: ContactPlayerModalProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    onSubmit(player, message);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">
          Send Play Request to {player.full_name || player.username}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I'd like to play pickleball with you. Are you available this week?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerFinder;