import React, { useState } from "react";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ImageUpload";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  Settings,
  Palette,
  Share,
} from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

const getOnboarding = async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/onboarding`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    const data = await response.json();
    if (!data.success) {
      console.error("API returned unsuccessful response:", data);
      return null;
    }
    return data.data;
  } catch (error) {
    console.error("Error fetching onboarding:", error);
    return null;
  }
};

const updateOnboarding = async (token, data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/onboarding`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to update onboarding");
    }
    return result.data;
  } catch (error) {
    console.error("Error updating onboarding:", error);
    throw error;
  }
};

const OnboardingContent = () => {
  const { token, user } = useAuthStore();
  const [onboardingData, setOnboardingData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [identityType, setIdentityType] = useState("");

  const [formData, setFormData] = useState({
    identity: {
      type: "",
      legal_name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      pan_number: "",
      gst_in: "",
      pan_image: "",
      gst_in_image: "",
    },
    bank_account: {
      name: "",
      bank_name: "",
      account_number: "",
      ifsc_code: "",
      account_image: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (token) {
      getOnboarding(token).then((data) => {
        // Always set onboardingData
        setOnboardingData(data || {});
        if (data) {
          // Prefill form with existing onboarding data
          setFormData({
            identity: {
              type: data.identity?.type || "",
              legal_name: data.identity?.legal_name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
              pan_number: data.identity?.pan_number || "",
              gst_in: data.identity?.gst_in || "",
              pan_image: data.identity?.pan_image || "",
              gst_in_image: data.identity?.gst_in_image || "",
            },
            bank_account: {
              name: data.bank_account?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
              bank_name: data.bank_account?.bank_name || "",
              account_number: data.bank_account?.account_number || "",
              ifsc_code: data.bank_account?.ifsc_code || "",
              account_image: data.bank_account?.account_image || "",
            },
          });
          // Set current step based on saved progress
          if (data.step) {
            setCurrentStep(Math.min(data.step - 1, 2)); // Max step is 2 (0-indexed)
          }
          // Update identity type state for consistency
          if (data.identity?.type) {
            setIdentityType(data.identity.type);
          }
        }
      }).catch((error) => {
        console.error("Error fetching onboarding data:", error);
        // Set empty onboarding data to allow user to proceed
        setOnboardingData({});
      });
    }
  }, [token, user?.firstName, user?.lastName]);

  const validateStep1 = () => {
    const newErrors = {};

    // Required fields for all types
    if (!formData.identity.type) {
      newErrors.identity_type = "Identity type is required";
    }
    if (!formData.identity.legal_name.trim()) {
      newErrors.legal_name = "Legal name is required";
    }
    if (!formData.identity.pan_number.trim()) {
      newErrors.pan_number = "PAN number is required";
    }
    if (!formData.identity.pan_image.trim()) {
      newErrors.pan_image = "PAN image is required";
    }

    // GST fields required only for organisation
    if (formData.identity.type === "organisation") {
      if (!formData.identity.gst_in.trim()) {
        newErrors.gst_in = "GST IN is required for organisation";
      }
      if (!formData.identity.gst_in_image.trim()) {
        newErrors.gst_in_image = "GST image is required for organisation";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.bank_account.name.trim()) {
      newErrors.account_name = "Account holder name is required";
    }
    if (!formData.bank_account.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required";
    }
    if (!formData.bank_account.account_number.trim()) {
      newErrors.account_number = "Account number is required";
    }
    if (!formData.bank_account.ifsc_code.trim()) {
      newErrors.ifsc_code = "IFSC code is required";
    }
    if (!formData.bank_account.account_image.trim()) {
      newErrors.account_image = "Bank account image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  if (onboardingData === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading onboarding data...</p>
        </div>
      </div>
    );
  }

  const steps = [
    {
      id: "identity",
      title: "Identity Verification",
      description: "Verify your identity and business details",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-black">
            <div className="w-8 h-8 bg-pink-200 rounded-lg flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]">
              <User className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold">Identity Verification</h3>
          </div>
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="identityType"
                className="text-sm font-bold text-black"
              >
                Identity Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.identity.type}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    identity: { ...prev.identity, type: value },
                  }));
                  setIdentityType(value);
                  if (errors.identity_type) {
                    setErrors((prev) => ({ ...prev, identity_type: "" }));
                  }
                }}
              >
                <SelectTrigger
                  className={`w-full h-12 px-4 border-2 rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 font-semibold mt-2 ${
                    errors.identity_type ? "border-red-500" : "border-black"
                  }`}
                >
                  <SelectValue placeholder="Select Identity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="organisation">Organisation</SelectItem>
                </SelectContent>
              </Select>
              {errors.identity_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.identity_type}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="legalName"
                className="text-sm font-bold text-black"
              >
                Legal Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="legalName"
                value={formData.identity.legal_name}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    identity: { ...prev.identity, legal_name: e.target.value },
                  }));
                  if (errors.legal_name) {
                    setErrors((prev) => ({ ...prev, legal_name: "" }));
                  }
                }}
                placeholder="Enter your legal name"
                className={`mt-2 border-2 rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 ${
                  errors.legal_name ? "border-red-500" : "border-black"
                }`}
              />
              {errors.legal_name && (
                <p className="text-red-500 text-sm mt-1">{errors.legal_name}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="panNumber"
                className="text-sm font-bold text-black"
              >
                PAN Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="panNumber"
                value={formData.identity.pan_number}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    identity: { ...prev.identity, pan_number: e.target.value },
                  }));
                  if (errors.pan_number) {
                    setErrors((prev) => ({ ...prev, pan_number: "" }));
                  }
                }}
                placeholder="Enter your PAN number"
                className={`mt-2 border-2 rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 ${
                  errors.pan_number ? "border-red-500" : "border-black"
                }`}
              />
              {errors.pan_number && (
                <p className="text-red-500 text-sm mt-1">{errors.pan_number}</p>
              )}
            </div>
            <div>
              <Label htmlFor="gstIn" className="text-sm font-bold text-black">
                GST IN{" "}
                {formData.identity.type === "organisation" ? (
                  <span className="text-red-500">*</span>
                ) : (
                  "(Optional)"
                )}
              </Label>
              <Input
                id="gstIn"
                value={formData.identity.gst_in}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    identity: { ...prev.identity, gst_in: e.target.value },
                  }));
                  if (errors.gst_in) {
                    setErrors((prev) => ({ ...prev, gst_in: "" }));
                  }
                }}
                placeholder="Enter your GST IN number"
                className={`mt-2 border-2 rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 ${
                  errors.gst_in ? "border-red-500" : "border-black"
                }`}
              />
              {errors.gst_in && (
                <p className="text-red-500 text-sm mt-1">{errors.gst_in}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="panImage"
                  className="text-sm font-bold text-black"
                >
                  PAN Image <span className="text-red-500">*</span>
                </Label>
                <ImageUpload
                  value={formData.identity.pan_image}
                  onChange={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, pan_image: url || "" },
                    }));
                    if (errors.pan_image) {
                      setErrors((prev) => ({ ...prev, pan_image: "" }));
                    }
                  }}
                  className="mt-2"
                />
                {errors.pan_image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pan_image}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="gstImage"
                  className="text-sm font-bold text-black"
                >
                  GST Image{" "}
                  {formData.identity.type === "organisation" ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    "(Optional)"
                  )}
                </Label>
                <ImageUpload
                  value={formData.identity.gst_in_image}
                  onChange={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, gst_in_image: url || "" },
                    }));
                    if (errors.gst_in_image) {
                      setErrors((prev) => ({ ...prev, gst_in_image: "" }));
                    }
                  }}
                  className="mt-2"
                />
                {errors.gst_in_image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gst_in_image}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "bank",
      title: "Bank Details",
      description: "Add your bank account information",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-black">
            <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]">
              <Settings className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold">Bank Account Details</h3>
          </div>
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="accountName"
                className="text-sm font-bold text-black"
              >
                Account Holder Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="accountName"
                value={formData.bank_account.name}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    bank_account: {
                      ...prev.bank_account,
                      name: e.target.value,
                    },
                  }));
                  if (errors.account_name) {
                    setErrors((prev) => ({ ...prev, account_name: "" }));
                  }
                }}
                placeholder="Enter account holder name"
                className={`mt-2 border-2 rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 ${
                  errors.account_name ? "border-red-500" : "border-black"
                }`}
              />
              {errors.account_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.account_name}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="bankName"
                className="text-sm font-bold text-black"
              >
                Bank Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bankName"
                value={formData.bank_account.bank_name}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    bank_account: {
                      ...prev.bank_account,
                      bank_name: e.target.value,
                    },
                  }));
                  if (errors.bank_name) {
                    setErrors((prev) => ({ ...prev, bank_name: "" }));
                  }
                }}
                placeholder="Enter bank name"
                className={`mt-2 border-2 rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 ${
                  errors.bank_name ? "border-red-500" : "border-black"
                }`}
              />
              {errors.bank_name && (
                <p className="text-red-500 text-sm mt-1">{errors.bank_name}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="accountNumber"
                className="text-sm font-bold text-black"
              >
                Account Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="accountNumber"
                value={formData.bank_account.account_number}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    bank_account: {
                      ...prev.bank_account,
                      account_number: e.target.value,
                    },
                  }));
                  if (errors.account_number) {
                    setErrors((prev) => ({ ...prev, account_number: "" }));
                  }
                }}
                placeholder="Enter account number"
                className={`mt-2 border-2 rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 ${
                  errors.account_number ? "border-red-500" : "border-black"
                }`}
              />
              {errors.account_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.account_number}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="ifscCode"
                className="text-sm font-bold text-black"
              >
                IFSC Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ifscCode"
                value={formData.bank_account.ifsc_code}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    bank_account: {
                      ...prev.bank_account,
                      ifsc_code: e.target.value,
                    },
                  }));
                  if (errors.ifsc_code) {
                    setErrors((prev) => ({ ...prev, ifsc_code: "" }));
                  }
                }}
                placeholder="Enter IFSC code"
                className={`mt-2 border-2 rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 ${
                  errors.ifsc_code ? "border-red-500" : "border-black"
                }`}
              />
              {errors.ifsc_code && (
                <p className="text-red-500 text-sm mt-1">{errors.ifsc_code}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="accountImage"
                className="text-sm font-bold text-black"
              >
                Bank Account Image/Passbook{" "}
                <span className="text-red-500">*</span>
              </Label>
              <ImageUpload
                value={formData.bank_account.account_image}
                onChange={(url) => {
                  setFormData((prev) => ({
                    ...prev,
                    bank_account: {
                      ...prev.bank_account,
                      account_image: url || "",
                    },
                  }));
                  if (errors.account_image) {
                    setErrors((prev) => ({ ...prev, account_image: "" }));
                  }
                }}
                className="mt-2"
              />
              {errors.account_image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.account_image}
                </p>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "complete",
      title: "Complete",
      description: "You're all set!",
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-200 rounded-xl flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
              <CheckCircle className="h-12 w-12 text-black" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-black">
            <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]">
              <Share className="h-4 w-4" />
            </div>
            <h3 className="text-2xl font-bold">Onboarding Complete!</h3>
          </div>
          <p className="text-lg font-semibold text-gray-700 max-w-md mx-auto">
            Your identity and bank details have been submitted successfully. You
            can now start using the platform and receive payments.
          </p>
        </div>
      ),
    },
  ];

  const nextStep = async () => {
    if (isSaving) return; // Prevent multiple clicks while saving
    
    setIsSaving(true);
    
    try {
      if (currentStep === 0) {
        // Validate step 1 (Identity Verification)
        if (!validateStep1()) {
          return;
        }
        // Save identity data
        await updateOnboarding(token, {
          step: 2,
          identity: formData.identity,
        });
        console.log("Identity data saved successfully");
      } else if (currentStep === 1) {
        // Validate step 2 (Bank Details)
        if (!validateStep2()) {
          return;
        }
        // Save bank account data and mark as completed
        await updateOnboarding(token, {
          step: 3,
          completed: true,
          bank_account: formData.bank_account,
        });
        console.log("Bank account data saved successfully and onboarding completed");
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error("Failed to save onboarding data:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsSaving(false);
    }
  };

  const finishOnboarding = async () => {
    // This function is now handled by nextStep when on step 2
    // Keeping it for the final step UI but the actual completion happens in nextStep
    console.log("Onboarding already completed in nextStep");
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    };
 
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <User className="w-6 h-6 text-black" />
            </div>
            <CardTitle className="text-3xl font-bold text-black">
              Welcome to PP Dashboard!
            </CardTitle>
          </div>
          <CardDescription className="text-lg font-semibold text-gray-700">
            Complete your identity verification and bank details to start
            receiving payments on the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            orientation="horizontal"
            showContent={true}
          />

          {/* Navigation buttons */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || isSaving}
              className="flex items-center gap-2 bg-red-200 hover:bg-red-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-3">
              {currentStep === steps.length - 1 ? (
                <Button 
                  onClick={finishOnboarding}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-green-200 hover:bg-green-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                  <CheckCircle className="h-4 w-4" />
                  {isSaving ? "Finishing..." : "Finish Setup"}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                  {isSaving ? "Saving..." : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingContent;
