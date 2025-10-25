import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

// Social platforms configuration
const socialPlatforms = [
  {
    value: "instagram",
    label: "Instagram",
    icon: Instagram,
    color: "from-purple-500 via-pink-500 to-orange-400",
  },
  { value: "facebook", label: "Facebook", icon: "f", color: "bg-blue-600" },
  { value: "youtube", label: "YouTube", icon: Youtube, color: "bg-red-600" },
  { value: "twitch", label: "Twitch", icon: Gamepad2, color: "bg-purple-600" },
  { value: "twitter", label: "X (Twitter)", icon: "𝕏", color: "bg-black" },
  { value: "tiktok", label: "TikTok", icon: Music, color: "bg-black" },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-600",
  },
  { value: "github", label: "GitHub", icon: "GH", color: "bg-gray-800" },
];

const UpdateSocials = () => {
  const { user, updateProfile } = useAuthStore();
  
  // Social media state
  const [socials, setSocials] = useState(user?.socials || []);
  const [showAddSocialDialog, setShowAddSocialDialog] = useState(false);
  const [newSocialPlatform, setNewSocialPlatform] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");
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
      const existingIndex = prev.findIndex(
        (social) => social.platform === platform
      );

      if (url.trim() === "") {
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
    return social?.url || "";
  };

  const getAvailablePlatforms = () => {
    const usedPlatforms = socials.map((social) => social.platform);
    return socialPlatforms.filter(
      (platform) => !usedPlatforms.includes(platform.value)
    );
  };

  const handleAddSocial = () => {
    if (newSocialPlatform && newSocialUrl.trim()) {
      setSocials((prev) => [
        ...prev,
        { platform: newSocialPlatform, url: newSocialUrl.trim() },
      ]);
      setNewSocialPlatform("");
      setNewSocialUrl("");
      setShowAddSocialDialog(false);
    }
  };

  const handleRemoveSocial = (platform) => {
    setSocials((prev) => prev.filter((social) => social.platform !== platform));
  };

  // Save social media changes to backend
  const saveSocials = async () => {
    setIsLoading(true);

    const loadingToastId = toast.loading("💾 Saving Social Media...", {
      description: "Please wait while we update your social media profiles.",
    });

    try {
      await updateProfile({
        socials: socials.filter((social) => social.url.trim() !== ""), // Only include socials with URLs
      });

      // Dismiss loading toast and show success
      toast.dismiss(loadingToastId);
      toast.success("🎉 Social Media Updated!", {
        description: "Your social media profiles have been saved successfully.",
        duration: 4000,
      });
    } catch (error) {
      console.error("Error saving social media:", error);

      // Dismiss loading toast and show error
      toast.dismiss(loadingToastId);
      toast.error("❌ Update Failed", {
        description: error.message || "Something went wrong. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold">Social Media</h2>
          {JSON.stringify(socials) !== JSON.stringify(user?.socials || []) && (
            <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full border border-orange-400">
              Unsaved
            </span>
          )}
        </div>
        <Button
          onClick={saveSocials}
          disabled={isLoading}
          size="sm"
          className="bg-purple-200 hover:bg-purple-300 text-purple-900 font-bold border-2 border-purple-800 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4 mr-1" />
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Social Media Grid */}
      {socials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {socials.map((social) => {
            const platform = socialPlatforms.find(
              (p) => p.value === social.platform
            );
            if (!platform) return null;

            return (
              <div
                key={social.platform}
                className="bg-white border-2 border-black rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center ${
                        platform.color.includes("gradient")
                          ? `bg-gradient-to-tr ${platform.color}`
                          : platform.color
                      }`}
                    >
                      {typeof platform.icon === "string" ? (
                        <span className="text-white text-xs font-bold">
                          {platform.icon}
                        </span>
                      ) : (
                        <platform.icon className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium text-sm">{platform.label}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0 hover:bg-red-50 hover:border-red-300"
                      >
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleRemoveSocial(social.platform)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <X className="w-3 h-3 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Input
                  value={social.url}
                  onChange={(e) =>
                    handleSocialChange(social.platform, e.target.value)
                  }
                  placeholder={`https://${social.platform}.com/username`}
                  className="border-2 border-black rounded-lg text-sm"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <LinkIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            No social media connected
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Add your social media profiles
          </p>
        </div>
      )}

      {/* Add Platform Button */}
      {getAvailablePlatforms().length > 0 && (
        <Dialog
          open={showAddSocialDialog}
          onOpenChange={setShowAddSocialDialog}
        >
          <DialogTrigger asChild>
            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none">
              <Plus className="w-4 h-4 mr-2" />
              Add Platform
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-black">
                Add Social Media Platform
              </DialogTitle>
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
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center ${
                              socialPlatforms
                                .find((p) => p.value === newSocialPlatform)
                                ?.color.includes("gradient")
                                ? `bg-gradient-to-tr ${
                                    socialPlatforms.find(
                                      (p) => p.value === newSocialPlatform
                                    )?.color
                                  }`
                                : socialPlatforms.find(
                                    (p) => p.value === newSocialPlatform
                                  )?.color
                            }`}
                          >
                            {(() => {
                              const selectedPlatform = socialPlatforms.find(
                                (p) => p.value === newSocialPlatform
                              );
                              return typeof selectedPlatform?.icon === "string" ? (
                                <span className="text-white text-xs font-bold">
                                  {selectedPlatform.icon}
                                </span>
                              ) : (
                                selectedPlatform?.icon && (
                                  <selectedPlatform.icon className="w-2 h-2 text-white" />
                                )
                              );
                            })()}
                          </div>
                          {
                            socialPlatforms.find(
                              (p) => p.value === newSocialPlatform
                            )?.label
                          }
                        </div>
                      ) : (
                        "Select platform"
                      )}
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-[180px] border-2 border-black rounded-lg bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] p-1">
                    {getAvailablePlatforms().map((platform) => (
                      <DropdownMenuItem
                        key={platform.value}
                        onClick={() => setNewSocialPlatform(platform.value)}
                        className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded"
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center ${
                            platform.color.includes("gradient")
                              ? `bg-gradient-to-tr ${platform.color}`
                              : platform.color
                          }`}
                        >
                          {typeof platform.icon === "string" ? (
                            <span className="text-white text-xs font-bold">
                              {platform.icon}
                            </span>
                          ) : (
                            <platform.icon className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {platform.label}
                          </div>
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
                  setNewSocialPlatform("");
                  setNewSocialUrl("");
                  setShowAddSocialDialog(false);
                }}
                variant="outline"
                className="flex-1 border-2 border-black rounded-lg bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSocial}
                disabled={!newSocialPlatform || !newSocialUrl.trim()}
                className="flex-1 bg-green-400 hover:bg-green-500 text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Platform
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UpdateSocials;