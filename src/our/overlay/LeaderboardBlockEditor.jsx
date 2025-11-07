import React from 'react';
import LiquidRenderer from '../LiquidRenderer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ColorPicker from '../../components/ColorPicker';
import ImageUpload from '../../components/ImageUpload';

const dummyLeaderboardBlocks = [
  {
    type: 'leaderboard',
    className: '',
    name: 'leaderboard-card-1',
    data: {
      title: 'TOP SUPPORTERS',
      primary_color: '#FEF18C',
      rank_colors: ['#828BF8', '#FEF18C', '#AAD6B8', '#FEC4FF'],
      text_color: '#000000',
      heading_text_color: '#000000',
      background_image: null,
    },
    style: {},
    template: [
      '<style>',
      '  @keyframes slideInLeft {',
      '    from { transform: translateX(-100%); opacity: 0; }',
      '    to { transform: translateX(0); opacity: 1; }',
      '  }',
      '  @keyframes crownBounce {',
      '    0%, 100% { transform: translateY(0) rotate(-15deg); }',
      '    50% { transform: translateY(-5px) rotate(15deg); }',
      '  }',
      '  @keyframes rankPulse {',
      '    0%, 100% { transform: scale(1) rotate(-12deg); }',
      '    50% { transform: scale(1.1) rotate(12deg); }',
      '  }',
      '  @keyframes amountShine {',
      '    0% { background-position: -200% center; }',
      '    100% { background-position: 200% center; }',
      '  }',
      '  .leaderboard-row {',
      '    animation: slideInLeft 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards;',
      '  }',
      '  .crown-icon { animation: crownBounce 2s ease-in-out infinite; display: inline-block; }',
      '  .rank-badge { animation: rankPulse 3s ease-in-out infinite; }',
      '  .amount-box {',
      '    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);',
      '    background-size: 200% 100%;',
      '    animation: amountShine 3s infinite;',
      '  }',
      '</style>',
      '<div class="relative inline-block w-full max-w-[550px]">',
      '  <div class="relative border-[6px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden backdrop-blur-sm" style="background-color: {{ data.primary_color | default: \'#FEF18C\' }}; {% if data.background_image %}background-image: url(\'{{ data.background_image }}\'); background-size: cover; background-position: center; background-repeat: no-repeat;{% endif %}">',
      '    ',
      '    <div class="absolute inset-0 opacity-70" style="background: repeating-linear-gradient(45deg, rgba(130,139,248,0.12) 0px, rgba(130,139,248,0.12) 8px, rgba(170,214,184,0.12) 8px, rgba(170,214,184,0.12) 16px), radial-gradient(circle, rgba(0,0,0,0.15) 2.5px, transparent 2.5px); background-size: auto, 20px 20px;"></div>',
      '    <div class="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/10 pointer-events-none"></div>',
      '    ',
      '    <img src="https://res.cloudinary.com/dspp405ug/image/upload/v1760471365/cool_zdwwcs.svg" alt="Mascot" class="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 pointer-events-none" style="transform: rotate(25deg);" />',
      '    ',
      '    <div class="relative z-10 p-5 space-y-4">',
      '      ',
      '      <div class="text-center relative mb-2">',
      '        <div class="inline-block bg-black border-[4px] border-black px-8 py-5 shadow-[4px_4px_0px_0px_rgba(254,241,140,1)] relative">',
      '          <h2 class="text-2xl font-black uppercase tracking-tight text-white" style="text-shadow: 2px 2px 0px rgba(254,241,140,0.5);">',
      '            {{ data.title }}',
      '          </h2>',
      '          <div class="absolute -top-3 -right-10 w-12 h-12 bg-[#FEF18C] border-[3px] border-black flex items-center justify-center font-black text-xs rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">',
      '            POW!',
      '          </div>',
      '        </div>',
      '        <div class="absolute -top-4 -left-4 w-8 h-8 bg-[#828BF8] border-[3px] border-black rotate-45"></div>',
      '        <div class="absolute -bottom-3 -right-3 w-6 h-6 bg-[#AAD6B8] border-[3px] border-black rotate-[30deg]"></div>',
      '      </div>',
      '      ',
      '      <div class="space-y-3">',
      '        {% assign max_amount = rankers.first.amount %}',
      '        {% for contributor in rankers %}',
      '        {% assign row_delay = contributor.rank | minus: 1 | times: 0.1 %}',
      '        {% assign rank_mod = contributor.rank | modulo: 5 %}',
      '        {% assign progress_width = contributor.amount | times: 100.0 | divided_by: max_amount %}',
      '        {% assign opacity_value = progress_width | divided_by: 100.0 %}',
      '        ',
      '        <div class="leaderboard-row relative group flex items-center" style="animation-delay: {{ row_delay }}s;">',
      '          ',
      '          {% if contributor.rank == 1 %}',
      '          <div class="rank-badge relative flex items-center justify-center w-12 h-12 bg-white border-[4px] border-black font-black text-xl z-20" style="transform: rotate(-12deg);">',
      '            <span class="crown-icon absolute -top-5 text-2xl" style="filter: drop-shadow(2px 2px 0px rgba(0,0,0,0.3));">👑</span>',
      '            {{ contributor.rank }}',
      '          </div>',
      '          {% elsif contributor.rank == 2 %}',
      '          <div class="rank-badge flex items-center justify-center w-12 h-12 bg-white border-[3px] border-black font-black text-xl z-20" style="transform: rotate(8deg);">',
      '            {{ contributor.rank }}',
      '          </div>',
      '          {% elsif contributor.rank == 3 %}',
      '          <div class="rank-badge flex items-center justify-center w-12 h-12 bg-white border-[3px] border-black font-black text-xl z-20" style="transform: rotate(-5deg);">',
      '            {{ contributor.rank }}',
      '          </div>',
      '          {% else %}',
      '          <div class="flex items-center justify-center w-12 h-12 bg-white border-[3px] border-black font-bold text-xl z-20">',
      '            {{ contributor.rank }}',
      '          </div>',
      '          {% endif %}',
      '          ',
      '          {% if contributor.rank == 1 %}',
      '          <div class="border-[3px] border-black px-3 py-1 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#828BF8] to-[#6B7BF8]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="absolute -top-1 -right-1 w-5 h-5 bg-[#FEF18C] border-[2px] border-black rotate-12 flex items-center justify-center font-black text-[6px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">ZAP!</div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-sm uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      '                {{ contributor.name }}',
      '              </div>',
      '              <div class="font-black text-sm whitespace-nowrap ml-3" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-lg">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-lg">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-lg">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-lg">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% else %}',
      '                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% endif %}',
      '              </div>',
      '            </div>',
      '          </div>',
      '          {% elsif contributor.rank == 2 %}',
      '          <div class="border-[3px] border-black px-3 py-1 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#FEF18C] to-[#FDE047]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="absolute -top-1 -right-1 w-4 h-4 bg-[#AAD6B8] border-[1.5px] border-black rotate-45"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-sm uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      '                {{ contributor.name }}',
      '              </div>',
      '              <div class="font-black text-sm whitespace-nowrap ml-3" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-lg">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-lg">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-lg">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-lg">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% else %}',
      '                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% endif %}',
      '              </div>',
      '            </div>',
      '          </div>',
      '          {% elsif contributor.rank == 3 %}',
      '          <div class="border-[3px] border-black px-3 py-1 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#AAD6B8] to-[#90C9A8]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="absolute -top-1 -right-1 w-3 h-3 bg-[#FEC4FF] border-[1.5px] border-black rotate-[20deg]"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-sm uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      '                {{ contributor.name }}',
      '              </div>',
      '              <div class="font-black text-sm whitespace-nowrap ml-3" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-lg">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-lg">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-lg">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-lg">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% else %}',
      '                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% endif %}',
      '              </div>',
      '            </div>',
      '          </div>',
      '          {% elsif rank_mod == 0 %}',
      '          <div class="border-[3px] border-black px-3 py-1 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#FEC4FF] to-[#FEAEFF]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-sm uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      '                {{ contributor.name }}',
      '              </div>',
      '              <div class="font-black text-sm whitespace-nowrap ml-3" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-lg">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-lg">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-lg">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-lg">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% else %}',
      '                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% endif %}',
      '              </div>',
      '            </div>',
      '          </div>',
      '          {% elsif rank_mod == 1 %}',
      '          <div class="border-[3px] border-black px-3 py-1 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#828BF8] to-[#A8AFF8]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-sm uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      '                {{ contributor.name }}',
      '              </div>',
      '              <div class="font-black text-sm whitespace-nowrap ml-3" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-lg">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-lg">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-lg">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-lg">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% else %}',
      '                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% endif %}',
      '              </div>',
      '            </div>',
      '          </div>',
      '          {% elsif rank_mod == 2 %}',
      '          <div class="border-[3px] border-black px-3 py-1 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#FEF18C] to-[#FEF8B0]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '              <div class="font-black text-sm uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      '                {{ contributor.name }}',
      '              </div>',
      '              <div class="font-black text-sm whitespace-nowrap ml-3" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                {% if contributor.currency == "INR" %}',
      '                <span class="text-lg">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "USD" %}',
      '                <span class="text-lg">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "EUR" %}',
      '                <span class="text-lg">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% elsif contributor.currency == "GBP" %}',
      '                <span class="text-lg">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% else %}',
      '                {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                {% endif %}',
      '              </div>',
      '            </div>',
      '          </div>',
      '          {% else %}',
      '          <div class="border-[3px] border-black px-3 py-1 relative overflow-hidden flex-1 -ml-4">',
      '            <div class="absolute inset-0 bg-gradient-to-r from-[#fff] to-[#C5CAE9]" style="opacity: {{ opacity_value }};"></div>',
      '            <div class="relative z-10 flex items-center justify-between">',
      '                <div class="font-black text-sm uppercase tracking-tight truncate pl-2" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5), 2px 2px 0px rgba(0,0,0,0.15);">',
      '                  {{ contributor.name }}',
      '                </div>',
      '                <div class="font-black text-sm whitespace-nowrap ml-3" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '                  {% if contributor.currency == "INR" %}',
      '                  <span class="text-lg">₹</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                  {% elsif contributor.currency == "USD" %}',
      '                  <span class="text-lg">$</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                  {% elsif contributor.currency == "EUR" %}',
      '                  <span class="text-lg">€</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                  {% elsif contributor.currency == "GBP" %}',
      '                  <span class="text-lg">£</span>{{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                  {% else %}',
      '                  {{ contributor.currency }} {{ contributor.amount | divided_by: 100.0 | round: 2 }}',
      '                  {% endif %}',
      '                </div>',
      '            </div>',
      '          </div>',
      '          {% endif %}',
      '          ',
      '        </div>',
      '        {% endfor %}',
      '      </div>',
      '      ',
      '      <div class="flex items-center justify-center gap-1.5 bg-white border-[3px] border-black px-3 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style="background: linear-gradient(to right, #ffffff 0%, #f9f9f9 100%);">',
      '        <span class="text-[9px] font-bold text-black/70 uppercase tracking-[0.3em]" style="text-shadow: 0 1px 1px rgba(255,255,255,0.8);">Because support deserves spotlight</span>',
      '      </div>',
      '      ',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  },
];

const dummyLeaderboardData = {
  rankers: [
    {
      rank: 1,
      name: 'Aarav Sharma',
      amount: 152000,
      currency: 'INR',
      message: 'For always keeping the vibe alive 🔥',
    },
    {
      rank: 2,
      name: 'Sneha Kapoor',
      amount: 126500,
      currency: 'INR',
      message: 'Your content deserves every rupee 💖',
    },
    {
      rank: 3,
      name: 'Rohan Mehta',
      amount: 118000,
      currency: 'INR',
      message: 'Big fan of your hustle bro 💪',
    },
    {
      rank: 4,
      name: 'Diya Patel',
      amount: 97000,
      currency: 'INR',
      message: 'Keep shining queen 👑✨',
    },
    {
      rank: 5,
      name: 'Vikram Joshi',
      amount: 88000,
      currency: 'INR',
      message: 'Because talent like this needs fuel 🚀',
    },
  ],
};

const LeaderboardBlockEditor = ({ block, setBlock }) => {
  console.log(block);

  return (
    <div className='h-[calc(95vh-8rem)] w-full bg-gray-100 rounded-xl border-2 border-black flex'>
      <div className=' w-[400px] overflow-y-auto p-2 border-r-2 border-black'>
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
      </div>
      <div className='flex-1 flex justify-center items-center'>
        <LiquidRenderer
          html={block.template}
          data={{ ...dummyLeaderboardData, data: block.data }}
          className={block.className}
          style={block.style}
        />
      </div>
      <div className='w-[300px] overflow-y-auto p-4 border-l-2 border-black bg-gray-50'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label className='text-xs font-bold text-gray-700 uppercase tracking-wide'>Title</Label>
            <Input
              value={block.data.title}
              onChange={(e) =>
                setBlock({
                  ...block,
                  data: { ...block.data, title: e.target.value },
                })
              }
              className='border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold'
            />
          </div>
          <div className='space-y-2'>
            <Label className='text-xs font-bold text-gray-700 uppercase tracking-wide'>
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
          <div className='space-y-2'>
            <Label className='text-xs font-bold text-gray-700 uppercase tracking-wide'>
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
          <div className='space-y-2'>
            <Label className='text-xs font-bold text-gray-700 uppercase tracking-wide'>
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
          <div className='pt-4 border-t-2 border-gray-300'>
            <div className='bg-[#FEF18C] border-[3px] border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
              <p className='text-[10px] font-bold text-black uppercase tracking-wide'>
                💡 Each rank gets a unique color automatically!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardBlockEditor;
