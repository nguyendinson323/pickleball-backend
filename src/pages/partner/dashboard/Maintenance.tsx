import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { 
  Wrench, 
  Plus, 
  Eye, 
  Edit3, 
  CheckCircle 
} from 'lucide-react';

interface MaintenanceProps {
  maintenanceSchedule: Array<{
    id: number;
    courtName: string;
    type: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    technician: string;
    cost: number;
  }>;
}

const Maintenance: React.FC<MaintenanceProps> = ({ maintenanceSchedule }) => {
  const getMaintenanceStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMaintenanceAction = (maintenanceId: number, action: string) => {
    console.log(`${action} maintenance ${maintenanceId}`);
    // In real app, this would perform the action
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wrench className="h-5 w-5 text-orange-500" />
          <span>Maintenance Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Track Court Maintenance and Repairs</h3>
            <Button onClick={() => handleMaintenanceAction(0, 'schedule')}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Court</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceSchedule.map((maintenance) => (
                <TableRow key={maintenance.id}>
                  <TableCell className="font-medium">{maintenance.courtName}</TableCell>
                  <TableCell>
                    <Badge variant={
                      maintenance.type === 'Emergency' ? 'destructive' :
                      maintenance.type === 'Scheduled' ? 'default' : 'secondary'
                    }>
                      {maintenance.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{maintenance.description}</TableCell>
                  <TableCell>{maintenance.startDate}</TableCell>
                  <TableCell>{maintenance.endDate}</TableCell>
                  <TableCell>
                    <Badge className={getMaintenanceStatusColor(maintenance.status)}>
                      {maintenance.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{maintenance.technician}</TableCell>
                  <TableCell>${maintenance.cost}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMaintenanceAction(maintenance.id, 'view')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMaintenanceAction(maintenance.id, 'edit')}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {maintenance.status === 'In Progress' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMaintenanceAction(maintenance.id, 'complete')}
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

export default Maintenance; 