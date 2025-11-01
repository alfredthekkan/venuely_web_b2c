"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, Star, Sparkles, Crown } from "lucide-react";

export default function DemoLandingPage() {
  const router = useRouter();
  
  const handleDemoVenue = () => {
    router.push("/venue/PJjw3aE04RchkGlzUTjI");
  };

  const handleOtherActions = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(to bottom right, hsl(var(--brand-gradient-from)), hsl(var(--brand-gradient-via)), hsl(var(--brand-gradient-to)))`
    }}>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-12 h-12 mr-3" style={{ color: 'hsl(var(--brand-primary))' }} />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Venuely
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-2" style={{ color: 'hsl(var(--brand-secondary-foreground))' }}>
            Luxury Venue Booking Experience
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of venue reservations with our premium booking widget. 
            Seamless, elegant, and designed for the finest establishments.
          </p>
        </div>

        {/* Demo Venue Showcase */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-2 shadow-2xl overflow-hidden" style={{
            backgroundColor: 'hsl(var(--brand-surface))',
            borderColor: 'hsl(var(--brand-border))'
          }}>
            <div className="p-6" style={{
              background: `linear-gradient(to right, hsl(var(--brand-primary)), hsl(var(--brand-button-primary-hover)))`
            }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ 
                    color: 'hsl(var(--brand-primary-foreground))' 
                  }}>
                    Premium Demo Venue
                  </h2>
                  <p className="text-lg" style={{ 
                    color: 'hsl(var(--brand-primary-foreground) / 0.8)' 
                  }}>
                    Experience our luxury booking system in action
                  </p>
                </div>
                <Sparkles className="w-12 h-12" style={{ 
                  color: 'hsl(var(--brand-primary-foreground))' 
                }} />
              </div>
            </div>
            
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ 
                    color: 'hsl(var(--brand-secondary-foreground))' 
                  }}>
                    What You&apos;ll Experience:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-5 h-5 mr-3" style={{ 
                        color: 'hsl(var(--brand-primary))' 
                      }} />
                      <span>Interactive service selection</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-5 h-5 mr-3" style={{ 
                        color: 'hsl(var(--brand-primary))' 
                      }} />
                      <span>Real-time availability slots</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-5 h-5 mr-3" style={{ 
                        color: 'hsl(var(--brand-primary))' 
                      }} />
                      <span>Seamless contact collection</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Star className="w-5 h-5 mr-3" style={{ 
                        color: 'hsl(var(--brand-primary))' 
                      }} />
                      <span>Firebase phone authentication</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="p-6 rounded-lg border mb-6" style={{
                    background: `linear-gradient(to bottom right, hsl(var(--brand-secondary)), hsl(var(--brand-surface)))`,
                    borderColor: 'hsl(var(--brand-border) / 0.5)'
                  }}>
                    <h4 className="font-semibold mb-2" style={{ 
                      color: 'hsl(var(--brand-secondary-foreground))' 
                    }}>Demo Features:</h4>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Multi-step booking flow</li>
                      <li>• Environment-aware API calls</li>
                      <li>• Real-time slot availability</li>
                      <li>• Luxury UI/UX design</li>
                      <li>• Mobile-first responsive</li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={handleDemoVenue}
                    className="font-bold py-4 px-8 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                    <Crown className="w-5 h-5 mr-2" />
                    Try Demo Venue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Options */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="transition-all duration-300 hover:shadow-lg" style={{
            backgroundColor: 'hsl(var(--brand-surface) / 0.8)',
            borderColor: 'hsl(var(--brand-border) / 0.5)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--brand-border))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--brand-border) / 0.5)';
          }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-3" style={{ 
                color: 'hsl(var(--brand-secondary-foreground))' 
              }}>OTP Authentication</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Test Firebase phone authentication system
              </p>
              <Button 
                onClick={() => handleOtherActions("/login")}
                variant="outline"
                style={{
                  borderColor: 'hsl(var(--brand-border))',
                  color: 'hsl(var(--brand-secondary-foreground))'
                }}
              >
                Try Login
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg" style={{
            backgroundColor: 'hsl(var(--brand-surface) / 0.8)',
            borderColor: 'hsl(var(--brand-border) / 0.5)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--brand-border))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--brand-border) / 0.5)';
          }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-3" style={{ 
                color: 'hsl(var(--brand-secondary-foreground))' 
              }}>Theme Demo</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Explore the luxury black & gold theme system
              </p>
              <Button 
                onClick={() => handleOtherActions("/theme-demo")}
                variant="outline"
                style={{
                  borderColor: 'hsl(var(--brand-border))',
                  color: 'hsl(var(--brand-secondary-foreground))'
                }}
              >
                View Themes
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg" style={{
            backgroundColor: 'hsl(var(--brand-surface) / 0.8)',
            borderColor: 'hsl(var(--brand-border) / 0.5)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--brand-border))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--brand-border) / 0.5)';
          }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-3" style={{ 
                color: 'hsl(var(--brand-secondary-foreground))' 
              }}>Documentation</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Learn about the booking widget architecture
              </p>
              <Button 
                onClick={() => handleOtherActions("/tuts")}
                variant="outline"
                style={{
                  borderColor: 'hsl(var(--brand-border))',
                  color: 'hsl(var(--brand-secondary-foreground))'
                }}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground">
          <p className="mb-2">Built with Next.js 15, Firebase Auth & Luxury Design</p>
          <p className="text-sm">Venue ID: <code className="px-2 py-1 rounded" style={{
            backgroundColor: 'hsl(var(--brand-secondary))',
            color: 'hsl(var(--brand-secondary-foreground))'
          }}>PJjw3aE04RchkGlzUTjI</code></p>
        </div>
      </div>
    </div>
  );
}

