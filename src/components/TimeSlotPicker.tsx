import * as React from "react"
import { Button } from "@/components/ui/button"
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
      <div className="flex flex-wrap gap-2 p-4 border rounded-lg" style={{ 
        borderColor: 'hsl(var(--brand-border))',
        backgroundColor: 'hsl(var(--background))'
      }}>
        {slots.map((slot) => (
          <Button
            key={slot.start}
            variant={selectedSlot?.start === slot.start ? "default" : "outline"}
            onClick={() => handleSelect(slot)}
            disabled={disabled}
            className="font-semibold transition-all duration-200"
            style={
              selectedSlot?.start === slot.start
                ? {
                    backgroundColor: 'hsl(var(--brand-primary))',
                    color: 'hsl(var(--brand-primary-foreground))',
                    borderColor: 'hsl(var(--brand-border))',
                    boxShadow: '0 0 0 2px hsl(var(--brand-ring))'
                  }
                : {
                    borderColor: 'hsl(var(--brand-border))',
                    color: 'hsl(var(--brand-primary))',
                    backgroundColor: 'transparent'
                  }
            }
          >
            {formatTime12Hr(slot.start)}
          </Button>
        ))}
      </div>
    </div>
  )
}