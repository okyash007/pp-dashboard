import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Zap
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export function ProfileContent() {
  const { user, token } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    twitter: user?.twitter || '',
    instagram: user?.instagram || '',
    linkedin: user?.linkedin || '',
    youtube: user?.youtube || '',
    tiktok: user?.tiktok || '',
    twitch: user?.twitch || '',
    kick: user?.kick || '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the profile
      console.log('Saving profile:', formData);
      setIsEditing(false);
      // You could add a success toast here
    } catch (error) {
      console.error('Error saving profile:', error);
      // You could add an error toast here
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      twitter: user?.twitter || '',
      instagram: user?.instagram || '',
      linkedin: user?.linkedin || '',
      youtube: user?.youtube || '',
      tiktok: user?.tiktok || '',
      twitch: user?.twitch || '',
      kick: user?.kick || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Manage your account settings and personal information.
          </p>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
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

        {/* Profile Picture & Bio */}
        <Card className="bg-green-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Profile Picture & Bio
            </CardTitle>
            <CardDescription>
              Your profile image and description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
                {user?.image?.src ? (
                  <img
                    src={user.image.src}
                    alt={user?.username || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-black" />
                )}
              </div>
              <div className="flex-1">
                <Button 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                  disabled={!isEditing}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                placeholder="Tell us about yourself..."
                className="w-full p-3 border-2 border-black rounded-lg resize-none h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                disabled={!isEditing}
                placeholder="City, Country"
                className="border-2 border-black rounded-lg"
              />
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
          {/* Social Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* X (Twitter) */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">𝕏</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">X (Twitter)</h3>
                  <p className="text-xs text-gray-600">Share your thoughts</p>
                </div>
              </div>
              <Input
                value={formData.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                disabled={!isEditing}
                placeholder="https://x.com/username"
                className="border-2 border-black rounded-lg text-sm"
              />
            </div>

            {/* Instagram */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Instagram</h3>
                  <p className="text-xs text-gray-600">Share your moments</p>
                </div>
              </div>
              <Input
                value={formData.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                disabled={!isEditing}
                placeholder="https://instagram.com/username"
                className="border-2 border-black rounded-lg text-sm"
              />
            </div>

            {/* LinkedIn */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">LinkedIn</h3>
                  <p className="text-xs text-gray-600">Professional network</p>
                </div>
              </div>
              <Input
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                disabled={!isEditing}
                placeholder="https://linkedin.com/in/username"
                className="border-2 border-black rounded-lg text-sm"
              />
            </div>

            {/* YouTube */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Youtube className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">YouTube</h3>
                  <p className="text-xs text-gray-600">Share your videos</p>
                </div>
              </div>
              <Input
                value={formData.youtube}
                onChange={(e) => handleInputChange('youtube', e.target.value)}
                disabled={!isEditing}
                placeholder="https://youtube.com/@username"
                className="border-2 border-black rounded-lg text-sm"
              />
            </div>

            {/* TikTok */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">TikTok</h3>
                  <p className="text-xs text-gray-600">Create short videos</p>
                </div>
              </div>
              <Input
                value={formData.tiktok}
                onChange={(e) => handleInputChange('tiktok', e.target.value)}
                disabled={!isEditing}
                placeholder="https://tiktok.com/@username"
                className="border-2 border-black rounded-lg text-sm"
              />
            </div>

            {/* Twitch */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Twitch</h3>
                  <p className="text-xs text-gray-600">Live streaming</p>
                </div>
              </div>
              <Input
                value={formData.twitch}
                onChange={(e) => handleInputChange('twitch', e.target.value)}
                disabled={!isEditing}
                placeholder="https://twitch.tv/username"
                className="border-2 border-black rounded-lg text-sm"
              />
            </div>

            {/* Kick */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Kick</h3>
                  <p className="text-xs text-gray-600">Live streaming</p>
                </div>
              </div>
              <Input
                value={formData.kick}
                onChange={(e) => handleInputChange('kick', e.target.value)}
                disabled={!isEditing}
                placeholder="https://kick.com/username"
                className="border-2 border-black rounded-lg text-sm"
              />
            </div>
          </div>

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
        <div className="flex justify-end gap-4">
          <Button 
            onClick={handleCancel}
            variant="outline"
            className="border-2 border-black rounded-lg"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-green-400 hover:bg-green-500 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
