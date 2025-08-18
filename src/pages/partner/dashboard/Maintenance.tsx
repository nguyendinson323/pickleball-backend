import React from 'react';
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  MapPin,
  User,
  Calendar
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
  const totalMaintenance = maintenanceSchedule.length;
  const inProgress = maintenanceSchedule.filter(m => m.status === 'In Progress').length;
  const scheduled = maintenanceSchedule.filter(m => m.status === 'Scheduled').length;
  const completed = maintenanceSchedule.filter(m => m.status === 'Completed').length;
  const totalCost = maintenanceSchedule.reduce((sum, m) => sum + m.cost, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Emergency': return 'bg-red-100 text-red-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Preventive': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress': return <Clock className="h-4 w-4" />;
      case 'Scheduled': return <Calendar className="h-4 w-4" />;
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'Emergency': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-600">{totalMaintenance}</p>
            </div>
            <Wrench className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{inProgress}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{scheduled}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-green-600">${totalCost.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Maintenance Tasks</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {maintenanceSchedule.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <h4 className="font-medium text-gray-900">{task.courtName}</h4>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(task.type)}`}>
                        {task.type}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{task.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Start: {task.startDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">End: {task.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Cost: ${task.cost}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(task.status)}
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{task.technician}</span>
                    </div>
                  </div>
                </div>

                {task.status === 'In Progress' && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-yellow-800">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Work in progress</span>
                    </div>
                  </div>
                )}

                {task.status === 'Scheduled' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-800">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">Scheduled for {task.startDate}</span>
                    </div>
                  </div>
                )}

                {task.status === 'Completed' && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed on {task.endDate}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Upcoming Maintenance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">This Week</h4>
              <div className="space-y-2">
                {maintenanceSchedule
                  .filter(task => task.status === 'Scheduled' && new Date(task.startDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
                  .map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{task.courtName}</span>
                      <span className="text-sm text-gray-600">{task.startDate}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Next Week</h4>
              <div className="space-y-2">
                {maintenanceSchedule
                  .filter(task => task.status === 'Scheduled' && new Date(task.startDate) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && new Date(task.startDate) <= new Date(Date.now() + 14 * 24 * 60 * 60 * 1000))
                  .map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{task.courtName}</span>
                      <span className="text-sm text-gray-600">{task.startDate}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors duration-200">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Schedule Maintenance
              </h4>
              <p className="text-sm text-gray-600">Plan new maintenance tasks</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-left group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors duration-200">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                Mark Complete
              </h4>
              <p className="text-sm text-gray-600">Update task status</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors duration-200">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                Cost Report
              </h4>
              <p className="text-sm text-gray-600">View maintenance costs</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance; 