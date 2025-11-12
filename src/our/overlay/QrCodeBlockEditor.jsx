import React from "react";
import LiquidRenderer from "../LiquidRenderer";
import { Label } from "@/components/ui/label";
import ColorPicker from "../../components/ColorPicker";
import { ArrowLeft, ExternalLink, RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../../stores/authStore";

export const dummyQrCodeBlocks = [
  {
    type: "qr_code",
    name: "qr-code-card-1",
    className: "rounded-xl w-fit",
    data: {
      background_color: "white",
      qr_code_color: "black",
    },
    template: `
      <img style="background-color: {{ data.background_color | default: '#ffffff' }}; padding: 10px; border-radius: 10px;" src="https://api.qrserver.com/v1/create-qr-code/?data=https://link.apextip.space/vt/{{ username }}&amp;color={{ data.qr_code_color | remove: '#' }}&amp;bgcolor={{ data.background_color | remove: '#' }}" alt="QR Code" />
      `,
    style: {},
  },
];

export const dummyQrCodeData = {
  username: "test",
};

const QrCodeBlockEditor = ({ block, setBlock }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();

  const handleGoBack = () => {
    // Remove all URL parameters by navigating to the current pathname
    setSearchParams({});
  };

  const resetBlock = () => {
    setBlock({
      ...block,
      template: dummyQrCodeBlocks[0].template,
      name: dummyQrCodeBlocks[0].name,
      data: { ...dummyQrCodeBlocks[0].data },
    });
  };


  const handleOpenOverlay = () => {
    if (user?.username) {
      const overlayUrl = `https://link.apextip.space/overlay/${user.username}?block_type=tip`;
      window.open(overlayUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="h-[calc(95vh-8rem)] w-full rounded-xl flex">
      {/* <div className=" w-[300px] overflow-y-auto p-2 border-r-2 border-black">
        {dummyQrCodeBlocks.map((blockh) => {
          return (
            <div
              key={blockh.type}
              className={`p-2 ${
                block.name && block.name === blockh.name
                  ? "rounded-xl bg-gray-400"
                  : ""
              }`}
              onClick={() =>
                setBlock({
                  ...block,
                  template: blockh.template,
                  name: blockh.name,
                  className: blockh.className,
                })
              }
            >
              <LiquidRenderer
                html={blockh.template}
                data={{ ...dummyQrCodeData, data: blockh.data }}
                className={blockh.className}
                style={blockh.style}
              />
            </div>
          );
        })}
      </div> */}
      <div className="flex-1 flex justify-center items-center relative">
        <div className="absolute top-0 left-0">
          <div className="flex gap-2">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex items-center justify-center bg-white hover:bg-[#FEF18C] text-black border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={3} />
            </Button>
            <Button
              onClick={resetBlock}
              variant="outline"
              className="flex items-center gap-2 justify-center bg-gradient-to-br from-[#FF6B6B] via-[#FF8E8E] to-[#FF6B6B] hover:from-[#FF5252] hover:via-[#FF7979] hover:to-[#FF5252] text-white font-black uppercase tracking-wider text-sm border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 px-5 py-2.5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <RotateCcw
                className="h-4 w-4 relative z-10 group-hover:rotate-180 transition-transform duration-300"
                strokeWidth={3}
              />
              <span className="relative z-10">RESET</span>
            </Button>
            <Button
                onClick={handleOpenOverlay}
                variant="outline"
                disabled={!user?.username}
                className="flex items-center gap-2 justify-center bg-gradient-to-br from-[#828BF8] via-[#A5ACF9] to-[#828BF8] hover:from-[#6B75F7] hover:via-[#8E96F8] hover:to-[#6B75F7] text-white font-black uppercase tracking-wider text-sm border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 px-5 py-2.5 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <ExternalLink className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={3} />
                <span className="relative z-10">VIEW OVERLAY</span>
              </Button>
          </div>
        </div>

        <LiquidRenderer
          html={block.template}
          data={{ ...dummyQrCodeData, data: block.data }}
          className={block.className}
          style={block.style}
        />
      </div>
      <div className="w-[300px] p-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500">
              Background Color
            </Label>
            <ColorPicker
              value={block.data.background_color}
              onChange={(color) =>
                setBlock({
                  ...block,
                  data: { ...block.data, background_color: color },
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500">
              QR Code Color
            </Label>
            <ColorPicker
              value={block.data.qr_code_color}
              onChange={(color) =>
                setBlock({
                  ...block,
                  data: { ...block.data, qr_code_color: color },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCodeBlockEditor;
