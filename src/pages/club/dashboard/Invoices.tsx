import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Receipt, Eye, Send, Bell, Plus } from 'lucide-react';

interface Invoice {
  id: string;
  member: string;
  type: string;
  amount: number;
  status: string;
  dueDate: string;
  paidDate: string | null;
}

interface InvoicesProps {
  invoices: Invoice[];
}

const Invoices: React.FC<InvoicesProps> = ({ invoices }) => {
  const handleInvoiceAction = (invoiceId: string, action: string) => {
    console.log(`${action} invoice ${invoiceId}`);
    // In real app, this would perform the action
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Receipt className="h-5 w-5 text-green-500" />
          <span>Invoice & Payment Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Invoices and Payments</h3>
            <Button onClick={() => handleInvoiceAction('new', 'create')}>
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.member}</TableCell>
                  <TableCell>{invoice.type}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{invoice.paidDate || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleInvoiceAction(invoice.id, 'view')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {invoice.status === 'Pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleInvoiceAction(invoice.id, 'send')}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Send
                        </Button>
                      )}
                      {invoice.status === 'Overdue' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleInvoiceAction(invoice.id, 'remind')}
                        >
                          <Bell className="h-4 w-4 mr-1" />
                          Remind
                        </Button>
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

export default Invoices; 