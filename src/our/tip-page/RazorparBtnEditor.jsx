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
    <div className="space-y-1">
      <p className="text-lg font-bold text-gray-600">Razorpay Button Configuration</p>
      <div className="space-y-3 bg-gray-200 rounded-xl p-3">
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
  );
};

export default RazorparBtnEditor;
