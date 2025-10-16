import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertTriangle } from "lucide-react";
import LiquidRenderer from "../LiquidRenderer";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "@/components/ColorPicker";
import ImageUpload from "@/components/ImageUpload";
import { Label } from "@/components/ui/label";

const OverlayEditor = ({ config, setConfig }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [displayTime, setDisplayTime] = useState(
    config.overlay?.display_time
      ? Math.round(config.overlay.display_time / 1000)
      : 10
  );

  const overlayLibrary = [
    {
      name: "Overlay 1",
      id: "overlay-1",
      display_time: 20000,
      className: "animate-in slide-in-from-right-5 duration-500",
      template: `
        <div class="p-3 rounded-lg space-y-2 relative bg-cover bg-center bg-no-repeat" style="background-color: {{ data.primary_color | default: '#8b5cf6' }}; {% if data.background_image %}background-image: url('{{ data.background_image }}');{% endif %}">
          <div class="flex items-center">
          <div>
          <img src="https://res.cloudinary.com/dspp405ug/image/upload/v1760471365/cool_zdwwcs.svg" class="w-12 h-12 rounded-full" />
          </div>
          <div>
            <p class="text-xs shadow-ld" style="color: {{ data.text_color | default: '#ffffff' }};">
              {{ visitor_name }}
            </p>
            <p class="text-lg font-bold shadow-lg" style="color: {{ data.text_color | default: '#ffffff' }};">
              {% if currency == 'INR' %}₹ {% elsif currency == 'USD' %}\u0024 {% elsif currency == 'EUR' %}€ {% elsif currency == 'GBP' %}£ {% else %}{{ currency }}{% endif %}{{ amount | divided_by: 100 | round: 2 }}
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
        primary_color: "#8b5cf6",
        secondary_color: "#10b981",
        text_color: "#ffffff",
        background_image:
          "https://static.vecteezy.com/system/resources/thumbnails/009/695/747/small_2x/seamless-wavy-line-pattern-png.png",
      },
    },
  ];

  return (
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
              <div className="text-sm opacity-80">
                Configure overlay settings
              </div>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-[95vw] !max-h-[95vh] !max-w-none">
        <div>
          <DialogHeader>
            <DialogTitle>Overlay Configuration</DialogTitle>
            <DialogDescription>
              Configure overlay settings and appearance
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="flex bg-gray-100 rounded-xl border-2 border-black h-[80dvh] overflow-y-auto">
          <div className="border-r-2 border-black overflow-auto">
            {overlayLibrary.map((overlay) => {
              const isSelected = overlay.id === config.overlay.id;
              return (
                <div
                  className={`min-w-sm py-2 px-4 cursor-pointer ${
                    isSelected ? "bg-gray-400" : ""
                  }`}
                  key={overlay.id}
                  onClick={() => {
                    setConfig((prev) => {
                      return { ...prev, overlay: overlay };
                    });
                    setDisplayTime(Math.round(overlay.display_time / 1000));
                  }}
                >
                  <LiquidRenderer
                    html={overlay.template}
                    data={{
                      visitor_name: "John Doe",
                      amount: 10000,
                      currency: "INR",
                      message: "Thank you for your support!",
                      created_at: 142350824,
                      payment_id: 13464564,
                      payment_gateway: "razorpay",
                      data: overlay.data,
                    }}
                    className={overlay.className}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex-1 relative">
            <div className="absolute top-4 left-0 z-50">
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg shadow-md max-w-xs">
                <div className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-red-800 mb-1">
                      Alert
                    </p>
                    <p className="text-xs text-red-700 leading-relaxed">
                      This is just a preview of how your overlay will appear to
                      viewers. The actual overlay can be slightly different
                      cause that will be rendered on a bigger canvas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full w-full flex items-center justify-center">
              <div className="min-w-md mx-auto">
                <LiquidRenderer
                  html={config.overlay.template}
                  data={{
                    visitor_name: "John Doe",
                    amount: 10000,
                    currency: "INR",
                    message: "Thank you for your support!",
                    created_at: 142350824,
                    payment_id: 13464564,
                    payment_gateway: "razorpay",
                    data: config.overlay.data,
                  }}
                  className={config.overlay.className}
                />
              </div>
            </div>
          </div>
          <div className="border-l-2 border-black p-4 min-w-[200px] space-y-4">
            <div className="p-4 bg-white rounded-xl">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Display Time
                  </label>
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {displayTime} seconds
                  </div>
                  <Slider
                    value={[displayTime]}
                    onValueChange={(value) => {
                      const newDisplayTime = value[0];
                      setDisplayTime(newDisplayTime);
                      setConfig((prev) => ({
                        ...prev,
                        overlay: {
                          ...prev.overlay,
                          display_time: newDisplayTime * 1000, // Convert seconds to milliseconds
                        },
                      }));
                    }}
                    max={60}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1s</span>
                    <span>60s</span>
                  </div>
                </div>
              </div>
            </div>
            {config.overlay.id === "overlay-1" && (
              <>
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs font-bold text-gray-500">
                      Primary color
                    </Label>
                    <ColorPicker
                      value={config.overlay.data?.primary_color}
                      onChange={(color) => {
                        setConfig((prev) => ({
                          ...prev,
                          overlay: {
                            ...prev.overlay,
                            data: {
                              ...prev.overlay.data,
                              primary_color: color,
                            },
                          },
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-500">
                      Secondary color
                    </Label>
                    <ColorPicker
                      value={config.overlay.data?.secondary_color}
                      onChange={(color) => {
                        setConfig((prev) => ({
                          ...prev,
                          overlay: {
                            ...prev.overlay,
                            data: {
                              ...prev.overlay.data,
                              secondary_color: color,
                            },
                          },
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-500">
                      Text color
                    </Label>
                    <ColorPicker
                      value={config.overlay.data?.text_color}
                      onChange={(color) => {
                        setConfig((prev) => ({
                          ...prev,
                          overlay: {
                            ...prev.overlay,
                            data: { ...prev.overlay.data, text_color: color },
                          },
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-500">
                      Background Image
                    </Label>
                    <ImageUpload
                      value={config.overlay.data?.background_image}
                      onChange={(imageUrl) => {
                        setConfig((prev) => ({
                          ...prev,
                          overlay: {
                            ...prev.overlay,
                            data: { 
                              ...prev.overlay.data, 
                              background_image: imageUrl 
                            },
                          },
                        }));
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OverlayEditor;
