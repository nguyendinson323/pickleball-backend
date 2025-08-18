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
  Users,
  Building2,
  Search
} from 'lucide-react';

const CourtManagement = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddingCourt, setIsAddingCourt] = useState(false);
  const [editingCourt, setEditingCourt] = useState<number | null>(null);

  // Mock court data
  const [courts, setCourts] = useState([
    {
      id: 1,
      name: 'Elite Pickleball Club - Court 1',
      club: 'Elite Pickleball Club',
      city: 'Sacramento',
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
      description: 'Premium indoor court with professional surface and LED lighting',
      registeredDate: '2023-06-15',
      contactPerson: 'John Smith',
      contactPhone: '(555) 123-4567'
    },
    {
      id: 2,
      name: 'Community Courts - Court A',
      club: 'Community Courts',
      city: 'Los Angeles',
      type: 'Outdoor',
      surface: 'Concrete',
      lighting: 'Natural',
      status: 'Available',
      maintenance: 'None',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20',
      hourlyRate: 15,
      maxCapacity: 4,
      amenities: ['Net', 'Shade Structure'],
      description: 'Outdoor community court with concrete surface',
      registeredDate: '2023-08-10',
      contactPerson: 'Lisa Johnson',
      contactPhone: '(555) 234-5678'
    },
    {
      id: 3,
      name: 'Pro Training Center - Court 1',
      club: 'Pro Training Center',
      city: 'San Francisco',
      type: 'Indoor',
      surface: 'Professional',
      lighting: 'LED',
      status: 'Maintenance',
      maintenance: 'Surface Repair',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-03-25',
      hourlyRate: 30,
      maxCapacity: 4,
      amenities: ['Net', 'Scoreboard', 'Seating', 'Video Analysis'],
      description: 'Professional training court with video analysis capabilities',
      registeredDate: '2023-05-20',
      contactPerson: 'Mike Rodriguez',
      contactPhone: '(555) 345-6789'
    },
    {
      id: 4,
      name: 'City Park Courts - Court 1',
      club: 'City Park Recreation',
      city: 'San Diego',
      type: 'Outdoor',
      surface: 'Asphalt',
      lighting: 'Natural',
      status: 'Available',
      maintenance: 'None',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-05-10',
      hourlyRate: 10,
      maxCapacity: 4,
      amenities: ['Net'],
      description: 'Public park court with asphalt surface',
      registeredDate: '2023-09-05',
      contactPerson: 'Sarah Wilson',
      contactPhone: '(555) 456-7890'
    }
  ]);

  const [newCourt, setNewCourt] = useState({
    name: '',
    club: '',
    city: '',
    type: 'Indoor',
    surface: 'Professional',
    lighting: 'LED',
    status: 'Available',
    maintenance: 'None',
    lastMaintenance: '',
    nextMaintenance: '',
    hourlyRate: 0,
    maxCapacity: 4,
    amenities: ['Net'],
    description: '',
    contactPerson: '',
    contactPhone: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Reserved': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceColor = (maintenance: string) => {
    switch (maintenance) {
      case 'None': return 'bg-green-100 text-green-800';
      case 'Surface Repair': return 'bg-yellow-100 text-yellow-800';
      case 'Equipment Replacement': return 'bg-orange-100 text-orange-800';
      case 'Major Renovation': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourts = courts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         court.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         court.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = filterCity === 'all' || court.city === filterCity;
    const matchesType = filterType === 'all' || court.type === filterType;
    const matchesStatus = filterStatus === 'all' || court.status === filterStatus;
    return matchesSearch && matchesCity && matchesType && matchesStatus;
  });

  const handleAddCourt = () => {
    if (newCourt.name && newCourt.club && newCourt.city) {
      const court = {
        id: Date.now(),
        ...newCourt,
        registeredDate: new Date().toISOString().split('T')[0]
      };
      setCourts([court, ...courts]);
      setNewCourt({
        name: '',
        club: '',
        city: '',
        type: 'Indoor',
        surface: 'Professional',
        lighting: 'LED',
        status: 'Available',
        maintenance: 'None',
        lastMaintenance: '',
        nextMaintenance: '',
        hourlyRate: 0,
        maxCapacity: 4,
        amenities: ['Net'],
        description: '',
        contactPerson: '',
        contactPhone: ''
      });
      setIsAddingCourt(false);
    }
  };

  const handleEditCourt = (id: number) => {
    const court = courts.find(c => c.id === id);
    if (court) {
      setNewCourt({
        name: court.name,
        club: court.club,
        city: court.city,
        type: court.type,
        surface: court.surface,
        lighting: court.lighting,
        status: court.status,
        maintenance: court.maintenance,
        lastMaintenance: court.lastMaintenance,
        nextMaintenance: court.nextMaintenance,
        hourlyRate: court.hourlyRate,
        maxCapacity: court.maxCapacity,
        amenities: court.amenities,
        description: court.description,
        contactPerson: court.contactPerson,
        contactPhone: court.contactPhone
      });
      setEditingCourt(id);
      setIsAddingCourt(true);
    }
  };

  const handleUpdateCourt = () => {
    if (editingCourt && newCourt.name && newCourt.club && newCourt.city) {
      setCourts(courts.map(c => 
        c.id === editingCourt ? { ...c, ...newCourt } : c
      ));
      setNewCourt({
        name: '',
        club: '',
        city: '',
        type: 'Indoor',
        surface: 'Professional',
        lighting: 'LED',
        status: 'Available',
        maintenance: 'None',
        lastMaintenance: '',
        nextMaintenance: '',
        hourlyRate: 0,
        maxCapacity: 4,
        amenities: ['Net'],
        description: '',
        contactPerson: '',
        contactPhone: ''
      });
      setEditingCourt(null);
      setIsAddingCourt(false);
    }
  };

  const handleDeleteCourt = (id: number) => {
    setCourts(courts.filter(c => c.id !== id));
  };

  const handleAmenityChange = (index: number, value: string) => {
    setNewCourt(prev => ({
      ...prev,
      amenities: prev.amenities.map((amenity, i) => i === index ? value : amenity)
    }));
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

  const courtStats = {
    total: courts.length,
    available: courts.filter(c => c.status === 'Available').length,
    maintenance: courts.filter(c => c.status === 'Maintenance').length,
    indoor: courts.filter(c => c.type === 'Indoor').length,
    outdoor: courts.filter(c => c.type === 'Outdoor').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center animate-on-scroll">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Court Management</h1>
            <p className="text-gray-600">Manage and monitor all registered courts across the federation</p>
          </div>
          <button
            onClick={() => setIsAddingCourt(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Court</span>
          </button>
        </div>

        {/* Court Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8 animate-on-scroll">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courts</p>
                <p className="text-2xl font-bold text-blue-600">{courtStats.total}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{courtStats.available}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{courtStats.maintenance}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Indoor</p>
                <p className="text-2xl font-bold text-purple-600">{courtStats.indoor}</p>
              </div>
              <Building2 className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outdoor</p>
                <p className="text-2xl font-bold text-orange-600">{courtStats.outdoor}</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-8 animate-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Cities</option>
                <option value="Sacramento">Sacramento</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="San Francisco">San Francisco</option>
                <option value="San Diego">San Diego</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Reserved">Reserved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add New Court Form */}
        {isAddingCourt && (
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-8 animate-on-scroll">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingCourt ? 'Edit Court' : 'Register New Court'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="courtName" className="block text-sm font-medium text-gray-700 mb-1">Court Name</label>
                <input
                  type="text"
                  id="courtName"
                  value={newCourt.name}
                  onChange={(e) => setNewCourt({...newCourt, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
                <input
                  type="text"
                  id="clubName"
                  value={newCourt.club}
                  onChange={(e) => setNewCourt({...newCourt, club: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  value={newCourt.city}
                  onChange={(e) => setNewCourt({...newCourt, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="courtType" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  id="courtType"
                  value={newCourt.type}
                  onChange={(e) => setNewCourt({...newCourt, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="surface" className="block text-sm font-medium text-gray-700 mb-1">Surface</label>
                <select
                  id="surface"
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
                <label htmlFor="lighting" className="block text-sm font-medium text-gray-700 mb-1">Lighting</label>
                <select
                  id="lighting"
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
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                <input
                  type="number"
                  id="hourlyRate"
                  value={newCourt.hourlyRate}
                  onChange={(e) => setNewCourt({...newCourt, hourlyRate: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  id="contactPerson"
                  value={newCourt.contactPerson}
                  onChange={(e) => setNewCourt({...newCourt, contactPerson: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  id="contactPhone"
                  value={newCourt.contactPhone}
                  onChange={(e) => setNewCourt({...newCourt, contactPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                value={newCourt.description}
                onChange={(e) => setNewCourt({...newCourt, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
              <div className="space-y-2">
                {newCourt.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={amenity}
                      onChange={(e) => handleAmenityChange(index, e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Net, Scoreboard, Seating"
                    />
                    {newCourt.amenities.length > 1 && (
                      <button
                        onClick={() => removeAmenity(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addAmenity}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
                >
                  Add Amenity
                </button>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleAddCourt}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                {editingCourt ? 'Save Changes' : 'Register Court'}
              </button>
              <button
                onClick={() => setIsAddingCourt(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Courts List */}
        <div className="space-y-6 animate-on-scroll">
          {filteredCourts.map((court) => (
            <div key={court.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    <MapPin className="h-5 w-5 text-blue-500 inline-block mr-2" />
                    {court.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <Users className="h-4 w-4 inline-block mr-1" /> {court.club} • <MapPin className="h-4 w-4 inline-block mr-1" /> {court.city} • <Calendar className="h-4 w-4 inline-block mr-1" /> {court.type} • <Building2 className="h-4 w-4 inline-block mr-1" /> {court.surface} • <Clock className="h-4 w-4 inline-block mr-1" /> {court.lighting}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCourt(court.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourt(court.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(court.status)}`}>
                    {court.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Maintenance</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getMaintenanceColor(court.maintenance)}`}>
                    {court.maintenance}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Hourly Rate</p>
                  <p className="text-lg font-semibold text-green-600">${court.hourlyRate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Max Capacity</p>
                  <p className="text-lg font-semibold text-blue-600">{court.maxCapacity}</p>
                </div>
              </div>

              {/* Description */}
              {court.description && (
                <div className="mt-4">
                  <p className="text-gray-700 mt-1">{court.description}</p>
                </div>
              )}

              {/* Amenities */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">Amenities</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {court.amenities.map((amenity, index) => (
                    <span key={index} className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Contact Person:</span>
                    <p className="font-medium">{court.contactPerson}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Contact Phone:</span>
                    <p className="font-medium">{court.contactPhone}</p>
                  </div>
                </div>
              </div>

              {/* Registration and Maintenance */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Registration & Maintenance</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Registered Date:</span>
                    <p className="font-medium">{court.registeredDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Maintenance:</span>
                    <p className="font-medium">{court.lastMaintenance}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Next Maintenance:</span>
                    <p className="font-medium">{court.nextMaintenance}</p>
                  </div>
                </div>
              </div>

              {/* Edit Mode */}
              {editingCourt === court.id && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Edit Court</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={newCourt.status}
                        onChange={(e) => setNewCourt({...newCourt, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Available">Available</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance</label>
                      <select
                        value={newCourt.maintenance}
                        onChange={(e) => setNewCourt({...newCourt, maintenance: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="None">None</option>
                        <option value="Surface Repair">Surface Repair</option>
                        <option value="Equipment Replacement">Equipment Replacement</option>
                        <option value="Major Renovation">Major Renovation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                      <input
                        type="number"
                        value={newCourt.hourlyRate}
                        onChange={(e) => setNewCourt({...newCourt, hourlyRate: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourtManagement; 