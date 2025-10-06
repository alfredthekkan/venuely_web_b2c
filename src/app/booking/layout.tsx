"use client"
import { useState } from 'react'
import { BookingContext, defaultBooking } from "@/context/BookingContext";

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [booking, setBooking] = useState(defaultBooking)
    return <BookingContext.Provider value={{booking, setBooking}}>
        {children}
    </BookingContext.Provider>
}