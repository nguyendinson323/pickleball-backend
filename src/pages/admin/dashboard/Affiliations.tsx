import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { 
  Users,
  Search,
  Filter,
  Eye,
  Edit3,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Building2,
  MapPin,
  Star,
  Activity,
  TrendingUp
} from 'lucide-react';

interface Affiliation {
  id: number;
  entityName: string;
  entityType: 'club' | 'state' | 'partner';
  status: 'active' | 'pending' | 'suspended' | 'expired';
  region: string;
  memberCount: number;
  joinDate: string;
  renewalDate: string;
  complianceScore: number;
  lastAudit: string;
  contactPerson: string;
  contactEmail: string;
  benefits: string[];
}

interface AffiliationsProps {
  affiliations: Affiliation[];
}

const Affiliations: React.FC<AffiliationsProps> = ({ affiliations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [selectedAffiliation, setSelectedAffiliation] = useState<Affiliation | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'club': return 'bg-purple-100 text-purple-800';
      case 'state': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'suspended': return <XCircle className="h-4 w-4" />;
      case 'expired': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleAffiliationAction = (affiliationId: number, action: string) => {
    // Handle affiliation actions
    console.log(`Affiliation ${action} for ID ${affiliationId}`);
  };

  const generateReport = () => {
    // Generate affiliations report
    console.log('Generating affiliations report');
  };

  const filteredAffiliations = affiliations.filter(affiliation => {
    const matchesSearch = affiliation.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         affiliation.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || affiliation.entityType === typeFilter;
    const matchesStatus = statusFilter === 'all' || affiliation.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || affiliation.region === regionFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesRegion;
  });

  const stats = {
    total: affiliations.length,
    active: affiliations.filter(a => a.status === 'active').length,
    pending: affiliations.filter(a => a.status === 'pending').length,
    suspended: affiliations.filter(a => a.status === 'suspended').length,
    totalMembers: affiliations.reduce((sum, a) => sum + a.memberCount, 0),
    averageCompliance: affiliations.reduce((sum, a) => sum + a.complianceScore, 0) / affiliations.length
  };

  const regions = Array.from(new Set(affiliations.map(a => a.region)));

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Affiliations Management</h2>
          <p className="text-gray-600">Manage club, state, and partner affiliations across the platform</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={generateReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Generate Report</span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Affiliations</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-gray-600">registered entities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-gray-600">current members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-600">awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
            <p className="text-xs text-gray-600">temporarily suspended</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalMembers.toLocaleString()}</div>
            <p className="text-xs text-gray-600">across all entities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Compliance</CardTitle>
            <Star className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.averageCompliance.toFixed(1)}%</div>
            <p className="text-xs text-gray-600">compliance score</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Affiliations</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name or contact person..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="typeFilter">Type Filter</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="club">Clubs</SelectItem>
                  <SelectItem value="state">State Committees</SelectItem>
                  <SelectItem value="partner">Partners</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="statusFilter">Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="regionFilter">Region Filter</Label>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Affiliations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Affiliations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAffiliations.map((affiliation) => (
                <TableRow key={affiliation.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{affiliation.entityName}</div>
                      <div className="text-sm text-gray-500">{affiliation.contactPerson}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(affiliation.entityType)}>
                      <div className="flex items-center space-x-1">
                        {affiliation.entityType === 'club' && <Building2 className="h-3 w-3" />}
                        {affiliation.entityType === 'state' && <MapPin className="h-3 w-3" />}
                        {affiliation.entityType === 'partner' && <Star className="h-3 w-3" />}
                        <span className="capitalize">{affiliation.entityType}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(affiliation.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(affiliation.status)}
                        <span className="capitalize">{affiliation.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{affiliation.region}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{affiliation.memberCount.toLocaleString()}</span>
                      {affiliation.memberCount > 100 && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getComplianceColor(affiliation.complianceScore)}`}>
                      {affiliation.complianceScore}%
                    </span>
                  </TableCell>
                  <TableCell>{affiliation.renewalDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedAffiliation(affiliation)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAffiliationAction(affiliation.id, 'edit')}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {affiliation.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAffiliationAction(affiliation.id, 'approve')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAffiliationAction(affiliation.id, 'reject')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {affiliation.status === 'suspended' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAffiliationAction(affiliation.id, 'reactivate')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Reactivate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAffiliations.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No affiliations found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Affiliation Detail Modal */}
      {selectedAffiliation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Affiliation Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedAffiliation(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Entity Name</Label>
                  <p className="font-medium">{selectedAffiliation.entityName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Type</Label>
                  <Badge className={getTypeColor(selectedAffiliation.entityType)}>
                    <span className="capitalize">{selectedAffiliation.entityType}</span>
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedAffiliation.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedAffiliation.status)}
                      <span className="capitalize">{selectedAffiliation.status}</span>
                    </div>
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Region</Label>
                  <p>{selectedAffiliation.region}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Member Count</Label>
                  <p className="font-medium">{selectedAffiliation.memberCount.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Compliance Score</Label>
                  <p className={`font-medium ${getComplianceColor(selectedAffiliation.complianceScore)}`}>
                    {selectedAffiliation.complianceScore}%
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Join Date</Label>
                  <p>{selectedAffiliation.joinDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Renewal Date</Label>
                  <p>{selectedAffiliation.renewalDate}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Contact Person</Label>
                  <p>{selectedAffiliation.contactPerson}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Contact Email</Label>
                  <p>{selectedAffiliation.contactEmail}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Audit</Label>
                <p>{selectedAffiliation.lastAudit}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Benefits</Label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedAffiliation.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary">{benefit}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedAffiliation(null)}>
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAffiliationAction(selectedAffiliation.id, 'edit')}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={() => handleAffiliationAction(selectedAffiliation.id, 'manage')}
              >
                <Activity className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Affiliations; 