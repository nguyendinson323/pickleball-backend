import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { 
  Server, 
  Database, 
  Settings, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Globe, 
  Lock,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Play,
  Pause,
  Trash2,
  Download,
  Upload,
  BarChart3,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Zap
} from 'lucide-react';

const SystemManagement = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  // Mock system configuration data
  const [systemConfig, setSystemConfig] = useState({
    general: {
      systemName: 'Pickleball Platform',
      version: '2.1.0',
      environment: 'production',
      maintenanceMode: false,
      debugMode: false,
      timezone: 'UTC',
      language: 'English'
    },
    database: {
      host: 'db.pickleball.com',
      port: 5432,
      name: 'pickleball_prod',
      maxConnections: 100,
      connectionTimeout: 30000,
      queryTimeout: 60000,
      backupEnabled: true,
      backupFrequency: 'daily',
      lastBackup: '2024-03-25 02:00 AM'
    },
    security: {
      sessionTimeout: 3600,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireTwoFactor: false,
      sslEnabled: true,
      rateLimitEnabled: true,
      rateLimitRequests: 1000,
      rateLimitWindow: 3600
    },
    email: {
      smtpHost: 'smtp.pickleball.com',
      smtpPort: 587,
      smtpUser: 'noreply@pickleball.com',
      smtpPassword: '••••••••',
      encryption: 'TLS',
      maxRetries: 3,
      retryDelay: 5000
    },
    storage: {
      maxFileSize: 10485760,
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
      storageProvider: 'AWS S3',
      bucketName: 'pickleball-assets',
      cdnEnabled: true,
      cdnUrl: 'https://cdn.pickleball.com'
    }
  });

  const [editedConfig, setEditedConfig] = useState(systemConfig);

  // Mock system health data
  const systemHealth = {
    status: 'healthy',
    uptime: '99.97%',
    lastIncident: '2024-02-15 14:30 PM',
    responseTime: '45ms',
    errorRate: '0.02%',
    activeUsers: 1247,
    databaseConnections: 23,
    memoryUsage: '67%',
    cpuUsage: '45%',
    diskUsage: '78%',
    networkLatency: '12ms'
  };

  const recentSystemEvents = [
    {
      id: 1,
      type: 'Database Backup',
      status: 'success',
      timestamp: '2024-03-25 02:00 AM',
      duration: '15 minutes',
      details: 'Daily backup completed successfully'
    },
    {
      id: 2,
      type: 'Security Scan',
      status: 'success',
      timestamp: '2024-03-24 22:00 PM',
      duration: '45 minutes',
      details: 'Vulnerability scan completed - no issues found'
    },
    {
      id: 3,
      type: 'Performance Optimization',
      status: 'success',
      timestamp: '2024-03-24 18:00 PM',
      duration: '30 minutes',
      details: 'Database query optimization completed'
    },
    {
      id: 4,
      type: 'SSL Certificate',
      status: 'warning',
      timestamp: '2024-03-24 12:00 PM',
      duration: '5 minutes',
      details: 'SSL certificate expires in 30 days'
    }
  ];

  const handleSave = () => {
    setSystemConfig(editedConfig);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedConfig(systemConfig);
    setIsEditing(false);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setEditedConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getEventStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Management</h1>
            <p className="text-gray-600">Configure system settings, monitor health, and manage infrastructure</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Edit Configuration</span>
              </Button>
            )}
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Server className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <Badge className={`${getStatusColor(systemHealth.status)} text-sm`}>
                {systemHealth.status.charAt(0).toUpperCase() + systemHealth.status.slice(1)}
              </Badge>
              <p className="text-xs text-gray-600 mt-1">Uptime: {systemHealth.uptime}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{systemHealth.responseTime}</div>
              <p className="text-xs text-gray-600">average response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{systemHealth.errorRate}</div>
              <p className="text-xs text-gray-600">last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Globe className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{systemHealth.activeUsers}</div>
              <p className="text-xs text-gray-600">currently online</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* System Configuration */}
          <div className="space-y-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-blue-500" />
                  <span>General Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="systemName">System Name</Label>
                    <Input
                      id="systemName"
                      value={isEditing ? editedConfig.general.systemName : systemConfig.general.systemName}
                      onChange={(e) => handleInputChange('general', 'systemName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      value={isEditing ? editedConfig.general.version : systemConfig.general.version}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="environment">Environment</Label>
                    <Select 
                      value={isEditing ? editedConfig.general.environment : systemConfig.general.environment} 
                      onValueChange={(value) => handleInputChange('general', 'environment', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={isEditing ? editedConfig.general.timezone : systemConfig.general.timezone} 
                      onValueChange={(value) => handleInputChange('general', 'timezone', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Maintenance Mode</Label>
                    <p className="text-xs text-gray-600">Temporarily disable system access</p>
                  </div>
                  <Switch
                    checked={isEditing ? editedConfig.general.maintenanceMode : systemConfig.general.maintenanceMode}
                    onCheckedChange={(checked) => handleInputChange('general', 'maintenanceMode', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Debug Mode</Label>
                    <p className="text-xs text-gray-600">Enable detailed logging and debugging</p>
                  </div>
                  <Switch
                    checked={isEditing ? editedConfig.general.debugMode : systemConfig.general.debugMode}
                    onCheckedChange={(checked) => handleInputChange('general', 'debugMode', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Database Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-green-500" />
                  <span>Database Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dbHost">Database Host</Label>
                    <Input
                      id="dbHost"
                      value={isEditing ? editedConfig.database.host : systemConfig.database.host}
                      onChange={(e) => handleInputChange('database', 'host', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dbPort">Port</Label>
                    <Input
                      id="dbPort"
                      type="number"
                      value={isEditing ? editedConfig.database.port : systemConfig.database.port}
                      onChange={(e) => handleInputChange('database', 'port', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dbName">Database Name</Label>
                    <Input
                      id="dbName"
                      value={isEditing ? editedConfig.database.name : systemConfig.database.name}
                      onChange={(e) => handleInputChange('database', 'name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxConnections">Max Connections</Label>
                    <Input
                      id="maxConnections"
                      type="number"
                      value={isEditing ? editedConfig.database.maxConnections : systemConfig.database.maxConnections}
                      onChange={(e) => handleInputChange('database', 'maxConnections', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Backup Enabled</Label>
                    <p className="text-xs text-gray-600">Automated database backups</p>
                  </div>
                  <Switch
                    checked={isEditing ? editedConfig.database.backupEnabled : systemConfig.database.backupEnabled}
                    onCheckedChange={(checked) => handleInputChange('database', 'backupEnabled', checked)}
                    disabled={!isEditing}
                  />
                </div>

                {systemConfig.database.backupEnabled && (
                  <div>
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select 
                      value={isEditing ? editedConfig.database.backupFrequency : systemConfig.database.backupFrequency} 
                      onValueChange={(value) => handleInputChange('database', 'backupFrequency', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-600 mt-1">
                      Last backup: {systemConfig.database.lastBackup}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Security & Performance */}
          <div className="space-y-6">
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (seconds)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={isEditing ? editedConfig.security.sessionTimeout : systemConfig.security.sessionTimeout}
                      onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={isEditing ? editedConfig.security.maxLoginAttempts : systemConfig.security.maxLoginAttempts}
                      onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passwordMinLength">Min Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={isEditing ? editedConfig.security.passwordMinLength : systemConfig.security.passwordMinLength}
                      onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rateLimitRequests">Rate Limit Requests</Label>
                    <Input
                      id="rateLimitRequests"
                      type="number"
                      value={isEditing ? editedConfig.security.rateLimitRequests : systemConfig.security.rateLimitRequests}
                      onChange={(e) => handleInputChange('security', 'rateLimitRequests', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Require Two-Factor</Label>
                    <p className="text-xs text-gray-600">Force 2FA for all users</p>
                  </div>
                  <Switch
                    checked={isEditing ? editedConfig.security.requireTwoFactor : systemConfig.security.requireTwoFactor}
                    onCheckedChange={(checked) => handleInputChange('security', 'requireTwoFactor', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">SSL Enabled</Label>
                    <p className="text-xs text-gray-600">Secure connections only</p>
                  </div>
                  <Switch
                    checked={isEditing ? editedConfig.security.sslEnabled : systemConfig.security.sslEnabled}
                    onCheckedChange={(checked) => handleInputChange('security', 'sslEnabled', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Rate Limiting</Label>
                    <p className="text-xs text-gray-600">Protect against abuse</p>
                  </div>
                  <Switch
                    checked={isEditing ? editedConfig.security.rateLimitEnabled : systemConfig.security.rateLimitEnabled}
                    onCheckedChange={(checked) => handleInputChange('security', 'rateLimitEnabled', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Storage Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HardDrive className="h-5 w-5 text-purple-500" />
                  <span>Storage Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxFileSize">Max File Size (bytes)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={isEditing ? editedConfig.storage.maxFileSize : systemConfig.storage.maxFileSize}
                      onChange={(e) => handleInputChange('storage', 'maxFileSize', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="storageProvider">Storage Provider</Label>
                    <Select 
                      value={isEditing ? editedConfig.storage.storageProvider : systemConfig.storage.storageProvider} 
                      onValueChange={(value) => handleInputChange('storage', 'storageProvider', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AWS S3">AWS S3</SelectItem>
                        <SelectItem value="Google Cloud Storage">Google Cloud Storage</SelectItem>
                        <SelectItem value="Azure Blob Storage">Azure Blob Storage</SelectItem>
                        <SelectItem value="Local Storage">Local Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                  <Input
                    id="allowedFileTypes"
                    value={isEditing ? editedConfig.storage.allowedFileTypes.join(', ') : systemConfig.storage.allowedFileTypes.join(', ')}
                    onChange={(e) => handleInputChange('storage', 'allowedFileTypes', e.target.value.split(', ').map(t => t.trim()))}
                    disabled={!isEditing}
                    placeholder="jpg, jpeg, png, pdf, doc, docx"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">CDN Enabled</Label>
                    <p className="text-xs text-gray-600">Content delivery network</p>
                  </div>
                  <Switch
                    checked={isEditing ? editedConfig.storage.cdnEnabled : systemConfig.storage.cdnEnabled}
                    onCheckedChange={(checked) => handleInputChange('storage', 'cdnEnabled', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Health Monitoring */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span>System Health Monitoring</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{systemHealth.memoryUsage}</div>
                <p className="text-sm text-gray-600">Memory Usage</p>
                <MemoryStick className="h-8 w-8 text-blue-500 mx-auto mt-2" />
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{systemHealth.cpuUsage}</div>
                <p className="text-sm text-gray-600">CPU Usage</p>
                <Cpu className="h-8 w-8 text-green-500 mx-auto mt-2" />
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{systemHealth.diskUsage}</div>
                <p className="text-sm text-gray-600">Disk Usage</p>
                <HardDrive className="h-8 w-8 text-purple-500 mx-auto mt-2" />
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{systemHealth.networkLatency}</div>
                <p className="text-sm text-gray-600">Network Latency</p>
                <Network className="h-8 w-8 text-orange-500 mx-auto mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recent System Events</h4>
                <div className="space-y-3">
                  {recentSystemEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className={`p-2 rounded-full ${getEventStatusColor(event.status)}`}>
                        {getEventStatusIcon(event.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-900">{event.type}</h5>
                          <Badge className={getEventStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{event.details}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{event.timestamp}</span>
                          <span>Duration: {event.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh System Status
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download System Logs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Performance Metrics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="h-4 w-4 mr-2" />
                    Run System Diagnostics
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemManagement; 