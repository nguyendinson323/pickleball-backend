import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { 
  Globe,
  Search,
  Filter,
  Eye,
  Edit3,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  QrCode,
  Building2,
  MapPin
} from 'lucide-react';

interface Microsite {
  id: number;
  name: string;
  type: 'state' | 'club' | 'partner';
  status: 'active' | 'inactive' | 'pending' | 'maintenance';
  lastUpdated: string;
  contentIssues: number;
  needsReview: boolean;
  url: string;
  owner: string;
  region: string;
}

interface MicrositesProps {
  microsites: Microsite[];
}

const Microsites: React.FC<MicrositesProps> = ({ microsites }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMicrosite, setSelectedMicrosite] = useState<Microsite | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'state': return 'bg-blue-100 text-blue-800';
      case 'club': return 'bg-purple-100 text-purple-800';
      case 'partner': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'inactive': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      case 'maintenance': return <Settings className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleMicrositeAction = (micrositeId: number, action: string) => {
    // Handle microsite actions
    console.log(`Microsite ${action} for ID ${micrositeId}`);
  };

  const generateReport = () => {
    // Generate microsite report
    console.log('Generating microsite report');
  };

  const filteredMicrosites = microsites.filter(microsite => {
    const matchesSearch = microsite.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         microsite.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || microsite.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || microsite.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: microsites.length,
    active: microsites.filter(m => m.status === 'active').length,
    pending: microsites.filter(m => m.status === 'pending').length,
    issues: microsites.reduce((sum, m) => sum + m.contentIssues, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Microsite Management</h2>
          <p className="text-gray-600">Monitor and manage all microsites across the platform</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={generateReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Generate Report</span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Microsites</CardTitle>
            <Globe className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-gray-600">active sites</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sites</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-gray-600">currently live</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-600">awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.issues}</div>
            <p className="text-xs text-gray-600">issues detected</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Microsites</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name or owner..."
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
                  <SelectItem value="state">State Committees</SelectItem>
                  <SelectItem value="club">Clubs</SelectItem>
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
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Advanced Filters</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Microsites Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Microsites</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMicrosites.map((microsite) => (
                <TableRow key={microsite.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{microsite.name}</div>
                      <div className="text-sm text-gray-500">{microsite.url}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(microsite.type)}>
                      <div className="flex items-center space-x-1">
                        {microsite.type === 'state' && <MapPin className="h-3 w-3" />}
                        {microsite.type === 'club' && <Building2 className="h-3 w-3" />}
                        {microsite.type === 'partner' && <Globe className="h-3 w-3" />}
                        <span className="capitalize">{microsite.type}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(microsite.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(microsite.status)}
                        <span className="capitalize">{microsite.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{microsite.owner}</TableCell>
                  <TableCell>{microsite.region}</TableCell>
                  <TableCell>{microsite.lastUpdated}</TableCell>
                  <TableCell>
                    {microsite.contentIssues > 0 ? (
                      <Badge variant="destructive">{microsite.contentIssues}</Badge>
                    ) : (
                      <Badge variant="secondary">0</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(microsite.url, '_blank')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedMicrosite(microsite)}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                      {microsite.needsReview && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMicrositeAction(microsite.id, 'review')}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredMicrosites.length === 0 && (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No microsites found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Microsite Detail Modal */}
      {selectedMicrosite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Microsite Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedMicrosite(null)}>
                <AlertTriangle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Name</Label>
                  <p className="font-medium">{selectedMicrosite.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Type</Label>
                  <Badge className={getTypeColor(selectedMicrosite.type)}>
                    <span className="capitalize">{selectedMicrosite.type}</span>
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Owner</Label>
                  <p>{selectedMicrosite.owner}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Region</Label>
                  <p>{selectedMicrosite.region}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">URL</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {selectedMicrosite.url}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(selectedMicrosite.url, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Visit
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedMicrosite.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedMicrosite.status)}
                      <span className="capitalize">{selectedMicrosite.status}</span>
                    </div>
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                  <p>{selectedMicrosite.lastUpdated}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Content Issues</Label>
                <div className="mt-1">
                  {selectedMicrosite.contentIssues > 0 ? (
                    <Badge variant="destructive">{selectedMicrosite.contentIssues} issues detected</Badge>
                  ) : (
                    <Badge variant="secondary">No issues detected</Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedMicrosite(null)}>
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => handleMicrositeAction(selectedMicrosite.id, 'configure')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button
                onClick={() => handleMicrositeAction(selectedMicrosite.id, 'manage')}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Manage Site
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Microsites; 