"use client";

import { ThemeDemo } from '@/components/ThemeToggle';

export default function ThemeDemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(to bottom right, hsl(var(--neutral-800)), hsl(var(--brand-900)), hsl(var(--brand-700)))'
    }}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="border shadow-xl backdrop-blur-sm rounded-lg p-8 text-center" style={{
          backgroundColor: 'hsl(var(--background))',
          borderColor: 'hsl(var(--brand-border))'
        }}>
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
            🎨 Centralized Theme System Demo
          </h1>
          <p className="mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
            This page demonstrates how the entire Venuely app can be themed from a single CSS file.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div 
              className="font-semibold shadow-lg transition-colors duration-200 px-4 py-2 rounded text-center cursor-pointer"
              style={{
                backgroundColor: 'hsl(var(--brand-button-primary))',
                color: 'hsl(var(--brand-button-primary-foreground))'
              }}
            >
              Primary CTA
            </div>
            <div 
              className="font-medium transition-colors duration-200 px-4 py-2 rounded border text-center cursor-pointer"
              style={{
                backgroundColor: 'hsl(var(--brand-button-secondary))',
                color: 'hsl(var(--brand-button-secondary-foreground))',
                borderColor: 'hsl(var(--brand-border))'
              }}
            >
              Secondary Action
            </div>
            <div 
              className="font-medium transition-colors duration-200 px-4 py-2 rounded border text-center cursor-pointer"
              style={{
                borderColor: 'hsl(var(--brand-border))',
                color: 'hsl(var(--brand-primary))',
                backgroundColor: 'transparent'
              }}
            >
              Outline Style
            </div>
          </div>
          
          <ThemeDemo />
        </div>
        
        <div className="border shadow-xl backdrop-blur-sm rounded-lg p-6" style={{
          backgroundColor: 'hsl(var(--background))',
          borderColor: 'hsl(var(--brand-border))'
        }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>🚀 How It Works</h2>
          <div className="space-y-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <p>✅ <strong>Single Source of Truth:</strong> All colors defined in <code>src/app/globals.css</code></p>
            <p>✅ <strong>Theme-Aware Variables:</strong> CSS variables automatically adapt to light/dark mode</p>
            <p>✅ <strong>Live Updates:</strong> Toggle the theme button in navbar to see instant changes</p>
            <p>✅ <strong>Zero Hardcoded Colors:</strong> Everything uses CSS variables</p>
            <p>✅ <strong>Instant Rebranding:</strong> Change colors in one file, entire app updates</p>
          </div>
        </div>
        
        <div className="border shadow-xl backdrop-blur-sm rounded-lg p-6" style={{
          backgroundColor: 'hsl(var(--background))',
          borderColor: 'hsl(var(--brand-border))'
        }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>🎯 Theme Variables in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Light Theme Colors</h3>
              <ul className="space-y-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <li>• Primary: Golden (#F59E0B)</li>
                <li>• Background: White</li>
                <li>• Text: Dark Gray</li>
                <li>• Borders: Gold accents</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Dark Theme Colors</h3>
              <ul className="space-y-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <li>• Primary: Lighter Gold</li>
                <li>• Background: Dark Gray</li>
                <li>• Text: Light Gray</li>
                <li>• Borders: Gold accents</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 rounded-lg" style={{
            backgroundColor: 'hsl(var(--brand-primary) / 0.1)',
            borderColor: 'hsl(var(--brand-border))',
            border: '1px solid'
          }}>
            <p className="text-sm" style={{ color: 'hsl(var(--brand-primary))' }}>
              <strong>✨ Try it:</strong> Click the theme toggle button (🌙/☀️) in the navbar to see all colors change instantly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}