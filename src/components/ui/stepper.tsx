import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
  description?: string
  content?: React.ReactNode
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepChange?: (step: number) => void
  className?: string
  orientation?: "horizontal" | "vertical"
  showContent?: boolean
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ 
    steps, 
    currentStep, 
    onStepChange, 
    className, 
    orientation = "horizontal",
    showContent = true,
    ...props 
  }, ref) => {
    const isHorizontal = orientation === "horizontal"
    
    // Color schemes for each step (matching dashboard theme)
    const getStepColors = (index: number) => {
      const colors = [
        { bg: "bg-pink-200", hover: "hover:bg-pink-300", active: "bg-pink-300", border: "border-pink-400" },
        { bg: "bg-green-200", hover: "hover:bg-green-300", active: "bg-green-300", border: "border-green-400" },
        { bg: "bg-purple-200", hover: "hover:bg-purple-300", active: "bg-purple-300", border: "border-purple-400" },
        { bg: "bg-blue-200", hover: "hover:bg-blue-300", active: "bg-blue-300", border: "border-blue-400" },
        { bg: "bg-orange-200", hover: "hover:bg-orange-300", active: "bg-orange-300", border: "border-orange-400" },
        { bg: "bg-red-200", hover: "hover:bg-red-300", active: "bg-red-300", border: "border-red-400" },
        { bg: "bg-yellow-200", hover: "hover:bg-yellow-300", active: "bg-yellow-300", border: "border-yellow-400" },
      ]
      return colors[index % colors.length]
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          isHorizontal ? "space-y-8" : "space-y-6",
          className
        )}
        {...props}
      >
        {/* Step indicators */}
        <div
          className={cn(
            "flex",
            isHorizontal ? "flex-row items-center justify-between" : "flex-col space-y-6"
          )}
        >
          {steps.map((step, index) => {
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            const isClickable = onStepChange && (isCompleted || isActive)
            const colors = getStepColors(index)
            
            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center relative",
                  isHorizontal ? "flex-col space-y-3" : "flex-row space-x-4"
                )}
              >
                {/* Step circle */}
                <div
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black transition-all duration-300 ease-in-out font-bold text-black",
                    isCompleted && `${colors.active} shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]`,
                    isActive && !isCompleted && `${colors.active} shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]`,
                    !isActive && !isCompleted && `${colors.bg} shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]`,
                    isClickable && "cursor-pointer hover:scale-105 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                  )}
                  onClick={() => isClickable && onStepChange?.(index)}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6 animate-in zoom-in-50 duration-200" />
                  ) : (
                    <span className="text-lg font-bold">{index + 1}</span>
                  )}
                  
                  {/* Ripple effect for active step */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-black/10 animate-ping" />
                  )}
                </div>
                
                {/* Step content */}
                <div className={cn(
                  "text-center transition-all duration-300 ease-in-out",
                  isHorizontal ? "min-w-0 flex-1" : "flex-1"
                )}>
                  <div
                    className={cn(
                      "text-sm font-bold transition-colors duration-200",
                      isActive && "text-black",
                      isCompleted && "text-black",
                      !isActive && !isCompleted && "text-gray-600"
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        "text-xs font-semibold transition-colors duration-200 mt-1",
                        isActive && "text-black/80",
                        isCompleted && "text-black/70",
                        !isActive && !isCompleted && "text-gray-500"
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
                
              </div>
            )
          })}
        </div>
        
        {/* Step content */}
        {showContent && steps[currentStep]?.content && (
          <div className="mt-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
            <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
              {steps[currentStep].content}
            </div>
          </div>
        )}
      </div>
    )
  }
)

Stepper.displayName = "Stepper"

export { Stepper, type Step, type StepperProps }
