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
  token,
  creatorId,
  username
) => {
  try {
    const url = new URL("https://pp-backend.apextip.space/analytics");
    url.searchParams.append("start_date", startDate);
    url.searchParams.append("end_date", endDate);
    url.searchParams.append("creator_id", creatorId);
    url.searchParams.append("username", username);

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

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[350px] h-12 justify-start text-left text-sm bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              disabled={loading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {dateRange.from.toLocaleDateString()} -{" "}
                    {dateRange.to.toLocaleDateString()}
                  </>
                ) : (
                  dateRange.from.toLocaleDateString()
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <AnalyticsUi data={analyticsData} />
      <Tips startDate={dateRange.from} endDate={dateRange.to} />
    </div>
  );
}
