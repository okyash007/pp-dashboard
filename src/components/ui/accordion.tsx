import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  openItems: Set<string>
  toggleItem: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

function Accordion({ 
  className, 
  children,
  type = "single",
  ...props 
}: React.ComponentProps<"div"> & { type?: "single" | "multiple" }) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set())

  const toggleItem = React.useCallback((value: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(value)) {
        newSet.delete(value)
      } else {
        if (type === "single") {
          newSet.clear()
        }
        newSet.add(value)
      }
      return newSet
    })
  }, [type])

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps extends React.ComponentProps<"div"> {
  value: string
}

function AccordionItem({ className, value, children, ...props }: AccordionItemProps) {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("AccordionItem must be used within Accordion")
  }

  const isOpen = context.openItems.has(value)

  return (
    <div
      className={cn("border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-200", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface AccordionTriggerProps extends React.ComponentProps<"button"> {
  value: string
}

function AccordionTrigger({ className, value, children, ...props }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("AccordionTrigger must be used within Accordion")
  }

  const isOpen = context.openItems.has(value)

  return (
    <button
      type="button"
      onClick={() => context.toggleItem(value)}
      className={cn(
        "w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-[#FEF18C]/15 hover:to-transparent transition-all duration-200 group text-left",
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      <ChevronDown
        className={cn(
          "w-5 h-5 text-black transition-transform duration-200 flex-shrink-0 ml-3",
          isOpen && "transform rotate-180"
        )}
      />
    </button>
  )
}

function AccordionContent({ 
  className, 
  value, 
  children, 
  ...props 
}: React.ComponentProps<"div"> & { value: string }) {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("AccordionContent must be used within Accordion")
  }

  const isOpen = context.openItems.has(value)

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
        className
      )}
      {...props}
    >
      <div className="px-5 pb-5 pt-0">
        {children}
      </div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

