import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import { 
  QrCode, 
  Shield, 
  Users, 
  Trophy, 
  ArrowLeft,
  Camera,
  Smartphone,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const QRScannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [recentScans, setRecentScans] = useState<Array<{
    id: string;
    url: string;
    timestamp: Date;
    verificationCode: string;
  }>>([]);

  const handleScan = (url: string) => {
    // Extract verification code from URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const verificationCode = pathParts[pathParts.indexOf('verify-credential') + 1];
    
    // Add to recent scans
    const newScan = {
      id: Date.now().toString(),
      url,
      timestamp: new Date(),
      verificationCode
    };
    
    setRecentScans(prev => [newScan, ...prev.slice(0, 9)]); // Keep last 10 scans
    
    // Navigate to verification page
    navigate(`/verify-credential/${verificationCode}${urlObj.search}`);
  };

  const handleManualEntry = () => {
    const code = prompt('Enter verification code:');
    if (code && code.trim()) {
      navigate(`/verify-credential/${code.trim()}`);
    }
  };

  if (showScanner) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <QRScanner
            title="Scan Credential QR Code"
            onScan={handleScan}
            onClose={() => setShowScanner(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <QrCode className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Credential QR Scanner</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Scan digital credential QR codes to instantly verify player information, 
            skill levels, and membership status.
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* QR Scanner Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scan QR Code</h3>
              <p className="text-gray-600 mb-4">
                Use your camera to scan a player's digital credential QR code
              </p>
              <button
                onClick={() => setShowScanner(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Start Camera Scanner
              </button>
            </div>
          </div>

          {/* Manual Entry Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Manual Entry</h3>
              <p className="text-gray-600 mb-4">
                Enter a verification code manually if scanning is not available
              </p>
              <button
                onClick={handleManualEntry}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Enter Verification Code
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What You Can Verify</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Player Identity</h4>
                <p className="text-sm text-gray-600">Verify player name, membership status, and federation affiliation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Trophy className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Skill Level</h4>
                <p className="text-sm text-gray-600">Check current NRTP rating and ranking position</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Club Affiliation</h4>
                <p className="text-sm text-gray-600">See club membership and status information</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        {recentScans.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Scans</h3>
            <div className="space-y-3">
              {recentScans.slice(0, 5).map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Verification Code: {scan.verificationCode}
                      </p>
                      <p className="text-xs text-gray-500">
                        {scan.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/verify-credential/${scan.verificationCode}`)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Again
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Security Features</p>
              <ul className="space-y-1">
                <li>• All QR codes contain tamper-proof digital signatures</li>
                <li>• JWT tokens ensure credential authenticity</li>
                <li>• Verification attempts are logged for security</li>
                <li>• Real-time validation against federation database</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">For Tournament Officials</h4>
              <ul className="space-y-1">
                <li>• Scan credentials during player check-in</li>
                <li>• Verify skill levels match tournament divisions</li>
                <li>• Check membership status for eligibility</li>
                <li>• Report any verification issues immediately</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">For Club Staff</h4>
              <ul className="space-y-1">
                <li>• Verify new member credentials</li>
                <li>• Check guest player eligibility</li>
                <li>• Validate coaching certifications</li>
                <li>• Maintain verification logs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScannerPage;