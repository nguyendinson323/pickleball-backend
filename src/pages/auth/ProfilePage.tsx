import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { updateUser } from '../../store/slices/usersSlice';
import { fetchUserRankings } from '../../store/slices/rankingsSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Trophy, 
  Star, 
  Edit, 
  Save, 
  X, 
  Camera,
  Award,
  Target,
  Users,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userRankings } = useSelector((state: RootState) => state.rankings);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<{
    first_name: string;
    last_name: string;
    state: string;
    city: string;
    phone: string;
    skill_level: '' | '2.5' | '3.0' | '3.5' | '4.0' | '4.5' | '5.0' | '5.5';
  }>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    state: user?.state || '',
    city: user?.city || '',
    phone: user?.phone || '',
    skill_level: user?.skill_level || ''
  });

  // Update edit form when user data changes
  React.useEffect(() => {
    if (user) {
      setEditForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        state: user.state || '',
        city: user.city || '',
        phone: user.phone || '',
        skill_level: user.skill_level || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserRankings(user.id));
    }
  }, [dispatch, user?.id]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset to current user data when canceling
      setEditForm({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        state: user?.state || '',
        city: user?.city || '',
        phone: user?.phone || '',
        skill_level: user?.skill_level || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      const userData = {
        ...editForm,
        skill_level: editForm.skill_level || undefined
      };
      await dispatch(updateUser({ id: user.id, userData }));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case '5.5': return 'bg-purple-100 text-purple-800';
      case '5.0': return 'bg-red-100 text-red-800';
      case '4.5': return 'bg-orange-100 text-orange-800';
      case '4.0': return 'bg-blue-100 text-blue-800';
      case '3.5': return 'bg-green-100 text-green-800';
      case '3.0': return 'bg-yellow-100 text-yellow-800';
      case '2.5': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return (first + last).toUpperCase();
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white shadow-lg rounded-lg mx-4 my-8 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="animate-on-scroll text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              My Profile
            </h1>
            <p className="animate-on-scroll text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600">
              Manage your account and track your pickleball journey
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="animate-on-scroll sticky top-8">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="animate-on-scroll w-24 h-24 mx-auto">
                    <AvatarImage src={user.profile_photo} alt={user.full_name || user.username} />
                    <AvatarFallback className="text-2xl">
                      {getInitials(user.first_name, user.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 hover:scale-110 transition-transform duration-300"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="animate-on-scroll text-2xl font-bold">
                  {user.full_name || user.username}
                </CardTitle>
                <CardDescription className="animate-on-scroll text-lg">
                  @{user.username}
                </CardDescription>
                <div className="flex justify-center mt-4">
                  <Badge className={`animate-on-scroll ${getSkillLevelColor(user.skill_level || '')}`}>
                    Level {user.skill_level || 'N/A'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="animate-on-scroll flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="animate-on-scroll flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.city && user.state && (
                  <div className="animate-on-scroll flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{user.city}, {user.state}</span>
                  </div>
                )}
                {user.date_of_birth && (
                  <div className="animate-on-scroll flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Born {formatDate(user.date_of_birth)}</span>
                  </div>
                )}
                <Separator />
                <div className="space-y-2">
                  <div className="animate-on-scroll flex justify-between text-sm">
                    <span className="text-gray-600">Member Since:</span>
                    <span>{formatDate(user.created_at)}</span>
                  </div>
                  <div className="animate-on-scroll flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <Badge className={getMembershipStatusColor(user.membership_status)}>
                      {user.membership_status}
                    </Badge>
                  </div>
                  <div className="animate-on-scroll flex justify-between text-sm">
                    <span className="text-gray-600">Plan:</span>
                    <span className="capitalize">{user.subscription_plan}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="animate-on-scroll grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="rankings">Rankings</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="animate-on-scroll">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="animate-on-scroll">Personal Information</CardTitle>
                        <CardDescription className="animate-on-scroll">
                          Update your profile information and preferences
                        </CardDescription>
                      </div>
                      <Button
                        variant={isEditing ? "outline" : "default"}
                        size="sm"
                        onClick={handleEditToggle}
                        className="hover:scale-105 transition-transform duration-300"
                      >
                        {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name" className="animate-on-scroll">First Name</Label>
                        <Input
                          id="first_name"
                          value={isEditing ? editForm.first_name : user.first_name || ''}
                          onChange={(e) => handleInputChange('first_name', e.target.value)}
                          disabled={!isEditing}
                          className="animate-on-scroll"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name" className="animate-on-scroll">Last Name</Label>
                        <Input
                          id="last_name"
                          value={isEditing ? editForm.last_name : user.last_name || ''}
                          onChange={(e) => handleInputChange('last_name', e.target.value)}
                          disabled={!isEditing}
                          className="animate-on-scroll"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state" className="animate-on-scroll">State</Label>
                        <Select
                          value={isEditing ? editForm.state : user.state || ''}
                          onValueChange={(value) => handleInputChange('state', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="animate-on-scroll">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Jalisco">Jalisco</SelectItem>
                            <SelectItem value="Nuevo León">Nuevo León</SelectItem>
                            <SelectItem value="CDMX">CDMX</SelectItem>
                            <SelectItem value="Baja California">Baja California</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="animate-on-scroll">City</Label>
                        <Input
                          id="city"
                          value={isEditing ? editForm.city : user.city || ''}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          disabled={!isEditing}
                          className="animate-on-scroll"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="animate-on-scroll">Phone</Label>
                        <Input
                          id="phone"
                          value={isEditing ? editForm.phone : user.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="animate-on-scroll"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="skill_level" className="animate-on-scroll">Skill Level</Label>
                        <Select
                          value={isEditing ? editForm.skill_level : user.skill_level || ''}
                          onValueChange={(value) => handleInputChange('skill_level', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="animate-on-scroll">
                            <SelectValue placeholder="Select Skill Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2.5">2.5 - Beginner</SelectItem>
                            <SelectItem value="3.0">3.0 - Novice</SelectItem>
                            <SelectItem value="3.5">3.5 - Intermediate</SelectItem>
                            <SelectItem value="4.0">4.0 - Advanced</SelectItem>
                            <SelectItem value="4.5">4.5 - Expert</SelectItem>
                            <SelectItem value="5.0">5.0 - Professional</SelectItem>
                            <SelectItem value="5.5">5.5 - Elite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={handleEditToggle} className="hover:scale-105 transition-transform duration-300">
                          Cancel
                        </Button>
                        <Button onClick={handleSave} className="hover:scale-105 transition-transform duration-300">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rankings" className="space-y-6">
                <Card className="animate-on-scroll">
                  <CardHeader>
                    <CardTitle className="animate-on-scroll flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      My Rankings
                    </CardTitle>
                    <CardDescription className="animate-on-scroll">
                      Your current rankings across different categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userRankings.length > 0 ? (
                      <div className="space-y-4">
                        {userRankings.map((ranking) => (
                          <div key={ranking.id} className="animate-on-scroll flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center space-x-4">
                              <div className="text-2xl font-bold text-blue-600">
                                #{ranking.current_position}
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {ranking.category.replace('_', ' ').toUpperCase()}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Level {ranking.skill_level}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{ranking.current_points} points</div>
                              <div className="text-sm text-gray-600">
                                {ranking.win_percentage.toFixed(1)}% win rate
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 mb-2">No rankings yet</h3>
                        <p className="animate-on-scroll text-gray-600">
                          Participate in tournaments to earn rankings and track your progress.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="animate-on-scroll">
                    <CardHeader>
                      <CardTitle className="animate-on-scroll flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Activity Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="animate-on-scroll flex justify-between items-center">
                        <span className="text-gray-600">Last Login</span>
                        <span className="font-semibold">
                          {user.last_login ? formatDate(user.last_login) : 'Never'}
                        </span>
                      </div>
                      <div className="animate-on-scroll flex justify-between items-center">
                        <span className="text-gray-600">Email Verified</span>
                        <Badge variant={user.email_verified ? "default" : "secondary"}>
                          {user.email_verified ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="animate-on-scroll flex justify-between items-center">
                        <span className="text-gray-600">Account Status</span>
                        <Badge variant={user.is_active ? "default" : "destructive"}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="animate-on-scroll">
                    <CardHeader>
                      <CardTitle className="animate-on-scroll flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Membership Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="animate-on-scroll flex justify-between items-center">
                        <span className="text-gray-600">Plan</span>
                        <span className="font-semibold capitalize">{user.subscription_plan}</span>
                      </div>
                      <div className="animate-on-scroll flex justify-between items-center">
                        <span className="text-gray-600">Status</span>
                        <Badge className={getMembershipStatusColor(user.membership_status)}>
                          {user.membership_status}
                        </Badge>
                      </div>
                      {user.membership_expires_at && (
                        <div className="animate-on-scroll flex justify-between items-center">
                          <span className="text-gray-600">Expires</span>
                          <span className="font-semibold">{formatDate(user.membership_expires_at)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 