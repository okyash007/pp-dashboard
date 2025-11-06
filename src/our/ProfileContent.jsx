import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ImageUpload from '@/components/ImageUpload';
import { 
  User, 
  Mail, 
  Phone, 
  Edit, 
  Save, 
  X, 
  Camera,
  Globe,
  Link as LinkIcon,
  MessageSquare,
  Instagram,
  Linkedin,
  Youtube,
  Music,
  Gamepad2,
  Zap,
  Plus,
  MoreHorizontal,
  Settings,
  Loader2
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export function ProfileContent() {
  const { user, token, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddSocialDialog, setShowAddSocialDialog] = useState(false);
  const [newSocialPlatform, setNewSocialPlatform] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    socials: user?.socials || [],
    image: user?.image?.src || '',
    banner_image: user?.banner_image?.src || '',
  });

  // Available social platforms from creator model
  const socialPlatforms = [
    { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'from-purple-500 via-pink-500 to-orange-400' },
    { value: 'facebook', label: 'Facebook', icon: 'f', color: 'bg-blue-600' },
    { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'bg-red-600' },
    { value: 'twitch', label: 'Twitch', icon: Gamepad2, color: 'bg-purple-600' },
    { value: 'twitter', label: 'X (Twitter)', icon: '𝕏', color: 'bg-black' },
    { value: 'tiktok', label: 'TikTok', icon: Music, color: 'bg-black' },
    { value: 'kick', label: 'Kick', icon: Zap, color: 'bg-green-500' },
    { value: 'rumble', label: 'Rumble', icon: 'R', color: 'bg-orange-500' },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600' },
    { value: 'github', label: 'GitHub', icon: 'GH', color: 'bg-gray-800' },
    { value: 'website', label: 'Website', icon: Globe, color: 'bg-purple-600' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialChange = (platform, url) => {
    setFormData(prev => {
      const existingSocials = prev.socials || [];
      const existingIndex = existingSocials.findIndex(social => social.platform === platform);
      
      if (url.trim() === '') {
        // Remove social if URL is empty
        const filteredSocials = existingSocials.filter(social => social.platform !== platform);
        return { ...prev, socials: filteredSocials };
      } else if (existingIndex >= 0) {
        // Update existing social
        const updatedSocials = [...existingSocials];
        updatedSocials[existingIndex] = { platform, url: url.trim() };
        return { ...prev, socials: updatedSocials };
      } else {
        // Add new social
        return { ...prev, socials: [...existingSocials, { platform, url: url.trim() }] };
      }
    });
  };

  const getSocialUrl = (platform) => {
    const social = formData.socials?.find(s => s.platform === platform);
    return social?.url || '';
  };

  const handleImageChange = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleBannerImageChange = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      banner_image: imageUrl
    }));
  };

  const getAvailablePlatforms = () => {
    const usedPlatforms = formData.socials.map(social => social.platform);
    return socialPlatforms.filter(platform => !usedPlatforms.includes(platform.value));
  };

  const handleAddSocial = () => {
    if (newSocialPlatform && newSocialUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        socials: [...prev.socials, { platform: newSocialPlatform, url: newSocialUrl.trim() }]
      }));
      setNewSocialPlatform('');
      setNewSocialUrl('');
      setShowAddSocialDialog(false);
    }
  };

  const handleRemoveSocial = (platform) => {
    setFormData(prev => ({
      ...prev,
      socials: prev.socials.filter(social => social.platform !== platform)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Show loading toast
    const loadingToastId = toast.loading('💾 Saving Profile...', {
      description: 'Please wait while we update your profile.',
    });

    try {
      // Structure data according to creator model
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        socials: formData.socials.filter(social => social.url.trim() !== ''), // Only include socials with URLs
        image: formData.image ? { src: formData.image } : undefined,
        banner_image: formData.banner_image ? { src: formData.banner_image } : undefined,
      };

      console.log('Saving profile:', updateData);
      
      // Make API call to update the profile
      await updateProfile(updateData);
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToastId);
      toast.success('🎉 Profile Updated!', {
        description: 'Your profile changes have been saved successfully.',
        duration: 4000,
      });
      
      setIsEditing(false);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      
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

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      socials: user?.socials || [],
      image: user?.image?.src || '',
      banner_image: user?.banner_image?.src || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          disabled={isLoading}
          className="h-auto bg-[#FEF18C] hover:bg-[#FEF18C]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>


      {/* Profile Information */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <div className="relative -rotate-1 translate-y-1">
          <div className="relative h-full bg-[#828BF8] border-[5px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 hover:translate-y-0 hover:translate-x-0.5 transition-all duration-200">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black px-2 py-1">
                  👤 PERSONAL INFO
                </span>
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-black text-white">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="border-[3px] border-black rounded-lg font-medium bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-black text-white">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="border-[3px] border-black rounded-lg font-medium bg-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-xs font-black text-white">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    disabled={!isEditing}
                    className="border-[3px] border-black rounded-lg font-medium bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-black text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="border-[3px] border-black rounded-lg font-medium bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-black text-white">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="border-[3px] border-black rounded-lg font-medium bg-white"
                  />
                </div>
              </div>
            </div>
            {/* Comic action lines */}
            <div className="absolute top-2 right-2 w-16 h-16 opacity-20">
              <div className="absolute rotate-45 w-full h-0.5 bg-white top-1/2"></div>
              <div className="absolute -rotate-45 w-full h-0.5 bg-white top-1/2"></div>
            </div>
          </div>
        </div>

        {/* Profile Picture & Banner */}
        <div className="relative rotate-1 -translate-x-0.5">
          <div className="relative h-full bg-[#AAD6B8] border-[5px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 hover:translate-x-0 hover:translate-y-0.5 transition-all duration-200">
            {/* Halftone effect */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, black 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            ></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-black uppercase tracking-widest bg-white px-2 py-1 border-[2px] border-black">
                  📷 PROFILE IMAGES
                </span>
                <Camera className="w-5 h-5 text-black" />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black text-black">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden border-[4px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt={user?.username || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-black" />
                      )}
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <ImageUpload
                          value={formData.image}
                          onChange={handleImageChange}
                          className="max-w-xs"
                        />
                      ) : (
                        <div className="text-sm text-black/70 font-medium">
                          {formData.image ? 'Profile image set' : 'No profile image'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black text-black">Banner Image</Label>
                  <div className="w-full h-24 bg-white rounded-lg flex items-center justify-center overflow-hidden border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    {formData.banner_image ? (
                      <img
                        src={formData.banner_image}
                        alt="Banner"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-black/70 text-sm font-medium">No banner image</div>
                    )}
                  </div>
                  {isEditing && (
                    <ImageUpload
                      value={formData.banner_image}
                      onChange={handleBannerImageChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links & Social */}
      <div className="relative -rotate-1 translate-x-1 translate-y-0.5">
        <div className="relative h-full bg-[#FF6B9D] border-[5px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 hover:translate-x-0 hover:translate-y-0 transition-all duration-200">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black px-2 py-1">
                🔗 SOCIAL MEDIA
              </span>
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            {/* Comic "ZAP!" */}
            <div className="absolute top-2 right-2 bg-[#FEF18C] border-[2px] border-black px-2 py-0.5 -rotate-12">
              <span className="text-[10px] font-black text-black">ZAP!</span>
            </div>
            <div className="space-y-6">
              {/* Social Media Header with Add Button */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-white/80 font-medium">
                    {formData.socials.length} platform{formData.socials.length !== 1 ? 's' : ''} connected
                  </p>
                </div>
            {isEditing && getAvailablePlatforms().length > 0 && (
              <Dialog open={showAddSocialDialog} onOpenChange={setShowAddSocialDialog}>
                <DialogTrigger asChild>
                  <Button className="h-auto bg-[#FEF18C] hover:bg-[#FEF18C]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Platform
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md border-[4px] border-black rounded-xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-black">Add Social Media Platform</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Choose a platform and enter your profile URL
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Platform</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-between border-[3px] border-black rounded-lg bg-white hover:bg-gray-50 font-medium shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
                          >
                            {newSocialPlatform ? (
                              <div className="flex items-center gap-2">
                                <div className={`w-5 h-5 rounded flex items-center justify-center ${
                                  socialPlatforms.find(p => p.value === newSocialPlatform)?.color.includes('gradient') ? 
                                  `bg-gradient-to-tr ${socialPlatforms.find(p => p.value === newSocialPlatform)?.color}` : 
                                  socialPlatforms.find(p => p.value === newSocialPlatform)?.color
                                }`}>
                                  {(() => {
                                    const selectedPlatform = socialPlatforms.find(p => p.value === newSocialPlatform);
                                    return typeof selectedPlatform?.icon === 'string' ? (
                                      <span className="text-white text-xs font-bold">
                                        {selectedPlatform.icon}
                                      </span>
                                    ) : (
                                      selectedPlatform?.icon && <selectedPlatform.icon className="w-3 h-3 text-white" />
                                    );
                                  })()}
                                </div>
                                {socialPlatforms.find(p => p.value === newSocialPlatform)?.label}
                              </div>
                            ) : (
                              'Select platform'
                            )}
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full min-w-[180px] border-[3px] border-black rounded-lg bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1">
                          {getAvailablePlatforms().map((platform) => (
                            <DropdownMenuItem
                              key={platform.value}
                              onClick={() => setNewSocialPlatform(platform.value)}
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-yellow-100 hover:text-black cursor-pointer transition-all duration-150"
                            >
                              <div className={`w-6 h-6 rounded flex items-center justify-center ${
                                platform.color.includes('gradient') ? `bg-gradient-to-tr ${platform.color}` : platform.color
                              }`}>
                                {typeof platform.icon === 'string' ? (
                                  <span className="text-white text-xs font-bold">{platform.icon}</span>
                                ) : (
                                  <platform.icon className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{platform.label}</div>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Profile URL</Label>
                      <Input
                        value={newSocialUrl}
                        onChange={(e) => setNewSocialUrl(e.target.value)}
                        placeholder="https://platform.com/username"
                        className="border-[3px] border-black rounded-lg font-medium"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => {
                        setNewSocialPlatform('');
                        setNewSocialUrl('');
                        setShowAddSocialDialog(false);
                      }}
                      variant="outline"
                      className="flex-1 h-auto bg-white hover:bg-gray-50 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddSocial}
                      disabled={!newSocialPlatform || !newSocialUrl.trim()}
                      className="flex-1 h-auto bg-[#AAD6B8] hover:bg-[#AAD6B8]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Platform
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Current Social Media Grid */}
          {formData.socials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.socials.map((social) => {
                const platform = socialPlatforms.find(p => p.value === social.platform);
                if (!platform) return null;

                return (
                  <div key={social.platform} className="bg-white border-[3px] border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          platform.color.includes('gradient') ? `bg-gradient-to-tr ${platform.color}` : platform.color
                        }`}>
                          {typeof platform.icon === 'string' ? (
                            <span className="text-white text-sm font-bold">{platform.icon}</span>
                          ) : (
                            <platform.icon className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm">{platform.label}</h3>
                          <p className="text-xs text-gray-600">
                            {social.url ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      {isEditing && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-300"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleRemoveSocial(social.platform)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    <Input
                      value={social.url}
                      onChange={(e) => handleSocialChange(social.platform, e.target.value)}
                      disabled={!isEditing}
                      placeholder={`https://${social.platform}.com/username`}
                      className="border-[3px] border-black rounded-lg text-sm font-medium"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/20 rounded-xl border-[3px] border-dashed border-white/50 relative z-10">
              <LinkIcon className="w-12 h-12 text-white/60 mx-auto mb-4" />
              <h3 className="text-lg font-black text-white mb-2">No social media connected</h3>
              <p className="text-white/80 mb-4 font-medium">Add your social media profiles to showcase your presence</p>
              {isEditing && getAvailablePlatforms().length > 0 && (
                <Button
                  onClick={() => setShowAddSocialDialog(true)}
                  className="h-auto bg-[#FEF18C] hover:bg-[#FEF18C]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Platform
                </Button>
              )}
            </div>
          )}

              {/* Quick Actions */}
              {isEditing && (
                <div className="bg-white border-[2px] border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-10">
                  <h4 className="font-black text-sm mb-2 text-black">💡 Quick Tips</h4>
                  <ul className="text-xs space-y-1 text-black font-medium">
                    <li>• Enter the full URL of your social media profile</li>
                    <li>• Your social links will be displayed on your public profile</li>
                    <li>• Leave fields empty to hide them from your profile</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="fixed bottom-6 right-6 z-50 flex gap-4">
          <Button 
            onClick={handleCancel}
            variant="outline"
            disabled={isLoading}
            className="h-auto bg-white hover:bg-gray-50 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="h-auto bg-[#AAD6B8] hover:bg-[#AAD6B8]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
