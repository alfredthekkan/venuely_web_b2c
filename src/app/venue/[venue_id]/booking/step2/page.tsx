"use client";
import { TimeSlotPicker } from '@/components/TimeSlotPicker';
import { Button } from '@/components/ui/button';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { BookingContext } from '@/context/BookingContext';
import { NavigationContext } from '@/context/NavigationContext';
import { BookingDateSelector } from '@/components/DateScroller';
import { useVenue } from '@/context/VenueContext';
import { BookingWidgetApi, GetAvailableSlotsRequest, TimeSlot, TimeSlotProvider } from '@/lib/api';
import { date } from 'zod';
import { time } from 'console';
import { getNextTwoWeeksDates } from '@/lib/dateutils';
import { start } from 'repl';
export default function TimeSlotSelector() {

  // Set navigation title
  const navContext = useContext(NavigationContext)
  const bookingContext = useContext(BookingContext)
  const { venue, setVenue } = useVenue()
  
  useEffect(() => {
    navContext.setTitle("Pick a Slot")
  }, [navContext.title])

  const [selectedDate, setSelectedDate] = useState<Date>(getNextTwoWeeksDates()[0].date)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [providerid, setProviderId] = useState<string | null>(null)
  const [isBookingLoading, setIsBookingLoading] = useState(false)
  const [slots, setSlots] = useState<string[]>([]);
  const [providers, setProviders] = useState<TimeSlotProvider[]>([])
  const isBookingComplete = !!selectedDate && !!selectedSlot // Ensure both are non-null strings

  useEffect(() => {
    fetchSlots()
  }, [selectedDate])

  //respond to date change
  // Reset time slot when a new date is selected
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot(null) 
    fetchSlots()
  }

  const router = useRouter()

  const fetchSlots = async () => {
    const venue_id = venue?.venueId ?? ''
    const services = bookingContext.booking?.services ?? []
    const date = selectedDate
    setProviders([])

    if (services.length == 0) {
      console.log("No services selected!")
    }else {
      const ids = services.map((service) => service.title ?? '')
      console.log("Selected services are")
      console.log(ids.join(', '))
    }

    //construct the request param object
    const requestParams: GetAvailableSlotsRequest = {
      venueId: venue_id,
      serviceIds: services.map((service) => service.serviceId ?? ''),
      date: date
    }

    try {
      // CALL THE GENERATED FUNCTION
      const bookingApi = new BookingWidgetApi()
      const result = await bookingApi.getAvailableSlots(requestParams);
      setProviders(result)
    }catch (err) {
      // Handle any network or API-specific errors
      console.error('Failed to fetch slots:', err);
    }
  };

  const handleBooking = () => {
    if (isBookingComplete) {

      if (bookingContext.booking) {
        console.log("Booking context found! Setting selected date and time.")
        const updatedBooking = {...bookingContext.booking, providerId: providerid, start: selectedSlot.start, end: selectedSlot.end}
        console.log(updatedBooking)
        bookingContext.setBooking(updatedBooking)
      }else {
        console.log("booking context is empty")
      }
      router.push(`/venue/${bookingContext.booking?.venue_id}/booking/step3`)
    }
  }

  const handleTimeSlotSelection = (slot: TimeSlot, providerId: string) => {
    setSelectedSlot(slot)
    console.log(`selected provider id is : ${providerId}`)
    setProviderId(providerId)
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
      {providers.length > 0 && 

        providers.map((provider) => {

          const timeSlots = provider.slots ?? []
          return <div key={provider.providerId}>
          <h1 className='font-semibold mt-2 mb-2 text-2xl'>{provider.providerName}</h1>
          <TimeSlotPicker 
            slots={timeSlots} 
            onSelect={handleTimeSlotSelection} 
            // Disable time selection until a date is chosen
            disabled={!selectedDate} 
            selectedSlot={selectedSlot}
            providerId={provider.providerId}     
          />
        </div>
        }
        )
      }
      
      <hr className="my-6 border-t border-muted" />

      {/* 3. Confirmation Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white shadow-lg max-w-lg mx-auto">
        <Button 
          onClick={handleBooking} 
          disabled={!isBookingComplete || isBookingLoading} 
          className="w-full h-12 text-lg  bg-emerald-600 hover:bg-emerald-700"
        >
          Confirm {selectedSlot && selectedSlot.start.to12hrTime()}
        </Button>
      </div>
      
    </div>
  )
}