"use client";
import { Venue } from '@/lib/api'
import { useContext, createContext, useState} from 'react'

type VenueContextType = {
    venue: Venue | null,
    setVenue: (data: Venue | null) => void
}

const VenueContext = createContext<VenueContextType>({venue: null, setVenue: (data: Venue | null) => console.log(data?.title ?? '')})

export function VenueProvider({ children } : { children: React.ReactNode}) {
    const [venue, setVenue] = useState<Venue | null>(null)
    return <VenueContext.Provider value={{venue: venue, setVenue: setVenue}}>
        {children}
    </VenueContext.Provider>
}

export const useVenue = () => useContext(VenueContext)