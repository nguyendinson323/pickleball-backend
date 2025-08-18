import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  Globe, 
  Settings,
  Save,
  Eye,
  Image as ImageIcon,
  Palette,
  Layout,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Plus,
  Edit3,
  X
} from 'lucide-react';

const BusinessMicrosite = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [newService, setNewService] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [newTestimonial, setNewTestimonial] = useState({ name: '', rating: 5, comment: '' });

  // Mock microsite data
  const [micrositeData, setMicrositeData] = useState({
    general: {
      siteName: 'Elite Pickleball Courts',
      tagline: 'Premier pickleball facility in the heart of the city',
      description: 'Join Elite Pickleball Courts for world-class facilities, professional equipment, and a welcoming community atmosphere. Whether you\'re a beginner or advanced player, we have courts and programs designed for every skill level.',
      contactEmail: 'info@elitepickleballcourts.com',
      contactPhone: '(555) 123-4567',
      website: 'www.elitepickleballcourts.com',
      address: '123 Pickleball Lane, City, State 12345',
      operatingHours: '6:00 AM - 10:00 PM Daily'
    },
    appearance: {
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      accentColor: '#10B981',
      logo: null,
      heroImage: null,
      theme: 'modern',
      showStats: true,
      showTestimonials: true,
      showGallery: true
    },
    content: {
      aboutSection: 'Founded in 2020, Elite Pickleball Courts has been the premier destination for pickleball enthusiasts in our region. Our state-of-the-art facilities include 12 professional courts, advanced training programs, and a welcoming community atmosphere.',
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
        '12 Professional Courts (8 Indoor, 4 Outdoor)',
        'Pro Shop with Equipment Sales & Rental',
        'Locker Rooms with Showers',
        'Café & Lounge Area',
        'Free Parking',
        'WiFi Throughout Facility',
        'Air Conditioning'
      ],
      testimonials: [
        {
          name: 'Sarah M.',
          rating: 5,
          comment: 'Amazing facility and great community! The courts are always in perfect condition and the staff is incredibly friendly.'
        },
        {
          name: 'Mike R.',
          rating: 5,
          comment: 'Best pickleball courts in the area. Great programs for all skill levels and excellent equipment rental.'
        }
      ]
    },
    settings: {
      isPublished: true,
      allowOnlineBookings: true,
      showCourtAvailability: true,
      allowPublicComments: true,
      seoEnabled: true,
      customDomain: 'courts.elitepickleball.com'
    }
  });

  const handleSave = () => {
    console.log('Saving microsite data:', micrositeData);
    setIsEditing(false);
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setMicrositeData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          services: [...prev.content.services, newService.trim()]
        }
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    setMicrositeData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        services: prev.content.services.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setMicrositeData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          amenities: [...prev.content.amenities, newAmenity.trim()]
        }
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setMicrositeData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        amenities: prev.content.amenities.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.name.trim() && newTestimonial.comment.trim()) {
      setMicrositeData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          testimonials: [...prev.content.testimonials, { ...newTestimonial }]
        }
      }));
      setNewTestimonial({ name: '', rating: 5, comment: '' });
    }
  };

  const handleRemoveTestimonial = (index: number) => {
    setMicrositeData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        testimonials: prev.content.testimonials.filter((_, i) => i !== index)
      }
    }));
  };

  const updateField = (section: string, field: string, value: any) => {
    setMicrositeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Microsite</h1>
            <p className="text-gray-600">Customize and manage your business's public website</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
            {isEditing ? (
              <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Edit Site</span>
              </button>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-white rounded-lg shadow-md mb-8 animate-on-scroll">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Site Status:</span>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${micrositeData.settings.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {micrositeData.settings.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Site URL: <span className="font-mono text-blue-600">{micrositeData.settings.customDomain}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 animate-on-scroll">
          {['general', 'appearance', 'content', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md capitalize transition-colors duration-200 ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && (
          <div className="space-y-6 animate-on-scroll">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  <span>General Information</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={micrositeData.general.siteName}
                      onChange={(e) => updateField('general', 'siteName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                    <input
                      type="text"
                      value={micrositeData.general.tagline}
                      onChange={(e) => updateField('general', 'tagline', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={micrositeData.general.description}
                      onChange={(e) => updateField('general', 'description', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={micrositeData.general.contactEmail}
                      onChange={(e) => updateField('general', 'contactEmail', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      value={micrositeData.general.contactPhone}
                      onChange={(e) => updateField('general', 'contactPhone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={micrositeData.general.website}
                      onChange={(e) => updateField('general', 'website', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours</label>
                    <input
                      type="text"
                      value={micrositeData.general.operatingHours}
                      onChange={(e) => updateField('general', 'operatingHours', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={micrositeData.general.address}
                      onChange={(e) => updateField('general', 'address', e.target.value)}
                      disabled={!isEditing}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6 animate-on-scroll">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Palette className="h-5 w-5 text-purple-500" />
                  <span>Visual Design</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={micrositeData.appearance.primaryColor}
                        onChange={(e) => updateField('appearance', 'primaryColor', e.target.value)}
                        disabled={!isEditing}
                        className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer disabled:cursor-not-allowed"
                      />
                      <input
                        type="text"
                        value={micrositeData.appearance.primaryColor}
                        onChange={(e) => updateField('appearance', 'primaryColor', e.target.value)}
                        disabled={!isEditing}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={micrositeData.appearance.secondaryColor}
                        onChange={(e) => updateField('appearance', 'secondaryColor', e.target.value)}
                        disabled={!isEditing}
                        className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer disabled:cursor-not-allowed"
                      />
                      <input
                        type="text"
                        value={micrositeData.appearance.secondaryColor}
                        onChange={(e) => updateField('appearance', 'secondaryColor', e.target.value)}
                        disabled={!isEditing}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={micrositeData.appearance.accentColor}
                        onChange={(e) => updateField('appearance', 'accentColor', e.target.value)}
                        disabled={!isEditing}
                        className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer disabled:cursor-not-allowed"
                      />
                      <input
                        type="text"
                        value={micrositeData.appearance.accentColor}
                        onChange={(e) => updateField('appearance', 'accentColor', e.target.value)}
                        disabled={!isEditing}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    value={micrositeData.appearance.theme}
                    onChange={(e) => updateField('appearance', 'theme', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="minimal">Minimal</option>
                    <option value="sporty">Sporty</option>
                  </select>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Show Statistics</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={micrositeData.appearance.showStats}
                        onChange={(e) => updateField('appearance', 'showStats', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Show Testimonials</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={micrositeData.appearance.showTestimonials}
                        onChange={(e) => updateField('appearance', 'showTestimonials', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Show Gallery</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={micrositeData.appearance.showGallery}
                        onChange={(e) => updateField('appearance', 'showGallery', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6 animate-on-scroll">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">About Section</h3>
              </div>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">About Your Business</label>
                <textarea
                  value={micrositeData.content.aboutSection}
                  onChange={(e) => updateField('content', 'aboutSection', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Services</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {micrositeData.content.services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span>{service}</span>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveService(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        placeholder="Add new service"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddService}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Amenities</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {micrositeData.content.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span>{amenity}</span>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveAmenity(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        placeholder="Add new amenity"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddAmenity}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Testimonials</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {micrositeData.content.testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{testimonial.name}</span>
                          <div className="flex">{renderStars(testimonial.rating)}</div>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveTestimonial(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-700">{testimonial.comment}</p>
                    </div>
                  ))}
                  {isEditing && (
                    <div className="space-y-4 p-4 border border-gray-300 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={newTestimonial.name}
                            onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <select
                            value={newTestimonial.rating}
                            onChange={(e) => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {[1, 2, 3, 4, 5].map(rating => (
                              <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                        <textarea
                          value={newTestimonial.comment}
                          onChange={(e) => setNewTestimonial({...newTestimonial, comment: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={handleAddTestimonial}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                      >
                        Add Testimonial
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-on-scroll">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <span>Site Settings</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Publish Site</h4>
                      <p className="text-sm text-gray-600">Make your site visible to the public</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={micrositeData.settings.isPublished}
                        onChange={(e) => updateField('settings', 'isPublished', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Allow Online Bookings</h4>
                      <p className="text-sm text-gray-600">Let customers book courts through your site</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={micrositeData.settings.allowOnlineBookings}
                        onChange={(e) => updateField('settings', 'allowOnlineBookings', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Show Court Availability</h4>
                      <p className="text-sm text-gray-600">Display real-time court availability</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={micrositeData.settings.showCourtAvailability}
                        onChange={(e) => updateField('settings', 'showCourtAvailability', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Allow Public Comments</h4>
                      <p className="text-sm text-gray-600">Let visitors leave comments on your site</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={micrositeData.settings.allowPublicComments}
                        onChange={(e) => updateField('settings', 'allowPublicComments', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Enable SEO</h4>
                      <p className="text-sm text-gray-600">Optimize your site for search engines</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={micrositeData.settings.seoEnabled}
                        onChange={(e) => updateField('settings', 'seoEnabled', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Domain</label>
                    <input
                      type="text"
                      value={micrositeData.settings.customDomain}
                      onChange={(e) => updateField('settings', 'customDomain', e.target.value)}
                      disabled={!isEditing}
                      placeholder="yourdomain.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessMicrosite; 