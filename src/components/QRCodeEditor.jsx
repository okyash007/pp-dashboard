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
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg shadow-md" />
      <div className="mt-2">
        <Button className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download QR Code
        </Button>
      </div>
    </div>
  );
}
