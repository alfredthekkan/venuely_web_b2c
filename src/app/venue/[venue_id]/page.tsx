"use client";
import { Usable, useContext, useEffect, useState } from 'react'
import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import Link from 'next/link'
import { BookingContext } from '@/context/BookingContext'
import { BookingWidgetApi } from "@/lib/api/apis/BookingWidgetApi";
import { Venue } from '@/lib/api/models/Venue';
import { GetVenueDetailsRequest } from '@/lib/api/apis/BookingWidgetApi';
import NewBooking from '@/app/page';
import { useVenue } from '@/context/VenueContext';

export default function VenueHomePage( { params }: { params: Promise<{venue_id : string}>}) {
  const { venue_id } = React.use(params);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const  venueContext = useVenue()
  

  useEffect(() => {
    // Check if the required parameter is available
    if (!venue_id) return;

    const fetchVenue = async () => {
      setIsLoading(true);
      setError(null);

      // Construct the request parameters object
      const requestParams: GetVenueDetailsRequest = {
        venueId: venue_id // Matches the parameter defined in your OpenAPI YAML
      };

      try {
        // CALL THE GENERATED FUNCTION
        const bookingApi = new BookingWidgetApi()
        const result = await bookingApi.getVenueDetails(requestParams);
        
        // The result is correctly typed as 'Venue'
        venueContext?.setVenue(result)
        console.log('successfully fetched venue!')
      } catch (err) {
        // Handle any network or API-specific errors
        console.error('Failed to fetch venue:', err);
        setError('Could not load venue data. Please try again.');
        venueContext?.setVenue(null)
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
    
    // Rerun the effect whenever the venueId prop changes
  }, [venue_id]); 

  return (
    <div className="relative flex flex-col h-screen max-w-xs">
      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="pb-24"> {/* leave space for floating button */}
          {/* Hero Image */}
          {venueContext?.venue?.thumbNailUrl && <div className="w-full h-56 sm:h-72 md:h-96 relative">
            <Image
              src={venueContext.venue?.thumbNailUrl ?? ''}
              alt={venueContext.venue?.title ?? ''}
              fill
              className="object-cover rounded-b-2xl"
              priority
            />
          </div>}

          {/* Venue Info */}
          <div className="px-5 py-4">
            <h1 className="text-2xl font-bold">{venueContext?.venue?.title}</h1>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {venueContext?.venue?.description}
            </p>

            <div className="mt-4">
            <Link href={`/venue/${venue_id}/services`}>
              <Button
                variant="outline"
              >
                View All Services
              </Button>
              </Link>
            </div>
          </div>

          <Separator className="my-3" />

          {/* Contact Info */}
          <Card className="mx-5 mt-3 mb-6">
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-1">Contact</h2>
              <p className="text-muted-foreground">{venueContext?.venue?.phoneNumber}</p>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Floating "Book Now" Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t flex justify-center max-w-xs">
      <Link href={`/venue/${venue_id}/booking/step1`}>
        <Button
          size="lg"
          className="w-full max-w-sm text-lg font-semibold"
        >
          Book Now
        </Button>
        </Link>
      </div>
    </div>
  )
}
