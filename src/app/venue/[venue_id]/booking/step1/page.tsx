"use client";
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BookingContext } from '@/context/BookingContext';
import { NavigationContext } from '@/context/NavigationContext';
import { useVenue } from '@/context/VenueContext';
import { Service } from '@/lib/api';
import React, { useState } from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"

export default function MoreServicesScreen() {
  const [selectedServices, setSelectedServices] = useState<Set<Service>>(new Set());
  const { venueResponse, setVenueResponse } = useVenue()

  const handleServiceSelect = (service: Service, isSelected: boolean) => {
    setSelectedServices(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(service);
      } else {
        newSet.delete(service);
      }
      return newSet;
    });
  };

  const totalSelected = selectedServices.size;
  const navContext = useContext(NavigationContext)
  const context = useContext(BookingContext);
  const router = useRouter();
  
  useEffect(() => {
    navContext.setTitle("Pick Services")
  }, [navContext.title])

  const onSubmit =  async (services: Service[]) => {
    const selection = services.map((service) => service.title ?? '')
    console.log(selection)
    if (context.booking) {
      const updatedBooking = {...context.booking, services: services};
      context.setBooking(updatedBooking);
    }else {
      context.setBooking({
        venue_id: venueResponse?.venue?.id ?? "", 
        venue_name: venueResponse?.venue?.contactDetails?.name ?? '', 
        services: services, 
        providerId: null,
        providerName: null,
        start: null, 
        end: null,
        guest_name: '',
        guest_notes: ''
      });
    }

    router.push(`/venue/${venueResponse?.venue?.id ?? ""}/booking/step2`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-white to-emerald-500 p-4">
      <Card className="max-w-md w-full shadow-lg border-none bg-white/90 backdrop-blur-md">
      <CardContent className="flex flex-col text-center space-y-6 p-6">
      {/* Service List */}
      {venueResponse?.services && <div className="space-y-3">
        {venueResponse?.services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedServices.has(service)}
            onSelect={handleServiceSelect}
          />
        ))}
      </div>}
      </CardContent>
      </Card>

      {/* CTA at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white shadow-lg max-w-lg mx-auto">
        <Button 
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white" 
          disabled={totalSelected === 0}
          onClick={() => onSubmit(Array.from(selectedServices))}
        >
          {totalSelected > 0 
            ? `Show Availability for ${totalSelected} Item${totalSelected > 1 ? 's' : ''}`
            : 'Select a Service'
          }
        </Button>
      </div>
    </div>
  );
}