import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ServiceGenderEnum } from "@/lib/api";

// 1. Define the props interface
interface Service {
  serviceId: string;
  title: string;
  durationInMinutes?: number; // Duration in minutes
  amount?: number;
  gender?: ServiceGenderEnum
}

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service, isSelected: boolean) => void;
}

// 2. Format Currency (Helper Function)
const formatCurrency = (amount: number): string => {
  // Use 'en-IN' for Indian Rupee (₹) based on your location, or 'en-US' for Dollar ($)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  const { serviceId, title, durationInMinutes, amount, gender } = service;

  const formattedCost = formatCurrency(amount ?? 0);
  const formattedDuration = (durationInMinutes ?? 0) > 60 && (durationInMinutes ?? 0) % 60 === 0
    ? `${(durationInMinutes ?? 0) / 60} Hour`
    : `${durationInMinutes ?? 0} min`;

  const handleCheckboxChange = (checked: boolean) => {
    onSelect(service, checked);
  };

  return (
    // The main Card component
    <Card 
      className={`
        w-full shadow-sm hover:shadow-md transition-all cursor-pointer 
        ${isSelected ? 'border-primary ring-1 ring-emerald-500' : 'border-border'}
      `}
      onClick={() => handleCheckboxChange(!isSelected)} // Allow clicking anywhere on the card to toggle
    >
      <CardContent className="px-2 flex items-center justify-between space-x-4">
        
        {/* Left Side: Details */}
        <div className="flex flex-col space-y-1.5 flex-1">
          <Label htmlFor={serviceId} className="text-lg font-semibold cursor-pointer leading-tight">
            {title}
          </Label>
          
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            {/* Duration */}
            <span className="font-medium text-primary">{formattedDuration}</span>
            <Separator orientation="vertical" className="h-4 bg-muted-foreground" />
            
            {/* Cost */}
            <span className="text-base font-bold text-gray-800">{formattedCost}</span>
          </div>
        </div>

        {/* Right Side: Checkbox */}
        <div className="flex items-center">
          <Checkbox
            id={serviceId}
            checked={isSelected}
            onCheckedChange={handleCheckboxChange}
            className="h-6 w-6 data-[state=checked]:bg-emerald-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}