import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import LiquidRenderer from "../LiquidRenderer";

const OverlayEditor = ({ config, setConfig }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  const overlayLibrary = [
    {
      name: "Classic Card",
      id: "overlay-1",
      className: "animate-in slide-in-from-right-5 duration-500",
      template:
        "\n      <div class='relative bg-white rounded-lg p-6 border-2 border-black shadow-sm'>\n        <!-- Header with tip icon -->\n        <div class='flex items-center justify-between mb-4'>\n          <div class='flex items-center space-x-3'>\n            <div class='w-10 h-10 bg-pink-200 rounded-lg flex items-center justify-center border-2 border-black'>\n              <svg class='w-5 h-5 text-black' fill='currentColor' viewBox='0 0 20 20'>\n                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>\n              </svg>\n            </div>\n            <div>\n              <div class='text-lg font-semibold text-black'>New Tip!</div>\n              <div class='text-sm text-gray-600'>{{ visitor_name }}</div>\n            </div>\n          </div>\n        </div>\n        \n        <!-- Amount display -->\n        <div class='text-center mb-4'>\n          <div class='text-4xl font-bold text-black mb-2'>\n            {{ amount | divided_by: 100 | round: 2 }} {{ currency }}\n          </div>\n          <div class='text-sm text-gray-600'>Thank you for your support!</div>\n        </div>\n        \n        <!-- Message if available -->\n        {% if message and message != '' %}\n        <div class='bg-purple-100 rounded-lg p-4 mb-4 border-2 border-black'>\n          <div class='flex items-start space-x-2'>\n            <div class='w-6 h-6 bg-purple-200 rounded flex items-center justify-center border border-black flex-shrink-0 mt-0.5'>\n              <svg class='w-3 h-3 text-black' fill='currentColor' viewBox='0 0 20 20'>\n                <path fill-rule='evenodd' d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z' clip-rule='evenodd'/>\n              </svg>\n            </div>\n            <p class='text-sm text-black italic'>\"{{ message }}\"</p>\n          </div>\n        </div>\n        {% endif %}\n        \n        <!-- Footer with payment info -->\n        <div class='flex items-center justify-between text-xs text-gray-600 pt-3 border-t-2 border-gray-200'>\n          <div class='flex items-center space-x-2'>\n            <div class='w-4 h-4 bg-orange-200 rounded border border-black flex items-center justify-center'>\n              <svg class='w-2 h-2 text-black' fill='currentColor' viewBox='0 0 20 20'>\n                <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'/>\n              </svg>\n            </div>\n            <span>{{ payment_gateway }}</span>\n          </div>\n          <span class='text-xs'>{{ payment_id }}</span>\n        </div>\n      </div>\n    ",
      data: {},
    },
    {
      name: "Minimalist",
      id: "overlay-2",
      className: "animate-in fade-in duration-700",
      template:
        "\n      <div class='relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200'>\n        <div class='text-center'>\n          <div class='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>\n            <svg class='w-8 h-8 text-green-600' fill='currentColor' viewBox='0 0 20 20'>\n              <path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clip-rule='evenodd'/>\n            </svg>\n          </div>\n          <h3 class='text-2xl font-bold text-gray-900 mb-2'>Tip Received!</h3>\n          <p class='text-gray-600 mb-6'>Thank you {{ visitor_name }}</p>\n          <div class='text-5xl font-bold text-gray-900 mb-2'>\n            {{ amount | divided_by: 100 | round: 2 }} {{ currency }}\n          </div>\n          {% if message and message != '' %}\n          <div class='mt-6 p-4 bg-gray-100 rounded-lg'>\n            <p class='text-gray-700 italic'>\"{{ message }}\"</p>\n          </div>\n          {% endif %}\n          <div class='mt-6 text-xs text-gray-500'>\n            {{ payment_gateway }} • {{ payment_id }}\n          </div>\n        </div>\n      </div>\n    ",
      data: {},
    },
    {
      name: "Neon Glow",
      id: "overlay-3",
      className: "animate-in slide-in-from-top-5 duration-500",
      template:
        "\n      <div class='relative bg-black rounded-xl p-6 border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]'>\n        <div class='flex items-center justify-between mb-4'>\n          <div class='flex items-center space-x-3'>\n            <div class='w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center'>\n              <svg class='w-6 h-6 text-black' fill='currentColor' viewBox='0 0 20 20'>\n                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>\n              </svg>\n            </div>\n            <div>\n              <div class='text-xl font-bold text-cyan-400'>NEW TIP!</div>\n              <div class='text-sm text-gray-300'>{{ visitor_name }}</div>\n            </div>\n          </div>\n        </div>\n        <div class='text-center mb-4'>\n          <div class='text-5xl font-bold text-cyan-400 mb-2'>\n            {{ amount | divided_by: 100 | round: 2 }} {{ currency }}\n          </div>\n          <div class='text-sm text-gray-300'>Thanks for the support!</div>\n        </div>\n        {% if message and message != '' %}\n        <div class='bg-gray-800 rounded-lg p-4 mb-4 border border-cyan-400'>\n          <p class='text-cyan-300 italic'>\"{{ message }}\"</p>\n        </div>\n        {% endif %}\n        <div class='flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700'>\n          <span>{{ payment_gateway }}</span>\n          <span>{{ payment_id }}</span>\n        </div>\n      </div>\n    ",
      data: {},
    },
    {
      name: "Gradient Card",
      id: "overlay-4",
      className: "animate-in slide-in-from-left-5 duration-500",
      template:
        "\n      <div class='relative bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl p-6 text-white shadow-xl'>\n        <div class='absolute inset-0 bg-black bg-opacity-20 rounded-2xl'></div>\n        <div class='relative z-10'>\n          <div class='flex items-center justify-between mb-4'>\n            <div class='flex items-center space-x-3'>\n              <div class='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm'>\n                <svg class='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>\n                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>\n                </svg>\n              </div>\n              <div>\n                <div class='text-xl font-bold'>Amazing Tip!</div>\n                <div class='text-sm text-white text-opacity-80'>{{ visitor_name }}</div>\n              </div>\n            </div>\n          </div>\n          <div class='text-center mb-4'>\n            <div class='text-6xl font-bold mb-2'>\n              {{ amount | divided_by: 100 | round: 2 }} {{ currency }}\n            </div>\n            <div class='text-lg text-white text-opacity-90'>You're awesome!</div>\n          </div>\n          {% if message and message != '' %}\n          <div class='bg-white bg-opacity-10 rounded-xl p-4 mb-4 backdrop-blur-sm'>\n            <p class='text-white italic'>\"{{ message }}\"</p>\n          </div>\n          {% endif %}\n          <div class='flex items-center justify-between text-sm text-white text-opacity-70 pt-3 border-t border-white border-opacity-20'>\n            <span>{{ payment_gateway }}</span>\n            <span>{{ payment_id }}</span>\n          </div>\n        </div>\n      </div>\n    ",
      data: {},
    },
    {
      name: "Corporate",
      id: "overlay-5",
      className: "animate-in zoom-in duration-500",
      template:
        "\n      <div class='relative bg-white rounded-lg p-6 shadow-lg border border-gray-200'>\n        <div class='flex items-start justify-between mb-4'>\n          <div class='flex items-center space-x-3'>\n            <div class='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>\n              <svg class='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>\n                <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'/>\n              </svg>\n            </div>\n            <div>\n              <h3 class='text-lg font-semibold text-gray-900'>Payment Received</h3>\n              <p class='text-sm text-gray-600'>From: {{ visitor_name }}</p>\n            </div>\n          </div>\n          <div class='text-right'>\n            <div class='text-3xl font-bold text-blue-600'>\n              {{ amount | divided_by: 100 | round: 2 }} {{ currency }}\n            </div>\n            <div class='text-xs text-gray-500'>Amount</div>\n          </div>\n        </div>\n        {% if message and message != '' %}\n        <div class='bg-gray-50 rounded-lg p-4 mb-4'>\n          <div class='flex items-start space-x-2'>\n            <svg class='w-4 h-4 text-gray-400 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>\n              <path fill-rule='evenodd' d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z' clip-rule='evenodd'/>\n            </svg>\n            <p class='text-sm text-gray-700'>{{ message }}</p>\n          </div>\n        </div>\n        {% endif %}\n        <div class='flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200'>\n          <div class='flex items-center space-x-2'>\n            <span class='px-2 py-1 bg-gray-100 rounded text-gray-600'>{{ payment_gateway }}</span>\n          </div>\n          <span class='font-mono'>{{ payment_id }}</span>\n        </div>\n      </div>\n    ",
      data: {},
    },
    {
      name: "Celebration",
      id: "overlay-6",
      className: "animate-in bounce-in duration-700",
      template:
        "\n      <div class='relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-2xl'>\n        <div class='absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full animate-pulse'></div>\n        <div class='absolute -bottom-2 -left-2 w-6 h-6 bg-orange-300 rounded-full animate-pulse'></div>\n        <div class='text-center'>\n          <div class='w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm'>\n            <svg class='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>\n              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>\n            </svg>\n          </div>\n          <h2 class='text-2xl font-bold mb-2'>🎉 TIP ALERT! 🎉</h2>\n          <p class='text-lg mb-4'>{{ visitor_name }} just tipped you!</p>\n          <div class='text-6xl font-bold mb-4'>\n            {{ amount | divided_by: 100 | round: 2 }} {{ currency }}\n          </div>\n          <div class='text-xl mb-4'>You're amazing! ✨</div>\n          {% if message and message != '' %}\n          <div class='bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm'>\n            <p class='text-lg italic'>\"{{ message }}\"</p>\n          </div>\n          {% endif %}\n          <div class='mt-6 text-sm text-white text-opacity-80'>\n            {{ payment_gateway }} • {{ payment_id }}\n          </div>\n        </div>\n      </div>\n    ",
      data: {},
    },
    {
      name: "Dark Mode",
      id: "overlay-7",
      className: "animate-in slide-in-from-bottom-5 duration-500",
      template:
        "\n      <div class='relative bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl'>\n        <div class='flex items-center justify-between mb-4'>\n          <div class='flex items-center space-x-3'>\n            <div class='w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center'>\n              <svg class='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>\n                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>\n              </svg>\n            </div>\n            <div>\n              <div class='text-lg font-semibold text-white'>New Tip</div>\n              <div class='text-sm text-gray-400'>{{ visitor_name }}</div>\n            </div>\n          </div>\n        </div>\n        <div class='text-center mb-4'>\n          <div class='text-4xl font-bold text-white mb-2'>\n            {{ amount | divided_by: 100 | round: 2 }} {{ currency }}\n          </div>\n          <div class='text-sm text-gray-400'>Thank you for your support!</div>\n        </div>\n        {% if message and message != '' %}\n        <div class='bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700'>\n          <div class='flex items-start space-x-2'>\n            <svg class='w-4 h-4 text-gray-400 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>\n              <path fill-rule='evenodd' d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z' clip-rule='evenodd'/>\n            </svg>\n            <p class='text-sm text-gray-300 italic'>\"{{ message }}\"</p>\n          </div>\n        </div>\n        {% endif %}\n        <div class='flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-700'>\n          <div class='flex items-center space-x-2'>\n            <span class='px-2 py-1 bg-gray-800 rounded text-gray-300'>{{ payment_gateway }}</span>\n          </div>\n          <span class='font-mono text-gray-400'>{{ payment_id }}</span>\n        </div>\n      </div>\n    ",
      data: {},
    },
  ];

  return (
    <Dialog open={overlayOpen} onOpenChange={setOverlayOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-32 justify-start text-left bg-purple-200 hover:bg-purple-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <div className="flex items-center gap-4">
            <TrendingUp className="w-8 h-8" />
            <div>
              <div className="text-lg font-bold">Overlay UI</div>
              <div className="text-sm opacity-80">
                Configure overlay settings
              </div>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-[95vw] !max-h-[95vh] !max-w-none">
        <div>
          <DialogHeader>
            <DialogTitle>Overlay Configuration</DialogTitle>
            <DialogDescription>
              Configure overlay settings and appearance
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="flex bg-gray-100 rounded-xl border-2 border-black h-[80dvh] overflow-y-auto">
          <div className="border-r-2 border-black overflow-auto">
            {overlayLibrary.map((overlay) => {
              const isSelected = overlay.id === config.overlay.id;
              return (
                <div
                  className={`min-w-sm py-2 px-4 cursor-pointer ${
                    isSelected ? "bg-gray-400" : ""
                  }`}
                  key={overlay.id}
                  onClick={() => {
                    setConfig((prev) => {
                      return { ...prev, overlay: overlay };
                    });
                  }}
                >
                  <LiquidRenderer
                    html={overlay.template}
                    data={{
                      visitor_name: "John Doe",
                      amount: 10000,
                      currency: "INR",
                      message: "Thank you for your support!",
                      created_at: 142350824,
                      payment_id: 13464564,
                      payment_gateway: "razorpay",
                      data: config.overlay.data,
                    }}
                    className={overlay.className}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex-1">
            <div className="h-full w-full flex items-center justify-center">
              <div className="min-w-md mx-auto">
                <LiquidRenderer
                  html={config.overlay.template}
                  data={{
                    visitor_name: "John Doe",
                    amount: 10000,
                    currency: "INR",
                    message: "Thank you for your support!",
                    created_at: 142350824,
                    payment_id: 13464564,
                    payment_gateway: "razorpay",
                    data: config.overlay.data,
                  }}
                  className={config.overlay.className}
                />
              </div>
            </div>
          </div>
          <div className="border-l-2 border-black p-4">3</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OverlayEditor;
