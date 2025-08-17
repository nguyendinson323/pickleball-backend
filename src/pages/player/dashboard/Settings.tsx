import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { 
  Shield, 
  FileText, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  Settings as SettingsIcon
} from 'lucide-react';

interface PrivacySettings {
  canBeFound: boolean;
}

interface ProfileCompletion {
  photo: boolean;
  idDocument: boolean;
  bio: boolean;
  contactInfo: boolean;
  location: boolean;
  total: number;
  completed: number;
}

interface SettingsProps {
  privacySettings: PrivacySettings;
  profileCompletion: ProfileCompletion;
}

const Settings: React.FC<SettingsProps> = ({ privacySettings, profileCompletion }) => {
  const navigate = useNavigate();
  const [canBeFound, setCanBeFound] = useState(privacySettings.canBeFound);

  // Handle privacy setting change
  const handlePrivacyChange = async (checked: boolean) => {
    try {
      // In a real app, this would make an API call to update the user's privacy setting
      // await api.put(`/users/${user?.id}/privacy`, { can_be_found: checked });
      setCanBeFound(checked);
      // Show success message
      console.log('Privacy setting updated:', checked);
    } catch (error) {
      console.error('Failed to update privacy setting:', error);
      // Revert the change if the API call fails
      setCanBeFound(!checked);
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span>Privacy Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {canBeFound ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-gray-500" />}
                  <span className="font-medium text-gray-900">
                    {canBeFound ? 'Can Be Found' : 'Not Visible'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {canBeFound 
                    ? 'Other players can find you in player search results' 
                    : 'You will not appear in player search results'
                  }
                </p>
              </div>
              <Switch
                checked={canBeFound}
                onCheckedChange={handlePrivacyChange}
                className="ml-4"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Privacy Notice</p>
                  <p className="mt-1">
                    When visible, other players can see your basic information (name, skill level, city) 
                    to contact you for matches. Your personal contact details remain private.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Completion Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Profile Completion</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Profile Completion</span>
              <span className="text-sm font-bold text-gray-900">
                {profileCompletion.completed}/{profileCompletion.total} ({Math.round((profileCompletion.completed / profileCompletion.total) * 100)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(profileCompletion.completed / profileCompletion.total) * 100}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                {profileCompletion.photo ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className={profileCompletion.photo ? 'text-gray-700' : 'text-yellow-600'}>
                  Profile Photo
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {profileCompletion.idDocument ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className={profileCompletion.idDocument ? 'text-gray-700' : 'text-yellow-600'}>
                  ID Document
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {profileCompletion.bio ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className={profileCompletion.bio ? 'text-gray-700' : 'text-yellow-600'}>
                  Bio
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {profileCompletion.contactInfo ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className={profileCompletion.contactInfo ? 'text-gray-700' : 'text-yellow-600'}>
                  Contact Info
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {profileCompletion.location ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className={profileCompletion.location ? 'text-gray-700' : 'text-yellow-600'}>
                  Location
                </span>
              </div>
            </div>
            {profileCompletion.completed < profileCompletion.total && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/player/profile')}
              >
                Complete Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5 text-gray-500" />
            <span>Account Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/player/profile')}
            >
              <SettingsIcon className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/auth/change-password')}
            >
              <Shield className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/notifications')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Notification Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                // In a real app, this would export user data
                console.log('Export user data');
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Export My Data
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                // In a real app, this would delete user account
                console.log('Delete account');
              }}
            >
              <Shield className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings; 