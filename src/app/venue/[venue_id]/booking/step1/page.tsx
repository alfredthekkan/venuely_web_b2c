"use client";
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BookingContext } from '@/context/BookingContext';
import { NavigationContext } from '@/context/NavigationContext';
import { useVenue } from '@/context/VenueContext';
import { Service } from '@/lib/api';

function ServiceSelectionForm() {

  const navContext = useContext(NavigationContext)

  useEffect(() => {
    navContext.setTitle("Pick Services")
  }, [navContext.title])

  type FormValues = {
    services: Service[];
  };

  const router = useRouter();
  const context = useContext(BookingContext);
  const venueContext = useVenue()
  
  const onSubmit: SubmitHandler<FormValues> =  async (data: FormValues) => {
    const selection = data.services.map((service) => service.title ?? '')
    console.log(selection)
    if (context.booking) {
      const updatedBooking = {...context.booking, services: data.services};
      context.setBooking(updatedBooking);
    }else {
      context.setBooking({venue_id: venueContext?.venue?.venueId ?? "", venue_name: venueContext.venue?.title ?? '', services: data.services, date: null, time: null})
    }
    
    router.push(`/venue/${venueContext?.venue?.venueId ?? ""}/booking/step2`);
  };

  const form = useForm<FormValues>({
    defaultValues: {
      services: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="m-4 space-y-2">

        {venueContext?.venue?.services && venueContext?.venue?.services.map((service) => (
          <FormField
            key={service.serviceId}
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <Checkbox
                    checked={field.value?.some((s) => service.serviceId == s.serviceId)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...(field.value || []), service]);
                      } else {
                        field.onChange(field.value?.filter((value) => value.serviceId != service.serviceId));
                      }
                    }}
                  />
                  <span>{service.title}</span>
                </label>
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={form.watch("services").length === 0} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ServiceSelectionForm;