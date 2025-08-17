import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { 
  MapPin,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Activity,
  TrendingUp,
  TrendingDown,
  Server,
  Wifi
} from 'lucide-react';

interface CourtPerformance {
  id: number;
  name: string;
  location: string;
  status: 'operational' | 'maintenance' | 'offline' | 'overloaded';
  uptime: number;
  responseTime: number;
  bookingsToday: number;
  utilization: number;
  lastMaintenance: string;
  nextMaintenance: string;
  issues: string[];
}

interface CourtMonitorProps {
  courtPerformance: CourtPerformance[];
}

const CourtMonitor: React.FC<CourtMonitorProps> = ({ courtPerformance }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedCourt, setSelectedCourt] = useState<CourtPerformance | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'overloaded': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <Clock className="h-4 w-4" />;
      case 'offline': return <AlertTriangle className="h-4 w-4" />;
      case 'overloaded': return <Activity className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600';
    if (utilization >= 75) return 'text-orange-600';
    if (utilization >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleCourtAction = (courtId: number, action: string) => {
    // Handle court actions
    console.log(`Court ${action} for ID ${courtId}`);
  };

  const generateReport = () => {
    // Generate court performance report
    console.log('Generating court performance report');
  };

  const filteredCourts = courtPerformance.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         court.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || court.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || court.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const stats = {
    total: courtPerformance.length,
    operational: courtPerformance.filter(c => c.status === 'operational').length,
    maintenance: courtPerformance.filter(c => c.status === 'maintenance').length,
    offline: courtPerformance.filter(c => c.status === 'offline').length,
    averageUptime: courtPerformance.reduce((sum, c) => sum + c.uptime, 0) / courtPerformance.length,
    totalBookings: courtPerformance.reduce((sum, c) => sum + c.bookingsToday, 0)
  };

  const locations = Array.from(new Set(courtPerformance.map(c => c.location)));

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Court Monitoring</h2>
          <p className="text-gray-600">Monitor court performance and system health across all locations</p>
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
            <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
            <MapPin className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-gray-600">monitored courts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.operational}</div>
            <p className="text-xs text-gray-600">fully operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.maintenance}</div>
            <p className="text-xs text-gray-600">under maintenance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.offline}</div>
            <p className="text-xs text-gray-600">currently offline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Uptime</CardTitle>
            <Server className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.averageUptime.toFixed(1)}%</div>
            <p className="text-xs text-gray-600">system reliability</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalBookings}</div>
            <p className="text-xs text-gray-600">today</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Courts</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by court name or location..."
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
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="overloaded">Overloaded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="locationFilter">Location Filter</Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
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

      {/* Courts Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Court Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Court</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Bookings Today</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourts.map((court) => (
                <TableRow key={court.id}>
                  <TableCell className="font-medium">{court.name}</TableCell>
                  <TableCell>{court.location}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(court.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(court.status)}
                        <span className="capitalize">{court.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{court.uptime}%</span>
                      {court.uptime >= 95 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : court.uptime >= 80 ? (
                        <TrendingDown className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={court.responseTime < 100 ? 'text-green-600' : 
                                   court.responseTime < 200 ? 'text-yellow-600' : 'text-red-600'}>
                      {court.responseTime}ms
                    </span>
                  </TableCell>
                  <TableCell>{court.bookingsToday}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getUtilizationColor(court.utilization)}`}>
                      {court.utilization}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedCourt(court)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      {court.status === 'offline' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCourtAction(court.id, 'restart')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Server className="h-4 w-4 mr-1" />
                          Restart
                        </Button>
                      )}
                      {court.status === 'maintenance' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCourtAction(court.id, 'complete')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCourts.length === 0 && (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courts found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Court Detail Modal */}
      {selectedCourt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Court Performance Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCourt(null)}>
                <AlertTriangle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Court Name</Label>
                  <p className="font-medium">{selectedCourt.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Location</Label>
                  <p>{selectedCourt.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedCourt.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedCourt.status)}
                      <span className="capitalize">{selectedCourt.status}</span>
                    </div>
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Uptime</Label>
                  <p className="font-medium">{selectedCourt.uptime}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Response Time</Label>
                  <p className={selectedCourt.responseTime < 100 ? 'text-green-600' : 
                              selectedCourt.responseTime < 200 ? 'text-yellow-600' : 'text-red-600'}>
                    {selectedCourt.responseTime}ms
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Utilization</Label>
                  <p className={`font-medium ${getUtilizationColor(selectedCourt.utilization)}`}>
                    {selectedCourt.utilization}%
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Bookings Today</Label>
                  <p>{selectedCourt.bookingsToday}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Last Maintenance</Label>
                  <p>{selectedCourt.lastMaintenance}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Next Maintenance</Label>
                <p>{selectedCourt.nextMaintenance}</p>
              </div>
              
              {selectedCourt.issues.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Current Issues</Label>
                  <div className="mt-1 space-y-1">
                    {selectedCourt.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedCourt(null)}>
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => handleCourtAction(selectedCourt.id, 'configure')}
              >
                <Wifi className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button
                onClick={() => handleCourtAction(selectedCourt.id, 'monitor')}
              >
                <Activity className="h-4 w-4 mr-2" />
                Monitor
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtMonitor; 