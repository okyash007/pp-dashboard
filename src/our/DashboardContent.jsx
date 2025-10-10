import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Users, FileText, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeEditor } from "@/components/QRCodeEditor";
import { useAuthStore } from "@/stores/authStore";
import ColorPicker from "../components/ColorPicker";
import { Label } from "../components/ui/label";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DashboardContent() {
  const { user } = useAuthStore();
  const [livePageOpen, setLivePageOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Live Page UI Button */}
          <Dialog open={livePageOpen} onOpenChange={setLivePageOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full h-32 justify-start text-left bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8" />
                  <div>
                    <div className="text-lg font-bold">Live Page UI</div>
                    <div className="text-sm opacity-80">Configure your live page</div>
                  </div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Live Page Configuration</DialogTitle>
                <DialogDescription>
                  Customize your live page appearance and settings
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <input 
                    type="text" 
                    placeholder="Enter page title"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea 
                    placeholder="Enter page description"
                    className="w-full px-3 py-2 border rounded-md h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <ColorPicker
                    value="#3734eb"
                    onChange={(color) => console.log(color)}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Overlay UI Button */}
          <Dialog open={overlayOpen} onOpenChange={setOverlayOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full h-32 justify-start text-left bg-purple-200 hover:bg-purple-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <div className="text-lg font-bold">Overlay UI</div>
                    <div className="text-sm opacity-80">Configure overlay settings</div>
                  </div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Overlay Configuration</DialogTitle>
                <DialogDescription>
                  Configure overlay settings and appearance
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Overlay Position</Label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="top-left">Top Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="center">Center</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Overlay Opacity</Label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="80"
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500">80%</div>
                </div>
                <div className="space-y-2">
                  <Label>Overlay Color</Label>
                  <ColorPicker
                    value="#3734eb"
                    onChange={(color) => console.log(color)}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-4">
          <div>
            <QRCodeEditor
              link={`https://link.apextip.space/${
                user?.username || "username"
              }`}
            />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 h-fit">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-gray-500">
                Primary color
              </Label>
              <ColorPicker
                value="#3734eb"
                onChange={(color) => console.log(color)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-gray-500">
                Primary color
              </Label>
              <ColorPicker
                value="#3734eb"
                onChange={(color) => console.log(color)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-gray-500">
                Primary color
              </Label>
              <ColorPicker
                value="#3734eb"
                onChange={(color) => console.log(color)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-gray-500">
                Primary color
              </Label>
              <ColorPicker
                value="#3734eb"
                onChange={(color) => console.log(color)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-gray-500">
                Primary color
              </Label>
              <ColorPicker
                value="#3734eb"
                onChange={(color) => console.log(color)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-gray-500">
                Primary color
              </Label>
              <ColorPicker
                value="#3734eb"
                onChange={(color) => console.log(color)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-gray-500">
                Primary color
              </Label>
              <ColorPicker
                value="#3734eb"
                onChange={(color) => console.log(color)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
