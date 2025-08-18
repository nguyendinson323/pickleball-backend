import React from 'react';
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Indoor': return 'bg-blue-100 text-blue-800';
      case 'Outdoor': return 'bg-green-100 text-green-800';
      case 'Clay': return 'bg-orange-100 text-orange-800';
      case 'Hard': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCourtAction = (courtName: string, action: string) => {
    console.log(`${action} court ${courtName}`);
    // In real app, this would perform the action
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          <span>Court Management</span>
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Manage Court Availability and Maintenance</h3>
            <button 
              onClick={() => handleCourtAction('new', 'add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Court</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Court</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Hourly Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Maintenance</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Next Maintenance</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCourts.map((court) => (
                  <tr key={court.name} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{court.name}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCourtStatusColor(court.status)}`}>
                        {court.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(court.type || 'Indoor')}`}>
                        {court.type || 'Indoor'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      ${court.hourlyRate || 25}/hr
                    </td>
                    <td className="py-3 px-4 text-gray-700">{court.lastMaintenance}</td>
                    <td className="py-3 px-4 text-gray-700">{court.nextMaintenance}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCourtAction(court.name, 'view')}
                          className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                          title="View Court Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleCourtAction(court.name, 'edit')}
                          className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                          title="Edit Court"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        {court.status === 'Maintenance' && (
                          <button
                            onClick={() => handleCourtAction(court.name, 'complete')}
                            className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                            title="Complete Maintenance"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Court Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Courts</p>
                  <p className="text-2xl font-bold text-blue-900">{allCourts.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Available</p>
                  <p className="text-2xl font-bold text-green-900">
                    {allCourts.filter(c => c.status === 'Available').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg font-semibold">✓</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Occupied</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {allCourts.filter(c => c.status === 'Occupied').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-lg font-semibold">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Maintenance</p>
                  <p className="text-2xl font-bold text-red-900">
                    {allCourts.filter(c => c.status === 'Maintenance').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-lg font-semibold">🔧</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="flex space-x-3">
              <button
                onClick={() => handleCourtAction('bulk', 'maintenance')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Schedule Bulk Maintenance
              </button>
              <button
                onClick={() => handleCourtAction('bulk', 'pricing')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Update Pricing
              </button>
              <button
                onClick={() => handleCourtAction('bulk', 'availability')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Set Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtManagement; 