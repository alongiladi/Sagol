import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { WhoWeAreSection } from '../components/sections/WhoWeAreSection';
import { ActivitiesSection } from '../components/sections/ActivitiesSection';
import { DonateSection } from '../components/sections/DonateSection';
import { PartnersSection } from '../components/sections/PartnersSection';
import { VisionSection } from '../components/sections/VisionSection';

export const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Slight delay for mounting
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      <HeroSection />
      <VisionSection />
      <DonateSection />
      <AboutSection />
      <WhoWeAreSection />
      <ActivitiesSection />
      <PartnersSection />
    </main>
  );
};