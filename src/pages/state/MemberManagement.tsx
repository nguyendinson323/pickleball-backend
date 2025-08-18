import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
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
      type: 'Club Manager',
      club: 'City Park Recreation',
      status: 'Active',
      joinDate: '2023-04-12',
      lastActivity: '2024-03-19',
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
    status: 'Active',
    membershipLevel: 'Standard',
    skillLevel: 'Beginner'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Player': return 'bg-blue-100 text-blue-800';
      case 'Coach': return 'bg-purple-100 text-purple-800';
      case 'Club Manager': return 'bg-green-100 text-green-800';
      case 'Tournament Director': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'Standard': return 'bg-gray-100 text-gray-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Professional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.club.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || member.type === filterType;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    const matchesClub = filterClub === 'all' || member.club === filterClub;
    return matchesSearch && matchesType && matchesStatus && matchesClub;
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email && newMember.club) {
      const member = {
        id: Date.now(),
        ...newMember,
        joinDate: new Date().toISOString().split('T')[0],
        lastActivity: new Date().toISOString().split('T')[0],
        photo: null
      };
      setMembers([member, ...members]);
      setNewMember({
        name: '',
        email: '',
        phone: '',
        type: 'Player',
        club: '',
        status: 'Active',
        membershipLevel: 'Standard',
        skillLevel: 'Beginner'
      });
      setIsAddingMember(false);
    }
  };

  const handleEditMember = (id: number) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setNewMember({
        name: member.name,
        email: member.email,
        phone: member.phone,
        type: member.type,
        club: member.club,
        status: member.status,
        membershipLevel: member.membershipLevel,
        skillLevel: member.skillLevel
      });
      setEditingMember(id);
      setIsAddingMember(true);
    }
  };

  const handleUpdateMember = () => {
    if (editingMember && newMember.name && newMember.email && newMember.club) {
      setMembers(members.map(m => 
        m.id === editingMember ? { ...m, ...newMember } : m
      ));
      setNewMember({
        name: '',
        email: '',
        phone: '',
        type: 'Player',
        club: '',
        status: 'Active',
        membershipLevel: 'Standard',
        skillLevel: 'Beginner'
      });
      setEditingMember(null);
      setIsAddingMember(false);
    }
  };

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const memberStats = {
    total: members.length,
    active: members.filter(m => m.status === 'Active').length,
    players: members.filter(m => m.type === 'Player').length,
    coaches: members.filter(m => m.type === 'Coach').length,
    premium: members.filter(m => m.membershipLevel === 'Premium').length
  };

  const clubs = Array.from(new Set(members.map(m => m.club))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Member Management</h1>
            <p className="text-gray-600">Manage federation members and their information</p>
          </div>
          <button
            onClick={() => setIsAddingMember(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Member Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8 animate-on-scroll">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-blue-600">{memberStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-green-600">{memberStats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Players</p>
                <p className="text-2xl font-bold text-purple-600">{memberStats.players}</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Coaches</p>
                <p className="text-2xl font-bold text-orange-600">{memberStats.coaches}</p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Premium</p>
                <p className="text-2xl font-bold text-yellow-600">{memberStats.premium}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-8 animate-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Player">Player</option>
                <option value="Coach">Coach</option>
                <option value="Club Manager">Club Manager</option>
                <option value="Tournament Director">Tournament Director</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Club</label>
              <select
                value={filterClub}
                onChange={(e) => setFilterClub(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Clubs</option>
                {clubs.map((club) => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Add/Edit Member Form */}
        {isAddingMember && (
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-8 animate-on-scroll">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {editingMember ? 'Edit Member' : 'Add New Member'}
              </h3>
              <button
                onClick={() => {
                  setIsAddingMember(false);
                  setEditingMember(null);
                  setNewMember({
                    name: '',
                    email: '',
                    phone: '',
                    type: 'Player',
                    club: '',
                    status: 'Active',
                    membershipLevel: 'Standard',
                    skillLevel: 'Beginner'
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Member name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newMember.type}
                  onChange={(e) => setNewMember({...newMember, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Player">Player</option>
                  <option value="Coach">Coach</option>
                  <option value="Club Manager">Club Manager</option>
                  <option value="Tournament Director">Tournament Director</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Club</label>
                <input
                  type="text"
                  value={newMember.club}
                  onChange={(e) => setNewMember({...newMember, club: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Club name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={newMember.status}
                  onChange={(e) => setNewMember({...newMember, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Membership Level</label>
                <select
                  value={newMember.membershipLevel}
                  onChange={(e) => setNewMember({...newMember, membershipLevel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                <select
                  value={newMember.skillLevel}
                  onChange={(e) => setNewMember({...newMember, skillLevel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsAddingMember(false);
                  setEditingMember(null);
                  setNewMember({
                    name: '',
                    email: '',
                    phone: '',
                    type: 'Player',
                    club: '',
                    status: 'Active',
                    membershipLevel: 'Standard',
                    skillLevel: 'Beginner'
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={editingMember ? handleUpdateMember : handleAddMember}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                {editingMember ? 'Update' : 'Add'} Member
              </button>
            </div>
          </div>
        )}

        {/* Members List */}
        <div className="space-y-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(member.type)}`}>
                          {member.type}
                        </span>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getMembershipColor(member.membershipLevel)}`}>
                          {member.membershipLevel}
                        </span>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSkillColor(member.skillLevel)}`}>
                          {member.skillLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditMember(member.id)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{member.club}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Joined: {member.joinDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Last activity: {member.lastActivity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Send message</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No members found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberManagement; 