import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { toast } from 'sonner';
import {
  MessageSquare,
  Megaphone,
  Users,
  Send,
  Eye,
  Edit,
  Trash2,
  Pin,
  Calendar,
  TrendingUp,
  Filter,
  Search,
  Plus,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  BarChart3
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  target_audience: string;
  target_states?: string[];
  author_name: string;
  publish_date?: string;
  expiry_date?: string;
  view_count: number;
  click_count: number;
  like_count: number;
  is_pinned: boolean;
  send_notification: boolean;
  action_button_text?: string;
  action_button_url?: string;
  created_at: string;
}

interface MessageStats {
  total_messages: number;
  direct_messages: number;
  system_messages: number;
  unread_messages: number;
  read_rate: string;
  messages_by_category: Record<string, number>;
  messages_by_priority: Record<string, number>;
}

const MessagingCenter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [activeTab, setActiveTab] = useState<'announcements' | 'broadcast' | 'analytics'>('announcements');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [messageStats, setMessageStats] = useState<MessageStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  
  // Filters
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    priority: 'all',
    search: ''
  });

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'general',
    priority: 'medium',
    target_audience: 'all_members',
    target_states: [],
    publish_date: '',
    expiry_date: '',
    display_style: 'standard',
    send_notification: false,
    action_button_text: '',
    action_button_url: '',
    tags: []
  });

  // Broadcast form data
  const [broadcastData, setBroadcastData] = useState({
    target_audience: 'all_members',
    target_states: [],
    subject: '',
    content: '',
    category: 'general',
    priority: 'medium',
    action_button_text: '',
    action_button_url: ''
  });

  useEffect(() => {
    fetchAnnouncements();
    fetchMessageStats();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await dispatch(fetchAnnouncements()).unwrap();
      // Mock data for now
      const mockAnnouncements: Announcement[] = [
        {
          id: '1',
          title: 'Spring Tournament Registration Open',
          content: 'Registration for the 2024 Spring Championship is now open. This tournament will feature all skill levels.',
          excerpt: 'Registration for the 2024 Spring Championship is now open.',
          category: 'tournament',
          priority: 'high',
          status: 'published',
          target_audience: 'all_members',
          author_name: 'Tournament Director',
          publish_date: '2024-03-20',
          expiry_date: '2024-05-15',
          view_count: 245,
          click_count: 67,
          like_count: 23,
          is_pinned: true,
          send_notification: true,
          action_button_text: 'Register Now',
          action_button_url: '/tournaments/spring-2024',
          created_at: '2024-03-20T10:00:00Z'
        },
        {
          id: '2', 
          title: 'New Safety Guidelines',
          content: 'Updated safety guidelines for all clubs and tournaments have been published.',
          category: 'safety',
          priority: 'medium',
          status: 'draft',
          target_audience: 'club_managers',
          author_name: 'Safety Director',
          view_count: 12,
          click_count: 3,
          like_count: 1,
          is_pinned: false,
          send_notification: false,
          created_at: '2024-03-22T14:30:00Z'
        }
      ];
      setAnnouncements(mockAnnouncements);
    } catch (error) {
      toast.error('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessageStats = async () => {
    try {
      // TODO: Replace with actual API call
      const mockStats: MessageStats = {
        total_messages: 1247,
        direct_messages: 892,
        system_messages: 355,
        unread_messages: 89,
        read_rate: '92.8%',
        messages_by_category: {
          general: 456,
          tournament: 234,
          club: 187,
          coaching: 123,
          support: 89,
          system: 158
        },
        messages_by_priority: {
          low: 567,
          medium: 489,
          high: 156,
          urgent: 35
        }
      };
      setMessageStats(mockStats);
    } catch (error) {
      toast.error('Failed to fetch message statistics');
    }
  };

  const handleCreateAnnouncement = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await dispatch(createAnnouncement(formData)).unwrap();
      
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        author_name: user?.full_name || 'Admin',
        view_count: 0,
        click_count: 0,
        like_count: 0,
        status: 'draft',
        is_pinned: false,
        created_at: new Date().toISOString()
      };
      
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      setShowCreateModal(false);
      resetForm();
      toast.success('Announcement created successfully');
    } catch (error) {
      toast.error('Failed to create announcement');
    }
  };

  const handleUpdateAnnouncement = async () => {
    if (!editingAnnouncement || !formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      // TODO: Replace with actual API call
      const updatedAnnouncement = { ...editingAnnouncement, ...formData };
      setAnnouncements(prev => 
        prev.map(a => a.id === editingAnnouncement.id ? updatedAnnouncement : a)
      );
      setEditingAnnouncement(null);
      setShowCreateModal(false);
      resetForm();
      toast.success('Announcement updated successfully');
    } catch (error) {
      toast.error('Failed to update announcement');
    }
  };

  const handlePublishAnnouncement = async (id: string, sendNotification = false) => {
    try {
      // TODO: Replace with actual API call
      setAnnouncements(prev =>
        prev.map(a => 
          a.id === id 
            ? { ...a, status: 'published', publish_date: new Date().toISOString() }
            : a
        )
      );
      toast.success('Announcement published successfully');
    } catch (error) {
      toast.error('Failed to publish announcement');
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
      // TODO: Replace with actual API call
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      toast.success('Announcement deleted successfully');
    } catch (error) {
      toast.error('Failed to delete announcement');
    }
  };

  const handleSendBroadcast = async () => {
    if (!broadcastData.subject || !broadcastData.content) {
      toast.error('Subject and content are required');
      return;
    }

    try {
      // TODO: Replace with actual API call
      toast.success('Broadcast message sent successfully');
      setBroadcastData({
        target_audience: 'all_members',
        target_states: [],
        subject: '',
        content: '',
        category: 'general',
        priority: 'medium',
        action_button_text: '',
        action_button_url: ''
      });
    } catch (error) {
      toast.error('Failed to send broadcast message');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'general',
      priority: 'medium',
      target_audience: 'all_members',
      target_states: [],
      publish_date: '',
      expiry_date: '',
      display_style: 'standard',
      send_notification: false,
      action_button_text: '',
      action_button_url: '',
      tags: []
    });
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesStatus = filters.status === 'all' || announcement.status === filters.status;
    const matchesCategory = filters.category === 'all' || announcement.category === filters.category;
    const matchesPriority = filters.priority === 'all' || announcement.priority === filters.priority;
    const matchesSearch = !filters.search || 
      announcement.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      announcement.content.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'archived': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderAnnouncementsTab = () => (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Announcements</h2>
          <p className="text-gray-600">Create and manage system announcements</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="tournament">Tournament</option>
              <option value="safety">Safety</option>
              <option value="training">Training</option>
              <option value="equipment">Equipment</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {announcement.is_pinned && <Pin className="h-4 w-4 text-yellow-500" />}
                  <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(announcement.status)}`}>
                    {announcement.status}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{announcement.excerpt || announcement.content.substring(0, 150)}...</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Category: {announcement.category}</span>
                  <span>Target: {announcement.target_audience.replace('_', ' ')}</span>
                  <span>Author: {announcement.author_name}</span>
                  {announcement.publish_date && (
                    <span>Published: {new Date(announcement.publish_date).toLocaleDateString()}</span>
                  )}
                </div>

                <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{announcement.view_count} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{announcement.click_count} clicks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{announcement.like_count} likes</span>
                  </div>
                  {announcement.send_notification && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Bell className="h-4 w-4" />
                      <span>Notifications sent</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 ml-4">
                {announcement.status === 'draft' && (
                  <button
                    onClick={() => handlePublishAnnouncement(announcement.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Publish
                  </button>
                )}
                
                <button
                  onClick={() => {
                    setEditingAnnouncement(announcement);
                    setFormData({ ...formData, ...announcement });
                    setShowCreateModal(true);
                  }}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                
                <button
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
          <p className="text-gray-600">Create your first announcement to get started.</p>
        </div>
      )}
    </div>
  );

  const renderBroadcastTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Broadcast Messages</h2>
        <p className="text-gray-600">Send direct messages to specific user groups</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select
                value={broadcastData.target_audience}
                onChange={(e) => setBroadcastData(prev => ({ ...prev, target_audience: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all_members">All Members</option>
                <option value="players">Players</option>
                <option value="coaches">Coaches</option>
                <option value="club_managers">Club Managers</option>
                <option value="tournament_directors">Tournament Directors</option>
                <option value="officials">Officials</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={broadcastData.priority}
                onChange={(e) => setBroadcastData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              placeholder="Message subject..."
              value={broadcastData.subject}
              onChange={(e) => setBroadcastData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
            <textarea
              placeholder="Enter your message content..."
              value={broadcastData.content}
              onChange={(e) => setBroadcastData(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action Button Text (Optional)</label>
              <input
                type="text"
                placeholder="e.g., Register Now, Learn More"
                value={broadcastData.action_button_text}
                onChange={(e) => setBroadcastData(prev => ({ ...prev, action_button_text: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action Button URL (Optional)</label>
              <input
                type="url"
                placeholder="https://example.com/action"
                value={broadcastData.action_button_url}
                onChange={(e) => setBroadcastData(prev => ({ ...prev, action_button_url: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Send Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSendBroadcast}
              disabled={!broadcastData.subject || !broadcastData.content}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Broadcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Messaging Analytics</h2>
        <p className="text-gray-600">Track engagement and performance metrics</p>
      </div>

      {messageStats && (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Messages</p>
                  <p className="text-2xl font-semibold text-gray-900">{messageStats.total_messages.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Direct Messages</p>
                  <p className="text-2xl font-semibold text-gray-900">{messageStats.direct_messages.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Bell className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">System Messages</p>
                  <p className="text-2xl font-semibold text-gray-900">{messageStats.system_messages.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Read Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{messageStats.read_rate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages by Category</h3>
              <div className="space-y-3">
                {Object.entries(messageStats.messages_by_category).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                    <span className="text-sm text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages by Priority</h3>
              <div className="space-y-3">
                {Object.entries(messageStats.messages_by_priority).map(([priority, count]) => (
                  <div key={priority} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">{priority}</span>
                    <span className="text-sm text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messaging Center</h1>
          <p className="text-gray-600 mt-2">Manage announcements, send broadcasts, and track engagement</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'announcements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Megaphone className="h-4 w-4 mr-2 inline" />
              Announcements
            </button>
            <button
              onClick={() => setActiveTab('broadcast')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'broadcast'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Send className="h-4 w-4 mr-2 inline" />
              Broadcast
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2 inline" />
              Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'announcements' && renderAnnouncementsTab()}
        {activeTab === 'broadcast' && renderBroadcastTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}

        {/* Create/Edit Announcement Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingAnnouncement(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Announcement title..."
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General</option>
                      <option value="tournament">Tournament</option>
                      <option value="safety">Safety</option>
                      <option value="training">Training</option>
                      <option value="equipment">Equipment</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    placeholder="Announcement content..."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Targeting and Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select
                      value={formData.target_audience}
                      onChange={(e) => setFormData(prev => ({ ...prev, target_audience: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all_members">All Members</option>
                      <option value="players">Players</option>
                      <option value="coaches">Coaches</option>
                      <option value="club_managers">Club Managers</option>
                      <option value="tournament_directors">Tournament Directors</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                    <input
                      type="date"
                      value={formData.expiry_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="send_notification"
                    checked={formData.send_notification}
                    onChange={(e) => setFormData(prev => ({ ...prev, send_notification: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="send_notification" className="ml-2 text-sm font-medium text-gray-700">
                    Send push notifications to users
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingAnnouncement(null);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingAnnouncement ? handleUpdateAnnouncement : handleCreateAnnouncement}
                    disabled={!formData.title || !formData.content}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingAnnouncement ? 'Update' : 'Create'} Announcement
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingCenter;