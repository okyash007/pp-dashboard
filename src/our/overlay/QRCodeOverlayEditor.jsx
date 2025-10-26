import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

const QRCodeOverlayEditor = ({ block, setBlock }) => {
  const setPresetPosition = (position) => {
    const presets = {
      "top-left": {
        position: "fixed",
        top: "20px",
        left: "20px",
        width: "300px",
        height: "150px",
      },
      "top-right": {
        position: "fixed",
        top: "20px",
        right: "20px",
        width: "300px",
        height: "150px",
      },
      "bottom-left": {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "300px",
        height: "150px",
      },
      "bottom-right": {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        height: "150px",
      },
    };

    const preset = presets[position];
    if (preset) {
      setBlock({
        ...block,
        style: {
          ...preset,
        },
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-2 border-blue-500 hover:bg-blue-50 hover:border-blue-600 transition-all duration-200 shadow-sm hover:shadow-md bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg px-3 py-2 font-medium text-blue-800 hover:text-blue-900"
        >
          <PencilIcon className="w-4 h-4 mr-1.5" />
          Customize QR Code
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 border-2 border-black">
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-semibold text-gray-800 block">
              Position & Size
            </Label>
            <div className="rounded-lg p-4 shadow-sm border-2 border-black space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500">Top (px)</Label>
                  <Slider
                    min={0}
                    max={600}
                    step={1}
                    value={[parseInt(block.style?.top) || 0]}
                    onValueChange={(value) => {
                      setBlock({
                        ...block,
                        style: {
                          ...block.style,
                          top: `${value[0]}px`,
                        },
                      });
                    }}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {block.style?.top || "0px"}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Left (px)</Label>
                  <Slider
                    min={0}
                    max={800}
                    step={1}
                    value={[parseInt(block.style?.left) || 0]}
                    onValueChange={(value) => {
                      setBlock({
                        ...block,
                        style: {
                          ...block.style,
                          left: `${value[0]}px`,
                        },
                      });
                    }}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {block.style?.left || "0px"}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500">Bottom (px)</Label>
                  <Slider
                    min={0}
                    max={600}
                    step={1}
                    value={[parseInt(block.style?.bottom) || 0]}
                    onValueChange={(value) => {
                      setBlock({
                        ...block,
                        style: {
                          ...block.style,
                          bottom: `${value[0]}px`,
                        },
                      });
                    }}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {block.style?.bottom || "0px"}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Right (px)</Label>
                  <Slider
                    min={0}
                    max={800}
                    step={1}
                    value={[parseInt(block.style?.right) || 0]}
                    onValueChange={(value) => {
                      setBlock({
                        ...block,
                        style: {
                          ...block.style,
                          right: `${value[0]}px`,
                        },
                      });
                    }}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {block.style?.right || "0px"}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500">Width (px)</Label>
                  <Slider
                    min={100}
                    max={500}
                    step={1}
                    value={[parseInt(block.style?.width) || 300]}
                    onValueChange={(value) => {
                      setBlock({
                        ...block,
                        style: {
                          ...block.style,
                          width: `${value[0]}px`,
                        },
                      });
                    }}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {block.style?.width || "300px"}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Height (px)</Label>
                  <Slider
                    min={50}
                    max={300}
                    step={1}
                    value={[parseInt(block.style?.height) || 150]}
                    onValueChange={(value) => {
                      setBlock({
                        ...block,
                        style: {
                          ...block.style,
                          height: `${value[0]}px`,
                        },
                      });
                    }}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {block.style?.height || "150px"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-800 block mb-2">
              Quick Position
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetPosition("top-left")}
                className="text-xs border-2 border-black hover:bg-gray-100"
              >
                Top Left
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetPosition("top-right")}
                className="text-xs border-2 border-black hover:bg-gray-100"
              >
                Top Right
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetPosition("bottom-left")}
                className="text-xs border-2 border-black hover:bg-gray-100"
              >
                Bottom Left
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetPosition("bottom-right")}
                className="text-xs border-2 border-black hover:bg-gray-100"
              >
                Bottom Right
              </Button>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QRCodeOverlayEditor;

