"use client";

import React from "react";
import { useEffect, useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { NavigationContext } from "@/context/NavigationContext";

export default function BookingSuccess() {
    const navContext = useContext(NavigationContext)
  
  useEffect(() => {
      navContext.setTitle("Booking Success!")
    }, [navContext.title])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 text-center">
        <CardHeader>
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
          <CardTitle className="mt-4 text-2xl font-bold">
            Your booking has been confirmed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mt-2">
            You can now close this window.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
