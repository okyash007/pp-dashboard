import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function QRCodeEditor({ link }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (link && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, link, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
    }
  }, [link]);

  if (!link) {
    return <div>No link provided</div>;
  }

  return (
    <div className="w-[256px]">
      <canvas ref={canvasRef} className="border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] mx-auto bg-white" />
      <div className="mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full h-10 justify-start text-left text-sm bg-blue-400 hover:bg-blue-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <Download className="w-4 h-4" />
          Download QR Code
        </Button>
      </div>
    </div>
  );
}
