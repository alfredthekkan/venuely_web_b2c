import * as React from "react"
import { Button } from "@/components/ui/button"
import { useEffect  } from "react"

interface TimeSlotPickerProps {
  slots: string[]
  onSelect: (slot: string) => void
  disabled?: boolean
}

export function TimeSlotPicker({ slots, onSelect, disabled }: TimeSlotPickerProps) {
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null)

  useEffect(() => {
    console.log("changed slots")
    setSelectedSlot(null)
  }, [slots])

  const handleSelect = (slot: string) => {
    setSelectedSlot(slot)
    onSelect(slot)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select a Time Slot</h3>
      <div className="flex flex-wrap gap-2 p-4 border rounded-lg">
        {slots.map((slot) => (
          <Button
            key={slot}
            variant={selectedSlot === slot ? "default" : "outline"}
            onClick={() => handleSelect(slot)}
            disabled={disabled}
          >
            {slot}
          </Button>
        ))}
      </div>
    </div>
  )
}