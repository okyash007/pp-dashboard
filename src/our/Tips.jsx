import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  IndianRupee,
  Calendar,
  User,
  MessageSquare,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import TipAmounts from './TipAmounts';
import pointyPotato from '../assets/pointy.svg';

// API service function
const fetchTips = async (token, startDate = null, endDate = null, page = 1, limit = 100) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  let url = `${baseUrl}/tip/?page=${page}&limit=${limit}`;

  if (startDate) {
    url += `&start_date=${startDate}`;
  }
  if (endDate) {
    url += `&end_date=${endDate}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
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
      minute: '2-digit',
    });
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
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
    <div className='space-y-6'>
      {/* Tip Amounts */}
      <TipAmounts />

      {/* Header with Refresh Button */}
      <div className='flex items-center justify-between pt-12'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Tips History</h1>
          <p className='text-gray-600 mt-1 text-sm'>View and manage all your received tips</p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handleRefresh}
            disabled={loading}
            className='bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs px-4 py-2 border-[2px] border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className='bg-red-50 border-[2px] border-red-200 p-4'>
          <div className='flex items-center justify-between'>
            <div className='text-red-700 font-semibold text-sm'>
              <strong>⚠️ Error:</strong> {error}
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={loadTips}
              className='bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs px-3 py-2 border-[2px] border-gray-300 transition-colors'
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Tips Table */}
      <div
        className='bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group/table transition-all duration-300'
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(170, 214, 184, 0.3) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundImage =
            'radial-gradient(circle, rgba(170, 214, 184, 0.32) 1.2px, transparent 1.2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundImage =
            'radial-gradient(circle, rgba(170, 214, 184, 0.3) 1px, transparent 1px)';
        }}
      >
        {/* Pointy Potato */}
        <div className='absolute -top-13 left-10 w-64 h-64 z-10 pointer-events-none'>
          <img src={pointyPotato} alt='Pointing' className='w-full h-full object-contain' />
        </div>

        <div className='bg-gradient-to-r from-[#828BF8] to-[#828BF8]/90 px-6 py-3 border-b-[3px] border-black relative z-0 overflow-hidden'>
          <div className='flex items-center gap-2'>
            <MessageSquare className='h-4 w-4 text-white flex-shrink-0' />
            <div className='flex-1 overflow-hidden'>
              <div className='flex whitespace-nowrap animate-marquee'>
                <h2 className='text-sm font-black text-white uppercase tracking-wider inline-block pr-20'>
                  Recent Tips
                </h2>
                <h2 className='text-sm font-black text-white uppercase tracking-wider inline-block pr-20'>
                  Recent Tips
                </h2>
                <h2 className='text-sm font-black text-white uppercase tracking-wider inline-block pr-20'>
                  Recent Tips
                </h2>
                <h2 className='text-sm font-black text-white uppercase tracking-wider inline-block pr-20'>
                  Recent Tips
                </h2>
                <h2 className='text-sm font-black text-white uppercase tracking-wider inline-block pr-20'>
                  Recent Tips
                </h2>
                <h2 className='text-sm font-black text-white uppercase tracking-wider inline-block pr-20'>
                  Recent Tips
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className='p-0'>
          {loading ? (
            <div className='space-y-3 p-6'>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className='animate-pulse flex items-center gap-4 p-4 bg-gray-50 border border-gray-200'
                >
                  <div className='h-10 w-24 bg-gray-200 rounded'></div>
                  <div className='flex-1'>
                    <div className='h-4 bg-gray-200 rounded w-32 mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-48'></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b-[2px] border-gray-200 bg-[#FEF18C]'>
                    <th className='text-left py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>
                      Amount
                    </th>
                    <th className='text-left py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>
                      From
                    </th>
                    <th className='text-left py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>
                      Message
                    </th>
                    <th className='text-left py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>
                      Date
                    </th>
                    <th className='text-left py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='text-left py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>
                      Payment ID
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  {tips.map((tip, index) => (
                    <tr
                      key={tip.id}
                      className='transition-all duration-200 group hover:bg-[#AAD6B8]/10'
                    >
                      <td className='py-4 px-6'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 bg-green-100 border-[2px] border-green-200 flex items-center justify-center'>
                            <IndianRupee className='h-4 w-4 text-green-700 -rotate-12 group-hover:rotate-0 group-hover:text-green-600 transition-all duration-200' />
                          </div>
                          <div>
                            <div className='font-bold text-gray-900 text-base'>
                              {formatAmount(tip.amount, tip.currency)}
                            </div>
                            <div className='text-xs text-gray-500 font-medium'>{tip.currency}</div>
                          </div>
                        </div>
                      </td>
                      <td className='py-4 px-6'>
                        <div>
                          <div className='font-semibold text-gray-900 text-sm'>
                            {tip.visitor_name || 'Anonymous'}
                          </div>
                          {tip.visitor_email && (
                            <div className='text-xs text-gray-500 mt-0.5'>{tip.visitor_email}</div>
                          )}
                        </div>
                      </td>
                      <td className='py-4 px-6'>
                        <div className='text-sm text-gray-700 max-w-xs truncate'>
                          {tip.message || <span className='text-gray-400 italic'>No message</span>}
                        </div>
                      </td>
                      <td className='py-4 px-6'>
                        <div className='text-sm text-gray-600'>{formatDate(tip.created_at)}</div>
                      </td>
                      <td className='py-4 px-6'>
                        {tip.settled ? (
                          <div className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold'>
                            <CheckCircle className='h-3 w-3' />
                            Settled
                          </div>
                        ) : (
                          <div className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-50/50 border border-pink-200/60 text-pink-700/80 text-xs font-medium'>
                            <XCircle className='h-3 w-3' />
                            Pending
                          </div>
                        )}
                      </td>
                      <td className='py-4 px-6'>
                        <code className='text-xs bg-gray-100 text-gray-700 px-2 py-1 font-mono'>
                          {tip.payment_id}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && tips.length === 0 && (
            <div className='text-center py-16 bg-gray-50'>
              <div className='bg-white border-[2px] border-gray-200 p-4 inline-block mb-4'>
                <MessageSquare className='h-12 w-12 text-gray-300 mx-auto' />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-1'>No tips yet</h3>
              <p className='text-gray-500 text-sm'>Tips from your supporters will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className='bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4'>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div className='text-xs text-gray-600 font-medium'>
              Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of{' '}
              {pagination.totalCount} tips
            </div>

            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={handlePreviousPage}
                disabled={!pagination.hasPrevPage || loading}
                className='bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs px-3 py-2 border-[2px] border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
              >
                <ChevronLeft className='h-4 w-4 mr-1' />
                Previous
              </Button>

              <div className='flex items-center space-x-1'>
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

                  const isActive = pageNum === pagination.currentPage;

                  return (
                    <Button
                      key={pageNum}
                      variant='outline'
                      size='sm'
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                      className={`w-9 h-9 p-0 font-semibold text-xs border-[2px] transition-colors ${
                        isActive
                          ? 'bg-[#828BF8] text-white border-[#828BF8] hover:bg-[#828BF8]/90'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant='outline'
                size='sm'
                onClick={handleNextPage}
                disabled={!pagination.hasNextPage || loading}
                className='bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs px-3 py-2 border-[2px] border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
              >
                Next
                <ChevronRight className='h-4 w-4 ml-1' />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tips;
