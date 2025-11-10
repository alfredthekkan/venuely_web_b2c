"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, Star, Sparkles, Crown } from "lucide-react";

export default function DemoLandingPage() {
  const router = useRouter();
  
  const handleDemoVenue = () => {
    router.push("/PJjw3aE04RchkGlzUTjI");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 mr-2" style={{ color: 'hsl(var(--brand-primary))' }} />
            <h1 className="text-3xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Venuely
            </h1>
          </div>
          <p className="text-lg mb-2" style={{ color: 'hsl(var(--foreground))' }}>
            Luxury Venue Booking Experience
          </p>
          <p className="text-sm px-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Experience the future of venue reservations with our premium booking widget. 
            Seamless, elegant, and designed for the finest establishments.
          </p>
        </div>

        {/* Demo Venue Showcase */}
        <div className="mb-8">
          <Card className="shadow-lg overflow-hidden" style={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--brand-border))'
          }}>
            <div className="p-4" style={{
              background: `linear-gradient(to right, hsl(var(--brand-primary)), hsl(var(--brand-button-primary-hover)))`
            }}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1" style={{ 
                    color: 'hsl(var(--brand-primary-foreground))' 
                  }}>
                    Premium Demo Venue
                  </h2>
                  <p className="text-sm" style={{ 
                    color: 'hsl(var(--brand-primary-foreground) / 0.8)' 
                  }}>
                    Experience our luxury booking system in action
                  </p>
                </div>
                <Sparkles className="w-8 h-8 ml-2" style={{ 
                  color: 'hsl(var(--brand-primary-foreground))' 
                }} />
              </div>
            </div>
            
            <CardContent className="p-4" style={{
              backgroundColor: 'hsl(var(--background))'
            }}>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--foreground))' }}>
                    What You&apos;ll Experience:
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center" style={{ color: 'hsl(var(--foreground))' }}>
                      <Calendar className="w-4 h-4 mr-3" style={{ 
                        color: 'hsl(var(--brand-primary))' 
                      }} />
                      <span className="text-sm">Interactive service selection</span>
                    </div>
                    <div className="flex items-center" style={{ color: 'hsl(var(--foreground))' }}>
                      <Clock className="w-4 h-4 mr-3" style={{ 
                        color: 'hsl(var(--brand-primary))' 
                      }} />
                      <span className="text-sm">Real-time availability slots</span>
                    </div>
                    <div className="flex items-center" style={{ color: 'hsl(var(--foreground))' }}>
                      <MapPin className="w-4 h-4 mr-3" style={{ 
                        color: 'hsl(var(--brand-primary))' 
                      }} />
                      <span className="text-sm">Seamless contact collection</span>
                    </div>
                    <div className="flex items-center" style={{ color: 'hsl(var(--foreground))' }}>
                      <Star className="w-4 h-4 mr-3" style={{ 
                        color: 'hsl(var(--brand-primary))' 
                      }} />
                      <span className="text-sm">Firebase phone authentication</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border" style={{
                  backgroundColor: 'hsl(var(--muted))',
                  borderColor: 'hsl(var(--brand-border))'
                }}>
                  <h4 className="font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Demo Features:</h4>
                  <ul className="text-sm space-y-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <li>• Multi-step booking flow</li>
                    <li>• Environment-aware API calls</li>
                    <li>• Real-time slot availability</li>
                    <li>• Luxury UI/UX design</li>
                    <li>• Mobile-first responsive</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={handleDemoVenue}
                  className="w-full font-bold py-3 px-6 text-base transition-all duration-300 shadow-lg"
                  style={{
                    backgroundColor: 'hsl(var(--brand-button-primary))',
                    color: 'hsl(var(--brand-button-primary-foreground))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--brand-button-primary-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--brand-button-primary))';
                  }}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Try Demo Venue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>



      </div>
    </div>
  );
}

