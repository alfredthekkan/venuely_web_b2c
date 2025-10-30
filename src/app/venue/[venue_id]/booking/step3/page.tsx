"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useContext, useState } from "react";
import { NavigationContext } from '@/context/NavigationContext';
import { useAuth } from "@/context/AuthContext";
import { BookingContext, BookingModel } from "@/context/BookingContext";
import { DefaultApi, Configuration, CreateReservationRequest, Service, ReservationPostRequest } from "@/lib/api";
import { useVenue } from "@/context/VenueContext";
import { MapPin, Calendar, Clock, Scissors, DollarSign, FileText, User, MessageSquare } from "lucide-react";
// Removed old style imports - now using CSS variables directly

type SummaryProps = {
  venueName?: string;
  start: string;
  end?: string;
  services: Service[];
  totalCost: number;
  note: string;
};

function saveBookingModel(bookingData: BookingModel) {
    if (!window.sessionStorage) return;

    // 1. Create a storable version of the object
    const storableData = {
        ...bookingData,
        // 2. Convert the Date object to an ISO string for storage
        start: bookingData.start instanceof Date ? bookingData.start.toISOString() : null,
        end: bookingData.end instanceof Date ? bookingData.end.toISOString() : null,
    };

    try {
        // 3. Serialize the storable object to a JSON string
        sessionStorage.setItem('pendingBookingModel', JSON.stringify(storableData));
        console.log("Booking data saved to sessionStorage.");
    } catch (e) {
        console.error("Error saving booking data:", e);
    }
}

function retrieveBookingModel(): BookingModel | null {
    if (!window.sessionStorage) return null;

    const savedData = sessionStorage.getItem('pendingBookingModel');
    if (!savedData) return null;

    try {
        // 1. Parse the JSON string back into a storable object
        const storableData = JSON.parse(savedData);

        // 2. Convert the ISO strings back into Date objects
        const restoredStartDate = storableData.start
            ? new Date(storableData.start)
            : null;
        const restoredEndDate = storableData.end
            ? new Date(storableData.end)
            : null;

        // 3. Reconstruct the BookingModel
        const bookingModel: BookingModel = {
            ...storableData,
            start: restoredStartDate,
            end: restoredEndDate,
        };

        // Optional: Clear the storage immediately after retrieval if it's a one-time load
        sessionStorage.removeItem('pendingBookingModel'); 

        console.log("Booking data retrieved from sessionStorage.");
        return bookingModel;

    } catch (e) {
        console.error("Error retrieving or parsing booking data:", e);
        return null;
    }
}

export default function Summary() {
  const navContext = useContext(NavigationContext)
  const bookingContext = useContext(BookingContext)
  const { venueResponse } = useVenue()
  useEffect(() => {
    navContext.setTitle("Summary")
  }, [navContext.title])

  // In your BookingContextProvider component
React.useEffect(() => {
    const pendingBooking = retrieveBookingModel()
    console.log("effect to check pending data called")
    if (pendingBooking) {
        // 1. Update your context state with the restored data
        bookingContext.setBooking(pendingBooking)
    }else {
      console.log("Nothing pending")
    }
}, []); // Run only once on mount}

console.log('start value:', bookingContext.booking?.start);    
  const summary = {
      venueName: bookingContext.booking?.venue_name,
      start: bookingContext.booking?.start?.toDateString() ?? '',
      end: bookingContext.booking?.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) ?? '',
      services: bookingContext.booking?.services ?? [],
      totalCost: bookingContext.booking?.services.reduce((prev, curr, index, arr) => {
        return prev + (curr.amount ?? 0)
      }, 0) ?? 0,
      note: 'Be on time'
  }
  return BookingSummary(
      summary
  )
}

function BookingSummary({
  venueName,
  start,
  end,
  services,
  totalCost,
  note,
}: SummaryProps) {

    const router = useRouter();
    const { user } = useAuth()
    const bookingContext = useContext(BookingContext);
    const venue_id = bookingContext.booking?.venue_id
    const [specialNotes, setSpecialNotes] = useState('')

    const submitBooking = async () => {
      if (!bookingContext.booking?.start || !bookingContext.booking.end || !bookingContext.booking.providerId) {
        console.log("Some required values are null")
        return
      }
      const requestParams: CreateReservationRequest = {
        venueId: venue_id ?? '',
        staffId: bookingContext.booking.providerId,
        bookingResourceName: 'Default Resource',
        serviceIds: bookingContext.booking?.services.map((s) => s.id ?? '') ?? [],
        startDate: bookingContext.booking?.start,
        endDate: bookingContext.booking?.end,
        guestName: user?.displayName ?? 'Guest',
        guestNotes: specialNotes || 'No special notes'
      };

      try {
        // CALL THE GENERATED FUNCTION
        const token = await user?.getIdToken(true)
        const config = new Configuration({accessToken: token ?? ''})
        const bookingApi = new DefaultApi(config)
        const reservationRequest: ReservationPostRequest = { createReservationRequest: requestParams }
        const result = await bookingApi.reservationPost(reservationRequest);
        console.log("successfully created reservation")
        router.push(`/venue/${venue_id}/booking/step4`);
      } catch (err) {
        console.log(err)
      }
    }

    const handleClick =  async () => {
      console.log("clicked confirm")
        if (user) {
          await submitBooking()
        }else {
          console.log("No user found! Hence routing to login with redirect")
          const booking = bookingContext.booking
          if (bookingContext.booking) 
            saveBookingModel(bookingContext.booking)
          router.push(`/login?redirect=/venue/${venue_id}/booking/step3`)
        }
    }

  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-start p-4 pb-20 pt-8 relative" style={{
      backgroundColor: 'hsl(var(--brand-background))'
    }}>
      <div className="flex justify-center px-4 mt-10">
        <Card className="border shadow-xl backdrop-blur-sm rounded-lg p-6 w-full min-w-96 max-w-md" style={{
          backgroundColor: 'hsl(var(--brand-background))',
          borderColor: 'hsl(var(--brand-border))'
        }}>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center" style={{ color: 'hsl(var(--foreground))' }}>
              Booking Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3" style={{ color: 'hsl(var(--foreground))' }}>
              <MapPin className="h-5 w-5" style={{ color: 'hsl(var(--brand-primary))' }} />
              <div>
                <span className="font-semibold">Venue:</span> {venueName}
              </div>
            </div>

            <div className="flex items-center space-x-3" style={{ color: 'hsl(var(--foreground))' }}>
              <Calendar className="h-5 w-5" style={{ color: 'hsl(var(--brand-primary))' }} />
              <div>
                <span className="font-semibold">Date:</span> {start}
              </div>
            </div>

            <div className="flex items-center space-x-3" style={{ color: 'hsl(var(--foreground))' }}>
              <Clock className="h-5 w-5" style={{ color: 'hsl(var(--brand-primary))' }} />
              <div>
                <span className="font-semibold">Time:</span> {end}
              </div>
            </div>

            <div className="flex items-start space-x-3" style={{ color: 'hsl(var(--foreground))' }}>
              <Scissors className="h-5 w-5 mt-0.5" style={{ color: 'hsl(var(--brand-primary))' }} />
              <div>
                <span className="font-semibold">Services:</span>{" "}
                {services.map((service) => service.title).join(", ")}
              </div>
            </div>

            <div className="flex items-center space-x-3" style={{ color: 'hsl(var(--foreground))' }}>
              <DollarSign className="h-5 w-5" style={{ color: 'hsl(var(--brand-primary))' }} />
              <div>
                <span className="font-semibold">Total Cost:</span> ₹{totalCost}
              </div>
            </div>

            {note && (
              <div className="flex items-start space-x-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <FileText className="h-4 w-4 mt-0.5" style={{ color: 'hsl(var(--brand-primary))' }} />
                <div>
                  <span className="font-semibold">Note:</span> {specialNotes}
                </div>
              </div>
            )}

            {user && (
              <div className="flex items-start space-x-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <User className="h-4 w-4 mt-0.5" style={{ color: 'hsl(var(--brand-primary))' }} />
                <div>
                  <span className="font-semibold">Booking for:</span> {user?.displayName || 'Guest'}
                </div>
              </div>
            )}

          </CardContent>

          <CardFooter>
          </CardFooter>
        </Card>
      </div>

      {/* Special Notes Section */}
      <div className="flex justify-center px-4 mt-6">
        <Card className="border shadow-xl backdrop-blur-sm rounded-lg p-6 w-full min-w-96 max-w-md" style={{
          backgroundColor: 'hsl(var(--brand-background))',
          borderColor: 'hsl(var(--brand-border))'
        }}>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3" style={{ color: 'hsl(var(--foreground))' }}>
              <MessageSquare className="h-5 w-5" style={{ color: 'hsl(var(--brand-primary))' }} />
              <Label htmlFor="special-notes" className="font-semibold">
                Special Notes (Optional)
              </Label>
            </div>
            <Input
              id="special-notes"
              type="text"
              placeholder="e.g., prefer window seat, no music, etc."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full"
              style={{
                backgroundColor: 'hsl(var(--brand-background))',
                borderColor: 'hsl(var(--brand-border))',
                color: 'hsl(var(--foreground))'
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* CTA at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-lg mx-auto z-10" style={{
        backgroundColor: 'hsl(var(--brand-background))'
      }}>
        <Button 
          className="font-semibold shadow-lg transition-colors duration-200 w-full h-12"
          style={{
            backgroundColor: 'hsl(var(--brand-button-primary))',
            color: 'hsl(var(--brand-button-primary-foreground))'
          }}
          onClick={() => handleClick()}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
