import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Calendar,
  User,
  MessageSquare,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import TipAmounts from "./TipAmounts";

// API service function
const fetchTips = async (
  token,
  startDate = null,
  endDate = null,
  page = 1,
  limit = 100
) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  let url = `${baseUrl}/tip/?page=${page}&limit=${limit}`;

  if (startDate) {
    url += `&start_date=${startDate}`;
  }
  if (endDate) {
    url += `&end_date=${endDate}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch tips: ${response.statusText}`);
  }

  return await response.json();
};

const Tips = ({ startDate, endDate }) => {
  const { token } = useAuthStore();
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
    hasPrevPage: false,
  });

  // Creator ID - this should come from auth context or props
  // Replace with actual creator ID from auth

  // Load tips on component mount and when page changes
  useEffect(() => {
    loadTips();
  }, [startDate, endDate, pagination.currentPage]);

  const loadTips = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTips(
        token,
        convertToUnixTimestamp(startDate),
        convertToUnixTimestamp(endDate),
        pagination.currentPage,
        pagination.limit
      );

      if (response.success) {
        setTips(response.data.tips);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || "Failed to fetch tips");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error loading tips:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    // Handle Unix timestamp (seconds) by converting to milliseconds
    const date = new Date(parseInt(dateString) * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(parseFloat(amount) / 100);
  };

  const handleRefresh = () => {
    loadTips();
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
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

  return (
    <div className="space-y-6">
      {/* Tip Amounts */}
      <TipAmounts />

      {/* Header with Refresh Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black" style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}>
            Tips History
          </h1>
          <p className="text-gray-700 mt-2 font-semibold">
            View and manage all your received tips
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="bg-[#FEF18C] hover:bg-[#FEF18C]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
          <div className="flex items-center justify-between">
            <div className="text-red-900 font-black">
              <strong>⚠️ Error:</strong> {error}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadTips}
              className="bg-[#FFF9C4] hover:bg-[#FFF59D] text-black font-black text-xs px-3 py-2 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Tips Table */}
      <div className="bg-[#F5F5F5] border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="bg-black px-6 py-4 border-b-[4px] border-black">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-white" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              Recent Tips
            </h2>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex space-x-4">
                    <div className="h-4 bg-gray-300 rounded w-20 border-2 border-black"></div>
                    <div className="h-4 bg-gray-300 rounded w-32 border-2 border-black"></div>
                    <div className="h-4 bg-gray-300 rounded w-24 border-2 border-black"></div>
                    <div className="h-4 bg-gray-300 rounded w-28 border-2 border-black"></div>
                    <div className="h-4 bg-gray-300 rounded w-36 border-2 border-black"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-[4px] border-black">
                    <th className="text-left py-4 px-4 font-black text-black uppercase tracking-wider bg-[#FFF9C4]">
                      Amount
                    </th>
                    <th className="text-left py-4 px-4 font-black text-black uppercase tracking-wider bg-[#C8E6C9]">
                      From
                    </th>
                    <th className="text-left py-4 px-4 font-black text-black uppercase tracking-wider bg-[#C5CAE9]">
                      Message
                    </th>
                    <th className="text-left py-4 px-4 font-black text-black uppercase tracking-wider bg-[#F8BBD0]">
                      Date
                    </th>
                    <th className="text-left py-4 px-4 font-black text-black uppercase tracking-wider bg-[#FFF59D]">
                      Settled
                    </th>
                    <th className="text-left py-4 px-4 font-black text-black uppercase tracking-wider bg-[#E1F5FE]">
                      Payment ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tips.map((tip, index) => (
                    <tr
                      key={tip.id}
                      className={`border-b-[2px] border-black hover:bg-gray-100 transition-colors ${
                        index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-[#FAFAFA]"
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 border-[2px] border-black p-1.5 rounded">
                            <DollarSign className="h-4 w-4 text-green-700" />
                          </div>
                          <div>
                            <span className="font-black text-black text-lg">
                              {formatAmount(tip.amount, tip.currency)}
                            </span>
                            <div className="text-xs bg-black text-white px-2 py-0.5 border border-black inline-block ml-2 font-bold">
                              {tip.currency}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 border-[2px] border-black p-1.5 rounded">
                            <User className="h-4 w-4 text-blue-700" />
                          </div>
                          <div>
                            <div className="font-bold text-black">
                              {tip.visitor_name || "Anonymous"}
                            </div>
                            {tip.visitor_email && (
                              <div className="text-xs text-gray-600 font-semibold">
                                {tip.visitor_email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-100 border-[2px] border-black p-1.5 rounded">
                            <MessageSquare className="h-4 w-4 text-purple-700" />
                          </div>
                          <span className="text-black font-semibold">
                            {tip.message || (
                              <span className="text-gray-500 italic">No message</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-pink-100 border-[2px] border-black p-1.5 rounded">
                            <Calendar className="h-4 w-4 text-pink-700" />
                          </div>
                          <span className="text-black font-semibold">
                            {formatDate(tip.created_at)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {tip.settled ? (
                            <div className="bg-green-100 border-[3px] border-black px-3 py-1.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              <div className="flex items-center gap-1.5">
                                <CheckCircle className="h-4 w-4 text-green-700" />
                                <span className="text-xs font-black text-green-700 uppercase">
                                  Settled
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-orange-100 border-[3px] border-black px-3 py-1.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              <div className="flex items-center gap-1.5">
                                <XCircle className="h-4 w-4 text-orange-700" />
                                <span className="text-xs font-black text-orange-700 uppercase">
                                  Pending
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs bg-[#E1F5FE] border-[2px] border-black px-2 py-1 font-mono font-bold text-black inline-block">
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
            <div className="text-center py-12 bg-gray-50 border-[4px] border-black p-8">
              <div className="bg-[#F5F5F5] border-[3px] border-black p-4 inline-block mb-4">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-black text-black mb-2">
                No tips yet
              </h3>
              <p className="text-gray-700 font-semibold">
                Tips from your supporters will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="bg-[#F5F5F5] border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm font-black text-black bg-[#FEF18C] border-[3px] border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
              {Math.min(
                pagination.currentPage * pagination.limit,
                pagination.totalCount
              )}{" "}
              of {pagination.totalCount} tips
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={!pagination.hasPrevPage || loading}
                className="bg-[#FFF9C4] hover:bg-[#FFF59D] text-black font-black text-xs px-4 py-2 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (
                      pagination.currentPage >=
                      pagination.totalPages - 2
                    ) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }

                    const isActive = pageNum === pagination.currentPage;

                    return (
                      <Button
                        key={pageNum}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className={`w-10 h-10 p-0 font-black text-xs border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150 ${
                          isActive
                            ? "bg-[#FF6B9D] text-white hover:bg-[#FF6B9D]/90"
                            : "bg-[#FFF9C4] text-black hover:bg-[#FFF59D]"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!pagination.hasNextPage || loading}
                className="bg-[#FFF9C4] hover:bg-[#FFF59D] text-black font-black text-xs px-4 py-2 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tips;
