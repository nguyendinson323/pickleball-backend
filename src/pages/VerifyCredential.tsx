import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { DigitalCredential } from '../types/api';
import { Shield, CheckCircle, XCircle, QrCode, MapPin, Trophy, Users, Flag, Calendar, ArrowLeft, RefreshCw } from 'lucide-react';

const VerifyCredential: React.FC = () => {
  const { verificationCode } = useParams<{ verificationCode: string }>();
  const navigate = useNavigate();
  const [credential, setCredential] = useState<DigitalCredential | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  useEffect(() => {
    if (verificationCode) {
      verifyCredential(verificationCode);
    }
  }, [verificationCode]);

  const verifyCredential = async (code: string) => {
    setLoading(true);
    setError(null);
    setVerificationAttempts(prev => prev + 1);
    
    try {
      const response = await api.digitalCredentials.verify(code);
      
      // The API client returns the response data directly, not wrapped
      if (response && response.success && response.data) {
        setCredential(response.data);
        setVerified(true);
      } else if (response && response.data) {
        // Fallback for direct data response
        setCredential(response.data);
        setVerified(true);
      } else if (response && (response as any).credential_number) {
        // Direct credential object response (type assertion for flexibility)
        setCredential(response as unknown as DigitalCredential);
        setVerified(true);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      
      // Handle different error response formats
      let errorMessage = 'Failed to verify credential';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.status === 404) {
        errorMessage = 'Credential not found. Please check the verification code.';
      } else if (err.response?.status === 403) {
        errorMessage = 'Credential is not active or has been suspended.';
      } else if (err.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      setError(errorMessage);
      setVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (verificationCode) {
      verifyCredential(verificationCode);
    }
  };

  const handleGoBack = () => {
    navigate('/');
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

  // Loading state with better UX
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Digital Credential</h2>
          <p className="text-gray-600 mb-4">Please wait while we verify your credential...</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Processing verification code: {verificationCode}</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state with retry option
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-500">Possible reasons:</p>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Invalid or expired verification code</li>
                <li>• Credential has been suspended</li>
                <li>• Player account is inactive</li>
                <li>• Network or server error</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                <RefreshCw className="h-4 w-4 inline mr-2" />
                Try Again
              </button>
              
              <button
                onClick={handleGoBack}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                <ArrowLeft className="h-4 w-4 inline mr-2" />
                Go Back Home
              </button>
            </div>

            {verificationAttempts > 1 && (
              <p className="text-xs text-gray-500 mt-4">
                Attempts: {verificationAttempts}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // No credential state
  if (!credential) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <XCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Credential Found</h2>
            <p className="text-gray-600 mb-4">Unable to load credential information.</p>
            <button
              onClick={handleGoBack}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              <ArrowLeft className="h-4 w-4 inline mr-2" />
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state - Display verified credential
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Credential Verified</h1>
          </div>
          <p className="text-lg text-gray-600">
            This digital credential has been successfully verified and is currently active.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Verification Code: {verificationCode}</span>
            <span>•</span>
            <span>Verified: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Credential Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header with Federation Branding */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">PF</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{credential.federation_name}</h2>
                  <p className="text-blue-100 text-sm">Official Player Credential</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold tracking-wider">{credential.credential_number}</div>
                <div className="text-blue-100 text-xs">Credential ID</div>
              </div>
            </div>
          </div>

          {/* Credential Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Verification Summary */}
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800">Verification Successful</h4>
                  <p className="text-sm text-green-700 mt-1">
                    This credential has been verified {credential.verification_count || 1} times. 
                    Last verified: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Security Information</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    This verification confirms that the credential is currently active and valid. 
                    The information displayed is publicly available and has been verified by the Pickleball Federation system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Home
          </button>
          
          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Verify Another Credential
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            For additional verification or questions, please contact the Pickleball Federation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCredential; 