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
import { 
  Calendar, 
  Clock,
  Plus,
  Edit3,
  Trash2,
  Users,
  MapPin,
  BookOpen,
  Target,
  CheckCircle,
  AlertTriangle,
  Star
} from 'lucide-react';

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
      case 'Elite': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sessionStats = {
    total: sessions.length,
    scheduled: sessions.filter(s => s.status === 'Scheduled').length,
    completed: sessions.filter(s => s.status === 'Completed').length,
    totalStudents: sessions.reduce((sum, s) => sum + s.enrolledStudents, 0)
  };

  const upcomingSessions = sessions.filter(s => s.status === 'Scheduled').sort((a, b) => 
    new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Training Sessions</h1>
            <p className="text-gray-600">Manage your training sessions and schedules</p>
          </div>
          <Button onClick={() => setIsAddingSession(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Session</span>
          </Button>
        </div>

        {/* Session Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{sessionStats.total}</div>
              <p className="text-xs text-gray-600">sessions created</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{sessionStats.scheduled}</div>
              <p className="text-xs text-gray-600">upcoming sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{sessionStats.completed}</div>
              <p className="text-xs text-gray-600">finished sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{sessionStats.totalStudents}</div>
              <p className="text-xs text-gray-600">enrolled students</p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Session Form */}
        {isAddingSession && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Training Session</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionTitle">Session Title</Label>
                  <Input
                    id="sessionTitle"
                    value={newSession.title}
                    onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                    placeholder="e.g., Advanced Doubles Strategy"
                  />
                </div>
                <div>
                  <Label htmlFor="sessionDate">Date</Label>
                  <Input
                    id="sessionDate"
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionTime">Time</Label>
                  <Input
                    id="sessionTime"
                    type="time"
                    value={newSession.time}
                    onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionDuration">Duration (minutes)</Label>
                  <Input
                    id="sessionDuration"
                    type="number"
                    value={newSession.duration}
                    onChange={(e) => setNewSession({...newSession, duration: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionType">Session Type</Label>
                  <Select value={newSession.type} onValueChange={(value) => setNewSession({...newSession, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Group">Group</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Semi-Private">Semi-Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sessionLevel">Skill Level</Label>
                  <Select value={newSession.skillLevel} onValueChange={(value) => setNewSession({...newSession, skillLevel: value})}>
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
                  <Label htmlFor="maxStudents">Max Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={newSession.maxStudents}
                    onChange={(e) => setNewSession({...newSession, maxStudents: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionPrice">Price ($)</Label>
                  <Input
                    id="sessionPrice"
                    type="number"
                    value={newSession.price}
                    onChange={(e) => setNewSession({...newSession, price: parseInt(e.target.value)})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="sessionLocation">Location</Label>
                  <Input
                    id="sessionLocation"
                    value={newSession.location}
                    onChange={(e) => setNewSession({...newSession, location: e.target.value})}
                    placeholder="e.g., Court 1 & 2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="sessionDescription">Description</Label>
                  <Textarea
                    id="sessionDescription"
                    value={newSession.description}
                    onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                    placeholder="Describe what this session will cover..."
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Focus Areas</Label>
                  <div className="space-y-2">
                    {newSession.focusAreas.map((area, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={area}
                          onChange={(e) => updateFocusArea(index, e.target.value)}
                          placeholder="e.g., Positioning, Communication"
                        />
                        {newSession.focusAreas.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFocusArea(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addFocusArea}
                    >
                      Add Focus Area
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="sessionNotes">Notes</Label>
                  <Textarea
                    id="sessionNotes"
                    value={newSession.notes}
                    onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                    placeholder="Any additional notes for students..."
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <Button onClick={handleAddSession}>Add Session</Button>
                <Button variant="outline" onClick={() => setIsAddingSession(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Sessions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span>Upcoming Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.slice(0, 3).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      <div className="text-lg font-semibold">{session.time}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{session.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getTypeColor(session.type)}>{session.type}</Badge>
                        <Badge className={getLevelColor(session.skillLevel)}>{session.skillLevel}</Badge>
                        <Badge className="bg-gray-100 text-gray-800">
                          {session.duration}min
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {session.enrolledStudents}/{session.maxStudents} students
                    </div>
                    <div className="text-lg font-semibold text-green-600">${session.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Sessions List */}
        <div className="space-y-6">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <span>{session.title}</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {session.date} at {session.time} • {session.duration} minutes
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingSession(editingSession === session.id ? null : session.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <Badge className={`mt-1 ${getStatusColor(session.status)}`}>
                      {session.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Type</Label>
                    <Badge className={`mt-1 ${getTypeColor(session.type)}`}>
                      {session.type}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Skill Level</Label>
                    <Badge className={`mt-1 ${getLevelColor(session.skillLevel)}`}>
                      {session.skillLevel}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Price</Label>
                    <p className="text-lg font-semibold text-green-600">${session.price}</p>
                  </div>
                </div>

                {/* Description and Focus Areas */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-500">Description</Label>
                  <p className="text-gray-700 mt-1">{session.description}</p>
                </div>

                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-500">Focus Areas</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {session.focusAreas.map((area, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{session.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{session.enrolledStudents}/{session.maxStudents} students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{session.duration} minutes</span>
                  </div>
                </div>

                {/* Notes */}
                {session.notes && (
                  <div className="mb-4 pt-4 border-t">
                    <Label className="text-sm font-medium text-gray-500">Notes</Label>
                    <p className="text-gray-700 mt-1">{session.notes}</p>
                  </div>
                )}

                {/* Edit Mode */}
                {editingSession === session.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Edit Session</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Status</Label>
                        <Select value={session.status} onValueChange={(value) => handleUpdateSession(session.id, 'status', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Enrolled Students</Label>
                        <Input
                          type="number"
                          value={session.enrolledStudents}
                          onChange={(e) => handleUpdateSession(session.id, 'enrolledStudents', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={session.price}
                          onChange={(e) => handleUpdateSession(session.id, 'price', parseInt(e.target.value))}
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

export default Sessions; 