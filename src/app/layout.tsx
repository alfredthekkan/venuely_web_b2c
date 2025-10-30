"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from 'react';
import { NavigationContext } from '@/context/NavigationContext'
import Navbar from "@/components/Navbar";
import { AuthProvider, useAuth  } from '@/context/AuthContext'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      const [title, setTitle] = useState("Home")
return (
    <html lang="en" style={{ backgroundColor: 'hsl(var(--brand-background))' }}>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: 'hsl(var(--brand-background))' }}
      >
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'hsl(var(--brand-background))' }}>
          <NavigationContext.Provider value={{title, setTitle}}>  
            <Navbar/>
            <main className="pt-16" style={{ backgroundColor: 'hsl(var(--brand-background))' }}>
              <AuthProvider>
                  {children}
              </AuthProvider>
            </main>
          </NavigationContext.Provider>
        </div>
      </body>
    </html>
  );
}
