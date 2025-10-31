import React from "react";
import LiquidRenderer from "../LiquidRenderer";
import { Label } from "@/components/ui/label";
import ColorPicker from "../../components/ColorPicker";


const dummyQrCodeBlocks = [
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

const dummyQrCodeData = {
  username: "test",
};

const QrCodeBlockEditor = ({ block, setBlock }) => {
  return (
    <div className="h-[calc(95vh-8rem)] w-full bg-gray-100 rounded-xl border-2 border-black flex">
      <div className=" w-[300px] overflow-y-auto p-2 border-r-2 border-black">
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
      </div>
      <div className="flex-1 flex justify-center items-center">
        <LiquidRenderer
          html={block.template}
          data={{ ...dummyQrCodeData, data: block.data }}
          className={block.className}
          style={block.style}
        />
      </div>
      <div className="w-[300px] p-2 border-l-2 border-black">
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
