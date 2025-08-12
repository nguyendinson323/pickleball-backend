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
import { 
  Users, 
  Search,
  Plus,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Star,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const MemberManagement = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<number | null>(null);

  // Mock member data
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Sarah M.',
      email: 'sarah.m@email.com',
      phone: '(555) 123-4567',
      membershipType: 'Premium',
      status: 'Active',
      joinDate: '2023-01-15',
      lastVisit: '2024-03-20',
      totalVisits: 45,
      membershipExpiry: '2024-12-31',
      photo: null
    },
    {
      id: 2,
      name: 'Mike R.',
      email: 'mike.r@email.com',
      phone: '(555) 234-5678',
      membershipType: 'Basic',
      status: 'Active',
      joinDate: '2023-03-20',
      lastVisit: '2024-03-18',
      totalVisits: 32,
      membershipExpiry: '2024-12-31',
      photo: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      email: 'lisa.k@email.com',
      phone: '(555) 345-6789',
      membershipType: 'Premium',
      status: 'Active',
      joinDate: '2023-02-10',
      lastVisit: '2024-03-15',
      totalVisits: 67,
      membershipExpiry: '2024-12-31',
      photo: null
    },
    {
      id: 4,
      name: 'John D.',
      email: 'john.d@email.com',
      phone: '(555) 456-7890',
      membershipType: 'Basic',
      status: 'Inactive',
      joinDate: '2023-01-05',
      lastVisit: '2024-02-15',
      totalVisits: 28,
      membershipExpiry: '2024-02-28',
      photo: null
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'Basic'
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const member = {
        id: members.length + 1,
        ...newMember,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        lastVisit: new Date().toISOString().split('T')[0],
        totalVisits: 1,
        membershipExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        photo: null
      };
      setMembers([...members, member]);
      setNewMember({
        name: '',
        email: '',
        phone: '',
        membershipType: 'Basic'
      });
      setIsAddingMember(false);
    }
  };

  const handleUpdateMember = (id: number, field: string, value: string) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    const matchesType = filterType === 'all' || member.membershipType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Basic': return 'bg-blue-100 text-blue-800';
      case 'Elite': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const memberStats = {
    total: members.length,
    active: members.filter(m => m.status === 'Active').length,
    premium: members.filter(m => m.membershipType === 'Premium').length,
    newThisMonth: members.filter(m => {
      const joinDate = new Date(m.joinDate);
      const now = new Date();
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Member Management</h1>
            <p className="text-gray-600">Manage your club's members and memberships</p>
          </div>
          <Button onClick={() => setIsAddingMember(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Member</span>
          </Button>
        </div>

        {/* Member Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{memberStats.total}</div>
              <p className="text-xs text-gray-600">registered members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{memberStats.active}</div>
              <p className="text-xs text-gray-600">currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Members</CardTitle>
              <Star className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{memberStats.premium}</div>
              <p className="text-xs text-gray-600">premium subscriptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{memberStats.newThisMonth}</div>
              <p className="text-xs text-gray-600">recent additions</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search Members</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="statusFilter">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="typeFilter">Membership Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Elite">Elite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Member Form */}
        {isAddingMember && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Member</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="memberName">Full Name</Label>
                  <Input
                    id="memberName"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="memberEmail">Email</Label>
                  <Input
                    id="memberEmail"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="memberPhone">Phone</Label>
                  <Input
                    id="memberPhone"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="memberType">Membership Type</Label>
                  <Select value={newMember.membershipType} onValueChange={(value) => setNewMember({...newMember, membershipType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Elite">Elite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <Button onClick={handleAddMember}>Add Member</Button>
                <Button variant="outline" onClick={() => setIsAddingMember(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Members List */}
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.photo} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                        <Badge className={getTypeColor(member.membershipType)}>
                          {member.membershipType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Last Visit</p>
                      <p className="font-medium">{member.lastVisit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Visits</p>
                      <p className="font-medium">{member.totalVisits}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Expires</p>
                      <p className="font-medium">{member.membershipExpiry}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingMember(editingMember === member.id ? null : member.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Joined: {member.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Mode */}
                {editingMember === member.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Edit Member</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Status</Label>
                        <Select value={member.status} onValueChange={(value) => handleUpdateMember(member.id, 'status', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Membership Type</Label>
                        <Select value={member.membershipType} onValueChange={(value) => handleUpdateMember(member.id, 'membershipType', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="Elite">Elite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={member.phone}
                          onChange={(e) => handleUpdateMember(member.id, 'phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or add a new member.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MemberManagement; 