import { CreditCard, Download, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SchoolBilling = () => {
  const currentBill = {
    amount: "₹3,67,500",
    dueDate: "December 15, 2024",
    status: "pending",
    breakdown: [
      { item: "Design Thinking (68 students)", amount: "₹1,02,000" },
      { item: "Entrepreneurship (85 students)", amount: "₹1,53,000" },
      { item: "AI Skills (52 students)", amount: "₹93,600" },
      { item: "Financial Literacy (40 students)", amount: "₹60,000" },
      { item: "Platform Fee", amount: "-₹41,100" },
    ],
  };

  const paymentHistory = [
    { id: "INV-2024-011", date: "Nov 15, 2024", amount: "₹3,45,000", status: "paid" },
    { id: "INV-2024-010", date: "Oct 15, 2024", amount: "₹3,20,000", status: "paid" },
    { id: "INV-2024-009", date: "Sep 15, 2024", amount: "₹2,85,000", status: "paid" },
    { id: "INV-2024-008", date: "Aug 15, 2024", amount: "₹2,50,000", status: "paid" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Billing & Payments</h2>
        <p className="text-muted-foreground">Manage your subscription and payment history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Bill */}
        <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <CreditCard className="w-5 h-5 text-primary" />
              Current Bill
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-foreground">{currentBill.amount}</p>
              <p className="text-muted-foreground mt-1">Due: {currentBill.dueDate}</p>
              <Badge variant="outline" className="mt-2 border-accent text-accent">
                {currentBill.status === "pending" ? "Payment Pending" : "Paid"}
              </Badge>
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              {currentBill.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.item}</span>
                  <span className="text-foreground font-medium">{item.amount}</span>
                </div>
              ))}
            </div>

            <Button className="w-full">Pay Now</Button>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/50 flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
              <Badge className="bg-green-500">Default</Badge>
            </div>

            <Button variant="outline" className="w-full">Add Payment Method</Button>

            <div className="p-4 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Billing Address</h4>
              <p className="text-sm text-muted-foreground">
                Lincoln High School<br />
                123 Education Lane<br />
                Mumbai, Maharashtra 400001
              </p>
              <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                Edit Address
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Payment History</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">Invoice</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Date</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b border-border last:border-0">
                    <td className="p-3 font-medium text-foreground">{payment.id}</td>
                    <td className="p-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {payment.date}
                      </div>
                    </td>
                    <td className="p-3 text-foreground">{payment.amount}</td>
                    <td className="p-3">
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Paid
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolBilling;
