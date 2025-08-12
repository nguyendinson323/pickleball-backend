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
  Award,
  BookOpen,
  Users,
  Edit3,
  Save,
  X,
  Calendar,
  Star,
  GraduationCap
} from 'lucide-react';

const CoachProfile = () => {
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
    coachingExperience: '5 years',
    specialization: 'Advanced Techniques',
    bio: 'Experienced pickleball coach specializing in advanced techniques and tournament preparation.',
    profilePhoto: user?.profile_photo || '',
    hourlyRate: '75',
    availability: 'Weekdays and Weekends'
  });

  // Mock coach credentials and certifications
  const credentials = [
    {
      id: 1,
      name: 'USAPA Level 3 Coach Certification',
      issuer: 'USA Pickleball Association',
      date: '2023-06-15',
      expiry: '2026-06-15',
      status: 'Active',
      level: 'Advanced'
    },
    {
      id: 2,
      name: 'Sports Psychology Certification',
      issuer: 'National Coaching Institute',
      date: '2022-09-20',
      expiry: '2025-09-20',
      status: 'Active',
      level: 'Intermediate'
    },
    {
      id: 3,
      name: 'First Aid & CPR Certification',
      issuer: 'American Red Cross',
      date: '2024-01-10',
      expiry: '2026-01-10',
      status: 'Active',
      level: 'Basic'
    }
  ];

  // Mock coaching statistics
  const coachingStats = {
    totalStudents: 24,
    activeStudents: 18,
    totalSessions: 156,
    averageRating: 4.8,
    totalReviews: 89,
    yearsExperience: 5,
    tournamentsCoached: 12,
    studentSuccessRate: 78
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to API
    console.log('Saving coach profile:', profileData);
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
      coachingExperience: '5 years',
      specialization: 'Advanced Techniques',
      bio: 'Experienced pickleball coach specializing in advanced techniques and tournament preparation.',
      profilePhoto: user?.profile_photo || '',
      hourlyRate: '75',
      availability: 'Weekdays and Weekends'
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Coach Profile</h1>
            <p className="text-gray-600">Manage your coaching information and credentials</p>
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

            {/* Coaching Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Coaching Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="coachingExperience">Years of Experience</Label>
                    <Input
                      id="coachingExperience"
                      value={profileData.coachingExperience}
                      onChange={(e) => handleInputChange('coachingExperience', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={profileData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                    <Input
                      id="hourlyRate"
                      value={profileData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      value={profileData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about your coaching experience and philosophy..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Credentials & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Credentials & Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {credentials.map((credential) => (
                    <div key={credential.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{credential.name}</h4>
                          <p className="text-sm text-gray-600">{credential.issuer}</p>
                        </div>
                        <Badge variant={credential.status === 'Active' ? 'default' : 'secondary'}>
                          {credential.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Level:</span>
                          <p className="font-medium">{credential.level}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Issued:</span>
                          <p className="font-medium">{new Date(credential.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Expires:</span>
                          <p className="font-medium">{new Date(credential.expiry).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <p className="font-medium">{credential.status}</p>
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

            {/* Coaching Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Coaching Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{coachingStats.totalStudents}</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{coachingStats.activeStudents}</div>
                    <div className="text-sm text-gray-600">Active Students</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{coachingStats.averageRating}</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{coachingStats.totalSessions}</div>
                    <div className="text-sm text-gray-600">Total Sessions</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Experience</div>
                    <div className="font-medium">{coachingStats.yearsExperience} years</div>
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
                  <Users className="h-4 w-4 mr-2" />
                  Manage Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Sessions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  View Credentials
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile; 