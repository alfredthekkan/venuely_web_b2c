import * as React from "react"
import { Button } from "@/components/ui/button"
import { useEffect  } from "react"
import { AvailabilitySlot } from "@/lib/api"

// Helper function to format time string to 12-hour format
const formatTime12Hr = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

interface TimeSlotPickerProps {
  slots: AvailabilitySlot[]
  onSelect: (slot: AvailabilitySlot, providerId: string) => void
  disabled?: boolean,
  selectedSlot: AvailabilitySlot | null,
  providerId: string
}

export function TimeSlotPicker({ slots, onSelect, disabled, selectedSlot, providerId}: TimeSlotPickerProps) {

  const handleSelect = (slot: AvailabilitySlot) => {
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
            key={slot.start}
            variant={selectedSlot?.start === slot.start ? "default" : "outline"}
            onClick={() => handleSelect(slot)}
            disabled={disabled}
            className={
              selectedSlot?.start === slot.start
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            }
          >
            {formatTime12Hr(slot.start)}
          </Button>
        ))}
      </div>
    </div>
  )
}