import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Calendar, 
  User, 
  MessageSquare, 
  RefreshCw,
  Download,
  Filter,
  Search
} from "lucide-react";

const Tips = () => {
  // Dummy data for the tips table
  const dummyTips = [
    {
      id: 1,
      amount: 25.00,
      currency: "USD",
      message: "Great content! Keep it up!",
      visitor_name: "John Doe",
      visitor_email: "john@example.com",
      created_at: "2024-01-15T10:30:00Z",
      payment_gateway: "Razorpay",
      payment_id: "pay_123456789"
    },
    {
      id: 2,
      amount: 50.00,
      currency: "INR",
      message: "Amazing work!",
      visitor_name: "Sarah Smith",
      visitor_email: "sarah@example.com",
      created_at: "2024-01-14T15:45:00Z",
      payment_gateway: "Razorpay",
      payment_id: "pay_987654321"
    },
    {
      id: 3,
      amount: 15.00,
      currency: "USD",
      message: "",
      visitor_name: "Anonymous",
      visitor_email: "",
      created_at: "2024-01-13T09:20:00Z",
      payment_gateway: "Razorpay",
      payment_id: "pay_456789123"
    },
    {
      id: 4,
      amount: 100.00,
      currency: "INR",
      message: "Thank you for the inspiration!",
      visitor_name: "Mike Johnson",
      visitor_email: "mike@example.com",
      created_at: "2024-01-12T14:15:00Z",
      payment_gateway: "Razorpay",
      payment_id: "pay_789123456"
    },
    {
      id: 5,
      amount: 30.00,
      currency: "USD",
      message: "Love your content!",
      visitor_name: "Emma Wilson",
      visitor_email: "emma@example.com",
      created_at: "2024-01-11T11:30:00Z",
      payment_gateway: "Razorpay",
      payment_id: "pay_321654987"
    }
  ];

  const [tips, setTips] = useState(dummyTips);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const totalAmount = tips.reduce((sum, tip) => sum + tip.amount, 0);
  const totalTips = tips.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tips</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage all your received tips
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 border-2 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Tips
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalTips}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              All time received tips
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Amount
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${totalAmount.toFixed(2)}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Combined value of all tips
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 border-2 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Average Tip
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${(totalAmount / totalTips).toFixed(2)}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Per tip average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tips Table */}
      <Card className="border-2 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    From
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Message
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Payment ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {tips.map((tip) => (
                  <tr 
                    key={tip.id} 
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatAmount(tip.amount, tip.currency)}
                        </span>
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
                          {tip.currency}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {tip.visitor_name || "Anonymous"}
                          </div>
                          {tip.visitor_email && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {tip.visitor_email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {tip.message || "No message"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {formatDate(tip.created_at)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {tip.payment_id}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {tips.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No tips yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Tips from your supporters will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Tips;
