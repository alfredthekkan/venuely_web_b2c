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
    <div className="min-h-screen bg-linear-to-br from-brand-charcoal via-brand-900 to-brand-700">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-12 h-12 text-brand-500 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Venuely
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-brand-300 mb-2">
            Luxury Venue Booking Experience
          </p>
          <p className="text-brand-400 max-w-2xl mx-auto">
            Experience the future of venue reservations with our premium booking widget. 
            Seamless, elegant, and designed for the finest establishments.
          </p>
        </div>

        {/* Demo Venue Showcase */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-brand-black border-brand-500 border-2 shadow-2xl overflow-hidden">
            <div className="bg-linear-to-r from-brand-500 to-brand-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2">
                    Premium Demo Venue
                  </h2>
                  <p className="text-brand-900 text-lg">
                    Experience our luxury booking system in action
                  </p>
                </div>
                <Sparkles className="w-12 h-12 text-brand-black" />
              </div>
            </div>
            
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-brand-500 mb-4">
                    What You'll Experience:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-brand-300">
                      <Calendar className="w-5 h-5 text-brand-500 mr-3" />
                      <span>Interactive service selection</span>
                    </div>
                    <div className="flex items-center text-brand-300">
                      <Clock className="w-5 h-5 text-brand-500 mr-3" />
                      <span>Real-time availability slots</span>
                    </div>
                    <div className="flex items-center text-brand-300">
                      <MapPin className="w-5 h-5 text-brand-500 mr-3" />
                      <span>Seamless contact collection</span>
                    </div>
                    <div className="flex items-center text-brand-300">
                      <Star className="w-5 h-5 text-brand-500 mr-3" />
                      <span>Firebase phone authentication</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="bg-linear-to-br from-brand-800 to-brand-900 p-6 rounded-lg border border-brand-600 mb-6">
                    <h4 className="text-brand-500 font-semibold mb-2">Demo Features:</h4>
                    <ul className="text-brand-300 text-sm space-y-1">
                      <li>• Multi-step booking flow</li>
                      <li>• Environment-aware API calls</li>
                      <li>• Real-time slot availability</li>
                      <li>• Luxury UI/UX design</li>
                      <li>• Mobile-first responsive</li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={handleDemoVenue}
                    className="bg-brand-500 hover:bg-brand-600 text-brand-black font-bold py-4 px-8 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
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
          <Card className="bg-brand-black/80 border-brand-700 hover:border-brand-500 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-brand-500 font-semibold mb-3">OTP Authentication</h3>
              <p className="text-brand-400 text-sm mb-4">
                Test Firebase phone authentication system
              </p>
              <Button 
                onClick={() => handleOtherActions("/login")}
                variant="outline"
                className="border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-brand-black"
              >
                Try Login
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-brand-black/80 border-brand-700 hover:border-brand-500 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-brand-500 font-semibold mb-3">Theme Demo</h3>
              <p className="text-brand-400 text-sm mb-4">
                Explore the luxury black & gold theme system
              </p>
              <Button 
                onClick={() => handleOtherActions("/theme-demo")}
                variant="outline"
                className="border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-brand-black"
              >
                View Themes
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-brand-black/80 border-brand-700 hover:border-brand-500 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-brand-500 font-semibold mb-3">Documentation</h3>
              <p className="text-brand-400 text-sm mb-4">
                Learn about the booking widget architecture
              </p>
              <Button 
                onClick={() => handleOtherActions("/tuts")}
                variant="outline"
                className="border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-brand-black"
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-brand-400">
          <p className="mb-2">Built with Next.js 15, Firebase Auth & Luxury Design</p>
          <p className="text-sm">Venue ID: <code className="bg-brand-800 px-2 py-1 rounded text-brand-500">PJjw3aE04RchkGlzUTjI</code></p>
        </div>
      </div>
    </div>
  );
}

