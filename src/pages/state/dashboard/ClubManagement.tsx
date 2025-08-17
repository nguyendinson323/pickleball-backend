import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { 
  Building2, 
  Plus, 
  Eye, 
  Shield, 
  AlertCircle 
} from 'lucide-react';

interface ClubManagementProps {
  clubAffiliations: Array<{
    id: number;
    name: string;
    city: string;
    members: number;
    status: string;
    complianceScore: number;
    lastInspection: string;
    nextInspection: string;
    issues: number;
  }>;
}

const ClubManagement: React.FC<ClubManagementProps> = ({ clubAffiliations }) => {
  const getClubStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClubAction = (clubId: number, action: string) => {
    console.log(`${action} club ${clubId}`);
    // In real app, this would perform the action
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-green-500" />
          <span>Club Affiliation Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Monitor and Manage Club Memberships</h3>
            <Button onClick={() => handleClubAction(0, 'add')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Club
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Club Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead>Last Inspection</TableHead>
                <TableHead>Next Inspection</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubAffiliations.map((club) => (
                <TableRow key={club.id}>
                  <TableCell className="font-medium">{club.name}</TableCell>
                  <TableCell>{club.city}</TableCell>
                  <TableCell>{club.members}</TableCell>
                  <TableCell>
                    <Badge className={getClubStatusColor(club.status)}>
                      {club.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            club.complianceScore >= 90 ? 'bg-green-500' :
                            club.complianceScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${club.complianceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{club.complianceScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{club.lastInspection}</TableCell>
                  <TableCell>{club.nextInspection}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClubAction(club.id, 'view')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClubAction(club.id, 'inspect')}
                      >
                        <Shield className="h-4 w-4 mr-1" />
                        Inspect
                      </Button>
                      {club.issues > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleClubAction(club.id, 'resolve')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Resolve
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

export default ClubManagement; 