import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Students</h1>
            <p className="text-gray-600">Manage your student roster and track their progress</p>
          </div>
          <Button onClick={() => setIsAddingStudent(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </Button>
        </div>

        {/* Student Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{studentStats.total}</div>
              <p className="text-xs text-gray-600">enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{studentStats.active}</div>
              <p className="text-xs text-gray-600">currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beginners</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{studentStats.beginners}</div>
              <p className="text-xs text-gray-600">learning fundamentals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Advanced</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{studentStats.advanced}</div>
              <p className="text-xs text-gray-600">tournament level</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search Students</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="levelFilter">Skill Level</Label>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Elite">Elite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="statusFilter">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Student Form */}
        {isAddingStudent && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Student</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentName">Full Name</Label>
                  <Input
                    id="studentName"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="studentEmail">Email</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="studentPhone">Phone</Label>
                  <Input
                    id="studentPhone"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="studentLevel">Skill Level</Label>
                  <Select value={newStudent.skillLevel} onValueChange={(value) => setNewStudent({...newStudent, skillLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Elite">Elite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="studentGoals">Goals</Label>
                  <Textarea
                    id="studentGoals"
                    value={newStudent.goals}
                    onChange={(e) => setNewStudent({...newStudent, goals: e.target.value})}
                    placeholder="What does this student want to achieve?"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="studentNotes">Notes</Label>
                  <Textarea
                    id="studentNotes"
                    value={newStudent.notes}
                    onChange={(e) => setNewStudent({...newStudent, notes: e.target.value})}
                    placeholder="Any additional notes about the student..."
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <Button onClick={handleAddStudent}>Add Student</Button>
                <Button variant="outline" onClick={() => setIsAddingStudent(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Students List */}
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <Card key={student.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.photo} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                        <Badge className={getLevelColor(student.skillLevel)}>
                          {student.skillLevel}
                        </Badge>
                        <Badge className={getProgressColor(student.progress)}>
                          {student.progress}
                        </Badge>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingStudent(editingStudent === student.id ? null : student.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Goals and Notes */}
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Goals</Label>
                      <p className="text-gray-700 mt-1">{student.goals}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Notes</Label>
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
                        <Label>Status</Label>
                        <Select value={student.status} onValueChange={(value) => handleUpdateStudent(student.id, 'status', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Skill Level</Label>
                        <Select value={student.skillLevel} onValueChange={(value) => handleUpdateStudent(student.id, 'skillLevel', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Elite">Elite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Progress</Label>
                        <Select value={student.progress} onValueChange={(value) => handleUpdateStudent(student.id, 'progress', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Excellent">Excellent</SelectItem>
                            <SelectItem value="Outstanding">Outstanding</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label>Goals</Label>
                        <Textarea
                          value={student.goals}
                          onChange={(e) => handleUpdateStudent(student.id, 'goals', e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label>Notes</Label>
                        <Textarea
                          value={student.notes}
                          onChange={(e) => handleUpdateStudent(student.id, 'notes', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students; 