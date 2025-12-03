import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { validateEmail, validatePassword, validateConfirmPassword } from '@/lib/validation';
import { useAuthStore } from '@/stores/authStore';
import coolPotato from '@/assets/cool.svg?url';
import treePotato from '@/assets/tree.svg?url';

export default function ForgotPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { forgotPassword, resetPassword } = useAuthStore();
  const navigate = useNavigate();

  // rotating mascots
  const potatoMascots = [coolPotato];
  const [currentPotato, setCurrentPotato] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPotato((prev) => (prev + 1) % potatoMascots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.password, value);
        break;
      default:
        break;
    }
    return error;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError('');
    setSuccessMessage('');

    const newTouched = { email: true };
    setTouched(newTouched);

    const newErrors = {};
    newErrors.email = validateField('email', formData.email);
    setErrors(newErrors);

    if (!newErrors.email) {
      try {
        const response = await forgotPassword(formData.email);
        // Display the message from API response
        const apiMessage = response?.message || 'If an account with that email exists, a password reset link has been sent.';
        
        // Check if the message indicates an error (like "Creator not found")
        if (response?.statusCode === 400 || apiMessage.toLowerCase().includes('not found')) {
          setApiError(apiMessage);
        } else {
          setSuccessMessage(apiMessage);
          setFormData({ ...formData, email: '' });
        }
      } catch (error) {
        setApiError(error.message || 'Failed to send reset email. Please try again.');
      }
    }

    setIsSubmitting(false);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError('');
    setSuccessMessage('');

    const newTouched = { password: true, confirmPassword: true };
    setTouched(newTouched);

    const newErrors = {};
    newErrors.password = validateField('password', formData.password);
    newErrors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== null);

    if (!hasErrors) {
      try {
        const response = await resetPassword(token, formData.password);
        // Display the message from API response
        const apiMessage = response?.message || 'Password reset successfully! Redirecting to login...';
        setSuccessMessage(apiMessage);
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      } catch (error) {
        setApiError(error.message || 'Failed to reset password. The token may be invalid or expired.');
      }
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  return (
    <div className='min-h-screen w-full relative overflow-hidden flex items-stretch bg-[#AAD6B8]'>
      {/* Page-level animations */}
      <style>{`
        @keyframes stripeMove {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 200px 0, 0 200px; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .bg-animated {
          animation: stripeMove 18s linear infinite;
        }
        .mascot-enter {
          animation: floatY 5s ease-in-out 0s infinite;
          transform-origin: bottom center;
        }
      `}</style>

      {/* Stripes + Dots animated background */}
      <div
        className='pointer-events-none absolute inset-0 opacity-40 bg-animated'
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(254,241,140,0.35) 0px, rgba(254,241,140,0.35) 12px, transparent 12px, transparent 24px), radial-gradient(circle, rgba(46,125,106,0.28) 2.5px, transparent 2.5px)',
          backgroundSize: 'auto, 20px 20px',
        }}
      />

      <div className='relative z-10 w-full flex items-center justify-center p-6 md:p-12'>
        <div className='relative w-full max-w-5xl flex items-end justify-start ml-36'>
          {/* Brand + Form */}
          <div className='w-full max-w-xl'>
            {/* Brand header - match DashboardLayout */}
            <div className='text-left mb-6'>
              <div className='relative bg-gradient-to-br from-[#828BF8] via-[#828BF8] to-[#828BF8]/90 border-[5px] border-black p-4 pr-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
                <div className='flex items-center gap-4 relative z-10'>
                  <div className='relative flex items-center'>
                    <img
                      src={potatoMascots[currentPotato]}
                      alt='Potato Pay Mascot'
                      className='w-24 h-24'
                    />
                  </div>

                  <div className='flex flex-col flex-1 -ml-5'>
                    <div className='flex items-center gap-2'>
                      <span className='text-3xl font-black text-white tracking-tight drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] leading-none uppercase'>
                        POTATO<span className='text-[#FEF18C]'>PAY</span>.CO
                      </span>
                    </div>
                    <span className='text-[11px] text-white/90 font-bold tracking-wide mt-1 uppercase leading-3.5'>
                      The Future of Digital Payments & Fun Fan Funding
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {apiError && (
              <div className='mb-6 p-3 border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                <div className='flex items-center gap-2 text-sm text-red-600 font-black'>
                  <AlertCircle className='w-4 h-4' />
                  <span>{apiError}</span>
                </div>
              </div>
            )}

            {successMessage && (
              <div className='mb-6 p-3 border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                <div className='flex items-center gap-2 text-sm text-green-600 font-black'>
                  <CheckCircle className='w-4 h-4' />
                  <span>{successMessage}</span>
                </div>
              </div>
            )}

            {token ? (
              // Reset Password Form
              <form onSubmit={handleResetSubmit} className='space-y-6' noValidate>
                <div className='space-y-2'>
                  <h2 className='text-2xl font-black text-black mb-2'>Reset Your Password</h2>
                  <p className='text-sm text-black font-bold mb-4'>
                    Enter your new password below.
                  </p>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='password' className='text-sm font-black text-black'>
                    New Password
                  </label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10' />
                    <Input
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter your new password'
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`pl-10 pr-10 h-12 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${
                        errors.password && touched.password ? 'border-red-500 border-4' : ''
                      }`}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black transition-colors z-10'
                    >
                      {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className='flex items-center gap-2 text-sm text-red-600 font-bold'>
                      <AlertCircle className='w-4 h-4' />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label htmlFor='confirmPassword' className='text-sm font-black text-black'>
                    Confirm New Password
                  </label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10' />
                    <Input
                      id='confirmPassword'
                      name='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm your new password'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`pl-10 pr-10 h-12 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${
                        errors.confirmPassword && touched.confirmPassword ? 'border-red-500 border-4' : ''
                      }`}
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black transition-colors z-10'
                    >
                      {showConfirmPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className='flex items-center gap-2 text-sm text-red-600 font-bold'>
                      <AlertCircle className='w-4 h-4' />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>

                <Button
                  type='submit'
                  className='w-full h-14 bg-[#828BF8] hover:bg-[#828BF8]/90 text-white border-[3px] border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>

                <p className='text-center text-sm text-black font-bold mt-4'>
                  Remember your password?{' '}
                  <Link
                    to='/login'
                    className='text-black hover:underline font-bold transition-colors'
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            ) : (
              // Forgot Password Email Form
              <form onSubmit={handleEmailSubmit} className='space-y-6' noValidate>
                <div className='space-y-2'>
                  <h2 className='text-2xl font-black text-black mb-2'>Forgot Password?</h2>
                  <p className='text-sm text-black font-bold mb-4'>
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='email' className='text-sm font-black text-black'>
                    Email Address
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10' />
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='Enter your email'
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`pl-10 h-12 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${
                        errors.email && touched.email ? 'border-red-500 border-4' : ''
                      }`}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div className='flex items-center gap-2 text-sm text-red-600 font-bold'>
                      <AlertCircle className='w-4 h-4' />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <Button
                  type='submit'
                  className='w-full h-14 bg-[#828BF8] hover:bg-[#828BF8]/90 text-white border-[3px] border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>

                <p className='text-center text-sm text-black font-bold mt-4'>
                  Remember your password?{' '}
                  <Link
                    to='/login'
                    className='text-black hover:underline font-bold transition-colors'
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </div>
          {/* Mascot next to form */}
          <div className='hidden md:block pb-2 absolute left-100 bottom-0 pointer-events-none'>
            <img
              src={treePotato}
              alt='Potato Pay Mascot'
              className='w-64 h-64 object-contain mascot-enter scale-325'
              style={{ filter: 'drop-shadow(6px 6px 0 rgba(0,0,0,1))' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

