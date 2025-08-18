import React from 'react';
import { 
  Shield, 
  Plus, 
  Eye, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

interface VerificationsProps {
  memberVerifications: Array<{
    id: number;
    name: string;
    type: string;
    club: string;
    submitted: string;
    status: string;
    documents: string[];
    verifiedBy: string | null;
    verifiedDate: string | null;
    rejectionReason?: string;
  }>;
}

const Verifications: React.FC<VerificationsProps> = ({ memberVerifications }) => {
  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Player': return 'bg-blue-100 text-blue-800';
      case 'Coach': return 'bg-purple-100 text-purple-800';
      case 'Club Manager': return 'bg-green-100 text-green-800';
      case 'Tournament Director': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVerificationAction = (verificationId: number, action: string) => {
    console.log(`${action} verification ${verificationId}`);
    // In real app, this would perform the action
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-500" />
          <span>Member Verification System</span>
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Verify Player Credentials and Manage Status</h3>
            <button 
              onClick={() => handleVerificationAction(0, 'add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Verification</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Member</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Club</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Submitted</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Documents</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Verified By</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {memberVerifications.map((verification) => (
                  <tr key={verification.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{verification.name}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(verification.type)}`}>
                        {verification.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{verification.club}</td>
                    <td className="py-3 px-4 text-gray-700">{verification.submitted}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getVerificationStatusColor(verification.status)}`}>
                        {verification.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">
                        {verification.documents.join(', ')}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {verification.verifiedBy || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleVerificationAction(verification.id, 'view')}
                          className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {verification.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleVerificationAction(verification.id, 'approve')}
                              className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleVerificationAction(verification.id, 'reject')}
                              className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {verification.status === 'Rejected' && (
                          <button
                            onClick={() => handleVerificationAction(verification.id, 'review')}
                            className="p-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors duration-200"
                            title="Review Rejection"
                          >
                            <Shield className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verification Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Requests</p>
                  <p className="text-2xl font-bold text-blue-900">{memberVerifications.length}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Verified</p>
                  <p className="text-2xl font-bold text-green-900">
                    {memberVerifications.filter(v => v.status === 'Verified').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {memberVerifications.filter(v => v.status === 'Pending').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-lg font-semibold">⏳</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-900">
                    {memberVerifications.filter(v => v.status === 'Rejected').length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="flex space-x-3">
              <button
                onClick={() => handleVerificationAction(0, 'bulk-approve')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Bulk Approve Pending
              </button>
              <button
                onClick={() => handleVerificationAction(0, 'verification-report')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Generate Verification Report
              </button>
              <button
                onClick={() => handleVerificationAction(0, 'standards-update')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 hover:shadow-lg"
              >
                Update Verification Standards
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifications; 