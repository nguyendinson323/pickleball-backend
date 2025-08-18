import React from 'react';

interface ReportsProps {
  // Add any props if needed
}

const Reports: React.FC<ReportsProps> = () => {
  const generateReport = (type: string) => {
    console.log(`Generating ${type} report`);
    // In real app, this would generate and download a report
  };

  return (
    <div className="animate-on-scroll bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="animate-on-scroll text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Reports & Analytics</span>
        </h2>
      </div>
      <div className="px-6 py-4">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="animate-on-scroll text-lg font-medium">Generate Business Reports</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="animate-on-scroll bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h4 className="animate-on-scroll text-sm font-medium">Court Usage Report</h4>
              </div>
              <div className="px-4 py-3">
                <p className="animate-on-scroll text-sm text-gray-600 mb-3">
                  Track court utilization, revenue, and booking patterns
                </p>
                <button 
                  className="animate-on-scroll inline-flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => generateReport('court-usage')}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Report
                </button>
              </div>
            </div>

            <div className="animate-on-scroll bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h4 className="animate-on-scroll text-sm font-medium">Financial Report</h4>
              </div>
              <div className="px-4 py-3">
                <p className="animate-on-scroll text-sm text-gray-600 mb-3">
                  Revenue, expenses, and profit analysis
                </p>
                <button 
                  className="animate-on-scroll inline-flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => generateReport('financial')}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Report
                </button>
              </div>
            </div>

            <div className="animate-on-scroll bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h4 className="animate-on-scroll text-sm font-medium">Member Report</h4>
              </div>
              <div className="px-4 py-3">
                <p className="animate-on-scroll text-sm text-gray-600 mb-3">
                  Member statistics and participation data
                </p>
                <button 
                  className="animate-on-scroll inline-flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => generateReport('members')}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Report
                </button>
              </div>
            </div>

            <div className="animate-on-scroll bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h4 className="animate-on-scroll text-sm font-medium">Tournament Report</h4>
              </div>
              <div className="px-4 py-3">
                <p className="animate-on-scroll text-sm text-gray-600 mb-3">
                  Tournament performance and financial data
                </p>
                <button 
                  className="animate-on-scroll inline-flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => generateReport('tournaments')}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Report
                </button>
              </div>
            </div>

            <div className="animate-on-scroll bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h4 className="animate-on-scroll text-sm font-medium">Invoice Report</h4>
              </div>
              <div className="px-4 py-3">
                <p className="animate-on-scroll text-sm text-gray-600 mb-3">
                  Payment status and outstanding invoices
                </p>
                <button 
                  className="animate-on-scroll inline-flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => generateReport('invoices')}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Report
                </button>
              </div>
            </div>

            <div className="animate-on-scroll bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h4 className="animate-on-scroll text-sm font-medium">Custom Report</h4>
              </div>
              <div className="px-4 py-3">
                <p className="animate-on-scroll text-sm text-gray-600 mb-3">
                  Create custom reports with specific criteria
                </p>
                <button 
                  className="animate-on-scroll inline-flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => generateReport('custom')}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Create Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 