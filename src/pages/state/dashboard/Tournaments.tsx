import React from 'react';
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <span>Tournament Management</span>
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Organize State-Level Tournaments</h3>
            <button 
              onClick={() => handleTournamentAction(0, 'create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Tournament</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tournament</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Participants</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Entry Fee</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((tournament) => (
                  <tr key={tournament.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{tournament.name}</td>
                    <td className="py-3 px-4 text-gray-700">{tournament.date}</td>
                    <td className="py-3 px-4 text-gray-700">{tournament.location}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {tournament.participants}/{tournament.maxParticipants}
                    </td>
                    <td className="py-3 px-4 text-gray-700">${tournament.entryFee}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTournamentStatusColor(tournament.status)}`}>
                        {tournament.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">${tournament.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleTournamentAction(tournament.id, 'view')}
                          className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleTournamentAction(tournament.id, 'edit')}
                          className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                          title="Edit Tournament"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleTournamentAction(tournament.id, 'delete')}
                          className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                          title="Delete Tournament"
                        >
                          <span className="text-xs font-bold">×</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tournament Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Tournaments</p>
                  <p className="text-2xl font-bold text-blue-900">{tournaments.length}</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-900">
                    ${tournaments.reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Total Participants</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {tournaments.reduce((sum, t) => sum + t.participants, 0).toLocaleString()}
                  </p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg font-semibold">👥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Report Generation */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Generate Reports</h4>
            <div className="flex space-x-3">
              <button
                onClick={() => generateReport('participants')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Participant Report
              </button>
              <button
                onClick={() => generateReport('revenue')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Revenue Report
              </button>
              <button
                onClick={() => generateReport('schedule')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Schedule Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournaments; 