import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Download,
  Loader2,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeEditor } from "@/components/QRCodeEditor";
import { useAuthStore } from "@/stores/authStore";
import { Label } from "../components/ui/label";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import ColorPickers from "./overlay/ColorPickers";
import OverlayEditor from "./overlay/OverlayEditor";
import LivePageEditor from "./overlay/LivePageEditor";

const updateConfig = async (configId, config) => {
  console.log(configId, config);
  try {
    const response = await fetch(
      `https://pp-backend.apextip.space/config/${configId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      }
    );
    if (!response) {
      throw new Error("Failed to update config");
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error("Failed to update config");
    }
    return data.data;
  } catch (error) {
    console.error("Error updating config:", error);
    throw error;
  }
};

export function DashboardContent() {
  const { user } = useAuthStore();

  const [autoSave, setAutoSave] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [config, setConfig] = useState(user?.config);

  // Auto-save effect
  useEffect(() => {
    if (autoSave && config) {
      const timeoutId = setTimeout(async () => {
        try {
          setIsSaving(true);
          await updateConfig(config._id.toString(), config);
          setIsSaving(false);
        } catch (error) {
          console.error("Auto-save failed:", error);
          setIsSaving(false);
        }
      }, 1000); // Auto-save after 1 second of no changes

      return () => clearTimeout(timeoutId);
    }
  }, [config, autoSave]);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Live Page UI Button */}
          <LivePageEditor config={config} setConfig={setConfig} />

          {/* Overlay UI Button */}
          <OverlayEditor config={config} setConfig={setConfig} />
        </div>
        <div className="flex gap-4">
          <div>
            <QRCodeEditor
              link={`https://link.apextip.space/${
                user?.username || "username"
              }`}
            />
          </div>
          <ColorPickers config={config} setConfig={setConfig} />
        </div>
        <div className="fixed bottom-4 right-4 flex gap-2">
          <Button
            onClick={async () => {
              if (isSaving) return; // Prevent multiple clicks
              setIsSaving(true);
              try {
                await updateConfig(config._id.toString(), config);
              } catch (error) {
                console.error("Failed to save config:", error);
              } finally {
                setIsSaving(false);
              }
            }}
            className={`bg-green-500 hover:bg-green-600 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-bold py-3 ${
              isSaving ? "cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Save
              </>
            ) : (
              "Save"
            )}
          </Button>
          {/* Settings Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-100 hover:bg-gray-200 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-64 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] p-4"
              align="end"
              side="top"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-black">Settings</h4>
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="auto-save"
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    />
                    <Label
                      htmlFor="auto-save"
                      className="text-sm font-medium text-black"
                    >
                      Auto-save changes
                    </Label>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    Automatically save changes after 1 second of inactivity
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Save Button */}
        </div>
      </div>
    </>
  );
}
