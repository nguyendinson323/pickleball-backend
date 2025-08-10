import React, { useState } from 'react';
import { useAnimation } from '../hooks/useAnimation';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { elementRef: headerRef } = useAnimation();
  const { elementRef: statsRef } = useAnimation();
  const { elementRef: actionsRef } = useAnimation();
  const { elementRef: usersRef } = useAnimation();
  const { elementRef: settingsRef } = useAnimation();

  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: '👥' },
    { label: 'Active Tournaments', value: '23', change: '+5%', icon: '🏆' },
    { label: 'Court Bookings', value: '156', change: '+8%', icon: '🎾' },
    { label: 'Revenue', value: '$45,230', change: '+15%', icon: '💰' }
  ];

  const recentUsers = [
    { name: 'Sarah Johnson', email: 'sarah@email.com', status: 'Active', joinDate: '2024-01-15' },
    { name: 'Mike Chen', email: 'mike@email.com', status: 'Pending', joinDate: '2024-01-14' },
    { name: 'Lisa Rodriguez', email: 'lisa@email.com', status: 'Active', joinDate: '2024-01-13' },
    { name: 'David Kim', email: 'david@email.com', status: 'Suspended', joinDate: '2024-01-12' }
  ];

  const quickActions = [
    { title: 'Add New User', description: 'Create a new user account', icon: '➕', action: () => console.log('Add user') },
    { title: 'Create Tournament', description: 'Set up a new tournament', icon: '🏆', action: () => console.log('Create tournament') },
    { title: 'Manage Courts', description: 'Update court availability', icon: '🎾', action: () => console.log('Manage courts') },
    { title: 'View Reports', description: 'Generate system reports', icon: '📊', action: () => console.log('View reports') }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header ref={headerRef} className="animate-on-scroll bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage the Pickleball Federation platform and users
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {['dashboard', 'users', 'tournaments', 'courts', 'reports', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <section ref={statsRef} className="animate-on-scroll mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Platform Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="animate-on-scroll bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <div className="mt-4">
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section ref={actionsRef} className="animate-on-scroll mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="animate-on-scroll bg-white rounded-lg shadow-sm border p-6 text-left hover:shadow-md transition-all hover:scale-105"
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Users */}
        <section ref={usersRef} className="animate-on-scroll mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Recent Users
          </h2>
          <div className="animate-on-scroll bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user, index) => (
                    <tr key={index} className="animate-on-scroll hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' :
                          user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Settings Section */}
        <section ref={settingsRef} className="animate-on-scroll">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            System Settings
          </h2>
          <div className="animate-on-scroll bg-white rounded-lg shadow-sm border p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email alerts for important events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Maintenance Mode</h3>
                  <p className="text-sm text-gray-500">Temporarily disable platform access</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Auto-backup</h3>
                  <p className="text-sm text-gray-500">Automatically backup data daily</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage; 