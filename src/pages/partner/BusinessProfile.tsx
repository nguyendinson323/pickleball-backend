import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
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

  const updateField = (field: string, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateBusinessHours = (day: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: value
      }
    }));
  };

  const updateSocialMedia = (platform: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const addService = () => {
    const newService = prompt('Enter new service:');
    if (newService && newService.trim()) {
      setEditedData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
    }
  };

  const removeService = (index: number) => {
    setEditedData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const addAmenity = () => {
    const newAmenity = prompt('Enter new amenity:');
    if (newAmenity && newAmenity.trim()) {
      setEditedData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
    }
  };

  const removeAmenity = (index: number) => {
    setEditedData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const addPaymentMethod = () => {
    const newMethod = prompt('Enter new payment method:');
    if (newMethod && newMethod.trim()) {
      setEditedData(prev => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, newMethod.trim()]
      }));
    }
  };

  const removePaymentMethod = (index: number) => {
    setEditedData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Profile</h1>
            <p className="text-gray-600">Manage your business information and settings</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Business Overview */}
        <div className="bg-white rounded-lg shadow-md mb-8 animate-on-scroll">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold">
                {businessData.businessName.split(' ').map(word => word[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{businessData.businessName}</h2>
                <p className="text-gray-600">{businessData.businessType}</p>
                <p className="text-sm text-gray-500">Founded {businessData.foundedYear}</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">{businessData.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  <span>Basic Information</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    <input
                      type="text"
                      value={editedData.businessName}
                      onChange={(e) => updateField('businessName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                    <input
                      type="text"
                      value={editedData.businessType}
                      onChange={(e) => updateField('businessType', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
                    <input
                      type="text"
                      value={editedData.foundedYear}
                      onChange={(e) => updateField('foundedYear', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editedData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-green-500" />
                  <span>Contact Information</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={editedData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span>Address</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={editedData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={editedData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={editedData.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={editedData.zipCode}
                      onChange={(e) => updateField('zipCode', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span>Operating Hours</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {Object.entries(editedData.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                      <input
                        type="text"
                        value={hours}
                        onChange={(e) => updateBusinessHours(day, e.target.value)}
                        disabled={!isEditing}
                        className="w-32 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Star className="h-5 w-5 text-purple-500" />
                  <span>Services</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {editedData.services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span className="text-sm">{service}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeService(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={addService}
                      className="w-full px-3 py-2 text-blue-600 hover:text-blue-800 text-sm border border-blue-300 rounded-md hover:bg-blue-50 transition-colors duration-200"
                    >
                      + Add Service
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span>Amenities</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {editedData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span className="text-sm">{amenity}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeAmenity(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={addAmenity}
                      className="w-full px-3 py-2 text-blue-600 hover:text-blue-800 text-sm border border-blue-300 rounded-md hover:bg-blue-50 transition-colors duration-200"
                    >
                      + Add Amenity
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span>Payment Methods</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {editedData.paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span className="text-sm">{method}</span>
                      {isEditing && (
                        <button
                          onClick={() => removePaymentMethod(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={addPaymentMethod}
                      className="w-full px-3 py-2 text-blue-600 hover:text-blue-800 text-sm border border-blue-300 rounded-md hover:bg-blue-50 transition-colors duration-200"
                    >
                      + Add Payment Method
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span>Social Media</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                    <input
                      type="url"
                      value={editedData.socialMedia.facebook}
                      onChange={(e) => updateSocialMedia('facebook', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                    <input
                      type="url"
                      value={editedData.socialMedia.instagram}
                      onChange={(e) => updateSocialMedia('instagram', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                    <input
                      type="url"
                      value={editedData.socialMedia.twitter}
                      onChange={(e) => updateSocialMedia('twitter', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile; 