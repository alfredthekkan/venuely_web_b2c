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

  const handleOTPLogin = () => router.push("/home")
  
  return (
    <AuthProvider>
      <div className="flex gap-4 m-4">
        <Button onClick={handleClick}>New Booking</Button>
        <Button onClick={handleContextLearn}>Learn Context</Button>
        <Button onClick={handleOTPLogin}>Try OTP Login</Button>
        </div>
    </AuthProvider>
  );
}

