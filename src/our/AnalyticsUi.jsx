import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Users,
} from "lucide-react";

const AnalyticsUi = ({ data }) => {
  const [showCurrencyBreakdown, setShowCurrencyBreakdown] = useState(false);

  if (!data) {
    return (
      <div className="space-y-6">
        {/* Main Metrics Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Total Tips Card Skeleton */}
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-5" />
            </div>
            <Skeleton className="h-8 w-20 mb-2" />
            <div className="flex items-center justify-end">
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          {/* Clicks Card Skeleton */}
          <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-5" />
            </div>
            <Skeleton className="h-8 w-16 mb-2" />
            <div className="flex items-center justify-end">
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          {/* Impressions Card Skeleton */}
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-5" />
            </div>
            <Skeleton className="h-8 w-18 mb-2" />
            <div className="flex items-center justify-end">
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          {/* Conversion Rate Card Skeleton */}
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5" />
            </div>
            <Skeleton className="h-8 w-12 mb-2" />
            <div className="flex items-center justify-end">
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          {/* Click Through Rate Card Skeleton */}
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-5" />
            </div>
            <Skeleton className="h-8 w-12 mb-2" />
            <div className="flex items-center justify-end">
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount, currency = "EUR") => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-EU").format(num);
  };

  const formatPercentage = (num) => {
    return new Intl.NumberFormat("en-EU", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100);
  };

  // Use original data structure with new UI design
  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "Date range not available";
    const start = new Date(parseInt(startDate) * 1000);
    const end = new Date(parseInt(endDate) * 1000);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  return (
    <div className="space-y-6">

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Total Tips Card */}
        <div className="relative">
          <div 
            className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800 cursor-pointer hover:shadow-lg"
            onMouseEnter={() => setShowCurrencyBreakdown(true)}
            onMouseLeave={() => setShowCurrencyBreakdown(false)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Tips
              </div>
              <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {data.summary?.total_tips || 0}
            </div>
            <div className="flex items-center justify-end">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500 font-medium">
                +12.5%
              </span>
            </div>
          </div>
          
          {/* Currency Breakdown Hover Card */}
          {showCurrencyBreakdown && data.breakdown_by_currency && data.breakdown_by_currency.length > 0 && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 min-w-[300px] border-2 border-b-4 border-r-4 border-gray-800">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Currency Breakdown
              </h4>
              <div className="space-y-3">
                {data.breakdown_by_currency.map((currency, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {currency.currency || "Unknown"}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {new Intl.NumberFormat("en-EU", {
                          style: "currency",
                          currency: currency.currency || "EUR",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format((currency.total_amount || 0) / 100)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {currency.tips_count || 0} tips
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clicks Card */}
        <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Clicks
            </div>
            <MousePointer className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {data.summary?.total_clicks || 0}
          </div>
          <div className="flex items-center justify-end">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">
              +14.0%
            </span>
          </div>
        </div>

        {/* Impressions Card */}
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Impressions
            </div>
            <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {data.summary?.total_impressions || 0}
          </div>
          <div className="flex items-center justify-end">
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-sm text-red-500 font-medium">
              -5.5%
            </span>
          </div>
        </div>

        {/* Conversion Rate Card */}
        <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Conversion Rate
            </div>
            <Target className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {data.summary?.click_conversion_rate || "0%"}
          </div>
          <div className="flex items-center justify-end">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">
              +0.49%
            </span>
          </div>
        </div>

        {/* Click Through Rate Card */}
        <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg p-6 border-2 border-b-4 border-r-4 border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Click Through Rate
            </div>
            <BarChart3 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {data.summary?.click_through_rate || "0%"}
          </div>
          <div className="flex items-center justify-end">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">
              +2.1%
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsUi;
