import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter,
  MoreVertical,
  Reply,
  Forward,
  Trash2,
  Archive,
  Star,
  Mail,
  Inbox,
  Send as SendIcon
} from 'lucide-react';
import { useAnimation } from '../../hooks/useAnimation';

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
  const { elementRef: headerRef } = useAnimation();
  
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
      <div className="bg-white border-b border-gray-200" ref={headerRef}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
              <p className="text-gray-600">Stay connected with your pickleball community</p>
            </div>
            <Button onClick={() => setShowCompose(true)} className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Compose</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Navigation Tabs */}
            <Card>
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <button
                    onClick={() => setSelectedTab('inbox')}
                    className={`flex items-center space-x-3 p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedTab === 'inbox' ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <Inbox className="h-5 w-5 text-gray-500" />
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
                    <SendIcon className="h-5 w-5 text-gray-500" />
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
                    <Mail className="h-5 w-5 text-gray-500" />
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
                    <Archive className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Archived</div>
                      <div className="text-sm text-gray-500">
                        {messages.filter(m => m.isArchived).length} messages
                      </div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </div>

          {/* Message List */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Messages</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
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
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {message.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                {message.sender.name}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {message.sender.role}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                                {message.priority}
                              </Badge>
                              <Badge className={`text-xs ${getCategoryColor(message.category)}`}>
                                {message.category}
                              </Badge>
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
                                  <Star className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMessageAction(message.id, 'archive');
                                  }}
                                  className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-400"
                                >
                                  <Archive className="h-4 w-4" />
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Compose Message Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Compose Message</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCompose(false)}
              >
                ×
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <Input
                  placeholder="Recipient name or email"
                  value={composeData.recipient}
                  onChange={(e) => setComposeData(prev => ({ ...prev, recipient: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  placeholder="Message subject"
                  value={composeData.subject}
                  onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  placeholder="Type your message here..."
                  value={composeData.content}
                  onChange={(e) => setComposeData(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCompose(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!composeData.recipient || !composeData.subject || !composeData.content}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage; 