import React from 'react';
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-500" />
          <span>State Microsite Configuration</span>
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Configure Your State's Public Microsite</h3>
            <button 
              onClick={() => handleTournamentAction('preview', 'microsite')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview Site</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Basic Information</h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="stateName" className="block text-sm font-medium text-gray-700 mb-1">
                    State Federation Name
                  </label>
                  <input
                    id="stateName"
                    type="text"
                    value={micrositeConfig.stateName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={micrositeConfig.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    id="website"
                    type="url"
                    value={micrositeConfig.contactInfo.website}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Contact Information</h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={micrositeConfig.contactInfo.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={micrositeConfig.contactInfo.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={micrositeConfig.contactInfo.address}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700">State Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload your state logo</p>
                  <button className="mt-2 px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 mx-auto">
                    <Plus className="h-4 w-4" />
                    <span>Upload Logo</span>
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Banner Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload banner image</p>
                  <button className="mt-2 px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 mx-auto">
                    <Plus className="h-4 w-4" />
                    <span>Upload Banner</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features & Services */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Features & Services</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="tournaments" 
                  checked={micrositeConfig.features.tournaments}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="tournaments" className="text-sm font-medium text-gray-700">
                  Tournaments
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="training" 
                  checked={micrositeConfig.features.training}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="training" className="text-sm font-medium text-gray-700">
                  Training Programs
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="rankings" 
                  checked={micrositeConfig.features.rankings}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="rankings" className="text-sm font-medium text-gray-700">
                  Rankings
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="news" 
                  checked={micrositeConfig.features.news}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="news" className="text-sm font-medium text-gray-700">
                  News & Updates
                </label>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Social Media Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  id="facebook"
                  type="url"
                  value={micrositeConfig.socialMedia.facebook}
                  placeholder="https://facebook.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  id="instagram"
                  type="url"
                  value={micrositeConfig.socialMedia.instagram}
                  placeholder="https://instagram.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input
                  id="twitter"
                  type="url"
                  value={micrositeConfig.socialMedia.twitter}
                  placeholder="https://twitter.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Microsite; 