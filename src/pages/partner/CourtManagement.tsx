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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Court Management</h1>
            <p className="text-gray-600">Manage your courts, schedules, and maintenance</p>
          </div>
          <Button onClick={() => setIsAddingCourt(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Court</span>
          </Button>
        </div>

        {/* Court Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
              <MapPin className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{courtStats.total}</div>
              <p className="text-xs text-gray-600">courts available</p>
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
              <CardTitle className="text-sm font-medium">Occupied</CardTitle>
              <Users className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{courtStats.occupied}</div>
              <p className="text-xs text-gray-600">currently in use</p>
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
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ${courtStats.monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">estimated monthly</p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Court Form */}
        {isAddingCourt && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Court</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="courtName">Court Name</Label>
                  <Input
                    id="courtName"
                    value={newCourt.name}
                    onChange={(e) => setNewCourt({...newCourt, name: e.target.value})}
                    placeholder="e.g., Court 5"
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
                <div>
                  <Label htmlFor="courtSurface">Surface</Label>
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
                  <Label htmlFor="courtLighting">Lighting</Label>
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={newCourt.hourlyRate}
                    onChange={(e) => setNewCourt({...newCourt, hourlyRate: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="maxCapacity">Max Capacity</Label>
                  <Input
                    id="maxCapacity"
                    type="number"
                    value={newCourt.maxCapacity}
                    onChange={(e) => setNewCourt({...newCourt, maxCapacity: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newCourt.description}
                    onChange={(e) => setNewCourt({...newCourt, description: e.target.value})}
                    placeholder="Brief description of the court"
                  />
                </div>
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
                <Button onClick={handleAddCourt}>Add Court</Button>
                <Button variant="outline" onClick={() => setIsAddingCourt(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Courts List */}
        <div className="space-y-6">
          {courts.map((court) => (
            <Card key={court.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <span>{court.name}</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {court.type} • {court.surface} • {court.lighting}
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

                {/* Maintenance Schedule */}
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Maintenance Schedule</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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