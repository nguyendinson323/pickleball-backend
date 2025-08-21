import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchPublicAnnouncements } from '../store/slices/announcementsSlice';
import {
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  Megaphone,
  Calendar,
  ExternalLink,
  Pin,
  Eye,
  TrendingUp
} from 'lucide-react';

interface AnnouncementBannerProps {
  maxAnnouncements?: number;
  showDismiss?: boolean;
  compact?: boolean;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  maxAnnouncements = 3,
  showDismiss = true,
  compact = false
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { publicAnnouncements, loading } = useSelector((state: RootState) => state.announcements);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<string[]>([]);
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<string | null>(null);

  useEffect(() => {
    // Load dismissed announcements from localStorage
    const dismissed = localStorage.getItem('dismissed_announcements');
    if (dismissed) {
      setDismissedAnnouncements(JSON.parse(dismissed));
    }

    // Fetch announcements
    if (user) {
      dispatch(fetchPublicAnnouncements({
        page: 1,
        limit: maxAnnouncements + 5 // Fetch extra in case some are dismissed
      }));
    }
  }, [dispatch, user, maxAnnouncements]);

  const handleDismiss = (announcementId: string) => {
    const newDismissed = [...dismissedAnnouncements, announcementId];
    setDismissedAnnouncements(newDismissed);
    localStorage.setItem('dismissed_announcements', JSON.stringify(newDismissed));
  };

  const handleToggleExpand = (announcementId: string) => {
    setExpandedAnnouncement(
      expandedAnnouncement === announcementId ? null : announcementId
    );
  };

  const getAnnouncementIcon = (category: string, priority: string) => {
    if (priority === 'urgent') return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (priority === 'high') return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    
    switch (category) {
      case 'emergency':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'tournament':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'safety':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAnnouncementStyle = (priority: string, displayStyle: string) => {
    const baseClasses = "border-l-4 rounded-lg shadow-sm mb-4";
    
    if (displayStyle === 'alert') {
      if (priority === 'urgent') return `${baseClasses} bg-red-50 border-red-400`;
      if (priority === 'high') return `${baseClasses} bg-orange-50 border-orange-400`;
      return `${baseClasses} bg-yellow-50 border-yellow-400`;
    }
    
    if (displayStyle === 'banner') {
      return `${baseClasses} bg-gradient-to-r from-blue-50 to-purple-50 border-blue-400`;
    }
    
    return `${baseClasses} bg-white border-blue-400`;
  };

  // Filter out dismissed announcements and limit display
  const visibleAnnouncements = publicAnnouncements
    .filter(announcement => !dismissedAnnouncements.includes(announcement.id))
    .slice(0, maxAnnouncements);

  if (loading || visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {visibleAnnouncements.map((announcement) => {
        const isExpanded = expandedAnnouncement === announcement.id;
        const shouldTruncate = !compact && announcement.content.length > 200;
        const displayContent = isExpanded || !shouldTruncate 
          ? announcement.content 
          : announcement.content.substring(0, 200) + '...';

        return (
          <div 
            key={announcement.id} 
            className={getAnnouncementStyle(announcement.priority, announcement.display_style)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getAnnouncementIcon(announcement.category, announcement.priority)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      {announcement.is_pinned && (
                        <Pin className="h-4 w-4 text-yellow-500" />
                      )}
                      <h3 className={`font-semibold ${compact ? 'text-sm' : 'text-lg'} text-gray-900`}>
                        {announcement.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        announcement.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {announcement.priority}
                      </span>
                    </div>

                    <div className={`text-gray-700 ${compact ? 'text-sm' : 'text-base'} mb-3`}>
                      {displayContent}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <span>Category: {announcement.category}</span>
                      <span>By: {announcement.author_name}</span>
                      {announcement.publish_date && (
                        <span>Published: {new Date(announcement.publish_date).toLocaleDateString()}</span>
                      )}
                      {announcement.expiry_date && (
                        <span>Expires: {new Date(announcement.expiry_date).toLocaleDateString()}</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      {!compact && shouldTruncate && (
                        <button
                          onClick={() => handleToggleExpand(announcement.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          {isExpanded ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                      
                      {announcement.action_button_text && announcement.action_button_url && (
                        <a
                          href={announcement.action_button_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          {announcement.action_button_text}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}

                      {/* Engagement Stats */}
                      {!compact && (
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{announcement.view_count}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{announcement.click_count}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dismiss Button */}
                {showDismiss && (
                  <button
                    onClick={() => handleDismiss(announcement.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 ml-4"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnnouncementBanner;