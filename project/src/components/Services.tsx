import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RevealImageListItem } from './ui/reveal-images';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Typewriter } from './ui/typewriter';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Services = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  
  const services = [
    {
      number: '01',
      title: 'Corporate Events',
      tags: ['Professional Excellence', 'Business Impact'],
      path: '/services/corporate-events',
      images: [
        {
          src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
          alt: "Corporate Event 1"
        },
        {
          src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
          alt: "Corporate Event 2"
        }
      ]
    },
    {
      number: '02', 
      title: 'Live Concerts',
      tags: ['Spectacular Shows', 'Unforgettable Moments'],
      path: '/services/wedding-planning',
      images: [
        {
          src: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800",
          alt: "Concert 1"
        },
        {
          src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
          alt: "Concert 2"
        }
      ]
    },
    {
      number: '03',
      title: 'Event Production',
      tags: ['Technical excellence', 'Flawless execution'],
      path: '/services/event-production',
      images: [
        {
          src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
          alt: "Event Production 1"
        },
        {
          src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
          alt: "Event Production 2"
        }
      ]
    },
    {
      number: '04',
      title: 'Social Events',
      tags: ['Creating memories', 'Lasting impressions'],
      path: '/services/social-gatherings',
      images: [
        {
          src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
          alt: "Social Events 1"
        },
        {
          src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800",
          alt: "Social Events 2"
        }
      ]
    }
  ];

  useLayoutEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === 'undefined') return;

    // Wait for DOM to be ready
    const initializeAnimations = () => {
      if (!sectionRef.current || !headingRef.current || !servicesRef.current) return;

      // Kill existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Set initial states
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      gsap.set('.service-item', { opacity: 0, y: 50 });

      const ctx = gsap.context(() => {
        // Heading animation
        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            markers: false
          }
        });

        // Service items animation
        gsap.utils.toArray('.service-item').forEach((item, index) => {
          const isEven = index % 2 === 0;
          
          // Main animation
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
              markers: false
            }
          });

          // Number animation
          gsap.to(item.querySelector('.service-number'), {
            x: isEven ? 20 : -20,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              markers: false
            }
          });

          // Tags animation
          gsap.to(item.querySelector('.service-tags'), {
            x: isEven ? -10 : 10,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              markers: false
            }
          });
        });
      }, sectionRef);

      // Force ScrollTrigger refresh
      ScrollTrigger.refresh();

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    // Initialize animations after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeAnimations, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="mb-32">
          <span className="text-white/40 mb-4 block">(Our services)</span>
          <h2 className="text-[5vw] leading-[1.1] font-light tracking-tight">
            We're the studio that delivers{' '}
            <Typewriter 
              text={["exceptional", "remarkable", "outstanding", "extraordinary"]}
              speed={70}
              className="text-hurricane-red font-[100]"
              waitTime={2000}
              cursorChar="_"
            />{' '}
            events,
            <br />
            creating{' '}
            <Typewriter 
              text={["memorable", "unforgettable", "magical", "timeless"]}
              speed={70}
              className="text-hurricane-red font-[100]"
              waitTime={2000}
              cursorChar="_"
              initialDelay={1000}
            />
            <br />
            experiences.
          </h2>
        </div>

        <div ref={servicesRef} className="space-y-24">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="service-item group cursor-pointer relative"
              onClick={() => navigate(service.path)}
            >
              <div className="flex items-baseline gap-8 mb-6">
                <span className="service-number text-4xl font-light text-hurricane-red">{service.number}</span>
                <div className="relative">
                  <h3 className="text-[4vw] font-light tracking-tight group-hover:text-hurricane-red transition-colors">
                    {service.title}
                  </h3>
                  <div className="absolute top-0 -right-32">
                    <RevealImageListItem 
                      text=""
                      images={[service.images[0], service.images[1]]}
                    />
                  </div>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                  <span className="text-sm uppercase tracking-wider">View</span>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              
              <div className="service-tags flex gap-4 pl-24">
                {service.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm"
                  >
                    / {tag}
                  </span>
                ))}
              </div>

              <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mt-12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;