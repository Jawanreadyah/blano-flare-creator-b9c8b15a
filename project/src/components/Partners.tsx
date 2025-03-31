import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Partners = () => {
  const partners = [
    {
      name: 'Mitsubishi Motors',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mitsubishi_motors_new_logo.svg/800px-Mitsubishi_motors_new_logo.svg.png',
      category: 'Title Sponsor'
    },
    {
      name: 'Sea Shell Savoury',
      logo: 'https://i.imghippo.com/files/EgxK4107R.png',
      category: 'Hospitality'
    },
    {
      name: 'Reyada',
      logo: 'https://www.reyadamedicalcentre.com/images/logo.webp',
      category: 'Medical'
    },
    {
      name: '98.6',
      logo: 'https://radio986.com/img/radio-986.png',
      category: 'Radio'
    },
    {
      name: 'Anish Grid',
      logo: 'https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img/https://anishgrid.com/wp-content/uploads/2021/06/footer-logo.png',
      category: 'Photography'
    },
    {
      name: 'Q-tickets',
      logo: 'https://www.q-tickets.com/Images/NewDesign/qtickets.png',
      category: 'Ticketing'
    },
    {
      name: 'Naturals',
      logo: 'https://naturalsqatar.com/wp-content/uploads/2024/09/Naturals-Logo-2-04.png',
      category: 'Saloon'
    },
    {
      name: 'Aries Global',
      logo: 'https://i.imghippo.com/files/LJwZ6297abA.png',
      category: 'Logistics'
    },
    {
      name: 'Adobe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/849px-Emirates_logo.svg.png',
      category: 'Aviation'
    },
    {
      name: 'Rolex',
      logo: 'https://d21buns5ku92am.cloudfront.net/69647/images/433145-qatar-airways_logo-967f6f-medium-1654772400.png',
      category: 'Aviation'
    },
  ];

  return (
    <section className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-4xl font-bold">Partners</h2>
              <span className="text-[#4a9eff]">/</span>
              <p className="text-white/40">Companies we partner with</p>
            </div>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-white/60 hover:text-[#4a9eff]">
            View all Partners
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 -translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group relative flex flex-col items-center justify-center h-40"
            >
              <img 
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-24 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-sm text-white/20 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                {partner.category}
              </span>
              <div className="absolute inset-0 bg-[#4a9eff]/5 opacity-0 group-hover:opacity-100 -z-10 rounded-xl transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;