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
    setBlock({
      ...block,
      tip_card: {
        ...block.tip_card,
        data: { ...block.tip_card.data, primary_color: color },
      },
    });
  };

  const handleCardSecondaryChange = (color) => {
    setBlock({
      ...block,
      tip_card: {
        ...block.tip_card,
        data: { ...block.tip_card.data, secondary_color: color },
      },
    });
  };

  const handleCardTertiaryChange = (color) => {
    setBlock({
      ...block,
      tip_card: {
        ...block.tip_card,
        data: { ...block.tip_card.data, text_color: color },
      },
    });
  };

  return (
    <>
      <div className="space-y-1 ">
        <p className="text-lg font-bold text-gray-600 text-center">
          Tips Configuration
        </p>
        <div className="rounded-xl">
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
        </div>
      </div>
    </>
  );
};

export default TipsEditor;
