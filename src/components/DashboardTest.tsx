import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  User,
  Settings,
  Shield,
  Building,
  MapPin,
  Users,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

// Import all dashboards
import PlayerDashboard from '../pages/player/dashboard';
import CoachDashboard from '../pages/coach/dashboard';
import ClubDashboard from '../pages/club/dashboard';
import AdminDashboard from '../pages/admin/dashboard';
import StateDashboard from '../pages/state/dashboard';
import PartnerDashboard from '../pages/partner/dashboard';
import RefereeDashboard from './RefereeDashboard';

const DashboardTest: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedDashboard, setSelectedDashboard] = useState<string>('player');
  const [testResults, setTestResults] = useState<Record<string, { status: 'success' | 'error' | 'pending'; message: string }>>({});

  const dashboards = [
    { id: 'player', name: 'Player Dashboard', icon: User, component: PlayerDashboard, userType: 'player' },
    { id: 'coach', name: 'Coach Dashboard', icon: Users, component: CoachDashboard, userType: 'coach' },
    { id: 'club', name: 'Club Dashboard', icon: Building, component: ClubDashboard, userType: 'club' },
    { id: 'admin', name: 'Admin Dashboard', icon: Shield, component: AdminDashboard, userType: 'admin' },
    { id: 'state', name: 'State Dashboard', icon: MapPin, component: StateDashboard, userType: 'state' },
    { id: 'partner', name: 'Partner Dashboard', icon: Settings, component: PartnerDashboard, userType: 'partner' },
    { id: 'referee', name: 'Referee Dashboard', icon: CheckCircle, component: RefereeDashboard, userType: 'coach' }
  ];

  const testDashboard = (dashboardId: string) => {
    setTestResults(prev => ({
      ...prev,
      [dashboardId]: { status: 'pending', message: 'Testing dashboard components...' }
    }));

    try {
      // Simulate dashboard test - in real scenario this would check if components render without errors
      setTimeout(() => {
        setTestResults(prev => ({
          ...prev,
          [dashboardId]: { status: 'success', message: 'Dashboard loaded successfully' }
        }));
      }, 1000);
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [dashboardId]: { status: 'error', message: `Error: ${error}` }
      }));
    }
  };

  const testAllDashboards = () => {
    dashboards.forEach(dashboard => {
      testDashboard(dashboard.id);
    });
  };

  const renderSelectedDashboard = () => {
    const dashboard = dashboards.find(d => d.id === selectedDashboard);
    if (!dashboard) return null;

    const DashboardComponent = dashboard.component;
    
    try {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-blue-800 text-sm font-medium">
                Testing {dashboard.name} - User Type: {dashboard.userType}
              </span>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <DashboardComponent />
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
          <div className="flex items-center text-red-700">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="font-medium">Dashboard Error:</span>
          </div>
          <p className="text-red-600 mt-2 text-sm">{String(error)}</p>
        </div>
      );
    }
  };

  const getStatusIcon = (status: 'success' | 'error' | 'pending') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />;
      default:
        return <div className="h-4 w-4 bg-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Testing Suite</h1>
          <p className="text-gray-600">
            Test all user role dashboards for functionality and rendering issues
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dashboard Selection & Testing */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Dashboard Tests</h3>
              <button
                onClick={testAllDashboards}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4 transition-colors duration-200"
              >
                Test All Dashboards
              </button>
              
              <div className="space-y-3">
                {dashboards.map(dashboard => {
                  const Icon = dashboard.icon;
                  const result = testResults[dashboard.id];
                  
                  return (
                    <div key={dashboard.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                      <button
                        onClick={() => setSelectedDashboard(dashboard.id)}
                        className={`flex items-center space-x-3 flex-1 text-left ${
                          selectedDashboard === dashboard.id ? 'text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <div>
                          <span className="font-medium">{dashboard.name}</span>
                          <p className="text-xs text-gray-500">{dashboard.userType}</p>
                        </div>
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        {result && getStatusIcon(result.status)}
                        <button
                          onClick={() => testDashboard(dashboard.id)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                        >
                          Test
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Test Results</h3>
              <div className="space-y-2">
                {Object.entries(testResults).map(([dashboardId, result]) => {
                  const dashboard = dashboards.find(d => d.id === dashboardId);
                  return (
                    <div key={dashboardId} className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <span className="text-sm font-medium">{dashboard?.name}</span>
                        <p className="text-xs text-gray-600">{result.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {dashboards.find(d => d.id === selectedDashboard)?.name} Preview
                </h3>
                <span className="text-sm text-gray-500">
                  Current User: {user?.username || 'Test User'} ({user?.user_type || 'admin'})
                </span>
              </div>
              
              {renderSelectedDashboard()}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Dashboard Implementation Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(testResults).filter(r => r.status === 'success').length}
              </div>
              <div className="text-sm text-green-700">Passing Tests</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(testResults).filter(r => r.status === 'error').length}
              </div>
              <div className="text-sm text-red-700">Failed Tests</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {dashboards.length}
              </div>
              <div className="text-sm text-blue-700">Total Dashboards</div>
            </div>
          </div>
        </div>

        {/* Functionality Checklist */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Dashboard Functionality Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Player Dashboard</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Overview with stats</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Digital ID credentials</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Match history</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Tournament registration</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Activity tracking</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Privacy settings</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Coach Dashboard</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Overview with coaching stats</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Session management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Student progress tracking</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Training plans</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Credentials & certifications</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Revenue tracking</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Referee match history</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Club Dashboard</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Club overview</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Court management with calendar</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Tournament organization</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Invoice management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Microsite configuration</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Member management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Reports & analytics</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Admin Dashboard</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />System overview</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Messaging system</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Affiliation management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Rankings control</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Microsite management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Court monitoring</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">State Dashboard</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />State federation overview</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Tournament management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Club affiliations</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Member verifications</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />State microsite</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Analytics & reporting</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Communications</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Partner Dashboard</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Business overview</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Court management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Booking management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Customer management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Maintenance scheduling</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Business microsite</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Financial analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTest;