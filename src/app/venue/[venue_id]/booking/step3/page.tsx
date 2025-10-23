"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { NavigationContext } from '@/context/NavigationContext';
import { useAuth } from "@/context/AuthContext";
import { BookingContext, BookingModel } from "@/context/BookingContext";
import { BookingWidgetApi, Configuration, CreateReservationRequest, Service, Venue } from "@/lib/api";
import { useVenue } from "@/context/VenueContext";
import { start } from "repl";
import { CreateReservationOperationRequest } from "@/lib/api";

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

        // 2. Convert the ISO string back into a Date object
        const restoredDate = storableData.date
            ? new Date(storableData.date)
            : null;

        // 3. Reconstruct the BookingModel
        const bookingModel: BookingModel = {
            ...storableData,
            date: restoredDate,
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
  const { venue } = useVenue()
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
      end: bookingContext.booking?.end?.to12hrTime() ?? '',
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

    const submitBooking = async () => {
      if (!bookingContext.booking?.start || !bookingContext.booking.end || !bookingContext.booking.providerId) {
        console.log("Some required values are null")
        return
      }
      const requestParams: CreateReservationRequest = {
        venueId: venue_id ?? '',
        venueName: venueName ?? '',
        staffId: bookingContext.booking.providerId,
        serviceIds: bookingContext.booking?.services.map((s) => s.serviceId) ?? '',
        startDate: bookingContext.booking?.start,
        endDate: bookingContext.booking?.end,
        guestName: 'No name',
        guestNotes: 'No notes'
      };

      try {
        // CALL THE GENERATED FUNCTION
        const token = await user?.getIdToken(true)
        const config = new Configuration({accessToken: token ?? ''})
        const bookingApi = new BookingWidgetApi(config)
        const result = await bookingApi.createReservation({createReservationRequest: requestParams});
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
    <div className="max-w-md mx-auto mt-10">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Booking Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <span className="font-semibold">Venue:</span> {venueName}
          </div>

          <div>
            <span className="font-semibold">Date:</span> {start}
          </div>

          <div>
            <span className="font-semibold">Time:</span> {end}
          </div>

          <div>
            <span className="font-semibold">Services:</span>{" "}
            {services.map((service) => service.title).join(", ")}
          </div>

          <div>
            <span className="font-semibold">Total Cost:</span> ₹{totalCost}
          </div>

          {note && (
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Note:</span> {note}
            </div>
          )}

          {user && (
            <div className="text-sm text-gray-600">
              <span className="font-semibold">You are logged in user id: { user.uid }</span> {note}
            </div>
          )}

        </CardContent>

        <CardFooter>
        </CardFooter>
      </Card>

      {/* CTA at the bottom */}
            <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white shadow-lg max-w-lg mx-auto">
              <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700" onClick = {() => handleClick()}>Confirm Booking</Button>
            </div>
    </div>
  );
}
