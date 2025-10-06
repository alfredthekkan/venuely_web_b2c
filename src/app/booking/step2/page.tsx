"use client";
import { TimeSlotPicker } from '@/components/TimeSlotPicker';
import { Button } from '@/components/ui/button';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { BookingContext } from '@/context/BookingContext';
import { NavigationContext } from '@/context/NavigationContext';
import { BookingDateSelector } from '@/components/DateScroller';
import { DefaultService, OpenAPI } from "@/lib/api";

export default function TimeSlotSelector() {

  // Set navigation title
  const navContext = useContext(NavigationContext)
  const bookingContext = useContext(BookingContext)

  useEffect(() => {
    navContext.setTitle("Pick a Slot")
  }, [navContext.title])

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isBookingLoading, setIsBookingLoading] = useState(false)
  const [slots, setSlots] = useState<string[]>([]);
  const isBookingComplete = !!selectedDate && !!selectedTime // Ensure both are non-null strings

  useEffect(() => {
    fetchSlots()
  }, [selectedDate])

  //respond to date change
  // Reset time slot when a new date is selected
  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null) 
    fetchSlots()
  }

  const fetchSlots = async () => {

    OpenAPI.BASE = "https://2bfdc92c-3826-4fe5-847d-bd37d96b59ec.mock.pstmn.io/";
    const requestBody = { date: selectedDate ? selectedDate : "", serviceIds: bookingContext.booking.services };
    
    // call API to fetch slots for the date
    const slots = await DefaultService.postBookingsSlots(requestBody);
    console.log("Available slots:", slots);
    setSlots(slots);
  };

  const handleBooking = () => {
    if (isBookingComplete) {
      setIsBookingLoading(true)
      console.log(`Booking request for: Date ${selectedDate}, Time ${selectedTime}`)
      
      // *** Booking Logic (Simulated) ***
      setTimeout(() => {
        alert(`Booking Confirmed! Date: ${selectedDate}, Time: ${selectedTime}`)
        setIsBookingLoading(false)
      }, 1500);
      // *********************************
    }
  }

  return (
    <div className="space-y-8 max-w-lg mx-auto p-6 bg-background shadow-2xl rounded-xl border mt-4">
      
      {/* 1. Date Selection */}
      <BookingDateSelector 
        onDateSelect={handleDateSelect} 
        selectedDate={selectedDate}
      />

      <hr className="my-6 border-t border-muted" />

      {/* 2. Time Slot Selection */}
      {/* TimeSlotPicker needs to be defined - you can use the one from the previous response */}
      <TimeSlotPicker 
        slots={slots} 
        onSelect={setSelectedTime} 
        // Disable time selection until a date is chosen
        disabled={!selectedDate}
      />
      
      <hr className="my-6 border-t border-muted" />

      {/* 3. Confirmation Button */}
      <Button 
        onClick={handleBooking} 
        disabled={!isBookingComplete || isBookingLoading} 
        className="w-full h-12 text-lg"
      >
        {isBookingLoading ? "Processing..." : `Book for ${selectedTime || 'a Time'}`}
      </Button>
    </div>
  )
}