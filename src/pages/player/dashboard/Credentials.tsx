import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { toast } from 'sonner';

interface DigitalCredential {
  id: string;
  playerName: string;
  playerId: string;
  skillLevel: string;
  membershipType: string;
  membershipExpiry: string;
  qrCode: string;
  photo?: string;
  status: 'active' | 'expired' | 'pending';
  issuedDate: string;
  lastVerified: string;
  verificationCode: string;
}

const Credentials: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<DigitalCredential | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Mock data - in real app this would come from API
  const [credentials, setCredentials] = useState<DigitalCredential[]>([
    {
      id: '1',
      playerName: user?.name || 'Player Name',
      playerId: 'PB-2024-001',
      skillLevel: '4.0',
      membershipType: 'Premium',
      membershipExpiry: '2025-03-20',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PB-2024-001',
      status: 'active',
      issuedDate: '2024-03-20',
      lastVerified: '2024-03-25',
      verificationCode: 'PB2024001'
    }
  ]);

  const [newCredential, setNewCredential] = useState({
    skillLevel: '',
    membershipType: 'Basic',
    photo: null as File | null
  });

  const handleGenerateQR = (credential: DigitalCredential) => {
    setSelectedCredential(credential);
    setShowQRModal(true);
  };

  const handleVerifyCredential = (credential: DigitalCredential) => {
    setSelectedCredential(credential);
    setShowVerificationModal(true);
  };

  const confirmVerification = () => {
    if (verificationCode === selectedCredential?.verificationCode) {
      toast.success('Credential verified successfully!');
      setShowVerificationModal(false);
      setVerificationCode('');
      setSelectedCredential(null);
    } else {
      toast.error('Invalid verification code. Please try again.');
    }
  };

  const downloadCredential = (credential: DigitalCredential) => {
    // In a real app, this would generate and download a PDF credential
    toast.success('Credential downloaded successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Basic': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const daysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Digital Credentials</h2>
          <p className="text-gray-600">Your official pickleball player identification and credentials</p>
        </div>
        <button
          onClick={() => setShowQRModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
          </svg>
          View QR Code
        </button>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {credentials.map((credential) => (
          <div key={credential.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {/* Credential Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Pickleball Player Credential</h3>
                  <p className="text-blue-100 text-sm">Official Federation ID</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{credential.playerId}</div>
                  <div className="text-blue-100 text-xs">Player ID</div>
                </div>
              </div>
            </div>

            {/* Credential Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Player Name</label>
                  <p className="text-sm font-semibold text-gray-900">{credential.playerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Skill Level</label>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {credential.skillLevel}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Membership Type</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMembershipColor(credential.membershipType)}`}>
                    {credential.membershipType}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(credential.status)}`}>
                    {credential.status.charAt(0).toUpperCase() + credential.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Issued Date</label>
                  <p className="text-sm text-gray-900">{new Date(credential.issuedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Expiry Date</label>
                  <p className={`text-sm font-semibold ${isExpired(credential.membershipExpiry) ? 'text-red-600' : 'text-gray-900'}`}>
                    {new Date(credential.membershipExpiry).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Expiry Warning */}
              {!isExpired(credential.membershipExpiry) && daysUntilExpiry(credential.membershipExpiry) <= 30 && (
                <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-sm text-yellow-800">
                      Your membership expires in {daysUntilExpiry(credential.membershipExpiry)} days. 
                      <a href="/membership" className="underline ml-1">Renew now</a>
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleGenerateQR(credential)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                  </svg>
                  Show QR Code
                </button>
                <button
                  onClick={() => handleVerifyCredential(credential)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verify
                </button>
                <button
                  onClick={() => downloadCredential(credential)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Credential Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">How to Use Your Digital Credential</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Present your QR code at tournaments and events for quick verification
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Use your verification code for online tournament registrations
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Download and print for physical verification when needed
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Security Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Unique QR code linked to your player profile
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verification code for secure online access
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Real-time status updates and expiry notifications
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Your Digital Credential QR Code</h3>
              
              <div className="text-center space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img 
                    src={credentials[0]?.qrCode} 
                    alt="QR Code" 
                    className="mx-auto w-48 h-48"
                  />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Player ID: <span className="font-semibold text-gray-900">{credentials[0]?.playerId}</span></p>
                  <p className="text-sm text-gray-600">Verification Code: <span className="font-semibold text-gray-900">{credentials[0]?.verificationCode}</span></p>
                  <p className="text-sm text-gray-600">Status: <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(credentials[0]?.status || 'active')}`}>
                    {credentials[0]?.status?.charAt(0).toUpperCase() + credentials[0]?.status?.slice(1)}
                  </span></p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> This QR code contains your player information and can be scanned by tournament officials and club staff for quick verification.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowQRModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && selectedCredential && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Verify Your Credential</h3>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Enter your verification code to confirm your credential is valid and active.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter your verification code"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="text-sm text-gray-600">
                  <p><strong>Your verification code:</strong> {selectedCredential.verificationCode}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowVerificationModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={confirmVerification}
                >
                  Verify Credential
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Credentials; 