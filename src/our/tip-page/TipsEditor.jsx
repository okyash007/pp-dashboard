import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ColorPicker";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/ImageUpload";
import { Palette, Image, Type, Settings, Sparkles, Wand2 } from "lucide-react";

const TipsEditor = ({ block, setBlock }) => {
  const handleButtonBackgroundChange = (color) => {
    setBlock({
      ...block,
      tip_btn: {
        ...block.tip_btn,
        style: { ...block.tip_btn.style, backgroundColor: color },
      },
    });
  };

  const handleButtonTextChange = (color) => {
    setBlock({
      ...block,
      tip_btn: {
        ...block.tip_btn,
        style: { ...block.tip_btn.style, color: color },
      },
    });
  };

  const handleCardImageChange = (imageUrl) => {
    setBlock({
      ...block,
      tip_card: {
        ...block.tip_card,
        data: { ...block.tip_card.data, background_image: imageUrl },
      },
    });
  };

  const handleCardPrimaryChange = (color) => {
    setBlock({...block, tip_card: { ...block.tip_card, data: { ...block.tip_card.data, primary_color: color } } });
  };

  const handleCardSecondaryChange = (color) => {
    setBlock({...block, tip_card: { ...block.tip_card, data: { ...block.tip_card.data, secondary_color: color } } });
  };

  const handleCardTertiaryChange = (color) => {
    setBlock({...block, tip_card: { ...block.tip_card, data: { ...block.tip_card.data, text_color: color } } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 hover:from-purple-200 hover:via-pink-200 hover:to-indigo-200 text-purple-800 border-2 border-purple-300 rounded-xl shadow-[3px_3px_0px_0px_rgba(139,92,246,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(139,92,246,0.5)] transition-all duration-200 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none group"
        >
          <Wand2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
          <span className="font-semibold">Configure Tips</span>
          <Sparkles className="w-4 h-4 ml-2 group-hover:animate-pulse" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-72 border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] p-0"
        align="start"
      >
        <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-gray-800 text-sm">
              Tips Configuration
            </h3>
          </div>
        </div>

        <DropdownMenuGroup className="p-0">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-purple-100 rounded-lg mx-2 my-1 flex items-center gap-2">
              <Type className="w-4 h-4 text-purple-600" />
              <span className="font-medium">Edit Tip Button</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] w-56">
                <div className="p-3 space-y-3">
                  <div>
                    <Label className="text-xs font-bold text-gray-600 flex items-center gap-1 mb-1">
                      <Palette className="w-3 h-3" />
                      Background Color
                    </Label>
                    <ColorPicker
                      value={block.tip_btn.style?.backgroundColor}
                      onChange={handleButtonBackgroundChange}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-600 flex items-center gap-1 mb-1">
                      <Type className="w-3 h-3" />
                      Text Color
                    </Label>
                    <ColorPicker
                      value={block.tip_btn.style?.color}
                      onChange={handleButtonTextChange}
                    />
                  </div>
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-purple-100 rounded-lg mx-2 my-1 flex items-center gap-2">
              <Image className="w-4 h-4 text-purple-600" />
              <span className="font-medium">Edit Tip Card</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] w-56">
                <div className="p-3 space-y-3">
                  <div>
                    <Label className="text-xs font-bold text-gray-600 flex items-center gap-1 mb-1">
                      <Image className="w-3 h-3" />
                      Background Image
                    </Label>
                    <ImageUpload
                      value={block.tip_card.data?.background_image}
                      onChange={handleCardImageChange}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-600 flex items-center gap-1 mb-1">
                      <Palette className="w-3 h-3" />
                      Primary Color
                    </Label>
                    <ColorPicker
                      value={block.tip_card.data?.primary_color}
                      onChange={handleCardPrimaryChange}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-600 flex items-center gap-1 mb-1">
                      <Palette className="w-3 h-3" />
                      Secondary Color
                    </Label>
                    <ColorPicker
                      value={block.tip_card.data?.secondary_color}
                      onChange={handleCardSecondaryChange}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-600 flex items-center gap-1 mb-1">
                      <Palette className="w-3 h-3" />
                      Tertiary Color
                    </Label>
                    <ColorPicker
                      value={block.tip_card.data?.text_color}
                      onChange={handleCardTertiaryChange}
                    />
                  </div>
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TipsEditor;
