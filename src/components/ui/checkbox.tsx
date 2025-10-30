"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-0",
        className
      )}
      style={{
        borderColor: 'hsl(var(--brand-border))',
        backgroundColor: 'hsl(var(--background))',
        '--checked-bg': 'hsl(var(--brand-primary))',
        '--checked-color': 'hsl(var(--brand-primary-foreground))',
      } as React.CSSProperties}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none rounded-[4px] w-full h-full"
        style={{
          backgroundColor: 'hsl(var(--brand-primary))',
          color: 'hsl(var(--brand-primary-foreground))',
        }}
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
