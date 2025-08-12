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
import { Badge } from '../../components/ui/badge';
import { 
  User, 
  MapPin, 
  Building2,
  Clock,
  Users,
  Edit3,
  Save,
  X,
  Calendar,
  Star,
  Phone,
  Mail,
  Globe,
  Settings
} from 'lucide-react';

const ClubProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    clubName: 'Elite Pickleball Club',
    email: user?.email || '',
    phone: user?.phone || '',
    website: 'www.elitepickleball.com',
    address: '123 Pickleball Lane',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: '12345',
    clubType: 'recreational',
    membershipPlan: 'premium',
    description: 'Premier pickleball club offering world-class facilities and training programs for players of all skill levels.',
    profilePhoto: user?.profile_photo || '',
    operatingHours: '6:00 AM - 10:00 PM',
    foundedYear: '2020',
    totalCourts: '8',
    amenities: ['Pro Shop', 'Locker Rooms', 'Equipment Rental', 'Café', 'Parking']
  });

  // Mock club facilities
  const facilities = [
    {
      id: 1,
      name: 'Court 1-2',
      type: 'Indoor',
      surface: 'Professional',
      lighting: 'LED',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Court 3-4',
      type: 'Indoor',
      surface: 'Professional',
      lighting: 'LED',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Court 5-6',
      type: 'Outdoor',
      surface: 'Concrete',
      lighting: 'Natural',
      status: 'Available'
    },
    {
      id: 4,
      name: 'Court 7-8',
      type: 'Outdoor',
      surface: 'Concrete',
      lighting: 'Natural',
      status: 'Available'
    }
  ];

  // Mock club statistics
  const clubStats = {
    totalMembers: 156,
    activeMembers: 142,
    totalCourts: 8,
    monthlyRevenue: 12500,
    averageRating: 4.6,
    totalReviews: 234,
    yearsEstablished: 4,
    tournamentsHosted: 24,
    memberRetentionRate: 89
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving club profile:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setProfileData({
      clubName: 'Elite Pickleball Club',
      email: user?.email || '',
      phone: user?.phone || '',
      website: 'www.elitepickleball.com',
      address: '123 Pickleball Lane',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: '12345',
      clubType: 'recreational',
      membershipPlan: 'premium',
      description: 'Premier pickleball club offering world-class facilities and training programs for players of all skill levels.',
      profilePhoto: user?.profile_photo || '',
      operatingHours: '6:00 AM - 10:00 PM',
      foundedYear: '2020',
      totalCourts: '8',
      amenities: ['Pro Shop', 'Locker Rooms', 'Equipment Rental', 'Café', 'Parking']
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Club Profile</h1>
            <p className="text-gray-600">Manage your club information and settings</p>
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
            {/* Basic Club Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Basic Club Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    value={profileData.clubName}
                    onChange={(e) => handleInputChange('clubName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Club Description</Label>
                  <Textarea
                    id="description"
                    value={profileData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe your club, facilities, and programs..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Location & Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Club Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Club Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clubType">Club Type</Label>
                    <Select
                      value={profileData.clubType}
                      onValueChange={(value) => handleInputChange('clubType', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recreational">Recreational</SelectItem>
                        <SelectItem value="competitive">Competitive</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="membershipPlan">Membership Plan</Label>
                    <Select
                      value={profileData.membershipPlan}
                      onValueChange={(value) => handleInputChange('membershipPlan', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="elite">Elite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input
                      id="foundedYear"
                      value={profileData.foundedYear}
                      onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalCourts">Total Courts</Label>
                    <Input
                      id="totalCourts"
                      value={profileData.totalCourts}
                      onChange={(e) => handleInputChange('totalCourts', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Input
                    id="operatingHours"
                    value={profileData.operatingHours}
                    onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Facilities & Courts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {facilities.map((facility) => (
                    <div key={facility.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{facility.name}</h4>
                          <p className="text-sm text-gray-600">{facility.type} • {facility.surface}</p>
                        </div>
                        <Badge variant={facility.status === 'Available' ? 'default' : 'secondary'}>
                          {facility.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Surface:</span>
                          <p className="font-medium">{facility.surface}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Lighting:</span>
                          <p className="font-medium">{facility.lighting}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Club Logo */}
            <Card>
              <CardHeader>
                <CardTitle>Club Logo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profileData.profilePhoto} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {profileData.clubName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm" className="w-full">
                    Change Logo
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Club Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Club Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{clubStats.totalMembers}</div>
                    <div className="text-sm text-gray-600">Total Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{clubStats.totalCourts}</div>
                    <div className="text-sm text-gray-600">Total Courts</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{clubStats.averageRating}</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{clubStats.yearsEstablished}</div>
                    <div className="text-sm text-gray-600">Years Established</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                    <div className="font-medium">${clubStats.monthlyRevenue.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profileData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  ))}
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
                  <Users className="h-4 w-4 mr-2" />
                  Manage Members
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Court Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile; 