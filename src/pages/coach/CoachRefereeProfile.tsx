import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import RefereeDashboard from '../../components/RefereeDashboard';
import {
  User,
  Award,
  Calendar,
  Trophy,
  Target,
  BarChart3,
  Settings,
  Bell
} from 'lucide-react';

const CoachRefereeProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'certifications' | 'availability' | 'settings'>('dashboard');

  if (!user || user.user_type !== 'coach') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">This page is only available for coaches.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.full_name}</h1>
              <p className="text-gray-600">Certified Pickleball Coach & Referee</p>
              <p className="text-sm text-gray-500">{user.state}, {user.city}</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2 inline" />
              Referee Dashboard
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'certifications'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Award className="h-4 w-4 mr-2 inline" />
              Certifications
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'availability'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2 inline" />
              Availability
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-4 w-4 mr-2 inline" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <RefereeDashboard />}
        
        {activeTab === 'certifications' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Certifications & Training
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900">Referee Certification Requirements</h3>
                <p className="text-sm text-gray-600 mt-1">
                  To serve as a referee in federation tournaments, coaches must complete the required certification process.
                </p>
                <div className="mt-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                    View Certification Requirements
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <div>
                      <h4 className="font-medium">Level 1 Referee</h4>
                      <p className="text-sm text-gray-500">Basic referee certification</p>
                    </div>
                  </div>
                  <div className="text-sm text-green-600">✓ Completed</div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Trophy className="h-6 w-6 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-500">Level 2 Referee</h4>
                      <p className="text-sm text-gray-500">Advanced referee certification</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Available for enrollment</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'availability' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Referee Availability
            </h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Set Your Availability</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Tournament organizers will be able to see your availability when assigning referees.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Tournament Types
                    </label>
                    <div className="space-y-2">
                      {['Local', 'State', 'National', 'International'].map(type => (
                        <label key={type} className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked={type !== 'International'} />
                          <span className="text-sm">{type} Tournaments</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Distance
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Within city</option>
                      <option>Within state</option>
                      <option>Within 100 miles</option>
                      <option>Within 200 miles</option>
                      <option>Nationwide</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Update Availability
                  </button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Email notifications for referee assignments</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">SMS notifications for urgent assignments</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Weekly summary of upcoming assignments</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Referee Settings
            </h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referee Experience Level
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Beginner (0-5 tournaments)</option>
                      <option>Intermediate (6-20 tournaments)</option>
                      <option>Experienced (21+ tournaments)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Compensation Rate
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input 
                        type="number" 
                        placeholder="0.00"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 text-sm">per match</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input 
                      type="text" 
                      placeholder="Name and phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Notes for Organizers
                    </label>
                    <textarea 
                      rows={3}
                      placeholder="Any special considerations or requirements..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachRefereeProfile;