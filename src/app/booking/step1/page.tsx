"use client";
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import { DefaultService, OpenAPI } from "@/lib/api";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BookingContext } from '@/context/BookingContext';


function ServiceCheckBoxItem({ label, onChange }: { label: string, onChange: (checked: boolean) => void }) {
  return (
    <div className="flex items-center gap-3">
        <Checkbox id={label} />
        <Label htmlFor={label}>{label}</Label>
      </div>
  );
}

function Step1Services() {

  const allServices = ['Hair Cut', 'Shampoo', 'Beard Trim', 'Massage', 'Facial', 'Manicure', 'Pedicure'];
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const router = useRouter();

  const handleCheckboxChange = (label: string, checked: boolean) => {
    setSelectedServices((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

 const servicesCheckBoxItems = allServices.map((service) => (
    <ServiceCheckBoxItem key={service} label={service} onChange={(checked) => handleCheckboxChange(service, checked)} />
  ));

  

  return (
    <div className="flex flex-col gap-4 items-start px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-500">What services do you want to book?</h1>
      {servicesCheckBoxItems}
      <div className="w-full">
        <Button>Create New Booking</Button>

      </div>
    </div>
  );
}

function ServiceSelectionForm() {

  type FormValues = {
    services: string[];
  };

  const services = [
    { id: 'haircut', label: 'Hair Cut' },
    { id: 'shampoo', label: 'Shampoo' },
    { id: 'beardtrim', label: 'Beard Trim' },
    { id: 'massage', label: 'Massage' },
    { id: 'facial', label: 'Facial' },
    { id: 'manicure', label: 'Manicure' },
    { id: 'pedicure', label: 'Pedicure' },
  ]

  const router = useRouter();
  const context = useContext(BookingContext);
  
  const onSubmit: SubmitHandler<FormValues> =  async (data: FormValues) => {
    OpenAPI.BASE = "https://2bfdc92c-3826-4fe5-847d-bd37d96b59ec.mock.pstmn.io/";
    const requestBody = { date: "2025-09-30", serviceIds: data.services };
    const slots = await DefaultService.postBookingsSlots(requestBody);
    console.log("Available slots:", slots);
    
    
    const updatedBooking = {...context.booking, services: data.services};
    context.setBooking(updatedBooking);

    router.push("/booking/step2");
  };

  const form = useForm<FormValues>({
    defaultValues: {
      services: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="m-4 space-y-6">

        {services.map((service) => (
          <FormField
            key={service.id}
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <Checkbox
                    checked={field.value?.includes(service.label)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...(field.value || []), service.label]);
                      } else {
                        field.onChange(field.value?.filter((value) => value !== service.label));
                      }
                    }}
                  />
                  <span>{service.label}</span>
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