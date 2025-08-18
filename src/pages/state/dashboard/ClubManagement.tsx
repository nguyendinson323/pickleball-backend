import React from 'react';
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

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleClubAction = (clubId: number, action: string) => {
    console.log(`${action} club ${clubId}`);
    // In real app, this would perform the action
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-green-500" />
          <span>Club Affiliation Management</span>
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Monitor and Manage Club Memberships</h3>
            <button 
              onClick={() => handleClubAction(0, 'add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Club</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Club Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">City</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Members</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Compliance Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Inspection</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Next Inspection</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clubAffiliations.map((club) => (
                  <tr key={club.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{club.name}</td>
                    <td className="py-3 px-4 text-gray-700">{club.city}</td>
                    <td className="py-3 px-4 text-gray-700">{club.members}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getClubStatusColor(club.status)}`}>
                        {club.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getComplianceColor(club.complianceScore)}`}
                            style={{ width: `${club.complianceScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{club.complianceScore}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{club.lastInspection}</td>
                    <td className="py-3 px-4 text-gray-700">{club.nextInspection}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleClubAction(club.id, 'view')}
                          className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleClubAction(club.id, 'inspect')}
                          className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                          title="Schedule Inspection"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        {club.issues > 0 && (
                          <button
                            onClick={() => handleClubAction(club.id, 'issues')}
                            className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                            title={`${club.issues} Issues Found`}
                          >
                            <AlertCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Club Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Clubs</p>
                  <p className="text-2xl font-bold text-blue-900">{clubAffiliations.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Active Clubs</p>
                  <p className="text-2xl font-bold text-green-900">
                    {clubAffiliations.filter(c => c.status === 'Active').length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {clubAffiliations.filter(c => c.status === 'Pending Review').length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Avg Compliance</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {Math.round(clubAffiliations.reduce((sum, c) => sum + c.complianceScore, 0) / clubAffiliations.length)}%
                  </p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg font-semibold">📊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="flex space-x-3">
              <button
                onClick={() => handleClubAction(0, 'bulk-inspection')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Schedule Bulk Inspections
              </button>
              <button
                onClick={() => handleClubAction(0, 'compliance-report')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Generate Compliance Report
              </button>
              <button
                onClick={() => handleClubAction(0, 'standards-update')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Update Standards
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubManagement; 