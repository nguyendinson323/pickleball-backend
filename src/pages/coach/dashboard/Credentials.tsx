import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  Award, 
  Plus, 
  QrCode 
} from 'lucide-react';

interface Credential {
  id: number;
  name: string;
  issuingOrg: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  verificationUrl: string;
}

interface CredentialsProps {
  credentials: Credential[];
}

const Credentials: React.FC<CredentialsProps> = ({ credentials }) => {
  const handleTrainingPlanAction = (planId: number, action: string) => {
    console.log(`${action} training plan ${planId}`);
    // In real app, this would perform the action
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <span>Credentials & Certifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Your Coaching Credentials</h3>
            <Button onClick={() => handleTrainingPlanAction(0, 'add-credential')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Credential
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((credential) => (
              <Card key={credential.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{credential.name}</CardTitle>
                  <p className="text-sm text-gray-600">{credential.issuingOrg}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Issued:</span>
                      <span className="font-medium">{credential.issueDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expires:</span>
                      <span className="font-medium">{credential.expiryDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <Badge className="bg-green-100 text-green-800">
                        {credential.status}
                      </Badge>
                    </div>
                    <div className="pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(credential.verificationUrl, '_blank')}
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                        Verify Online
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Credentials; 