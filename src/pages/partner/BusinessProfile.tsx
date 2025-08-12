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
  Building2, 
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
  DollarSign
} from 'lucide-react';

const BusinessProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  // Mock business data
  const [businessData, setBusinessData] = useState({
    businessName: 'Elite Pickleball Courts',
    businessType: 'Sports Facility',
    email: 'info@elitepickleballcourts.com',
    phone: '(555) 123-4567',
    website: 'www.elitepickleballcourts.com',
    address: '123 Pickleball Lane',
    city: 'City',
    state: 'State',
    zipCode: '12345',
    description: 'Premier pickleball facility offering world-class courts, professional equipment, and a welcoming community atmosphere for players of all skill levels.',
    foundedYear: '2020',
    operatingHours: '6:00 AM - 10:00 PM Daily',
    businessHours: {
      monday: '6:00 AM - 10:00 PM',
      tuesday: '6:00 AM - 10:00 PM',
      wednesday: '6:00 AM - 10:00 PM',
      thursday: '6:00 AM - 10:00 PM',
      friday: '6:00 AM - 10:00 PM',
      saturday: '6:00 AM - 10:00 PM',
      sunday: '6:00 AM - 10:00 PM'
    },
    services: [
      'Court Rentals',
      'Equipment Sales',
      'Equipment Rental',
      'Private Lessons',
      'Group Classes',
      'Tournament Hosting',
      'Corporate Events'
    ],
    amenities: [
      'Pro Shop',
      'Locker Rooms',
      'Equipment Rental',
      'Café',
      'Free Parking',
      'WiFi',
      'Air Conditioning'
    ],
    businessLogo: null,
    businessPhotos: [],
    socialMedia: {
      facebook: 'https://facebook.com/elitepickleball',
      instagram: 'https://instagram.com/elitepickleball',
      twitter: 'https://twitter.com/elitepickleball'
    },
    paymentMethods: [
      'Credit Card',
      'Debit Card',
      'Cash',
      'Mobile Payment',
      'Online Booking'
    ]
  });

  const [editedData, setEditedData] = useState(businessData);

  const handleSave = () => {
    setBusinessData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(businessData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
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

  const businessStats = {
    totalCourts: 12,
    totalCustomers: 89,
    averageRating: 4.7,
    totalBookings: 156,
    monthlyRevenue: 12450
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Profile</h1>
            <p className="text-gray-600">Manage your business information and settings</p>
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

        {/* Business Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
              <MapPin className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{businessStats.totalCourts}</div>
              <p className="text-xs text-gray-600">courts available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{businessStats.totalCustomers}</div>
              <p className="text-xs text-gray-600">registered customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{businessStats.averageRating}</div>
              <p className="text-xs text-gray-600">out of 5 stars</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{businessStats.totalBookings}</div>
              <p className="text-xs text-gray-600">bookings this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${businessStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-600">this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Business Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={isEditing ? editedData.businessName : businessData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select 
                      value={isEditing ? editedData.businessType : businessData.businessType}
                      onValueChange={(value) => handleInputChange('businessType', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sports Facility">Sports Facility</SelectItem>
                        <SelectItem value="Recreation Center">Recreation Center</SelectItem>
                        <SelectItem value="Fitness Club">Fitness Club</SelectItem>
                        <SelectItem value="Community Center">Community Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input
                      id="foundedYear"
                      value={isEditing ? editedData.foundedYear : businessData.foundedYear}
                      onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="operatingHours">Operating Hours</Label>
                    <Input
                      id="operatingHours"
                      value={isEditing ? editedData.operatingHours : businessData.operatingHours}
                      onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    value={isEditing ? editedData.description : businessData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
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
                      value={isEditing ? editedData.email : businessData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedData.phone : businessData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={isEditing ? editedData.website : businessData.website}
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
                    value={isEditing ? editedData.address : businessData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={isEditing ? editedData.city : businessData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={isEditing ? editedData.state : businessData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={isEditing ? editedData.zipCode : businessData.zipCode}
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
                  {(isEditing ? editedData.services : businessData.services).map((service, index) => (
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

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(isEditing ? editedData.amenities : businessData.amenities).map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={amenity}
                        onChange={(e) => handleArrayChange('amenities', index, e.target.value)}
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('amenities', index)}
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
                      onClick={() => addArrayItem('amenities')}
                    >
                      Add Amenity
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Business Logo */}
            <Card>
              <CardHeader>
                <CardTitle>Business Logo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={businessData.businessLogo} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                    {businessData.businessName.split(' ').map(n => n[0]).join('')}
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

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {businessData.paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{method}</span>
                    </div>
                  ))}
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
                  {Object.entries(businessData.socialMedia).map(([platform, url]) => (
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

export default BusinessProfile; 