"use client";
import { useState } from "react";

const allSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
];

export default function TimeSlotGrid() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3">
        {allSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelected(slot)}
            className={`
              rounded-lg border px-4 py-2 text-sm font-medium
              ${selected === slot 
                ? "bg-green-700 text-white border-green-700" 
                : "bg-white text-gray-700 border-gray-300"}
            `}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
