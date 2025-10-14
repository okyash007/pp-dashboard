import React from "react";
import { Label } from "../../components/ui/label";
import ColorPicker from "../../components/ColorPicker";

const ColorPickers = ({ config, setConfig }) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 h-fit">
      <div className="space-y-1">
        <Label className="text-xs font-bold text-gray-500">Primary color</Label>
        <ColorPicker
          value={config.colors.primary}
          onChange={(color) =>
            setConfig((prev) => ({
              ...prev,
              colors: { ...prev.colors, primary: color },
            }))
          }
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-bold text-gray-500">
          Secondary color
        </Label>
        <ColorPicker
          value={config.colors.secondary}
          onChange={(color) =>
            setConfig((prev) => ({
              ...prev,
              colors: { ...prev.colors, secondary: color },
            }))
          }
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-bold text-gray-500">Accent color</Label>
        <ColorPicker
          value={config.colors.accent}
          onChange={(color) =>
            setConfig((prev) => ({
              ...prev,
              colors: { ...prev.colors, accent: color },
            }))
          }
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-bold text-gray-500">Success color</Label>
        <ColorPicker
          value={config.colors.success}
          onChange={(color) =>
            setConfig((prev) => ({
              ...prev,
              colors: { ...prev.colors, success: color },
            }))
          }
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-bold text-gray-500">Warning color</Label>
        <ColorPicker
          value={config.colors.warning}
          onChange={(color) =>
            setConfig((prev) => ({
              ...prev,
              colors: { ...prev.colors, warning: color },
            }))
          }
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-bold text-gray-500">Error color</Label>
        <ColorPicker
          value={config.colors.error}
          onChange={(color) =>
            setConfig((prev) => ({
              ...prev,
              colors: { ...prev.colors, error: color },
            }))
          }
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-bold text-gray-500">Muted color</Label>
        <ColorPicker
          value={config.colors.muted}
          onChange={(color) =>
            setConfig((prev) => ({
              ...prev,
              colors: { ...prev.colors, muted: color },
            }))
          }
        />
      </div>
    </div>
  );
};

export default ColorPickers;
