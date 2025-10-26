import React, { useState } from 'react'
import { Stepper } from './stepper'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { ArrowLeft, ArrowRight, CheckCircle, User, Settings, Palette, Share, Home, Mail, Phone } from 'lucide-react'

export const StepperDemo = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')

  const steps = [
    {
      id: 'profile',
      title: 'Profile Setup',
      description: 'Tell us about yourself',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-black">
            <div className="w-8 h-8 bg-pink-200 rounded-lg flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]">
              <User className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold">Create Your Profile</h3>
          </div>
          <p className="text-lg font-semibold text-gray-700">
            This is the first step where you'll set up your basic profile information.
          </p>
        </div>
      )
    },
    {
      id: 'customization',
      title: 'Customization',
      description: 'Personalize your page',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-black">
            <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]">
              <Palette className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold">Customize Your Page</h3>
          </div>
          <p className="text-lg font-semibold text-gray-700">
            Choose your theme colors and layout preferences to make your page unique.
          </p>
        </div>
      )
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure your preferences',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-black">
            <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]">
              <Settings className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold">Configure Settings</h3>
          </div>
          <p className="text-lg font-semibold text-gray-700">
            Set up your notification preferences and privacy settings.
          </p>
        </div>
      )
    },
    {
      id: 'complete',
      title: 'Complete',
      description: 'You\'re all set!',
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
            <h3 className="text-2xl font-bold">Welcome to Your New Page!</h3>
          </div>
          <p className="text-lg font-semibold text-gray-700 max-w-md mx-auto">
            Your profile is ready to go. You can now share your page with others and start building your online presence.
          </p>
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <Settings className="w-6 h-6 text-black" />
            </div>
            <CardTitle className="text-3xl font-bold text-black">Stepper Component Demo</CardTitle>
          </div>
          <CardDescription className="text-lg font-semibold text-gray-700">
            Interactive stepper component with smooth animations and multiple orientations
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          {/* Orientation Toggle */}
          <div className="flex gap-3 mb-8 justify-center">
            <Button
              variant={orientation === 'horizontal' ? 'default' : 'outline'}
              onClick={() => setOrientation('horizontal')}
              className={`flex items-center gap-2 font-bold border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none ${
                orientation === 'horizontal' 
                  ? 'bg-blue-200 hover:bg-blue-300 text-black' 
                  : 'bg-gray-200 hover:bg-gray-300 text-black'
              }`}
            >
              Horizontal
            </Button>
            <Button
              variant={orientation === 'vertical' ? 'default' : 'outline'}
              onClick={() => setOrientation('vertical')}
              className={`flex items-center gap-2 font-bold border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none ${
                orientation === 'vertical' 
                  ? 'bg-blue-200 hover:bg-blue-300 text-black' 
                  : 'bg-gray-200 hover:bg-gray-300 text-black'
              }`}
            >
              Vertical
            </Button>
          </div>

          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            orientation={orientation}
            showContent={true}
          />
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 bg-red-200 hover:bg-red-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex gap-3">
              {currentStep === steps.length - 1 ? (
                <Button className="flex items-center gap-2 bg-green-200 hover:bg-green-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-bold">
                  <CheckCircle className="h-4 w-4" />
                  Finish Setup
                </Button>
              ) : (
                <Button 
                  onClick={nextStep} 
                  className="flex items-center gap-2 bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-bold"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simple Horizontal Stepper */}
        <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black">Simple Horizontal Stepper</CardTitle>
            <CardDescription className="text-sm font-semibold text-gray-700">Without content, just step indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <Stepper
              steps={[
                { id: 'step1', title: 'Step 1', description: 'First step' },
                { id: 'step2', title: 'Step 2', description: 'Second step' },
                { id: 'step3', title: 'Step 3', description: 'Third step' },
                { id: 'step4', title: 'Step 4', description: 'Final step' }
              ]}
              currentStep={1}
              orientation="horizontal"
              showContent={false}
            />
          </CardContent>
        </Card>

        {/* Vertical Stepper */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black">Vertical Stepper</CardTitle>
            <CardDescription className="text-sm font-semibold text-gray-700">Perfect for sidebar navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <Stepper
              steps={[
                { id: 'home', title: 'Home', description: 'Dashboard overview' },
                { id: 'profile', title: 'Profile', description: 'User settings' },
                { id: 'messages', title: 'Messages', description: 'Inbox' },
                { id: 'settings', title: 'Settings', description: 'Preferences' }
              ]}
              currentStep={2}
              orientation="vertical"
              showContent={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
