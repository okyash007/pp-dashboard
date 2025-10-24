import React from "react";

const MonitorDisplay = ({ width, height, html, monitorName = "Monitor" }) => {
  const baseScale = Math.min(600 / width, 400 / height, 1);

  return (
    <div className="w-full h-full flex justify-center items-center overflow-auto p-4">
      <div className="relative max-w-full max-h-full">
        <div
          className="border-4 border-black overflow-hidden shadow-2xl bg-white mx-auto"
          style={{
            width: `${Math.min(width * baseScale, 600)}px`,
            height: `${Math.min(height * baseScale, 400)}px`,
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <iframe
            srcDoc={html}
            className="border-0 w-full h-full"
            sandbox="allow-scripts allow-same-origin"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `scale(${baseScale})`,
              transformOrigin: "top left",
            }}
          />
        </div>
        
        {/* Monitor Frame Decoration */}
        <div className="absolute -inset-2 border-4 border-gray-400 rounded-lg pointer-events-none">
          <div className="absolute -top-6 left-4 bg-gray-400 text-white px-2 py-1 rounded text-xs font-medium">
            {monitorName} - {width}×{height}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorDisplay;
