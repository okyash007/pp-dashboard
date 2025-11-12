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
      <div className="flex items-center">
        <Popover modal={true}>
          <PopoverTrigger asChild>
            <Button
              className="relative w-12 h-9 rounded-r-none border-[3px] border-black border-r-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-white hover:bg-white transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none overflow-hidden group p-0"
            >
              {/* Checkerboard pattern background */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, #e5e5e5 25%, transparent 25%),
                    linear-gradient(-45deg, #e5e5e5 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #e5e5e5 75%),
                    linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)
                  `,
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                }}
              />
              {/* Color overlay */}
              <div 
                className="absolute inset-0 transition-opacity group-hover:opacity-95"
                style={{ backgroundColor: value || '#000000' }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-4 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            onInteractOutside={(e) => {
              // Prevent closing when clicking inside the color picker
              if (e.target.closest(".react-colorful")) {
                e.preventDefault();
              }
            }}
          >
            <div className="space-y-3">
              <HexColorPicker 
                color={value} 
                onChange={onChange} 
                className="rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
          </PopoverContent>
        </Popover>
        <Input
          value={value}
          onChange={(e) => handleSelectColor(e.target.value)}
          type="text"
          className="flex-1 rounded-l-none border-[3px] border-black border-l-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-sm text-black bg-white focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-black transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
