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

  const [newProgram, setNewProgram] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', comment: '' });

  const handleSave = () => {
    console.log('Saving microsite data:', micrositeData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setMicrositeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleAddProgram = () => {
    if (newProgram.trim()) {
      setMicrositeData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          programs: [...prev.content.programs, newProgram.trim()]
        }
      }));
      setNewProgram('');
    }
  };

  const handleRemoveProgram = (index: number) => {
    setMicrositeData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        programs: prev.content.programs.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setMicrositeData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          benefits: [...prev.content.benefits, newBenefit.trim()]
        }
      }));
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setMicrositeData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        benefits: prev.content.benefits.filter((_, i) => i !== index)
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
      setNewTestimonial({ name: '', role: '', comment: '' });
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">State Federation Microsite</h1>
            <p className="text-gray-600">Customize and manage your federation's public website</p>
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
                      onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={micrositeData.general.tagline}
                      onChange={(e) => handleInputChange('general', 'tagline', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={micrositeData.general.description}
                    onChange={(e) => handleInputChange('general', 'description', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell visitors about your federation..."
                  />
                </div>
              </CardContent>
            </Card>

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
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={micrositeData.general.contactEmail}
                      onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone</Label>
                    <Input
                      id="contactPhone"
                      value={micrositeData.general.contactPhone}
                      onChange={(e) => handleInputChange('general', 'contactPhone', e.target.value)}
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
                      onChange={(e) => handleInputChange('general', 'website', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="officeHours">Office Hours</Label>
                    <Input
                      id="officeHours"
                      value={micrositeData.general.officeHours}
                      onChange={(e) => handleInputChange('general', 'officeHours', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={micrositeData.general.address}
                    onChange={(e) => handleInputChange('general', 'address', e.target.value)}
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
                        onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                        disabled={!isEditing}
                        className="w-16 h-10"
                      />
                      <Input
                        value={micrositeData.appearance.primaryColor}
                        onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
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
                        onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                        disabled={!isEditing}
                        className="w-16 h-10"
                      />
                      <Input
                        value={micrositeData.appearance.secondaryColor}
                        onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
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
                        onChange={(e) => handleInputChange('appearance', 'accentColor', e.target.value)}
                        disabled={!isEditing}
                        className="w-16 h-10"
                      />
                      <Input
                        value={micrositeData.appearance.accentColor}
                        onChange={(e) => handleInputChange('appearance', 'accentColor', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="theme">Theme Style</Label>
                  <Select 
                    value={micrositeData.appearance.theme} 
                    onValueChange={(value) => handleInputChange('appearance', 'theme', value)}
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
                    <p className="text-sm text-gray-600">Display member count, court count, etc.</p>
                  </div>
                  <Switch
                    checked={micrositeData.appearance.showStats}
                    onCheckedChange={(checked) => handleInputChange('appearance', 'showStats', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Member Directory</Label>
                    <p className="text-sm text-gray-600">Display member listings and profiles</p>
                  </div>
                  <Switch
                    checked={micrositeData.appearance.showMemberDirectory}
                    onCheckedChange={(checked) => handleInputChange('appearance', 'showMemberDirectory', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Tournament Calendar</Label>
                    <p className="text-sm text-gray-600">Display upcoming tournaments and events</p>
                  </div>
                  <Switch
                    checked={micrositeData.appearance.showTournamentCalendar}
                    onCheckedChange={(checked) => handleInputChange('appearance', 'showTournamentCalendar', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Court Locator</Label>
                    <p className="text-sm text-gray-600">Display interactive court map and locations</p>
                  </div>
                  <Switch
                    checked={micrositeData.appearance.showCourtLocator}
                    onCheckedChange={(checked) => handleInputChange('appearance', 'showCourtLocator', checked)}
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
                  onChange={(e) => handleInputChange('content', 'aboutSection', e.target.value)}
                  disabled={!isEditing}
                  rows={6}
                  placeholder="Tell visitors about your federation's history, mission, and what makes you special..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mission & Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    value={micrositeData.content.mission}
                    onChange={(e) => handleInputChange('content', 'mission', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="vision">Vision Statement</Label>
                  <Textarea
                    id="vision"
                    value={micrositeData.content.vision}
                    onChange={(e) => handleInputChange('content', 'vision', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Programs Offered</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add new program..."
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    disabled={!isEditing}
                  />
                  <Button onClick={handleAddProgram} disabled={!isEditing || !newProgram.trim()}>
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {micrositeData.content.programs.map((program, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span>{program}</span>
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveProgram(index)}
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
                <CardTitle>Member Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add new benefit..."
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    disabled={!isEditing}
                  />
                  <Button onClick={handleAddBenefit} disabled={!isEditing || !newBenefit.trim()}>
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {micrositeData.content.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span>{benefit}</span>
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveBenefit(index)}
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
                <CardTitle>Member Testimonials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing && (
                  <div className="p-4 border rounded-md space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Member name"
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                      />
                      <Input
                        placeholder="Member role"
                        value={newTestimonial.role}
                        onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
                      />
                    </div>
                    <Textarea
                      placeholder="Member testimonial..."
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
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
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
                    onCheckedChange={(checked) => handleInputChange('settings', 'isPublished', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Member Registration</Label>
                    <p className="text-sm text-gray-600">Let visitors register as federation members</p>
                  </div>
                  <Switch
                    checked={micrositeData.settings.allowMemberRegistration}
                    onCheckedChange={(checked) => handleInputChange('settings', 'allowMemberRegistration', checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Court Locations</Label>
                    <p className="text-sm text-gray-600">Display interactive court map and locations</p>
                  </div>
                  <Switch
                    checked={micrositeData.settings.showCourtLocations}
                    onCheckedChange={(checked) => handleInputChange('settings', 'showCourtLocations', checked)}
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
                    onCheckedChange={(checked) => handleInputChange('settings', 'allowPublicComments', checked)}
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
                    onCheckedChange={(checked) => handleInputChange('settings', 'seoEnabled', checked)}
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
                      onChange={(e) => handleInputChange('settings', 'customDomain', e.target.value)}
                      disabled={!isEditing}
                      placeholder="california.pickleball.org"
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

export default StateMicrosite; 