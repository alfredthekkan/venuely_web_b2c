"use client";
import { TimeSlotPicker } from '@/components/TimeSlotPicker';
import { Button } from '@/components/ui/button';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { BookingContext } from '@/context/BookingContext';
import { NavigationContext } from '@/context/NavigationContext';
import { BookingDateSelector } from '@/components/DateScroller';
import { useVenue } from '@/context/VenueContext';
import { DefaultApi, SlotsGetRequest, BookableResourceAvailability, AvailabilitySlot } from '@/lib/api';
import { getNextTwoWeeksDates } from '@/lib/dateutils';
// Removed old style imports - now using CSS variables directly

// Helper function to format time string to 12-hour format
const formatTime12Hr = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

// Helper function to create DateTime from date and time string
const createDateTime = (date: Date, timeString: string): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  const [hours, minutes] = timeString.split(':').map(Number);
  
  return new Date(year, month, day, hours, minutes, 0, 0);
};

export default function TimeSlotSelector() {

  // Set navigation title
  const navContext = useContext(NavigationContext)
  const bookingContext = useContext(BookingContext)
  const { venueResponse, setVenueResponse } = useVenue()
  
  useEffect(() => {
    navContext.setTitle("Pick a Slot")
  }, [navContext.title])

  const [selectedDate, setSelectedDate] = useState<Date>(getNextTwoWeeksDates()[0].date)
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null)
  const [providerid, setProviderId] = useState<string | null>(null)
  const [isBookingLoading, setIsBookingLoading] = useState(false)
  const [slots, setSlots] = useState<string[]>([]);
  const [providers, setProviders] = useState<BookableResourceAvailability[]>([])
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
    const venue_id = venueResponse?.venue?.id ?? ''
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
    const requestParams: SlotsGetRequest = {
      venueId: venue_id,
      serviceIds: services.map((service) => service.id ?? ''),
      date: date
    }

    try {
      // CALL THE GENERATED FUNCTION
      const api = new DefaultApi()
      const result = await api.slotsGet(requestParams);
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
        console.log("Selected date:", selectedDate)
        console.log("Selected slot:", selectedSlot)
        
        // Convert time strings to Date objects using helper function
        const startDateTime = createDateTime(selectedDate, selectedSlot.start);
        const endDateTime = createDateTime(selectedDate, selectedSlot.end);
        
        console.log("Start DateTime:", startDateTime)
        console.log("End DateTime:", endDateTime)
        console.log("Start DateTime valid:", !isNaN(startDateTime.getTime()))
        console.log("End DateTime valid:", !isNaN(endDateTime.getTime()))
        
        const updatedBooking = {...bookingContext.booking, providerId: providerid, start: startDateTime, end: endDateTime}
        console.log("Updated booking:", updatedBooking)
        bookingContext.setBooking(updatedBooking)
      }else {
        console.log("booking context is empty")
      }
      router.push(`/venue/${bookingContext.booking?.venue_id}/booking/step3`)
    }
  }

  const handleTimeSlotSelection = (slot: AvailabilitySlot, providerId: string) => {
    setSelectedSlot(slot)
    console.log(`selected provider id is : ${providerId}`)
    setProviderId(providerId)
  }

  return (
    <div className="min-h-screen flex flex-col justify-start p-4 pb-20 pt-8" style={{
      backgroundColor: 'hsl(var(--brand-background))'
    }}>
      <div className="border shadow-xl backdrop-blur-sm rounded-lg space-y-8 mx-4 p-6 mt-4" style={{
        backgroundColor: 'hsl(var(--background))',
        borderColor: 'hsl(var(--brand-border))'
      }}>
        
        {/* 1. Date Selection */}
        <BookingDateSelector 
          onDateSelect={handleDateSelect} 
          selectedDate={selectedDate}
        />

        <hr className="my-6 border-t" style={{ borderColor: 'hsl(var(--muted))' }} />

        {/* 2. Time Slot Selection */}
        {/* TimeSlotPicker needs to be defined - you can use the one from the previous response */}
        {providers.length > 0 && 

          providers.map((provider) => {

            const timeSlots = provider.slots ?? []
            return <div key={provider.providerId}>
            <h1 className='font-semibold mt-2 mb-2 text-2xl' style={{ color: 'hsl(var(--foreground))' }}>{provider.providerName}</h1>
            <TimeSlotPicker 
              slots={timeSlots} 
              onSelect={handleTimeSlotSelection} 
              // Disable time selection until a date is chosen
              disabled={!selectedDate} 
              selectedSlot={selectedSlot}
              providerId={provider.providerId ?? ''}     
            />
          </div>
          }
          )
        }
        
        <hr className="my-6 border-t" style={{ borderColor: 'hsl(var(--muted))' }} />
      </div>

      {/* 3. Confirmation Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-lg mx-auto" style={{
        backgroundColor: 'hsl(var(--brand-background))'
      }}>
        <Button 
          onClick={handleBooking} 
          disabled={!isBookingComplete || isBookingLoading} 
          className="font-semibold shadow-lg transition-colors duration-200 w-full h-12 text-lg"
          style={{
            backgroundColor: 'hsl(var(--brand-button-primary))',
            color: 'hsl(var(--brand-button-primary-foreground))'
          }}
        >
          Confirm {selectedSlot && `${formatTime12Hr(selectedSlot.start)} - ${formatTime12Hr(selectedSlot.end)}`}
        </Button>
      </div>
      
    </div>
  )
}