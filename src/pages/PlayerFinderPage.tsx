import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { searchPlayers, getNearbyPlayers, getPlayerFinderPreferences, updatePlayerFinderPreferences, togglePlayerFinderStatus, sendMatchRequest } from '../store/slices/playerFinderSlice';
import { User, UpdatePlayerFinderPreferencesRequest, SendMatchRequestRequest } from '../types/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { useAnimation } from '../hooks/useAnimation';

const PlayerFinderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, nearbyPlayers, preferences, loading, error } = useSelector((state: RootState) => state.playerFinder);
  const { user } = useSelector((state: RootState) => state.auth);
  const { elementRef: headerRef } = useAnimation();
  const [searchParams, setSearchParams] = useState({
    skill_level: '4.0' as const,
    gender: 'any' as const,
    age_min: 18,
    age_max: 65,
    match_type: 'any' as const,
    radius: 50,
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

  useEffect(() => {
    if (user) {
      dispatch(getPlayerFinderPreferences());
      dispatch(getNearbyPlayers(10));
    }
  }, [dispatch, user]);

  const handleSearch = () => {
    dispatch(searchPlayers({
      ...searchParams,
      latitude: user?.latitude,
      longitude: user?.longitude,
      page: 1,
      limit: 20,
    }));
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
      <div ref={headerRef} className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Player Finder</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowPreferences(true)}>Preferences</Button>
          <Button 
            variant={preferences?.is_active ? "default" : "secondary"}
            onClick={handleToggleStatus}
          >
            {preferences?.is_active ? 'Active' : 'Inactive'}
          </Button>
        </div>
      </div>

              {/* Search Section */}
       <div className="animate-on-scroll mb-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Find Players</CardTitle>
            <CardDescription>Search for players based on your criteria</CardDescription>
          </CardHeader>
          <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            <div>
              <Label htmlFor="skill_level">Skill Level</Label>
              <Select
                value={searchParams.skill_level}
                onValueChange={(value) => setSearchParams({ ...searchParams, skill_level: value as any })}
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
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={searchParams.gender}
                onValueChange={(value) => setSearchParams({ ...searchParams, gender: value as any })}
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
                onValueChange={(value) => setSearchParams({ ...searchParams, match_type: value as any })}
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
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            Search Players
          </Button>
        </CardContent>
        </Card>
      </div>

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
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {searchResults.map((player, index) => {
              // const config = animationConfigs.playerFinder.results[index % 3]; // Removed as per edit hint
              return (
                <div
                  key={player.id}
                  // variants={getAnimationVariants(config.direction, config.duration, config.delay)} // Removed as per edit hint
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{player.full_name || player.username}</CardTitle>
                      <CardDescription>
                        {player.city}, {player.state} • Skill: {player.skill_level}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Age:</span>
                          <span>{player.age || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Gender:</span>
                          <span>{player.gender || 'N/A'}</span>
                        </div>
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

      {/* Nearby Players */}
      {nearbyPlayers.length > 0 && (
        <div
        >
          <h2 className="text-2xl font-bold mb-4">Nearby Players</h2>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {nearbyPlayers.map((player, index) => {
              // const config = animationConfigs.playerFinder.nearby[index % 3]; // Removed as per edit hint
              return (
                <div
                  key={player.id}
                  // variants={getAnimationVariants(config.direction, config.duration, config.delay)} // Removed as per edit hint
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
                        <div className="flex justify-between text-sm">
                          <span>Skill Level:</span>
                          <span>{player.skill_level}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Age:</span>
                          <span>{player.age || 'N/A'}</span>
                        </div>
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