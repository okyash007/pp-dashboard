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
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useState } from "react";
import LinkPageRenderer from "./LinkPageRenderer";
import LinkPageBlocksEditor from "./LinkPageBlocksEditor";

async function getLinkPage(token) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/link-tree`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data.success) {
      return null;
    }
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateLinkPage(token, data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/link-tree`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();
    if (!responseData.success) {
      return null;
    }
    return responseData.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const LinkPageEditor = () => {
  const { token } = useAuthStore();

  const [blocks, setBlocks] = useState();

    useEffect(() => {
      getLinkPage(token).then((data) => {
        setBlocks(data);
      });
    }, [token]);

    useEffect(() => {
      if (!blocks) return;
      updateLinkPage(token, { blocks });
    }, [blocks]);

    if (!blocks) {
      return <div>Loading...</div>;
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-32 justify-start text-left bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8" />
            <div>
              <div className="text-lg font-bold">Links Page Editor</div>
              <div className="text-sm opacity-80">
                Configure your links page
              </div>
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
        <div className="rounded-xl border-2 border-black h-[calc(95vh-8rem)] flex overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto">
            <LinkPageRenderer blocks={blocks} />
          </div>
          <div className="w-[300px] p-4 border-l-2 border-black overflow-y-auto">
            <LinkPageBlocksEditor blocks={blocks} setBlocks={setBlocks} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkPageEditor;
