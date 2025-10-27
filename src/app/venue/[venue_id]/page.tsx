"use client";
import { useContext, useEffect, useState } from 'react'
import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { SafeImage } from '@/components/ui/safe-image';
import Link from 'next/link'
import { DefaultApi, VenueGetRequest } from '@/lib/api/apis/DefaultApi';
import { VenueGetResponse } from '@/lib/api/models/VenueGetResponse';
import { useVenue } from '@/context/VenueContext';
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

interface BookingHomeProps {
  title: string;
  image: string;
  description: string;
  venue_id: string;
}

export function BookingHome({
  title,
  image,
  description,
  venue_id,
}: BookingHomeProps) {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleBooking = () => {
    if (!termsAccepted) return;
    router.push(`/venue/${venue_id}/booking/step1`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-emerald-500 p-4">
      <Card className="max-w-md w-full shadow-lg border-none bg-white/90 backdrop-blur-md">
        <CardContent className="flex flex-col items-center text-center space-y-6 p-6">
          <SafeImage
              src={image || ""}
              alt={title}
              width={300}
              height={150}
              className="rounded-xl object-cover shadow-sm"
          />
          <h1 className="text-2xl font-semibold text-gray-800">{`Welcome to ${title}`}</h1>
          <p className="text-gray-600 text-sm">{description}</p>

          <div className="w-full space-y-3">
            <Button
              onClick={handleBooking}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!termsAccepted}
            >
              Start Booking
            </Button>

            {/* Terms checkbox — optional but UX-friendly */}
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <Checkbox
                id="terms"
                className='data-[state=checked]:bg-emerald-500'
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(!!checked)}
              />
              <label htmlFor="terms" className="leading-tight">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-emerald-700 hover:underline font-medium"
                  target="_blank"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function HomePage( { params }: { params: Promise<{venue_id : string}>}) {
  const { venue_id } = React.use(params);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const  venueContext = useVenue()
  
  useEffect(() => {
     // Add this debugging BEFORE the fetchVenue function
    console.log('VenueContext Debug:', {
      contextExists: !!venueContext,
      contextValue: venueContext,
      contextKeys: venueContext ? Object.keys(venueContext) : [],
      setVenueResponseType: typeof venueContext?.setVenueResponse,
    });
  
    // Check if the required parameter is available
    if (!venue_id) return;

    const fetchVenue = async () => {
      setIsLoading(true);
      setError(null);

      // Construct the request parameters object
      const requestParams: VenueGetRequest = {
        venueId: venue_id // Matches the parameter defined in your OpenAPI YAML
      };

      try {
        // CALL THE GENERATED FUNCTION
        const api = new DefaultApi()
        console.log('Making API call with params:', requestParams);
        const result = await api.venueGet(requestParams);
        
        console.log('API response:', result);
        // The result is correctly typed as 'VenueGetResponse'  
        venueContext?.setVenueResponse(result);
        console.log('successfully fetched venue!')
      } catch (err) {
        // Handle any network or API-specific errors
        console.error('Failed to fetch venue - detailed error:', {
          error: err,
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : undefined
        });
        setError('Could not load venue data. Please try again.');
        venueContext?.setVenueResponse(null)
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
    
    // Rerun the effect whenever the venueId prop changes
  }, [venue_id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-emerald-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-700">Loading venue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-emerald-500 p-4">
        <Card className="max-w-md w-full shadow-lg border-none bg-white/90 backdrop-blur-md">
          <CardContent className="flex flex-col items-center text-center space-y-6 p-6">
            <div className="text-red-500 text-lg">⚠️</div>
            <h1 className="text-xl font-semibold text-gray-800">Unable to load venue</h1>
            <p className="text-gray-600 text-sm">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <BookingHome
      title={venueContext.venueResponse?.venue?.contactDetails?.name ?? ''}
      image={venueContext.venueResponse?.venue?.thumbnail ?? 'https://firebasestorage.googleapis.com:443/v0/b/venuely-staging.firebasestorage.app/o/venues%2FG8zjL37Xj53pwrNFbAFv%2FFE903BD1-6AA4-419A-B4B5-6E56B870E178.jpg?alt=media&token=375bd021-5783-40ab-995e-100b7d7823d9'}
      description={venueContext.venueResponse?.venue?.description ?? ''}
      venue_id={venue_id}
    />
  );
}


export function VenueHomePage( { params }: { params: Promise<{venue_id : string}>}) {
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
      const requestParams: VenueGetRequest = {
        venueId: venue_id // Matches the parameter defined in your OpenAPI YAML
      };

      try {
        // CALL THE GENERATED FUNCTION
        const api = new DefaultApi()
        console.log('VenueHomePage - Making API call with params:', requestParams);
        const result = await api.venueGet(requestParams);
        
        console.log('VenueHomePage - API response:', result);
        // The result is correctly typed as 'VenueGetResponse'
        venueContext?.setVenueResponse(result)
        console.log('VenueHomePage - successfully fetched venue!')
      } catch (err) {
        // Handle any network or API-specific errors
        console.error('VenueHomePage - Failed to fetch venue - detailed error:', {
          error: err,
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : undefined
        });
        setError('Could not load venue data. Please try again.');
        venueContext?.setVenueResponse(null)
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
          {venueContext?.venueResponse?.venue?.thumbnail && <div className="w-full h-56 sm:h-72 md:h-96 relative">
            <Image
              src={venueContext.venueResponse?.venue?.thumbnail ?? ''}
              alt={venueContext.venueResponse?.venue?.contactDetails?.name ?? ''}
              fill
              className="object-cover rounded-b-2xl"
              priority
            />
          </div>}

          {/* Venue Info */}
          <div className="px-5 py-4">
            <h1 className="text-2xl font-bold">{venueContext?.venueResponse?.venue?.contactDetails?.name}</h1>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {venueContext?.venueResponse?.venue?.description}
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
              <p className="text-muted-foreground">{venueContext?.venueResponse?.venue?.contactDetails?.phone?.number}</p>
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
