import React from "react";
import LiquidRenderer from "../LiquidRenderer";
import { Label } from "@/components/ui/label";
import { Label as LabelComponent } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "../../components/ColorPicker";
import ImageUpload from "../../components/ImageUpload";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, RotateCcw, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../../stores/authStore";

export const dummyLeaderboardBlocks = [
  {
    type: "leaderboard",
    className: "p-4",
    name: "leaderboard-card-1",
    data: {
      title: "TOP SUPPORTERS",
      primary_color: "#FEF18C",
      rank_colors: ["#828BF8", "#FEF18C", "#AAD6B8", "#FEC4FF"],
      text_color: "#000000",
      heading_text_color: "#000000",
      background_image: null,
    },
    style: {},
    template: [
      "<style>",
      "  @keyframes slideInLeft {",
      "    from { transform: translateX(-100%); opacity: 0; }",
      "    to { transform: translateX(0); opacity: 1; }",
      "  }",
      "  @keyframes crownBounce {",
      "    0%, 100% { transform: translateY(0) rotate(-15deg); }",
      "    50% { transform: translateY(-5px) rotate(15deg); }",
      "  }",
      "  @keyframes rankPulse {",
      "    0%, 100% { transform: scale(1) rotate(-12deg); }",
      "    50% { transform: scale(1.1) rotate(12deg); }",
      "  }",
      "  @keyframes amountShine {",
      "    0% { background-position: -200% center; }",
      "    100% { background-position: 200% center; }",
      "  }",
      "  .leaderboard-row {",
      "    animation: slideInLeft 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards;",
      "  }",
      "  .crown-icon { animation: crownBounce 2s ease-in-out infinite; display: inline-block; }",
      "  .rank-badge { animation: rankPulse 3s ease-in-out infinite; }",
      "  .amount-box {",
      "    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);",
      "    background-size: 200% 100%;",
      "    animation: amountShine 3s infinite;",
      "  }",
      "</style>",
      '<div class="relative inline-block w-full">',
      "  <div class=\"relative border-[6px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden backdrop-blur-sm\" style=\"background-color: {{ data.primary_color | default: '#FEF18C' }}; {% if data.background_image %}background-image: url('{{ data.background_image }}'); background-size: cover; background-position: center; background-repeat: no-repeat;{% endif %}\">",
      "    ",
      '    <div class="absolute inset-0 opacity-70" style="background: repeating-linear-gradient(45deg, rgba(130,139,248,0.12) 0px, rgba(130,139,248,0.12) 8px, rgba(170,214,184,0.12) 8px, rgba(170,214,184,0.12) 16px), radial-gradient(circle, rgba(0,0,0,0.15) 2.5px, transparent 2.5px); background-size: auto, 20px 20px;"></div>',
      '    <div class="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/10 pointer-events-none"></div>',
      "    ",
      '    <img src="https://res.cloudinary.com/dspp405ug/image/upload/v1760471365/cool_zdwwcs.svg" alt="Mascot" class="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 pointer-events-none" style="transform: rotate(25deg);" />',
      "    ",
      '    <div class="relative z-10 p-5 space-y-4">',
      "      ",
      '      <div class="text-center relative mb-2">',
      '        <div class="inline-block bg-black border-[4px] border-black px-8 py-5 shadow-[4px_4px_0px_0px_rgba(254,241,140,1)] relative">',
      '          <h2 class="text-2xl font-black uppercase tracking-tight text-white" style="text-shadow: 2px 2px 0px rgba(254,241,140,0.5);">',
      "            {{ data.title }}",
      "          </h2>",
      '          <div class="absolute -top-3 -right-10 w-12 h-12 bg-[#FEF18C] border-[3px] border-black flex items-center justify-center font-black text-xs rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">',
      "            POW!",
      "          </div>",
      "        </div>",
      '        <div class="absolute -top-4 -left-4 w-8 h-8 bg-[#828BF8] border-[3px] border-black rotate-45"></div>',
      '        <div class="absolute -bottom-3 -right-3 w-6 h-6 bg-[#AAD6B8] border-[3px] border-black rotate-[30deg]"></div>',
      "      </div>",
      "      ",
      '      <div class="space-y-3">',
      "        {% assign max_amount = rankers.first.amount %}",
      "        {% for contributor in rankers %}",
      "        {% assign row_delay = contributor.rank | minus: 1 | times: 0.1 %}",
      "        {% assign rank_mod = contributor.rank | modulo: 5 %}",
      "        {% assign progress_width = contributor.amount | times: 100.0 | divided_by: max_amount %}",
      "        {% assign opacity_value = progress_width | divided_by: 100.0 %}",
      "        ",
      '        <div class="leaderboard-row relative group flex items-center" style="animation-delay: {{ row_delay }}s;">',
      "          ",
      "          {% if contributor.rank == 1 %}",
      '          <div class="rank-badge relative flex items-center justify-center w-12 h-12 bg-white border-[4px] border-black font-black text-xl z-20" style="transform: rotate(-12deg);">',
      '            <span class="crown-icon absolute -top-5 text-2xl" style="filter: drop-shadow(2px 2px 0px rgba(0,0,0,0.3));">👑</span>',
      '            <span style="font-size: 0.75em;">#</span>{{ contributor.rank }}',
      "          </div>",
      "          {% elsif contributor.rank == 2 %}",
      '          <div class="rank-badge flex items-center justify-center w-12 h-12 bg-white border-[3px] border-black font-black text-xl z-20" style="transform: rotate(8deg);">',
      '            <span style="font-size: 0.75em;">#</span>{{ contributor.rank }}',
      "          </div>",
      "          {% elsif contributor.rank == 3 %}",
      '          <div class="rank-badge flex items-center justify-center w-12 h-12 bg-white border-[3px] border-black font-black text-xl z-20" style="transform: rotate(-5deg);">',
      '            <span style="font-size: 0.75em;">#</span>{{ contributor.rank }}',
      "          </div>",
      "          {% else %}",
      '          <div class="flex items-center justify-center w-12 h-12 bg-white border-[3px] border-black font-bold text-xl z-20">',
      '            <span style="font-size: 0.75em;">#</span>{{ contributor.rank }}',
      "          </div>",
      "          {% endif %}",
      "          ",
      "          {% if contributor.rank == 1 %}",
      '          <div class="border-[3px] border-black px-4 py-1.5 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#828BF8] to-[#6B7BF8]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="absolute -top-1 -right-1 w-5 h-5 bg-[#FEF18C] border-[2px] border-black rotate-12 flex items-center justify-center font-black text-[6px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">ZAP!</div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-base uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      "                {{ contributor.name }}",
      "              </div>",
      '              <div class="font-black text-base whitespace-nowrap ml-3 flex items-baseline" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-base">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-base">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-base">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-base">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      "                {% else %}",
      "                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}",
      "                {% endif %}",
      "              </div>",
      "            </div>",
      "          </div>",
      "          {% elsif contributor.rank == 2 %}",
      '          <div class="border-[3px] border-black px-4 py-1.5 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#FEF18C] to-[#FDE047]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="absolute -top-1 -right-1 w-4 h-4 bg-[#AAD6B8] border-[1.5px] border-black rotate-45"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-base uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      "                {{ contributor.name }}",
      "              </div>",
      '              <div class="font-black text-base whitespace-nowrap ml-3 flex items-baseline" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-base">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-base">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-base">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-base">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      "                {% else %}",
      "                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}",
      "                {% endif %}",
      "              </div>",
      "            </div>",
      "          </div>",
      "          {% elsif contributor.rank == 3 %}",
      '          <div class="border-[3px] border-black px-4 py-1.5 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#AAD6B8] to-[#90C9A8]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="absolute -top-1 -right-1 w-3 h-3 bg-[#FEC4FF] border-[1.5px] border-black rotate-[20deg]"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-base uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      "                {{ contributor.name }}",
      "              </div>",
      '              <div class="font-black text-base whitespace-nowrap ml-3 flex items-baseline" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-base">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-base">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-base">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-base">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      "                {% else %}",
      "                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}",
      "                {% endif %}",
      "              </div>",
      "            </div>",
      "          </div>",
      "          {% elsif rank_mod == 0 %}",
      '          <div class="border-[3px] border-black px-4 py-1.5 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#FEC4FF] to-[#FEAEFF]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-base uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      "                {{ contributor.name }}",
      "              </div>",
      '              <div class="font-black text-base whitespace-nowrap ml-3 flex items-baseline" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-base">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-base">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-base">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-base">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      "                {% else %}",
      "                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}",
      "                {% endif %}",
      "              </div>",
      "            </div>",
      "          </div>",
      "          {% elsif rank_mod == 1 %}",
      '          <div class="border-[3px] border-black px-4 py-1.5 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#828BF8] to-[#A8AFF8]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-base uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      "                {{ contributor.name }}",
      "              </div>",
      '              <div class="font-black text-base whitespace-nowrap ml-3 flex items-baseline" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-base">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-base">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-base">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-base">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      "                {% else %}",
      "                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}",
      "                {% endif %}",
      "              </div>",
      "            </div>",
      "          </div>",
      "          {% elsif rank_mod == 2 %}",
      '          <div class="border-[3px] border-black px-4 py-1.5 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#FEF18C] to-[#FEF8B0]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-base uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      "                {{ contributor.name }}",
      "              </div>",
      '              <div class="font-black text-base whitespace-nowrap ml-3 flex items-baseline" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-base">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-base">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-base">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-base">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      "                {% else %}",
      "                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}",
      "                {% endif %}",
      "              </div>",
      "            </div>",
      "          </div>",
      "          {% else %}",
      '          <div class="border-[3px] border-black px-4 py-1.5 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#fff] to-[#C5CAE9]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '                <div class="font-black text-base uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      "                  {{ contributor.name }}",
      "                </div>",
      '                <div class="font-black text-base whitespace-nowrap ml-3 flex items-baseline" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                  {% if contributor.currency == "INR" %}',
      '                  <span class="text-base">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                  {% elsif contributor.currency == "USD" %}',
      '                  <span class="text-base">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                  {% elsif contributor.currency == "EUR" %}',
      '                  <span class="text-base">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                  {% elsif contributor.currency == "GBP" %}',
      '                  <span class="text-base">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      "                  {% else %}",
      "                  {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}",
      "                  {% endif %}",
      "                </div>",
      "            </div>",
      "          </div>",
      "          {% endif %}",
      "          ",
      "        </div>",
      "        {% endfor %}",
      "      </div>",
      "      ",
      '      <div class="flex items-center justify-center gap-1.5 bg-white border-[3px] border-black px-3 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style="background: linear-gradient(to right, #ffffff 0%, #f9f9f9 100%);">',
      '        <span class="text-[9px] font-bold text-black/70 uppercase tracking-[0.3em]" style="text-shadow: 0 1px 1px rgba(255,255,255,0.8);">Because support deserves spotlight</span>',
      "      </div>",
      "      ",
      "    </div>",
      "  </div>",
      "</div>",
    ].join("\n"),
  },
];

export const dummyLeaderboardData = {
  rankers: [
    {
      rank: 1,
      name: "Aarav Sharma",
      amount: 152000,
      currency: "INR",
      message: "For always keeping the vibe alive 🔥",
    },
    {
      rank: 2,
      name: "Sneha Kapoor",
      amount: 126500,
      currency: "INR",
      message: "Your content deserves every rupee 💖",
    },
    {
      rank: 3,
      name: "Rohan Mehta",
      amount: 118000,
      currency: "INR",
      message: "Big fan of your hustle bro 💪",
    },
    {
      rank: 4,
      name: "Diya Patel",
      amount: 97000,
      currency: "INR",
      message: "Keep shining queen 👑✨",
    },
    {
      rank: 5,
      name: "Vikram Joshi",
      amount: 88000,
      currency: "INR",
      message: "Because talent like this needs fuel 🚀",
    },
  ],
};

const LeaderboardBlockEditor = ({ block, setBlock, isSaving, hasUnsavedChanges, lastSaved, onSave, autoSaveEnabled, onAutoSaveToggle }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();

  const handleGoBack = () => {
    // Remove all URL parameters by navigating to the current pathname
    setSearchParams({});
  };

  const resetBlock = () => {
    setBlock({
      ...block,
      template: dummyLeaderboardBlocks[0].template,
      name: dummyLeaderboardBlocks[0].name,
      data: { ...dummyLeaderboardBlocks[0].data },
    });
  };

  const handleOpenOverlay = () => {
    if (user?.username) {
      const overlayUrl = `https://link.apextip.space/overlay/${user.username}?block_type=leaderboard`;
      window.open(overlayUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="h-[calc(95vh-9rem)] w-full rounded-xl flex">
      {/* <div className=' w-[400px] overflow-y-auto p-2 border-r-2 border-black'>
        {dummyLeaderboardBlocks.map((blockh) => {
          return (
            <div
              key={blockh.type}
              className={`p-2 cursor-pointer ${
                block.name && block.name === blockh.name ? '' : ''
              }`}
              onClick={() =>
                setBlock({
                  ...block,
                  template: blockh.template,
                  name: blockh.name,
                })
              }
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
              <ExternalLink
                className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform duration-300"
                strokeWidth={3}
              />
              <span className="relative z-10">VIEW OVERLAY</span>
            </Button>
          </div>
        </div>
        <LiquidRenderer
          html={block.template}
          data={{ ...dummyLeaderboardData, data: block.data }}
          className={block.className}
          style={block.style}
        />
      </div>
      <div className="flex flex-col">
        {/* Editor Content - Inside white border box, scrollable */}
        <div className="w-[300px] flex-1 overflow-y-auto bg-[#F5F5F55a] border-4 border-white rounded-xl p-4">
          <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
              Title
            </Label>
            <Input
              value={block.data.title}
              onChange={(e) =>
                setBlock({
                  ...block,
                  data: { ...block.data, title: e.target.value },
                })
              }
              className="border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
              Background Color
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
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
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
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
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
          <div className="pt-4 border-t-2 border-gray-300">
            <div className="bg-[#FEF18C] border-[3px] border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] font-bold text-black uppercase tracking-wide">
                💡 Each rank gets a unique color automatically!
              </p>
            </div>
          </div>
        </div>
        </div>
        {/* Save Controls Section - Outside white border box, sticky at bottom */}
        <div className="sticky bottom-0 z-10 mt-3">
          <div className="bg-white rounded-lg border-2 border-black p-3 space-y-3">
            <div className="flex items-center justify-between">
              <LabelComponent className="text-sm font-bold text-gray-700">Overlay</LabelComponent>
              <div className="flex items-center gap-2">
                {lastSaved && !hasUnsavedChanges && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 border border-green-300 rounded">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    <span className="text-[10px] font-semibold text-green-700">Saved</span>
                  </div>
                )}
                {hasUnsavedChanges && (
                  <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2 py-1 border border-orange-300 rounded uppercase tracking-wide">
                    Unsaved
                  </span>
                )}
                <Button
                  onClick={onSave}
                  disabled={isSaving || !hasUnsavedChanges}
                  className="bg-[#828BF8] hover:bg-[#828BF8]/80 text-white font-black text-xs px-3 py-1.5 h-auto border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                  <Save className="w-3 h-3 mr-1.5" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <LabelComponent htmlFor="auto-save-leaderboard" className="text-xs font-semibold text-gray-600 cursor-pointer">
                Auto Save
              </LabelComponent>
              <Switch
                id="auto-save-leaderboard"
                checked={autoSaveEnabled}
                onCheckedChange={onAutoSaveToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardBlockEditor;
