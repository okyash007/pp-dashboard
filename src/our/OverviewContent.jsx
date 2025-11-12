import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Bell, Smartphone, Play, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
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

  return (
    <div className="h-[calc(95vh-8rem)] w-full">
      <div className="flex flex-wrap gap-4 p-4 h-full">
        {/* Alerts Tile */}
        <div className="relative group flex flex-col min-h-0 h-fit">
          <div
            className="relative h-full bg-white border-[3px] border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
            onClick={() => setSearchParams({ block_type: "tip" })}
          >
            <div className="flex items-start justify-between mb-1.5">
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
            <div className="scale-75">
              <LiquidRenderer
                key={dummyTipBlocks[0].id}
                html={dummyTipBlocks[0].template}
                data={{ ...dummyTipBata, data: dummyTipBlocks[0].data }}
                className={dummyTipBlocks[0].className}
                style={dummyTipBlocks[0].style}
              />
            </div>
          </div>
        </div>

        {/* QR Tile */}
        <div className="relative group flex flex-col min-h-0">
          <div
            className="relative h-full bg-white border-[3px] border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
            onClick={() => setSearchParams({ block_type: "qr" })}
          >
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-black mb-0.5 leading-tight">
                  QR
                </h3>
                <p className="text-[9px] text-gray-600 leading-tight">
                  Go-to-links instantly via QR scan!
                </p>
              </div>
              <div className="w-7 h-7 bg-[#FEF18C] border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 ml-1">
                <Smartphone className="w-3.5 h-3.5 text-black" />
              </div>
            </div>

            {/* Example QR Code */}
            <div className="scale-75">
              <LiquidRenderer
                html={dummyQrCodeBlocks[0].template}
                data={{ ...dummyQrCodeData, data: dummyQrCodeBlocks[0].data }}
                className={dummyQrCodeBlocks[0].className}
                style={dummyQrCodeBlocks[0].style}
              />
            </div>
          </div>
        </div>

        {/* Media Share Tile */}
        <div className="relative group flex flex-col min-h-0">
          <div
            onClick={() => setSearchParams({ block_type: "leaderboard" })}
            className="relative h-full bg-white border-[3px] border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden"
          >
            <div className="flex items-start justify-between mb-1.5">
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
            <div className="scale-75">
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

        {/* Tip's Reply Tile */}
        {/* <div className="relative group flex flex-col min-h-0">
          <div className="relative h-full bg-white border-[3px] border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-black mb-0.5 leading-tight">
                  Tip's reply
                </h3>
                <p className="text-[9px] text-gray-600 leading-tight">
                  Now! your fans can reply to each other's tips by tipping.
                </p>
              </div>
              <div className="w-7 h-7 bg-[#828BF8] border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 ml-1">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className=""></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
