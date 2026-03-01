import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { content } = useLanguage();
  const [volume, setVolume] = useState(0); // Start muted (0)
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVolume = useRef(1);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      lastVolume.current = volume;
      setVolume(0);
      if (videoRef.current) {
        videoRef.current.volume = 0;
        videoRef.current.muted = true;
      }
    } else {
      const newVolume = lastVolume.current || 0.5;
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
        videoRef.current.muted = false;
      }
    }
  };

  // Ensure video autoplay works reliably
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = volume === 0;
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-purple-950">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={volume === 0}
          playsInline
          className="w-full h-full object-cover opacity-100"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-purple-900/80 to-purple-950 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1a0b2e_100%)] opacity-0" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-heebo font-black mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-purple-400 drop-shadow-lg">
            {content.hero.title}
          </h1>

          <p className="text-xl md:text-2xl text-purple-100 font-alef leading-relaxed mb-10 max-w-3xl mx-auto drop-shadow-md">
            {content.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/emergency">
              <Button variant="glow" className="text-lg px-10 py-4 shadow-2xl shadow-purple-600/40">
                {content.hero.cta}
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button variant="secondary" className="text-lg px-10 py-4">
                {content.volunteerPage.title}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Volume Control Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        dir="ltr"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 md:left-8 md:translate-x-0 z-20 flex items-center gap-3 p-3 px-4 rounded-full bg-purple-950/40 backdrop-blur-sm border border-purple-500/30 shadow-lg"
      >
        <button
          onClick={toggleMute}
          className="text-purple-200 hover:text-white transition-colors focus:outline-none"
          aria-label={volume === 0 ? "בטל השתקה" : "השתק"}
        >
          {volume === 0 ? (
            <VolumeX className="w-5 h-5" />
          ) : volume < 0.5 ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-purple-700/30 rounded-lg appearance-none cursor-pointer slider"
          aria-label="עוצמת קול"
          style={{
            background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${volume * 100}%, rgba(124, 58, 237, 0.3) ${volume * 100}%, rgba(124, 58, 237, 0.3) 100%)`
          }}
        />
      </motion.div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.5);
        }
        .slider:hover::-webkit-slider-thumb {
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.8);
        }
        .slider:hover::-moz-range-thumb {
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.8);
        }
      `}</style>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-purple-400 pointer-events-none hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
