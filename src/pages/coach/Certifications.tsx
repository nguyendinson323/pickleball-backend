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
  Target,
  Download,
  ExternalLink
} from 'lucide-react';

const Certifications = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isAddingCertification, setIsAddingCertification] = useState(false);
  const [editingCertification, setEditingCertification] = useState<number | null>(null);

  // Mock certifications data
  const [certifications, setCertifications] = useState([
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
      hoursCompleted: 40,
      continuingEducationRequired: 20,
      continuingEducationCompleted: 15,
      certificateFile: 'usapa-level2-cert.pdf',
      requirements: [
        'Complete 40 hours of training',
        'Pass written examination',
        'Complete practical assessment',
        'Maintain continuing education hours'
      ]
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
      hoursCompleted: 30,
      continuingEducationRequired: 15,
      continuingEducationCompleted: 12,
      certificateFile: 'sports-psychology-cert.pdf',
      requirements: [
        'Complete 30 hours of coursework',
        'Pass final examination',
        'Submit case study',
        'Maintain annual continuing education'
      ]
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
      hoursCompleted: 8,
      continuingEducationRequired: 0,
      continuingEducationCompleted: 0,
      certificateFile: 'first-aid-cpr-cert.pdf',
      requirements: [
        'Complete 8 hours of training',
        'Demonstrate practical skills',
        'Pass written examination'
      ]
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
      hoursCompleted: 25,
      continuingEducationRequired: 10,
      continuingEducationCompleted: 8,
      certificateFile: 'advanced-techniques-cert.pdf',
      requirements: [
        'Complete 25 hours of advanced training',
        'Pass practical skills assessment',
        'Submit video analysis',
        'Complete continuing education requirements'
      ]
    }
  ]);

  const [newCertification, setNewCertification] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    credentialNumber: '',
    category: 'Coaching',
    description: '',
    verificationUrl: '',
    hoursRequired: 0,
    hoursCompleted: 0,
    continuingEducationRequired: 0,
    certificateFile: '',
    requirements: ['']
  });

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuingOrganization) {
      const certification = {
        id: certifications.length + 1,
        ...newCertification,
        status: 'Active',
        isVerified: false,
        continuingEducationCompleted: 0,
        requirements: newCertification.requirements.filter(req => req.trim() !== '')
      };
      setCertifications([...certifications, certification]);
      setNewCertification({
        name: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        credentialNumber: '',
        category: 'Coaching',
        description: '',
        verificationUrl: '',
        hoursRequired: 0,
        hoursCompleted: 0,
        continuingEducationRequired: 0,
        certificateFile: '',
        requirements: ['']
      });
      setIsAddingCertification(false);
    }
  };

  const handleUpdateCertification = (id: number, field: string, value: any) => {
    setCertifications(certifications.map(certification => 
      certification.id === id ? { ...certification, [field]: value } : certification
    ));
  };

  const handleDeleteCertification = (id: number) => {
    setCertifications(certifications.filter(certification => certification.id !== id));
  };

  const addRequirement = () => {
    setNewCertification(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    setNewCertification(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setNewCertification(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
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

  const certificationStats = {
    total: certifications.length,
    active: certifications.filter(c => c.status === 'Active').length,
    verified: certifications.filter(c => c.isVerified).length,
    expiringSoon: certifications.filter(c => c.status === 'Expiring Soon').length
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certifications</h1>
            <p className="text-gray-600">Manage your professional certifications and continuing education</p>
          </div>
          <Button onClick={() => setIsAddingCertification(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Certification</span>
          </Button>
        </div>

        {/* Certification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Certifications</CardTitle>
              <Award className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{certificationStats.total}</div>
              <p className="text-xs text-gray-600">certifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{certificationStats.active}</div>
              <p className="text-xs text-gray-600">currently valid</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <Star className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{certificationStats.verified}</div>
              <p className="text-xs text-gray-600">officially verified</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{certificationStats.expiringSoon}</div>
              <p className="text-xs text-gray-600">within 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Certification Form */}
        {isAddingCertification && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Certification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="certName">Certification Name</Label>
                  <Input
                    id="certName"
                    value={newCertification.name}
                    onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                    placeholder="e.g., USAPA Level 2 Coach"
                  />
                </div>
                <div>
                  <Label htmlFor="issuingOrg">Issuing Organization</Label>
                  <Input
                    id="issuingOrg"
                    value={newCertification.issuingOrganization}
                    onChange={(e) => setNewCertification({...newCertification, issuingOrganization: e.target.value})}
                    placeholder="e.g., USA Pickleball Association"
                  />
                </div>
                <div>
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={newCertification.issueDate}
                    onChange={(e) => setNewCertification({...newCertification, issueDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newCertification.expiryDate}
                    onChange={(e) => setNewCertification({...newCertification, expiryDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="credentialNumber">Credential Number</Label>
                  <Input
                    id="credentialNumber"
                    value={newCertification.credentialNumber}
                    onChange={(e) => setNewCertification({...newCertification, credentialNumber: e.target.value})}
                    placeholder="e.g., USAPA-L2-2022-001234"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newCertification.category} onValueChange={(value) => setNewCertification({...newCertification, category: value})}>
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
                <div>
                  <Label htmlFor="hoursRequired">Hours Required</Label>
                  <Input
                    id="hoursRequired"
                    type="number"
                    value={newCertification.hoursRequired}
                    onChange={(e) => setNewCertification({...newCertification, hoursRequired: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="hoursCompleted">Hours Completed</Label>
                  <Input
                    id="hoursCompleted"
                    type="number"
                    value={newCertification.hoursCompleted}
                    onChange={(e) => setNewCertification({...newCertification, hoursCompleted: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="continuingEducation">Continuing Education Required</Label>
                  <Input
                    id="continuingEducation"
                    type="number"
                    value={newCertification.continuingEducationRequired}
                    onChange={(e) => setNewCertification({...newCertification, continuingEducationRequired: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="verificationUrl">Verification URL</Label>
                  <Input
                    id="verificationUrl"
                    value={newCertification.verificationUrl}
                    onChange={(e) => setNewCertification({...newCertification, verificationUrl: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCertification.description}
                    onChange={(e) => setNewCertification({...newCertification, description: e.target.value})}
                    placeholder="Describe what this certification covers..."
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Requirements</Label>
                  <div className="space-y-2">
                    {newCertification.requirements.map((req, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={req}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          placeholder="e.g., Complete training hours, Pass examination"
                        />
                        {newCertification.requirements.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeRequirement(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addRequirement}
                    >
                      Add Requirement
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <Button onClick={handleAddCertification}>Add Certification</Button>
                <Button variant="outline" onClick={() => setIsAddingCertification(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certifications List */}
        <div className="space-y-6">
          {certifications.map((certification) => (
            <Card key={certification.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-blue-500" />
                      <span>{certification.name}</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {certification.issuingOrganization} • {certification.credentialNumber}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCertification(editingCertification === certification.id ? null : certification.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCertification(certification.id)}
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
                    <Badge className={`mt-1 ${getStatusColor(certification.status)}`}>
                      {certification.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Category</Label>
                    <Badge className={`mt-1 ${getCategoryColor(certification.category)}`}>
                      {certification.category}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Verification</Label>
                    <Badge className={`mt-1 ${getVerificationColor(certification.isVerified)}`}>
                      {certification.isVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Hours</Label>
                    <p className="text-lg font-semibold text-blue-600">
                      {certification.hoursCompleted}/{certification.hoursRequired}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {certification.description && (
                  <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-500">Description</Label>
                    <p className="text-gray-700 mt-1">{certification.description}</p>
                  </div>
                )}

                {/* Requirements */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-500">Requirements</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                    {certification.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates and Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Issue Date</Label>
                    <p className="font-medium">{certification.issueDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Expiry Date</Label>
                    <div className="flex items-center space-x-2">
                      <p className={`font-medium ${isExpired(certification.expiryDate) ? 'text-red-600' : isExpiringSoon(certification.expiryDate) ? 'text-yellow-600' : 'text-gray-900'}`}>
                        {certification.expiryDate}
                      </p>
                      {isExpired(certification.expiryDate) && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      {isExpiringSoon(certification.expiryDate) && <Clock className="h-4 w-4 text-yellow-500" />}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Continuing Education</Label>
                    <p className="font-medium">
                      {certification.continuingEducationCompleted}/{certification.continuingEducationRequired} hours
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  {certification.certificateFile && (
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download Certificate</span>
                    </Button>
                  )}
                  {certification.verificationUrl && (
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>Verify Online</span>
                    </Button>
                  )}
                </div>

                {/* Edit Mode */}
                {editingCertification === certification.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Edit Certification</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Status</Label>
                        <Select value={certification.status} onValueChange={(value) => handleUpdateCertification(certification.id, 'status', value)}>
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
                          value={certification.hoursCompleted}
                          onChange={(e) => handleUpdateCertification(certification.id, 'hoursCompleted', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Continuing Education Completed</Label>
                        <Input
                          type="number"
                          value={certification.continuingEducationCompleted}
                          onChange={(e) => handleUpdateCertification(certification.id, 'continuingEducationCompleted', parseInt(e.target.value))}
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

export default Certifications; 