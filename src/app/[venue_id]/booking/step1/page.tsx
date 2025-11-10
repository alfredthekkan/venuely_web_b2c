"use client";
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { BookingContext } from '@/context/BookingContext';
import { NavigationContext } from '@/context/NavigationContext';
import { useVenue } from '@/context/VenueContext';
import { Service } from '@/lib/api';
import React, { useState, useMemo } from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from 'lucide-react';
// Removed old style imports - now using CSS variables directly

export default function MoreServicesScreen( { params }: { params: Promise<{venue_id : string}>}) {
  const { venue_id } = React.use(params);
  const [selectedServices, setSelectedServices] = useState<Set<Service>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const { venueResponse, setVenueResponse } = useVenue()

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!venueResponse?.services) return [];
    
    if (!searchQuery.trim()) {
      return venueResponse.services;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return venueResponse.services.filter(service => 
      service.title?.toLowerCase().includes(query)
    );
  }, [venueResponse?.services, searchQuery]);

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

    router.push(`/${venue_id}/booking/step2`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start p-4 pb-20 pt-8" style={{
      backgroundColor: 'hsl(var(--brand-background))'
    }}>
      <div className="w-full max-w-7xl mx-auto">
        <Card className="border shadow-xl backdrop-blur-sm rounded-lg" style={{
          backgroundColor: 'hsl(var(--background))',
          borderColor: 'hsl(var(--brand-border))'
        }}>
          <CardContent className="p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--brand-border))',
                  color: 'hsl(var(--foreground))'
                }}
              />
            </div>
            
            {/* Responsive Service Grid - Fixed Container */}
            <div className="min-h-[200px]">
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-stretch">
                  {filteredServices.map(service => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isSelected={selectedServices.has(service)}
                      onSelect={handleServiceSelect}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px]">
                  <p style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {searchQuery ? 'No services found matching your search.' : 'No services available.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4" style={{
        backgroundColor: 'hsl(var(--brand-background))'
      }}>
        <div className="w-full max-w-7xl mx-auto">
          <Button 
            className="font-semibold shadow-lg transition-colors duration-200 w-full h-12 max-w-md mx-auto block"
            style={{
              backgroundColor: 'hsl(var(--brand-button-primary))',
              color: 'hsl(var(--brand-button-primary-foreground))'
            }}
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
    </div>
  );
}