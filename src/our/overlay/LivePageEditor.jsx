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
import { FileText } from "lucide-react";

const LivePageEditor = ({ config, setConfig }) => {
  const [livePageOpen, setLivePageOpen] = useState(false);
  return (
    <Dialog open={livePageOpen} onOpenChange={setLivePageOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-32 justify-start text-left bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8" />
            <div>
              <div className="text-lg font-bold">Live Page UI</div>
              <div className="text-sm opacity-80">Configure your live page</div>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none">
        <DialogHeader>
          <DialogTitle>Live Page Configuration</DialogTitle>
          <DialogDescription>
            Customize your live page appearance and settings
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LivePageEditor;
