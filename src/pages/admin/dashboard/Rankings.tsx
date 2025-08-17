import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { 
  Trophy,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Eye
} from 'lucide-react';

interface RankingIssue {
  id: number;
  player: string;
  currentRank: number;
  requestedRank: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted: string;
}

interface RankingsProps {
  rankingIssues: RankingIssue[];
}

const Rankings: React.FC<RankingsProps> = ({ rankingIssues }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<RankingIssue | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleRankingAction = (issueId: number, action: 'approve' | 'reject') => {
    // Handle ranking approval/rejection logic
    console.log(`Ranking ${action} for issue ${issueId}`);
  };

  const generateCSVReport = () => {
    // Generate CSV report logic
    console.log('Generating CSV report for rankings');
  };

  const filteredIssues = rankingIssues.filter(issue => {
    const matchesSearch = issue.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: rankingIssues.length,
    pending: rankingIssues.filter(i => i.status === 'pending').length,
    approved: rankingIssues.filter(i => i.status === 'approved').length,
    rejected: rankingIssues.filter(i => i.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rankings Management</h2>
          <p className="text-gray-600">Manage player ranking requests and adjustments</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={generateCSVReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Trophy className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-gray-600">ranking requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-600">awaiting decision</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-gray-600">rankings updated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <p className="text-xs text-gray-600">requests denied</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search Requests</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by player name or reason..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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

      {/* Rankings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Current Rank</TableHead>
                <TableHead>Requested Rank</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.player}</TableCell>
                  <TableCell>
                    <Badge variant="outline">#{issue.currentRank}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">#{issue.requestedRank}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={issue.reason}>
                    {issue.reason}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(issue.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(issue.status)}
                        <span className="capitalize">{issue.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{issue.submitted}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedIssue(issue)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {issue.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRankingAction(issue.id, 'approve')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRankingAction(issue.id, 'reject')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredIssues.length === 0 && (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No ranking requests found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Ranking Request Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedIssue(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Player</Label>
                  <p className="font-medium">{selectedIssue.player}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Submitted</Label>
                  <p>{selectedIssue.submitted}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Current Rank</Label>
                  <Badge variant="outline" className="text-lg">#{selectedIssue.currentRank}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Requested Rank</Label>
                  <Badge variant="outline" className="text-lg">#{selectedIssue.requestedRank}</Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Reason for Change</Label>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedIssue.reason}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <Badge className={`mt-1 ${getStatusColor(selectedIssue.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(selectedIssue.status)}
                    <span className="capitalize">{selectedIssue.status}</span>
                  </div>
                </Badge>
              </div>
            </div>
            
            {selectedIssue.status === 'pending' && (
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedIssue(null)}>
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleRankingAction(selectedIssue.id, 'reject')}
                  className="text-red-600 hover:text-red-700"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Request
                </Button>
                <Button
                  onClick={() => handleRankingAction(selectedIssue.id, 'approve')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Request
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rankings; 