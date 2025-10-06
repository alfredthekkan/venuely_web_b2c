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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <NavigationContext.Provider value={{title, setTitle}}>  
            <Navbar/>
            <AuthProvider>
                {children}
            </AuthProvider>
          </NavigationContext.Provider>
        </div>
      </body>
    </html>
  );
}
