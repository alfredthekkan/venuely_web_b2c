import * as React from "react"
import { Button } from "@/components/ui/button"
import { useEffect  } from "react"
import { TimeSlot } from "@/lib/api"

interface TimeSlotPickerProps {
  slots: TimeSlot[]
  onSelect: (slot: TimeSlot, providerId: string) => void
  disabled?: boolean,
  selectedSlot: TimeSlot | null,
  providerId: string
}

export function TimeSlotPicker({ slots, onSelect, disabled, selectedSlot, providerId}: TimeSlotPickerProps) {

  const handleSelect = (slot: TimeSlot) => {
    console.log("slot clicked in time slot picker")
    console.log(slot)
    console.log(providerId)
    onSelect(slot, providerId)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select a Time Slot</h3>
      <div className="flex flex-wrap gap-2 p-4 border rounded-lg">
        {slots.map((slot) => (
          <Button
            key={slot.start.toISOString()}
            variant={selectedSlot?.start.toISOString() == slot.start.toISOString() ? "default" : "outline"}
            onClick={() => handleSelect(slot)}
            disabled={disabled}
          >
            {slot.start.to12hrTime()}
          </Button>
        ))}
      </div>
    </div>
  )
}