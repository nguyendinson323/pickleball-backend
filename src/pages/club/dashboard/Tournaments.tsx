import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Award, Edit3, BarChart3, Plus } from 'lucide-react';

interface Tournament {
  id: number;
  name: string;
  date: string;
  participants: number;
  maxParticipants: number;
  entryFee: number;
  totalRevenue: number;
  expenses: number;
  profit: number;
  status: string;
}

interface TournamentsProps {
  tournaments: Tournament[];
}

const Tournaments: React.FC<TournamentsProps> = ({ tournaments }) => {
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
            <h3 className="text-lg font-medium">Organize and Manage Tournaments</h3>
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
                <TableHead>Participants</TableHead>
                <TableHead>Entry Fee</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Expenses</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell className="font-medium">{tournament.name}</TableCell>
                  <TableCell>{tournament.date}</TableCell>
                  <TableCell>
                    {tournament.participants}/{tournament.maxParticipants}
                  </TableCell>
                  <TableCell>${tournament.entryFee}</TableCell>
                  <TableCell>${tournament.totalRevenue}</TableCell>
                  <TableCell>${tournament.expenses}</TableCell>
                  <TableCell>
                    <span className={`font-bold ${
                      tournament.profit > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${tournament.profit}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      tournament.status === 'Registration Open' ? 'default' :
                      tournament.status === 'Full' ? 'secondary' : 'outline'
                    }>
                      {tournament.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
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