import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';
import { useMarkerAnimation } from '../../hooks/useMarkerAnimation';

gsap.registerPlugin(ScrollTrigger);

export const VisionSection: React.FC = () => {
    const { content } = useLanguage();

    return (
        <section id="vision" className="py-16 md:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="h-full flex flex-col text-center">
                        {content.about.todayTitle && <h3 className="text-2xl font-bold text-white mb-6">{content.about.todayTitle}</h3>}
                        <div className="mb-4">
                            {content.about.todayStory.map((para: string, i: number) => (
                                <p key={i} className="text-purple-100 mb-6 leading-relaxed text-lg md:text-xl font-medium">
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Testimonials */}
                        <div className="mt-4">
                            {content.about.testimonials && content.about.testimonials.map((testimonial: any, index: number) => (
                                <div key={index} className="relative py-4">
                                    {/* Stylish Separator */}
                                    <div className="w-3/4 mx-auto h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent mb-8" />

                                    <div className="relative px-4">
                                        <p className="text-xl md:text-2xl text-white mb-4 italic font-serif leading-relaxed">
                                            "{testimonial.text}"
                                        </p>
                                        <p className="text-purple-300 font-bold tracking-wide text-sm opacity-80">
                                            — {testimonial.author}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <VisionContent />
                </div>
            </div>
        </section>
    );
};

const VisionContent = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { content, language } = useLanguage();

    useGSAP(() => {
        const items = containerRef.current?.querySelectorAll('.vision-item');
        if (items) {
            gsap.fromTo(items,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }
    }, { scope: containerRef, dependencies: [language] });

    useMarkerAnimation(containerRef, '.vision-marker');

    return (
        <div ref={containerRef} className="relative py-4">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white to-purple-200 mb-10 relative z-10">
                {content.about.visionTitle}
            </h3>

            <ul className="space-y-8 relative z-10">
                {content.about.visionPoints.map((point: string, i: number) => (
                    <li key={i} className="vision-item flex items-center gap-6 group">
                        <div className="flex-shrink-0 relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 z-10 relative">
                                {i + 1}
                            </div>
                            <div className="absolute inset-0 bg-purple-600 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                            {i !== content.about.visionPoints.length - 1 && (
                                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500/30 to-transparent -z-10" />
                            )}
                        </div>

                        <div className="pt-1 relative">
                            <span className={`transition-colors duration-300 text-xl font-medium relative z-10 leading-relaxed ${i === 2
                                ? 'marker marker--purple vision-marker text-white font-bold group-hover:text-purple-100'
                                : 'text-purple-100 group-hover:text-white'
                                }`}>
                                {point}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
