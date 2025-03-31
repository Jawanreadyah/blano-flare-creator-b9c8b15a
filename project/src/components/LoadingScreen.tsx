import React, { useEffect, useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { Code2, MousePointer, ArrowUpRight } from 'lucide-react';
import { setupScrollPrompt, handleScrollDismiss } from '../lib/animations';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const LoadingScreen = ({ onLoadingComplete, isMuted, setIsMuted }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const interactionHintRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 4000;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(timer);
        setLoadingComplete(true);
        
        if (scrollPromptRef.current) {
          gsap.fromTo(scrollPromptRef.current, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.inOut" }
          );
          
          setupScrollPrompt({ scrollPromptRef });
        }
        
        gsap.to(contentRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.inOut"
        });

        setTimeout(() => {
          if (document.body.style.overflow === 'hidden') {
            dismissLoadingScreen();
          }
        }, 8000);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && interactionHintRef.current) {
        setHasInteracted(true);
        gsap.to(interactionHintRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (interactionHintRef.current) {
              interactionHintRef.current.style.display = 'none';
            }
          }
        });
      }
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  const dismissLoadingScreen = () => {
    if (scrollPromptRef.current && overlayRef.current && loadingComplete) {
      gsap.to(scrollPromptRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.inOut"
      });
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(onLoadingComplete, 300);
        }
      });
    }
  };

  useEffect(() => {
    if (loadingComplete) {
      const cleanup = handleScrollDismiss({
        scrollPromptRef,
        overlayRef,
        onComplete: onLoadingComplete
      });

      const handleKeyDown = () => dismissLoadingScreen();
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        cleanup && cleanup();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [loadingComplete, onLoadingComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50">
      <div className="absolute inset-0 w-screen h-screen">
        <Spline 
          scene="https://prod.spline.design/vWJQmJoNNGz9TNeI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div 
          ref={interactionHintRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
        >
          <MousePointer className="w-8 h-8 text-white/80 animate-bounce" />
          <span className="text-white/80 text-sm font-light tracking-wider flex items-center gap-2">
            Click & Drag to Interact
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        <div 
          ref={scrollPromptRef}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 cursor-pointer pointer-events-auto"
          onClick={dismissLoadingScreen}
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-5 h-9 border-2 border-white/80 rounded-full flex justify-center p-1">
              <div className="mouse-wheel w-1 h-1 bg-white/80 rounded-full"></div>
            </div>
          </div>
          <span className="text-white text-sm font-light tracking-wider uppercase">
            Scroll Down
          </span>
        </div>

        <div ref={contentRef} className="absolute bottom-16 left-0 right-0 flex flex-col items-center">
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-white/60 text-sm font-light tracking-wider">
            LOADING {Math.round(progress)}%
          </div>
        </div>

        {/* Watermark Cover */}
        <div className="absolute bottom-4 right-4 z-[60]">
          <button className="group flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all">
            <Code2 className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            <span className="text-sm text-white/60 group-hover:text-white transition-colors">
              Built by Dev Technologies
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;