import React, { useEffect, useState } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';
import { TextScramble } from './ui/text-scramble';

const Concert = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const performers = [
    {
      image: "https://i.imghippo.com/files/EZfi3881F.jpg",
      alt: "Concert Performer 1"
    }
  ];

  const concertInfo = {
    about: {
      title: "About the Concert",
      content: (
        <div className="space-y-4 bg-gradient-to-b from-black/30 via-black/20 to-black/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
          <div className="relative z-10">
            <p>Join us for an unforgettable evening of music at the Qatar National Convention Center (QNCC).</p>
            <h3 className="text-xl font-bold mt-4">Featured Artists:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Manjari - Acclaimed Playback Singer</li>
              <li>Vipin Balan - Mimicry Artist</li>
              <li>Ashwin Vijayan - Playback Singer</li>
              <li>Anagha Narayanan - Cinema Actress</li>
            </ul>
            <p className="mt-4">Time: 7:00 PM - 11:00 PM</p>
            <p>Venue: Qatar National Convention Center (QNCC)</p>
          </div>
        </div>
      )
    },
    tickets: {
      title: "Tickets",
      content: (
        <div className="space-y-4 bg-gradient-to-b from-black/30 via-black/20 to-black/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
          <div className="relative z-10">
            <p>Tickets are available on Q-Tickets.com</p>
            <a 
              href="https://events.q-tickets.com/qatar/eventdetails/6245633452/raganilav---manjari-live-in-concert?_gl=1*61r091*_gcl_au*MTQ5ODk0Njg5Ny4xNzQzMDk1NDM1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors mt-4"
            >
              Book Now
            </a>
          </div>
        </div>
      )
    }
  };

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#1a0f00] to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1a0f00] to-transparent"></div>

      {/* Spline Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline 
          scene="https://prod.spline.design/0crA6uZj0JFz7pUf/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle Overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>

      {/* More Info Button */}
      <div className="absolute bottom-4 right-4 z-50">
        <button 
          onClick={scrollToFooter}
          className="group flex items-center gap-2 px-8 py-4 bg-black rounded-full border border-white/20 hover:bg-black/80 transition-all"
        >
          <span className="text-sm text-white">More Info</span>
          <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Large Title */}
        <div 
          className="absolute top-0 left-0 right-0 z-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <TextScramble
            as="h1"
            className="text-[120px] font-serif leading-none whitespace-nowrap overflow-hidden tracking-tight"
            trigger={isHovered}
            speed={0.02}
            duration={0.6}
          >
            Manjari Live in Concert
          </TextScramble>
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column - Concert Info */}
            <div className="md:col-span-3">
              <h3 className="text-xl font-bold mb-8">
                ZEAL IT
                <br />
                EVENTS
                <br />
                PRESENTS
              </h3>
              
              <nav className="space-y-4">
                {Object.entries(concertInfo).map(([key, { title }]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(activeSection === key ? null : key)}
                    className={`block text-left w-full ${
                      activeSection === key ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </nav>

              {/* Info Panel */}
              {activeSection && (
                <div className="mt-8">
                  {concertInfo[activeSection as keyof typeof concertInfo].content}
                </div>
              )}
            </div>

            {/* Right Column - Poster Frame */}
            <div className="md:col-span-9">
              <div className="relative group">
                {/* Inner Frame */}
                <div className="relative h-[600px] bg-black/20 backdrop-blur-sm rounded-lg p-4">
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    {/* Poster Image */}
                    <img 
                      src={performers[0].image}
                      alt={performers[0].alt}
                      className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 border border-white/20 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 text-sm text-white/40 tracking-wider">
                      QNCC • April 11, 2025
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

export default Concert;