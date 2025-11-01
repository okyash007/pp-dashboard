import React from "react";
import LiquidRenderer from "../LiquidRenderer";
import { Label } from "@/components/ui/label";
import ColorPicker from "../../components/ColorPicker";
import ImageUpload from "../../components/ImageUpload";
import { Slider } from "@/components/ui/slider";

const dummyTipBata = {
  visitor_name: "John Doe",
  display_name: "John Doe",
  message: "Thank you for your tip!",
  created_at: Date.now(),
  amount: 20000,
  currency: "INR",
};

const dummyTipBlocks = [
  {
    type: "tip",
    name: "tip-card-1",
    data: {
      primary_color: "#615381",
      secondary_color: "#9668ff",
      text_color: "#ffffff",
      message_text_color: "#ffffff",
      background_image: null,
    },
    template: `
        <div class="p-3 rounded-lg space-y-2 relative bg-cover bg-center bg-no-repeat" style="background-color: {{ data.primary_color | default: '#8b5cf6' }}; {% if data.background_image %}background-image: url('{{ data.background_image }}');{% endif %}">
          <div class="flex items-center">
          <div>
          <img src="https://res.cloudinary.com/dspp405ug/image/upload/v1760471365/cool_zdwwcs.svg" class="w-12 h-12 rounded-full" />
          </div>
          <div>
            <p class="text-xs shadow-ld" style="color: {{ data.text_color | default: '#ffffff' }};">
              {{ display_name }}
            </p>
            <p class="text-lg font-bold shadow-lg" style="color: {{ data.text_color | default: '#ffffff' }};">
              {% if currency == 'INR' %}₹ {% elsif currency == 'USD' %}$ {% elsif currency == 'EUR' %}€ {% elsif currency == 'GBP' %}£ {% else %}{{ currency }}{% endif %}{{ amount | divided_by: 100 | round: 2 }}
            </p>
          </div>
          </div>
          {% if message and message != '' %}
          <div>
          <p class="p-3 rounded-lg shadow-sm" style="color: {{ data.message_text_color | default: '#ffffff' }}; background-color: {{ data.secondary_color | default: '#10b981' }};"> {{ message }} </p>
          </div>
          {% endif %}
        </div> 
    `,
    style: {},
  },
];

const TipBlockEditor = ({ block, setBlock }) => {
  console.log(block);

  return (
    <div className="h-[calc(95vh-8rem)] w-full bg-gray-100 rounded-xl border-2 border-black flex">
      <div className=" w-[300px] overflow-y-auto p-2 border-r-2 border-black">
        {dummyTipBlocks.map((blockh) => {
          return (
            <div
              key={blockh.type}
              className={`p-2 ${
                block.name && block.name === blockh.name
                  ? "rounded-xl bg-gray-400"
                  : ""
              }`}
              onClick={() => setBlock({ ...block, template: blockh.template, name: blockh.name })}
            >
              <LiquidRenderer
                key={blockh.id}
                html={blockh.template}
                data={{ ...dummyTipBata, data: blockh.data }}
                className={blockh.className}
                style={blockh.style}
              />
            </div>
          );
        })}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[300px]">
          <LiquidRenderer
            html={block.template}
            data={{ ...dummyTipBata, data: block.data }}
            className={block.className}
            style={block.style}
          />
        </div>
      </div>
      <div className="w-[300px] p-2 border-l-2 border-black">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500">
              Primary Color
            </Label>
            <ColorPicker
              value={block.data.primary_color}
              onChange={(color) => {
                setBlock({
                  ...block,
                  data: { ...block.data, primary_color: color },
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500">
              Secondary Color
            </Label>
            <ColorPicker
              value={block.data.secondary_color}
              onChange={(color) => {
                setBlock({
                  ...block,
                  data: { ...block.data, secondary_color: color },
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500">
              Text Color
            </Label>
            <ColorPicker
              value={block.data.text_color}
              onChange={(color) => {
                setBlock({
                  ...block,
                  data: { ...block.data, text_color: color },
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500">
              Message Text Color
            </Label>
            <ColorPicker
              value={block.data.message_text_color}
              onChange={(color) => {
                setBlock({
                  ...block,
                  data: { ...block.data, message_text_color: color },
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500">
              Background Image
            </Label>
            <ImageUpload
              value={block.data.background_image}
              onChange={(imageUrl) => {
                setBlock({
                  ...block,
                  data: { ...block.data, background_image: imageUrl },
                });
              }}
            />
          </div>
          <div className="space-y-3 pt-2 bg-white rounded-lg p-2 border-2 border-black">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-gray-500">
                Display Time
              </Label>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-200 rounded-md border border-gray-300">
                <span className="text-sm font-semibold text-gray-700">
                  {block.data.display_time || 20}
                </span>
                <span className="text-xs text-gray-500 font-medium">sec</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                min={1}
                max={60}
                step={1}
                value={[block.data.display_time || 20]}
                onValueChange={(value) => {
                  setBlock({
                    ...block,
                    data: { ...block.data, display_time: value[0] },
                  });
                }}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 px-1">
              <span>1s</span>
              <span>60s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipBlockEditor;
