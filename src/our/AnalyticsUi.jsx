import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  IndianRupee,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Users,
} from "lucide-react";

const AnalyticsUi = ({ data }) => {
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

  const formatCurrency = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const formatPercentage = (num) => {
    return new Intl.NumberFormat("en-IN", {
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
      {/* Comic Book Panel Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* HERO PANEL - Total Tips (Takes 2 rows, 5 cols) */}
        <div className="col-span-12 md:col-span-5 md:row-span-2 relative group">
          <div className="relative h-full bg-[#FEF18C] border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
            {/* Comic panel lines in corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-black/30"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-black/30"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-black/30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-black/30"></div>

            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
              {/* Header with comic label */}
              <div>
                <div className="inline-block bg-black px-3 py-1 mb-3">
                  <span className="text-[10px] font-black text-[#FEF18C] uppercase tracking-widest">
                    💰 TOTAL TIPS
                  </span>
                </div>

                {/* Massive number with comic emphasis */}
                <div className="relative mb-4">
                  <div
                    className="text-6xl md:text-7xl font-black text-black leading-none mb-2"
                    style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.2)" }}
                  >
                    {data.summary?.total_tips || 0}
                  </div>
                  {/* Comic "POW!" style emphasis */}
                  <div className="absolute -top-4 -right-4 rotate-12 bg-[#FF6B9D] border-[3px] border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-xs font-black text-white">BOOM!</span>
                  </div>
                </div>

                {/* Currency Breakdown Inside Card */}
                {data.breakdown_by_currency &&
                  data.breakdown_by_currency.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {data.breakdown_by_currency.map((currency, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white border-[3px] border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          <span className="text-xs font-black text-black uppercase">
                            {currency.currency || "Unknown"}
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-black text-black">
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: currency.currency || "INR",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format((currency.total_amount || 0) / 100)}
                            </div>
                            <div className="text-[10px] font-bold text-black/60">
                              {currency.tips_count || 0} tips
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* Speech bubble for trend */}
              <div className="relative bg-white border-[3px] border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-fit">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-black text-black">+12.5%</span>
                </div>
                {/* Speech bubble pointer */}
                <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-black"></div>
                <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
              </div>

              <IndianRupee className="absolute bottom-4 right-4 w-12 h-12 text-black/10" />
            </div>
          </div>
        </div>

        {/* CLICKS PANEL */}
        <div className="col-span-6 md:col-span-4 relative">
          <div className="relative h-full bg-[#AAD6B8] border-[5px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200">
            {/* Halftone effect */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, black 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            ></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-black uppercase tracking-widest bg-white px-2 py-1 border-[2px] border-black">
                  👆 CLICKS
                </span>
                <MousePointer className="w-5 h-5 text-black" />
              </div>
              <div
                className="text-4xl font-black text-black mb-2"
                style={{ textShadow: "3px 3px 0px rgba(255,255,255,0.5)" }}
              >
                {data.summary?.total_clicks || 0}
              </div>
              <div className="inline-flex items-center gap-1 bg-white border-[2px] border-black px-2 py-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs font-black text-green-600">
                  +14.0%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* IMPRESSIONS PANEL */}
        <div className="col-span-6 md:col-span-3 relative -rotate-1">
          <div className="relative h-full bg-[#828BF8] border-[5px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-all duration-200">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black px-2 py-1">
                  👁️ VIEWS
                </span>
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div
                className="text-4xl font-black text-white mb-2"
                style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.3)" }}
              >
                {data.summary?.total_impressions || 0}
              </div>
              <div className="inline-flex items-center gap-1 bg-red-500 border-[2px] border-black px-2 py-1">
                <TrendingDown className="w-3 h-3 text-white" />
                <span className="text-xs font-black text-white">-5.5%</span>
              </div>
            </div>
            {/* Comic action lines */}
            <div className="absolute top-2 right-2 w-16 h-16 opacity-20">
              <div className="absolute rotate-45 w-full h-0.5 bg-white top-1/2"></div>
              <div className="absolute -rotate-45 w-full h-0.5 bg-white top-1/2"></div>
            </div>
          </div>
        </div>

        {/* CONVERSION RATE PANEL */}
        <div className="col-span-6 md:col-span-4 relative rotate-1">
          <div className="relative h-full bg-[#FF6B9D] border-[5px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-all duration-200">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black px-2 py-1">
                  🎯 CONVERSION
                </span>
                <Target className="w-5 h-5 text-white" />
              </div>
              <div
                className="text-4xl font-black text-white mb-2"
                style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.3)" }}
              >
                {data.summary?.click_conversion_rate || "0%"}
              </div>
              {/* Thought bubble style */}
              <div className="relative bg-white border-[2px] border-black px-3 py-1 w-fit">
                <span className="text-xs font-black text-green-600">
                  +0.49%
                </span>
                {/* Thought bubble circles */}
                <div className="absolute -bottom-4 right-4 w-2 h-2 bg-white border-[2px] border-black rounded-full"></div>
                <div className="absolute -bottom-6 right-6 w-1 h-1 bg-white border-[2px] border-black rounded-full"></div>
              </div>
            </div>
            {/* Comic "ZAP!" */}
            <div className="absolute top-2 right-2 bg-[#FEF18C] border-[2px] border-black px-2 py-0.5 -rotate-12">
              <span className="text-[10px] font-black text-black">ZAP!</span>
            </div>
          </div>
        </div>

        {/* CLICK THROUGH RATE PANEL */}
        <div className="col-span-6 md:col-span-3 relative">
          <div className="relative h-full bg-white border-[5px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200">
            {/* Diagonal stripes pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, black 0, black 2px, transparent 2px, transparent 10px)",
              }}
            ></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-black uppercase tracking-widest bg-[#FEF18C] px-2 py-1 border-[2px] border-black">
                  📊 CTR
                </span>
                <BarChart3 className="w-5 h-5 text-black" />
              </div>
              <div
                className="text-4xl font-black text-black mb-2"
                style={{ textShadow: "3px 3px 0px rgba(254,241,140,0.5)" }}
              >
                {data.summary?.click_through_rate || "0%"}
              </div>
              <div className="inline-flex items-center gap-1 bg-green-500 border-[2px] border-black px-2 py-1">
                <TrendingUp className="w-3 h-3 text-white" />
                <span className="text-xs font-black text-white">+2.1%</span>
              </div>
            </div>
            {/* Comic starburst */}
            <div className="absolute bottom-2 right-2 w-10 h-10">
              <div
                className="absolute inset-0 bg-[#FEF18C] opacity-30"
                style={{
                  clipPath:
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsUi;
