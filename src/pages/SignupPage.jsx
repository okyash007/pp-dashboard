import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validateUsername,
  validateTerms,
} from '@/lib/validation';
import { useAuthStore } from '@/stores/authStore';
import coolPotato from '@/assets/cool.svg?url';
import carPotato from '@/assets/car.svg?url';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [apiError, setApiError] = useState('');

  const { signup, isAuthenticated, loading } = useAuthStore();
  const navigate = useNavigate();

  const potatoMascots = [coolPotato];
  const [currentPotato, setCurrentPotato] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPotato((prev) => (prev + 1) % potatoMascots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [potatoMascots.length]);

  useEffect(() => {
    if (!loading && isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case 'firstName':
        error = validateName(value, 'First name');
        break;
      case 'lastName':
        error = validateName(value, 'Last name');
        break;
      case 'username':
        error = validateUsername(value);
        break;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError('');

    const newTouched = {
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    };
    setTouched(newTouched);

    const newErrors = {};
    newErrors.firstName = validateField('firstName', formData.firstName);
    newErrors.lastName = validateField('lastName', formData.lastName);
    newErrors.username = validateField('username', formData.username);
    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);
    newErrors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
    newErrors.terms = validateTerms(termsAccepted);

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== null);

    if (!hasErrors) {
      try {
        await signup({
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: '',
        });

        navigate('/dashboard', { replace: true });
      } catch (error) {
        setApiError(error.message || 'Signup failed. Please try again.');
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

      <div
        className='pointer-events-none absolute inset-0 opacity-40 bg-animated'
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(254,241,140,0.35) 0px, rgba(254,241,140,0.35) 12px, transparent 12px, transparent 24px), radial-gradient(circle, rgba(46,125,106,0.28) 2.5px, transparent 2.5px)',
          backgroundSize: 'auto, 20px 20px',
        }}
      />

      {loading ? (
        <div className='m-auto text-center space-y-4 relative z-10'>
          <div className='w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto'></div>
          <p className='text-black font-bold'>Loading...</p>
        </div>
      ) : (
        <div className='relative z-10 w-full flex items-center justify-center p-6 md:p-12'>
          <div className='relative w-full max-w-5xl flex items-end justify-end mr-36'>
            <div className='hidden md:block pb-2 absolute right-160'>
              <img
                src={carPotato}
                alt='Potato Pay Mascot'
                className='w-64 h-64 object-contain mascot-enter scale-150'
                style={{ filter: 'drop-shadow(6px 6px 0 rgba(0,0,0,1))' }}
              />
            </div>
            <div className='w-full max-w-xl'>
              <div className='text-left mb-6'>
                <div className='relative bg-gradient-to-br from-[#828BF8] via-[#828BF8] to-[#828BF8]/90 border-[5px] border-black p-4 pr-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
                  <div className='flex items-center gap-4 relative z-10'>
                    <div className='relative flex items-center'>
                      {/* <div className='w-20 h-20 bg-gradient-to-br from-[#FEF18C] via-[#FEF18C] to-[#FEF18C]/80 border-[5px] border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 cursor-pointer rotate-3 hover:rotate-0'> */}
                      <img
                        src={potatoMascots[currentPotato]}
                        alt='Potato Pay Mascot'
                        className='w-24 h-24'
                      />
                      {/* </div> */}
                      {/* <div className='absolute -top-2 -right-2 bg-[#AAD6B8] border-[3px] border-black px-2 py-0.5 text-[10px] font-black rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
                        FRESH
                      </div> */}
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

              <form onSubmit={handleSubmit} className='space-y-5' noValidate>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-black text-black' htmlFor='firstName'>
                      First Name
                    </label>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10' />
                      <Input
                        id='firstName'
                        name='firstName'
                        type='text'
                        placeholder='John'
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 h-11 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${
                          errors.firstName && touched.firstName ? 'border-red-500 border-4' : ''
                        }`}
                      />
                    </div>
                    {errors.firstName && touched.firstName && (
                      <div className='flex items-center gap-2 text-sm text-red-600 font-bold'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.firstName}</span>
                      </div>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-black text-black' htmlFor='lastName'>
                      Last Name
                    </label>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10' />
                      <Input
                        id='lastName'
                        name='lastName'
                        type='text'
                        placeholder='Doe'
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 h-11 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${
                          errors.lastName && touched.lastName ? 'border-red-500 border-4' : ''
                        }`}
                      />
                    </div>
                    {errors.lastName && touched.lastName && (
                      <div className='flex items-center gap-2 text-sm text-red-600 font-bold'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.lastName}</span>
                      </div>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-black text-black' htmlFor='username'>
                      Username
                    </label>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10' />
                      <Input
                        id='username'
                        name='username'
                        type='text'
                        placeholder='johndoe123'
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 h-11 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${
                          errors.username && touched.username ? 'border-red-500 border-4' : ''
                        }`}
                      />
                    </div>
                    {errors.username && touched.username && (
                      <div className='flex items-center gap-2 text-sm text-red-600 font-bold'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.username}</span>
                      </div>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-black text-black' htmlFor='email'>
                      Email Address
                    </label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10' />
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='john.doe@example.com'
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 h-11 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${
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

                  <div className='space-y-2'>
                    <label className='text-sm font-black text-black' htmlFor='password'>
                      Password
                    </label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10' />
                      <Input
                        id='password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Create a strong password'
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 pr-10 h-11 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${
                          errors.password && touched.password ? 'border-red-500 border-4' : ''
                        }`}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black transition-colors z-10'
                      >
                        {showPassword ? (
                          <EyeOff className='w-4 h-4' />
                        ) : (
                          <Eye className='w-4 h-4' />
                        )}
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
                    <label className='text-sm font-black text-black' htmlFor='confirmPassword'>
                      Confirm Password
                    </label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10' />
                      <Input
                        id='confirmPassword'
                        name='confirmPassword'
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm your password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 pr-10 h-11 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${
                          errors.confirmPassword && touched.confirmPassword
                            ? 'border-red-500 border-4'
                            : ''
                        }`}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black transition-colors z-10'
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='w-4 h-4' />
                        ) : (
                          <Eye className='w-4 h-4' />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className='flex items-center gap-2 text-sm text-red-600 font-bold'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.confirmPassword}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
                  <div className='md:col-span-2 flex items-start gap-3 bg-[#828BF8]/15 p-3 rounded-lg border-2 border-black'>
                    <Checkbox
                      id='terms'
                      checked={termsAccepted}
                      onCheckedChange={(checked) => {
                        setTermsAccepted(checked === true);
                        if (errors.terms) {
                          setErrors({
                            ...errors,
                            terms: null,
                          });
                        }
                      }}
                      className='mt-1 border-2 border-black data-[state=checked]:bg-[#FEF18C] data-[state=checked]:text-black flex-shrink-0'
                    />
                    <label
                      htmlFor='terms'
                      className='text-sm text-black font-bold cursor-pointer flex-1'
                    >
                      I agree to the{' '}
                      <a
                        href='https://potatopay.co/policy/terms-and-conditions'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-black hover:underline font-bold'
                      >
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a
                        href='https://potatopay.co/policy/privacy-policy'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-black hover:underline font-bold'
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button
                    type='submit'
                    className='md:col-span-2 w-full h-14 bg-[#828BF8] hover:bg-[#828BF8]/90 text-white border-[3px] border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    <ArrowRight className='ml-2 w-5 h-5' />
                  </Button>
                </div>

                <p className='text-center text-sm text-black font-bold mt-4'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='text-black hover:underline font-bold transition-colors'
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
