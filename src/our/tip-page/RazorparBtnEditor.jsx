import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CreditCard, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ColorPicker";

const RazorparBtnEditor = ({ block, setBlock }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-gradient-to-r from-green-100 to-blue-100 hover:from-green-200 hover:to-blue-200 text-green-800 border-2 border-green-300 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <CreditCard className="w-4 h-4" />
          Configure Razorpay Button
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] p-4"
        align="start"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-gray-200">
            <Settings className="w-4 h-4 text-green-600" />
            <h3 className="font-bold text-lg text-gray-800">
              Razorpay Configuration
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-sm font-bold text-gray-600 block mb-1">
                Button Text
              </Label>
              <Input
                type="text"
                placeholder="Enter button text..."
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                value={block.button?.text}
                onChange={(e) => {
                  setBlock({
                    ...block,
                    button: { ...block.button, text: e.target.value },
                  });
                }}
              />
            </div>

            <div>
              <Label className="text-sm font-bold text-gray-600 block mb-1">
                Button Background Color
              </Label>
              <ColorPicker
                value={block.button.style?.backgroundColor}
                onChange={(c) => {
                  setBlock({
                    ...block,
                    button: {
                      ...block.button,
                      style: { ...block.button.style, backgroundColor: c },
                    },
                  });
                }}
              />
            </div>
            <div>
              <Label className="text-sm font-bold text-gray-600 block mb-1">
                Text Color
              </Label>
              <ColorPicker
                value={block.button.style?.color}
                onChange={(c) => {
                  setBlock({
                    ...block,
                    button: {
                      ...block.button,
                      style: { ...block.button.style, color: c },
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RazorparBtnEditor;
