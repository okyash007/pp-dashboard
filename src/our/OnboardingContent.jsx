import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ImageUpload from '@/components/ImageUpload';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  Settings,
  Share,
  LogOut,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const getOnboarding = async (token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/onboarding`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!data.success) {
      console.error('API returned unsuccessful response:', data);
      return null;
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching onboarding:', error);
    return null;
  }
};

const updateOnboarding = async (token, data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/onboarding`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to update onboarding');
    }
    return result.data;
  } catch (error) {
    console.error('Error updating onboarding:', error);
    throw error;
  }
};

const OnboardingContent = () => {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [onboardingData, setOnboardingData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    identity: {
      type: '',
      legal_name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
      pan_number: '',
      gst_in: '',
      pan_image: '',
      gst_in_image: '',
    },
    bank_account: {
      name: '',
      bank_name: '',
      account_number: '',
      ifsc_code: '',
      account_image: '',
    },
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (token) {
      getOnboarding(token)
        .then((data) => {
          // Always set onboardingData
          setOnboardingData(data || {});
          if (data && data.identity) {
            // Prefill form with existing onboarding data
            setFormData({
              identity: {
                type: data.identity?.type || '',
                legal_name:
                  data.identity?.legal_name ||
                  `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
                pan_number: data.identity?.pan_number || '',
                gst_in: data.identity?.gst_in || '',
                pan_image: data.identity?.pan_image || '',
                gst_in_image: data.identity?.gst_in_image || '',
              },
              bank_account: {
                name:
                  data.bank_account?.name ||
                  `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
                bank_name: data.bank_account?.bank_name || '',
                account_number: data.bank_account?.account_number || '',
                ifsc_code: data.bank_account?.ifsc_code || '',
                account_image: data.bank_account?.account_image || '',
              },
            });
            // Set current step based on saved progress
            if (data.step) {
              setCurrentStep(Math.min(data.step - 1, 2)); // Max step is 2 (0-indexed)
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching onboarding data:', error);
          // Set empty onboarding data to allow user to proceed
          setOnboardingData({});
        });
    }
  }, [token, user?.firstName, user?.lastName]);

  const validateStep1 = () => {
    const newErrors = {};

    // Required fields for all types
    if (!formData.identity.type) {
      newErrors.identity_type = "Pick how you're signing up";
    }
    if (!formData.identity.legal_name.trim()) {
      newErrors.legal_name = "Legal name can't be empty";
    }
    if (!formData.identity.pan_number.trim()) {
      newErrors.pan_number = 'PAN number is required';
    }
    if (!formData.identity.pan_image.trim()) {
      newErrors.pan_image = 'Upload your PAN proof';
    }

    // GST fields required only for organisation
    if (formData.identity.type === 'organisation') {
      if (!formData.identity.gst_in.trim()) {
        newErrors.gst_in = 'GSTIN is required for organisations';
      }
      if (!formData.identity.gst_in_image.trim()) {
        newErrors.gst_in_image = 'Upload your GST certificate';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.bank_account.name.trim()) {
      newErrors.account_name = 'Account holder name is required';
    }
    if (!formData.bank_account.bank_name.trim()) {
      newErrors.bank_name = 'Bank name is required';
    }
    if (!formData.bank_account.account_number.trim()) {
      newErrors.account_number = 'Account number is required';
    }
    if (!formData.bank_account.ifsc_code.trim()) {
      newErrors.ifsc_code = 'IFSC code is required';
    }
    if (!formData.bank_account.account_image.trim()) {
      newErrors.account_image = 'Bank account image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (key) => {
    if (!errors[key]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const identityLabel = formData.identity.type
    ? formData.identity.type === 'organisation'
      ? 'Organisation'
      : 'Individual'
    : 'Creator';

  const renderError = (key) =>
    errors[key] ? (
      <p className='mt-2 text-[11px] font-black text-red-600 flex items-center gap-1'>
        <AlertCircle className='h-3.5 w-3.5' />
        {errors[key]}
      </p>
    ) : null;

  const baseInputClass =
    'h-11 px-4 bg-white border border-black/10 rounded-xl font-semibold focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-0 transition';
  const baseSelectTriggerClass =
    'w-full h-11 px-4 border border-black/10 rounded-xl font-semibold bg-white text-left focus:ring-2 focus:ring-black/20 focus:ring-offset-0 transition';
  const fieldWrapperClass = 'bg-white border border-black/5 rounded-3xl p-5 shadow-sm';
  const uploadShellClass =
    'mt-2 border border-dashed border-black/15 rounded-2xl bg-white/80 max-h-[70%] p-4';
  const buttonBaseClass =
    'h-auto font-black text-xs px-4 py-3 border-[4px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0';
  const buttonPrimaryClass = `${buttonBaseClass} bg-[#FEF18C] hover:bg-[#FEE55A] text-black`;
  const buttonAccentClass = `${buttonBaseClass} bg-[#AAD6B8] hover:bg-[#8cc7a3] text-black`;
  const buttonSecondaryClass = `${buttonBaseClass} bg-white hover:bg-[#FEF18C]/60 text-black`;
  const buttonDangerClass = `${buttonBaseClass} bg-[#FFB4B4] hover:bg-[#FF9B9B] text-black`;

  const steps = [
    {
      id: 'identity',
      title: 'Identity Check',
      shortTitle: 'Identity',
      icon: User,
      tagline: 'Tell us who’s getting paid so we can verify you quickly.',
      accent: '#FEF18C',
      content: (
        <div className='flex flex-col gap-4 h-full'>
          <div className={`${fieldWrapperClass}`}>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-[11px] font-black uppercase tracking-widest bg-[#FEF18C] border-[2px] border-black px-3 py-1 rounded-full'>
                Identity Basics
              </span>
              <User className='h-4 w-4 text-black' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div className='flex flex-col'>
                <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                  Identity Type <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.identity.type}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, type: value },
                    }));
                    clearError('identity_type');
                  }}
                >
                  <SelectTrigger
                    className={`${baseSelectTriggerClass} ${
                      errors.identity_type ? 'border-red-500 bg-red-50' : ''
                    }`}
                  >
                    <SelectValue placeholder='Select identity type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='individual'>Individual</SelectItem>
                    <SelectItem value='organisation'>Organisation</SelectItem>
                  </SelectContent>
                </Select>
                {renderError('identity_type')}
              </div>
              <div className='flex flex-col'>
                <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                  Legal Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  value={formData.identity.legal_name}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      identity: {
                        ...prev.identity,
                        legal_name: e.target.value,
                      },
                    }));
                    clearError('legal_name');
                  }}
                  placeholder='As per your PAN'
                  className={`${baseInputClass} ${
                    errors.legal_name ? 'border-red-500 bg-red-50' : ''
                  }`}
                />
                {renderError('legal_name')}
              </div>
            </div>

            <div className='mt-6 pt-4 border-t border-dashed border-black/30 space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-[11px] font-black uppercase tracking-widest bg-[#AAD6B8] border-[2px] border-black px-3 py-1 rounded-full'>
                  Government IDs
                </span>
                <Settings className='h-4 w-4 text-black' />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div className='flex flex-col'>
                  <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                    PAN Number <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    value={formData.identity.pan_number}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        identity: {
                          ...prev.identity,
                          pan_number: e.target.value,
                        },
                      }));
                      clearError('pan_number');
                    }}
                    placeholder='ABCDE1234F'
                    className={`${baseInputClass} ${
                      errors.pan_number ? 'border-red-500 bg-red-50' : ''
                    }`}
                  />
                  {renderError('pan_number')}
                </div>
                {formData.identity.type === 'organisation' && (
                  <div className='flex flex-col'>
                    <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                      GSTIN <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      value={formData.identity.gst_in}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          identity: {
                            ...prev.identity,
                            gst_in: e.target.value,
                          },
                        }));
                        clearError('gst_in');
                      }}
                      placeholder='22ABCDE1234F1Z5'
                      className={`${baseInputClass} ${
                        errors.gst_in ? 'border-red-500 bg-red-50' : ''
                      }`}
                    />
                    {renderError('gst_in')}
                  </div>
                )}
              </div>
              {formData.identity.type !== 'organisation' && (
                <p className='text-xs font-semibold text-black/60'>
                  GSTIN is only needed if you’re registering as an organisation.
                </p>
              )}
            </div>
          </div>

          <div className={`${fieldWrapperClass} flex-1`}>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-[11px] font-black uppercase tracking-widest bg-[#FEC4FF] border-[2px] border-black px-3 py-1 rounded-full'>
                Document Uploads
              </span>
              <Share className='h-4 w-4 text-black' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 h-full'>
              <div className='flex flex-col'>
                <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                  PAN Proof <span className='text-red-500'>*</span>
                </Label>
                <div className={uploadShellClass}>
                  <ImageUpload
                    value={formData.identity.pan_image}
                    onChange={(url) => {
                      setFormData((prev) => ({
                        ...prev,
                        identity: { ...prev.identity, pan_image: url || '' },
                      }));
                      clearError('pan_image');
                    }}
                  />
                </div>
                {renderError('pan_image')}
              </div>
              {formData.identity.type === 'organisation' && (
                <div className='flex flex-col'>
                  <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                    GST Certificate <span className='text-red-500'>*</span>
                  </Label>
                  <div className={uploadShellClass}>
                    <ImageUpload
                      value={formData.identity.gst_in_image}
                      onChange={(url) => {
                        setFormData((prev) => ({
                          ...prev,
                          identity: {
                            ...prev.identity,
                            gst_in_image: url || '',
                          },
                        }));
                        clearError('gst_in_image');
                      }}
                    />
                  </div>
                  {renderError('gst_in_image')}
                </div>
              )}
              {formData.identity.type !== 'organisation' && (
                <div className='flex flex-col justify-center bg-white/80 border-[2px] border-dashed border-black/40 rounded-xl p-4 h-[80%] text-center text-sm font-semibold text-black/60'>
                  Add your GST certificate only if you’re onboarding as a business.
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'bank',
      title: 'Bank Details',
      shortTitle: 'Bank',
      icon: Settings,
      tagline: 'Share the bank account where your tips should land.',
      accent: '#AAD6B8',
      content: (
        <div className='flex flex-col gap-4 h-full'>
          <div className={`${fieldWrapperClass}`}>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-[11px] font-black uppercase tracking-widest bg-white border-[2px] border-black px-3 py-1 rounded-full'>
                Account Details
              </span>
              <Settings className='h-4 w-4 text-black' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div className='flex flex-col'>
                <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                  Account Holder Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  value={formData.bank_account.name}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      bank_account: {
                        ...prev.bank_account,
                        name: e.target.value,
                      },
                    }));
                    clearError('account_name');
                  }}
                  placeholder='Name on bank account'
                  className={`${baseInputClass} ${
                    errors.account_name ? 'border-red-500 bg-red-50' : ''
                  }`}
                />
                {renderError('account_name')}
              </div>
              <div className='flex flex-col'>
                <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                  Bank Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  value={formData.bank_account.bank_name}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      bank_account: {
                        ...prev.bank_account,
                        bank_name: e.target.value,
                      },
                    }));
                    clearError('bank_name');
                  }}
                  placeholder='E.g. HDFC Bank'
                  className={`${baseInputClass} ${
                    errors.bank_name ? 'border-red-500 bg-red-50' : ''
                  }`}
                />
                {renderError('bank_name')}
              </div>
              <div className='flex flex-col'>
                <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                  Account Number <span className='text-red-500'>*</span>
                </Label>
                <Input
                  value={formData.bank_account.account_number}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      bank_account: {
                        ...prev.bank_account,
                        account_number: e.target.value,
                      },
                    }));
                    clearError('account_number');
                  }}
                  placeholder='0000 0000 0000'
                  className={`${baseInputClass} ${
                    errors.account_number ? 'border-red-500 bg-red-50' : ''
                  }`}
                />
                {renderError('account_number')}
              </div>
              <div className='flex flex-col'>
                <Label className='text-[11px] font-black text-black uppercase tracking-wide'>
                  IFSC Code <span className='text-red-500'>*</span>
                </Label>
                <Input
                  value={formData.bank_account.ifsc_code}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      bank_account: {
                        ...prev.bank_account,
                        ifsc_code: e.target.value,
                      },
                    }));
                    clearError('ifsc_code');
                  }}
                  placeholder='HDFC0001234'
                  className={`${baseInputClass} ${
                    errors.ifsc_code ? 'border-red-500 bg-red-50' : ''
                  }`}
                />
                {renderError('ifsc_code')}
              </div>
            </div>
          </div>

          <div className={`${fieldWrapperClass} flex-1`}>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-[11px] font-black uppercase tracking-widest bg-[#FEF18C] border-[2px] border-black px-3 py-1 rounded-full'>
                Proof Of Account
              </span>
              <Share className='h-4 w-4 text-black' />
            </div>
            <div className='flex flex-col h-full'>
              <p className='text-xs font-semibold text-black/70'>
                Upload a passbook photo or cancelled cheque so we can confirm payouts go to the
                right place.
              </p>
              <div className={`${uploadShellClass} flex-1 mt-4 h-[80%]`}>
                <ImageUpload
                  value={formData.bank_account.account_image}
                  onChange={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      bank_account: {
                        ...prev.bank_account,
                        account_image: url || '',
                      },
                    }));
                    clearError('account_image');
                  }}
                />
              </div>
              {renderError('account_image')}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'complete',
      title: 'Complete',
      shortTitle: 'Ready',
      icon: CheckCircle,
      tagline: 'You’re all set. Time to start collecting tips from your fans!',
      accent: '#FEC4FF',
      content: (
        <div className='h-full flex flex-col items-center justify-center text-center gap-8'>
          <div className='relative'>
            <div className='w-28 h-28 bg-[#AAD6B8] border-[6px] border-black rounded-3xl flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
              <CheckCircle className='h-16 w-16 text-black' />
            </div>
            <div className='absolute -top-4 -right-4 bg-[#FEF18C] border-[3px] border-black px-4 py-1 text-xs font-black rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              DONE!
            </div>
          </div>
          <div className='space-y-3 max-w-lg'>
            <h3 className='text-3xl font-black text-black tracking-tight uppercase'>
              Onboarding Complete
            </h3>
            <p className='text-base font-semibold text-black/70'>
              Your identity and payout details look great. Turn on your tip jar, share your link,
              and let the love (and fries) roll in.
            </p>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <div className='flex items-center gap-2 text-sm font-black text-black/60 uppercase tracking-widest'>
              <Share className='h-4 w-4' />
              Spread the word
            </div>
            <p className='text-sm font-semibold text-black/70'>
              Share your tip page and start getting recognised by your community.
            </p>
          </div>
        </div>
      ),
    },
  ];

  if (onboardingData === null) {
    return (
      <div className='min-h-screen w-full relative overflow-hidden flex items-center justify-center bg-[#AAD6B8]'>
        <style>{`
          @keyframes stripeMove {
            0% { background-position: 0 0, 0 0; }
            100% { background-position: 200px 0, 0 200px; }
          }
        `}</style>
        <div
          className='pointer-events-none absolute inset-0 opacity-40'
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(254,241,140,0.35) 0px, rgba(254,241,140,0.35) 12px, transparent 12px, transparent 24px), radial-gradient(circle, rgba(46,125,106,0.28) 2.5px, transparent 2.5px)',
            backgroundSize: 'auto, 20px 20px',
            animation: 'stripeMove 18s linear infinite',
          }}
        />
        <div className='relative z-10 text-center space-y-4'>
          <div className='w-12 h-12 border-[6px] border-black border-t-transparent rounded-full animate-spin mx-auto'></div>
          <p className='text-black font-black tracking-widest uppercase'>
            Loading your onboarding...
          </p>
        </div>
      </div>
    );
  }

  const nextStep = async () => {
    if (isSaving) return;
    if (currentStep === 0 && !validateStep1()) return;
    if (currentStep === 1 && !validateStep2()) return;
    if (!token) return;

    setIsSaving(true);

    try {
      if (currentStep === 0) {
        await updateOnboarding(token, {
          step: 2,
          identity: formData.identity,
        });
      } else if (currentStep === 1) {
        await updateOnboarding(token, {
          step: 3,
          completed: true,
          bank_account: formData.bank_account,
        });
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const finishOnboarding = () => {
    navigate('/dashboard');
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className='min-h-screen bg-[#FEF18C]/20 text-black relative overflow-hidden'>
      <style>{`
        @keyframes onboardingStripeMove {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 200px 0, 0 200px; }
        }
        @keyframes onboardingBubbleDrift {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .onboarding-bg-animated {
          animation: onboardingStripeMove 22s linear infinite;
        }
        .onboarding-bubble {
          animation: onboardingBubbleDrift 12s ease-in-out infinite;
        }
      `}</style>

      <div
        className='pointer-events-none absolute inset-0 onboarding-bg-animated opacity-40'
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,228,130,0.35) 0px, rgba(255,228,130,0.35) 12px, transparent 12px, transparent 24px), radial-gradient(circle, rgba(251,191,36,0.18) 2.5px, transparent 3px)',
          backgroundSize: 'auto, 22px 22px',
        }}
      />
      <div className='pointer-events-none absolute -top-16 -right-10 w-64 h-64 rounded-full bg-[#AAD6B8]/60 blur-3xl ' />

      <div className='flex min-h-screen flex-col relative z-10'>
        <header className='sticky top-0 z-20 border-b border-black/5 bg-white/95 px-6 py-6 backdrop-blur'>
          <div className='mx-auto flex w-full max-w-5xl flex-col gap-5'>
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <div className='space-y-1'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-black/50'>
                  Step {currentStep + 1} of {steps.length}
                </p>
                <h1 className='text-3xl font-black tracking-tight'>
                  Finish setting up your account
                </h1>
                <p className='text-sm font-medium text-black/60'>{steps[currentStep].tagline}</p>
              </div>
              <div className='flex items-center gap-4'>
                <div className='text-right'>
                  <p className='text-[11px] font-black uppercase tracking-widest text-black/50'>
                    Signing up as
                  </p>
                  <p className='text-lg font-black'>{identityLabel}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  className={`${buttonDangerClass} flex items-center gap-2`}
                >
                  <LogOut className='h-4 w-4' />
                  Logout
                </Button>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='h-2 rounded-full bg-black/10'>
                <div
                  className='h-2 rounded-full bg-black transition-all duration-300'
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className='flex items-center gap-2 overflow-x-auto pb-1'>
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  return (
                    <button
                      key={step.id}
                      type='button'
                      onClick={() => {
                        if (!isSaving && index <= currentStep) {
                          setCurrentStep(index);
                        }
                      }}
                      className={`flex min-w-[150px] flex-1 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                        isActive
                          ? 'border-black bg-black text-white'
                          : isCompleted
                          ? 'border-black/10 bg-black/5 text-black'
                          : 'border-black/10 bg-white text-black/70'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-black ${
                          isActive
                            ? 'border-white/50 bg-white/10 text-white'
                            : isCompleted
                            ? 'border-black/10 bg-white text-black'
                            : 'border-black/10 bg-white text-black'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-xs font-black uppercase tracking-widest'>
                          {step.shortTitle}
                        </span>
                        <span className='text-[11px] font-semibold text-white/80'>
                          {isActive ? step.tagline : ''}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        <main className='flex-1 overflow-y-auto px-6 py-8 pb-32'>
          <div className='mx-auto flex w-full max-w-5xl flex-col gap-6'>
            <div className='rounded-[32px] border border-black/5 bg-white p-6 shadow-sm'>
              {steps[currentStep].content}
            </div>
          </div>
        </main>

        <footer className='fixed bottom-0 inset-x-0 z-30 px-6 py-6'>
          <div className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 rounded-[32px]'>
            <Button
              onClick={prevStep}
              disabled={currentStep === 0 || isSaving}
              className={`${buttonSecondaryClass} flex items-center gap-2`}
            >
              <ArrowLeft className='h-4 w-4' />
              Back
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button
                onClick={finishOnboarding}
                disabled={isSaving}
                className={`${buttonAccentClass} flex items-center gap-2`}
              >
                <CheckCircle className='h-4 w-4' />
                View dashboard
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={isSaving}
                className={`${buttonPrimaryClass} flex items-center gap-2`}
              >
                {isSaving ? 'Saving...' : 'Save & continue'}
                <ArrowRight className='h-4 w-4' />
              </Button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OnboardingContent;
