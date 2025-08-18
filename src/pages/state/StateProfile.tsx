import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
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
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">State Federation Profile</h1>
            <p className="text-gray-600">Manage your federation information and settings</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
                <button onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 hover:shadow-lg flex items-center space-x-2">
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2">
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Federation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8 animate-on-scroll">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Members</h3>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{federationStats.totalMembers.toLocaleString()}</div>
            <p className="text-xs text-gray-600">registered members</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Clubs</h3>
              <Building2 className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{federationStats.totalClubs}</div>
            <p className="text-xs text-gray-600">affiliated clubs</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Courts</h3>
              <MapPin className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{federationStats.totalCourts}</div>
            <p className="text-xs text-gray-600">available courts</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Tournaments</h3>
              <Calendar className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{federationStats.totalTournaments}</div>
            <p className="text-xs text-gray-600">this year</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Monthly Revenue</h3>
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">${federationStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600">monthly income</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Active Members</h3>
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{federationStats.activeMembers}</div>
            <p className="text-xs text-gray-600">this month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Federation Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <div className="flex flex-row items-center space-x-2">
                <Flag className="h-5 w-5 text-red-500" />
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="federationName" className="block text-sm font-medium text-gray-700 mb-1">Federation Name</label>
                  <input
                    id="federationName"
                    type="text"
                    value={isEditing ? editedData.federationName : federationData.federationName}
                    onChange={(e) => handleInputChange('federationName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    id="state"
                    type="text"
                    value={isEditing ? editedData.state : federationData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
                  <input
                    id="foundedYear"
                    type="text"
                    value={isEditing ? editedData.foundedYear : federationData.foundedYear}
                    onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="officeHours" className="block text-sm font-medium text-gray-700 mb-1">Office Hours</label>
                  <input
                    id="officeHours"
                    type="text"
                    value={isEditing ? editedData.officeHours : federationData.officeHours}
                    onChange={(e) => handleInputChange('officeHours', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  value={isEditing ? editedData.description : federationData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <div className="flex flex-row items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Mission & Vision</h2>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
                  <textarea
                    id="mission"
                    value={isEditing ? editedData.mission : federationData.mission}
                    onChange={(e) => handleInputChange('mission', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-1">Vision Statement</label>
                  <textarea
                    id="vision"
                    value={isEditing ? editedData.vision : federationData.vision}
                    onChange={(e) => handleInputChange('vision', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <div className="flex flex-row items-center space-x-2">
                <Mail className="h-5 w-5 text-green-500" />
                <h2 className="text-xl font-semibold">Contact Information</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={isEditing ? editedData.email : federationData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    id="phone"
                    type="text"
                    value={isEditing ? editedData.phone : federationData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    id="website"
                    type="text"
                    value={isEditing ? editedData.website : federationData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <div className="flex flex-row items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <h2 className="text-xl font-semibold">Address</h2>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    id="address"
                    type="text"
                    value={isEditing ? editedData.address : federationData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      id="city"
                      type="text"
                      value={isEditing ? editedData.city : federationData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      id="zipCode"
                      type="text"
                      value={isEditing ? editedData.zipCode : federationData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <h2 className="text-xl font-semibold">Services Offered</h2>
              <div className="mt-4 space-y-2">
                {(isEditing ? editedData.services : federationData.services).map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => handleArrayChange('services', index, e.target.value)}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('services', index)}
                        className="px-3 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => addArrayItem('services')}
                    className="px-3 py-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
                  >
                    Add Service
                  </button>
                )}
              </div>
            </div>

            {/* Membership Types */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <h2 className="text-xl font-semibold">Membership Types</h2>
              <div className="mt-4 space-y-2">
                {(isEditing ? editedData.membershipTypes : federationData.membershipTypes).map((type, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={type}
                      onChange={(e) => handleArrayChange('membershipTypes', index, e.target.value)}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('membershipTypes', index)}
                        className="px-3 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => addArrayItem('membershipTypes')}
                    className="px-3 py-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
                  >
                    Add Membership Type
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Federation Logo */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <h2 className="text-xl font-semibold">Federation Logo</h2>
              <div className="mt-4 text-center">
                <div className="h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {federationData.federationLogo && (
                    <img src={federationData.federationLogo} alt="Federation Logo" className="h-full w-full object-cover" />
                  )}
                  {!federationData.federationLogo && (
                    <span className="text-gray-600 text-2xl">
                      {federationData.federationName.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                {isEditing && (
                  <button className="w-full px-4 py-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
                    <Camera className="h-4 w-4 mr-2 inline-block" />
                    Upload Logo
                  </button>
                )}
              </div>
            </div>

            {/* Contact Person */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <h2 className="text-xl font-semibold">Primary Contact Person</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={isEditing ? editedData.contactPerson.name : federationData.contactPerson.name}
                    onChange={(e) => handleContactPersonChange('name', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={isEditing ? editedData.contactPerson.title : federationData.contactPerson.title}
                    onChange={(e) => handleContactPersonChange('title', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={isEditing ? editedData.contactPerson.email : federationData.contactPerson.email}
                    onChange={(e) => handleContactPersonChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={isEditing ? editedData.contactPerson.phone : federationData.contactPerson.phone}
                    onChange={(e) => handleContactPersonChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <h2 className="text-xl font-semibold">Social Media</h2>
              <div className="mt-4 space-y-3">
                {Object.entries(federationData.socialMedia).map(([platform, url]) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm capitalize">{platform}</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setEditedData(prev => ({
                          ...prev,
                          socialMedia: { ...prev.socialMedia, [platform]: e.target.value }
                        }))}
                        className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline">
                        {url}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateProfile; 