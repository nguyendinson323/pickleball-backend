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
import { 
  User, 
  MapPin, 
  Trophy,
  Target,
  Edit3,
  Save,
  X,
  Calendar
} from 'lucide-react';

const PlayerProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving profile:', profileData);
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
                    rows={4}
                  />
                </div>
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
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profileData.profilePhoto} />
                  <AvatarFallback className="text-2xl">
                    {profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm" className="w-full">
                    Change Photo
                  </Button>
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