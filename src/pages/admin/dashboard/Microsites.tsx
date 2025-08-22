import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { toast } from 'sonner';
import axiosInstance from '../../../utils/axios';
import {
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Flag,
  Shield,
  Lock,
  Unlock,
  Settings,
  MoreVertical,
  Download,
  RefreshCw,
  Users,
  Globe,
  MapPin,
  Calendar
} from 'lucide-react';

interface Microsite {
  id: string;
  name: string;
  type: 'state' | 'club' | 'partner';
  status: 'active' | 'inactive' | 'pending' | 'maintenance' | 'suspended';
  lastUpdated: string;
  contentIssues: number;
  needsReview: boolean;
  url: string;
  owner: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    username: string;
  } | string;
  region: string;
  isActive: boolean;
  moderationFlags: Record<string, any>;
  settings: Record<string, any>;
  createdAt: string;
}

interface ModerationFlag {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  flagged_by: string;
  flagged_by_name: string;
  flagged_at: string;
  status: 'active' | 'resolved';
  auto_action: boolean;
}

const Microsites: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMicrosite, setSelectedMicrosite] = useState<Microsite | null>(null);
  const [microsites, setMicrosites] = useState<Microsite[]>([]);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [showModerationModal, setShowModerationModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedMicrosites, setSelectedMicrosites] = useState<string[]>([]);

  useEffect(() => {
    fetchMicrosites();
    fetchAnalytics();
  }, []);

  const fetchMicrosites = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/microsites', {
        params: {
          type: typeFilter !== 'all' ? typeFilter : undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: searchQuery || undefined
        }
      });
      setMicrosites(response.data.data.microsites || []);
    } catch (error: any) {
      console.error('Error fetching microsites:', error);
      toast.error('Failed to fetch microsites');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axiosInstance.get('/admin/microsites/analytics');
      setAnalytics(response.data.data.analytics);
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'state': return 'bg-blue-100 text-blue-800';
      case 'club': return 'bg-purple-100 text-purple-800';
      case 'partner': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'inactive': return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'pending': return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      );
      case 'maintenance': return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
      default: return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      );
    }
  };

  const handleMicrositeAction = async (micrositeId: string, action: string, reason?: string) => {
    try {
      switch (action) {
        case 'activate':
        case 'deactivate':
        case 'suspend':
        case 'maintenance':
          await axiosInstance.put(`/admin/microsites/${micrositeId}/status`, {
            status: action === 'activate' ? 'active' : action,
            reason
          });
          break;
        default:
          console.log(`Action ${action} not implemented yet`);
          return;
      }
      toast.success(`Microsite ${action}d successfully`);
      fetchMicrosites();
    } catch (error: any) {
      console.error(`Error ${action}ing microsite:`, error);
      toast.error(error.response?.data?.message || `Failed to ${action} microsite`);
    }
  };

  const handleBulkAction = async (action: string, reason?: string) => {
    if (selectedMicrosites.length === 0) {
      toast.error('Please select microsites first');
      return;
    }

    try {
      await axiosInstance.post('/admin/microsites/bulk-action', {
        action,
        microsite_ids: selectedMicrosites,
        reason
      });
      toast.success(`Bulk ${action} completed successfully`);
      setSelectedMicrosites([]);
      setShowBulkActions(false);
      fetchMicrosites();
    } catch (error: any) {
      console.error('Error in bulk action:', error);
      toast.error(error.response?.data?.message || 'Bulk action failed');
    }
  };

  const handleAddModerationFlag = async (micrositeId: string, flagData: any) => {
    try {
      await axiosInstance.post(`/admin/microsites/${micrositeId}/moderation`, flagData);
      toast.success('Moderation flag added successfully');
      fetchMicrosites();
      setShowModerationModal(false);
    } catch (error: any) {
      console.error('Error adding moderation flag:', error);
      toast.error(error.response?.data?.message || 'Failed to add moderation flag');
    }
  };

  const handleResolveModerationFlag = async (micrositeId: string, flagId: string, resolutionNote?: string) => {
    try {
      await axiosInstance.delete(`/admin/microsites/${micrositeId}/moderation/${flagId}`, {
        data: { resolution_note: resolutionNote }
      });
      toast.success('Moderation flag resolved successfully');
      fetchMicrosites();
    } catch (error: any) {
      console.error('Error resolving moderation flag:', error);
      toast.error(error.response?.data?.message || 'Failed to resolve moderation flag');
    }
  };

  const generateReport = () => {
    const csvData = microsites.map(m => ({
      ID: m.id,
      Name: m.name,
      Type: m.type,
      Status: m.status,
      Owner: typeof m.owner === 'string' ? m.owner : m.owner.name,
      Region: m.region,
      'Content Issues': m.contentIssues,
      'Needs Review': m.needsReview ? 'Yes' : 'No',
      'Last Updated': m.lastUpdated,
      'Created At': m.createdAt
    }));
    
    const csvContent = [
      Object.keys(csvData[0] || {}).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `microsites-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Report generated successfully');
  };

  const filteredMicrosites = microsites.filter(microsite => {
    const matchesSearch = microsite.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         microsite.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || microsite.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || microsite.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = analytics?.overview || {
    total_microsites: microsites.length,
    active_microsites: microsites.filter(m => m.status === 'active').length,
    inactive_microsites: microsites.filter(m => m.status === 'inactive').length,
    flagged_microsites: microsites.filter(m => m.contentIssues > 0).length
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 animate-on-scroll">Microsite Management</h2>
          <p className="text-gray-600 animate-on-scroll">Monitor and manage all microsites across the platform</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={generateReport} 
            className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 animate-on-scroll">Total Microsites</p>
              <div className="text-2xl font-bold text-blue-600 animate-on-scroll">{stats.total_microsites}</div>
              <p className="text-xs text-gray-600 animate-on-scroll">registered sites</p>
            </div>
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 animate-on-scroll">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 animate-on-scroll">Active Sites</p>
              <div className="text-2xl font-bold text-green-600 animate-on-scroll">{stats.active_microsites}</div>
              <p className="text-xs text-gray-600 animate-on-scroll">currently live</p>
            </div>
            <div className="p-2 rounded-full bg-green-100 text-green-600 animate-on-scroll">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 animate-on-scroll">Inactive Sites</p>
              <div className="text-2xl font-bold text-yellow-600 animate-on-scroll">{stats.inactive_microsites}</div>
              <p className="text-xs text-gray-600 animate-on-scroll">not currently active</p>
            </div>
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 animate-on-scroll">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-on-scroll">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 animate-on-scroll">Flagged Sites</p>
              <div className="text-2xl font-bold text-red-600 animate-on-scroll">{stats.flagged_microsites}</div>
              <p className="text-xs text-gray-600 animate-on-scroll">moderation flags</p>
            </div>
            <div className="p-2 rounded-full bg-red-100 text-red-600 animate-on-scroll">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm animate-on-scroll">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">Search Microsites</label>
              <div className="relative">
                <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
                />
              </div>
            </div>
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">Type Filter</label>
              <select 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
              >
                <option value="all">All Types</option>
                <option value="state">State Committees</option>
                <option value="club">Clubs</option>
                <option value="partner">Partners</option>
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">Status Filter</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="maintenance">Maintenance</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="flex items-end space-x-2">
              {selectedMicrosites.length > 0 && (
                <button 
                  onClick={() => setShowBulkActions(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
                >
                  <Settings className="h-4 w-4" />
                  <span>Bulk Actions ({selectedMicrosites.length})</span>
                </button>
              )}
              <button 
                onClick={fetchMicrosites}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Microsites Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm animate-on-scroll">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 animate-on-scroll">All Microsites</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 animate-on-scroll">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    <input
                      type="checkbox"
                      checked={selectedMicrosites.length === filteredMicrosites.length && filteredMicrosites.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMicrosites(filteredMicrosites.map(m => m.id));
                        } else {
                          setSelectedMicrosites([]);
                        }
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 animate-on-scroll">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 animate-on-scroll">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 animate-on-scroll">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 animate-on-scroll">Owner</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 animate-on-scroll">Region</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 animate-on-scroll">Last Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 animate-on-scroll">Flags</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 animate-on-scroll">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMicrosites.map((microsite) => (
                  <tr key={microsite.id} className="border-b border-gray-100 hover:bg-gray-50 animate-on-scroll">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedMicrosites.includes(microsite.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMicrosites([...selectedMicrosites, microsite.id]);
                          } else {
                            setSelectedMicrosites(selectedMicrosites.filter(id => id !== microsite.id));
                          }
                        }}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium animate-on-scroll">
                      <div>
                        <div className="animate-on-scroll">{microsite.name}</div>
                        <div className="text-sm text-gray-500 animate-on-scroll">{microsite.url}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(microsite.type)} animate-on-scroll`}>
                        <div className="flex items-center space-x-1">
                          {microsite.type === 'state' && (
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                          {microsite.type === 'club' && (
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          )}
                          {microsite.type === 'partner' && (
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          <span className="capitalize animate-on-scroll">{microsite.type}</span>
                        </div>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(microsite.status)} animate-on-scroll`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(microsite.status)}
                          <span className="capitalize animate-on-scroll">{microsite.status}</span>
                        </div>
                      </span>
                    </td>
                    <td className="py-3 px-4 animate-on-scroll">
                      {typeof microsite.owner === 'string' ? microsite.owner : microsite.owner.name}
                    </td>
                    <td className="py-3 px-4 animate-on-scroll">{microsite.region}</td>
                    <td className="py-3 px-4 animate-on-scroll">{microsite.lastUpdated}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {microsite.contentIssues > 0 ? (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full animate-on-scroll">
                            <Flag className="h-3 w-3 mr-1" />
                            {microsite.contentIssues}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full animate-on-scroll">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Clean
                          </span>
                        )}
                        {microsite.needsReview && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full animate-on-scroll">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Review
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-1">
                        <button
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          onClick={() => window.open(microsite.url, '_blank')}
                          title="View Site"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <button
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          onClick={() => setSelectedMicrosite(microsite)}
                          title="Manage Site"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                        
                        {microsite.status === 'active' ? (
                          <button
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            onClick={() => handleMicrositeAction(microsite.id, 'deactivate', 'Admin deactivation')}
                            title="Deactivate"
                          >
                            <Lock className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                            onClick={() => handleMicrositeAction(microsite.id, 'activate', 'Admin activation')}
                            title="Activate"
                          >
                            <Unlock className="h-4 w-4" />
                          </button>
                        )}
                        
                        <button
                          className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                          onClick={() => {
                            // Set current microsite for moderation modal
                            setSelectedMicrosite(microsite);
                            setShowModerationModal(true);
                          }}
                          title="Add Moderation Flag"
                        >
                          <Flag className="h-4 w-4" />
                        </button>
                        
                        {microsite.status !== 'suspended' ? (
                          <button
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            onClick={() => {
                              if (confirm('Are you sure you want to suspend this microsite? This action requires admin review.')) {
                                handleMicrositeAction(microsite.id, 'suspend', 'Admin suspension for policy violation');
                              }
                            }}
                            title="Suspend Site"
                          >
                            <Shield className="h-4 w-4" />
                          </button>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            Suspended
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMicrosites.length === 0 && (
            <div className="text-center py-8 animate-on-scroll">
              <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2 animate-on-scroll">No microsites found</h3>
              <p className="text-gray-600 animate-on-scroll">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Microsite Detail Modal */}
      {selectedMicrosite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 animate-on-scroll">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold animate-on-scroll">Microsite Details</h3>
              <button 
                className="p-1 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 animate-on-scroll"
                onClick={() => setSelectedMicrosite(null)}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 animate-on-scroll">Name</label>
                  <p className="font-medium animate-on-scroll">{selectedMicrosite.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 animate-on-scroll">Type</label>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(selectedMicrosite.type)} animate-on-scroll`}>
                    <span className="capitalize animate-on-scroll">{selectedMicrosite.type}</span>
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 animate-on-scroll">Owner</label>
                  <p className="animate-on-scroll">{selectedMicrosite.owner}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 animate-on-scroll">Region</label>
                  <p className="animate-on-scroll">{selectedMicrosite.region}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 animate-on-scroll">URL</label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded animate-on-scroll">
                    {selectedMicrosite.url}
                  </span>
                  <button
                    className="px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
                    onClick={() => window.open(selectedMicrosite.url, '_blank')}
                  >
                    <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Visit
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 animate-on-scroll">Status</label>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedMicrosite.status)} animate-on-scroll`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedMicrosite.status)}
                      <span className="capitalize animate-on-scroll">{selectedMicrosite.status}</span>
                    </div>
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 animate-on-scroll">Last Updated</label>
                  <p className="animate-on-scroll">{selectedMicrosite.lastUpdated}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 animate-on-scroll">Content Issues</label>
                <div className="mt-1">
                  {selectedMicrosite.contentIssues > 0 ? (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full animate-on-scroll">{selectedMicrosite.contentIssues} issues detected</span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full animate-on-scroll">No issues detected</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button 
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
                onClick={() => setSelectedMicrosite(null)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
                onClick={() => handleMicrositeAction(selectedMicrosite.id, 'configure')}
              >
                <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configure
              </button>
              <button
                onClick={() => handleMicrositeAction(selectedMicrosite.id, 'manage')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
              >
                <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Manage Site
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Moderation Flag Modal */}
      {showModerationModal && selectedMicrosite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Moderation Flag</h3>
              <button 
                onClick={() => setShowModerationModal(false)}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const flagData = {
                flag_type: formData.get('flag_type'),
                description: formData.get('description'),
                severity: formData.get('severity'),
                auto_action: formData.get('auto_action') === 'on'
              };
              handleAddModerationFlag(selectedMicrosite.id, flagData);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flag Type</label>
                  <select name="flag_type" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select flag type</option>
                    <option value="inappropriate_content">Inappropriate Content</option>
                    <option value="spam">Spam</option>
                    <option value="false_information">False Information</option>
                    <option value="copyright_violation">Copyright Violation</option>
                    <option value="terms_violation">Terms Violation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select name="severity" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    name="description" 
                    required 
                    rows={3}
                    placeholder="Describe the issue..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="auto_action" 
                    id="auto_action"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="auto_action" className="ml-2 text-sm text-gray-700">
                    Apply automatic action (suspend for critical/high severity)
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowModerationModal(false)}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Add Flag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Actions Modal */}
      {showBulkActions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Bulk Actions</h3>
              <button 
                onClick={() => setShowBulkActions(false)}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Selected {selectedMicrosites.length} microsite{selectedMicrosites.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleBulkAction('activate', 'Bulk activation by admin')}
                className="w-full flex items-center px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100"
              >
                <Unlock className="h-4 w-4 mr-2" />
                Activate All
              </button>
              
              <button 
                onClick={() => handleBulkAction('deactivate', 'Bulk deactivation by admin')}
                className="w-full flex items-center px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md hover:bg-yellow-100"
              >
                <Lock className="h-4 w-4 mr-2" />
                Deactivate All
              </button>
              
              <button 
                onClick={() => handleBulkAction('maintenance', 'Bulk maintenance mode by admin')}
                className="w-full flex items-center px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100"
              >
                <Settings className="h-4 w-4 mr-2" />
                Set to Maintenance
              </button>
              
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to suspend all selected microsites? This requires admin review.')) {
                    handleBulkAction('suspend', 'Bulk suspension by admin for policy review');
                  }
                }}
                className="w-full flex items-center px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100"
              >
                <Shield className="h-4 w-4 mr-2" />
                Suspend All
              </button>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowBulkActions(false)}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Microsites; 