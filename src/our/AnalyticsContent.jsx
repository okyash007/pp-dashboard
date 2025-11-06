import { useDebugValue, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import AnalyticsUi from "./AnalyticsUi";
import Tips from "./Tips";

// Utility function to convert Unix timestamp to readable date string
const unixToReadableDate = (unixTimestamp) => {
  return new Date(unixTimestamp * 1000).toString();
};

// Utility function to convert readable date string to Unix timestamp
const readableDateToUnix = (dateString) => {
  return Math.floor(new Date(dateString).getTime() / 1000);
};

// Function to fetch analytics data
const fetchAnalytics = async (
  startDate,
  endDate,
  token
) => {
  try {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/analytics`);
    url.searchParams.append("start_date", startDate);
    url.searchParams.append("end_date", endDate);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};

export function AnalyticsContent() {
  const { token, user } = useAuthStore();
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    to: new Date(), // today
  });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && user && dateRange.from && dateRange.to) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const data = await fetchAnalytics(
            readableDateToUnix(dateRange.from),
            readableDateToUnix(dateRange.to),
            token,
            user.creator_id, // creator_id from user data
            user.username // username from user data
          );
          setAnalyticsData(data);
        } catch (err) {
          setError(err.message);
          console.error("Failed to fetch analytics:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [dateRange]);

  // console.log({
  //   from: readableDateToUnix(dateRange.from),
  //   to: readableDateToUnix(dateRange.to),
  // })

  // Handler functions for quick date range selection
  const handleLast7Days = () => {
    setDateRange({
      from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      to: new Date(),
    });
  };

  const handleLast30Days = () => {
    setDateRange({
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      to: new Date(),
    });
  };

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <Popover >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-auto bg-[#FEF18C] hover:bg-[#FEF18C]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group"
              disabled={loading}
            >
              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {dateRange.from.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      <span className="mx-1">→</span>{" "}
                      {dateRange.to.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </>
                  ) : (
                    dateRange.from.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  )
                ) : (
                  "Pick a date range"
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-[4px] border-black mt-1" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        
        <Button
          variant="outline"
          onClick={handleLast7Days}
          disabled={loading}
          className="h-auto bg-white hover:bg-gray-50 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
        >
          Last 7 days
        </Button>
        
        <Button
          variant="outline"
          onClick={handleLast30Days}
          disabled={loading}
          className="h-auto bg-white hover:bg-gray-50 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
        >
          Last 30 days
        </Button>
      </div>

      <AnalyticsUi data={analyticsData} />
      <Tips startDate={dateRange.from} endDate={dateRange.to} />
    </div>
  );
}
