"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function SafeImage({
  src,
  alt,
  width = 300,
  height = 200,
  className = "",
}: SafeImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative w-[${width}px] h-[${height}px]`}>
      {/* Loading skeleton */}
      {loading && !error && <Skeleton className="w-full h-full rounded-xl" />}

      {/* Error state */}
      {error && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl text-gray-400 text-sm">
          Image not available
        </div>
      )}

      {/* Actual Image */}
      {!error && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover rounded-xl transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          } ${className}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
}
