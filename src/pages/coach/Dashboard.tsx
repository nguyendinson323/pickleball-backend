import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { 
  Users, 
  Calendar, 
  Trophy, 
  BookOpen, 
  Award,
  Clock,
  Target,
  TrendingUp,
  Star,
  GraduationCap,
  DollarSign,
  FileText,
  BarChart3,
  Edit3,
  Eye,
  Download,
  Filter,
  Search,
  Plus,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  Square,
  Settings,
  QrCode,
  Image,
  Palette,
  Bookmark,
  TrendingDown
} from 'lucide-react';

const CoachDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStudent, setSelectedStudent] = useState('all');

  // Mock data - in real app this would come from API
  const coachStats = {
    totalStudents: 24,
    activeStudents: 18,
    trainingSessions: 156,
    sessionsThisMonth: 12,
    averageRating: 4.8,
    totalReviews: 89,
    certifications: 3,
    nextSession: 'Advanced Technique Workshop',
    nextSessionDate: '2024-04-20',
    upcomingSessions: 5,
    recentAchievements: [
      'Certified Advanced Coach - Level 3',
      'Student Tournament Winner - Sarah M.',
      '100+ Training Sessions Milestone'
    ]
  };

  const recentStudents = [
    {
      id: 1,
      name: 'Sarah M.',
      level: 'Intermediate',
      lastSession: '2024-03-20',
      progress: 85,
      photo: null
    },
    {
      id: 2,
      name: 'Mike R.',
      level: 'Beginner',
      lastSession: '2024-03-18',
      progress: 45,
      photo: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      level: 'Advanced',
      lastSession: '2024-03-15',
      progress: 92,
      photo: null
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Advanced Technique Workshop',
      date: '2024-04-20',
      time: '10:00 AM',
      students: 8,
      type: 'Group Session',
      status: 'upcoming',
      revenue: 0
    },
    {
      id: 2,
      title: 'Beginner Fundamentals',
      date: '2024-04-22',
      time: '2:00 PM',
      students: 12,
      type: 'Group Session',
      status: 'upcoming',
      revenue: 0
    },
    {
      id: 3,
      title: 'Private Lesson - John D.',
      date: '2024-04-25',
      time: '4:00 PM',
      students: 1,
      type: 'Private Session',
      status: 'upcoming',
      revenue: 0
    }
  ];

  // Session management data
  const allSessions = [
    ...upcomingSessions,
    {
      id: 4,
      title: 'Intermediate Skills Development',
      date: '2024-03-28',
      time: '3:00 PM',
      students: 6,
      type: 'Group Session',
      status: 'completed',
      revenue: 180
    },
    {
      id: 5,
      title: 'Private Lesson - Sarah M.',
      date: '2024-03-26',
      time: '5:00 PM',
      students: 1,
      type: 'Private Session',
      status: 'completed',
      revenue: 75
    },
    {
      id: 6,
      title: 'Youth Training Program',
      date: '2024-03-25',
      time: '4:00 PM',
      students: 15,
      type: 'Group Session',
      status: 'completed',
      revenue: 225
    }
  ];

  // Student progress tracking data
  const studentProgress = [
    {
      id: 1,
      name: 'Sarah M.',
      level: 'Intermediate',
      lastSession: '2024-03-20',
      progress: 85,
      nextGoal: 'Advanced Tournament Ready',
      achievements: ['Tournament Winner', 'Skill Level Up'],
      nextSession: '2024-04-20',
      photo: null
    },
    {
      id: 2,
      name: 'Mike R.',
      level: 'Beginner',
      lastSession: '2024-03-18',
      progress: 45,
      nextGoal: 'Intermediate Level',
      achievements: ['First Tournament', 'Basic Skills Mastered'],
      nextSession: '2024-04-22',
      photo: null
    },
    {
      id: 3,
      name: 'Lisa K.',
      level: 'Advanced',
      lastSession: '2024-03-15',
      progress: 92,
      nextGoal: 'Professional Level',
      achievements: ['Advanced Certification', 'Multiple Tournament Wins'],
      nextSession: '2024-04-25',
      photo: null
    },
    {
      id: 4,
      name: 'John D.',
      level: 'Intermediate',
      lastSession: '2024-03-22',
      progress: 68,
      nextGoal: 'Advanced Level',
      achievements: ['Consistent Performance', 'Team Player'],
      nextSession: '2024-04-18',
      photo: null
    }
  ];

  // Training plans data
  const trainingPlans = [
    {
      id: 1,
      name: 'Beginner to Intermediate',
      duration: '12 weeks',
      students: 8,
      status: 'active',
      progress: 75,
      nextSession: 'Week 9: Advanced Serving',
      description: 'Comprehensive program for beginners to reach intermediate level'
    },
    {
      id: 2,
      name: 'Advanced Tournament Prep',
      duration: '8 weeks',
      students: 4,
      status: 'active',
      progress: 50,
      nextSession: 'Week 5: Strategy & Tactics',
      description: 'Intensive preparation for competitive tournaments'
    },
    {
      id: 3,
      name: 'Youth Development Program',
      duration: '16 weeks',
      students: 12,
      status: 'active',
      progress: 25,
      nextSession: 'Week 5: Basic Techniques',
      description: 'Age-appropriate training for young players'
    }
  ];

  // Credentials and certifications data
  const credentials = [
    {
      id: 1,
      name: 'USAPA Level 3 Coach',
      issuingOrg: 'USA Pickleball Association',
      issueDate: '2023-06-15',
      expiryDate: '2026-06-15',
      status: 'active',
      verificationUrl: 'https://verify.usapa.org/coach123'
    },
    {
      id: 2,
      name: 'IPTPA Certified Instructor',
      issuingOrg: 'International Pickleball Teaching Professional Association',
      issueDate: '2022-09-20',
      expiryDate: '2025-09-20',
      status: 'active',
      verificationUrl: 'https://verify.iptpa.org/instructor456'
    },
    {
      id: 3,
      name: 'Youth Coaching Specialist',
      issuingOrg: 'National Youth Sports Association',
      issueDate: '2023-03-10',
      expiryDate: '2026-03-10',
      status: 'active',
      verificationUrl: 'https://verify.nysa.org/youth789'
    }
  ];

  // Revenue tracking data
  const revenueData = {
    thisMonth: 2850,
    lastMonth: 3200,
    thisYear: 28500,
    lastYear: 28000,
    monthlyBreakdown: [
      { month: 'Jan', revenue: 2800 },
      { month: 'Feb', revenue: 3100 },
      { month: 'Mar', revenue: 2850 },
      { month: 'Apr', revenue: 0 }
    ],
    sessionTypes: {
      'Private Sessions': 45,
      'Group Sessions': 35,
      'Tournament Prep': 15,
      'Youth Programs': 5
    }
  };

  // Helper functions
  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'Private Session': return 'bg-purple-100 text-purple-800';
      case 'Group Session': return 'bg-blue-100 text-blue-800';
      case 'Tournament Prep': return 'bg-yellow-100 text-yellow-800';
      case 'Youth Programs': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSessionAction = (sessionId: number, action: string) => {
    console.log(`${action} session ${sessionId}`);
    // In real app, this would perform the action
  };

  const handleStudentAction = (studentId: number, action: string) => {
    console.log(`${action} student ${studentId}`);
    // In real app, this would perform the action
  };

  const handleTrainingPlanAction = (planId: number, action: string) => {
    console.log(`${action} training plan ${planId}`);
    // In real app, this would perform the action
  };

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report`);
    // In real app, this would generate and download a report
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Coach {user?.username || 'Coach'}!
          </h1>
          <p className="text-gray-600">
            Here's your coaching overview and upcoming sessions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{coachStats.totalStudents}</div>
              <p className="text-xs text-gray-600">{coachStats.activeStudents} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training Sessions</CardTitle>
              <BookOpen className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{coachStats.trainingSessions}</div>
              <p className="text-xs text-gray-600">{coachStats.sessionsThisMonth} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{coachStats.averageRating}</div>
              <p className="text-xs text-gray-600">{coachStats.totalReviews} reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certifications</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{coachStats.certifications}</div>
              <p className="text-xs text-gray-600">active certifications</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="training">Training Plans</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Next Session */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <span>Next Training Session</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {coachStats.nextSession}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {new Date(coachStats.nextSessionDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <div className="flex justify-center space-x-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{coachStats.upcomingSessions}</div>
                            <div className="text-sm text-gray-600">Upcoming Sessions</div>
                          </div>
                        </div>
                        <Button className="w-full">View Session Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span>Recent Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {coachStats.recentAchievements.map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sessions Tab */}
            <TabsContent value="sessions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <span>Session Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Schedule and Manage Training Sessions</h3>
                      <Button onClick={() => handleSessionAction(0, 'create')}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Session
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Session</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allSessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell className="font-medium">{session.title}</TableCell>
                            <TableCell>
                              <div>{session.date}</div>
                              <div className="text-sm text-gray-600">{session.time}</div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getSessionTypeColor(session.type)}>
                                {session.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{session.students} student{session.students > 1 ? 's' : ''}</TableCell>
                            <TableCell>
                              <Badge className={getSessionStatusColor(session.status || 'upcoming')}>
                                {session.status || 'upcoming'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {session.revenue ? `$${session.revenue}` : '-'}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSessionAction(session.id, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSessionAction(session.id, 'edit')}
                                >
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                {session.status === 'upcoming' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleSessionAction(session.id, 'cancel')}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <span>Student Progress Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Monitor Student Development and Achievements</h3>
                      <Button onClick={() => handleStudentAction(0, 'add')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Student
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Next Goal</TableHead>
                          <TableHead>Last Session</TableHead>
                          <TableHead>Next Session</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentProgress.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={student.photo} />
                                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white text-xs">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{student.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                student.level === 'Beginner' ? 'secondary' :
                                student.level === 'Intermediate' ? 'default' : 'outline'
                              }>
                                {student.level}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{student.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">{student.nextGoal}</TableCell>
                            <TableCell>{student.lastSession}</TableCell>
                            <TableCell>{student.nextSession}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStudentAction(student.id, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStudentAction(student.id, 'message')}
                                >
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Message
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStudentAction(student.id, 'edit')}
                                >
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Training Plans Tab */}
            <TabsContent value="training" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    <span>Training Plans Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Create and Manage Training Programs</h3>
                      <Button onClick={() => handleTrainingPlanAction(0, 'create')}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Training Plan
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {trainingPlans.map((plan) => (
                        <Card key={plan.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <p className="text-sm text-gray-600">{plan.description}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span>Duration:</span>
                                <span className="font-medium">{plan.duration}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Students:</span>
                                <span className="font-medium">{plan.students}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Progress:</span>
                                <span className="font-medium">{plan.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full" 
                                  style={{ width: `${plan.progress}%` }}
                                ></div>
                              </div>
                              <div className="text-sm text-gray-600">
                                <strong>Next:</strong> {plan.nextSession}
                              </div>
                              <div className="flex space-x-2 pt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleTrainingPlanAction(plan.id, 'view')}
                                  className="flex-1"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleTrainingPlanAction(plan.id, 'edit')}
                                  className="flex-1"
                                >
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Credentials Tab */}
            <TabsContent value="credentials" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span>Credentials & Certifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Manage Your Coaching Credentials</h3>
                      <Button onClick={() => handleTrainingPlanAction(0, 'add-credential')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Credential
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {credentials.map((credential) => (
                        <Card key={credential.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{credential.name}</CardTitle>
                            <p className="text-sm text-gray-600">{credential.issuingOrg}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span>Issued:</span>
                                <span className="font-medium">{credential.issueDate}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Expires:</span>
                                <span className="font-medium">{credential.expiryDate}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Status:</span>
                                <Badge className="bg-green-100 text-green-800">
                                  {credential.status}
                                </Badge>
                              </div>
                              <div className="pt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => window.open(credential.verificationUrl, '_blank')}
                                >
                                  <QrCode className="h-4 w-4 mr-2" />
                                  Verify Online
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Revenue Tab */}
            <TabsContent value="revenue" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span>Revenue Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Monitor Your Coaching Income</h3>
                      <Button onClick={() => generateReport('revenue')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                    
                    {/* Revenue Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">${revenueData.thisMonth}</div>
                          <div className="text-sm text-gray-600">
                            {revenueData.thisMonth > revenueData.lastMonth ? (
                              <span className="text-green-600">↗ +${revenueData.thisMonth - revenueData.lastMonth}</span>
                            ) : (
                              <span className="text-red-600">↘ -${revenueData.lastMonth - revenueData.thisMonth}</span>
                            )} vs last month
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">This Year</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">${revenueData.thisYear}</div>
                          <div className="text-sm text-gray-600">
                            {revenueData.thisYear > revenueData.lastYear ? (
                              <span className="text-green-600">↗ +${revenueData.thisYear - revenueData.lastYear}</span>
                            ) : (
                              <span className="text-red-600">↘ -${revenueData.lastYear - revenueData.thisYear}</span>
                            )} vs last year
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">{coachStats.totalStudents}</div>
                          <div className="text-sm text-gray-600">active students</div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-yellow-600">{coachStats.averageRating}</div>
                          <div className="text-sm text-gray-600">{coachStats.totalReviews} reviews</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Revenue Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Revenue by Session Type</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {Object.entries(revenueData.sessionTypes).map(([type, percentage]) => (
                              <div key={type} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">{type}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-500 h-2 rounded-full" 
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium">{percentage}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Monthly Revenue Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {revenueData.monthlyBreakdown.map((month) => (
                              <div key={month.month} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">{month.month}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-500 h-2 rounded-full" 
                                      style={{ width: `${(month.revenue / 3200) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium">${month.revenue}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Upcoming Sessions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        session.type === 'Private Session' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {session.type === 'Private Session' ? <Users className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={session.type === 'Private Session' ? 'secondary' : 'default'}>
                        {session.type}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{session.students} student{session.students > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Students */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Recent Students</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.photo} />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.level} • Last session: {student.lastSession}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{student.progress}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Progress</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => setActiveTab('students')}
                >
                  <Users className="h-6 w-6" />
                  <span>Manage Students</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => setActiveTab('sessions')}
                >
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Session</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => setActiveTab('training')}
                >
                  <BookOpen className="h-6 w-6" />
                  <span>Training Plans</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => setActiveTab('credentials')}
                >
                  <Award className="h-6 w-6" />
                  <span>My Credentials</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard; 