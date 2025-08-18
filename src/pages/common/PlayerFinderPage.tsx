import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { searchPlayers, fetchNearbyPlayers, fetchPlayerFinderPreferences, updatePlayerFinderPreferences, togglePlayerFinderStatus, sendMatchRequest } from '../../store/slices/playerFinderSlice';
import { User, UpdatePlayerFinderPreferencesRequest, SendMatchRequestRequest } from '../../types/api';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Slider } from '../../components/ui/slider';
import { Switch } from '../../components/ui/switch';
import { toast } from 'sonner';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Shield, 
  MapPin, 
  Search, 
  Users, 
  Star, 
  MessageCircle, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Target, 
  Filter,
  Heart,
  Share2,
  Eye,
  UserPlus,
  Settings,
  Bell,
  Zap,
  TrendingUp,
  Award,
  Trophy,
  Map,
  Navigation
} from 'lucide-react';

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
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={player.profile_photo} alt={player.full_name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {player.full_name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {player.full_name}
                {player.is_online && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {player.city}, {player.state} • {player.distance_km.toFixed(1)}km away
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFavorite(player.id)}
              className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(player)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewProfile(player)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Skill Level & Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-semibold text-lg">{player.skill_level}</span>
            <Badge variant="secondary" className="text-xs">
              Skill Level
            </Badge>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold">{player.rating}</span>
            </div>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 overflow-hidden text-ellipsis display-webkit-box -webkit-line-clamp-2 -webkit-box-orient-vertical">
          {player.bio}
        </p>

        {/* Achievements */}
        {player.achievements.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Achievements</p>
            <div className="flex flex-wrap gap-1">
              {player.achievements.slice(0, 3).map((achievement: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Trophy className="w-3 h-3 mr-1" />
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Match Types */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Preferred Match Types</p>
          <div className="flex flex-wrap gap-1">
            {player.preferred_match_types.map((type: string) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contact Information (Privacy-aware) */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <span>Phone:</span>
            {player.phone ? (
              <span className="text-green-600 font-medium flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Available
              </span>
            ) : (
              <span className="text-gray-500">Private</span>
            )}
          </div>
          <div className="flex justify-between text-sm">
            <span>Email:</span>
            {player.email ? (
              <span className="text-green-600 font-medium flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Available
              </span>
            ) : (
              <span className="text-gray-500">Private</span>
            )}
          </div>
          <div className="flex justify-between text-sm">
            <span>Experience:</span>
            <span className="font-medium">{player.experience_years} years</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Availability:</span>
            <Badge variant="outline" className="text-xs capitalize">
              {player.availability}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3">
          <Button 
            onClick={() => onSendRequest(player.id)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Request
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onViewProfile(player)}
            className="px-3"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Last Active */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
          Last active: {player.last_active}
        </div>
      </CardContent>
    </Card>
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
          <Button 
            variant="outline" 
            onClick={() => setShowPreferences(true)}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Preferences
          </Button>
          <Button 
            variant={preferences?.is_active ? "default" : "secondary"}
            onClick={handleToggleStatus}
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            {preferences?.is_active ? 'Active' : 'Inactive'}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Players</p>
                <p className="text-2xl font-bold text-blue-900">{mockPlayers.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Online Now</p>
                <p className="text-2xl font-bold text-green-900">{mockPlayers.filter(p => p.is_online).length}</p>
              </div>
              <Zap className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Nearby (5km)</p>
                <p className="text-2xl font-bold text-purple-900">{mockPlayers.filter(p => p.distance_km <= 5).length}</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">High Skill (4.5+)</p>
                <p className="text-2xl font-bold text-orange-900">{mockPlayers.filter(p => parseFloat(p.skill_level) >= 4.5).length}</p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </TabsTrigger>
          <TabsTrigger value="nearby" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Nearby
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent
          </TabsTrigger>
        </TabsList>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-6">
          {/* Privacy Notice */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Quick Search
              </CardTitle>
              <CardDescription>Find players by skill level quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {['2.5', '3.0', '3.5', '4.0', '4.5', '5.0'].map((level) => (
                  <Button
                    key={level}
                    variant="outline"
                    onClick={() => handleQuickSearch(level)}
                    className="flex items-center gap-2"
                  >
                    <Star className="w-4 h-4" />
                    {level}+ Skill
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Advanced Search
              </CardTitle>
              <CardDescription>Customize your search criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <Label htmlFor="skill_level">Skill Level</Label>
                  <Select
                    value={searchParams.skill_level}
                    onValueChange={(value) => setSearchParams({ ...searchParams, skill_level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="2.5">2.5</SelectItem>
                      <SelectItem value="3.0">3.0</SelectItem>
                      <SelectItem value="3.5">3.5</SelectItem>
                      <SelectItem value="4.0">4.0</SelectItem>
                      <SelectItem value="4.5">4.5</SelectItem>
                      <SelectItem value="5.0">5.0</SelectItem>
                      <SelectItem value="5.5">5.5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={searchParams.gender}
                    onValueChange={(value) => setSearchParams({ ...searchParams, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="match_type">Match Type</Label>
                  <Select
                    value={searchParams.match_type}
                    onValueChange={(value) => setSearchParams({ ...searchParams, match_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="singles">Singles</SelectItem>
                      <SelectItem value="doubles">Doubles</SelectItem>
                      <SelectItem value="mixed_doubles">Mixed Doubles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="radius">Radius (km)</Label>
                  <Input
                    id="radius"
                    type="number"
                    value={searchParams.radius}
                    onChange={(e) => setSearchParams({ ...searchParams, radius: parseInt(e.target.value) })}
                    min="1"
                    max="100"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <Label htmlFor="age_min">Min Age</Label>
                  <Input
                    id="age_min"
                    type="number"
                    value={searchParams.age_min}
                    onChange={(e) => setSearchParams({ ...searchParams, age_min: parseInt(e.target.value) })}
                    min="18"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="age_max">Max Age</Label>
                  <Input
                    id="age_max"
                    type="number"
                    value={searchParams.age_max}
                    onChange={(e) => setSearchParams({ ...searchParams, age_max: parseInt(e.target.value) })}
                    min="18"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={searchParams.availability}
                    onValueChange={(value) => setSearchParams({ ...searchParams, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="evenings">Evenings</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience_years">Min Experience</Label>
                  <Select
                    value={searchParams.experience_years}
                    onValueChange={(value) => setSearchParams({ ...searchParams, experience_years: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+ years</SelectItem>
                      <SelectItem value="2">2+ years</SelectItem>
                      <SelectItem value="3">3+ years</SelectItem>
                      <SelectItem value="5">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSearch} className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Players
                </Button>
                <Button 
                  variant="outline" 
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
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchPerformed && filteredPlayers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Search Results ({filteredPlayers.length} players found)
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          )}

          {searchPerformed && filteredPlayers.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No players found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or expanding your search radius.</p>
                <Button onClick={() => setSearchPerformed(false)} variant="outline">
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Nearby Tab */}
        <TabsContent value="nearby" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Nearby Players
              </CardTitle>
              <CardDescription>Players in your area who are looking for matches</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Favorite Players
              </CardTitle>
              <CardDescription>Players you've marked as favorites</CardDescription>
            </CardHeader>
            <CardContent>
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
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                  <p className="text-gray-600">Start searching for players and add them to your favorites!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Searches Tab */}
        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Searches
              </CardTitle>
              <CardDescription>Your recent search criteria</CardDescription>
            </CardHeader>
            <CardContent>
              {recentSearches.length > 0 ? (
                <div className="space-y-3">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{search}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Parse and apply the search
                          const skillMatch = search.match(/Skill: ([\d.]+)/);
                          if (skillMatch) {
                            handleQuickSearch(skillMatch[1]);
                          }
                        }}
                      >
                        Use Again
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent searches</h3>
                  <p className="text-gray-600">Your search history will appear here after you perform searches.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preferences Modal */}
      {showPreferences && (
        <div
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Player Finder Preferences</CardTitle>
              <CardDescription>Set your preferences for finding players</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="skill_level_min">Min Skill Level</Label>
                <Select
                  value={preferencesData.skill_level_min}
                  onValueChange={(value) => setPreferencesData({ ...preferencesData, skill_level_min: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3.0">3.0</SelectItem>
                    <SelectItem value="3.5">3.5</SelectItem>
                    <SelectItem value="4.0">4.0</SelectItem>
                    <SelectItem value="4.5">4.5</SelectItem>
                    <SelectItem value="5.0">5.0</SelectItem>
                    <SelectItem value="5.5">5.5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="skill_level_max">Max Skill Level</Label>
                <Select
                  value={preferencesData.skill_level_max}
                  onValueChange={(value) => setPreferencesData({ ...preferencesData, skill_level_max: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3.0">3.0</SelectItem>
                    <SelectItem value="3.5">3.5</SelectItem>
                    <SelectItem value="4.0">4.0</SelectItem>
                    <SelectItem value="4.5">4.5</SelectItem>
                    <SelectItem value="5.0">5.0</SelectItem>
                    <SelectItem value="5.5">5.5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="age_min">Min Age</Label>
                <Input
                  id="age_min"
                  type="number"
                  value={preferencesData.age_range_min}
                  onChange={(e) => setPreferencesData({ ...preferencesData, age_range_min: parseInt(e.target.value) })}
                  min="18"
                  max="100"
                />
              </div>
              <div>
                <Label htmlFor="age_max">Max Age</Label>
                <Input
                  id="age_max"
                  type="number"
                  value={preferencesData.age_range_max}
                  onChange={(e) => setPreferencesData({ ...preferencesData, age_range_max: parseInt(e.target.value) })}
                  min="18"
                  max="100"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="search_radius">Search Radius (km)</Label>
                <Input
                  id="search_radius"
                  type="number"
                  value={preferencesData.search_radius_km}
                  onChange={(e) => setPreferencesData({ ...preferencesData, search_radius_km: parseInt(e.target.value) })}
                  min="1"
                  max="100"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto_notify"
                  checked={preferencesData.auto_notify}
                  onCheckedChange={(checked) => setPreferencesData({ ...preferencesData, auto_notify: checked })}
                />
                <Label htmlFor="auto_notify">Auto Notify</Label>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleUpdatePreferences}>Save Preferences</Button>
              <Button variant="outline" onClick={() => setShowPreferences(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div 
          className="mb-6"
        >
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
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
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {searchResults.map((player, index) => {
              // Only show players who are visible in search (this should be handled by the API)
              // For now, we'll assume the API already filters by privacy settings
              return (
                <div
                  key={player.id}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{player.full_name || player.username}</CardTitle>
                      <CardDescription>
                        {player.city}, {player.state}
                        {player.skill_level && ` • Skill: ${player.skill_level}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
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
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleSendMatchRequest(player.id)}
                          >
                            Send Match Request
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Nearby Players */}
      {nearbyPlayers.length > 0 && (
        <div
        >
          <h2 className="text-2xl font-bold mb-4">Nearby Players</h2>
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-medium">Nearby Players</p>
                <p className="mt-1">
                  These are players in your area who have enabled visibility in search results.
                </p>
              </div>
            </div>
          </div>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {nearbyPlayers.map((player, index) => {
              return (
                <div
                  key={player.id}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{player.full_name || player.username}</CardTitle>
                      <CardDescription>
                        {player.city}, {player.state} • {player.distance_km.toFixed(1)}km away
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
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
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleSendMatchRequest(player.id)}
                        >
                          Send Match Request
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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