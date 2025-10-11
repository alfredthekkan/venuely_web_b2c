"use client"
import { useState } from 'react'
import { BookingContext, BookingModel } from "@/context/BookingContext";
import { Venue } from '@/lib/api';

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [booking, setBooking] = useState<BookingModel | null>(null)
    const [venue, setVenue] = useState<Venue | null>(null)
    return <BookingContext.Provider value={{booking, setBooking, venue, setVenue}}>
        {children}
    </BookingContext.Provider>
}