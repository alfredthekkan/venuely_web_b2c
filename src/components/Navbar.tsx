"use client";
import Link from "next/link";
import { NavigationContext } from "@/context/NavigationContext";
import { useContext } from "react";

function Navbar() {
  const context = useContext(NavigationContext)
  return (
    <div className="fixed right-0 left-0 flex flex-row items-center justify-between bg-green-100">
      <div className="flex w-full bg-emerald-700  justify-around p-4 font-semibol items-centerd">
        <h1 className="text-white font-bold">{context.title}</h1>
      </div>
    </div>
  );    
}

export default Navbar;