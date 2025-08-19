import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  selectMyDigitalCredential, 
  selectDigitalCredentialsLoading,
  selectDigitalCredentialsError,
  fetchMyDigitalCredential,
  createDigitalCredential,
  regenerateQRCode
} from '../store/slices/digitalCredentialsSlice';
import { toast } from 'sonner';
import { 
  Download, 
  RefreshCw, 
  QrCode, 
  Shield, 
  Trophy, 
  Users, 
  MapPin,
  Flag,
  Calendar,
  Hash,
  Share2,
  Printer,
  Eye
} from 'lucide-react';

interface DigitalIDCardProps {
  className?: string;
}

const DigitalIDCard: React.FC<DigitalIDCardProps> = ({ className = '' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const credential = useSelector(selectMyDigitalCredential);
  const loading = useSelector(selectDigitalCredentialsLoading);
  const error = useSelector(selectDigitalCredentialsError);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  React.useEffect(() => {
    if (!credential) {
      dispatch(fetchMyDigitalCredential());
    }
  }, [dispatch, credential]);

  const handleCreateCredential = async () => {
    try {
      await dispatch(createDigitalCredential()).unwrap();
      toast.success('Digital credential created successfully!');
    } catch (error) {
      toast.error('Failed to create digital credential');
    }
  };

  const handleRegenerateQR = async () => {
    if (!credential) return;
    
    try {
      await dispatch(regenerateQRCode(credential.id)).unwrap();
      toast.success('QR code regenerated successfully!');
    } catch (error) {
      toast.error('Failed to regenerate QR code');
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF credential
    toast.success('Credential download started!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share && credential) {
      try {
        await navigator.share({
          title: 'My Pickleball Digital Credential',
          text: `Check out my official Pickleball Federation credential: ${credential.credential_number}`,
          url: `${window.location.origin}/verify-credential/${credential.verification_code}`
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      if (credential) {
        navigator.clipboard.writeText(`${window.location.origin}/verify-credential/${credential.verification_code}`);
        toast.success('Verification link copied to clipboard!');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'expired': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClubStatusColor = (status: string) => {
    switch (status) {
      case 'club_member': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'independent': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading digital credential...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="border border-red-200 bg-red-50 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Credential</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => dispatch(fetchMyDigitalCredential())}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!credential) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Digital Credential Found</h3>
              <p className="text-gray-600 mb-4">
                You don't have a digital credential yet. Create one to get your official player ID.
              </p>
              <button 
                onClick={handleCreateCredential} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Digital Credential
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className} print:space-y-0`}>
                    {/* Digital ID Card */}
              <div className="overflow-hidden border-2 border-gray-200 shadow-xl rounded-lg print:shadow-none print:border-2 print:absolute print:inset-0 print:w-full print:h-full print:m-0 print:p-0">
        {/* Header with Federation Branding */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-6 print:bg-blue-600">
          {/* Print-only message */}
          <div className="hidden print:block text-center text-white text-sm mb-2">
            Official Pickleball Federation Digital Credential - Print Date: {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center print:bg-white">
                <span className="text-blue-600 font-bold text-lg">PF</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">{credential.federation_name}</h1>
                <p className="text-blue-100 text-sm">Official Player Credential</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold tracking-wider">{credential.credential_number}</div>
              <div className="text-blue-100 text-xs">Credential ID</div>
            </div>
          </div>
        </div>

        {/* Player Information */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Player Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Player Name</label>
                <p className="text-lg font-semibold text-gray-900">{credential.player_name}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">NRTP Level</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                    <Trophy className="h-3 w-3 mr-1" />
                    {credential.nrtp_level || 'Not Rated'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(credential.affiliation_status)}`}>
                    {credential.affiliation_status.charAt(0).toUpperCase() + credential.affiliation_status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">State</label>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-sm font-medium">{credential.state_affiliation || 'Not Specified'}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Nationality</label>
                  <div className="flex items-center space-x-1">
                    <Flag className="h-3 w-3 text-gray-400" />
                    <span className="text-sm font-medium">{credential.nationality}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Club Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getClubStatusColor(credential.club_status)}`}>
                    <Users className="h-3 w-3 mr-1" />
                    {credential.club_status === 'club_member' ? 'Club Member' : 'Independent'}
                  </span>
                </div>
                {credential.club_name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Club</label>
                    <p className="text-sm font-medium">{credential.club_name}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Rankings and Dates */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Ranking Position</label>
                {credential.ranking_position ? (
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="text-lg font-bold text-gray-900">#{credential.ranking_position}</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Not ranked yet</span>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Issued Date</label>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-sm font-medium">
                      {new Date(credential.issued_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {credential.expiry_date && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Expiry Date</label>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-sm font-medium">
                        {new Date(credential.expiry_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}

                {credential.last_verified && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Last Verified</label>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-gray-400" />
                      <span className="text-sm font-medium">
                        {new Date(credential.last_verified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Verification Code</label>
                <div className="flex items-center space-x-1">
                  <Hash className="h-3 w-3 text-gray-400" />
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded print:bg-gray-100 print:text-gray-900">
                    {credential.verification_code}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 print:hidden">
            <button 
              onClick={() => setShowQRModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <QrCode className="h-4 w-4 mr-2" />
              View QR Code
            </button>
            
            <button 
              onClick={handleRegenerateQR}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate QR
            </button>
            
            <button 
              onClick={handleDownload}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>

            <button 
              onClick={handlePrint}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>

            <button 
              onClick={handleShare}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>

            <button 
              onClick={() => setShowFullScreen(true)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              Full Screen
            </button>
          </div>

          {/* Verification Info */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md print:bg-blue-50 print:border-blue-200">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Verification Information</p>
                <p>This credential has been verified {credential.verification_count} times. 
                Last verified: {credential.last_verified ? new Date(credential.last_verified).toLocaleDateString() : 'Never'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Digital Credential QR Code</h3>
              
              <div className="text-center space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img 
                    src={credential.qr_code_url} 
                    alt="QR Code" 
                    className="mx-auto w-48 h-48"
                  />
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-semibold">Credential ID:</span> {credential.credential_number}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Verification Code:</span> {credential.verification_code}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Status:</span> 
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(credential.affiliation_status)}`}>
                      {credential.affiliation_status.charAt(0).toUpperCase() + credential.affiliation_status.slice(1)}
                    </span>
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> This QR code can be scanned by tournament officials and club staff for quick verification.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6 pt-4 border-t">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setShowQRModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Modal */}
      {showFullScreen && (
        <div className="fixed inset-0 bg-gray-900 overflow-y-auto h-full w-full z-50">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-2xl">PF</span>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">{credential.federation_name}</h1>
                      <p className="text-blue-100 text-lg">Official Player Credential</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold tracking-wider">{credential.credential_number}</div>
                    <div className="text-blue-100 text-lg">Credential ID</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Player Details */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-medium text-gray-500 mb-2">Player Name</label>
                      <p className="text-2xl font-semibold text-gray-900">{credential.player_name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">NRTP Level</label>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          <Trophy className="h-4 w-4 mr-2" />
                          {credential.nrtp_level || 'Not Rated'}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(credential.affiliation_status)}`}>
                          {credential.affiliation_status.charAt(0).toUpperCase() + credential.affiliation_status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">State</label>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-lg font-medium">{credential.state_affiliation || 'Not Specified'}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Nationality</label>
                        <div className="flex items-center space-x-2">
                          <Flag className="h-4 w-4 text-gray-400" />
                          <span className="text-lg font-medium">{credential.nationality}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rankings and Dates */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-medium text-gray-500 mb-2">Ranking Position</label>
                      {credential.ranking_position ? (
                        <div className="flex items-center space-x-3">
                          <Trophy className="h-8 w-8 text-yellow-500" />
                          <span className="text-3xl font-bold text-gray-900">#{credential.ranking_position}</span>
                        </div>
                      ) : (
                        <span className="text-lg text-gray-500">Not ranked yet</span>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Issued Date</label>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-lg font-medium">
                            {new Date(credential.issued_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {credential.expiry_date && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Expiry Date</label>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-lg font-medium">
                              {new Date(credential.expiry_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="my-8 border-gray-200" />

                {/* QR Code Section */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Verification QR Code</h3>
                  <div className="bg-gray-50 p-6 rounded-lg inline-block">
                    <img 
                      src={credential.qr_code_url} 
                      alt="QR Code" 
                      className="w-32 h-32"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Scan this QR code to verify the credential
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <div className="p-6 border-t border-gray-200 text-center">
                <button
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => setShowFullScreen(false)}
                >
                  Close Full Screen View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalIDCard; 