import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Calendar, 
  User, 
  MessageSquare, 
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// API service function
const fetchTips = async (creatorId, startDate = null, endDate = null, page = 1, limit = 100) => {
  const baseUrl = "https://pp-backend.apextip.space";
  let url = `${baseUrl}/tip/${creatorId}?page=${page}&limit=${limit}`;
  
  if (startDate) {
    url += `&start_date=${startDate}`;
  }
  if (endDate) {
    url += `&end_date=${endDate}`;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch tips: ${response.statusText}`);
  }
  
  return await response.json();
};

const Tips = ({ startDate, endDate }) => {
  // State management
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 100,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Creator ID - this should come from auth context or props
  const creatorId = "568c6a64"; // Replace with actual creator ID from auth

  // Load tips on component mount and when page changes
  useEffect(() => {
    loadTips();
  }, [creatorId, startDate, endDate, pagination.currentPage]);

  const loadTips = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTips(
        creatorId, 
        convertToUnixTimestamp(startDate), 
        convertToUnixTimestamp(endDate), 
        pagination.currentPage, 
        pagination.limit
      );
      
      if (response.success) {
        setTips(response.data.tips);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || 'Failed to fetch tips');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error loading tips:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    // Handle Unix timestamp (seconds) by converting to milliseconds
    const date = new Date(parseInt(dateString) * 1000);
    return date.toLocaleDateString('en-US', {
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
    }).format(parseFloat(amount) / 100);
  };

  const handleRefresh = () => {
    loadTips();
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  const handlePreviousPage = () => {
    if (pagination.hasPrevPage) {
      handlePageChange(pagination.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      handlePageChange(pagination.currentPage + 1);
    }
  };


  const convertToUnixTimestamp = (dateString) => {
    if (!dateString) return null;
    return Math.floor(new Date(dateString).getTime() / 1000);
  };

  const totalAmount = tips.reduce((sum, tip) => sum + parseFloat(tip.amount) / 100, 0);
  const totalTips = pagination.totalCount;

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

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-800 dark:text-red-200">
              <strong>Error:</strong> {error}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadTips}
              className="ml-auto"
            >
              Retry
            </Button>
          </div>
        </div>
      )}


      {/* Tips Table */}
      <Card className="border-2 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex space-x-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-36"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )}
          
          {!loading && tips.length === 0 && (
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

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <Card className="border-2 border-gray-800">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of {pagination.totalCount} tips
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={!pagination.hasPrevPage || loading}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === pagination.currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage || loading}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Tips;
