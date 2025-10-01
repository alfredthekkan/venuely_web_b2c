"use client";
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

type ButtonProps = {
  title: string;
  onClick?: () => void;
};

export default function Button({title, onClick}: ButtonProps) {
  return (
    <button onClick={onClick} className={`${inter.className} font-bold bg-yellow-500 h-auto text-white rounded-3xl p-2 hover:bg-yellow-600 w-full`}>
      {title}
    </button>
  );
}
