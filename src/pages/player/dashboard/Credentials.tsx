import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <QrCode className="h-5 w-5 text-purple-500" />
          <span>Digital Credential</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                <Badge variant="outline">{digitalCredential.skillLevel}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Membership</span>
                <Badge variant="outline" className="capitalize">{digitalCredential.membershipStatus}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Expires</span>
                <span className="text-sm text-gray-900">{digitalCredential.membershipExpires}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <Badge variant={digitalCredential.verified ? "default" : "secondary"}>
                  {digitalCredential.verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
            </div>
            <div className="pt-4">
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => {
                  // In a real app, this would generate and download a PDF credential
                  console.log('Download digital credential');
                }}
              >
                Download Credential
              </Button>
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
      </CardContent>
    </Card>
  );
};

export default Credentials; 