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

export function OverviewContent() {
  const { token } = useAuthStore();
  const [isLinksEditorOpen, setIsLinksEditorOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState("desktop");
  const [blocks, setBlocks] = useState([
    {
      type: "tip",
      id: "tip-1",
      className: "animate-in slide-in-from-right-5 duration-500",
      display_time: 20000,
      template: `
        <div class="p-3 rounded-lg space-y-2 relative bg-cover bg-center bg-no-repeat" style="width: {{ style.width | default: 300 }}px; height: {{ style.height | default: 150 }}px; background-color: {{ data.primary_color | default: '#8b5cf6' }}; {% if data.background_image %}background-image: url('{{ data.background_image }}');{% endif %}">
          <div class="flex items-center">
          <div>
          <img src="https://res.cloudinary.com/dspp405ug/image/upload/v1760471365/cool_zdwwcs.svg" class="w-12 h-12 rounded-full" />
          </div>
          <div>
            <p class="text-xs shadow-ld" style="color: {{ data.text_color | default: '#ffffff' }};">
              {{ visitor_name }}
            </p>
            <p class="text-lg font-bold shadow-lg" style="color: {{ data.text_color | default: '#ffffff' }};">
              {% if currency == 'INR' %}₹ {% elsif currency == 'USD' %}$ {% elsif currency == 'EUR' %}€ {% elsif currency == 'GBP' %}£ {% else %}{{ currency }}{% endif %}{{ amount | divided_by: 100 | round: 2 }}
            </p>
          </div>
          </div>
          {% if message and message != '' %}
          <div>
          <p class="p-3 rounded-lg shadow-sm" style="color: {{ data.text_color | default: '#ffffff' }}; background-color: {{ data.secondary_color | default: '#10b981' }};"> {{ message }} </p>
          </div>
          {% endif %}
        </div>
      `,
      data: {
        primary_color: "#7337ff",
        secondary_color: "#9668ff",
        text_color: "#ffffff",
        background_image: null,
      },
      style: {
        position: "fixed",
        top: "20px",
        left: "20px",
        width: "300px",
        height: "150px",
      },
    },
  ]);

  // useEffect(() => {
  //   getOverlay(token).then((data) => {
  //     setBlocks(data);
  //   });
  // }, [token]);

  // Get user's actual screen resolution
  const { width: userWidth, height: userHeight } = getMonitorResolution();

  if (!blocks) {
    return <div>Loading...</div>;
  }

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <h1 style="position: fixed; top: 0; left: 0; margin: 0; padding: 0;">hello</h1>
  </body>
  </html>
  `;

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
