import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { toast } from 'sonner';
import axiosInstance from '../../utils/axios';
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

interface AdminMessage {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  message_type: 'announcement' | 'notification' | 'alert' | 'reminder' | 'newsletter';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled';
  target_audience: 'all_users' | 'players' | 'coaches' | 'clubs' | 'partners' | 'states' | 'players_coaches' | 'business_users' | 'specific_users' | 'by_location' | 'by_membership';
  target_filters?: any;
  sender_name: string;
  scheduled_send_at?: string;
  sent_at?: string;
  expires_at?: string;
  total_recipients: number;
  sent_count: number;
  read_count: number;
  click_count: number;
  is_pinned: boolean;
  send_via_email: boolean;
  send_via_notification: boolean;
  action_button_text?: string;
  action_button_url?: string;
  attachments?: any[];
  tags?: string[];
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
  
  const [activeTab, setActiveTab] = useState<'messages' | 'templates' | 'analytics'>('messages');
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [messageStats, setMessageStats] = useState<MessageStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<AdminMessage | null>(null);
  
  // Filters
  const [filters, setFilters] = useState({
    status: 'all',
    message_type: 'all',
    target_audience: 'all',
    priority: 'all',
    search: ''
  });

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    message_type: 'announcement' as 'announcement' | 'notification' | 'alert' | 'reminder' | 'newsletter',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    target_audience: 'all_users' as 'all_users' | 'players' | 'coaches' | 'clubs' | 'partners' | 'states' | 'players_coaches' | 'business_users' | 'specific_users' | 'by_location' | 'by_membership',
    target_filters: {},
    scheduled_send_at: '',
    expires_at: '',
    is_pinned: false,
    send_via_email: false,
    send_via_notification: true,
    action_button_text: '',
    action_button_url: '',
    attachments: [],
    tags: []
  });

  // Recipients preview data
  const [recipientsPreview, setRecipientsPreview] = useState<{
    total_recipients: number;
    recipients: any[];
    breakdown: Record<string, number>;
  } | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
    fetchMessageStats();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/messages', {
        params: {
          status: filters.status !== 'all' ? filters.status : undefined,
          message_type: filters.message_type !== 'all' ? filters.message_type : undefined,
          target_audience: filters.target_audience !== 'all' ? filters.target_audience : undefined,
          priority: filters.priority !== 'all' ? filters.priority : undefined,
          limit: 50
        }
      });
      setMessages(response.data.data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessageStats = async () => {
    try {
      const response = await axiosInstance.get('/admin/messages/stats/overview');
      const stats = response.data.data;
      setMessageStats({
        total_messages: stats.total_messages || 0,
        direct_messages: 0, // Not applicable for admin messages
        system_messages: stats.total_messages || 0,
        unread_messages: 0, // Not applicable for admin messages
        read_rate: '0%', // Will be calculated from individual message stats
        messages_by_category: stats.message_counts || {},
        messages_by_priority: stats.message_counts || {}
      });
    } catch (error) {
      console.error('Error fetching message stats:', error);
      // Fallback to empty stats
      setMessageStats({
        total_messages: 0,
        direct_messages: 0,
        system_messages: 0,
        unread_messages: 0,
        read_rate: '0%',
        messages_by_category: {},
        messages_by_priority: {}
      });
    }
  };

  const handleCreateMessage = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      const response = await axiosInstance.post('/admin/messages', formData);
      const newMessage = response.data.data.message;
      
      setMessages(prev => [newMessage, ...prev]);
      setShowCreateModal(false);
      resetForm();
      toast.success('Message created successfully');
    } catch (error: any) {
      console.error('Error creating message:', error);
      toast.error(error.response?.data?.message || 'Failed to create message');
    }
  };

  const handleUpdateMessage = async () => {
    if (!editingAnnouncement || !formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      const response = await axiosInstance.put(`/admin/messages/${editingAnnouncement.id}`, formData);
      const updatedMessage = response.data.data.message;
      
      setMessages(prev => 
        prev.map(m => m.id === editingAnnouncement.id ? updatedMessage : m)
      );
      setEditingAnnouncement(null);
      setShowCreateModal(false);
      resetForm();
      toast.success('Message updated successfully');
    } catch (error: any) {
      console.error('Error updating message:', error);
      toast.error(error.response?.data?.message || 'Failed to update message');
    }
  };

  const handleSendMessage = async (id: string, sendImmediately = true) => {
    try {
      const response = await axiosInstance.post(`/admin/messages/${id}/send`, {
        send_immediately: sendImmediately
      });
      
      // Update message status in local state
      setMessages(prev =>
        prev.map(m => 
          m.id === id 
            ? { ...m, status: sendImmediately ? 'sent' : 'scheduled', sent_at: sendImmediately ? new Date().toISOString() : undefined }
            : m
        )
      );
      toast.success(sendImmediately ? 'Message sent successfully' : 'Message scheduled successfully');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.response?.data?.message || 'Failed to send message');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await axiosInstance.delete(`/admin/messages/${id}`);
      setMessages(prev => prev.filter(m => m.id !== id));
      toast.success('Message deleted successfully');
    } catch (error: any) {
      console.error('Error deleting message:', error);
      toast.error(error.response?.data?.message || 'Failed to delete message');
    }
  };

  const handlePreviewRecipients = async () => {
    setPreviewLoading(true);
    try {
      const response = await axiosInstance.post('/admin/messages/preview-recipients', {
        target_audience: formData.target_audience,
        target_filters: formData.target_filters
      });
      setRecipientsPreview(response.data.data);
    } catch (error: any) {
      console.error('Error previewing recipients:', error);
      toast.error(error.response?.data?.message || 'Failed to preview recipients');
    } finally {
      setPreviewLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      message_type: 'announcement' as 'announcement' | 'notification' | 'alert' | 'reminder' | 'newsletter',
      priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
      target_audience: 'all_users' as 'all_users' | 'players' | 'coaches' | 'clubs' | 'partners' | 'states' | 'players_coaches' | 'business_users' | 'specific_users' | 'by_location' | 'by_membership',
      target_filters: {},
      scheduled_send_at: '',
      expires_at: '',
      is_pinned: false,
      send_via_email: false,
      send_via_notification: true,
      action_button_text: '',
      action_button_url: '',
      attachments: [],
      tags: []
    });
    setRecipientsPreview(null);
  };

  const filteredMessages = messages.filter(message => {
    const matchesStatus = filters.status === 'all' || message.status === filters.status;
    const matchesType = filters.message_type === 'all' || message.message_type === filters.message_type;
    const matchesAudience = filters.target_audience === 'all' || message.target_audience === filters.target_audience;
    const matchesPriority = filters.priority === 'all' || message.priority === filters.priority;
    const matchesSearch = !filters.search || 
      message.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      message.content.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesType && matchesAudience && matchesPriority && matchesSearch;
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
      case 'sent': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderMessagesTab = () => (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Admin Messages</h2>
          <p className="text-gray-600">Create and manage broadcast messages</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
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
              onChange={(e) => {
                setFilters(prev => ({ ...prev, status: e.target.value }));
                fetchMessages();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="sending">Sending</option>
              <option value="sent">Sent</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={filters.message_type}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, message_type: e.target.value }));
                fetchMessages();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="announcement">Announcement</option>
              <option value="notification">Notification</option>
              <option value="alert">Alert</option>
              <option value="reminder">Reminder</option>
              <option value="newsletter">Newsletter</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
            <select
              value={filters.target_audience}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, target_audience: e.target.value }));
                fetchMessages();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Audiences</option>
              <option value="all_users">All Users</option>
              <option value="players">Players</option>
              <option value="coaches">Coaches</option>
              <option value="clubs">Clubs</option>
              <option value="partners">Partners</option>
              <option value="states">States</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, priority: e.target.value }));
                fetchMessages();
              }}
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

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {message.is_pinned && <Pin className="h-4 w-4 text-yellow-500" />}
                  <h3 className="text-lg font-semibold text-gray-900">{message.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(message.priority)}`}>
                    {message.priority}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(message.status)}`}>
                    {message.status}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                    {message.message_type}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{message.excerpt || message.content.substring(0, 150)}...</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Target: {message.target_audience.replace(/_/g, ' ')}</span>
                  <span>Author: {message.sender_name}</span>
                  {message.sent_at && (
                    <span>Sent: {new Date(message.sent_at).toLocaleDateString()}</span>
                  )}
                  {message.scheduled_send_at && !message.sent_at && (
                    <span>Scheduled: {new Date(message.scheduled_send_at).toLocaleDateString()}</span>
                  )}
                </div>

                <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{message.total_recipients} recipients</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Send className="h-4 w-4" />
                    <span>{message.sent_count} sent</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{message.read_count} read</span>
                  </div>
                  {message.click_count > 0 && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{message.click_count} clicks</span>
                    </div>
                  )}
                  {message.send_via_notification && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </div>
                  )}
                  {message.send_via_email && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <MessageSquare className="h-4 w-4" />
                      <span>Email</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 ml-4">
                {(message.status === 'draft' || message.status === 'scheduled') && (
                  <button
                    onClick={() => handleSendMessage(message.id, true)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send Now
                  </button>
                )}
                
                {message.status === 'sent' && (
                  <button
                    onClick={() => {
                      // TODO: Open analytics modal or navigate to analytics
                      toast.info('Analytics view coming soon');
                    }}
                    className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analytics
                  </button>
                )}
                
                {(message.status === 'draft' || message.status === 'scheduled') && (
                  <button
                    onClick={() => {
                      setEditingAnnouncement(message);
                      setFormData({ ...formData, ...message });
                      setShowCreateModal(true);
                    }}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                )}
                
                {(message.status === 'draft' || message.status === 'scheduled') && (
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
          <p className="text-gray-600">Create your first admin message to get started.</p>
        </div>
      )}
    </div>
  );

  const [templates, setTemplates] = useState<any[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const response = await axiosInstance.get('/admin/messages/templates');
      setTemplates(response.data.data.templates || []);
    } catch (error: any) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to fetch templates');
    } finally {
      setLoadingTemplates(false);
    }
  };

  const useTemplate = (template: any) => {
    setFormData({
      title: template.title,
      content: template.content,
      excerpt: '',
      message_type: template.message_type,
      priority: template.priority,
      target_audience: template.target_audience,
      target_filters: {},
      scheduled_send_at: '',
      expires_at: '',
      is_pinned: false,
      send_via_email: false,
      send_via_notification: true,
      action_button_text: template.action_button_text || '',
      action_button_url: '',
      attachments: [],
      tags: template.tags || []
    });
    setShowCreateModal(true);
  };

  const renderTemplatesTab = () => {
    if (templates.length === 0) {
      fetchTemplates();
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Message Templates</h2>
          <p className="text-gray-600">Pre-built templates for common message scenarios</p>
        </div>

        {loadingTemplates ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading templates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-3">{template.content.substring(0, 120)}...</p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(template.priority)}`}>
                      {template.priority}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                      {template.message_type}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Target: {template.target_audience.replace(/_/g, ' ')}</div>
                  {template.tags && template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag: string, index: number) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => useTemplate(template)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Use Template
                </button>
              </div>
            ))}
          </div>
        )}

        {templates.length === 0 && !loadingTemplates && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates available</h3>
            <p className="text-gray-600">Templates will help you create common message types quickly.</p>
          </div>
        )}
      </div>
    );
  };

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
              onClick={() => setActiveTab('messages')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="h-4 w-4 mr-2 inline" />
              Messages
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Edit className="h-4 w-4 mr-2 inline" />
              Templates
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
        {activeTab === 'messages' && renderMessagesTab()}
        {activeTab === 'templates' && renderTemplatesTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}

        {/* Create/Edit Message Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingAnnouncement ? 'Edit Message' : 'Create New Message'}
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
                      placeholder="Message title..."
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                    <select
                      value={formData.message_type}
                      onChange={(e) => setFormData(prev => ({ ...prev, message_type: e.target.value as 'announcement' | 'notification' | 'alert' | 'reminder' | 'newsletter' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="announcement">Announcement</option>
                      <option value="notification">Notification</option>
                      <option value="alert">Alert</option>
                      <option value="reminder">Reminder</option>
                      <option value="newsletter">Newsletter</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' | 'urgent' }))}
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
                    placeholder="Message content..."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Targeting and Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select
                      value={formData.target_audience}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, target_audience: e.target.value as any }));
                        setRecipientsPreview(null);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all_users">All Users</option>
                      <option value="players">Players</option>
                      <option value="coaches">Coaches</option>
                      <option value="clubs">Clubs</option>
                      <option value="partners">Partners</option>
                      <option value="states">States</option>
                      <option value="players_coaches">Players & Coaches</option>
                      <option value="business_users">Business Users</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Send (Optional)</label>
                    <input
                      type="datetime-local"
                      value={formData.scheduled_send_at}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduled_send_at: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expires At (Optional)</label>
                    <input
                      type="datetime-local"
                      value={formData.expires_at}
                      onChange={(e) => setFormData(prev => ({ ...prev, expires_at: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Action Button Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Action Button Text (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., Register Now, Learn More"
                      value={formData.action_button_text}
                      onChange={(e) => setFormData(prev => ({ ...prev, action_button_text: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Action Button URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/action"
                      value={formData.action_button_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, action_button_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Delivery Settings */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="send_via_notification"
                        checked={formData.send_via_notification}
                        onChange={(e) => setFormData(prev => ({ ...prev, send_via_notification: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="send_via_notification" className="ml-2 text-sm font-medium text-gray-700">
                        Send as in-app notification
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="send_via_email"
                        checked={formData.send_via_email}
                        onChange={(e) => setFormData(prev => ({ ...prev, send_via_email: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="send_via_email" className="ml-2 text-sm font-medium text-gray-700">
                        Send via email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_pinned"
                        checked={formData.is_pinned}
                        onChange={(e) => setFormData(prev => ({ ...prev, is_pinned: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="is_pinned" className="ml-2 text-sm font-medium text-gray-700">
                        Pin message
                      </label>
                    </div>
                  </div>
                  
                  {/* Recipients Preview */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={handlePreviewRecipients}
                      disabled={previewLoading}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {previewLoading ? 'Loading...' : 'Preview Recipients'}
                    </button>
                    
                    {recipientsPreview && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{recipientsPreview.total_recipients}</span> recipients will receive this message
                      </div>
                    )}
                  </div>
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
                    onClick={editingAnnouncement ? handleUpdateMessage : handleCreateMessage}
                    disabled={!formData.title || !formData.content}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingAnnouncement ? 'Update' : 'Create'} Message
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