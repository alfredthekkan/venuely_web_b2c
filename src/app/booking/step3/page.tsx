"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SummaryProps = {
  venueName: string;
  date: string;
  time: string;
  services: string[];
  totalCost: number;
  note?: string;
};

export default function Summary() {
    const summary = {
        venueName: "Golden Touch Spa",
        date: '27 04 1989',
        time: '10:00 AM',
        services: ['Hair cut', 'beard setting'],
        totalCost: 400,
        note: 'Be on time'
    }
    return BookingSummary(
        summary
    )
}

function BookingSummary({
  venueName,
  date,
  time,
  services,
  totalCost,
  note,
}: SummaryProps) {

    const router = useRouter();

    const handleClick =  () => {
        router.push('/booking/step4');
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
            <span className="font-semibold">Date:</span> {date}
          </div>

          <div>
            <span className="font-semibold">Time:</span> {time}
          </div>

          <div>
            <span className="font-semibold">Services:</span>{" "}
            {services.join(", ")}
          </div>

          <div>
            <span className="font-semibold">Total Cost:</span> ₹{totalCost}
          </div>

          {note && (
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Note:</span> {note}
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick = {() => handleClick()}>Confirm Booking</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
