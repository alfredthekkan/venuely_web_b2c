"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

/**
 * Theme Toggle Component for Venuely Booking Widget
 * 
 * This component demonstrates the centralized theming system by allowing
 * users to toggle between light and dark themes. All color changes
 * are controlled through CSS variables in globals.css.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDark(shouldBeDark);
    
    // Apply theme to document
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Apply to document
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="transition-colors duration-200"
      style={{
        borderColor: 'hsl(var(--brand-border))',
        color: 'hsl(var(--brand-primary))',
        backgroundColor: 'transparent'
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="ml-2 hidden sm:inline">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </Button>
  );
}

/**
 * Demo Component showing theme variables in action
 * 
 * This component displays various UI elements to demonstrate how
 * the centralized theming system affects the entire application.
 */
export function ThemeDemo() {
  return (
    <div className="space-y-6 p-6 rounded-lg border" style={{
      backgroundColor: 'hsl(var(--brand-surface) / 0.1)',
      borderColor: 'hsl(var(--brand-border))'
    }}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>Theme Variables</h3>
        <ThemeToggle />
      </div>
      
      <div className="space-y-4">
        <div className="p-4 rounded-lg" style={{
          backgroundColor: 'hsl(var(--brand-primary))',
          color: 'hsl(var(--brand-primary-foreground))'
        }}>
          <h4 className="font-semibold">Primary Brand Color</h4>
          <p className="text-sm opacity-90">Uses --brand-primary CSS variable</p>
        </div>
        
        <div className="p-4 rounded-lg" style={{
          backgroundColor: 'hsl(var(--brand-navbar))',
          color: 'hsl(var(--brand-navbar-foreground))'
        }}>
          <h4 className="font-semibold">Navbar Color</h4>
          <p className="text-sm opacity-90">Uses --brand-navbar CSS variable</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button style={{
            backgroundColor: 'hsl(var(--brand-button-primary))',
            color: 'hsl(var(--brand-button-primary-foreground))'
          }}>
            Primary Button
          </Button>
          <Button style={{
            backgroundColor: 'hsl(var(--brand-button-secondary))',
            color: 'hsl(var(--brand-button-secondary-foreground))',
            borderColor: 'hsl(var(--brand-border))',
            border: '1px solid'
          }}>
            Secondary Button
          </Button>
        </div>
      </div>
      
      <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
        <p>💡 <strong>Pro tip:</strong> All colors use CSS variables from <code>globals.css</code></p>
        <p>� <strong>Theme aware:</strong> Colors automatically change with light/dark mode!</p>
        <p>🎨 <strong>Try it:</strong> Click the theme toggle above to see the magic!</p>
      </div>
    </div>
  );
}