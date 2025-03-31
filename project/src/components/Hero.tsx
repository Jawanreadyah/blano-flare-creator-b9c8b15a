import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Sparkles, Star, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlowingEffect } from './ui/glowing-effect';
import { setupScrollAnimation } from '../lib/animations';
import { gsap } from 'gsap';

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

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://framerusercontent.com/images/vTtqP4ogeNJlMUD9DCo7phi1YcI.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 0%',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-6 relative">
        <div ref={statsBarRef} className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-white/10 mt-20 gap-4">
          <div className="flex flex-wrap justify-center md:justify-start divide-x divide-white/10">
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
          <a href="#contact" className="hidden md:flex items-center gap-2 text-sm text-white/60 hover:text-white">
            Visit Us <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">
              Crafting
              <span className="text-hurricane-red block mt-2">Experiences</span>
            </h1>
            <p className="text-lg text-white/60 mb-8">
              From corporate gatherings to dream concerts, we transform visions into extraordinary moments.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="w-fit px-8 py-4 bg-white/5 rounded-full border border-white/10 
                hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <span className="text-white font-light">Plan Your Event</span>
              <ArrowUpRight className="w-5 h-5 text-hurricane-grey" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-20">
            {/* Purpose Card */}
            <div className="h-[400px] w-full relative hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-black/50 p-8">
                  <div className="relative flex flex-1 flex-col justify-between gap-4">
                    <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-white/5 p-2">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold tracking-tight">
                       Our Purpose & Goals
                      </h3>
                      <div className="space-y-4 text-white/60">
                        <p>
                          At Zeal IT Events, we're dedicated to redefining the art of event management. 
                          Our mission is to create extraordinary experiences that leave lasting impressions 
                          and exceed expectations.
                        </p>
                        <button 
                          onClick={() => navigate('/about')}
                          className="mt-4 px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 text-sm"
                        >
                          <span>Learn More About Us</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Environment Card */}
            <div className="h-[400px] w-full relative hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 overflow-hidden">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560')",
                  }}
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-gradient-to-b from-black/40 via-black/20 to-black/40 p-8">
                  <div className="relative flex flex-1 flex-col justify-between gap-4">
                    <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-white/5 backdrop-blur-[1px] p-2">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold tracking-tight">
                        Sustainable Events
                      </h3>
                      <div className="space-y-4 text-white/60">
                        <p>
                          We're committed to environmental responsibility in every event we organize. 
                          Our sustainable practices ensure minimal ecological impact while maximizing 
                          event success.
                        </p>
                        <button 
                          onClick={scrollToFooter}
                          className="mt-4 px-6 py-3 bg-white/5 backdrop-blur-[1px] rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 text-sm"
                        >
                          <span>Our Green Initiative</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;