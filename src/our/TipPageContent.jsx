import { useEffect, useState, useRef, useCallback } from "react";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FileText, Save, CheckCircle2 } from "lucide-react";
import TipPageRenderer from "./tip-page/TipPageRenderer";
import TipPageBlocksEditor from "./tip-page/TipPageBlocksEditor";
import { toast } from "sonner";

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
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const initialBlocksRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    getTipPage(token).then((data) => {
      setBlocks(data);
      initialBlocksRef.current = JSON.stringify(data);
    });
  }, [token]);

  const saveTipPage = useCallback(async (showToast = false) => {
    if (!blocks || blocks.length === 0) return;
    
    setIsSaving(true);
    const loadingToastId = showToast ? toast.loading('💾 Saving Tip Page...', {
      description: 'Please wait while we update your tip page.',
    }) : null;

    try {
      const result = await updateTipPage(token, { blocks });
      if (result) {
        initialBlocksRef.current = JSON.stringify(blocks);
        setHasUnsavedChanges(false);
        setLastSaved(new Date());
        if (showToast) {
          toast.dismiss(loadingToastId);
          toast.success('🎉 Tip Page Saved!', {
            description: 'Your tip page has been saved successfully.',
            duration: 3000,
          });
        }
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error(error);
      if (showToast) {
        toast.dismiss(loadingToastId);
        toast.error('❌ Save Failed', {
          description: error.message || 'Something went wrong. Please try again.',
          duration: 5000,
        });
      }
    } finally {
      setIsSaving(false);
    }
  }, [blocks, token]);

  // Debounced auto-save
  useEffect(() => {
    if (!blocks || blocks.length === 0 || !initialBlocksRef.current) return;
    
    const currentBlocks = JSON.stringify(blocks);
    const hasChanges = currentBlocks !== initialBlocksRef.current;
    setHasUnsavedChanges(hasChanges);

    if (hasChanges && autoSaveEnabled) {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer for auto-save (2 seconds debounce)
      debounceTimerRef.current = setTimeout(() => {
        saveTipPage(false);
      }, 2000);
    } else if (!autoSaveEnabled && debounceTimerRef.current) {
      // Clear timer if auto-save is disabled
      clearTimeout(debounceTimerRef.current);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [blocks, saveTipPage, autoSaveEnabled]);

  const handleManualSave = () => {
    saveTipPage(true);
  };

  if (!blocks) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-xl h-[calc(95vh-9rem)] flex overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <TipPageRenderer blocks={blocks} />
      </div>
      <div className="flex flex-col">
        {/* Editor Content - Inside white border box, scrollable */}
        <div className="w-[300px] flex-1 overflow-y-auto bg-[#F5F5F55a] border-4 border-white rounded-xl">
          <TipPageBlocksEditor 
            blocks={blocks} 
            setBlocks={setBlocks}
          />
        </div>
        {/* Save Controls Section - Outside white border box, sticky at bottom */}
        <div className="sticky bottom-0 z-10 mt-3">
          <div className="bg-white rounded-lg border-2 border-black p-3 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-gray-700">Tips</Label>
              <div className="flex items-center gap-2">
                {lastSaved && !hasUnsavedChanges && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 border border-green-300 rounded">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    <span className="text-[10px] font-semibold text-green-700">Saved</span>
                  </div>
                )}
                {hasUnsavedChanges && (
                  <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2 py-1 border border-orange-300 rounded uppercase tracking-wide">
                    Unsaved
                  </span>
                )}
                <Button
                  onClick={handleManualSave}
                  disabled={isSaving || !hasUnsavedChanges}
                  className="bg-[#828BF8] hover:bg-[#828BF8]/80 text-white font-black text-xs px-3 py-1.5 h-auto border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                  <Save className="w-3 h-3 mr-1.5" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <Label htmlFor="auto-save" className="text-xs font-semibold text-gray-600 cursor-pointer">
                Auto Save
              </Label>
              <Switch
                id="auto-save"
                checked={autoSaveEnabled}
                onCheckedChange={setAutoSaveEnabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipPageContent;
