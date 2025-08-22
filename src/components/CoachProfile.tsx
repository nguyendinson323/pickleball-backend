import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  DollarSign,
  Award,
  Users,
  Languages,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Target,
  TrendingUp,
  BookOpen,
  Heart,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../lib/api';

interface CoachDetail {
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
  coaching_locations?: string[];
  website?: string;
  phone?: string;
  email?: string;
  experience_level: string;
  availability_status: string;
  response_rate: number;
  average_session_duration: string;
  next_available: string;
}

interface Review {
  id: string;
  student_name: string;
  rating: number;
  comment: string;
  date: string;
  lesson_type: string;
}

const CoachProfile: React.FC = () => {
  const { coachId } = useParams<{ coachId: string }>();
  const navigate = useNavigate();
  
  const [coach, setCoach] = useState<CoachDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'schedule'>('overview');

  useEffect(() => {
    if (coachId) {
      loadCoachProfile();
    }
  }, [coachId]);

  const loadCoachProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/coaches/${coachId}/profile`) as any;
      
      if (response.success) {
        setCoach(response.data.coach);
        
        // Mock reviews for demonstration
        setReviews([
          {
            id: '1',
            student_name: 'Sarah Johnson',
            rating: 5,
            comment: 'Excellent coach! Really helped improve my serve technique.',
            date: '2024-01-15',
            lesson_type: 'Individual'
          },
          {
            id: '2',
            student_name: 'Mike Chen',
            rating: 4,
            comment: 'Great experience, very patient and knowledgeable.',
            date: '2024-01-10',
            lesson_type: 'Group'
          }
        ]);
      }
    } catch (error) {
      toast.error('Failed to load coach profile');
      console.error('Error loading coach profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async (message: string, contactMethod: string) => {
    try {
      const response = await api.post(`/coaches/${coachId}/contact`, {
        message,
        contact_method: contactMethod
      }) as any;

      if (response.success) {
        toast.success('Contact request sent successfully!');
        setShowContactModal(false);
      }
    } catch (error) {
      toast.error('Failed to send contact request');
      console.error('Error contacting coach:', error);
    }
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${coach?.full_name} - Pickleball Coach`,
        text: `Check out ${coach?.full_name}'s coaching profile`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Profile link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!coach) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Target className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Coach not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Search</span>
            </button>
            <button
              onClick={shareProfile}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Coach Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="h-32 w-32 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                {coach.profile_photo ? (
                  <img 
                    src={coach.profile_photo} 
                    alt={coach.full_name}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <Users className="h-16 w-16 text-blue-600" />
                )}
              </div>
            </div>

            {/* Coach Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{coach.full_name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{coach.city}, {coach.state}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{coach.coaching_experience} years experience</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-semibold">{coach.rating?.toFixed(1) || 'N/A'}</span>
                      <span className="text-gray-600">({coach.reviews_count} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <span className="font-semibold">${coach.hourly_rate}/hour</span>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="mt-4 lg:mt-0">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-200 flex items-center space-x-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Contact Coach</span>
                  </button>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  coach.experience_level === 'professional' ? 'bg-purple-100 text-purple-800' :
                  coach.experience_level === 'advanced' ? 'bg-blue-100 text-blue-800' :
                  coach.experience_level === 'intermediate' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {coach.experience_level}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  coach.availability_status === 'available' ? 'bg-green-100 text-green-800' :
                  coach.availability_status === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {coach.availability_status}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Level {coach.skill_level}
                </span>
              </div>

              {/* Bio */}
              {coach.coaching_bio && (
                <p className="text-gray-700 leading-relaxed">{coach.coaching_bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-green-600">{coach.response_rate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{coach.total_students}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-purple-600">{coach.active_students}</p>
              </div>
              <Heart className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Available</p>
                <p className="text-sm font-bold text-orange-600">{coach.next_available}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'schedule', label: 'Schedule', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Specializations */}
                {coach.specializations && coach.specializations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {coach.specializations.map((spec, index) => (
                        <span key={index} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lesson Types */}
                {coach.lesson_types_offered && coach.lesson_types_offered.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Lesson Types Offered</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {coach.lesson_types_offered.map((type, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="capitalize">{type.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {coach.coaching_languages && coach.coaching_languages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Languages</h3>
                    <div className="flex items-center space-x-2">
                      <Languages className="h-5 w-5 text-gray-500" />
                      <span>{coach.coaching_languages.join(', ')}</span>
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {coach.certifications && coach.certifications.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                    <div className="space-y-2">
                      {coach.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    {coach.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{coach.email}</span>
                      </div>
                    )}
                    {coach.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{coach.phone}</span>
                      </div>
                    )}
                    {coach.website && (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a href={coach.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {coach.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Student Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">{coach.rating?.toFixed(1)}</span>
                    <span className="text-gray-600">({coach.reviews_count} reviews)</span>
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No reviews yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{review.student_name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.lesson_type} Lesson</span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Availability</h3>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Schedule integration coming soon</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Contact the coach directly to discuss availability
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Modal */}
        {showContactModal && (
          <ContactModal
            coachName={coach.full_name}
            onClose={() => setShowContactModal(false)}
            onSubmit={handleContact}
          />
        )}
      </div>
    </div>
  );
};

// Contact Modal Component
interface ContactModalProps {
  coachName: string;
  onClose: () => void;
  onSubmit: (message: string, contactMethod: string) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ coachName, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    onSubmit(message, contactMethod);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Contact {coachName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I'm interested in coaching lessons. I'm a beginner looking to improve my fundamentals..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoachProfile;