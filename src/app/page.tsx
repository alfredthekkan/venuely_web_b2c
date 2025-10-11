"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
  
export default function NewBooking() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/booking/step1");
  };

  const handleContextLearn = () => { 
    router.push("/tuts");
  };

  const handleVenue = () => {
    router.push("/venue/G8zjL37Xj53pwrNFbAFv")
  }

  const handleOTPLogin = () => router.push("/home")
  
  return (
      <div className="flex gap-4 m-4">
        <Button onClick={handleClick}>New Booking</Button>
        <Button onClick={handleContextLearn}>Learn Context</Button>
        <Button onClick={handleOTPLogin}>Try OTP Login</Button>
        <Button onClick={handleVenue}>Thach Bro Carpentry works</Button>
        </div>
  );
}

