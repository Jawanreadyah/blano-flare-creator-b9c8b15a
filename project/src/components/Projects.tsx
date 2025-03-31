import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Projects = () => {
  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 bg-black relative">
      {/* Spline Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/IYl-4fJ6SKFAXTsm/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Overlay for better content visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      {/* More Info Button - Positioned to cover Spline watermark */}
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-4xl font-bold">Instagram</h2>
              <span className="text-hurricane-red">/</span>
              <p className="text-white/40">@zeal_itevents</p>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-4xl font-bold">Facebook</h2>
              <span className="text-hurricane-red">/</span>
              <p className="text-white/40">@zealitevents</p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-bold">X</h2>
              <span className="text-hurricane-red">/</span>
              <p className="text-white/40">@zeal_itevents</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a 
              href="https://www.instagram.com/zeal_itevents/?locale=en_US%2Cen_US&hl=en"
              target="_blank"
              rel="noopener noreferrer" 
              className="group inline-flex items-center gap-2 text-white/60 hover:text-white"
            >
              Follow on Instagram
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 -translate-y-1 transition-transform" />
            </a>
            <a 
              href="https://www.facebook.com/people/Zeal-it-Events/61573912498211/#"
              target="_blank"
              rel="noopener noreferrer" 
              className="group inline-flex items-center gap-2 text-white/60 hover:text-white"
            >
              Follow on Facebook
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 -translate-y-1 transition-transform" />
            </a>
            <a 
              href="https://x.com/zeal_itevents/"
              target="_blank"
              rel="noopener noreferrer" 
              className="group inline-flex items-center gap-2 text-white/60 hover:text-white"
            >
              Follow on X
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 -translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;