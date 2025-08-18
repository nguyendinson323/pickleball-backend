import React, { useState } from 'react';

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: 'Basic' | 'Premium' | 'VIP';
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
  joinDate: string;
  lastVisit: string;
  totalVisits: number;
  photo: string | null;
  membershipExpiry: string;
  emergencyContact: string;
  notes: string;
}

interface MembersProps {
  members: Member[];
}

const Members: React.FC<MembersProps> = ({ members }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Basic' | 'Premium' | 'VIP'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive' | 'Suspended' | 'Pending'>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const getTypeColor = (type: 'Basic' | 'Premium' | 'VIP') => {
    switch (type) {
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: 'Active' | 'Inactive' | 'Suspended' | 'Pending') => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || member.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'Active').length,
    premium: members.filter(m => m.type === 'Premium').length,
    vip: members.filter(m => m.type === 'VIP').length
  };

  const handleExportMembers = () => {
    console.log('Exporting members list...');
    // In real app, this would generate and download a CSV/Excel file
  };

  const handleAddMember = () => {
    console.log('Opening add member form...');
    // In real app, this would open a modal or navigate to add member page
  };

  const handleEditMember = (memberId: number) => {
    console.log('Editing member:', memberId);
    // In real app, this would open edit modal or navigate to edit page
  };

  const handleContactMember = (memberId: number) => {
    console.log('Contacting member:', memberId);
    // In real app, this would open contact modal or email client
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="animate-on-scroll text-2xl font-bold text-gray-900">Member Management</h2>
          <p className="animate-on-scroll text-gray-600">Manage club members, memberships, and access</p>
        </div>
        <div className="flex space-x-3">
          <button 
            className="animate-on-scroll inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleExportMembers}
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export List</span>
          </button>
          <button 
            className="animate-on-scroll inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleAddMember}
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="animate-on-scroll text-sm font-medium">Total Members</h3>
            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div className="px-6 pb-4">
            <div className="animate-on-scroll text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="animate-on-scroll text-xs text-gray-600">registered members</p>
          </div>
        </div>

        <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="animate-on-scroll text-sm font-medium">Active Members</h3>
            <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div className="px-6 pb-4">
            <div className="animate-on-scroll text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="animate-on-scroll text-xs text-gray-600">currently active</p>
          </div>
        </div>

        <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="animate-on-scroll text-sm font-medium">Premium Members</h3>
            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="px-6 pb-4">
            <div className="animate-on-scroll text-2xl font-bold text-blue-600">{stats.premium}</div>
            <p className="animate-on-scroll text-xs text-gray-600">premium tier</p>
          </div>
        </div>

        <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="animate-on-scroll text-sm font-medium">VIP Members</h3>
            <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="px-6 pb-4">
            <div className="animate-on-scroll text-2xl font-bold text-purple-600">{stats.vip}</div>
            <p className="animate-on-scroll text-xs text-gray-600">vip tier</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="px-6 pt-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Search Members</label>
              <div className="relative">
                <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="animate-on-scroll block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="typeFilter" className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Type Filter</label>
              <select 
                id="typeFilter"
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value as 'all' | 'Basic' | 'Premium' | 'VIP')}
                className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Types</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Status Filter</label>
              <select 
                id="statusFilter"
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'Active' | 'Inactive' | 'Suspended' | 'Pending')}
                className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="animate-on-scroll text-lg font-semibold text-gray-900">All Members</h3>
        </div>
        <div className="px-6 py-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="animate-on-scroll px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="animate-on-scroll px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="animate-on-scroll px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="animate-on-scroll px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="animate-on-scroll px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                  <th className="animate-on-scroll px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Visits</th>
                  <th className="animate-on-scroll px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-8 w-8">
                          {member.photo ? (
                            <img className="h-8 w-8 rounded-full" src={member.photo} alt={member.name} />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="animate-on-scroll font-medium text-gray-900">{member.name}</div>
                          <div className="animate-on-scroll text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`animate-on-scroll inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(member.type)}`}>
                        {member.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`animate-on-scroll inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="animate-on-scroll px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.joinDate}</td>
                    <td className="animate-on-scroll px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.lastVisit}</td>
                    <td className="animate-on-scroll px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.totalVisits}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="animate-on-scroll inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => setSelectedMember(member)}
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        <button
                          className="animate-on-scroll inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => handleEditMember(member.id)}
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h3 className="animate-on-scroll text-lg font-medium text-gray-900 mb-2">No members found</h3>
              <p className="animate-on-scroll text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="animate-on-scroll text-lg font-semibold">Member Details</h3>
              <button 
                className="animate-on-scroll inline-flex items-center p-2 border border-transparent rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setSelectedMember(null)}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-16 w-16">
                  {selectedMember.photo ? (
                    <img className="h-16 w-16 rounded-full" src={selectedMember.photo} alt={selectedMember.name} />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-medium text-gray-700">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="animate-on-scroll text-xl font-semibold">{selectedMember.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`animate-on-scroll inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedMember.type)}`}>
                      {selectedMember.type}
                    </span>
                    <span className={`animate-on-scroll inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMember.status)}`}>
                      {selectedMember.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="animate-on-scroll flex items-center space-x-2">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{selectedMember.email}</span>
                  </p>
                </div>
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  <p className="animate-on-scroll flex items-center space-x-2">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{selectedMember.phone}</span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-500 mb-1">Join Date</label>
                  <p className="animate-on-scroll flex items-center space-x-2">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{selectedMember.joinDate}</span>
                  </p>
                </div>
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-500 mb-1">Last Visit</label>
                  <p className="animate-on-scroll flex items-center space-x-2">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{selectedMember.lastVisit}</span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-500 mb-1">Total Visits</label>
                  <p className="animate-on-scroll font-medium">{selectedMember.totalVisits}</p>
                </div>
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-500 mb-1">Membership Expiry</label>
                  <p className="animate-on-scroll font-medium">{selectedMember.membershipExpiry}</p>
                </div>
              </div>
              
              <div>
                <label className="animate-on-scroll block text-sm font-medium text-gray-500 mb-1">Emergency Contact</label>
                <p className="animate-on-scroll">{selectedMember.emergencyContact}</p>
              </div>
              
              {selectedMember.notes && (
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-500 mb-1">Notes</label>
                  <p className="animate-on-scroll mt-1 p-3 bg-gray-50 rounded-lg">{selectedMember.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button 
                className="animate-on-scroll inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setSelectedMember(null)}
              >
                Close
              </button>
              <button 
                className="animate-on-scroll inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => handleEditMember(selectedMember.id)}
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Member
              </button>
              <button 
                className="animate-on-scroll inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => handleContactMember(selectedMember.id)}
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members; 