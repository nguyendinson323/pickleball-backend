import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { 
  MessageSquare,
  Search,
  Filter,
  Eye,
  Edit3,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Bell,
  Users,
  Building2,
  Star,
  MapPin,
  AlertTriangle,
  Archive,
  Trash2,
  Reply,
  Forward
} from 'lucide-react';

interface Message {
  id: number;
  subject: string;
  sender: string;
  recipients: string[];
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'draft' | 'sent' | 'delivered' | 'read' | 'failed';
  category: 'announcement' | 'notification' | 'update' | 'maintenance' | 'general';
  sentAt: string;
  readAt?: string;
  content: string;
  attachments: string[];
  tags: string[];
}

interface MessagingProps {
  messages: Message[];
}

const Messaging: React.FC<MessagingProps> = ({ messages }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeData, setComposeData] = useState({
    subject: '',
    recipients: {
      players: false,
      coaches: false,
      clubs: false,
      partners: false,
      stateCommittees: false,
      admins: false
    },
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
    category: 'general' as 'announcement' | 'notification' | 'update' | 'maintenance' | 'general',
    content: '',
    sendImmediately: true,
    scheduledTime: '',
    tags: [] as string[]
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-purple-100 text-purple-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'notification': return 'bg-green-100 text-green-800';
      case 'update': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'read': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'draft': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleMessageAction = (messageId: number, action: string) => {
    // Handle message actions
    console.log(`Message ${action} for ID ${messageId}`);
  };

  const handleSendMessage = () => {
    // Handle message sending logic
    console.log('Sending message:', composeData);
    setShowCompose(false);
    setComposeData({
      subject: '',
      recipients: {
        players: false,
        coaches: false,
        clubs: false,
        partners: false,
        stateCommittees: false,
        admins: false
      },
      priority: 'normal',
      category: 'general',
      content: '',
      sendImmediately: true,
      scheduledTime: '',
      tags: []
    });
  };

  const generateReport = () => {
    // Generate messaging report
    console.log('Generating messaging report');
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || message.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const stats = {
    total: messages.length,
    sent: messages.filter(m => m.status === 'sent').length,
    delivered: messages.filter(m => m.status === 'delivered').length,
    read: messages.filter(m => m.status === 'read').length,
    failed: messages.filter(m => m.status === 'failed').length,
    drafts: messages.filter(m => m.status === 'draft').length
  };

  const categories = ['announcement', 'notification', 'update', 'maintenance', 'general'];
  const priorities = ['low', 'normal', 'high', 'urgent'];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Messaging</h2>
          <p className="text-gray-600">Manage system-wide communications and announcements</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={generateReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Generate Report</span>
          </Button>
          <Button onClick={() => setShowCompose(true)} className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Compose Message</span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-gray-600">all messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
            <Send className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
            <p className="text-xs text-gray-600">successfully sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.delivered}</div>
            <p className="text-xs text-gray-600">delivered to recipients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read</CardTitle>
            <Eye className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.read}</div>
            <p className="text-xs text-gray-600">read by recipients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <p className="text-xs text-gray-600">delivery failed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.drafts}</div>
            <p className="text-xs text-gray-600">saved drafts</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Messages</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by subject, sender, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="statusFilter">Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priorityFilter">Priority Filter</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="categoryFilter">Category Filter</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{message.subject}</div>
                      {message.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {message.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {message.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{message.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{message.sender}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(message.priority)}>
                      <span className="capitalize">{message.priority}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(message.category)}>
                      <span className="capitalize">{message.category}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(message.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(message.status)}
                        <span className="capitalize">{message.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{message.recipients.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>{message.sentAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {message.status === 'draft' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMessageAction(message.id, 'edit')}
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      )}
                      {message.status === 'sent' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMessageAction(message.id, 'reply')}
                          >
                            <Reply className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMessageAction(message.id, 'forward')}
                          >
                            <Forward className="h-4 w-4 mr-1" />
                            Forward
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredMessages.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Message Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Subject</Label>
                  <p className="font-medium">{selectedMessage.subject}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Sender</Label>
                  <p>{selectedMessage.sender}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Priority</Label>
                  <Badge className={getPriorityColor(selectedMessage.priority)}>
                    <span className="capitalize">{selectedMessage.priority}</span>
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Category</Label>
                  <Badge className={getCategoryColor(selectedMessage.category)}>
                    <span className="capitalize">{selectedMessage.category}</span>
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedMessage.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedMessage.status)}
                      <span className="capitalize">{selectedMessage.status}</span>
                    </div>
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Sent At</Label>
                  <p>{selectedMessage.sentAt}</p>
                </div>
              </div>
              
              {selectedMessage.readAt && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Read At</Label>
                  <p>{selectedMessage.readAt}</p>
                </div>
              )}
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Recipients</Label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedMessage.recipients.map((recipient, index) => (
                    <Badge key={index} variant="outline">{recipient}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Content</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>
              </div>
              
              {selectedMessage.attachments.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Attachments</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedMessage.attachments.map((attachment, index) => (
                      <Badge key={index} variant="secondary">{attachment}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedMessage.tags.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Tags</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedMessage.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                Close
              </Button>
              {selectedMessage.status === 'draft' && (
                <Button
                  variant="outline"
                  onClick={() => handleMessageAction(selectedMessage.id, 'edit')}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              {selectedMessage.status === 'sent' && (
                <Button
                  onClick={() => handleMessageAction(selectedMessage.id, 'reply')}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Compose Message Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Compose System Message</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCompose(false)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={composeData.subject}
                  onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                  placeholder="Enter message subject"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={composeData.priority} onValueChange={(value: any) => setComposeData({...composeData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(priority => (
                        <SelectItem key={priority} value={priority}>
                          <span className="capitalize">{priority}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={composeData.category} onValueChange={(value: any) => setComposeData({...composeData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          <span className="capitalize">{category}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Recipients</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {Object.entries(composeData.recipients).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={value as boolean}
                        onChange={(e) => setComposeData({
                          ...composeData,
                          recipients: {
                            ...composeData.recipients,
                            [key]: e.target.checked
                          }
                        })}
                        className="rounded"
                      />
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="content">Message Content</Label>
                <textarea
                  id="content"
                  value={composeData.content}
                  onChange={(e) => setComposeData({...composeData, content: e.target.value})}
                  placeholder="Enter your message content..."
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sendTime">Send Time</Label>
                  <Select value={composeData.sendImmediately ? 'immediate' : 'scheduled'} onValueChange={(value) => setComposeData({
                    ...composeData, 
                    sendImmediately: value === 'immediate'
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Send Immediately</SelectItem>
                      <SelectItem value="scheduled">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {!composeData.sendImmediately && (
                  <div>
                    <Label htmlFor="scheduledTime">Scheduled Time</Label>
                    <Input
                      id="scheduledTime"
                      type="datetime-local"
                      value={composeData.scheduledTime}
                      onChange={(e) => setComposeData({...composeData, scheduledTime: e.target.value})}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowCompose(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={() => setComposeData({...composeData, content: ''})}>
                Save Draft
              </Button>
              <Button onClick={handleSendMessage} className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messaging; 