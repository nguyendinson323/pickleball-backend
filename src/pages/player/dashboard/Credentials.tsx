import React from 'react';
import { QrCode } from 'lucide-react';

interface DigitalCredential {
  playerId: string;
  fullName: string;
  skillLevel: string;
  membershipStatus: string;
  membershipExpires: string;
  qrCode: string;
  verified: boolean;
  lastVerified: string;
}

interface CredentialsProps {
  digitalCredential: DigitalCredential;
}

const Credentials: React.FC<CredentialsProps> = ({ digitalCredential }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <QrCode className="h-5 w-5 text-purple-500" />
          <span>Digital Credential</span>
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Credential Info */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Player ID</span>
                <span className="text-sm font-bold text-gray-900">{digitalCredential.playerId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Full Name</span>
                <span className="text-sm font-bold text-gray-900">{digitalCredential.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Skill Level</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                  {digitalCredential.skillLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Membership</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300 capitalize">
                  {digitalCredential.membershipStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Expires</span>
                <span className="text-sm text-gray-900">{digitalCredential.membershipExpires}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  digitalCredential.verified 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}>
                  {digitalCredential.verified ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>
            <div className="pt-4">
              <button 
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 hover:shadow-lg"
                onClick={() => {
                  // In a real app, this would generate and download a PDF credential
                  console.log('Download digital credential');
                }}
              >
                Download Credential
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img 
                src={digitalCredential.qrCode} 
                alt="Player QR Code" 
                className="w-32 h-32"
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Scan this QR code to verify player credentials
            </p>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Last verified: {digitalCredential.lastVerified}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials; 