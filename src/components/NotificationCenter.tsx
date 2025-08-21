import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  fetchMessages, 
  markMessageAsRead, 
  markAllMessagesAsRead, 
  toggleStarMessage,
  archiveMessage,
  getUnreadCount 
} from '../store/slices/messagesSlice';
import { 
  Bell, 
  BellOff, 
  X, 
  Star, 
  Archive, 
  ExternalLink,
  MessageSquare,
  Megaphone,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, unreadCount } = useSelector((state: RootState) => state.messages);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'announcements'>('unread');
  const [showActions, setShowActions] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      // Fetch recent messages/notifications
      dispatch(fetchMessages({
        type: 'inbox',
        limit: 50,
        page: 1
      }));
      dispatch(getUnreadCount());
    }
  }, [isOpen, user, dispatch]);

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await dispatch(markMessageAsRead(messageId)).unwrap();
    } catch (error) {
      toast.error('Failed to mark message as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await dispatch(markAllMessagesAsRead()).unwrap();
      toast.success('All messages marked as read');
    } catch (error) {
      toast.error('Failed to mark all messages as read');
    }
  };

  const handleToggleStar = async (messageId: string, currentlyStarred: boolean) => {
    try {
      await dispatch(toggleStarMessage({ id: messageId, starred: !currentlyStarred })).unwrap();
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const handleArchive = async (messageId: string) => {
    try {
      await dispatch(archiveMessage(messageId)).unwrap();
      toast.success('Message archived');
    } catch (error) {
      toast.error('Failed to archive message');
    }
  };

  const getMessageIcon = (messageType: string, category: string, priority: string) => {
    if (messageType === 'announcement_notification') {
      return <Megaphone className="h-4 w-4 text-blue-500" />;
    }
    if (messageType === 'system_notification') {
      if (priority === 'urgent') return <AlertTriangle className="h-4 w-4 text-red-500" />;
      return <Bell className="h-4 w-4 text-orange-500" />;
    }
    if (category === 'tournament') {
      return <Calendar className="h-4 w-4 text-purple-500" />;
    }
    return <MessageSquare className="h-4 w-4 text-gray-500" />;
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'high':
        return 'border-l-4 border-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-4 border-blue-500 bg-blue-50';
      default:
        return 'border-l-4 border-gray-300 bg-white';
    }
  };

  const filteredMessages = messages.filter(message => {
    if (activeTab === 'unread') return !message.is_read;
    if (activeTab === 'announcements') return message.message_type === 'announcement_notification';
    return true;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-600 bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-6 w-6 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mt-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All ({messages.length})
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'unread'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setActiveTab('announcements')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'announcements'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Megaphone className="h-3 w-3 mr-1 inline" />
                Announcements
              </button>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="mt-3">
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <BellOff className="h-8 w-8 mb-2" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      !message.is_read ? 'bg-blue-50' : ''
                    } ${getPriorityStyle(message.priority)}`}
                    onClick={() => {
                      if (!message.is_read) {
                        handleMarkAsRead(message.id);
                      }
                      setShowActions(showActions === message.id ? null : message.id);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getMessageIcon(message.message_type, message.category, message.priority)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm font-medium ${
                            !message.is_read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {message.subject}
                          </p>
                          <div className="flex items-center space-x-1">
                            {message.is_starred && (
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            )}
                            {!message.is_read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {message.content}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{message.sender_name}</span>
                          <span>{formatTimestamp(message.created_at)}</span>
                        </div>

                        {/* Action Buttons */}
                        {showActions === message.id && (
                          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleStar(message.id, message.is_starred);
                              }}
                              className={`p-1 rounded hover:bg-gray-200 ${
                                message.is_starred ? 'text-yellow-500' : 'text-gray-400'
                              }`}
                              title={message.is_starred ? 'Remove star' : 'Add star'}
                            >
                              <Star className="h-4 w-4" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleArchive(message.id);
                              }}
                              className="p-1 rounded hover:bg-gray-200 text-gray-400"
                              title="Archive"
                            >
                              <Archive className="h-4 w-4" />
                            </button>

                            {message.action_button_url && (
                              <a
                                href={message.action_button_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {message.action_button_text || 'Open'}
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
            <button
              onClick={() => {
                onClose();
                // Navigate to full messages page
                window.location.href = '/messages';
              }}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;