import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Globe, 
  Eye, 
  Image, 
  Plus 
} from 'lucide-react';

interface MicrositeProps {
  micrositeConfig: {
    stateName: string;
    description: string;
    logo: string;
    bannerImage: string;
    contactInfo: {
      phone: string;
      email: string;
      address: string;
      website: string;
    };
    socialMedia: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
    features: {
      tournaments: boolean;
      training: boolean;
      rankings: boolean;
      news: boolean;
    };
  };
}

const Microsite: React.FC<MicrositeProps> = ({ micrositeConfig }) => {
  const handleTournamentAction = (action: string, type: string) => {
    console.log(`${action} ${type}`);
    // In real app, this would perform the action
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-500" />
          <span>State Microsite Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Configure Your State's Public Microsite</h3>
            <Button onClick={() => handleTournamentAction('preview', 'microsite')}>
              <Eye className="h-4 w-4 mr-2" />
              Preview Site
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Basic Information</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="stateName">State Federation Name</Label>
                  <Input
                    id="stateName"
                    value={micrositeConfig.stateName}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={micrositeConfig.description}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={micrositeConfig.contactInfo.website}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Contact Information</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={micrositeConfig.contactInfo.phone}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={micrositeConfig.contactInfo.email}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={micrositeConfig.contactInfo.address}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Media & Branding</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label>State Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload your state logo</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <Label>Banner Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload banner image</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Banner
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features & Services */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Features & Services</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="tournaments" checked={micrositeConfig.features.tournaments} />
                <Label htmlFor="tournaments">Tournaments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="training" checked={micrositeConfig.features.training} />
                <Label htmlFor="training">Training Programs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="rankings" checked={micrositeConfig.features.rankings} />
                <Label htmlFor="rankings">Rankings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="news" checked={micrositeConfig.features.news} />
                <Label htmlFor="news">News & Updates</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Microsite; 