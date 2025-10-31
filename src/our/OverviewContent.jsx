import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import BlocksEditor from "./overlay/BlocksEditor";
import BlockRenderer from "./overlay/BlockRenderer";
import TipBlockEditor from "./overlay/TipBlockEditor";
import LeaderboardBlockEditor from "./overlay/LeaderboardBlockEditor";
import QrCodeBlockEditor from "./overlay/QrCodeBlockEditor";

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

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-3 flex flex-col gap-2 bg-orange-200 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-black" />
              <span className="text-xs font-bold text-black">Tip link</span>
            </div>
            <a
              href={`https://link.apextip.space/vo/${user?.username}?block_type=tip`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black hover:underline cursor-pointer truncate font-semibold bg-white px-2 py-1 rounded-lg border border-black block"
            >
              {`https://link.apextip.space/overlay/${user?.username}?block_type=tip`}
            </a>
          </Card>
          <Card className="p-3 flex flex-col gap-2 bg-orange-200 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-black" />
              <span className="text-xs font-bold text-black">
                Leaderboard link
              </span>
            </div>
            <a
              href={`https://link.apextip.space/vo/${user?.username}?block_type=leaderboard`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black hover:underline cursor-pointer truncate font-semibold bg-white px-2 py-1 rounded-lg border border-black block"
            >
              {`https://link.apextip.space/overlay/${user?.username}?block_type=leaderboard`}
            </a>
          </Card>
          <Card className="p-3 flex flex-col gap-2 bg-orange-200 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-black" />
              <span className="text-xs font-bold text-black">QR Code link</span>
            </div>
            <a
              href={`https://link.apextip.space/vo/${user?.username}?block_type=qr_code`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black hover:underline cursor-pointer truncate font-semibold bg-white px-2 py-1 rounded-lg border border-black block"
            >
              {`https://link.apextip.space/overlay/${user?.username}?block_type=qr_code`}
            </a>
          </Card>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-40 flex-grow justify-start text-left bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <div className="flex items-center gap-4">
                  <FileText className="!w-8 !h-8" />
                  <div>
                    <div className="text-lg font-bold">Tip Block Editor</div>
                    <div className="text-sm opacity-80">
                      Configure your tip block
                    </div>
                  </div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none">
              <DialogHeader>
                <DialogTitle>Tip Block Configuration</DialogTitle>
                <DialogDescription>
                  Customize your Tip appearance and settings
                </DialogDescription>
              </DialogHeader>
              <TipBlockEditor
                block={blocks.find((block) => block.type === "tip")}
                setBlock={(newBlock) =>
                  setBlocks((prev) =>
                    prev.map((b) => (b.type === "tip" ? newBlock : b))
                  )
                }
              />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-40 flex-grow justify-start text-left bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <div className="flex items-center gap-4">
                  <FileText className="!w-8 !h-8" />
                  <div>
                    <div className="text-lg font-bold">Leaderboard Block Editor</div>
                    <div className="text-sm opacity-80">
                      Configure your leaderboard block
                    </div>
                  </div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none">
              <DialogHeader>
                <DialogTitle>Leaderboard Block Configuration</DialogTitle>
                <DialogDescription>
                  Customize your leaderboard appearance and settings
                </DialogDescription>
              </DialogHeader>
              <LeaderboardBlockEditor
                block={blocks.find((block) => block.type === "leaderboard")}
                setBlock={(newBlock) =>
                  setBlocks((prev) =>
                    prev.map((b) => (b.type === "leaderboard" ? newBlock : b))
                  )
                }
              />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-40 flex-grow justify-start text-left bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <div className="flex items-center gap-4">
                  <FileText className="!w-8 !h-8" />
                  <div>
                    <div className="text-lg font-bold">QR Code Block Editor</div>
                    <div className="text-sm opacity-80">
                      Configure your QR Code block
                    </div>
                  </div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none">
              <DialogHeader>
                <DialogTitle>QR Code Block Configuration</DialogTitle>
                <DialogDescription>
                  Customize your QR Code appearance and settings
                </DialogDescription>
              </DialogHeader>
              <QrCodeBlockEditor
                block={blocks.find((block) => block.type === "qr_code")}
                setBlock={(newBlock) =>
                  setBlocks((prev) =>
                    prev.map((b) => (b.type === "qr_code" ? newBlock : b))
                  )
                }
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
