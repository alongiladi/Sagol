import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * A custom hook to apply a direction-aware highlighter "marker" animation.
 * 
 * @param containerRef Reference to the container element where the marker resides.
 * @param selector CSS selector to find the marker element(s) within the container. Default is '.donate-marker' or '.vision-marker', but should be specific to usage.
 */
export const useMarkerAnimation = (containerRef: React.RefObject<HTMLDivElement | null>, selector: string = '.marker') => {
    // Enabled for both languages
    const { language } = useLanguage();

    useGSAP(() => {
        const markers = containerRef.current?.querySelectorAll(selector);
        const isRTL = language === 'he';

        if (markers && markers.length > 0) {
            markers.forEach((marker) => {
                // Always animate Right-to-Left (Anchor Right -> "100% 0%")
                const bgPos = isRTL ? "100% 0%" : "0% 100%";

                // 1. Clean slate
                gsap.set(marker, { clearProps: 'all' });

                // 2. Initial State (Hidden, anchored correctly)
                gsap.set(marker, {
                    backgroundSize: "0% 100%",
                    backgroundPosition: bgPos
                });

                // 3. Animation
                gsap.fromTo(marker,
                    {
                        backgroundSize: "0% 100%",
                        backgroundPosition: bgPos
                    },
                    {
                        backgroundSize: "100% 100%",
                        backgroundPosition: bgPos,
                        duration: 1,
                        ease: "power2.out", // Smoother easing
                        scrollTrigger: {
                            trigger: marker,
                            start: "top 80%", // Trigger when marker enters 80% viewport
                            toggleActions: "play none none none" // Play once on enter, do nothing else
                        }
                    }
                );
            });
        }
    }, { scope: containerRef, dependencies: [language] });
};