import React, { useState, useEffect } from 'react';
import {
  Plus,
  X,
  MoreHorizontal,
  Gamepad2,
  Music,
  Linkedin,
  Link as LinkIcon,
  Instagram,
  Youtube,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

// Social platforms configuration
const socialPlatforms = [
  {
    value: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    color: 'from-purple-500 via-pink-500 to-orange-400',
  },
  { value: 'facebook', label: 'Facebook', icon: 'f', color: 'bg-blue-600' },
  { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'bg-red-600' },
  { value: 'twitch', label: 'Twitch', icon: Gamepad2, color: 'bg-purple-600' },
  { value: 'twitter', label: 'X (Twitter)', icon: '𝕏', color: 'bg-black' },
  { value: 'tiktok', label: 'TikTok', icon: Music, color: 'bg-black' },
  {
    value: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-600',
  },
  { value: 'github', label: 'GitHub', icon: 'GH', color: 'bg-gray-800' },
];

const UpdateSocials = () => {
  const { user, updateProfile } = useAuthStore();

  // Social media state
  const [socials, setSocials] = useState(user?.socials || []);
  const [showAddSocialDialog, setShowAddSocialDialog] = useState(false);
  const [newSocialPlatform, setNewSocialPlatform] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync socials with user data when user changes
  useEffect(() => {
    if (user?.socials) {
      setSocials(user.socials);
    }
  }, [user?.socials]);

  // Social media management functions
  const handleSocialChange = (platform, url) => {
    setSocials((prev) => {
      const existingIndex = prev.findIndex((social) => social.platform === platform);

      if (url.trim() === '') {
        // Remove social if URL is empty
        return prev.filter((social) => social.platform !== platform);
      } else if (existingIndex >= 0) {
        // Update existing social
        const updatedSocials = [...prev];
        updatedSocials[existingIndex] = { platform, url: url.trim() };
        return updatedSocials;
      } else {
        // Add new social
        return [...prev, { platform, url: url.trim() }];
      }
    });
  };

  const getSocialUrl = (platform) => {
    const social = socials.find((s) => s.platform === platform);
    return social?.url || '';
  };

  const getAvailablePlatforms = () => {
    const usedPlatforms = socials.map((social) => social.platform);
    return socialPlatforms.filter((platform) => !usedPlatforms.includes(platform.value));
  };

  const handleAddSocial = () => {
    if (newSocialPlatform && newSocialUrl.trim()) {
      setSocials((prev) => [...prev, { platform: newSocialPlatform, url: newSocialUrl.trim() }]);
      setNewSocialPlatform('');
      setNewSocialUrl('');
      setShowAddSocialDialog(false);
    }
  };

  const handleRemoveSocial = (platform) => {
    setSocials((prev) => prev.filter((social) => social.platform !== platform));
  };

  // Save social media changes to backend
  const saveSocials = async () => {
    setIsLoading(true);

    const loadingToastId = toast.loading('💾 Saving Social Media...', {
      description: 'Please wait while we update your social media profiles.',
    });

    try {
      await updateProfile({
        socials: socials.filter((social) => social.url.trim() !== ''), // Only include socials with URLs
      });

      // Dismiss loading toast and show success
      toast.dismiss(loadingToastId);
      toast.success('🎉 Social Media Updated!', {
        description: 'Your social media profiles have been saved successfully.',
        duration: 4000,
      });
    } catch (error) {
      console.error('Error saving social media:', error);

      // Dismiss loading toast and show error
      toast.dismiss(loadingToastId);
      toast.error('❌ Update Failed', {
        description: error.message || 'Something went wrong. Please try again.',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasUnsavedChanges = JSON.stringify(socials) !== JSON.stringify(user?.socials || []);

  return (
    <>
      <div className='space-y-1'>
        <div className='flex items-center justify-center gap-2 mb-2'>
          {/* <LinkIcon className='w-5 h-5 text-gray-600' /> */}
          <p className='text-lg font-bold text-gray-600'>Connect your Socials</p>
          {hasUnsavedChanges && (
            <span className='text-[10px] font-black text-orange-600 bg-orange-100 px-2 py-0.5 border-[2px] border-orange-300 rounded uppercase tracking-wide'>
              Unsaved
            </span>
          )}
        </div>
        <div className='rounded-xl'>
          {socials.length > 0 ? (
            <div className='p-3 space-y-3'>
              {socials.map((social) => {
                const platform = socialPlatforms.find((p) => p.value === social.platform);
                if (!platform) return null;

                return (
                  <div key={social.platform}>
                    <Label className='text-xs font-bold text-gray-600 flex items-center gap-1 mb-1'>
                      <LinkIcon className='w-3 h-3' />
                      {platform.label}
                    </Label>
                    <div className='flex items-center gap-2'>
                      <Input
                        value={social.url}
                        onChange={(e) => handleSocialChange(social.platform, e.target.value)}
                        placeholder={`https://${social.platform}.com/username`}
                        className='flex-1 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200'
                      />
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleRemoveSocial(social.platform)}
                        className='h-9 w-9 p-0 bg-white hover:bg-red-50 text-gray-700 hover:text-red-700 font-semibold text-xs border-[2px] border-black hover:border-red-300  shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 cursor-pointer'
                      >
                        <X className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='p-6 text-center'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-gray-100 border-[2px] border-gray-300 rounded-lg mb-3'>
                <LinkIcon className='w-6 h-6 text-gray-400' />
              </div>
              <p className='text-sm font-semibold text-gray-600 mb-1'>No social media connected</p>
              <p className='text-xs text-gray-500'>Add your social media profiles to get started</p>
            </div>
          )}
        </div>

        {/* Add Platform Section */}
        {getAvailablePlatforms().length > 0 && (
          <div className='p-3 space-y-3'>
            <div>
              <Label className='text-xs font-bold text-gray-600 flex items-center gap-1 mb-1'>
                <Plus className='w-3 h-3' />
                Add Platform
              </Label>
              <Dialog open={showAddSocialDialog} onOpenChange={setShowAddSocialDialog}>
                <DialogTrigger asChild>
                  <Button className='w-full bg-[#FEF18C] hover:bg-[#FEF18C]/80 text-black font-black text-xs px-4 py-2.5 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200'>
                    <Plus className='w-4 h-4 mr-2' />
                    Add Platform
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-md border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                  <DialogHeader>
                    <DialogTitle className='text-lg font-bold text-black'>
                      Add Social Media Platform
                    </DialogTitle>
                    <DialogDescription className='text-gray-600'>
                      Choose a platform and enter your profile URL
                    </DialogDescription>
                  </DialogHeader>

                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label className='text-xs font-semibold text-gray-700'>Platform</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full justify-between bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs px-3 py-2 border-[2px] border-gray-300 transition-colors'
                          >
                            {newSocialPlatform ? (
                              <div className='flex items-center gap-2'>
                                <div
                                  className={`w-4 h-4 rounded flex items-center justify-center ${
                                    socialPlatforms
                                      .find((p) => p.value === newSocialPlatform)
                                      ?.color.includes('gradient')
                                      ? `bg-gradient-to-tr ${
                                          socialPlatforms.find((p) => p.value === newSocialPlatform)
                                            ?.color
                                        }`
                                      : socialPlatforms.find((p) => p.value === newSocialPlatform)
                                          ?.color
                                  }`}
                                >
                                  {(() => {
                                    const selectedPlatform = socialPlatforms.find(
                                      (p) => p.value === newSocialPlatform
                                    );
                                    return typeof selectedPlatform?.icon === 'string' ? (
                                      <span className='text-white text-xs font-bold'>
                                        {selectedPlatform.icon}
                                      </span>
                                    ) : (
                                      selectedPlatform?.icon && (
                                        <selectedPlatform.icon className='w-2 h-2 text-white' />
                                      )
                                    );
                                  })()}
                                </div>
                                {socialPlatforms.find((p) => p.value === newSocialPlatform)?.label}
                              </div>
                            ) : (
                              'Select platform'
                            )}
                            <MoreHorizontal className='w-4 h-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-full min-w-[180px] border-[2px] border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-1'>
                          {getAvailablePlatforms().map((platform) => (
                            <DropdownMenuItem
                              key={platform.value}
                              onClick={() => setNewSocialPlatform(platform.value)}
                              className='flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded'
                            >
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center ${
                                  platform.color.includes('gradient')
                                    ? `bg-gradient-to-tr ${platform.color}`
                                    : platform.color
                                }`}
                              >
                                {typeof platform.icon === 'string' ? (
                                  <span className='text-white text-xs font-bold'>
                                    {platform.icon}
                                  </span>
                                ) : (
                                  <platform.icon className='w-3 h-3 text-white' />
                                )}
                              </div>
                              <div>
                                <div className='font-medium text-sm'>{platform.label}</div>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className='space-y-2'>
                      <Label className='text-xs font-semibold text-gray-700'>Profile URL</Label>
                      <Input
                        value={newSocialUrl}
                        onChange={(e) => setNewSocialUrl(e.target.value)}
                        placeholder='https://platform.com/username'
                        className='border-[2px] border-gray-300'
                      />
                    </div>
                  </div>

                  <div className='flex gap-3 pt-4'>
                    <Button
                      onClick={() => {
                        setNewSocialPlatform('');
                        setNewSocialUrl('');
                        setShowAddSocialDialog(false);
                      }}
                      variant='outline'
                      className='flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs px-3 py-2 border-[2px] border-gray-300 transition-colors'
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddSocial}
                      disabled={!newSocialPlatform || !newSocialUrl.trim()}
                      className='flex-1 bg-[#AAD6B8] hover:bg-[#AAD6B8]/80 text-black font-black text-xs px-4 py-2.5 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0'
                    >
                      Add Platform
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        {/* Save Button */}
        {hasUnsavedChanges && (
          <div className='p-3 space-y-3'>
            <div>
              <Label className='text-xs font-bold text-gray-600 flex items-center gap-1 mb-1'>
                <Save className='w-3 h-3' />
                Save Changes
              </Label>
              <Button
                onClick={saveSocials}
                disabled={isLoading}
                className='w-full bg-[#828BF8] hover:bg-[#828BF8]/80 text-white font-black text-xs px-4 py-2.5 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0'
              >
                <Save className='w-4 h-4 mr-2' />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateSocials;
