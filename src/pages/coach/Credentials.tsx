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
  Award, 
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  GraduationCap,
  BookOpen,
  Target
} from 'lucide-react';

const Credentials = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isAddingCredential, setIsAddingCredential] = useState(false);
  const [editingCredential, setEditingCredential] = useState<number | null>(null);

  // Mock credentials data
  const [credentials, setCredentials] = useState([
    {
      id: 1,
      name: 'USAPA Level 2 Coach Certification',
      issuingOrganization: 'USA Pickleball Association',
      issueDate: '2022-06-15',
      expiryDate: '2025-06-15',
      credentialNumber: 'USAPA-L2-2022-001234',
      status: 'Active',
      category: 'Coaching',
      description: 'Advanced coaching certification for tournament-level players',
      verificationUrl: 'https://usapa.org/verify/001234',
      isVerified: true,
      hoursRequired: 40,
      hoursCompleted: 40
    },
    {
      id: 2,
      name: 'Sports Psychology Certification',
      issuingOrganization: 'American Sports Psychology Institute',
      issueDate: '2021-09-20',
      expiryDate: '2024-09-20',
      credentialNumber: 'ASPI-SP-2021-567890',
      status: 'Active',
      category: 'Psychology',
      description: 'Specialized training in mental preparation and performance psychology',
      verificationUrl: 'https://aspi.org/verify/567890',
      isVerified: true,
      hoursRequired: 30,
      hoursCompleted: 30
    },
    {
      id: 3,
      name: 'First Aid & CPR Certification',
      issuingOrganization: 'American Red Cross',
      issueDate: '2023-03-10',
      expiryDate: '2025-03-10',
      credentialNumber: 'ARC-FA-2023-112233',
      status: 'Active',
      category: 'Safety',
      description: 'Emergency response and life-saving techniques certification',
      verificationUrl: 'https://redcross.org/verify/112233',
      isVerified: true,
      hoursRequired: 8,
      hoursCompleted: 8
    },
    {
      id: 4,
      name: 'Advanced Pickleball Techniques',
      issuingOrganization: 'Pickleball Pro Academy',
      issueDate: '2022-11-05',
      expiryDate: '2024-11-05',
      credentialNumber: 'PPA-APT-2022-445566',
      status: 'Expiring Soon',
      category: 'Skills',
      description: 'Advanced stroke mechanics and strategic play techniques',
      verificationUrl: 'https://ppa.org/verify/445566',
      isVerified: false,
      hoursRequired: 25,
      hoursCompleted: 25
    }
  ]);

  const [newCredential, setNewCredential] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    credentialNumber: '',
    category: 'Coaching',
    description: '',
    verificationUrl: '',
    hoursRequired: 0,
    hoursCompleted: 0
  });

  const handleAddCredential = () => {
    if (newCredential.name && newCredential.issuingOrganization) {
      const credential = {
        id: credentials.length + 1,
        ...newCredential,
        status: 'Active',
        isVerified: false
      };
      setCredentials([...credentials, credential]);
      setNewCredential({
        name: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        credentialNumber: '',
        category: 'Coaching',
        description: '',
        verificationUrl: '',
        hoursRequired: 0,
        hoursCompleted: 0
      });
      setIsAddingCredential(false);
    }
  };

  const handleUpdateCredential = (id: number, field: string, value: string | number) => {
    setCredentials(credentials.map(credential => 
      credential.id === id ? { ...credential, [field]: value } : credential
    ));
  };

  const handleDeleteCredential = (id: number) => {
    setCredentials(credentials.filter(credential => credential.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Coaching': return 'bg-blue-100 text-blue-800';
      case 'Psychology': return 'bg-purple-100 text-purple-800';
      case 'Safety': return 'bg-red-100 text-red-800';
      case 'Skills': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationColor = (isVerified: boolean) => {
    return isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const credentialStats = {
    total: credentials.length,
    active: credentials.filter(c => c.status === 'Active').length,
    verified: credentials.filter(c => c.isVerified).length,
    expiringSoon: credentials.filter(c => c.status === 'Expiring Soon').length
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    return expiry < now;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Credentials</h1>
            <p className="text-gray-600">Manage your professional qualifications and certifications</p>
          </div>
          <Button onClick={() => setIsAddingCredential(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Credential</span>
          </Button>
        </div>

        {/* Credentials Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Credentials</CardTitle>
              <Award className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{credentialStats.total}</div>
              <p className="text-xs text-gray-600">certifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{credentialStats.active}</div>
              <p className="text-xs text-gray-600">currently valid</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <Star className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{credentialStats.verified}</div>
              <p className="text-xs text-gray-600">officially verified</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{credentialStats.expiringSoon}</div>
              <p className="text-xs text-gray-600">within 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Credential Form */}
        {isAddingCredential && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Credential</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="credentialName">Credential Name</Label>
                  <Input
                    id="credentialName"
                    value={newCredential.name}
                    onChange={(e) => setNewCredential({...newCredential, name: e.target.value})}
                    placeholder="e.g., USAPA Level 2 Coach"
                  />
                </div>
                <div>
                  <Label htmlFor="issuingOrg">Issuing Organization</Label>
                  <Input
                    id="issuingOrg"
                    value={newCredential.issuingOrganization}
                    onChange={(e) => setNewCredential({...newCredential, issuingOrganization: e.target.value})}
                    placeholder="e.g., USA Pickleball Association"
                  />
                </div>
                <div>
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={newCredential.issueDate}
                    onChange={(e) => setNewCredential({...newCredential, issueDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newCredential.expiryDate}
                    onChange={(e) => setNewCredential({...newCredential, expiryDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="credentialNumber">Credential Number</Label>
                  <Input
                    id="credentialNumber"
                    value={newCredential.credentialNumber}
                    onChange={(e) => setNewCredential({...newCredential, credentialNumber: e.target.value})}
                    placeholder="e.g., USAPA-L2-2022-001234"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newCredential.category} onValueChange={(value) => setNewCredential({...newCredential, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Coaching">Coaching</SelectItem>
                      <SelectItem value="Psychology">Psychology</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Skills">Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCredential.description}
                    onChange={(e) => setNewCredential({...newCredential, description: e.target.value})}
                    placeholder="Describe what this credential covers..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="verificationUrl">Verification URL</Label>
                  <Input
                    id="verificationUrl"
                    value={newCredential.verificationUrl}
                    onChange={(e) => setNewCredential({...newCredential, verificationUrl: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="hoursRequired">Hours Required</Label>
                  <Input
                    id="hoursRequired"
                    type="number"
                    value={newCredential.hoursRequired}
                    onChange={(e) => setNewCredential({...newCredential, hoursRequired: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <Button onClick={handleAddCredential}>Add Credential</Button>
                <Button variant="outline" onClick={() => setIsAddingCredential(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Credentials List */}
        <div className="space-y-6">
          {credentials.map((credential) => (
            <Card key={credential.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-blue-500" />
                      <span>{credential.name}</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {credential.issuingOrganization} • {credential.credentialNumber}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCredential(editingCredential === credential.id ? null : credential.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCredential(credential.id)}
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
                    <Badge className={`mt-1 ${getStatusColor(credential.status)}`}>
                      {credential.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Category</Label>
                    <Badge className={`mt-1 ${getCategoryColor(credential.category)}`}>
                      {credential.category}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Verification</Label>
                    <Badge className={`mt-1 ${getVerificationColor(credential.isVerified)}`}>
                      {credential.isVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Hours</Label>
                    <p className="text-lg font-semibold text-blue-600">
                      {credential.hoursCompleted}/{credential.hoursRequired}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {credential.description && (
                  <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-500">Description</Label>
                    <p className="text-gray-700 mt-1">{credential.description}</p>
                  </div>
                )}

                {/* Dates and Verification */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Issue Date</Label>
                    <p className="font-medium">{credential.issueDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Expiry Date</Label>
                    <div className="flex items-center space-x-2">
                      <p className={`font-medium ${isExpired(credential.expiryDate) ? 'text-red-600' : isExpiringSoon(credential.expiryDate) ? 'text-yellow-600' : 'text-gray-900'}`}>
                        {credential.expiryDate}
                      </p>
                      {isExpired(credential.expiryDate) && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      {isExpiringSoon(credential.expiryDate) && <Clock className="h-4 w-4 text-yellow-500" />}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Verification</Label>
                    {credential.verificationUrl ? (
                      <a 
                        href={credential.verificationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline text-sm"
                      >
                        Verify Online
                      </a>
                    ) : (
                      <p className="text-gray-500 text-sm">No verification link</p>
                    )}
                  </div>
                </div>

                {/* Edit Mode */}
                {editingCredential === credential.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Edit Credential</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Status</Label>
                        <Select value={credential.status} onValueChange={(value) => handleUpdateCredential(credential.id, 'status', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Expired">Expired</SelectItem>
                            <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Hours Completed</Label>
                        <Input
                          type="number"
                          value={credential.hoursCompleted}
                          onChange={(e) => handleUpdateCredential(credential.id, 'hoursCompleted', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={credential.description}
                          onChange={(e) => handleUpdateCredential(credential.id, 'description', e.target.value)}
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

export default Credentials; 