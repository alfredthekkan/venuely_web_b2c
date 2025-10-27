"use client";
import { VenueGetResponse } from '@/lib/api'
import { useContext, createContext, useState} from 'react'

type VenueContextType = {
    venueResponse: VenueGetResponse | null,
    setVenueResponse: (data: VenueGetResponse | null) => void
}

const VenueContext = createContext<VenueContextType>({venueResponse: null, setVenueResponse: (data: VenueGetResponse | null) => console.log(data?.venue.contactDetails.name ?? '')})

export function VenueProvider({ children } : { children: React.ReactNode}) {
    const [venueResponse, setVenueResponse] = useState<VenueGetResponse | null>(null)
    return <VenueContext.Provider value={{venueResponse: venueResponse, setVenueResponse: setVenueResponse}}>
        {children}
    </VenueContext.Provider>
}

export const useVenue = () => useContext(VenueContext)