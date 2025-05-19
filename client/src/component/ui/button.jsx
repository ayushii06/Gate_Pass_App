import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../utils/mergeClass"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none border-foreground  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative inline-flex h-[43px]  overflow-hidden rounded-full p-[1px]  rounded-full cursor-pointer",
  {
    variants: {
      variant: {
        default: "relative block",
        secondary: "border-2 border-[#0060af] hover:bg-[#0060af] text-white hover:bg-[#0060af] px-4",
        outline: "border-2 border-[#0060af] hover:bg-[#0060af] text-white hover:bg-[#0060af] px-4",
        success:"bg-green-500 ",
        danger:"bg-red-500",
      },
      size: {
        default: "h-10",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export {Button, buttonVariants}