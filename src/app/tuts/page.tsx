"use client";
import { Button } from '@/components/ui/button';
import { createContext, useContext, useState } from 'react'

type Booking = {
    venueId: string,
    services: string[],
    date: string,
    time: string
}

const initialBooking: Booking = {
    venueId: 'Golden Touch Spa',
    services: [],
    date: '',
    time: ''
}

type BookingContextType = {
    booking: Booking,
    setBooking: (data: Booking) => void
}

const bookingContext: BookingContextType = {
    booking: initialBooking,
    setBooking: (data) => { console.log(data.venueId)}
}

const RoomContext = createContext(bookingContext)

function Book() {
    const context = useContext(RoomContext)

    const handleClick = () => {
        const newBooking = {...context.booking, venueId: 'Magic beaty salon and spa'};
        context.setBooking(newBooking);
    }
    
    return <>
        <h1>
            This book is in the room: {context.booking?.venueId}
        </h1>
        <Button onClick={handleClick}>Change Venue</Button>
    </>;
}

function Chair() {
    return (
        <Book/>
    )
}

export default function Room() {
    const [booking, setBooking] = useState<Booking>(initialBooking)
    return <RoomContext.Provider value={{ booking, setBooking}}>
        <Chair/>
    </RoomContext.Provider>
}