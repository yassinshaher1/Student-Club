"use client"
import { useState, useEffect } from 'react';
import Hero from "../../../components/hero/Hero";
import AdvantagesAndValues from "../../../components/advantages/Advantages";
import Banner from "../../../components/banner/Banner";
import Footer from "../../../components/footer/Footer";
import Preloader from "../../../components/Preloader/preloader";
import Description from "../../../components/Description/index";
import SlidingImages from "../../../components/SlidingImages/index";
import Events from "../../../components/events/index";

import { ReactLenis } from "@studio-freight/react-lenis";
import { AnimatePresence } from 'framer-motion';

export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
      (
        async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default
            const locomotiveScroll = new LocomotiveScroll();
  
            setTimeout( () => {
              setIsLoading(false);
              document.body.style.cursor = 'default'
              window.scrollTo(0,0);
            }, 2000)
        }
      )()

      
    }, [])
  
    return (
        
        <ReactLenis root options={{ 
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false
        }}>
            <main className="relative w-full overflow-hidden">
            <AnimatePresence mode='wait'>
            {isLoading && <Preloader />}
            </AnimatePresence>
                <Hero />
                <Description />
                <AdvantagesAndValues />
                <Events showAll={false} sortBy="date" sortOrder="asc" />
              
                <SlidingImages />
                <Banner />
                <Footer />
            </main>
        </ReactLenis>
    );
} 