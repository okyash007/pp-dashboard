import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "../../stores/authStore";

const SocialsEditor = ({ block, setBlock }) => {
  const { user } = useAuthStore();
  const [newSocialPlatform, setNewSocialPlatform] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit Socials
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-black">
            Edit Socials
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {user.socials.map((social) => (
            <div key={social.platform} className="space-y-2">
              <Label>{social.platform}</Label>
              <Input value={social.url} disabled />
            </div>
          ))}
          {block.data.socials.map((social) => {
            return (
              <div key={social.platform} className="space-y-2">
                <Label>{social.platform}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={social.url}
                    onChange={(e) =>
                      setBlock({
                        ...block,
                        data: {
                          ...block.data,
                          socials: block.data.socials.map((s) =>
                            s.platform === social.platform
                              ? { ...s, url: e.target.value }
                              : s
                          ),
                        },
                      })
                    }
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      setBlock({
                        ...block,
                        data: {
                          ...block.data,
                          socials: block.data.socials.filter(
                            (s) => s.platform !== social.platform
                          ),
                        },
                      })
                    }
                    className="bg-red-400 hover:bg-red-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
           <Popover>
             <PopoverTrigger asChild>
               <Button
                 variant="outline"
                 className="w-full bg-green-400 hover:bg-green-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
               >
                 <Plus className="w-4 h-4" />
                 Add Platform
               </Button>
             </PopoverTrigger>
             <PopoverContent className="w-80 border-2 border-gray-300 rounded-xl shadow-xl bg-white p-6">
               <div className="space-y-4">
                 <div className="text-center pb-2">
                   <h3 className="text-lg font-semibold text-gray-800">Add New Social Platform</h3>
                   <p className="text-sm text-gray-500">Enter the platform details below</p>
                 </div>
                 
                 <div className="space-y-3">
                   <div className="space-y-2">
                     <Label className="text-sm font-medium text-gray-700">Platform Name</Label>
                     <Input
                       value={newSocialPlatform}
                       onChange={(e) => setNewSocialPlatform(e.target.value)}
                       placeholder="e.g., Instagram, Twitter, LinkedIn"
                       className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <Label className="text-sm font-medium text-gray-700">URL</Label>
                     <Input
                       value={newSocialUrl}
                       onChange={(e) => setNewSocialUrl(e.target.value)}
                       placeholder="https://platform.com/username"
                       className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                     />
                   </div>
                 </div>
                 
                 <div className="pt-2">
                   <Button
                     variant="outline"
                     onClick={() => {
                       if (newSocialPlatform.trim() && newSocialUrl.trim()) {
                         setBlock({
                           ...block,
                           data: {
                             ...block.data,
                             socials: [
                               ...block.data.socials,
                               { platform: newSocialPlatform, url: newSocialUrl },
                             ],
                           },
                         });
                         setNewSocialPlatform("");
                         setNewSocialUrl("");
                       }
                     }}
                     className="w-full bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium py-2"
                     disabled={!newSocialPlatform.trim() || !newSocialUrl.trim()}
                   >
                     <Plus className="w-4 h-4 mr-2" />
                     Add Platform
                   </Button>
                 </div>
               </div>
             </PopoverContent>
           </Popover>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialsEditor;
