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
import Monitor from "./overlay/Monitor";
import MonitorDisplay from "./overlay/MonitorDisplay";
import BlocksEditor from "./overlay/BlocksEditor";
import BlockRenderer from "./overlay/BlockRenderer";

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
  const { token } = useAuthStore();
  const [isLinksEditorOpen, setIsLinksEditorOpen] = useState(false);
  const [blocks, setBlocks] = useState(null);

  useEffect(() => {
    getOverlay(token).then((data) => {
      setBlocks(data);
    });
  }, [token]);

  useEffect(() => {
    updateOverlay(token, { blocks });
  }, [blocks]);

  if (!blocks) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex gap-4 w-full">
        <Dialog open={isLinksEditorOpen} onOpenChange={setIsLinksEditorOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-40 flex-grow justify-start text-left bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <div className="flex items-center gap-4">
                <FileText className="!w-8 !h-8" />
                <div>
                  <div className="text-lg font-bold">Overlay Editor</div>
                  <div className="text-sm opacity-80">
                    Configure your overlay
                  </div>
                </div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none">
            <DialogHeader>
              <DialogTitle>Live Page Configuration</DialogTitle>
              <DialogDescription>
                Customize your live page appearance and settings
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-xl border-2 border-black h-[calc(95vh-8rem)] flex">
              <BlockRenderer blocks={blocks} />
              <div className="w-[300px] p-4">
                <BlocksEditor blocks={blocks} setBlocks={setBlocks} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
