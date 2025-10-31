import React from "react";
import LiquidRenderer from "../LiquidRenderer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "../../components/ColorPicker";
import ImageUpload from "../../components/ImageUpload";

const dummyLeaderboardBlocks = [
  {
    type: "leaderboard",
    className: "",
    name: "leaderboard-card-1",
    data: {
        title: "Title Here",
        primary_color: "#4a154b",
        secondary_color: "#6b2c8a",
        tertiary_color: "#8c3d8e",
        text_color: "#ffffff",
        heading_text_color: "#000000",
        background_image: null,
    },
    style: {},
    template: `
    <div>
  <div style="
    background-color: {{ data.primary_color | default: '#fef3c7' }};
    {% if data.background_image %}background-image: url('{{ data.background_image }}'); background-size: cover; background-position: center; background-repeat: no-repeat;{% endif %}
    border-radius: 16px;
    padding: 20px;
    border: 3px solid #000000;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.6);
    position: relative;
    font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    max-width: 400px;
  ">
    
    <!-- Title -->
    <h2 style="
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      color: {{ data.heading_text_color | default: '#000000' }};
      margin: 0 0 20px 0;
      font-family: 'Rubik', -apple-system, BlinkMacSystemFont, sans-serif;
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      z-index: 1;
    ">
      {{ data.title }}
    </h2>
    
    <!-- Leaderboard entries -->
    <div style="display: flex; flex-direction: column; gap: 10px; position: relative; z-index: 1;">
      {% for contributor in rankers %}
      <div style="
        background: {{ data.secondary_color | default: '#ffffff' }};
        border-radius: 12px;
        padding: 14px 16px;
        border: 2px solid #000000;
        box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.6);
        transition: transform 0.1s ease;
      ">
        <div style="
          display: flex;
          align-items: center;
          gap: 12px;
        ">
          <!-- Rank Badge -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: {{ data.secondary_color | default: '#f3f4f6' }};
            border-radius: 50%;
            font-weight: bold;
            font-size: 18px;
            color: {{ data.text_color | default: '#000000' }};
            flex-shrink: 0;
            border: 2px solid #000000;
            box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.4);
          ">
            {{ contributor.rank }}
          </div>
          
          <!-- Username with crown for rank 1 -->
          <div style="flex: 1; display: flex; align-items: center; gap: 8px; min-width: 0;">
            <div style="
              font-weight: 600; 
              font-size: 16px; 
              color: {{ data.text_color | default: '#000000' }}; 
              font-family: 'Rubik', -apple-system, sans-serif;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            ">
              {{ contributor.name }}
            </div>
            {% if contributor.rank == 1 %}
            <span style="font-size: 22px; flex-shrink: 0;">👑</span>
            {% endif %}
          </div>
          
          <!-- Amount -->
          <div style="
            font-weight: 700;
            font-size: 16px;
            color: {{ data.text_color | default: '#000000' }};
            font-family: 'Rubik', -apple-system, sans-serif;
            white-space: nowrap;
            flex-shrink: 0;
            background: #ffffff;
            padding: 6px 12px;
            border-radius: 8px;
            border: 2px solid #000000;
            box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.4);
          ">
            {% if contributor.currency == 'INR' %}
            ₹ {{ contributor.amount | divided_by: 100.0 | round: 2 }}
            {% elsif contributor.currency == 'USD' %}
            $ {{ contributor.amount | divided_by: 100.0 | round: 2 }}
            {% elsif contributor.currency == 'EUR' %}
            € {{ contributor.amount | divided_by: 100.0 | round: 2 }}
            {% elsif contributor.currency == 'GBP' %}
            £ {{ contributor.amount | divided_by: 100.0 | round: 2 }}
            {% else %}
            {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}
            {% endif %}
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</div>`,
  },
];

const dummyLeaderboardData = {
  rankers: [
    {
      rank: 1,
      name: "John Doe",
      amount: 100000,
      currency: "INR",
    },
    {
      rank: 2,
      name: "Jane Doe",
      amount: 90000,
      currency: "INR",
    },
    {
      rank: 3,
      name: "Jim Doe",
      amount: 80000,
      currency: "INR",
    },
    {
      rank: 4,
      name: "Jill Doe",
      amount: 70000,
      currency: "INR",
    },
    {
      rank: 5,
      name: "Jill Doe",
      amount: 70000,
      currency: "INR",
    },
  ],
};

const LeaderboardBlockEditor = ({ block, setBlock }) => {

  console.log(block);

  return (
    <div className="h-[calc(95vh-8rem)] w-full bg-gray-100 rounded-xl border-2 border-black flex">
      <div className=" w-[300px] overflow-y-auto p-2 border-r-2 border-black">
        {dummyLeaderboardBlocks.map((blockh) => {
          return (
            <div
              key={blockh.type}
              className={`p-2 cursor-pointer ${
                block.name && block.name === blockh.name
                  ? "rounded-xl bg-gray-400"
                  : ""
              }`}
              onClick={() => setBlock({ ...block, template: blockh.template, name: blockh.name })}
            >
              <LiquidRenderer
                html={blockh.template}
                data={{ ...dummyLeaderboardData, data: blockh.data }}
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
          data={{ ...dummyLeaderboardData, data: block.data }}
          className={block.className}
          style={block.style}
        />
      </div>
      <div className=" w-[300px] overflow-y-auto p-2 border-l-2 border-black">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500">Title</Label>
            <Input
              value={block.data.title}
              onChange={(e) =>
                setBlock({
                  ...block,
                  data: { ...block.data, title: e.target.value },
                })
              }
            />
          </div>
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
              Tertiary Color
            </Label>
            <ColorPicker
              value={block.data.tertiary_color}
              onChange={(color) => {
                setBlock({
                  ...block,
                  data: { ...block.data, tertiary_color: color },
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-500">
              Heading Text Color
            </Label>
            <ColorPicker
              value={block.data.heading_text_color}
              onChange={(color) => {
                setBlock({
                  ...block,
                  data: { ...block.data, heading_text_color: color },
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
        </div>
      </div>
    </div>
  );
};

export default LeaderboardBlockEditor;
