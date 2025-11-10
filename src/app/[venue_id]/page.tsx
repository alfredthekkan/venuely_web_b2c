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
import { VenueGetRequest } from '@/lib/api/apis/WidgetApi';
import { VenueGetResponse } from '@/lib/api/models/VenueGetResponse';
import { createApiClient, getCurrentApiUrl, logApiEnvironment } from '@/lib/api-config';
import { useVenue } from '@/context/VenueContext';
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { NavigationContext } from '@/context/NavigationContext';
// Removed old style imports - now using CSS variables directly

interface BookingHomeProps {
  title: string;
  image: string;
  description: string;
  venue_id: string;
}

function BookingHome({
  title,
  image,
  description,
  venue_id,
}: BookingHomeProps) {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(true);
  const navContext = useContext(NavigationContext)
  
  const handleBooking = () => {
    if (!termsAccepted) return;
    router.push(`/${venue_id}/booking/step1`);
  };

  useEffect(() => {
      navContext.setTitle(title)
    })

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      backgroundColor: 'hsl(var(--brand-background))'
    }}>
      <Card className="border shadow-xl backdrop-blur-sm rounded-lg" style={{
        backgroundColor: 'hsl(var(--background))',
        borderColor: 'hsl(var(--brand-border))'
      }}>
        <CardContent className="flex flex-col items-center text-center space-y-6 p-6">
          <SafeImage
              src={image || ""}
              alt={title}
              width={300}
              height={150}
              className="rounded-xl object-cover shadow-sm"
          />
          <h1 className="text-2xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{`Welcome to ${title}`}</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{description}</p>

          <div className="w-full space-y-3">
            <Button
              onClick={handleBooking}
              className="font-semibold shadow-lg transition-colors duration-200 px-4 py-2 rounded w-full"
              style={{
                backgroundColor: 'hsl(var(--brand-button-primary))',
                color: 'hsl(var(--brand-button-primary-foreground))'
              }}
              disabled={!termsAccepted}
            >
              Start Booking
            </Button>

            {/* Terms checkbox — optional but UX-friendly */}
            <div className="flex items-start space-x-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(!!checked)}
              />
              <label htmlFor="terms" className="leading-tight">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="underline transition-colors duration-200"
                  style={{ color: 'hsl(var(--brand-primary))' }}
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
        const api = createApiClient()
        console.log('Making API call with params:', requestParams);
        console.log('Using API URL:', getCurrentApiUrl());
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
      <div className="min-h-screen flex items-center justify-center p-4" style={{
        backgroundColor: 'hsl(var(--brand-background))'
      }}>
        <div className="text-center">
          <div className="animate-spin rounded-full border-4 border-t-transparent h-8 w-8 mx-auto mb-4" style={{
            borderColor: 'hsl(var(--brand-primary)) transparent transparent transparent'
          }}></div>
          <p style={{ color: 'hsl(var(--brand-primary))' }}>Loading venue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{
        backgroundColor: 'hsl(var(--brand-background))'
      }}>
        <Card className="border shadow-xl backdrop-blur-sm rounded-lg" style={{
          backgroundColor: 'hsl(var(--background))',
          borderColor: 'hsl(var(--brand-border))'
        }}>
          <CardContent className="flex flex-col items-center text-center space-y-6 p-6">
            <div className="text-red-500 text-lg">⚠️</div>
            <h1 className="text-xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Unable to load venue</h1>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="font-semibold shadow-lg transition-colors duration-200 px-4 py-2 rounded"
              style={{
                backgroundColor: 'hsl(var(--brand-button-primary))',
                color: 'hsl(var(--brand-button-primary-foreground))'
              }}
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
