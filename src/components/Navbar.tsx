"use client";
import Link from "next/link";
import { NavigationContext } from "@/context/NavigationContext";
import { useContext } from "react";

function Navbar() {
  const context = useContext(NavigationContext)
  return (
    <div className="flex flex-row items-center justify-between bg-green-100">
      <div className="p-4 font-bold text-lg">
        <h1> </h1>
      </div>
      <div className="p-4 font-semibold">
        <h1>{context.title}</h1>
      </div>

    <Link href="/booking/step1" className="text-green-800 p-4 font-semibold opacity-90">
        More Services
    </Link>

    </div>
  );    
}

export default Navbar;