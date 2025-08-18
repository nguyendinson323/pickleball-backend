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
  Flag,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Plus,
  Edit3,
  X
} from 'lucide-react';

const StateMicrosite = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Mock microsite data
  const [micrositeData, setMicrositeData] = useState({
    general: {
      siteName: 'California Pickleball Federation',
      tagline: 'The official governing body for pickleball in California',
      description: 'Join the California Pickleball Federation to connect with players, coaches, and clubs across the state. Access tournaments, training programs, and community resources.',
      contactEmail: 'info@capickleball.org',
      contactPhone: '(555) 123-4567',
      website: 'www.capickleball.org',
      address: '123 Federation Drive, Sacramento, CA 95814',
      officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM PST'
    },
    appearance: {
      primaryColor: '#DC2626',
      secondaryColor: '#1E40AF',
      accentColor: '#059669',
      logo: null,
      heroImage: null,
      theme: 'modern',
      showStats: true,
      showMemberDirectory: true,
      showTournamentCalendar: true,
      showCourtLocator: true
    },
    content: {
      aboutSection: 'The California Pickleball Federation is the official governing body for pickleball in California, established in 2018. We promote the sport through tournaments, training programs, and community development across all 58 counties.',
      mission: 'To grow and promote pickleball throughout California by providing leadership, resources, and opportunities for players of all skill levels.',
      vision: 'To make California the premier pickleball destination with the highest participation rates and most innovative programs in the nation.',
      programs: [
        'State Championship Tournaments',
        'Coach Certification Programs',
        'Player Development Clinics',
        'Club Affiliation Services',
        'Equipment Standards & Safety',
        'Youth Development Programs'
      ],
      benefits: [
        'Access to State Tournaments',
        'Coach Training & Certification',
        'Player Rankings & Ratings',
        'Club Support & Resources',
        'Insurance & Liability Coverage',
        'Networking & Community Events'
      ],
      testimonials: [
        {
          name: 'Sarah M.',
          role: 'State Champion',
          comment: 'The federation has transformed pickleball in California. The tournaments are well-organized and the community is incredibly supportive.'
        },
        {
          name: 'Mike R.',
          role: 'Certified Coach',
          comment: 'The coaching certification program is excellent. It has helped me become a better instructor and grow my business.'
        }
      ]
    },
    settings: {
      isPublished: true,
      allowMemberRegistration: true,
      showCourtLocations: true,
      allowPublicComments: true,
      seoEnabled: true,
      customDomain: 'california.pickleball.org'
    }
  });

  const [editedData, setEditedData] = useState(micrositeData);

  const handleSave = () => {
    setMicrositeData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(micrositeData);
    setIsEditing(false);
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: string, field: string, index: number, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: (prev[section as keyof typeof prev] as any)[field].map((item: any, i: number) => 
          i === index ? value : item
        )
      }
    }));
  };

  const addArrayItem = (section: string, field: string) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: [...(prev[section as keyof typeof prev] as any)[field], '']
      }
    }));
  };

  const removeArrayItem = (section: string, field: string, index: number) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: (prev[section as keyof typeof prev] as any)[field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        testimonials: prev.content.testimonials.map((testimonial, i) => 
          i === index ? { ...testimonial, [field]: value } : testimonial
        )
      }
    }));
  };

  const addTestimonial = () => {
    setEditedData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        testimonials: [...prev.content.testimonials, { name: '', role: '', comment: '' }]
      }
    }));
  };

  const removeTestimonial = (index: number) => {
    setEditedData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        testimonials: prev.content.testimonials.filter((_, i) => i !== index)
      }
    }));
  };

  const handleToggleChange = (section: string, field: string, value: boolean) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">State Federation Microsite</h1>
            <p className="text-gray-600">Configure and customize your public-facing microsite</p>
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
                <span>Edit Microsite</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <span>Configuration</span>
                </h3>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                      activeTab === 'general'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>General</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('appearance')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                      activeTab === 'appearance'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4" />
                      <span>Appearance</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                      activeTab === 'content'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Layout className="h-4 w-4" />
                      <span>Content</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                      activeTab === 'settings'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </div>
                  </button>
                </nav>
              </div>
            </div>

            {/* Preview Button */}
            <div className="mt-6">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center justify-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Preview Microsite</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'general' && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span>Basic Information</span>
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
                      <input
                        type="text"
                        id="siteName"
                        value={editedData.general.siteName}
                        onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline</label>
                      <input
                        type="text"
                        id="tagline"
                        value={editedData.general.tagline}
                        onChange={(e) => handleInputChange('general', 'tagline', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="description"
                      value={editedData.general.description}
                      onChange={(e) => handleInputChange('general', 'description', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="Tell visitors about your federation..."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Palette className="h-5 w-5 text-blue-500" />
                    <span>Color Scheme</span>
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">Primary Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="primaryColor"
                          value={editedData.appearance.primaryColor}
                          onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-16 h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <input
                          type="text"
                          value={editedData.appearance.primaryColor}
                          onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">Secondary Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="secondaryColor"
                          value={editedData.appearance.secondaryColor}
                          onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-16 h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <input
                          type="text"
                          value={editedData.appearance.secondaryColor}
                          onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700">Accent Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="accentColor"
                          value={editedData.appearance.accentColor}
                          onChange={(e) => handleInputChange('appearance', 'accentColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-16 h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <input
                          type="text"
                          value={editedData.appearance.accentColor}
                          onChange={(e) => handleInputChange('appearance', 'accentColor', e.target.value)}
                          disabled={!isEditing}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme Style</label>
                    <select 
                      id="theme"
                      value={editedData.appearance.theme} 
                      onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="minimal">Minimal</option>
                      <option value="sporty">Sporty</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Layout className="h-5 w-5 text-blue-500" />
                    <span>Content Display</span>
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Show Statistics</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editedData.appearance.showStats}
                        onChange={(e) => handleToggleChange('appearance', 'showStats', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Display member count, court count, etc.</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Show Member Directory</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editedData.appearance.showMemberDirectory}
                        onChange={(e) => handleToggleChange('appearance', 'showMemberDirectory', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Display member listings and profiles</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Show Tournament Calendar</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editedData.appearance.showTournamentCalendar}
                        onChange={(e) => handleToggleChange('appearance', 'showTournamentCalendar', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Display upcoming tournaments and events</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Show Court Locator</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editedData.appearance.showCourtLocator}
                        onChange={(e) => handleToggleChange('appearance', 'showCourtLocator', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Display interactive court map and locations</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-blue-500" />
                    <span>Site Settings</span>
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Publish Site</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editedData.settings.isPublished}
                        onChange={(e) => handleToggleChange('settings', 'isPublished', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Make your site visible to the public</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Allow Member Registration</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editedData.settings.allowMemberRegistration}
                        onChange={(e) => handleToggleChange('settings', 'allowMemberRegistration', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Let visitors register as federation members</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Show Court Locations</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editedData.settings.showCourtLocations}
                        onChange={(e) => handleToggleChange('settings', 'showCourtLocations', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Display interactive court map and locations</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Allow Public Comments</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editedData.settings.allowPublicComments}
                        onChange={(e) => handleToggleChange('settings', 'allowPublicComments', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Let visitors leave comments</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">SEO Optimization</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editedData.settings.seoEnabled}
                        onChange={(e) => handleToggleChange('settings', 'seoEnabled', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Enable search engine optimization</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Layout className="h-5 w-5 text-blue-500" />
                    <span>About Section</span>
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <textarea
                    value={editedData.content.aboutSection}
                    onChange={(e) => handleInputChange('content', 'aboutSection', e.target.value)}
                    disabled={!isEditing}
                    rows={6}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Tell visitors about your federation's history, mission, and what makes you special..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Layout className="h-5 w-5 text-blue-500" />
                    <span>Mission & Vision</span>
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label htmlFor="mission" className="block text-sm font-medium text-gray-700">Mission Statement</label>
                    <textarea
                      id="mission"
                      value={editedData.content.mission}
                      onChange={(e) => handleInputChange('content', 'mission', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="vision" className="block text-sm font-medium text-gray-700">Vision Statement</label>
                    <textarea
                      id="vision"
                      value={editedData.content.vision}
                      onChange={(e) => handleInputChange('content', 'vision', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Layout className="h-5 w-5 text-blue-500" />
                    <span>Programs Offered</span>
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add new program..."
                      value={editedData.content.programs[editedData.content.programs.length - 1]}
                      onChange={(e) => handleArrayChange('content', 'programs', editedData.content.programs.length - 1, e.target.value)}
                      disabled={!isEditing}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <button onClick={() => addArrayItem('content', 'programs')} disabled={!isEditing} className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editedData.content.programs.map((program, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <span>{program}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeArrayItem('content', 'programs', index)}
                            className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Layout className="h-5 w-5 text-blue-500" />
                    <span>Member Benefits</span>
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add new benefit..."
                      value={editedData.content.benefits[editedData.content.benefits.length - 1]}
                      onChange={(e) => handleArrayChange('content', 'benefits', editedData.content.benefits.length - 1, e.target.value)}
                      disabled={!isEditing}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <button onClick={() => addArrayItem('content', 'benefits')} disabled={!isEditing} className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editedData.content.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <span>{benefit}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeArrayItem('content', 'benefits', index)}
                            className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Layout className="h-5 w-5 text-blue-500" />
                    <span>Member Testimonials</span>
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {isEditing && (
                    <div className="p-4 border rounded-md space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Member name"
                          value={editedData.content.testimonials[editedData.content.testimonials.length - 1]?.name}
                          onChange={(e) => handleTestimonialChange(editedData.content.testimonials.length - 1, 'name', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <input
                          type="text"
                          placeholder="Member role"
                          value={editedData.content.testimonials[editedData.content.testimonials.length - 1]?.role}
                          onChange={(e) => handleTestimonialChange(editedData.content.testimonials.length - 1, 'role', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <textarea
                        placeholder="Member testimonial..."
                        value={editedData.content.testimonials[editedData.content.testimonials.length - 1]?.comment}
                        onChange={(e) => handleTestimonialChange(editedData.content.testimonials.length - 1, 'comment', e.target.value)}
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <button onClick={addTestimonial} disabled={!isEditing} className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                        Add Testimonial
                      </button>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {editedData.content.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                          </div>
                          {isEditing && (
                            <button
                              onClick={() => removeTestimonial(index)}
                              className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <p className="text-gray-700">{testimonial.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateMicrosite; 