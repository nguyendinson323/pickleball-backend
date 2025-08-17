import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { 
  MapPin, 
  Plus, 
  Eye, 
  Edit3, 
  CheckCircle 
} from 'lucide-react';

interface CourtManagementProps {
  allCourts: Array<{
    name: string;
    status: string;
    lastMaintenance: string;
    nextMaintenance: string;
    hourlyRate: number;
    type: string;
  }>;
}

const CourtManagement: React.FC<CourtManagementProps> = ({ allCourts }) => {
  const getCourtStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCourtAction = (courtName: string, action: string) => {
    console.log(`${action} court ${courtName}`);
    // In real app, this would perform the action
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          <span>Court Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Court Availability and Maintenance</h3>
            <Button onClick={() => handleCourtAction('new', 'add')}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Court
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Court</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCourts.map((court) => (
                <TableRow key={court.name}>
                  <TableCell className="font-medium">{court.name}</TableCell>
                  <TableCell>
                    <Badge className={getCourtStatusColor(court.status)}>
                      {court.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {court.type || 'Indoor'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    ${court.hourlyRate || 25}/hr
                  </TableCell>
                  <TableCell>{court.lastMaintenance}</TableCell>
                  <TableCell>{court.nextMaintenance}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCourtAction(court.name, 'view')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCourtAction(court.name, 'edit')}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {court.status === 'Maintenance' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCourtAction(court.name, 'complete')}
                          className="text-green-600 hover:text-green-700"
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
        </div>
      </CardContent>
    </Card>
  );
};

export default CourtManagement; 