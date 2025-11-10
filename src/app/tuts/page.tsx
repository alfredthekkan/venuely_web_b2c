"use client";
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

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

  const handleBooking = () => {
    if (!termsAccepted) return;
    router.push(`/book/${venue_id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-emerald-500 p-4">
      <Card className="max-w-md w-full shadow-lg border-none bg-white/90 backdrop-blur-md">
        <CardContent className="flex flex-col items-center text-center space-y-6 p-6">
          <Image
            src={image || "https://via.placeholder.com/300x150.png?text=Venue+Image"}
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

export default function HomePage() {
  return (
    <BookingHome
      title="UrbanFix Facility Services"
      image="https://firebasestorage.googleapis.com:443/v0/b/venuely-staging.firebasestorage.app/o/venues%2FG8zjL37Xj53pwrNFbAFv%2FFE903BD1-6AA4-419A-B4B5-6E56B870E178.jpg?alt=media&token=375bd021-5783-40ab-995e-100b7d7823d9"
      description="Book electricians, plumbers, and painters effortlessly through our easy booking widget."
      venue_id="abc123"
    />
  );
}
