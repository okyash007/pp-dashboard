import React, { useState, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const TipAmounts = () => {
  const { token, user } = useAuthStore();
  const [amounts, setAmounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.creator_id && token) {
      fetchTipAmounts();
    }
  }, [user?.creator_id, token]);

  const fetchTipAmounts = async () => {
    if (!user?.creator_id || !token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tip/${user.creator_id}/amounts`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Failed to fetch tip amounts",
        }));
        throw new Error(errorData.message || "Failed to fetch tip amounts");
      }

      const data = await response.json();
      setAmounts(data.data || data);
    } catch (err) {
      console.error("Error fetching tip amounts:", err);
      setError(err.message);
      setAmounts(null);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount, currency = "INR") => {
    // Assuming amount is in paise (smallest currency unit), convert to rupees
    const rupees = amount / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rupees);
  };

  if (loading) {
    return (
      <div className="bg-[#F5F5F5] border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="text-center">
          <div className="animate-pulse text-black font-black">Loading tip amounts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
        <div className="flex items-center justify-between">
          <div className="text-red-900 font-black">
            <strong>⚠️ Error:</strong> {error}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTipAmounts}
            className="bg-[#FFF9C4] hover:bg-[#FFF59D] text-black font-black text-xs px-3 py-2 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!amounts) {
    return (
      <div className="bg-[#F5F5F5] border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="text-center text-black font-semibold">
          No tip amounts found
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Settled Amount Card */}
        <div className="relative group">
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
                  ✅ SETTLED UP TILL NOW
                </span>
                <CheckCircle className="w-5 h-5 text-black" />
              </div>
              <div
                className="text-4xl font-black text-black mb-2"
                style={{ textShadow: "3px 3px 0px rgba(255,255,255,0.5)" }}
              >
                {formatAmount(amounts.settled_amount || 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Unsettled Amount Card */}
        <div className="relative group -rotate-1">
          <div className="relative h-full bg-[#FFB74D] border-[5px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-all duration-200">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black px-2 py-1">
                  ⏳ UNSETTLED UP TILL NOW
                </span>
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div
                className="text-4xl font-black text-white mb-2"
                style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.3)" }}
              >
                {formatAmount(amounts.unsettled_amount || 0)}
              </div>
            </div>
            {/* Comic action lines */}
            <div className="absolute top-2 right-2 w-16 h-16 opacity-20">
              <div className="absolute rotate-45 w-full h-0.5 bg-white top-1/2"></div>
              <div className="absolute -rotate-45 w-full h-0.5 bg-white top-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipAmounts;

