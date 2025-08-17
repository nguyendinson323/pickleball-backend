import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
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

  const handleVerificationAction = (verificationId: number, action: string) => {
    console.log(`${action} verification ${verificationId}`);
    // In real app, this would perform the action
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-500" />
          <span>Member Verification System</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Verify Player Credentials and Manage Status</h3>
            <Button onClick={() => handleVerificationAction(0, 'add')}>
              <Plus className="h-4 w-4 mr-2" />
              New Verification
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Verified By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberVerifications.map((verification) => (
                <TableRow key={verification.id}>
                  <TableCell className="font-medium">{verification.name}</TableCell>
                  <TableCell>
                    <Badge variant={
                      verification.type === 'Player' ? 'default' : 'secondary'
                    }>
                      {verification.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{verification.club}</TableCell>
                  <TableCell>{verification.submitted}</TableCell>
                  <TableCell>
                    <Badge className={getVerificationStatusColor(verification.status)}>
                      {verification.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {verification.documents.join(', ')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {verification.verifiedBy || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerificationAction(verification.id, 'view')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {verification.status === 'Pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerificationAction(verification.id, 'approve')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerificationAction(verification.id, 'reject')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Verifications; 