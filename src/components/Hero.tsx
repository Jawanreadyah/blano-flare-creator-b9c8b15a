import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setupScrollAnimation } from '../lib/animations';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const statsBarRef = useRef<HTMLDivElement>(null);
  const animationSetupRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!animationSetupRef.current) {
      setupScrollAnimation({
        sectionRef,
        contentRef,
        backgroundRef,
        statsItemsSelector: '.stats-item'
      });
      animationSetupRef.current = true;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setupScrollAnimation({
          sectionRef,
          contentRef,
          backgroundRef,
          statsItemsSelector: '.stats-item'
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, {
        opacity: 0.8,
        filter: 'blur(2px)',
        scale: 0.92,
        y: 20,
        transformOrigin: "center top"
      });
      
      gsap.to(contentRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5
      });
    }

    if (statsBarRef.current) {
      gsap.set(statsBarRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        clearProps: "all",
        overwrite: true
      });

      const statsItems = document.querySelectorAll('.stats-item');
      if (statsItems.length > 0) {
        gsap.fromTo(statsItems, 
          { y: 15, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1, 
            duration: 0.6, 
            ease: "power2.out",
            delay: 0.8
          }
        );
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline 
          scene="https://prod.spline.design/0crA6uZj0JFz7pUf/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Watermark Cover */}
      <div className="absolute bottom-4 right-4 z-50">
        <button className="group flex items-center gap-2 px-6 py-3 bg-black/80 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all">
          <span className="text-sm text-white/60 group-hover:text-white transition-colors">
            ZEAL IT EVENTS®
          </span>
        </button>
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-6 relative">
        <div ref={statsBarRef} className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-white/10 mt-20 gap-4">
          <div className="flex flex-wrap justify-center md:justify-start divide-x divide-white/10 font-modern">
            <div className="stats-item px-4 first:pl-0">
              <span className="block text-sm text-white/40 font-light">Years</span>
              <span className="block text-2xl font-light">8+</span>
            </div>
            <div className="stats-item px-4">
              <span className="block text-sm text-white/40 font-light">Events</span>
              <span className="block text-2xl font-light">1200+</span>
            </div>
            <div className="stats-item px-4">
              <span className="block text-sm text-white/40 font-light">Clients</span>
              <span className="block text-2xl font-light">450+</span>
            </div>
          </div>
          <a href="#contact" className="hidden md:flex items-center gap-2 text-sm text-white/60 hover:text-white font-modern">
            Visit Us <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter mb-8 font-modern">
            CRAFTING
            <br />
            EXPERIENCES
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mb-12 font-modern">
            From corporate gatherings to dream concerts, we transform visions into extraordinary moments.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-white/5 rounded-full border border-white/10 
              hover:bg-white/10 transition-all flex items-center gap-2 font-modern"
          >
            <span className="text-white font-light">Plan Your Event</span>
            <ArrowUpRight className="w-5 h-5 text-hurricane-grey" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;