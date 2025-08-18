import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  Users, 
  Search,
  Plus,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Star,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  MessageCircle
} from 'lucide-react';

const Students = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<number | null>(null);

  // Mock students data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Sarah M.',
      email: 'sarah.m@email.com',
      phone: '(555) 123-4567',
      skillLevel: 'Intermediate',
      status: 'Active',
      joinDate: '2023-01-15',
      lastSession: '2024-03-20',
      totalSessions: 45,
      progress: 'Excellent',
      goals: 'Tournament preparation, advanced techniques',
      notes: 'Very dedicated student, shows great potential for competitive play.',
      photo: null
    },
    {
      id: 2,
      name: 'Mike R.',
      email: 'mike.r@email.com',
      phone: '(555) 234-5678',
      skillLevel: 'Beginner',
      status: 'Active',
      joinDate: '2023-03-20',
      lastSession: '2024-03-18',
      totalSessions: 32,
      progress: 'Good',
      goals: 'Learn fundamentals, improve consistency',
      notes: 'Making steady progress, needs work on serve consistency.',
      photo: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      email: 'lisa.k@email.com',
      phone: '(555) 345-6789',
      skillLevel: 'Advanced',
      status: 'Active',
      joinDate: '2023-02-10',
      lastSession: '2024-03-15',
      totalSessions: 67,
      progress: 'Outstanding',
      goals: 'Elite tournament level, coaching certification',
      notes: 'Exceptional player, considering becoming a coach herself.',
      photo: null
    },
    {
      id: 4,
      name: 'John D.',
      email: 'john.d@email.com',
      phone: '(555) 456-7890',
      skillLevel: 'Intermediate',
      status: 'Inactive',
      joinDate: '2023-01-05',
      lastSession: '2024-02-15',
      totalSessions: 28,
      progress: 'Good',
      goals: 'Improve doubles strategy, tournament play',
      notes: 'Good player but inconsistent attendance recently.',
      photo: null
    }
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    skillLevel: 'Beginner',
    goals: '',
    notes: ''
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      const student = {
        id: students.length + 1,
        ...newStudent,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        lastSession: new Date().toISOString().split('T')[0],
        totalSessions: 1,
        progress: 'New',
        photo: null
      };
      setStudents([...students, student]);
      setNewStudent({
        name: '',
        email: '',
        phone: '',
        skillLevel: 'Beginner',
        goals: '',
        notes: ''
      });
      setIsAddingStudent(false);
    }
  };

  const handleUpdateStudent = (id: number, field: string, value: string) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, [field]: value } : student
    ));
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || student.skillLevel === filterLevel;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Elite': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case 'Outstanding': return 'bg-green-100 text-green-800';
      case 'Excellent': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Fair': return 'bg-orange-100 text-orange-800';
      case 'New': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const studentStats = {
    total: students.length,
    active: students.filter(s => s.status === 'Active').length,
    beginners: students.filter(s => s.skillLevel === 'Beginner').length,
    advanced: students.filter(s => s.skillLevel === 'Advanced').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Students</h1>
            <p className="text-gray-600">Manage your student roster and track their progress</p>
          </div>
          <button 
            onClick={() => setIsAddingStudent(true)} 
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </button>
        </div>

        {/* Student Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Students</h3>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold text-blue-600">{studentStats.total}</div>
              <p className="text-xs text-gray-600">enrolled students</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Active Students</h3>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold text-green-600">{studentStats.active}</div>
              <p className="text-xs text-gray-600">currently active</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Beginners</h3>
              <Target className="h-4 w-4 text-blue-500" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold text-blue-600">{studentStats.beginners}</div>
              <p className="text-xs text-gray-600">learning fundamentals</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Advanced</h3>
              <Award className="h-4 w-4 text-purple-500" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold text-purple-600">{studentStats.advanced}</div>
              <p className="text-xs text-gray-600">tournament level</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md mb-8 animate-on-scroll">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Students</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="levelFilter" className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                <select 
                  value={filterLevel} 
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Elite">Elite</option>
                </select>
              </div>
              <div>
                <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Student Form */}
        {isAddingStudent && (
          <div className="bg-white rounded-lg shadow-md mb-8 animate-on-scroll">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Add New Student</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    id="studentName"
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    id="studentEmail"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="studentPhone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    id="studentPhone"
                    type="tel"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="studentLevel" className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                  <select 
                    value={newStudent.skillLevel} 
                    onChange={(e) => setNewStudent({...newStudent, skillLevel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Elite">Elite</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="studentGoals" className="block text-sm font-medium text-gray-700 mb-2">Goals</label>
                  <textarea
                    id="studentGoals"
                    value={newStudent.goals}
                    onChange={(e) => setNewStudent({...newStudent, goals: e.target.value})}
                    placeholder="What does this student want to achieve?"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="studentNotes" className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    id="studentNotes"
                    value={newStudent.notes}
                    onChange={(e) => setNewStudent({...newStudent, notes: e.target.value})}
                    placeholder="Any additional notes about the student..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <button 
                  onClick={handleAddStudent}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg"
                >
                  Add Student
                </button>
                <button 
                  onClick={() => setIsAddingStudent(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Students List */}
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-lg">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(student.skillLevel)}`}>
                          {student.skillLevel}
                        </span>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getProgressColor(student.progress)}`}>
                          {student.progress}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Last Session</p>
                      <p className="font-medium">{student.lastSession}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Sessions</p>
                      <p className="font-medium">{student.totalSessions}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Joined</p>
                      <p className="font-medium">{student.joinDate}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingStudent(editingStudent === student.id ? null : student.id)}
                      className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Goals and Notes */}
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Goals</label>
                      <p className="text-gray-700 mt-1">{student.goals}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Notes</label>
                      <p className="text-gray-700 mt-1">{student.notes}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{student.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{student.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Joined: {student.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Mode */}
                {editingStudent === student.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Edit Student</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select 
                          value={student.status} 
                          onChange={(e) => handleUpdateStudent(student.id, 'status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                        <select 
                          value={student.skillLevel} 
                          onChange={(e) => handleUpdateStudent(student.id, 'skillLevel', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Elite">Elite</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Progress</label>
                        <select 
                          value={student.progress} 
                          onChange={(e) => handleUpdateStudent(student.id, 'progress', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="New">New</option>
                          <option value="Fair">Fair</option>
                          <option value="Good">Good</option>
                          <option value="Excellent">Excellent</option>
                          <option value="Outstanding">Outstanding</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goals</label>
                        <textarea
                          value={student.goals}
                          onChange={(e) => handleUpdateStudent(student.id, 'goals', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea
                          value={student.notes}
                          onChange={(e) => handleUpdateStudent(student.id, 'notes', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students; 