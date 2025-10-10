import React from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ColorPicker = ({ value, onChange }) => {
  const handleSelectColor = (color) => {
    onChange(color);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <Popover modal={true}>
          <PopoverTrigger asChild>
            <Button
              className="w-[2.5rem] h-9 rounded-r-none border-2 border-black border-r-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]"
              style={{ background: value }}
            ></Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-4 bg-yellow-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]"
            onInteractOutside={(e) => {
              // Prevent closing when clicking inside the color picker
              if (e.target.closest(".react-colorful")) {
                e.preventDefault();
              }
            }}
          >
            <div className="space-y-3">
              <HexColorPicker 
                value={value} 
                onChange={onChange} 
                className="rounded-lg border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]"
              />
            </div>
          </PopoverContent>
        </Popover>
        <Input
          value={value}
          onChange={(e) => handleSelectColor(e.target.value)}
          type="text"
          className="rounded-l-none border-2 border-black border-l-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] font-bold text-black focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-black"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
