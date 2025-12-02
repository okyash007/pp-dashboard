import { useEffect, useState, useRef, useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import UpdateSocials from './link/UpdateSocials';
import LinkPageRenderer from './link/LinkPageRenderer';
import laptopPotato from '@/assets/laptop.svg?url';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

async function getLinkPage(token) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link-tree`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
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

export function PotatoTreeContent() {
  const { token } = useAuthStore();
  const [blocks, setBlocks] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const initialBlocksRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    getLinkPage(token).then((data) => {
      setBlocks(data);
      initialBlocksRef.current = JSON.stringify(data);
    });
  }, [token]);

  const saveLinkPage = useCallback(async (showToast = false) => {
    if (!blocks || blocks.length === 0) return;
    
    setIsSaving(true);
    const loadingToastId = showToast ? toast.loading('💾 Saving Link Tree...', {
      description: 'Please wait while we update your link tree.',
    }) : null;

    try {
      const result = await updateLinkPage(token, { blocks });
      if (result) {
        initialBlocksRef.current = JSON.stringify(blocks);
        setHasUnsavedChanges(false);
        setLastSaved(new Date());
        if (showToast) {
          toast.dismiss(loadingToastId);
          toast.success('🎉 Link Tree Saved!', {
            description: 'Your link tree has been saved successfully.',
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
        saveLinkPage(false);
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
  }, [blocks, saveLinkPage, autoSaveEnabled]);

  const handleManualSave = () => {
    saveLinkPage(true);
  };

  if (!blocks) {
    return <div>Loading...</div>;
  }

  return (
    <div className='rounded-xl h-[calc(95vh-9rem)] flex overflow-hidden relative'>
      <div className='hidden md:block absolute left-10 bottom-10 pointer-events-none'>
        <img
          src={laptopPotato}
          alt='Potato Pay Mascot'
          className='w-18 h-18 object-contain mascot-enter scale-250'
          style={{ filter: 'drop-shadow(6px 6px 0 rgba(0,0,0,1))' }}
        />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <LinkPageRenderer blocks={blocks} />
      </div>
      <div className='flex flex-col'>
        {/* Editor Content - Inside white border box, scrollable */}
        <div className='w-[300px] flex-1 overflow-y-auto bg-[#F5F5F55a] border-4 border-white rounded-xl p-3'>
          <UpdateSocials />
        </div>
        {/* Save Controls Section - Outside white border box, sticky at bottom */}
        <div className="sticky bottom-0 z-10 mt-3">
          <div className="bg-white rounded-lg border-2 border-black p-3 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-gray-700">Link Tree</Label>
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
              <Label htmlFor="auto-save-link" className="text-xs font-semibold text-gray-600 cursor-pointer">
                Auto Save
              </Label>
              <Switch
                id="auto-save-link"
                checked={autoSaveEnabled}
                onCheckedChange={setAutoSaveEnabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
