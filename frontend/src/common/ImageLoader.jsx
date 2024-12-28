"use client"
import { useState } from 'react';
import Image from 'next/image';

export default function ImageLoader({ src, alt }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-secondary animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
} 