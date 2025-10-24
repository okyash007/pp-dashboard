import React, { useState } from "react";

const Monitor = ({ width, height, html }) => {
  const [zoom, setZoom] = useState(1);
  const baseScale = Math.min(1000 / width, 600 / height, 1);
  const currentScale = baseScale * zoom;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.1)); // Min zoom 0.1x
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="relative">
      {/* Zoom Controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <button
          onClick={handleZoomOut}
          className="bg-white hover:bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm font-medium shadow-sm"
        >
          -
        </button>
        <span className="bg-white border border-gray-300 rounded px-2 py-1 text-sm font-medium shadow-sm">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          className="bg-white hover:bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm font-medium shadow-sm"
        >
          +
        </button>
        <button
          onClick={handleResetZoom}
          className="bg-white hover:bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm font-medium shadow-sm"
        >
          Reset
        </button>
      </div>

      <div
        className="border-2 border-black overflow-hidden shadow-lg"
        style={{
          width: `${width * currentScale}px`,
          height: `${height * currentScale}px`,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        <iframe
          srcDoc={html}
          className="border-0"
          title="Overlay Preview"
          sandbox="allow-scripts allow-same-origin"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        />
      </div>
    </div>
  );
};

export default Monitor;
