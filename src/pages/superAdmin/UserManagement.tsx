import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Switch } from '../../components/ui/switch';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Shield, 
  UserCheck, 
  UserX, 
  Mail,
  Phone,
  Calendar,
  MapPin,
  MoreHorizontal,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const UserManagement = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUserType, setSelectedUserType] = useState('all');

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'john.doe',
      email: 'john.doe@email.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'player',
      userType: 'player',
      status: 'active',
      lastLogin: '2024-03-25 10:30 AM',
      joinDate: '2024-01-15',
      location: 'New York, NY',
      phone: '(555) 123-4567',
      profilePhoto: null,
      verified: true,
      twoFactorEnabled: false
    },
    {
      id: 2,
      username: 'jane.smith',
      email: 'jane.smith@email.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'coach',
      userType: 'coach',
      status: 'active',
      lastLogin: '2024-03-24 14:20 PM',
      joinDate: '2023-11-20',
      location: 'Los Angeles, CA',
      phone: '(555) 987-6543',
      profilePhoto: null,
      verified: true,
      twoFactorEnabled: true
    },
    {
      id: 3,
      username: 'mike.club',
      email: 'mike@eliteclub.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      role: 'admin',
      userType: 'club',
      status: 'active',
      lastLogin: '2024-03-25 09:15 AM',
      joinDate: '2023-08-10',
      location: 'Chicago, IL',
      phone: '(555) 456-7890',
      profilePhoto: null,
      verified: true,
      twoFactorEnabled: true
    },
    {
      id: 4,
      username: 'sarah.partner',
      email: 'sarah@courtsplus.com',
      firstName: 'Sarah',
      lastName: 'Wilson',
      role: 'admin',
      userType: 'partner',
      status: 'pending',
      lastLogin: '2024-03-20 16:45 PM',
      joinDate: '2024-02-28',
      location: 'Miami, FL',
      phone: '(555) 789-0123',
      profilePhoto: null,
      verified: false,
      twoFactorEnabled: false
    },
    {
      id: 5,
      username: 'admin.state',
      email: 'admin@californiapb.com',
      firstName: 'Robert',
      lastName: 'Brown',
      role: 'admin',
      userType: 'state',
      status: 'active',
      lastLogin: '2024-03-25 08:30 AM',
      joinDate: '2023-06-15',
      location: 'Sacramento, CA',
      phone: '(555) 321-6540',
      profilePhoto: null,
      verified: true,
      twoFactorEnabled: true
    },
    {
      id: 6,
      username: 'user.suspended',
      email: 'user@example.com',
      firstName: 'Alex',
      lastName: 'Davis',
      role: 'player',
      userType: 'player',
      status: 'suspended',
      lastLogin: '2024-03-10 11:20 AM',
      joinDate: '2024-01-20',
      location: 'Seattle, WA',
      phone: '(555) 654-3210',
      profilePhoto: null,
      verified: true,
      twoFactorEnabled: false
    }
  ]);

  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesUserType = selectedUserType === 'all' || user.userType === selectedUserType;

    return matchesSearch && matchesRole && matchesStatus && matchesUserType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'player': return 'bg-blue-100 text-blue-800';
      case 'coach': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'player': return 'bg-blue-100 text-blue-800';
      case 'coach': return 'bg-green-100 text-green-800';
      case 'club': return 'bg-purple-100 text-purple-800';
      case 'partner': return 'bg-orange-100 text-orange-800';
      case 'state': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const getStatusOptions = () => [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const getRoleOptions = () => [
    { value: 'all', label: 'All Roles' },
    { value: 'super_admin', label: 'Super Admin' },
    { value: 'admin', label: 'Admin' },
    { value: 'player', label: 'Player' },
    { value: 'coach', label: 'Coach' }
  ];

  const getUserTypeOptions = () => [
    { value: 'all', label: 'All User Types' },
    { value: 'player', label: 'Player' },
    { value: 'coach', label: 'Coach' },
    { value: 'club', label: 'Club' },
    { value: 'partner', label: 'Partner' },
    { value: 'state', label: 'State Federation' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage all users, roles, and permissions across the system</p>
          </div>
          <Button onClick={() => setShowAddUser(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{users.length}</div>
              <p className="text-xs text-gray-600">registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </div>
              <p className="text-xs text-gray-600">currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {users.filter(u => u.status === 'pending').length}
              </div>
              <p className="text-xs text-gray-600">awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
              <UserX className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {users.filter(u => u.status === 'suspended').length}
              </div>
              <p className="text-xs text-gray-600">account suspended</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search Users</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getRoleOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getStatusOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="userType">User Type</Label>
                <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getUserTypeOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.profilePhoto} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </h4>
                        {user.verified && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {user.twoFactorEnabled && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            2FA
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={getUserTypeColor(user.userType)}>
                          {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm text-gray-600">
                      <div>Last login: {user.lastLogin}</div>
                      <div>Joined: {user.joinDate}</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingUser(user.id)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      
                      {user.status === 'suspended' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <Unlock className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(user.id, 'suspended')}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Lock className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement; 