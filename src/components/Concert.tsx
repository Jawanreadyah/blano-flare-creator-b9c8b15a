import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Concert = () => {
  return (
    <section className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Added heading section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-4xl font-bold">Upcoming Concert</h2>
              <span className="text-hurricane-red">/</span>
              <p className="text-white/40">Live performances</p>
            </div>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-white/60 hover:text-white">
            View all Events
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 -translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Concert Poster - Updated to movie poster style */}
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden group">
            <img 
              src="https://i.imghippo.com/files/EZfi3881F.jpg"
              alt="Manjari Live in Concert"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>
            
            {/* Poster Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="text-center">
                <p className="text-white/80 text-sm tracking-wider mb-2">ZEAL IT EVENTS PRESENTS</p>
                <h2 className="text-4xl font-bold mb-2">MANJARI</h2>
                <p className="text-white/60">LIVE IN CONCERT</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-white/80 mb-2">QNCC • APRIL 11, 2025</p>
                <p className="text-sm text-white/60">7:00 PM - 11:00 PM</p>
              </div>
            </div>
            
            {/* Poster Border Glow Effect */}
            <div className="absolute inset-0 border-2 border-white/10 rounded-2xl group-hover:border-white/20 transition-colors"></div>
          </div>

          {/* Concert Info & Booking */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-light mb-4">Manjari Live in Concert</h2>
              <p className="text-white/60">
                Join us for an unforgettable evening of music at the Qatar National Convention Center (QNCC).
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Featured Artists:</h3>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>Manjari - Acclaimed Playback Singer</li>
                <li>Vipin Balan - Mimicry Artist</li>
                <li>Ashwin Vijayan - Playback Singer</li>
                <li>Anagha Narayanan - Cinema Actress</li>
              </ul>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-white/40 mb-1">Time</p>
                <p className="text-lg">7:00 PM - 11:00 PM</p>
              </div>
              <div>
                <p className="text-sm text-white/40 mb-1">Venue</p>
                <p className="text-lg">Qatar National Convention Center</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              {/* Q-Tickets Logo */}
              <img 
                src="https://www.q-tickets.com/Images/NewDesign/qtickets.png"
                alt="Q-Tickets"
                className="h-8 object-contain"
              />
              <a 
                href="https://events.q-tickets.com/qatar/eventdetails/6245633452/raganilav---manjari-live-in-concert"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-colors"
              >
                Book Now
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Concert;