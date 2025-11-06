"use client";

import React from "react";
import { useEffect, useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { NavigationContext } from "@/context/NavigationContext";
import { BookingContext } from "@/context/BookingContext";
// Removed old style imports - now using CSS variables directly

export default function BookingSuccess({params}: {params: Promise<{venue_id: string}>}) {
  const { venue_id } = React.use(params);
    
  const navContext = useContext(NavigationContext)
    const bookingContext = useContext(BookingContext)
    const router = useRouter()
  
  useEffect(() => {
      navContext.setTitle("Booking Submitted")
    }, [navContext.title])

  const handleNewBooking = () => {
    router.push(`/venue/${venue_id}/`)
  }
  return (
    <div className="min-h-screen flex flex-col justify-center p-4 pb-20" style={{
      backgroundColor: 'hsl(var(--brand-background))'
    }}>
      <div className="flex items-center justify-center flex-1">
        <Card className="border shadow-xl backdrop-blur-sm rounded-lg w-full max-w-md p-6 text-center" style={{
          backgroundColor: 'hsl(var(--brand-background))',
          borderColor: 'hsl(var(--brand-border))'
        }}>
          <CardHeader>
            <CheckCircle2 className="w-16 h-16 mx-auto" style={{ color: 'hsl(var(--brand-primary))' }} />
            <CardTitle className="mt-4 text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Booking Request Submitted!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Your booking request has been sent to {bookingContext.booking?.venue_name || 'the venue'}.
            </p>
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
          onClick={handleNewBooking}
        >
          Make New Booking
        </Button>
      </div>
    </div>
  );
}
