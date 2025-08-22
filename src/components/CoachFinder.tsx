import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useErrorHandler } from '../hooks/useErrorHandler';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Users,
  Clock,
  DollarSign,
  Award,
  MessageSquare,
  Phone,
  Mail,
  Languages,
  Calendar,
  Target,
  TrendingUp,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../lib/api';

interface Coach {
  id: string;
  username: string;
  full_name: string;
  profile_photo?: string;
  bio?: string;
  state: string;
  city: string;
  skill_level: string;
  coaching_experience: number;
  specializations: string[];
  hourly_rate: number;
  coaching_languages: string[];
  coaching_bio?: string;
  certifications: string[];
  rating: number;
  reviews_count: number;
  total_students: number;
  active_students: number;
  lesson_types_offered: string[];
  coaching_schedule?: any;
  experience_level: string;
  availability_status: string;
  match_score: number;
}

interface SearchFilters {
  location?: string;
  radius?: number;
  skillLevel?: string;
  experienceLevel?: string;
  maxRate?: number;
  language?: string;
  specialization?: string;
  lessonType?: string;
}

const CoachFinder: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { handleError } = useErrorHandler();
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedCoaches, setSavedCoaches] = useState<string[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const [filters, setFilters] = useState<SearchFilters>({
    radius: 50,
    language: 'English',
    experienceLevel: 'any'
  });

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    searchCoaches();
    loadSavedCoaches();
  }, [filters]);

  const searchCoaches = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...filters,
        limit: '12',
        offset: ((page - 1) * 12).toString()
      } as any);

      const response = await api.get(`/coaches/search?${params}`);
      
      if (response.data.success) {
        setCoaches(response.data.data.coaches);
        setPagination({
          page: response.data.data.page,
          totalPages: response.data.data.totalPages,
          total: response.data.data.total
        });
      }
    } catch (error) {
      handleError(error, 'Coach Search', 'Failed to search coaches');
    } finally {
      setLoading(false);
    }
  };

  const loadSavedCoaches = () => {
    const saved = localStorage.getItem(`saved_coaches_${user?.id}`);
    if (saved) {
      setSavedCoaches(JSON.parse(saved));
    }
  };

  const toggleSaveCoach = (coachId: string) => {
    const newSaved = savedCoaches.includes(coachId)
      ? savedCoaches.filter(id => id !== coachId)
      : [...savedCoaches, coachId];
    
    setSavedCoaches(newSaved);
    localStorage.setItem(`saved_coaches_${user?.id}`, JSON.stringify(newSaved));
    
    toast.success(
      savedCoaches.includes(coachId) 
        ? 'Coach removed from saved list' 
        : 'Coach saved to your list'
    );
  };

  const handleContactCoach = async (coach: Coach, message: string, contactMethod: string) => {
    try {
      const response = await api.post(`/coaches/${coach.id}/contact`, {
        message,
        contact_method: contactMethod
      });

      if (response.data.success) {
        toast.success('Contact request sent successfully!');
        setShowContactModal(false);
        setSelectedCoach(null);
      }
    } catch (error) {
      toast.error('Failed to send contact request');
      console.error('Error contacting coach:', error);
    }
  };

  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case 'professional': return 'bg-purple-100 text-purple-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'limited': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Coach</h1>
          <p className="text-gray-600">
            Discover qualified pickleball coaches in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, specialization, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Search Button */}
            <button
              onClick={() => searchCoaches()}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={filters.experienceLevel}
                    onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="any">Any Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Hourly Rate
                  </label>
                  <input
                    type="number"
                    placeholder="$50"
                    value={filters.maxRate || ''}
                    onChange={(e) => setFilters({ ...filters, maxRate: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="any">Any Language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Radius (km)
                  </label>
                  <input
                    type="number"
                    value={filters.radius}
                    onChange={(e) => setFilters({ ...filters, radius: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {pagination.total} coaches found
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : coaches.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No coaches found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((coach) => (
                <div key={coach.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  {/* Coach Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          {coach.profile_photo ? (
                            <img 
                              src={coach.profile_photo} 
                              alt={coach.full_name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <Users className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{coach.full_name}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {coach.city}, {coach.state}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSaveCoach(coach.id)}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      >
                        {savedCoaches.includes(coach.id) ? (
                          <BookmarkCheck className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {/* Coach Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{coach.rating?.toFixed(1) || 'N/A'}</span>
                        </div>
                        <p className="text-xs text-gray-600">{coach.reviews_count} reviews</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="font-semibold">${coach.hourly_rate}</span>
                        </div>
                        <p className="text-xs text-gray-600">per hour</p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceBadgeColor(coach.experience_level)}`}>
                        {coach.experience_level}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(coach.availability_status)}`}>
                        {coach.availability_status}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Level {coach.skill_level}
                      </span>
                    </div>

                    {/* Specializations */}
                    {coach.specializations && coach.specializations.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {coach.specializations.slice(0, 3).map((spec, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                              {spec}
                            </span>
                          ))}
                          {coach.specializations.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                              +{coach.specializations.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Bio */}
                    {coach.coaching_bio && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {coach.coaching_bio}
                      </p>
                    )}

                    {/* Languages */}
                    {coach.coaching_languages && coach.coaching_languages.length > 0 && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Languages className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {coach.coaching_languages.join(', ')}
                        </span>
                      </div>
                    )}

                    {/* Experience */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>{coach.coaching_experience} years exp.</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{coach.total_students} students</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCoach(coach);
                          setShowContactModal(true);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Contact</span>
                      </button>
                      <button
                        onClick={() => window.open(`/coaches/${coach.id}/profile`, '_blank')}
                        className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => searchCoaches(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => searchCoaches(pageNum)}
                    className={`px-3 py-2 border rounded-md ${
                      pagination.page === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => searchCoaches(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Contact Modal */}
        {showContactModal && selectedCoach && (
          <ContactCoachModal
            coach={selectedCoach}
            onClose={() => {
              setShowContactModal(false);
              setSelectedCoach(null);
            }}
            onSubmit={handleContactCoach}
          />
        )}
      </div>
    </div>
  );
};

// Contact Coach Modal Component
interface ContactCoachModalProps {
  coach: Coach;
  onClose: () => void;
  onSubmit: (coach: Coach, message: string, contactMethod: string) => void;
}

const ContactCoachModal: React.FC<ContactCoachModalProps> = ({ coach, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    onSubmit(coach, message, contactMethod);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Contact {coach.full_name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Method
            </label>
            <select
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I'm interested in coaching lessons..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoachFinder;