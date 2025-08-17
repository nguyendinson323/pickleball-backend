import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { 
  Award, 
  Plus, 
  Eye, 
  Edit3, 
  BarChart3 
} from 'lucide-react';

interface TournamentsProps {
  tournaments: Array<{
    id: number;
    name: string;
    date: string;
    location: string;
    participants: number;
    maxParticipants: number;
    entryFee: number;
    status: string;
    category: string;
    revenue: number;
  }>;
}

const Tournaments: React.FC<TournamentsProps> = ({ tournaments }) => {
  const getTournamentStatusColor = (status: string) => {
    switch (status) {
      case 'Registration Open': return 'bg-green-100 text-green-800';
      case 'Full': return 'bg-blue-100 text-blue-800';
      case 'Registration Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTournamentAction = (tournamentId: number, action: string) => {
    console.log(`${action} tournament ${tournamentId}`);
    // In real app, this would perform the action
  };

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report`);
    // In real app, this would generate and download a report
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <span>Tournament Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Organize State-Level Tournaments</h3>
            <Button onClick={() => handleTournamentAction(0, 'create')}>
              <Plus className="h-4 w-4 mr-2" />
              New Tournament
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tournament</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Entry Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell className="font-medium">{tournament.name}</TableCell>
                  <TableCell>{tournament.date}</TableCell>
                  <TableCell>{tournament.location}</TableCell>
                  <TableCell>
                    {tournament.participants}/{tournament.maxParticipants}
                  </TableCell>
                  <TableCell>${tournament.entryFee}</TableCell>
                  <TableCell>
                    <Badge className={getTournamentStatusColor(tournament.status)}>
                      {tournament.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${tournament.revenue}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTournamentAction(tournament.id, 'view')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTournamentAction(tournament.id, 'edit')}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generateReport(`tournament-${tournament.id}`)}
                      >
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Report
                      </Button>
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

export default Tournaments; 