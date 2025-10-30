"use client";
import { NavigationContext } from "@/context/NavigationContext";
import { useContext } from "react";
import { ThemeToggle } from './ThemeToggle';

function Navbar() {
  const context = useContext(NavigationContext)
  return (
    <div 
      className="fixed right-0 left-0 top-0 flex flex-row items-center justify-between shadow-lg z-50 border-b"
      style={{
        backgroundColor: 'hsl(var(--brand-navbar))',
        borderBottomColor: 'hsl(var(--brand-navbar-border))'
      }}
    >
      <div className="flex w-full justify-between p-4 font-semibold items-center">
        <h1 
          className="font-bold text-lg tracking-wide"
          style={{ color: 'hsl(var(--brand-navbar-foreground))' }}
        >
          {context.title}
        </h1>
        <ThemeToggle />
      </div>
    </div>
  );    
}

export default Navbar;