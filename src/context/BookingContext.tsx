"use client";
import { createContext } from 'react'

type BookingModel = {
    venueName: string,
    venueId: string,
    services: string[],
    date: Date,
    time: Date
}

export const defaultBooking: BookingModel = {
    venueName: "Golden Touch Spa",
    venueId: "WSK343D",
    services: [],
    date: new Date(),
    time: new Date()
}

type BookingContextType = {
    booking: BookingModel,
    setBooking: (data: BookingModel) => void
}

const defaultContext: BookingContextType = {
    booking: defaultBooking,
    setBooking: (data) => { console.log(data.venueName)}
}

export const BookingContext = createContext(defaultContext);
