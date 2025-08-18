import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  Globe, 
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  Users,
  MessageCircle
} from 'lucide-react';

const Announcements = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<number | null>(null);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'State Championship Registration Open',
      content: 'Registration for the 2024 California State Pickleball Championship is now open! This year\'s tournament will be held in Sacramento from June 15-17. All skill levels welcome.',
      priority: 'High',
      category: 'Tournament',
      status: 'Published',
      publishDate: '2024-03-25',
      expiryDate: '2024-06-15',
      author: 'Tournament Director',
      targetAudience: 'All Members',
      views: 156,
      isPinned: true
    },
    {
      id: 2,
      title: 'New Safety Guidelines for Clubs',
      content: 'Updated safety guidelines have been implemented for all affiliated clubs. Please review the new protocols and ensure compliance by April 1st.',
      priority: 'Medium',
      category: 'Safety',
      status: 'Published',
      publishDate: '2024-03-22',
      expiryDate: '2024-04-01',
      author: 'Safety Committee',
      targetAudience: 'Club Managers',
      views: 89,
      isPinned: false
    },
    {
      id: 3,
      title: 'Coach Certification Program',
      content: 'Applications are now being accepted for the Spring 2024 Coach Certification Program. This intensive 8-week program will prepare you for professional coaching.',
      priority: 'Medium',
      category: 'Training',
      status: 'Draft',
      publishDate: '2024-03-20',
      expiryDate: '2024-05-15',
      author: 'Training Director',
      targetAudience: 'Coaches',
      views: 67,
      isPinned: false
    },
    {
      id: 4,
      title: 'Equipment Standards Update',
      content: 'New equipment standards have been approved by the federation board. All tournaments will require compliance with these standards effective immediately.',
      priority: 'High',
      category: 'Equipment',
      status: 'Published',
      publishDate: '2024-03-18',
      expiryDate: '2024-04-01',
      author: 'Equipment Committee',
      targetAudience: 'All Members',
      views: 134,
      isPinned: true
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'Medium',
    category: 'General',
    targetAudience: 'All Members',
    expiryDate: ''
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Tournament': return <Calendar className="h-4 w-4" />;
      case 'Safety': return <AlertTriangle className="h-4 w-4" />;
      case 'Training': return <Users className="h-4 w-4" />;
      case 'Equipment': return <Star className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesPriority = filterPriority === 'all' || announcement.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || announcement.category === filterCategory;
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesCategory && matchesSearch;
  });

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement = {
        id: Date.now(),
        ...newAnnouncement,
        status: 'Draft',
        publishDate: new Date().toISOString().split('T')[0],
        author: user?.full_name || 'Unknown',
        views: 0,
        isPinned: false
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({
        title: '',
        content: '',
        priority: 'Medium',
        category: 'General',
        targetAudience: 'All Members',
        expiryDate: ''
      });
      setIsAddingAnnouncement(false);
    }
  };

  const handleEditAnnouncement = (id: number) => {
    const announcement = announcements.find(a => a.id === id);
    if (announcement) {
      setNewAnnouncement({
        title: announcement.title,
        content: announcement.content,
        priority: announcement.priority,
        category: announcement.category,
        targetAudience: announcement.targetAudience,
        expiryDate: announcement.expiryDate
      });
      setEditingAnnouncement(id);
      setIsAddingAnnouncement(true);
    }
  };

  const handleUpdateAnnouncement = () => {
    if (editingAnnouncement && newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements(announcements.map(a => 
        a.id === editingAnnouncement 
          ? { ...a, ...newAnnouncement }
          : a
      ));
      setNewAnnouncement({
        title: '',
        content: '',
        priority: 'Medium',
        category: 'General',
        targetAudience: 'All Members',
        expiryDate: ''
      });
      setEditingAnnouncement(null);
      setIsAddingAnnouncement(false);
    }
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const handleTogglePin = (id: number) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, isPinned: !a.isPinned } : a
    ));
  };

  const handlePublish = (id: number) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, status: 'Published' } : a
    ));
  };

  const handleArchive = (id: number) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, status: 'Archived' } : a
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Federation Announcements</h1>
            <p className="text-gray-600">Manage and publish announcements to your federation members</p>
          </div>
          <button
            onClick={() => setIsAddingAnnouncement(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Announcement</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-8 animate-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Tournament">Tournament</option>
                <option value="Safety">Safety</option>
                <option value="Training">Training</option>
                <option value="Equipment">Equipment</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterPriority('all');
                  setFilterCategory('all');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Announcement Form */}
        {isAddingAnnouncement && (
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-8 animate-on-scroll">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}
              </h3>
              <button
                onClick={() => {
                  setIsAddingAnnouncement(false);
                  setEditingAnnouncement(null);
                  setNewAnnouncement({
                    title: '',
                    content: '',
                    priority: 'Medium',
                    category: 'General',
                    targetAudience: 'All Members',
                    expiryDate: ''
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Announcement title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newAnnouncement.category}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="General">General</option>
                  <option value="Tournament">Tournament</option>
                  <option value="Safety">Safety</option>
                  <option value="Training">Training</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <select
                  value={newAnnouncement.targetAudience}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All Members">All Members</option>
                  <option value="Players">Players</option>
                  <option value="Coaches">Coaches</option>
                  <option value="Club Managers">Club Managers</option>
                  <option value="Tournament Directors">Tournament Directors</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  value={newAnnouncement.expiryDate}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Announcement content..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsAddingAnnouncement(false);
                  setEditingAnnouncement(null);
                  setNewAnnouncement({
                    title: '',
                    content: '',
                    priority: 'Medium',
                    category: 'General',
                    targetAudience: 'All Members',
                    expiryDate: ''
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={editingAnnouncement ? handleUpdateAnnouncement : handleAddAnnouncement}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                {editingAnnouncement ? 'Update' : 'Create'} Announcement
              </button>
            </div>
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {announcement.isPinned && <Star className="h-5 w-5 text-yellow-500" />}
                      <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(announcement.status)}`}>
                        {announcement.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        {getCategoryIcon(announcement.category)}
                        <span>{announcement.category}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{announcement.targetAudience}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Published: {announcement.publishDate}</span>
                      </div>
                      {announcement.expiryDate && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Expires: {announcement.expiryDate}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-4">{announcement.content}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>By {announcement.author}</span>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>{announcement.views} views</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => handleTogglePin(announcement.id)}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        announcement.isPinned 
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={announcement.isPinned ? 'Unpin' : 'Pin'}
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    
                    {announcement.status === 'Draft' && (
                      <button
                        onClick={() => handlePublish(announcement.id)}
                        className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                        title="Publish"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    
                    {announcement.status === 'Published' && (
                      <button
                        onClick={() => handleArchive(announcement.id)}
                        className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                        title="Archive"
                      >
                        <Clock className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleEditAnnouncement(announcement.id)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No announcements found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements; 