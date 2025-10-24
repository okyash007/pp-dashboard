import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import ColorPicker from "../../components/ColorPicker";
import ImageUpload from "../../components/ImageUpload";
import { MoveRight, PencilIcon } from "lucide-react";

const TipOverlayEditor = ({ block, setBlocks }) => {
  const setPresetPosition = (blockId, position) => {
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
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === blockId
            ? {
                ...b,
                style: {
                  ...preset,
                },
              }
            : b
        )
      );
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-2 border-amber-500 hover:bg-amber-50 hover:border-amber-600 transition-all duration-200 shadow-sm hover:shadow-md bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg px-3 py-2 font-medium text-amber-800 hover:text-amber-900"
        >
          <PencilIcon className="w-4 h-4 mr-1.5" />
          Customize Tip
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 border-2 border-black">
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-semibold text-gray-800 block">
              Display Time
            </Label>
            <div className="rounded-lg p-4 shadow-sm border-2 border-black">
              <div className="text-lg font-bold text-gray-800 mb-3">
                {block.data.displayTime || 20} seconds
              </div>
              <div className="space-y-2">
                <Slider
                  min={1}
                  max={60}
                  step={1}
                  value={[block.data.displayTime || 20]}
                  onValueChange={(value) => {
                    setBlocks((prev) =>
                      prev.map((b) =>
                        b.id === block.id
                          ? {
                              ...b,
                              data: {
                                ...b.data,
                                displayTime: value[0],
                              },
                            }
                          : b
                      )
                    );
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1s</span>
                  <span>60s</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-800 block">
              Background Image
            </Label>
            <ImageUpload
              value={block.data.background_image}
              onChange={(imageUrl) => {
                setBlocks((prev) =>
                  prev.map((b) =>
                    b.id === block.id
                      ? {
                          ...b,
                          data: {
                            ...b.data,
                            background_image: imageUrl,
                          },
                        }
                      : b
                  )
                );
              }}
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Primary color</Label>
            <ColorPicker
              value={block.data.primary_color}
              onChange={(color) => {
                setBlocks((prev) =>
                  prev.map((b) =>
                    b.id === block.id
                      ? {
                          ...b,
                          data: { ...b.data, primary_color: color },
                        }
                      : b
                  )
                );
              }}
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Secondary color</Label>
            <ColorPicker
              value={block.data.secondary_color}
              onChange={(color) => {
                setBlocks((prev) =>
                  prev.map((b) =>
                    b.id === block.id
                      ? {
                          ...b,
                          data: { ...b.data, secondary_color: color },
                        }
                      : b
                  )
                );
              }}
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Text color</Label>
            <ColorPicker
              value={block.data.text_color}
              onChange={(color) => {
                setBlocks((prev) =>
                  prev.map((b) =>
                    b.id === block.id
                      ? { ...b, data: { ...b.data, text_color: color } }
                      : b
                  )
                );
              }}
            />
          </div>
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
                      setBlocks((prev) =>
                        prev.map((b) =>
                          b.id === block.id
                            ? {
                                ...b,
                                style: {
                                  ...b.style,
                                  top: `${value[0]}px`,
                                },
                              }
                            : b
                        )
                      );
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
                      setBlocks((prev) =>
                        prev.map((b) =>
                          b.id === block.id
                            ? {
                                ...b,
                                style: {
                                  ...b.style,
                                  left: `${value[0]}px`,
                                },
                              }
                            : b
                        )
                      );
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
                      setBlocks((prev) =>
                        prev.map((b) =>
                          b.id === block.id
                            ? {
                                ...b,
                                style: {
                                  ...b.style,
                                  bottom: `${value[0]}px`,
                                },
                              }
                            : b
                        )
                      );
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
                      setBlocks((prev) =>
                        prev.map((b) =>
                          b.id === block.id
                            ? {
                                ...b,
                                style: {
                                  ...b.style,
                                  right: `${value[0]}px`,
                                },
                              }
                            : b
                        )
                      );
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
                      setBlocks((prev) =>
                        prev.map((b) =>
                          b.id === block.id
                            ? {
                                ...b,
                                style: {
                                  ...b.style,
                                  width: `${value[0]}px`,
                                },
                              }
                            : b
                        )
                      );
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
                      setBlocks((prev) =>
                        prev.map((b) =>
                          b.id === block.id
                            ? {
                                ...b,
                                style: {
                                  ...b.style,
                                  height: `${value[0]}px`,
                                },
                              }
                            : b
                        )
                      );
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
                onClick={() => setPresetPosition(block.id, "top-left")}
                className="text-xs border-2 border-black hover:bg-gray-100"
              >
                Top Left
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetPosition(block.id, "top-right")}
                className="text-xs border-2 border-black hover:bg-gray-100"
              >
                Top Right
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetPosition(block.id, "bottom-left")}
                className="text-xs border-2 border-black hover:bg-gray-100"
              >
                Bottom Left
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetPosition(block.id, "bottom-right")}
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

export default TipOverlayEditor;
