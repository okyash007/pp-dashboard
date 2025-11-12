import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
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
import TipPageRenderer from "./tip-page/TipPageRenderer";
import TipPageBlocksEditor from "./tip-page/TipPageBlocksEditor";

async function getTipPage(token) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/tip-page`,
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
async function updateTipPage(token, data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/tip-page`,
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

const TipPageContent = () => {
  const { token } = useAuthStore();
  const [blocks, setBlocks] = useState();

  useEffect(() => {
    getTipPage(token).then((data) => {
      setBlocks(data);
    });
  }, [token]);

  useEffect(() => {
    if (!blocks || blocks.length === 0) return;
    updateTipPage(token, { blocks });
  }, [blocks]);

  if (!blocks) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-xl h-[calc(95vh-9rem)] flex overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <TipPageRenderer blocks={blocks} />
      </div>
      <div className="w-[300px] overflow-y-auto">
        <TipPageBlocksEditor blocks={blocks} setBlocks={setBlocks} />
      </div>
    </div>
  );
};

export default TipPageContent;
