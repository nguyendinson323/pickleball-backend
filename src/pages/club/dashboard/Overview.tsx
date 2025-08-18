import React from 'react';

interface OverviewProps {
  clubStats: {
    totalMembers: number;
    activeMembers: number;
    totalCourts: number;
    availableCourts: number;
    upcomingEvents: number;
    monthlyRevenue: number;
    averageRating: number;
    totalReviews: number;
    recentActivities: string[];
  };
  courtStatus: Array<{
    id: number;
    name: string;
    status: string;
    currentTime: string;
    nextBooking: string;
  }>;
}

const Overview: React.FC<OverviewProps> = ({ clubStats, courtStatus }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Court Status Overview */}
      <div className="lg:col-span-2">
        <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Court Status Overview</span>
            </h3>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {courtStatus.map((court) => (
                <div key={court.id} className={`animate-on-scroll p-4 rounded-lg border ${
                  court.status === 'Available' ? 'bg-green-50 border-green-200' :
                  court.status === 'Occupied' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="text-center">
                    <h4 className="animate-on-scroll font-medium text-gray-900 mb-1">{court.name}</h4>
                    <span className={`animate-on-scroll inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      court.status === 'Available' ? 'bg-green-100 text-green-800' :
                      court.status === 'Occupied' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {court.status}
                    </span>
                    <p className="animate-on-scroll text-xs text-gray-600 mt-2">{court.currentTime}</p>
                    <p className="animate-on-scroll text-xs text-gray-500">Next: {court.nextBooking}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Recent Activities</span>
          </h3>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-4">
            {clubStats.recentActivities.map((activity, index) => (
              <div key={index} className="animate-on-scroll flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="animate-on-scroll text-sm text-gray-700">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 