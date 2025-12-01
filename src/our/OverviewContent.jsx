import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Bell, Smartphone, Play, MessageCircle, Crown, Sparkles, Lock } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import BlocksEditor from "./overlay/BlocksEditor";
import BlockRenderer from "./overlay/BlockRenderer";
import TipBlockEditor, {
  dummyTipBata,
  dummyTipBlocks,
} from "./overlay/TipBlockEditor";

import LeaderboardBlockEditor, {
  dummyLeaderboardBlocks,
  dummyLeaderboardData,
} from "./overlay/LeaderboardBlockEditor";
import QrCodeBlockEditor, {
  dummyQrCodeBlocks,
  dummyQrCodeData,
} from "./overlay/QrCodeBlockEditor";
import LiquidRenderer from "./LiquidRenderer";
import MediaShareBlockEditor, { dummyMediaShareBlocks, dummyMediaShareData } from "./overlay/MediaShareBlockEditor";

// Function to get monitor resolution
function getMonitorResolution() {
  return {
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
  };
}

async function getOverlay(token) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/overlay`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data.success) {
      return null;
    }
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function updateOverlay(token, data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/overlay`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();
    if (!responseData.success) {
      return null;
    }
    return responseData.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Hook for dynamic scaling based on container size
function useDynamicScale() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);
  const naturalSizeRef = useRef({ width: 0, height: 0 });

  const calculateScale = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const contentWrapper = contentRef.current;

    // Find the actual content element (LiquidRenderer output)
    // The wrapper is flex with items-center justify-center, so LiquidRenderer is a direct child
    const actualContent = contentWrapper.firstElementChild;
    if (!actualContent) return;

    const containerRect = container.getBoundingClientRect();
    const contentRect = actualContent.getBoundingClientRect();

    // Skip if dimensions are invalid
    if (containerRect.width === 0 || containerRect.height === 0) return;
    if (contentRect.width === 0 || contentRect.height === 0) return;

    // Measure natural size on first render (when scale is 1)
    if (
      naturalSizeRef.current.width === 0 ||
      naturalSizeRef.current.height === 0
    ) {
      // Get the natural size by measuring without scale
      // Temporarily remove scale to measure natural size
      const currentTransform = contentWrapper.style.transform;
      contentWrapper.style.transform = "scale(1)";
      // Force reflow
      void contentWrapper.offsetWidth;
      const naturalRect = actualContent.getBoundingClientRect();
      naturalSizeRef.current = {
        width: naturalRect.width || contentRect.width,
        height: naturalRect.height || contentRect.height,
      };
      // Restore transform
      contentWrapper.style.transform = currentTransform;
    }

    const naturalWidth = naturalSizeRef.current.width;
    const naturalHeight = naturalSizeRef.current.height;

    if (naturalWidth === 0 || naturalHeight === 0) return;

    // Calculate available space (use full container since wrapper fills it)
    const availableWidth = containerRect.width;
    const availableHeight = containerRect.height;

    // Calculate scale factors for both dimensions
    const scaleX = availableWidth / naturalWidth;
    const scaleY = availableHeight / naturalHeight;

    // Use the smaller scale to ensure content fits, use 98% for better fill
    const newScale = Math.min(scaleX, scaleY) * 0.98; // Use 98% to maximize fill while ensuring fit

    // Only update if there's a meaningful change (avoid infinite loops)
    if (Math.abs(newScale - scale) > 0.01 && newScale > 0) {
      setScale(Math.max(0.5, Math.min(1.5, newScale))); // Allow up to 150% for better fill, min 50%
    }
  }, [scale]);

  useEffect(() => {
    // Wait for content to render - use multiple attempts to ensure content is loaded
    const attemptCalculate = () => {
      if (containerRef.current && contentRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        // Only calculate if content has actual dimensions
        if (contentRect.width > 0 && contentRect.height > 0) {
          calculateScale();
        } else {
          // Retry if content not ready
          setTimeout(attemptCalculate, 100);
        }
      }
    };

    const timeoutId = setTimeout(attemptCalculate, 300);

    let resizeTimeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateScale, 100);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    // Also observe window resize
    window.addEventListener("resize", calculateScale);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateScale);
    };
  }, [calculateScale]);

  return {
    containerRef,
    contentRef,
    scale,
    naturalSize: naturalSizeRef.current,
  };
}

export function OverviewContent() {
  const { token, user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams(); // Get query params (e.g., ?key=value)
  const [isLinksEditorOpen, setIsLinksEditorOpen] = useState(false);
  const [blocks, setBlocks] = useState(null);

  useEffect(() => {
    getOverlay(token).then((data) => {
      setBlocks(data);
    });
  }, [token]);

  useEffect(() => {
    if (!blocks || blocks.length === 0) return;
    updateOverlay(token, { blocks });
  }, [blocks]);

  // Dynamic scale hooks for each tile - must be called before any conditional returns
  const alertsScale = useDynamicScale();
  const qrScale = useDynamicScale();
  const leaderboardScale = useDynamicScale();

  if (!blocks) {
    return <div>Loading...</div>;
  }

  // Get all search params as an object
  const allSearchParams = Object.fromEntries(searchParams.entries());
  const blockType = allSearchParams.block_type;

  if (blockType === "tip") {
    return (
      <TipBlockEditor
        block={blocks.find((block) => block.type === "tip")}
        setBlock={(newBlock) => {
          setBlocks((prev) =>
            prev.map((b) => (b.type === "tip" ? newBlock : b))
          );
        }}
      />
    );
  }
  if (blockType === "leaderboard") {
    return (
      <LeaderboardBlockEditor
        block={blocks.find((block) => block.type === "leaderboard")}
        setBlock={(newBlock) => {
          setBlocks((prev) =>
            prev.map((b) => (b.type === "leaderboard" ? newBlock : b))
          );
        }}
      />
    );
  }
  if (blockType === "qr") {
    return (
      <QrCodeBlockEditor
        block={blocks.find((block) => block.type === "qr_code")}
        setBlock={(newBlock) => {
          setBlocks((prev) =>
            prev.map((b) => (b.type === "qr_code" ? newBlock : b))
          );
        }}
      />
    );
  }
  if (blockType === "media_share") {
    if (user?.subscription_status !== "pro") {
      toast.info("💎 Upgrade to Pro", {
        description: "Media Share is a Pro feature. Upgrade to unlock it!",
        duration: 4000,
      });
      setSearchParams({});
      return null;
    }
    return (
      <MediaShareBlockEditor
        block={blocks.find((block) => block.type === "tip")}
        setBlock={(newBlock) => {
          setBlocks((prev) =>
            prev.map((b) => (b.type === "tip" ? newBlock : b))
          );
        }}
      />
    );
  }

  return (
    <div className="h-[calc(95vh-8rem)] aspect-square mx-auto">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full auto-rows-fr">
        {/* Alerts Tile - Top Left */}
        <div className="relative group flex flex-col min-h-0">
          <div
            className="relative h-full bg-white border-[3px] border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer"
            onClick={() => setSearchParams({ block_type: "tip" })}
          >
            <div className="flex items-start justify-between mb-1.5 flex-shrink-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-black mb-0.5 leading-tight">
                  Alerts
                </h3>
                <p className="text-[9px] text-gray-600 leading-tight">
                  Customise all alerts settings here!
                </p>
              </div>
              <div className="w-7 h-7 bg-[#AAD6B8] border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 ml-1">
                <Bell className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Example Alert Content */}
            <div
              ref={alertsScale.containerRef}
              className="flex-1 min-h-0 overflow-hidden relative"
            >
              <div
                ref={alertsScale.contentRef}
                className="absolute inset-0 origin-center flex items-center justify-center"
                style={{
                  transform: `scale(${alertsScale.scale})`,
                  width: "100%",
                  height: "100%",
                }}
              >
                <LiquidRenderer
                  key={dummyTipBlocks[0].id}
                  html={dummyTipBlocks[0].template}
                  data={{
                    visitor_name: "John Doe",
                    display_name: "John Doe",
                    message:
                      "Hey! Just wanted to say your content really lifts my mood after long days. You’ve got such a genuine vibe and it shows in everything you do. Keep shining and doing what you love — this small tip is my way of saying thanks for the constant joy you bring 💛",
                    created_at: Date.now(),
                    amount: 20000,
                    currency: "INR",
                    data: dummyTipBlocks[0].data,
                  }}
                  className={dummyTipBlocks[0].className}
                  style={dummyTipBlocks[0].style}
                />
              </div>
            </div>
          </div>
        </div>

        {/* QR Tile - Top Right */}
        <div className="relative group flex flex-col min-h-0">
          <div
            className="relative h-full bg-white border-[3px] border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer"
            onClick={() => setSearchParams({ block_type: "qr" })}
          >
            <div className="flex items-start justify-between mb-1.5 flex-shrink-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-black mb-0.5 leading-tight">
                  QR
                </h3>
                <p className="text-[9px] text-gray-600 leading-tight">
                  Go-to links instantly via QR scan!
                </p>
              </div>
              <div className="w-7 h-7 bg-[#FEF18C] border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 ml-1">
                <Smartphone className="w-3.5 h-3.5 text-black" />
              </div>
            </div>

            {/* Example QR Code */}
            <div
              ref={qrScale.containerRef}
              className="flex-1 min-h-0 overflow-hidden relative"
            >
              <div
                ref={qrScale.contentRef}
                className="absolute inset-0 origin-center flex items-center justify-center"
                style={{
                  transform: `scale(${qrScale.scale * 0.6})`,
                  width: "100%",
                  height: "100%",
                }}
              >
                <LiquidRenderer
                  html={dummyQrCodeBlocks[0].template}
                  data={{ ...dummyQrCodeData, data: dummyQrCodeBlocks[0].data }}
                  className={dummyQrCodeBlocks[0].className}
                  style={dummyQrCodeBlocks[0].style}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Tile */}
        <div className="relative group flex flex-col min-h-0">
          <div
            onClick={() => setSearchParams({ block_type: "leaderboard" })}
            className="relative h-full bg-white border-[3px] border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer"
          >
            <div className="flex items-start justify-between mb-1.5 flex-shrink-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-black mb-0.5 leading-tight">
                  Leaderboard
                </h3>
                <p className="text-[9px] text-gray-600 leading-tight">
                  Show your top supporters with a leaderboard!
                </p>
              </div>
              <div className="w-7 h-7 bg-black border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 ml-1">
                <Play className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>

            {/* Example Media Content */}
            <div
              ref={leaderboardScale.containerRef}
              className="flex-1 min-h-0 overflow-hidden relative"
            >
              <div
                ref={leaderboardScale.contentRef}
                className="absolute inset-0 origin-center flex items-center justify-center"
                style={{
                  transform: `scale(${leaderboardScale.scale * 0.9})`,
                  width: "100%",
                  height: "100%",
                }}
              >
                <LiquidRenderer
                  html={dummyLeaderboardBlocks[0].template}
                  data={{
                    ...dummyLeaderboardData,
                    data: dummyLeaderboardBlocks[0].data,
                  }}
                  className={dummyLeaderboardBlocks[0].className}
                  style={dummyLeaderboardBlocks[0].style}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media Share Tile */}
        <div className="relative group flex flex-col min-h-0">
          <div
            onClick={() => {
              if (user?.subscription_status !== "pro") {
                toast.info("💎 Upgrade to Pro", {
                  description: "Media Share is a Pro feature. Upgrade to unlock it!",
                  duration: 4000,
                });
                return;
              }
              setSearchParams({ block_type: "media_share" });
            }}
            className={`relative h-full bg-white border-[3px] border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden ${
              user?.subscription_status !== "pro" ? "opacity-75" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="text-base font-black text-black leading-tight">
                    Media Share
                  </h3>
                  {user?.subscription_status !== "pro" && (
                    <div className="flex items-center gap-1 bg-gray-200 border-[2px] border-black px-1.5 py-0.5 rounded">
                      <Lock className="w-3 h-3 text-black" />
                      <span className="text-[8px] font-black text-black uppercase">PRO</span>
                    </div>
                  )}
                </div>
                <p className="text-[9px] text-gray-600 leading-tight">
                  Share videos and media when your fans tip you!
                </p>
              </div>
              <div className="w-7 h-7 bg-[#828BF8] border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 ml-1">
                <Play className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div
              ref={alertsScale.containerRef}
              className="flex-1 min-h-0 overflow-hidden relative"
            >
              <div
                ref={alertsScale.contentRef}
                className="absolute inset-0 origin-center flex items-center justify-center"
                style={{
                  transform: `scale(${alertsScale.scale})`,
                  width: "100%",
                  height: "100%",
                }}
              >
                <LiquidRenderer
                  key={dummyMediaShareBlocks[0].id}
                  html={dummyMediaShareBlocks[0].template}
                  data={{
                    ...dummyMediaShareData,
                    data: dummyMediaShareBlocks[0].data,
                  }}
                  className={dummyMediaShareBlocks[0].className}
                  style={dummyMediaShareBlocks[0].style}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
