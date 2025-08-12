import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
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
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      hourlyRate: 10,
      maxCapacity: 4,
      amenities: ['Net'],
      description: 'Public park court with asphalt surface',
      registeredDate: '2023-07-05',
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
    hourlyRate: 25,
    maxCapacity: 4,
    description: '',
    amenities: [''],
    contactPerson: '',
    contactPhone: ''
  });

  const handleAddCourt = () => {
    if (newCourt.name && newCourt.club && newCourt.city) {
      const court = {
        id: courts.length + 1,
        ...newCourt,
        status: 'Available',
        maintenance: 'None',
        lastMaintenance: new Date().toISOString().split('T')[0],
        nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amenities: newCourt.amenities.filter(amenity => amenity.trim() !== ''),
        registeredDate: new Date().toISOString().split('T')[0]
      };
      setCourts([...courts, court]);
      setNewCourt({
        name: '',
        club: '',
        city: '',
        type: 'Indoor',
        surface: 'Professional',
        lighting: 'LED',
        hourlyRate: 25,
        maxCapacity: 4,
        description: '',
        amenities: [''],
        contactPerson: '',
        contactPhone: ''
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

  const filteredCourts = courts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         court.club.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = filterCity === 'all' || court.city === filterCity;
    const matchesType = filterType === 'all' || court.type === filterType;
    const matchesStatus = filterStatus === 'all' || court.status === filterStatus;

    return matchesSearch && matchesCity && matchesType && matchesStatus;
  });

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
    maintenance: courts.filter(c => c.status === 'Maintenance').length,
    indoor: courts.filter(c => c.type === 'Indoor').length,
    outdoor: courts.filter(c => c.type === 'Outdoor').length,
    cities: Array.from(new Set(courts.map(c => c.city))).length
  };

  const cities = Array.from(new Set(courts.map(c => c.city))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Court Management</h1>
            <p className="text-gray-600">Manage courts across your state and track their status</p>
          </div>
          <Button onClick={() => setIsAddingCourt(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Register New Court</span>
          </Button>
        </div>

        {/* Court Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
              <MapPin className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{courtStats.total}</div>
              <p className="text-xs text-gray-600">registered courts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{courtStats.available}</div>
              <p className="text-xs text-gray-600">ready for use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Maintenance</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{courtStats.maintenance}</div>
              <p className="text-xs text-gray-600">currently unavailable</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Indoor Courts</CardTitle>
              <Building2 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{courtStats.indoor}</div>
              <p className="text-xs text-gray-600">climate controlled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outdoor Courts</CardTitle>
              <MapPin className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{courtStats.outdoor}</div>
              <p className="text-xs text-gray-600">natural lighting</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cities Covered</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{courtStats.cities}</div>
              <p className="text-xs text-gray-600">across state</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search Courts</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by court name or club..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cityFilter">City</Label>
                <Select value={filterCity} onValueChange={setFilterCity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="typeFilter">Court Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Indoor">Indoor</SelectItem>
                    <SelectItem value="Outdoor">Outdoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="statusFilter">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Add New Court Form */}
        {isAddingCourt && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Register New Court</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="courtName">Court Name</Label>
                  <Input
                    id="courtName"
                    value={newCourt.name}
                    onChange={(e) => setNewCourt({...newCourt, name: e.target.value})}
                    placeholder="e.g., Court 1"
                  />
                </div>
                <div>
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    value={newCourt.club}
                    onChange={(e) => setNewCourt({...newCourt, club: e.target.value})}
                    placeholder="e.g., Elite Pickleball Club"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newCourt.city}
                    onChange={(e) => setNewCourt({...newCourt, city: e.target.value})}
                    placeholder="e.g., Sacramento"
                  />
                </div>
                <div>
                  <Label htmlFor="courtType">Type</Label>
                  <Select value={newCourt.type} onValueChange={(value) => setNewCourt({...newCourt, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Indoor">Indoor</SelectItem>
                      <SelectItem value="Outdoor">Outdoor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label htmlFor="surface">Surface</Label>
                  <Select value={newCourt.surface} onValueChange={(value) => setNewCourt({...newCourt, surface: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Concrete">Concrete</SelectItem>
                      <SelectItem value="Asphalt">Asphalt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lighting">Lighting</Label>
                  <Select value={newCourt.lighting} onValueChange={(value) => setNewCourt({...newCourt, lighting: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LED">LED</SelectItem>
                      <SelectItem value="Natural">Natural</SelectItem>
                      <SelectItem value="Fluorescent">Fluorescent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={newCourt.hourlyRate}
                    onChange={(e) => setNewCourt({...newCourt, hourlyRate: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={newCourt.contactPerson}
                    onChange={(e) => setNewCourt({...newCourt, contactPerson: e.target.value})}
                    placeholder="e.g., John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={newCourt.contactPhone}
                    onChange={(e) => setNewCourt({...newCourt, contactPhone: e.target.value})}
                    placeholder="e.g., (555) 123-4567"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newCourt.description}
                  onChange={(e) => setNewCourt({...newCourt, description: e.target.value})}
                  placeholder="Brief description of the court"
                />
              </div>
              <div className="mt-4">
                <Label>Amenities</Label>
                <div className="space-y-2">
                  {newCourt.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={amenity}
                        onChange={(e) => updateAmenity(index, e.target.value)}
                        placeholder="e.g., Net, Scoreboard, Seating"
                      />
                      {newCourt.amenities.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAmenity(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addAmenity}
                  >
                    Add Amenity
                  </Button>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <Button onClick={handleAddCourt}>Register Court</Button>
                <Button variant="outline" onClick={() => setIsAddingCourt(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Courts List */}
        <div className="space-y-6">
          {filteredCourts.map((court) => (
            <Card key={court.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <span>{court.name}</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {court.club} • {court.city} • {court.type} • {court.surface} • {court.lighting}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCourt(editingCourt === court.id ? null : court.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCourt(court.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <Badge className={`mt-1 ${getStatusColor(court.status)}`}>
                      {court.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Maintenance</Label>
                    <Badge className={`mt-1 ${getMaintenanceColor(court.maintenance)}`}>
                      {court.maintenance}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Hourly Rate</Label>
                    <p className="text-lg font-semibold text-green-600">${court.hourlyRate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Max Capacity</Label>
                    <p className="text-lg font-semibold text-blue-600">{court.maxCapacity}</p>
                  </div>
                </div>

                {/* Description */}
                {court.description && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-gray-500">Description</Label>
                    <p className="text-gray-700 mt-1">{court.description}</p>
                  </div>
                )}

                {/* Amenities */}
                <div className="mt-4">
                  <Label className="text-sm font-medium text-gray-500">Amenities</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {court.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
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
                  <h4 className="font-medium text-gray-900 mb-2">Registration & Maintenance</h4>
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
                    <h4 className="font-medium text-gray-900 mb-3">Edit Court</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Status</Label>
                        <Select value={court.status} onValueChange={(value) => handleUpdateCourt(court.id, 'status', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Available">Available</SelectItem>
                            <SelectItem value="Occupied">Occupied</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Maintenance</Label>
                        <Select value={court.maintenance} onValueChange={(value) => handleUpdateCourt(court.id, 'maintenance', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="Surface Repair">Surface Repair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Hourly Rate ($)</Label>
                        <Input
                          type="number"
                          value={court.hourlyRate}
                          onChange={(e) => handleUpdateCourt(court.id, 'hourlyRate', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourtManagement; 