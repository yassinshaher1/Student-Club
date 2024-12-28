"use client"
import { useRef, useEffect, useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import Image from 'next/image';

export default function ParallaxImage({ src, alt }) {
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const bounds = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (containerRef.current) {
            bounds.current = containerRef.current.getBoundingClientRect();
        }
    }, []);

    useLenis(({ scroll }) => {
        if (!imageRef.current || !containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const offsetTop = rect.top + scroll;
        const parallaxFactor = 0.35;
        const translateY = (scroll - offsetTop) * parallaxFactor;
        
        imageRef.current.style.transform = `translateY(${translateY}px) scale(1.2)`;
    });

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            {isLoading && (
                <div className="absolute inset-0 bg-secondary animate-pulse" />
            )}
            <Image
                ref={imageRef}
                src={src} 
                alt={alt}
                fill
                className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => {
                    setIsLoading(false);
                    imageRef.current.style.transform = 'translateY(0) scale(1.2)';
                }}
            />
        </div>
    );
}