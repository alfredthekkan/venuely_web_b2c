"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { useState } from 'react';
import { BookingContext, defaultBooking } from "@/context/BookingContext";

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

  const [booking, setBooking] = useState(defaultBooking);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      <BookingContext.Provider value={{booking, setBooking}}>
        <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
      </div>
      </BookingContext.Provider>
      
      </body>
    </html>
  );
}
