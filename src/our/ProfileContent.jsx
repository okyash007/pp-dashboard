import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Shield,
  Globe,
  Link as LinkIcon,
  Eye,
  EyeOff,
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
  const [showPassword, setShowPassword] = useState(false);
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
      
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          disabled={isLoading}
          className="sticky top-24 z-40 bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
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


      {/* Profile Information */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card className="bg-blue-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Your basic profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  className="border-2 border-black rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  className="border-2 border-black rounded-lg"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                disabled={!isEditing}
                className="border-2 border-black rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className="border-2 border-black rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="border-2 border-black rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Picture & Banner */}
        <Card className="bg-green-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Profile Images
            </CardTitle>
            <CardDescription>
              Your profile and banner images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
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
                    <div className="text-sm text-gray-500">
                      {formData.image ? 'Profile image set' : 'No profile image'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Banner Image</Label>
              <div className="w-full h-24 bg-white rounded-lg flex items-center justify-center overflow-hidden border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
                {formData.banner_image ? (
                  <img
                    src={formData.banner_image}
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-500 text-sm">No banner image</div>
                )}
              </div>
              {isEditing && (
                <ImageUpload
                  value={formData.banner_image}
                  onChange={handleBannerImageChange}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Links & Social */}
      <Card className="bg-purple-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Social Media Profiles
          </CardTitle>
          <CardDescription>
            Connect your social media accounts to showcase your presence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Media Header with Add Button */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Social Media Profiles</h3>
              <p className="text-sm text-gray-600">
                {formData.socials.length} platform{formData.socials.length !== 1 ? 's' : ''} connected
              </p>
            </div>
            {isEditing && getAvailablePlatforms().length > 0 && (
              <Dialog open={showAddSocialDialog} onOpenChange={setShowAddSocialDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Platform
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]">
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
                            className="w-full justify-between border-2 border-black rounded-lg bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
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
                        <DropdownMenuContent className="w-full min-w-[180px] border-2 border-black rounded-lg bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] p-1">
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
                        className="border-2 border-black rounded-lg"
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
                      className="flex-1 border-2 border-black rounded-xl bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddSocial}
                      disabled={!newSocialPlatform || !newSocialUrl.trim()}
                      className="flex-1 bg-green-400 hover:bg-green-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <div key={social.platform} className="bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150">
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
                      className="border-2 border-black rounded-lg text-sm"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <LinkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No social media connected</h3>
              <p className="text-gray-500 mb-4">Add your social media profiles to showcase your presence</p>
              {isEditing && getAvailablePlatforms().length > 0 && (
                <Button
                  onClick={() => setShowAddSocialDialog(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Platform
                </Button>
              )}
            </div>
          )}

          {/* Quick Actions */}
          {isEditing && (
            <div className="bg-yellow-100 border-2 border-black rounded-xl p-4">
              <h4 className="font-bold text-sm mb-2">💡 Quick Tips</h4>
              <ul className="text-xs space-y-1 text-gray-700">
                <li>• Enter the full URL of your social media profile</li>
                <li>• Your social links will be displayed on your public profile</li>
                <li>• Leave fields empty to hide them from your profile</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-red-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Manage your account security and privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Change Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                disabled={!isEditing}
                className="border-2 border-black rounded-lg pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={!isEditing}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              className="bg-green-400 hover:bg-green-500 text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              disabled={!isEditing}
            >
              <Shield className="w-4 h-4 mr-2" />
              Enable 2FA
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-black rounded-lg"
              disabled={!isEditing}
            >
              Privacy Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="fixed bottom-6 right-6 z-50 flex gap-4">
          <Button 
            onClick={handleCancel}
            variant="outline"
            disabled={isLoading}
            className="border-2 border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-green-400 hover:bg-green-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
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
