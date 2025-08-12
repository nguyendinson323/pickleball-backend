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
import { Switch } from '../../components/ui/switch';
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

  const [newService, setNewService] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [newTestimonial, setNewTestimonial] = useState({ name: '', rating: 5, comment: '' });

  const handleSave = () => {
    // Here you would typically save to the backend
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Microsite</h1>
            <p className="text-gray-600">Customize and manage your business's public website</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Button>
            {isEditing ? (
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Edit Site</span>
              </Button>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Site Status:</span>
                  <Badge className={micrositeData.settings.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {micrositeData.settings.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Site URL: <span className="font-mono text-blue-600">{micrositeData.settings.customDomain}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          {['general', 'appearance', 'content', 'settings'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab === 'general' && <Globe className="h-4 w-4 mr-2" />}
              {tab === 'appearance' && <Palette className="h-4 w-4 mr-2" />}
              {tab === 'content' && <Layout className="h-4 w-4 mr-2" />}
              {tab === 'settings' && <Settings className="h-4 w-4 mr-2" />}
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={micrositeData.general.siteName}
                      onChange={(e) => updateField('general', 'siteName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={micrositeData.general.tagline}
                      onChange={(e) => updateField('general', 'tagline', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={micrositeData.general.description}
                    onChange={(e) => updateField('general', 'description', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell visitors about your business..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={micrositeData.general.contactEmail}
                      onChange={(e) => updateField('general', 'contactEmail', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone</Label>
                    <Input
                      id="contactPhone"
                      value={micrositeData.general.contactPhone}
                      onChange={(e) => updateField('general', 'contactPhone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={micrositeData.general.website}
                      onChange={(e) => updateField('general', 'website', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="operatingHours">Operating Hours</Label>
                    <Input
                      id="operatingHours"
                      value={micrositeData.general.operatingHours}
                      onChange={(e) => updateField('general', 'operatingHours', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={micrositeData.general.address}
                    onChange={(e) => updateField('general', 'address', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={micrositeData.appearance.primaryColor}
                        onChange={(e) => updateField('appearance', 'primaryColor', e.target.value)}
                        disabled={!isEditing}
                        className="w-16 h-10"
                      />
                      <Input
                        value={micrositeData.appearance.primaryColor}
                        onChange={(e) => updateField('appearance', 'primaryColor', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={micrositeData.appearance.secondaryColor}
                        onChange={(e) => updateField('appearance', 'secondaryColor', e.target.value)}
                        disabled={!isEditing}
                        className="w-16 h-10"
                      />
                      <Input
                        value={micrositeData.appearance.secondaryColor}
                        onChange={(e) => updateField('appearance', 'secondaryColor', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={micrositeData.appearance.accentColor}
                        onChange={(e) => updateField('appearance', 'accentColor', e.target.value)}
                        disabled={!isEditing}
                        className="w-16 h-10"
                      />
                      <Input
                        value={micrositeData.appearance.accentColor}
                        onChange={(e) => updateField('appearance', 'accentColor', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="theme">Theme Style</Label>
                  <Select 
                    value={micrositeData.appearance.theme} 
                    onValueChange={(value) => updateField('appearance', 'theme', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="sporty">Sporty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Display</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Statistics</Label>
                    <p className="text-sm text-gray-600">Display court count, availability, etc.</p>
                  </div>
                  <Switch
                    checked={micrositeData.appearance.showStats}
                    onCheckedChange={(checked) => updateField('appearance', 'showStats', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Testimonials</Label>
                    <p className="text-sm text-gray-600">Display customer testimonials on the homepage</p>
                  </div>
                  <Switch
                    checked={micrositeData.appearance.showTestimonials}
                    onCheckedChange={(checked) => updateField('appearance', 'showTestimonials', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Photo Gallery</Label>
                    <p className="text-sm text-gray-600">Display facility and court photos</p>
                  </div>
                  <Switch
                    checked={micrositeData.appearance.showGallery}
                    onCheckedChange={(checked) => updateField('appearance', 'showGallery', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={micrositeData.content.aboutSection}
                  onChange={(e) => updateField('content', 'aboutSection', e.target.value)}
                  disabled={!isEditing}
                  rows={6}
                  placeholder="Tell visitors about your business's history, mission, and what makes you special..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add new service..."
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    disabled={!isEditing}
                  />
                  <Button onClick={handleAddService} disabled={!isEditing || !newService.trim()}>
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {micrositeData.content.services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span>{service}</span>
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveService(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add new amenity..."
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    disabled={!isEditing}
                  />
                  <Button onClick={handleAddAmenity} disabled={!isEditing || !newAmenity.trim()}>
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {micrositeData.content.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span>{amenity}</span>
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveAmenity(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Testimonials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing && (
                  <div className="p-4 border rounded-md space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Customer name"
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                      />
                      <Select value={newTestimonial.rating.toString()} onValueChange={(value) => setNewTestimonial({...newTestimonial, rating: parseInt(value)})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="1">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea
                      placeholder="Customer testimonial..."
                      value={newTestimonial.comment}
                      onChange={(e) => setNewTestimonial({...newTestimonial, comment: e.target.value})}
                      rows={3}
                    />
                    <Button onClick={handleAddTestimonial} disabled={!newTestimonial.name.trim() || !newTestimonial.comment.trim()}>
                      Add Testimonial
                    </Button>
                  </div>
                )}
                
                <div className="space-y-4">
                  {micrositeData.content.testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{testimonial.name}</span>
                          <div className="flex">{renderStars(testimonial.rating)}</div>
                        </div>
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveTestimonial(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <p className="text-gray-700">{testimonial.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Publish Site</Label>
                    <p className="text-sm text-gray-600">Make your site visible to the public</p>
                  </div>
                  <Switch
                    checked={micrositeData.settings.isPublished}
                    onCheckedChange={(checked) => updateField('settings', 'isPublished', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Online Bookings</Label>
                    <p className="text-sm text-gray-600">Let visitors book courts online</p>
                  </div>
                  <Switch
                    checked={micrositeData.settings.allowOnlineBookings}
                    onCheckedChange={(checked) => updateField('settings', 'allowOnlineBookings', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Court Availability</Label>
                    <p className="text-sm text-gray-600">Display real-time court status</p>
                  </div>
                  <Switch
                    checked={micrositeData.settings.showCourtAvailability}
                    onCheckedChange={(checked) => updateField('settings', 'showCourtAvailability', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Public Comments</Label>
                    <p className="text-sm text-gray-600">Let visitors leave comments</p>
                  </div>
                  <Switch
                    checked={micrositeData.settings.allowPublicComments}
                    onCheckedChange={(checked) => updateField('settings', 'allowPublicComments', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SEO Optimization</Label>
                    <p className="text-sm text-gray-600">Enable search engine optimization</p>
                  </div>
                  <Switch
                    checked={micrositeData.settings.seoEnabled}
                    onCheckedChange={(checked) => updateField('settings', 'seoEnabled', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Domain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customDomain">Domain Name</Label>
                    <Input
                      id="customDomain"
                      value={micrositeData.settings.customDomain}
                      onChange={(e) => updateField('settings', 'customDomain', e.target.value)}
                      disabled={!isEditing}
                      placeholder="courts.yourbusiness.com"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Configure your DNS settings to point to our servers for custom domain support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessMicrosite; 