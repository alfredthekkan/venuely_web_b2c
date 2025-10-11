"use client";
import { Service, Venue } from '@/lib/api';
import { createContext } from 'react'

export type BookingModel = {
    venue_id: string,
    venue_name: string,
    services: Service[],
    providerId: string | null,
    providerName: string | null,
    start: Date | null,
    end: Date | null,
    guest_name: string,
    guest_notes?: string
}

type BookingContextType = {
    booking: BookingModel | null,
    setBooking: (data: BookingModel | null) => void
    venue: Venue | null, 
    setVenue: (data: Venue | null) => void
}

const defaultContext: BookingContextType = {
    booking: null,
    setBooking: (data) => {},
    venue: null,
    setVenue: (data) => {}
}

export const BookingContext = createContext(defaultContext);
