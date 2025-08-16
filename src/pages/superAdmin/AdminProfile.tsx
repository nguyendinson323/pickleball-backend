import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Switch } from '../../components/ui/switch';
import ProfilePhoto from '../../components/ui/ProfilePhoto';
import { imageBaseURL } from '../../lib/const';
import { toast } from 'sonner';
import { 
  Shield, 
  User,
  Mail, 
  Phone, 
  Globe, 
  Clock, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Star,
  Settings,
  Key,
  Lock,
  Activity,
  AlertTriangle
} from 'lucide-react';

const AdminProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile photo management functions
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('profile_photo', file);

      const response = await fetch(`${imageBaseURL}/api/v1/auth/profile/photo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        toast.success('Profile photo uploaded successfully!');
        // Refresh the page or update user data to show new photo
        window.location.reload();
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Photo upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload photo');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePhotoRemove = async () => {
    if (!user?.profile_photo) return;

    if (!confirm('Are you sure you want to remove your profile photo?')) {
      return;
    }

    try {
      // For now, we'll just show a message since the backend doesn't have a remove endpoint
      // You can implement this later by adding a DELETE endpoint
      toast.info('Profile photo removal functionality coming soon!');
      
      // TODO: Implement actual photo removal when backend supports it
      // const response = await fetch(`${imageBaseURL}/api/v1/auth/profile/photo`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      
    } catch (error) {
      console.error('Photo removal error:', error);
      toast.error('Failed to remove photo');
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Mock admin profile data
  const [adminData, setAdminData] = useState({
    personalInfo: {
      firstName: 'John',
      lastName: 'Admin',
      email: 'john.admin@pickleball.com',
      phone: '(555) 123-4567',
      title: 'System Administrator',
      department: 'IT & Operations',
      bio: 'Experienced system administrator with 8+ years managing enterprise applications and user management systems.',
      profilePhoto: null
    },
    systemAccess: {
      role: 'super_admin',
      permissions: [
        'User Management',
        'System Configuration',
        'Database Administration',
        'Security Settings',
        'Analytics & Reporting',
        'Global Settings Management'
      ],
      lastLogin: '2024-03-25 10:30 AM',
      loginHistory: [
        { date: '2024-03-25 10:30 AM', ip: '192.168.1.100', location: 'Office' },
        { date: '2024-03-24 09:15 AM', ip: '192.168.1.100', location: 'Office' },
        { date: '2024-03-23 14:20 PM', ip: '10.0.0.50', location: 'Remote' }
      ]
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: '2024-02-15',
      passwordExpiryDays: 45,
      failedLoginAttempts: 0,
      accountLocked: false,
      securityQuestions: [
        { question: 'What was your first pet\'s name?', answer: '***' },
        { question: 'In what city were you born?', answer: '***' }
      ]
    },
    preferences: {
      language: 'English',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour',
      notifications: {
        email: true,
        sms: false,
        push: true,
        systemAlerts: true,
        userReports: true,
        securityEvents: true
      }
    }
  });

  const [editedData, setEditedData] = useState(adminData);

  const handleSave = () => {
    setAdminData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(adminData);
    setIsEditing(false);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (notification: string, value: boolean) => {
    setEditedData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          [notification]: value
        }
      }
    }));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
              case 'super_admin': return 'bg-red-100 text-red-800';
      case 'moderator': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
              case 'super_admin': return 'Super Administrator';
      case 'moderator': return 'Moderator';
      default: return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Profile</h1>
            <p className="text-gray-600">Manage your profile and system access settings</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={isEditing ? editedData.personalInfo.firstName : (user?.first_name || adminData.personalInfo.firstName)}
                      onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={isEditing ? editedData.personalInfo.lastName : (user?.last_name || adminData.personalInfo.lastName)}
                      onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedData.personalInfo.email : (user?.email || adminData.personalInfo.email)}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedData.personalInfo.phone : (user?.phone || adminData.personalInfo.phone)}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={isEditing ? editedData.personalInfo.title : adminData.personalInfo.title}
                      onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={isEditing ? editedData.personalInfo.department : adminData.personalInfo.department}
                      onChange={(e) => handleInputChange('personalInfo', 'department', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={isEditing ? editedData.personalInfo.bio : adminData.personalInfo.bio}
                    onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* System Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>System Access</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Role</Label>
                    <Badge className={`mt-1 ${getRoleColor(adminData.systemAccess.role)}`}>
                      {getRoleDisplayName(adminData.systemAccess.role)}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Last Login</Label>
                    <p className="text-sm text-gray-900">{adminData.systemAccess.lastLogin}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-500">Permissions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {adminData.systemAccess.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Recent Login History</Label>
                  <div className="space-y-2 mt-2">
                    {adminData.systemAccess.loginHistory.map((login, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <span>{login.date}</span>
                        <div className="flex items-center space-x-4 text-gray-600">
                          <span>{login.ip}</span>
                          <span>{login.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-purple-500" />
                  <span>Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={isEditing ? editedData.preferences.language : adminData.preferences.language} 
                      onValueChange={(value) => handleInputChange('preferences', 'language', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={isEditing ? editedData.preferences.timezone : adminData.preferences.timezone} 
                      onValueChange={(value) => handleInputChange('preferences', 'timezone', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Notifications</Label>
                  <div className="space-y-3 mt-2">
                    {Object.entries(adminData.preferences.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <Switch
                          checked={isEditing ? editedData.preferences.notifications[key as keyof typeof editedData.preferences.notifications] : value}
                          onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                          disabled={!isEditing}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative">
                  <ProfilePhoto
                    profilePhoto={user?.profile_photo}
                    alt={user?.full_name || user?.username || 'Admin User'}
                    size="xl"
                    className="mx-auto ring-4 ring-white shadow-lg"
                  />
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 hover:scale-110 transition-transform duration-300 bg-white shadow-md"
                      title="Change Profile Photo"
                      onClick={triggerFileUpload}
                      disabled={isUploading}
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  )}
                  
                  {/* Show a small indicator when profile photo is available */}
                  {user?.profile_photo && (
                    <div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"
                      title="Profile photo uploaded"
                    />
                  )}
                </div>
                
                {/* Hidden file input for photo upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                
                {/* Status message */}
                {user?.profile_photo ? (
                  <div className="mt-2 text-xs text-green-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Profile photo loaded successfully
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    No profile photo uploaded
                  </div>
                )}
                
                {isEditing && (
                  <div className="mt-4 space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={triggerFileUpload}
                      disabled={isUploading}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {isUploading ? 'Uploading...' : 'Upload Photo'}
                    </Button>
                    {user?.profile_photo && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-red-600 hover:text-red-700"
                        onClick={handlePhotoRemove}
                        disabled={isUploading}
                      >
                        Remove Photo
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-red-500" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Auth</span>
                  <Badge className={adminData.security.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {adminData.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Last Password Change: {adminData.security.lastPasswordChange}</p>
                  <p>Password Expires: {adminData.security.passwordExpiryDays} days</p>
                </div>
                {adminData.security.failedLoginAttempts > 0 && (
                  <div className="flex items-center space-x-2 text-yellow-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">{adminData.security.failedLoginAttempts} failed login attempts</span>
                  </div>
                )}
                {adminData.security.accountLocked && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm">Account Locked</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8+</div>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <p className="text-sm text-gray-600">System Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <p className="text-sm text-gray-600">Support Available</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile; 