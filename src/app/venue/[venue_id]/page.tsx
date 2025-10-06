import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import Link from 'next/link'

interface VenuePageProps {
  params: {
    venue_id: string
  }
}

export default function VenueHomePage( { params }: VenuePageProps) {
  const { venue_id } = params

  console.log(venue_id)

  // Simulated venue data (to be replaced by API data later)
  const venue = {
    id: "12345",
    name: "Glam Studio",
    imageUrl:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Offers world-class hair dressing, spa, and beauty services for men and women. Experience the art of style and self-care.",
    contact: {
      phone: "+91 9876543210",
      address: "123 MG Road, Mumbai, India",
    },
    workingHours: "Mon – Sun: 9 AM – 8 PM",
  }

  return (
    <div className="relative flex flex-col h-screen">
      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="pb-24"> {/* leave space for floating button */}
          {/* Hero Image */}
          <div className="w-full h-56 sm:h-72 md:h-96 relative">
            <Image
              src={venue.imageUrl}
              alt={venue.name}
              fill
              className="object-cover rounded-b-2xl"
              priority
            />
          </div>

          {/* Venue Info */}
          <div className="px-5 py-4">
            <h1 className="text-2xl font-bold">{venue.name}</h1>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {venue.description}
            </p>

            <div className="mt-4">
            <Link href={`/venue/${venue.id}/services`}>
              <Button
                variant="outline"
              >
                View All Services
              </Button>
              </Link>
            </div>
          </div>

          <Separator className="my-3" />

          {/* Working Hours */}
          <Card className="mx-5 mt-2">
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-1">Working Hours</h2>
              <p className="text-muted-foreground">{venue.workingHours}</p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="mx-5 mt-3 mb-6">
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-1">Contact</h2>
              <p className="text-muted-foreground">{venue.contact.phone}</p>
              <p className="text-muted-foreground">{venue.contact.address}</p>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Floating "Book Now" Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t flex justify-center">
      <Link href={`/venue/${venue.id}/book`}>
        <Button
          size="lg"
          className="w-full max-w-sm text-lg font-semibold"
        >
          Book Now
        </Button>
        </Link>
      </div>
    </div>
  )
}
