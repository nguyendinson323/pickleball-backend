import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  MapPin, 
  Calendar, 
  Settings, 
  Plus,
  Edit3,
  Trash2,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  DollarSign,
  Users
} from 'lucide-react';

const CourtManagement = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isAddingCourt, setIsAddingCourt] = useState(false);
  const [editingCourt, setEditingCourt] = useState<number | null>(null);

  // Mock court data
  const [courts, setCourts] = useState([
    {
      id: 1,
      name: 'Court 1',
      type: 'Indoor',
      surface: 'Professional',
      lighting: 'LED',
      status: 'Available',
      maintenance: 'None',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      hourlyRate: 25,
      maxCapacity: 4,
      amenities: ['Net', 'Scoreboard', 'Seating'],
      description: 'Premium indoor court with professional surface and LED lighting'
    },
    {
      id: 2,
      name: 'Court 2',
      type: 'Indoor',
      surface: 'Professional',
      lighting: 'LED',
      status: 'Occupied',
      maintenance: 'None',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20',
      hourlyRate: 25,
      maxCapacity: 4,
      amenities: ['Net', 'Scoreboard', 'Seating'],
      description: 'Premium indoor court with professional surface and LED lighting'
    },
    {
      id: 3,
      name: 'Court 3',
      type: 'Outdoor',
      surface: 'Concrete',
      lighting: 'Natural',
      status: 'Maintenance',
      maintenance: 'Surface Repair',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-03-25',
      hourlyRate: 20,
      maxCapacity: 4,
      amenities: ['Net', 'Shade Structure'],
      description: 'Outdoor court with concrete surface and natural lighting'
    },
    {
      id: 4,
      name: 'Court 4',
      type: 'Outdoor',
      surface: 'Concrete',
      lighting: 'Natural',
      status: 'Available',
      maintenance: 'None',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      hourlyRate: 20,
      maxCapacity: 4,
      amenities: ['Net', 'Shade Structure'],
      description: 'Outdoor court with concrete surface and natural lighting'
    }
  ]);

  const [newCourt, setNewCourt] = useState({
    name: '',
    type: 'Indoor',
    surface: 'Professional',
    lighting: 'LED',
    hourlyRate: 25,
    maxCapacity: 4,
    description: '',
    amenities: ['']
  });

  const handleAddCourt = () => {
    if (newCourt.name) {
      const court = {
        id: courts.length + 1,
        ...newCourt,
        status: 'Available',
        maintenance: 'None',
        lastMaintenance: new Date().toISOString().split('T')[0],
        nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amenities: newCourt.amenities.filter(amenity => amenity.trim() !== '')
      };
      setCourts([...courts, court]);
      setNewCourt({
        name: '',
        type: 'Indoor',
        surface: 'Professional',
        lighting: 'LED',
        hourlyRate: 25,
        maxCapacity: 4,
        description: '',
        amenities: ['']
      });
      setIsAddingCourt(false);
    }
  };

  const handleUpdateCourt = (id: number, field: string, value: string | number) => {
    setCourts(courts.map(court => 
      court.id === id ? { ...court, [field]: value } : court
    ));
  };

  const handleDeleteCourt = (id: number) => {
    setCourts(courts.filter(court => court.id !== id));
  };

  const addAmenity = () => {
    setNewCourt(prev => ({
      ...prev,
      amenities: [...prev.amenities, '']
    }));
  };

  const removeAmenity = (index: number) => {
    setNewCourt(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const updateAmenity = (index: number, value: string) => {
    setNewCourt(prev => ({
      ...prev,
      amenities: prev.amenities.map((amenity, i) => i === index ? value : amenity)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceColor = (maintenance: string) => {
    switch (maintenance) {
      case 'None': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Surface Repair': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const courtStats = {
    total: courts.length,
    available: courts.filter(c => c.status === 'Available').length,
    occupied: courts.filter(c => c.status === 'Occupied').length,
    maintenance: courts.filter(c => c.status === 'Maintenance').length,
    monthlyRevenue: courts.reduce((sum, court) => sum + (court.hourlyRate * 8 * 30), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Court Management</h1>
            <p className="text-gray-600">Manage your courts, schedules, and maintenance</p>
          </div>
          <button onClick={() => setIsAddingCourt(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Court</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courts</p>
                <p className="text-2xl font-bold text-gray-900">{courtStats.total}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{courtStats.available}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-yellow-600">{courtStats.occupied}</p>
              </div>
              <Users className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-red-600">{courtStats.maintenance}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">${courtStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Add New Court Form */}
        {isAddingCourt && (
          <div className="bg-white rounded-lg shadow-md mb-8 animate-on-scroll">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Add New Court</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Court Name</label>
                  <input
                    type="text"
                    value={newCourt.name}
                    onChange={(e) => setNewCourt({...newCourt, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Court 5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newCourt.type}
                    onChange={(e) => setNewCourt({...newCourt, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surface</label>
                  <select
                    value={newCourt.surface}
                    onChange={(e) => setNewCourt({...newCourt, surface: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Concrete">Concrete</option>
                    <option value="Asphalt">Asphalt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lighting</label>
                  <select
                    value={newCourt.lighting}
                    onChange={(e) => setNewCourt({...newCourt, lighting: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="LED">LED</option>
                    <option value="Natural">Natural</option>
                    <option value="Fluorescent">Fluorescent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={newCourt.hourlyRate}
                    onChange={(e) => setNewCourt({...newCourt, hourlyRate: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Capacity</label>
                  <input
                    type="number"
                    value={newCourt.maxCapacity}
                    onChange={(e) => setNewCourt({...newCourt, maxCapacity: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="8"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newCourt.description}
                    onChange={(e) => setNewCourt({...newCourt, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the court features..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="space-y-2">
                    {newCourt.amenities.map((amenity, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={amenity}
                          onChange={(e) => updateAmenity(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Net, Scoreboard"
                        />
                        <button
                          onClick={() => removeAmenity(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addAmenity}
                      className="px-3 py-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Amenity
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleAddCourt}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg"
                >
                  Add Court
                </button>
                <button
                  onClick={() => setIsAddingCourt(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Courts List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courts.map((court) => (
            <div key={court.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{court.name}</h3>
                    <p className="text-sm text-gray-600">{court.type} • {court.surface} • {court.lighting}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingCourt(editingCourt === court.id ? null : court.id)}
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourt(court.id)}
                      className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(court.status)}`}>
                      {court.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Maintenance:</span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getMaintenanceColor(court.maintenance)}`}>
                      {court.maintenance}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Hourly Rate:</span>
                    <span className="font-medium text-green-600">${court.hourlyRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Capacity:</span>
                    <span className="font-medium">{court.maxCapacity} players</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700">{court.description}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {court.amenities.map((amenity, index) => (
                      <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Last Maintenance:</span>
                      <p className="font-medium">{court.lastMaintenance}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Next Maintenance:</span>
                      <p className="font-medium">{court.nextMaintenance}</p>
                    </div>
                  </div>
                </div>

                {/* Edit Form */}
                {editingCourt === court.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-3">Edit Court</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={court.status}
                          onChange={(e) => handleUpdateCourt(court.id, 'status', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Maintenance</label>
                        <select
                          value={court.maintenance}
                          onChange={(e) => handleUpdateCourt(court.id, 'maintenance', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="None">None</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Surface Repair">Surface Repair</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Hourly Rate</label>
                        <input
                          type="number"
                          value={court.hourlyRate}
                          onChange={(e) => handleUpdateCourt(court.id, 'hourlyRate', parseInt(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Max Capacity</label>
                        <input
                          type="number"
                          value={court.maxCapacity}
                          onChange={(e) => handleUpdateCourt(court.id, 'maxCapacity', parseInt(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          min="1"
                          max="8"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourtManagement; 