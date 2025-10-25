import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TreePine } from "lucide-react";
import { useState } from "react";
import UpdateSocials from "./link/UpdateSocials";
import LinkPageEditor from "./link/LinkPageEditor";

export function PotatoTreeContent() {
  const [isLinksEditorOpen, setIsLinksEditorOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
          <TreePine className="w-6 h-6 text-green-800" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-black">
            Social Media Manager
          </h1>
          <p className="text-gray-600 font-semibold">
            Manage your social media profiles
          </p>
        </div>
      </div>

      {/* Social Media Editor and Links Page Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Social Media Editor - Takes 3/4 of the space */}
        <Card className="bg-purple-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <TreePine className="w-5 h-5" />
              Social Media Manager
            </CardTitle>
            <CardDescription className="text-purple-700">
              Manage your social media links for your link tree
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateSocials />
          </CardContent>
        </Card>

        <LinkPageEditor />
      </div>
    </div>
  );
}
