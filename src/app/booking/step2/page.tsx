"use client";
import  DateScroller from '@/components/DateScroller';
import TimeSlotGrid from '@/components/TimeSlotGrid';
import { Button } from '@/components/ui/button';
import { useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import { BookingContext } from '@/context/BookingContext';

function TimeSlot() {
  const dates = [
  { id: "2025-10-01", label: "Thu, 1 Oct" },
  { id: "2025-10-02", label: "Fri, 2 Oct" },
  { id: "2025-10-03", label: "Sat, 3 Oct" },
  { id: "2025-10-04", label: "Sun, 4 Oct" },
];

const [selectedDate, setSelectedDate] = useState(dates[0].id);
const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
const [slots, setSlots] = useState<string[]>([]);
const router = useRouter();

const fetchSlots = async (dateId: string) => {
  // call API to fetch slots for the date
  const mockSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  setSlots(mockSlots);
};

// when date is clicked
const handleDateClick = (dateId: string) => {
  setSelectedDate(dateId);
  fetchSlots(dateId);
};

const handleSlotClick = (slot: string) => {
  setSelectedSlot(slot);
};

const handleConfirm = () => {
  router.push("/booking/step3");
}

const context = useContext(BookingContext)
  return (
    <>
    <h1>
      Selected Services : {context.booking.services}
    </h1>
    <div className="overflow-x-auto">
    <div className="flex space-x-2">
      {dates.map((date) => (
        <Button
          key={date.id}
          variant={date.id === selectedDate ? "default" : "outline"}
          onClick={() => handleDateClick(date.id)}
        >
          {date.label}
        </Button>
      ))}
    </div>
  </div>

  <div className="mt-4 grid grid-cols-3 gap-2">
  {slots.map((slot) => (
    <Button key={slot} onClick={() => handleSlotClick(slot)} variant={slot === selectedSlot ? "default" : "outline"}>{slot}</Button>
  ))}
</div>
<Button className="mt-4" disabled={!selectedSlot} onClick={handleConfirm}>Confirm {selectedSlot ? `(${selectedSlot})` : ""}</Button>
  </>
  );
}

export default TimeSlot;