import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Service } from "@/lib/api";
// Removed old style imports - now using CSS variables directly

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
  const { id, title, durationInMinutes, amount, gender } = service;

  const formattedCost = formatCurrency(amount);
  const formattedDuration = durationInMinutes > 60 && durationInMinutes % 60 === 0
    ? `${durationInMinutes / 60} Hour`
    : `${durationInMinutes} min`;

  // Gender emoji helper
  const getGenderEmoji = (gender: string | undefined) => {
    switch (gender?.toLowerCase()) {
      case 'male':
        return '👨';
      case 'female':
        return '👩';
      case 'unisex':
        return '👨👩';
      default:
        return '👤'; // Generic person for unknown/undefined
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    onSelect(service, checked);
  };

  return (
    // The main Card component - now responsive for grid layout
    <Card 
      className="cursor-pointer transition-all duration-200 border shadow-sm w-full h-full"
      style={{
        backgroundColor: isSelected ? 'hsl(var(--brand-primary) / 0.1)' : 'hsl(var(--background))',
        borderColor: isSelected ? 'hsl(var(--brand-primary))' : 'hsl(var(--brand-border))',
        boxShadow: isSelected ? '0 4px 12px hsl(var(--brand-primary) / 0.2)' : undefined
      }}
      onClick={() => handleCheckboxChange(!isSelected)} // Allow clicking anywhere on the card to toggle
    >
      <CardContent className="px-3 py-2">
        <div className="flex items-start justify-between">
          
          {/* Left Side: Service Details */}
          <div className="flex-1 space-y-1.5">
            {/* Service Title with Gender Emoji */}
            <div className="flex items-center space-x-2">
              <Label 
                htmlFor={id || 'service'} 
                className="text-lg font-semibold cursor-pointer leading-tight flex-1"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {title}
              </Label>
              <span className="text-sm">{getGenderEmoji(gender)}</span>
            </div>
            
            {/* Service Info Row */}
            <div className="flex items-center justify-between">
              {/* Duration */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ 
                  backgroundColor: 'hsl(var(--brand-primary) / 0.2)', 
                  color: 'hsl(var(--brand-primary))',
                  border: '1px solid hsl(var(--brand-primary) / 0.3)'
                }}>
                  {formattedDuration}
                </span>
              </div>
              
              {/* Price */}
              <div className="text-right">
                <span className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                  {formattedCost}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Checkbox */}
          <div className="flex items-start pt-0.5 ml-3">
            <Checkbox
              id={id || 'service'}
              checked={isSelected}
              onCheckedChange={handleCheckboxChange}
              className="h-5 w-5"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}