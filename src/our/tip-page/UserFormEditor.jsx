import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { User, Settings } from "lucide-react";

const UserFormEditor = ({ block, setBlock }) => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-blue-800 border-2 border-blue-300 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <User className="w-4 h-4" />
          Configure User Form
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] p-4"
        align="start"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center border-2 border-blue-300">
            <Settings className="w-8 h-8 text-blue-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800">Coming Soon!</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              User form configuration will be available in the next update. 
              Stay tuned for powerful form customization features!
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2 text-blue-700">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <span className="text-xs font-medium ml-2">In Development</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            Expected: Next Release
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserFormEditor;