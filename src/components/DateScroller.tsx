// components/BookingDateSelector.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area" // 👈 Import ScrollArea
import { getNextTwoWeeksDates } from "@/lib/dateutils" // Re-using the utility function

interface BookingDateSelectorProps {
  onDateSelect: (dateString: string) => void
  selectedDate: string | null
}

export function BookingDateSelector({ onDateSelect, selectedDate }: BookingDateSelectorProps) {
  const dates = React.useMemo(() => getNextTwoWeeksDates(), [])

  const handleSelect = (dateValue: string) => {
    onDateSelect(dateValue)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">📅 Select a Date (Next 14 Days)</h3>
      
      {/* ScrollArea for horizontal date selection */}
      <ScrollArea className="w-full whitespace-nowrap rounded-md border p-2">
        <div className="flex w-max space-x-2 p-1">
          {dates.map((dateObj) => (
            <Button
              key={dateObj.value}
              // Set minimum width for consistency
              className="h-auto w-20 flex-shrink-0 px-2 py-3" 
              variant={selectedDate === dateObj.value ? "default" : "outline"}
              onClick={() => handleSelect(dateObj.value)}
            >
              <div className="flex flex-col items-center">
                {/* Day of the week (e.g., Fri) */}
                <span className="font-bold text-sm">{dateObj.label.split(',')[0]}</span> 
                {/* Month and Day (e.g., Oct 11) */}
                <span className="text-xs">{dateObj.label.split(',')[1].trim()}</span>
              </div>
            </Button>
          ))}
        </div>
        {/* Adds a subtle scroll indicator at the bottom */}
        <ScrollBar orientation="horizontal" /> 
      </ScrollArea>
    </div>
  )
}