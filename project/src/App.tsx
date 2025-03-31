import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Partners from './components/Partners';
import Impact from './components/Impact';
import Concert from './components/Concert';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import CorporateEvents from './pages/CorporateEvents';
import WeddingPlanning from './pages/WeddingPlanning';
import SocialGatherings from './pages/SocialGatherings';
import EventProduction from './pages/EventProduction';
import About from './pages/About';
import LoadingScreen from './components/LoadingScreen';
import AudioPlayer from './components/AudioPlayer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://od.lk/s/OTBfNDM5NjE2NDdf/Calm%20Mountains%20-%20Tibetan%20Healing%20Relaxation%20Music%20-%20Ethereal%20Meditative%20Ambient%20Music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      
      if (!isMuted && audioRef.current.paused) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => console.log("Play failed:", error));
        }
      }
    }
  }, [isMuted]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = `${clientX}px`;
        cursorDotRef.current.style.top = `${clientY}px`;
        
        requestAnimationFrame(() => {
          if (cursorOutlineRef.current) {
            cursorOutlineRef.current.style.left = `${clientX}px`;
            cursorOutlineRef.current.style.top = `${clientY}px`;
          }
        });
      }
    };

    const handleMouseOver = () => {
      document.body.classList.add('cursor-hover');
    };

    const handleMouseOut = () => {
      document.body.classList.remove('cursor-hover');
    };

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      
      if (isFirstLoad) {
        document.documentElement.style.scrollBehavior = 'smooth';
        setIsFirstLoad(false);
        
        setTimeout(() => {
          ScrollTrigger.refresh();
          ScrollTrigger.update();
          
          window.scrollTo({
            top: 1,
            behavior: 'smooth'
          });
        }, 200);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading, isFirstLoad]);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isLoading && appRef.current) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      setTimeout(() => {
        document.body.style.overflow = '';
        ScrollTrigger.refresh();
        ScrollTrigger.update();
        
        if (window.scrollY < 2) {
          window.scrollTo({
            top: 2,
            behavior: 'smooth'
          });
        }
      }, 500);
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    console.log("Loading complete, transitioning to main content");
    setIsLoading(false);
    
    setTimeout(() => {
      document.body.style.overflow = '';
      ScrollTrigger.refresh();
      ScrollTrigger.update();
      console.log("ScrollTrigger refreshed");
    }, 100);
  };

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-dot-outline"></div>

      {isLoading ? (
        <LoadingScreen 
          onLoadingComplete={handleLoadingComplete}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      ) : (
        <Router>
          <div ref={appRef} className="min-h-screen rounded-[40px] overflow-hidden bg-black relative">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Services />
                  <Projects />
                  <Concert />
                  <Partners />
                  <Impact />
                </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/corporate-events" element={<CorporateEvents />} />
              <Route path="/services/wedding-planning" element={<WeddingPlanning />} />
              <Route path="/services/social-gatherings" element={<SocialGatherings />} />
              <Route path="/services/event-production" element={<EventProduction />} />
            </Routes>
            <Footer />
            <AudioPlayer isMuted={isMuted} setIsMuted={setIsMuted} />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;