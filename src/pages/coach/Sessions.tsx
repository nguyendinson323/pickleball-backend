import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Sessions = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [editingSession, setEditingSession] = useState<number | null>(null);

  // Mock sessions data
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'Advanced Doubles Strategy',
      date: '2024-03-25',
      time: '10:00',
      duration: 90,
      type: 'Group',
      skillLevel: 'Advanced',
      maxStudents: 8,
      enrolledStudents: 6,
      status: 'Scheduled',
      location: 'Court 1 & 2',
      description: 'Focus on advanced doubles positioning, communication, and strategic shot selection.',
      focusAreas: ['Positioning', 'Communication', 'Shot Selection'],
      price: 45,
      notes: 'Bring your own paddles. Water provided.'
    },
    {
      id: 2,
      title: 'Beginner Fundamentals',
      date: '2024-03-26',
      time: '14:00',
      duration: 60,
      type: 'Group',
      skillLevel: 'Beginner',
      maxStudents: 6,
      enrolledStudents: 4,
      status: 'Scheduled',
      location: 'Court 3',
      description: 'Learn the basics: grip, stance, serve, and basic strokes.',
      focusAreas: ['Grip', 'Stance', 'Serve', 'Basic Strokes'],
      price: 35,
      notes: 'Equipment provided for beginners. Comfortable clothing recommended.'
    },
    {
      id: 3,
      title: 'Private Lesson - Sarah M.',
      date: '2024-03-24',
      time: '16:00',
      duration: 60,
      type: 'Private',
      skillLevel: 'Intermediate',
      maxStudents: 1,
      enrolledStudents: 1,
      status: 'Completed',
      location: 'Court 4',
      description: 'Individual coaching session focusing on serve consistency and return positioning.',
      focusAreas: ['Serve Consistency', 'Return Positioning'],
      price: 75,
      notes: 'Great progress on serve. Continue practicing return positioning drills.'
    },
    {
      id: 4,
      title: 'Tournament Preparation',
      date: '2024-03-28',
      time: '09:00',
      duration: 120,
      type: 'Group',
      skillLevel: 'Advanced',
      maxStudents: 6,
      enrolledStudents: 5,
      status: 'Scheduled',
      location: 'Court 1 & 2',
      description: 'Intensive session preparing for upcoming tournament. Match play and strategy review.',
      focusAreas: ['Match Play', 'Strategy', 'Mental Preparation'],
      price: 55,
      notes: 'Tournament players only. Bring tournament gear.'
    }
  ]);

  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    type: 'Group',
    skillLevel: 'Beginner',
    maxStudents: 6,
    location: '',
    description: '',
    focusAreas: [''],
    price: 35,
    notes: ''
  });

  const handleAddSession = () => {
    if (newSession.title && newSession.date && newSession.time) {
      const session = {
        id: sessions.length + 1,
        ...newSession,
        enrolledStudents: 0,
        status: 'Scheduled',
        focusAreas: newSession.focusAreas.filter(area => area.trim() !== '')
      };
      setSessions([...sessions, session]);
      setNewSession({
        title: '',
        date: '',
        time: '',
        duration: 60,
        type: 'Group',
        skillLevel: 'Beginner',
        maxStudents: 6,
        location: '',
        description: '',
        focusAreas: [''],
        price: 35,
        notes: ''
      });
      setIsAddingSession(false);
    }
  };

  const handleUpdateSession = (id: number, field: string, value: any) => {
    setSessions(sessions.map(session => 
      session.id === id ? { ...session, [field]: value } : session
    ));
  };

  const handleDeleteSession = (id: number) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  const addFocusArea = () => {
    setNewSession(prev => ({
      ...prev,
      focusAreas: [...prev.focusAreas, '']
    }));
  };

  const removeFocusArea = (index: number) => {
    setNewSession(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.filter((_, i) => i !== index)
    }));
  };

  const updateFocusArea = (index: number, value: string) => {
    setNewSession(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.map((area, i) => i === index ? value : area)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Group': return 'bg-purple-100 text-purple-800';
      case 'Private': return 'bg-green-100 text-green-800';
      case 'Semi-Private': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="animate-on-scroll text-3xl font-bold text-gray-900 mb-2">Coaching Sessions</h1>
            <p className="animate-on-scroll text-gray-600">Manage your coaching sessions and schedules</p>
          </div>
          <button
            onClick={() => setIsAddingSession(true)}
            className="animate-on-scroll inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Session
          </button>
        </div>

        {/* Add Session Form */}
        {isAddingSession && (
          <div className="animate-on-scroll mb-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="animate-on-scroll text-lg font-semibold text-gray-900">Add New Session</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Session Title</label>
                  <input
                    type="text"
                    value={newSession.title}
                    onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                    className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Advanced Doubles Strategy"
                  />
                </div>
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                    className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newSession.time}
                    onChange={(e) => setNewSession(prev => ({ ...prev, time: e.target.value }))}
                    className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    value={newSession.duration}
                    onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min="30"
                    step="15"
                  />
                </div>
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newSession.type}
                    onChange={(e) => setNewSession(prev => ({ ...prev, type: e.target.value }))}
                    className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Group">Group</option>
                    <option value="Private">Private</option>
                    <option value="Semi-Private">Semi-Private</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                  <select
                    value={newSession.skillLevel}
                    onChange={(e) => setNewSession(prev => ({ ...prev, skillLevel: e.target.value }))}
                    className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Max Students</label>
                  <input
                    type="number"
                    value={newSession.maxStudents}
                    onChange={(e) => setNewSession(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                    className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min="1"
                    max="20"
                  />
                </div>
                <div>
                  <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={newSession.price}
                    onChange={(e) => setNewSession(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                    className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min="0"
                    step="5"
                  />
                </div>
              </div>
              <div>
                <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newSession.location}
                  onChange={(e) => setNewSession(prev => ({ ...prev, location: e.target.value }))}
                  className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Court 1 & 2"
                />
              </div>
              <div>
                <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newSession.description}
                  onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                  className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Describe what students will learn in this session..."
                />
              </div>
              <div>
                <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Focus Areas</label>
                <div className="space-y-2">
                  {newSession.focusAreas.map((area, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => updateFocusArea(index, e.target.value)}
                        className="animate-on-scroll flex-1 px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., Positioning, Communication"
                      />
                      {newSession.focusAreas.length > 1 && (
                        <button
                          onClick={() => removeFocusArea(index)}
                          className="animate-on-scroll inline-flex items-center px-3 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addFocusArea}
                    className="animate-on-scroll inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Focus Area
                  </button>
                </div>
              </div>
              <div>
                <label className="animate-on-scroll block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={newSession.notes}
                  onChange={(e) => setNewSession(prev => ({ ...prev, notes: e.target.value }))}
                  className="animate-on-scroll block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Additional notes for students..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsAddingSession(false);
                    setNewSession({
                      title: '',
                      date: '',
                      time: '',
                      duration: 60,
                      type: 'Group',
                      skillLevel: 'Beginner',
                      maxStudents: 6,
                      location: '',
                      description: '',
                      focusAreas: [''],
                      price: 35,
                      notes: ''
                    });
                  }}
                  className="animate-on-scroll inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSession}
                  className="animate-on-scroll inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Session
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className="space-y-6">
          {sessions.map((session) => (
            <div key={session.id} className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
                    <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600">
                      <span className="animate-on-scroll flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {session.date}
                      </span>
                      <span className="animate-on-scroll flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {session.time} ({session.duration} min)
                      </span>
                      <span className="animate-on-scroll flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {session.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`animate-on-scroll inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                    <span className={`animate-on-scroll inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(session.type)}`}>
                      {session.type}
                    </span>
                    <span className={`animate-on-scroll inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(session.skillLevel)}`}>
                      {session.skillLevel}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="animate-on-scroll font-medium text-gray-900 mb-3">Session Details</h4>
                    <p className="animate-on-scroll text-sm text-gray-600 mb-4">{session.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="animate-on-scroll flex justify-between">
                        <span className="text-gray-500">Price:</span>
                        <span className="font-medium">${session.price}</span>
                      </div>
                      <div className="animate-on-scroll flex justify-between">
                        <span className="text-gray-500">Students:</span>
                        <span className="font-medium">{session.enrolledStudents}/{session.maxStudents}</span>
                      </div>
                      <div className="animate-on-scroll flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium">{session.duration} minutes</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="animate-on-scroll font-medium text-gray-900 mb-3">Focus Areas</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {session.focusAreas.map((area, index) => (
                        <span key={index} className="animate-on-scroll inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {area}
                        </span>
                      ))}
                    </div>
                    {session.notes && (
                      <div>
                        <h5 className="animate-on-scroll font-medium text-gray-900 mb-2">Notes</h5>
                        <p className="animate-on-scroll text-sm text-gray-600">{session.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="animate-on-scroll inline-flex items-center px-3 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sessions; 