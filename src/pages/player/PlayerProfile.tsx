import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Switch } from '../../components/ui/switch';
import ProfilePhoto from '../../components/ui/ProfilePhoto';
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
    playingStyle: 'all-around', // Default value since not in User type
    bio: 'Tell us about your pickleball journey...', // Default value since not in User type
    profilePhoto: user?.profile_photo || ''
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    isVisibleInSearch: user?.can_be_found ?? true, // Use actual user data
    showContactInfo: false,  // Default to hidden
    showSkillLevel: true     // Default to visible
  });

  // Update privacy settings when user data changes
  React.useEffect(() => {
    if (user?.can_be_found !== undefined) {
      setPrivacySettings(prev => ({
        ...prev,
        isVisibleInSearch: user.can_be_found
      }));
    }
  }, [user?.can_be_found]);

  // Mock player statistics
  const playerStats = {
    tournamentsPlayed: 12,
    tournamentsWon: 3,
    currentRanking: 45,
    totalPoints: 1250,
    matchesPlayed: 48,
    winRate: 68,
    memberSince: '2023-01-15'
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyChange = async (setting: string, value: boolean) => {
    if (setting === 'isVisibleInSearch') {
      try {
        // Call API to toggle visibility
        const response = await api.put(`/users/${user?.id}/toggle-visibility`, {}) as any;
        
        if (response.success) {
          setPrivacySettings(prev => ({
            ...prev,
            [setting]: value
          }));
          toast.success(response.message);
        }
      } catch (error) {
        console.error('Error toggling visibility:', error);
        toast.error('Failed to update visibility setting');
        // Revert the change
        setPrivacySettings(prev => ({
          ...prev,
          [setting]: !value
        }));
      }
    } else {
      setPrivacySettings(prev => ({
        ...prev,
        [setting]: value
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving profile:', profileData);
    console.log('Saving privacy settings:', privacySettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setProfileData({
      username: user?.username || '',
      email: user?.email || '',
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      phone: user?.phone || '',
      city: user?.city || '',
      state: user?.state || '',
      dateOfBirth: user?.date_of_birth || '',
      skillLevel: user?.skill_level || 'beginner',
      playingStyle: 'all-around', // Default value since not in User type
      bio: 'Tell us about your pickleball journey...', // Default value since not in User type
      profilePhoto: user?.profile_photo || ''
    });
    setPrivacySettings({
      isVisibleInSearch: true,
      showContactInfo: false,
      showSkillLevel: true
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Playing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Playing Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="skillLevel">Skill Level</Label>
                    <Select
                      value={profileData.skillLevel}
                      onValueChange={(value) => handleInputChange('skillLevel', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="playingStyle">Playing Style</Label>
                    <Select
                      value={profileData.playingStyle}
                      onValueChange={(value) => handleInputChange('playingStyle', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-around">All-Around</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                        <SelectItem value="defensive">Defensive</SelectItem>
                        <SelectItem value="strategic">Strategic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about your pickleball journey..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Privacy Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Can Be Found in Search</Label>
                      <p className="text-sm text-gray-600">
                        {privacySettings.isVisibleInSearch 
                          ? "Other players can find you in the player search results"
                          : "You will not appear in player search results"
                        }
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.isVisibleInSearch}
                      onCheckedChange={(checked) => handlePrivacyChange('isVisibleInSearch', checked)}
                      disabled={false} // Always allow privacy changes
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Show Contact Information</Label>
                      <p className="text-sm text-gray-600">
                        {privacySettings.showContactInfo 
                          ? "Your phone and email will be visible to other players"
                          : "Your contact information will be hidden from other players"
                        }
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showContactInfo}
                      onCheckedChange={(checked) => handlePrivacyChange('showContactInfo', checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Show Skill Level</Label>
                      <p className="text-sm text-gray-600">
                        {privacySettings.showSkillLevel 
                          ? "Your skill level will be visible to other players"
                          : "Your skill level will be hidden from other players"
                        }
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showSkillLevel}
                      onCheckedChange={(checked) => handlePrivacyChange('showSkillLevel', checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                {!privacySettings.isVisibleInSearch && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <EyeOff className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium">You are currently hidden from search results</p>
                        <p className="mt-1">
                          Other players won't be able to find you in the player search. 
                          Enable "Can Be Found in Search" to make your profile discoverable.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {privacySettings.isVisibleInSearch && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Eye className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="text-sm text-green-800">
                        <p className="font-medium">You are visible to other players</p>
                        <p className="mt-1">
                          Other players can find you in the player search results. 
                          You can disable this at any time for privacy.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative">
                  <ProfilePhoto
                    profilePhoto={user?.profile_photo}
                    alt={user?.full_name || user?.username || 'Player'}
                    size="xl"
                    className="mx-auto ring-4 ring-white shadow-lg"
                  />
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 hover:scale-110 transition-transform duration-300 bg-white shadow-md"
                      title="Change Profile Photo"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  )}
                  
                  {/* Show a small indicator when profile photo is available */}
                  {user?.profile_photo && (
                    <div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"
                      title="Profile photo uploaded"
                    />
                  )}
                </div>
                
                {/* Status message */}
                {user?.profile_photo ? (
                  <div className="mt-2 text-xs text-green-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Profile photo loaded successfully
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    No profile photo uploaded
                  </div>
                )}
                
                {/* Debug info - remove in production */}
                {user?.profile_photo && (
                  <div className="mt-2 text-xs text-blue-500">
                    Photo: {user.profile_photo}
                  </div>
                )}
                
                {isEditing && (
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    {user?.profile_photo && (
                      <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
                        Remove Photo
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Player Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{playerStats.tournamentsWon}</div>
                    <div className="text-sm text-gray-600">Tournaments Won</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{playerStats.winRate}%</div>
                    <div className="text-sm text-gray-600">Win Rate</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">#{playerStats.currentRanking}</div>
                    <div className="text-sm text-gray-600">Current Ranking</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{playerStats.totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Member Since</div>
                    <div className="font-medium">
                      {new Date(playerStats.memberSince).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="h-4 w-4 mr-2" />
                  View Rankings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  My Tournaments
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Performance Stats
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile; 