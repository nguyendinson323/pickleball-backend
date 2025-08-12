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
  Globe, 
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  Users,
  MessageCircle
} from 'lucide-react';

const Announcements = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<number | null>(null);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'State Championship Registration Open',
      content: 'Registration for the 2024 California State Pickleball Championship is now open! This year\'s tournament will be held in Sacramento from June 15-17. All skill levels welcome.',
      priority: 'High',
      category: 'Tournament',
      status: 'Published',
      publishDate: '2024-03-25',
      expiryDate: '2024-06-15',
      author: 'Tournament Director',
      targetAudience: 'All Members',
      views: 156,
      isPinned: true
    },
    {
      id: 2,
      title: 'New Safety Guidelines for Clubs',
      content: 'Updated safety guidelines have been implemented for all affiliated clubs. Please review the new protocols and ensure compliance by April 1st.',
      priority: 'Medium',
      category: 'Safety',
      status: 'Published',
      publishDate: '2024-03-22',
      expiryDate: '2024-04-01',
      author: 'Safety Committee',
      targetAudience: 'Club Managers',
      views: 89,
      isPinned: false
    },
    {
      id: 3,
      title: 'Coach Certification Program',
      content: 'Applications are now being accepted for the Spring 2024 Coach Certification Program. This intensive 8-week program will prepare you for professional coaching.',
      priority: 'Medium',
      category: 'Training',
      status: 'Draft',
      publishDate: '2024-03-20',
      expiryDate: '2024-05-15',
      author: 'Training Director',
      targetAudience: 'Coaches',
      views: 67,
      isPinned: false
    },
    {
      id: 4,
      title: 'Equipment Standards Update',
      content: 'New equipment standards have been approved by the federation board. All tournaments will require compliance with these standards effective immediately.',
      priority: 'High',
      category: 'Equipment',
      status: 'Published',
      publishDate: '2024-03-18',
      expiryDate: '2024-04-01',
      author: 'Equipment Committee',
      targetAudience: 'All Members',
      views: 134,
      isPinned: true
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'Medium',
    category: 'General',
    targetAudience: 'All Members',
    expiryDate: ''
  });

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement = {
        id: announcements.length + 1,
        ...newAnnouncement,
        status: 'Draft',
        publishDate: new Date().toISOString().split('T')[0],
        author: user?.username || 'Federation Staff',
        views: 0,
        isPinned: false
      };
      setAnnouncements([...announcements, announcement]);
      setNewAnnouncement({
        title: '',
        content: '',
        priority: 'Medium',
        category: 'General',
        targetAudience: 'All Members',
        expiryDate: ''
      });
      setIsAddingAnnouncement(false);
    }
  };

  const handleUpdateAnnouncement = (id: number, field: string, value: string) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id ? { ...announcement, [field]: value } : announcement
    ));
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  const handlePublish = (id: number) => {
    handleUpdateAnnouncement(id, 'status', 'Published');
  };

  const handleUnpublish = (id: number) => {
    handleUpdateAnnouncement(id, 'status', 'Draft');
  };

  const handleTogglePin = (id: number) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id ? { ...announcement, isPinned: !announcement.isPinned } : announcement
    ));
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || announcement.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || announcement.category === filterCategory;

    return matchesSearch && matchesPriority && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tournament': return 'bg-purple-100 text-purple-800';
      case 'Safety': return 'bg-red-100 text-red-800';
      case 'Training': return 'bg-blue-100 text-blue-800';
      case 'Equipment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const announcementStats = {
    total: announcements.length,
    published: announcements.filter(a => a.status === 'Published').length,
    drafts: announcements.filter(a => a.status === 'Draft').length,
    highPriority: announcements.filter(a => a.priority === 'High').length,
    pinned: announcements.filter(a => a.isPinned).length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
            <p className="text-gray-600">Manage announcements and communications with your members</p>
          </div>
          <Button onClick={() => setIsAddingAnnouncement(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Announcement</span>
          </Button>
        </div>

        {/* Announcement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Globe className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{announcementStats.total}</div>
              <p className="text-xs text-gray-600">announcements</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{announcementStats.published}</div>
              <p className="text-xs text-gray-600">live announcements</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{announcementStats.drafts}</div>
              <p className="text-xs text-gray-600">pending review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{announcementStats.highPriority}</div>
              <p className="text-xs text-gray-600">urgent notices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pinned</CardTitle>
              <Star className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{announcementStats.pinned}</div>
              <p className="text-xs text-gray-600">featured posts</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search Announcements</Label>
                <Input
                  id="search"
                  placeholder="Search by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="priorityFilter">Priority</Label>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="categoryFilter">Category</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Tournament">Tournament</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Announcement Form */}
        {isAddingAnnouncement && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Announcement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="announcementTitle">Title</Label>
                  <Input
                    id="announcementTitle"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    placeholder="Enter announcement title"
                  />
                </div>
                <div>
                  <Label htmlFor="announcementPriority">Priority</Label>
                  <Select value={newAnnouncement.priority} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="announcementCategory">Category</Label>
                  <Select value={newAnnouncement.category} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Tournament">Tournament</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="announcementAudience">Target Audience</Label>
                  <Select value={newAnnouncement.targetAudience} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, targetAudience: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Members">All Members</SelectItem>
                      <SelectItem value="Players">Players</SelectItem>
                      <SelectItem value="Coaches">Coaches</SelectItem>
                      <SelectItem value="Club Managers">Club Managers</SelectItem>
                      <SelectItem value="Tournament Directors">Tournament Directors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="announcementExpiry">Expiry Date</Label>
                  <Input
                    id="announcementExpiry"
                    type="date"
                    value={newAnnouncement.expiryDate}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, expiryDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="announcementContent">Content</Label>
                <Textarea
                  id="announcementContent"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  placeholder="Enter announcement content..."
                  rows={6}
                />
              </div>
              <div className="flex space-x-3 mt-4">
                <Button onClick={handleAddAnnouncement}>Create Announcement</Button>
                <Button variant="outline" onClick={() => setIsAddingAnnouncement(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={announcement.isPinned ? 'border-2 border-purple-200 bg-purple-50' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {announcement.isPinned && (
                        <Star className="h-5 w-5 text-purple-500 fill-current" />
                      )}
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Published: {announcement.publishDate}</span>
                      {announcement.expiryDate && (
                        <>
                          <span>•</span>
                          <span>Expires: {announcement.expiryDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingAnnouncement(editingAnnouncement === announcement.id ? null : announcement.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePin(announcement.id)}
                    >
                      {announcement.isPinned ? <XCircle className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority} Priority
                  </Badge>
                  <Badge className={getCategoryColor(announcement.category)}>
                    {announcement.category}
                  </Badge>
                  <Badge className={getStatusColor(announcement.status)}>
                    {announcement.status}
                  </Badge>
                  <Badge variant="outline">
                    {announcement.targetAudience}
                  </Badge>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span>Author: {announcement.author}</span>
                    <span>Views: {announcement.views}</span>
                  </div>
                  <div className="flex space-x-2">
                    {announcement.status === 'Draft' ? (
                      <Button size="sm" onClick={() => handlePublish(announcement.id)}>
                        Publish
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleUnpublish(announcement.id)}>
                        Unpublish
                      </Button>
                    )}
                  </div>
                </div>

                {/* Edit Mode */}
                {editingAnnouncement === announcement.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Edit Announcement</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Priority</Label>
                        <Select value={announcement.priority} onValueChange={(value) => handleUpdateAnnouncement(announcement.id, 'priority', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={announcement.category} onValueChange={(value) => handleUpdateAnnouncement(announcement.id, 'category', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Tournament">Tournament</SelectItem>
                            <SelectItem value="Safety">Safety</SelectItem>
                            <SelectItem value="Training">Training</SelectItem>
                            <SelectItem value="Equipment">Equipment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Target Audience</Label>
                        <Select value={announcement.targetAudience} onValueChange={(value) => handleUpdateAnnouncement(announcement.id, 'targetAudience', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Members">All Members</SelectItem>
                            <SelectItem value="Players">Players</SelectItem>
                            <SelectItem value="Coaches">Coaches</SelectItem>
                            <SelectItem value="Club Managers">Club Managers</SelectItem>
                            <SelectItem value="Tournament Directors">Tournament Directors</SelectItem>
                          </SelectContent>
                        </Select>
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

export default Announcements; 