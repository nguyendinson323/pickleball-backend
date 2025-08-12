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
  Target, 
  BookOpen, 
  Award, 
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const MemberManagement = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClub, setFilterClub] = useState('all');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<number | null>(null);

  // Mock member data
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Sarah M.',
      email: 'sarah.m@email.com',
      phone: '(555) 123-4567',
      type: 'Player',
      club: 'Elite Pickleball Club',
      status: 'Active',
      joinDate: '2023-01-15',
      lastActivity: '2024-03-20',
      membershipLevel: 'Premium',
      skillLevel: 'Intermediate',
      photo: null
    },
    {
      id: 2,
      name: 'Mike R.',
      email: 'mike.r@email.com',
      phone: '(555) 234-5678',
      type: 'Coach',
      club: 'Pro Training Center',
      status: 'Active',
      joinDate: '2023-03-20',
      lastActivity: '2024-03-18',
      membershipLevel: 'Professional',
      skillLevel: 'Advanced',
      photo: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      email: 'lisa.k@email.com',
      phone: '(555) 345-6789',
      type: 'Player',
      club: 'Community Courts',
      status: 'Active',
      joinDate: '2023-02-10',
      lastActivity: '2024-03-15',
      membershipLevel: 'Standard',
      skillLevel: 'Beginner',
      photo: null
    },
    {
      id: 4,
      name: 'John D.',
      email: 'john.d@email.com',
      phone: '(555) 456-7890',
      type: 'Player',
      club: 'Elite Pickleball Club',
      status: 'Inactive',
      joinDate: '2023-01-05',
      lastActivity: '2024-02-15',
      membershipLevel: 'Standard',
      skillLevel: 'Intermediate',
      photo: null
    },
    {
      id: 5,
      name: 'Emily W.',
      email: 'emily.w@email.com',
      phone: '(555) 567-8901',
      type: 'Coach',
      club: 'Elite Pickleball Club',
      status: 'Active',
      joinDate: '2023-04-12',
      lastActivity: '2024-03-22',
      membershipLevel: 'Professional',
      skillLevel: 'Advanced',
      photo: null
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Player',
    club: '',
    membershipLevel: 'Standard',
    skillLevel: 'Beginner'
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const member = {
        id: members.length + 1,
        ...newMember,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        lastActivity: new Date().toISOString().split('T')[0],
        photo: null
      };
      setMembers([...members, member]);
      setNewMember({
        name: '',
        email: '',
        phone: '',
        type: 'Player',
        club: '',
        membershipLevel: 'Standard',
        skillLevel: 'Beginner'
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
    const matchesType = filterType === 'all' || member.type === filterType;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    const matchesClub = filterClub === 'all' || member.club === filterClub;

    return matchesSearch && matchesType && matchesStatus && matchesClub;
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
      case 'Player': return 'bg-blue-100 text-blue-800';
      case 'Coach': return 'bg-purple-100 text-purple-800';
      case 'Club': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Elite': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const memberStats = {
    total: members.length,
    active: members.filter(m => m.status === 'Active').length,
    players: members.filter(m => m.type === 'Player').length,
    coaches: members.filter(m => m.type === 'Coach').length,
    premium: members.filter(m => m.membershipLevel === 'Premium').length,
    professional: members.filter(m => m.membershipLevel === 'Professional').length
  };

  const clubs = Array.from(new Set(members.map(m => m.club))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Member Management</h1>
            <p className="text-gray-600">Manage your federation members and their information</p>
          </div>
          <Button onClick={() => setIsAddingMember(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Member</span>
          </Button>
        </div>

        {/* Member Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
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
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{memberStats.active}</div>
              <p className="text-xs text-gray-600">currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Players</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{memberStats.players}</div>
              <p className="text-xs text-gray-600">active players</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coaches</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{memberStats.coaches}</div>
              <p className="text-xs text-gray-600">certified coaches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{memberStats.premium}</div>
              <p className="text-xs text-gray-600">premium members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Professional</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{memberStats.professional}</div>
              <p className="text-xs text-gray-600">professional members</p>
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
                <Label htmlFor="typeFilter">Member Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Player">Player</SelectItem>
                    <SelectItem value="Coach">Coach</SelectItem>
                    <SelectItem value="Club">Club</SelectItem>
                  </SelectContent>
                </Select>
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
            </div>
            <div className="mt-4">
              <Label htmlFor="clubFilter">Club</Label>
              <Select value={filterClub} onValueChange={setFilterClub}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clubs</SelectItem>
                  {clubs.map((club) => (
                    <SelectItem key={club} value={club}>{club}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <Label htmlFor="memberType">Member Type</Label>
                  <Select value={newMember.type} onValueChange={(value) => setNewMember({...newMember, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Player">Player</SelectItem>
                      <SelectItem value="Coach">Coach</SelectItem>
                      <SelectItem value="Club">Club</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="memberClub">Club</Label>
                  <Input
                    id="memberClub"
                    value={newMember.club}
                    onChange={(e) => setNewMember({...newMember, club: e.target.value})}
                    placeholder="Enter club name"
                  />
                </div>
                <div>
                  <Label htmlFor="membershipLevel">Membership Level</Label>
                  <Select value={newMember.membershipLevel} onValueChange={(value) => setNewMember({...newMember, membershipLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="skillLevel">Skill Level</Label>
                  <Select value={newMember.skillLevel} onValueChange={(value) => setNewMember({...newMember, skillLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
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
                        <Badge className={getTypeColor(member.type)}>
                          {member.type}
                        </Badge>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                        <Badge className={getLevelColor(member.skillLevel)}>
                          {member.skillLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Club</p>
                      <p className="font-medium">{member.club}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Membership</p>
                      <p className="font-medium">{member.membershipLevel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Joined</p>
                      <p className="font-medium">{member.joinDate}</p>
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
                      <span>Last Activity: {member.lastActivity}</span>
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
                        <Label>Membership Level</Label>
                        <Select value={member.membershipLevel} onValueChange={(value) => handleUpdateMember(member.id, 'membershipLevel', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="Professional">Professional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Skill Level</Label>
                        <Select value={member.skillLevel} onValueChange={(value) => handleUpdateMember(member.id, 'skillLevel', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Elite">Elite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberManagement; 