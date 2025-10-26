import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { validateEmail, validatePassword } from '@/lib/validation'
import { useAuthStore } from '@/stores/authStore'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  
  const { login, isAuthenticated, loading } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from?.pathname || '/dashboard'

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && isAuthenticated()) {
      navigate('/dashboard', { replace: true })
    }
  }, [loading, isAuthenticated, navigate])

  const validateField = (name, value) => {
    let error = null
    switch (name) {
      case 'email':
        error = validateEmail(value)
        break
      case 'password':
        error = validatePassword(value)
        break
      default:
        break
    }
    return error
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setApiError('')
    
    // Mark all fields as touched
    const newTouched = { email: true, password: true }
    setTouched(newTouched)
    
    // Validate all fields
    const newErrors = {}
    newErrors.email = validateField('email', formData.email)
    newErrors.password = validateField('password', formData.password)
    
    setErrors(newErrors)
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== null)
    
    if (!hasErrors) {
      try {
        await login(formData.email, formData.password)
        navigate(from, { replace: true })
      } catch (error) {
        setApiError(error.message || 'Login failed. Please try again.')
      }
    }
    
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched({
      ...touched,
      [name]: true
    })
    
    // Validate field on blur
    const error = validateField(name, value)
    setErrors({
      ...errors,
      [name]: error
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      {loading ? (
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-black font-bold">Loading...</p>
        </div>
      ) : (
        <div className="w-full max-w-md">
        <Card className="bg-yellow-100 border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)]">
          <CardHeader className="space-y-4 text-center pb-6 pt-6 bg-yellow-100">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-orange-400 rounded-xl flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
                <Lock className="w-8 h-8 text-black" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-3xl font-bold text-black">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-black font-semibold">
                  Sign in to your account to continue
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {apiError && (
              <div className="mb-6 p-4">
                <div className="flex items-center gap-2 text-sm text-red-600 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>{apiError}</span>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6 p-4" noValidate>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-black">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 h-12 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${errors.email && touched.email ? 'border-red-500 border-4' : ''}`}
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="flex items-center gap-2 text-sm text-red-600 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-bold text-black">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 z-10" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 pr-10 h-12 bg-white border-2 border-black focus:ring-0 focus:ring-offset-0 ${errors.password && touched.password ? 'border-red-500 border-4' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black transition-colors z-10"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <div className="flex items-center gap-2 text-sm text-red-600 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-black border-2 border-black rounded focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-sm text-black font-bold">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-black hover:underline font-bold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-green-400 hover:bg-green-500 text-black border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-6 pb-6 px-6">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-black" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-yellow-100 text-black font-bold">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                className="h-12 bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 font-bold"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button
                className="h-12 bg-purple-200 hover:bg-purple-300 text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 font-bold"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>

            <p className="text-center text-sm text-black font-bold">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-black hover:underline font-bold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
        </div>
      )}
    </div>
  )
}
