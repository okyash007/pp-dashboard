import React from 'react';
import LiquidRenderer from '../LiquidRenderer';
import { Label } from '@/components/ui/label';
import ColorPicker from '../../components/ColorPicker';
import ImageUpload from '../../components/ImageUpload';
import { Slider } from '@/components/ui/slider';

const dummyTipBata = {
  visitor_name: 'John Doe',
  display_name: 'John Doe',
  message:
    'Hey! Just wanted to say your content really lifts my mood after long days. You’ve got such a genuine vibe and it shows in everything you do. Keep shining and doing what you love — this small tip is my way of saying thanks for the constant joy you bring 💛',
  created_at: Date.now(),
  amount: 20000,
  currency: 'INR',
};

const dummyTipBlocks = [
  {
    type: 'tip',
    name: 'tip-card-1',
    data: {
      primary_color: '#FEF18C',
      secondary_color: '#828BF8',
      text_color: '#000000',
      message_text_color: '#fff',
      background_image: null,
    },
    template: [
      '<style>',
      '  @keyframes slideInBounce {',
      '    0% { transform: translateX(100%) scale(0.8); opacity: 0; }',
      '    60% { transform: translateX(-10px) scale(1.05); opacity: 1; }',
      '    80% { transform: translateX(5px) scale(0.95); }',
      '    100% { transform: translateX(0) scale(1); opacity: 1; }',
      '  }',
      '  @keyframes potatoFloat {',
      '    0%, 100% { transform: translateY(0) rotate(0deg); }',
      '    50% { transform: translateY(-8px) rotate(5deg); }',
      '  }',
      '  @keyframes badgePulse {',
      '    0%, 100% { transform: scale(1); }',
      '    50% { transform: scale(1.15); }',
      '  }',
      '  @keyframes shimmer {',
      '    0% { background-position: -200% center; }',
      '    100% { background-position: 200% center; }',
      '  }',
      '  @keyframes fadeInUp {',
      '    from { transform: translateY(10px); opacity: 0; }',
      '    to { transform: translateY(0); opacity: 1; }',
      '  }',
      '  .tip-card { animation: slideInBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); }',
      '  .potato-float { animation: potatoFloat 3s ease-in-out infinite; }',
      '  .badge-pulse { animation: badgePulse 2s ease-in-out infinite; }',
      '  .message-fade { animation: fadeInUp 0.6s ease-out 0.4s both; }',
      '  .amount-shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }',
      '</style>',
      '<div class="relative inline-block w-[400px]">',
      '  <div class="tip-card relative border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden backdrop-blur-sm" style="background-color: {{ data.primary_color | default: \'#FEF18C\' }}; {% if data.background_image %}background-image: url(\'{{ data.background_image }}\'); background-size: cover; background-position: center; background-repeat: no-repeat;{% endif %}">',
      '    <div class="absolute inset-0 opacity-25" style="background-image: radial-gradient(circle, rgba(0, 0, 0, 0.3) 1.5px, transparent 1.5px); background-size: 10px 10px;"></div>',
      '    <div class="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none"></div>',
      '    <img src="https://res.cloudinary.com/dspp405ug/image/upload/v1760471365/cool_zdwwcs.svg" alt="Potato watermark" class="potato-float absolute -top-12 -right-8 w-32 h-32 opacity-15 pointer-events-none" style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));" />',
      '    <div class="relative z-10 p-5 space-y-3">',
      '      <div class="flex items-center gap-3">',
      '        <div class="relative flex-shrink-0">',
      '          <div class="w-16 h-16 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden" style="box-shadow: 6px 6px 0px 0px rgba(0,0,0,1), 0 0 0 2px white;">',
      '            <img src="{{ avatar_url | default: data.tipper_image | default: \'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgR9r41BZgGUwrhGFOdxexfLGxklkEyPVxNg&s\' }}" alt="{{ display_name | default: \'Potato Pal\' }}" class="w-full h-full object-cover" style="filter: contrast(1.05) saturate(1.1);" />',
      '          </div>',
      '          <div class="rotate-12 badge-pulse absolute -top-1 -right-1 bg-[#AAD6B8] text-black text-[8px] font-black px-1.5 py-0.5 border-[3px] border-black uppercase tracking-wider" style="box-shadow: 3px 3px 0px rgba(0,0,0,0.8);">Fresh Tip!</div>',
      '        </div>',
      '        <div class="flex-1 min-w-0">',
      '          <p class="text-sm font-black uppercase tracking-tight leading-tight mb-1.5" style="color: {{ data.text_color | default: \'#000000\' }}; text-shadow: 2px 2px 0px rgba(255,255,255,0.5), 3px 3px 0px rgba(0,0,0,0.2);">',
      '            {{ display_name }}',
      '          </p>',
      '          <div class="inline-flex items-center gap-1.5 bg-white border-[3px] border-black px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">',
      '            <div class="amount-shimmer absolute inset-0 pointer-events-none"></div>',
      '            <span class="relative z-10 text-xl font-black text-black">',
      "              {% if currency == 'INR' %}₹{% elsif currency == 'USD' %}${% elsif currency == 'EUR' %}€{% elsif currency == 'GBP' %}£{% else %}{{ currency }}{% endif %}",
      '            </span>',
      '            <span class="relative z-10 text-2xl font-black text-black leading-none" style="text-shadow: 1px 1px 0px rgba(255,255,255,0.5);">',
      '              {{ amount | divided_by: 100 | round: 2 }}',
      '            </span>',
      '          </div>',
      '        </div>',
      '      </div>',
      "      {% if message and message != '' %}",
      '      <div class="message-fade relative">',
      '        <div class="border-[4px] border-black p-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]" style="background: linear-gradient(135deg, {{ data.secondary_color | default: \'#AAD6B8\' }} 0%, {{ data.secondary_color | default: \'#AAD6B8\' }} 100%); box-shadow: 5px 5px 0px 0px rgba(0,0,0,1), inset 0 1px 0 rgba(255,255,255,0.3);">',
      '          <p class="text-sm font-bold leading-tight" style="color: {{ data.message_text_color | default: \'#000000\' }}; text-shadow: 1px 1px 0px rgba(0,0,0,0.3);">',
      '            &ldquo;{{ message }}&rdquo;',
      '          </p>',
      '        </div>',
      '        <div class="absolute -top-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black" style="filter: drop-shadow(0 -1px 1px rgba(0,0,0,0.2));"></div>',
      '        <div class="absolute -top-1 left-[26px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px]" style="border-bottom-color: {{ data.secondary_color | default: \'#AAD6B8\' }};"></div>',
      '      </div>',
      '      {% endif %}',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
    style: {},
  },
];

const TipBlockEditor = ({ block, setBlock }) => {
  console.log(block);

  return (
    <div className='h-[calc(95vh-8rem)] w-full flex'>
      <div className=' w-fit overflow-y-auto p-2 border-r-2 border-black'>
        {dummyTipBlocks.map((blockh) => {
          return (
            <div
              key={blockh.type}
              className={`p-2 ${block.name && block.name === blockh.name ? '' : ''}`}
              onClick={() =>
                setBlock({
                  ...block,
                  template: blockh.template,
                  name: blockh.name,
                })
              }
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
      <div className='flex-1 flex justify-center items-center'>
        <div className='w-[400px]'>
          <LiquidRenderer
            html={block.template}
            data={{ ...dummyTipBata, data: block.data }}
            className={block.className}
            style={block.style}
          />
        </div>
      </div>
      <div className='w-[300px] p-2 border-l-2 border-black'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label className='text-xs font-bold text-gray-500'>Primary Color</Label>
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
            <Label className='text-xs font-bold text-gray-500'>Secondary Color</Label>
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
          <div className='space-y-2'>
            <Label className='text-xs font-bold text-gray-500'>Text Color</Label>
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
            <Label className='text-xs font-bold text-gray-500'>Message Text Color</Label>
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
          <div className='space-y-2'>
            <Label className='text-xs font-bold text-gray-500'>Background Image</Label>
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
          <div className='space-y-3 pt-2 bg-white rounded-lg p-2 border-2 border-black'>
            <div className='flex items-center justify-between'>
              <Label className='text-xs font-bold text-gray-500'>Display Time</Label>
              <div className='flex items-center gap-1.5 px-2.5 py-1 bg-gray-200 rounded-md border border-gray-300'>
                <span className='text-sm font-semibold text-gray-700'>
                  {block.data.display_time || 20}
                </span>
                <span className='text-xs text-gray-500 font-medium'>sec</span>
              </div>
            </div>
            <div className='px-1'>
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
                className='w-full'
              />
            </div>
            <div className='flex justify-between text-[10px] text-gray-400 px-1'>
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
