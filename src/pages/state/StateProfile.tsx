import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  Flag, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Star,
  Users,
  Calendar,
  DollarSign,
  Building2
} from 'lucide-react';

const StateProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  // Mock state federation data
  const [federationData, setFederationData] = useState({
    federationName: 'California Pickleball Federation',
    state: 'California',
    foundedYear: '2018',
    email: 'info@capickleball.org',
    phone: '(555) 123-4567',
    website: 'www.capickleball.org',
    address: '123 Federation Drive',
    city: 'Sacramento',
    zipCode: '95814',
    description: 'The official governing body for pickleball in California, promoting the sport through tournaments, training programs, and community development.',
    mission: 'To grow and promote pickleball throughout California by providing leadership, resources, and opportunities for players of all skill levels.',
    vision: 'To make California the premier pickleball destination with the highest participation rates and most innovative programs in the nation.',
    federationLogo: null,
    federationPhotos: [],
    socialMedia: {
      facebook: 'https://facebook.com/capickleball',
      instagram: 'https://instagram.com/capickleball',
      twitter: 'https://twitter.com/capickleball',
      youtube: 'https://youtube.com/capickleball'
    },
    contactPerson: {
      name: 'John Smith',
      title: 'Executive Director',
      email: 'john.smith@capickleball.org',
      phone: '(555) 123-4568'
    },
    officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM PST',
    membershipTypes: [
      'Individual Player',
      'Club Membership',
      'Coach Certification',
      'Tournament Director',
      'Corporate Sponsor'
    ],
    services: [
      'Tournament Sanctioning',
      'Coach Training Programs',
      'Player Development',
      'Club Affiliation',
      'Equipment Standards',
      'Safety Guidelines'
    ]
  });

  const [editedData, setEditedData] = useState(federationData);

  const handleSave = () => {
    setFederationData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(federationData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactPersonChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      contactPerson: {
        ...prev.contactPerson,
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: any, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as any[]), '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setEditedData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as any[]).filter((_, i) => i !== index)
    }));
  };

  const federationStats = {
    totalMembers: 1247,
    totalClubs: 89,
    totalCourts: 456,
    totalTournaments: 23,
    monthlyRevenue: 45600,
    activeMembers: 1189
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">State Federation Profile</h1>
            <p className="text-gray-600">Manage your federation information and settings</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            )}
          </div>
        </div>

        {/* Federation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{federationStats.totalMembers.toLocaleString()}</div>
              <p className="text-xs text-gray-600">registered members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
              <Building2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{federationStats.totalClubs}</div>
              <p className="text-xs text-gray-600">affiliated clubs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
              <MapPin className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{federationStats.totalCourts}</div>
              <p className="text-xs text-gray-600">available courts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tournaments</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{federationStats.totalTournaments}</div>
              <p className="text-xs text-gray-600">this year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${federationStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-600">from memberships</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{federationStats.activeMembers.toLocaleString()}</div>
              <p className="text-xs text-gray-600">currently active</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Federation Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flag className="h-5 w-5 text-red-500" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="federationName">Federation Name</Label>
                    <Input
                      id="federationName"
                      value={isEditing ? editedData.federationName : federationData.federationName}
                      onChange={(e) => handleInputChange('federationName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={isEditing ? editedData.state : federationData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input
                      id="foundedYear"
                      value={isEditing ? editedData.foundedYear : federationData.foundedYear}
                      onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="officeHours">Office Hours</Label>
                    <Input
                      id="officeHours"
                      value={isEditing ? editedData.officeHours : federationData.officeHours}
                      onChange={(e) => handleInputChange('officeHours', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={isEditing ? editedData.description : federationData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Mission & Vision */}
            <Card>
              <CardHeader>
                <CardTitle>Mission & Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    value={isEditing ? editedData.mission : federationData.mission}
                    onChange={(e) => handleInputChange('mission', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="vision">Vision Statement</Label>
                  <Textarea
                    id="vision"
                    value={isEditing ? editedData.vision : federationData.vision}
                    onChange={(e) => handleInputChange('vision', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-green-500" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedData.email : federationData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedData.phone : federationData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={isEditing ? editedData.website : federationData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span>Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={isEditing ? editedData.address : federationData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={isEditing ? editedData.city : federationData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={isEditing ? editedData.zipCode : federationData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(isEditing ? editedData.services : federationData.services).map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={service}
                        onChange={(e) => handleArrayChange('services', index, e.target.value)}
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('services', index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('services')}
                    >
                      Add Service
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Membership Types */}
            <Card>
              <CardHeader>
                <CardTitle>Membership Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(isEditing ? editedData.membershipTypes : federationData.membershipTypes).map((type, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={type}
                        onChange={(e) => handleArrayChange('membershipTypes', index, e.target.value)}
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('membershipTypes', index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('membershipTypes')}
                    >
                      Add Membership Type
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Federation Logo */}
            <Card>
              <CardHeader>
                <CardTitle>Federation Logo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={federationData.federationLogo} />
                  <AvatarFallback className="bg-gradient-to-br from-red-500 to-blue-600 text-white text-2xl">
                    {federationData.federationName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Contact Person */}
            <Card>
              <CardHeader>
                <CardTitle>Primary Contact Person</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={isEditing ? editedData.contactPerson.name : federationData.contactPerson.name}
                    onChange={(e) => handleContactPersonChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={isEditing ? editedData.contactPerson.title : federationData.contactPerson.title}
                    onChange={(e) => handleContactPersonChange('title', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={isEditing ? editedData.contactPerson.email : federationData.contactPerson.email}
                    onChange={(e) => handleContactPersonChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={isEditing ? editedData.contactPerson.phone : federationData.contactPerson.phone}
                    onChange={(e) => handleContactPersonChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(federationData.socialMedia).map(([platform, url]) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm capitalize">{platform}</span>
                      {isEditing ? (
                        <Input
                          value={url}
                          onChange={(e) => setEditedData(prev => ({
                            ...prev,
                            socialMedia: { ...prev.socialMedia, [platform]: e.target.value }
                          }))}
                          className="text-xs"
                        />
                      ) : (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline">
                          {url}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateProfile; 