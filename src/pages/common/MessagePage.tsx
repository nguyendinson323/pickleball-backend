import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  recipient: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'general' | 'tournament' | 'club' | 'coaching' | 'support';
}

const MessagePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [selectedTab, setSelectedTab] = useState<'inbox' | 'sent' | 'drafts' | 'archived'>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showCompose, setShowCompose] = useState(false);
  const [composeData, setComposeData] = useState({
    recipient: '',
    subject: '',
    content: ''
  });

  // Mock messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@pickleball.com',
        role: 'player'
      },
      recipient: {
        id: user?.id || '1',
        name: user?.full_name || 'Current User',
        email: user?.email || 'user@example.com',
        role: user?.user_type || 'player'
      },
      subject: 'Tournament Registration Confirmation',
      content: 'Hi! I wanted to confirm that you\'ve been successfully registered for the Spring Championship tournament. The event will be held on May 15th at Central Courts. Please arrive 30 minutes before your scheduled match time.',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      isStarred: true,
      isArchived: false,
      priority: 'high',
      category: 'tournament'
    },
    {
      id: '2',
      sender: {
        id: '3',
        name: 'Mike Chen',
        email: 'mike.chen@pickleball.com',
        role: 'coach'
      },
      recipient: {
        id: user?.id || '1',
        name: user?.full_name || 'Current User',
        email: user?.email || 'user@example.com',
        role: user?.user_type || 'player'
      },
      subject: 'Coaching Session Request',
      content: 'I noticed you\'ve been working on your backhand technique. I have an opening this Saturday at 2 PM for a private session. Would you be interested in working on some advanced strategies?',
      timestamp: '2024-01-14T16:45:00Z',
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: 'medium',
      category: 'coaching'
    },
    {
      id: '3',
      sender: {
        id: '4',
        name: 'Central Pickleball Club',
        email: 'info@centralclub.com',
        role: 'club'
      },
      recipient: {
        id: user?.id || '1',
        name: user?.full_name || 'Current User',
        email: user?.email || 'user@example.com',
        role: user?.user_type || 'player'
      },
      subject: 'New Court Availability',
      content: 'Great news! We\'ve added two new indoor courts to our facility. They\'ll be available for booking starting next week. As a premium member, you get priority access to these courts.',
      timestamp: '2024-01-13T09:15:00Z',
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: 'low',
      category: 'club'
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSendMessage = () => {
    if (!composeData.recipient || !composeData.subject || !composeData.content) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: {
        id: user?.id || '1',
        name: user?.full_name || 'Current User',
        email: user?.email || 'user@example.com',
        role: user?.user_type || 'player'
      },
      recipient: {
        id: 'recipient-id',
        name: composeData.recipient,
        email: 'recipient@example.com',
        role: 'player'
      },
      subject: composeData.subject,
      content: composeData.content,
      timestamp: new Date().toISOString(),
      isRead: false,
      isStarred: false,
      isArchived: false,
      priority: 'medium',
      category: 'general'
    };
    
    setMessages(prev => [newMessage, ...prev]);
    setComposeData({ recipient: '', subject: '', content: '' });
    setShowCompose(false);
  };

  const handleMessageAction = (messageId: string, action: 'star' | 'archive' | 'delete') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        switch (action) {
          case 'star':
            return { ...msg, isStarred: !msg.isStarred };
          case 'archive':
            return { ...msg, isArchived: !msg.isArchived };
          case 'delete':
            return { ...msg, isArchived: true };
          default:
            return msg;
        }
      }
      return msg;
    }));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tournament': return 'bg-blue-100 text-blue-800';
      case 'coaching': return 'bg-purple-100 text-purple-800';
      case 'club': return 'bg-green-100 text-green-800';
      case 'support': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-on-scroll">Messages</h1>
              <p className="text-gray-600 animate-on-scroll">Stay connected with your pickleball community</p>
            </div>
            <button onClick={() => setShowCompose(true)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Compose</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Navigation Tabs */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm animate-on-scroll">
              <div className="p-0">
                <div className="flex flex-col">
                  <button
                    onClick={() => setSelectedTab('inbox')}
                    className={`flex items-center space-x-3 p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedTab === 'inbox' ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <div>
                      <div className="font-medium">Inbox</div>
                      <div className="text-sm text-gray-500">
                        {messages.filter(m => !m.isRead).length} unread
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedTab('sent')}
                    className={`flex items-center space-x-3 p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedTab === 'sent' ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <div>
                      <div className="font-medium">Sent</div>
                      <div className="text-sm text-gray-500">Messages sent</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedTab('drafts')}
                    className={`flex items-center space-x-3 p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedTab === 'drafts' ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-medium">Drafts</div>
                      <div className="text-sm text-gray-500">0 saved</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedTab('archived')}
                    className={`flex items-center space-x-3 p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedTab === 'archived' ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <div>
                      <div className="font-medium">Archived</div>
                      <div className="text-sm text-gray-500">
                        {messages.filter(m => m.isArchived).length} messages
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm animate-on-scroll">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="general">General</option>
                    <option value="tournament">Tournament</option>
                    <option value="club">Club</option>
                    <option value="coaching">Coaching</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Message List */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm animate-on-scroll">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <div className="divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !message.isRead ? 'bg-blue-50' : ''
                      } ${selectedMessage?.id === message.id ? 'bg-blue-100' : ''}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold">
                          {message.sender.avatar ? (
                            <img src={message.sender.avatar} alt={message.sender.name} className="h-10 w-10 rounded-full" />
                          ) : (
                            message.sender.name.charAt(0)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                {message.sender.name}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                                {message.sender.role}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                                {message.priority}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(message.category)}`}>
                                {message.category}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-500">
                                {formatTimestamp(message.timestamp)}
                              </span>
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMessageAction(message.id, 'star');
                                  }}
                                  className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                                    message.isStarred ? 'text-yellow-500' : 'text-gray-400'
                                  }`}
                                >
                                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMessageAction(message.id, 'archive');
                                  }}
                                  className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-400"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className={`font-medium mt-1 ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.subject}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 truncate">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Message Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Compose Message</h3>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                onClick={() => setShowCompose(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  placeholder="Recipient name or email"
                  value={composeData.recipient}
                  onChange={(e) => setComposeData(prev => ({ ...prev, recipient: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  placeholder="Message subject"
                  value={composeData.subject}
                  onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Type your message here..."
                  value={composeData.content}
                  onChange={(e) => setComposeData(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                onClick={() => setShowCompose(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={!composeData.recipient || !composeData.subject || !composeData.content}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage; 