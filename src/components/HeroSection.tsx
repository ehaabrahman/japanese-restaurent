import React from 'react';
import { ArrowDown, Phone, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onViewCombos: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onViewCombos,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#fff8f6] py-8 sm:py-12 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Mall Operational Badge Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#fbebe5] text-[#221a17] text-xs sm:text-sm font-semibold shadow-xs border border-[#efdfda]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#48645c] animate-ping"></span>
            <span className="font-bold text-[#48645c]">Open Now</span>
            <span className="text-[#8f706b]">·</span>
            <span>Closes 10:00 PM</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#fff1ec] text-[#5a403c] text-xs sm:text-sm font-medium border border-[#efdfda]/60">
            <MapPin className="w-4 h-4 text-[#9a0c06] shrink-0" />
            <span>3rd Floor Nexus Vega City Mall, Bengaluru</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#c7e6dc] text-[#304c45] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Zen Chai Boba Bar Inside
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9a0c06]">
                こだわりの一杯 · Soulful Hospitality
              </span>
              <span className="h-0.5 w-8 bg-[#9a0c06]"></span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#221a17] font-bold tracking-tight leading-[1.12] mb-4">
              Heartfelt Broths.<br />
              <span className="text-[#bd2a1d]">Handcrafted</span> Noodles.<br />
              Authentic Soul.
            </h1>

            <p className="text-base sm:text-lg text-[#5a403c] max-w-xl mb-6 sm:mb-8 leading-relaxed">
              Experience artisanal simmered tonkotsu, crisp tempura, masterfully rolled sushi, comforting donburi bowls, and handcrafted Zen Chai bubble teas right in the vibrant heart of Bannerghatta Road.
            </p>

            {/* CTAs & Micro Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreMenu}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#bd2a1d] text-white text-sm sm:text-base font-bold shadow-md hover:bg-[#9a0c06] transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>Explore Live Menu</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>

              <a
                href="tel:08050685249"
                className="px-5 sm:px-6 py-3.5 rounded-xl bg-[#f5e5e0] text-[#221a17] text-sm sm:text-base font-semibold hover:bg-[#efdfda] transition-colors flex items-center justify-center gap-2 border border-[#efdfda]"
              >
                <Phone className="w-4 h-4 text-[#9a0c06]" />
                <span>080506 85249</span>
              </a>
            </div>

            {/* Quick Quality Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 w-full border-t border-[#efdfda]/60 mt-6">
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl text-[#9a0c06] font-bold">12+ Hrs</span>
                <span className="text-xs text-[#5a403c]">Simmered Broth</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl text-[#48645c] font-bold">100% Sep</span>
                <span className="text-xs text-[#5a403c]">Veg &amp; Halal Kitchen</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl text-[#773c00] font-bold">4.8 ★</span>
                <span className="text-xs text-[#5a403c]">Google Reviews</span>
              </div>
            </div>
          </div>

          {/* Visual Mosaic Column */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-3 sm:gap-4">
            {/* Main Hero Bowl (Tonkotsu) */}
            <div className="col-span-7 row-span-2 rounded-2xl overflow-hidden shadow-md bg-[#fff1ec] group relative border border-[#efdfda]/80">
              <img
                alt="Kokoro Signature Tonkotsu Ramen with marinated egg, tender chashu cuts, nori, bok choy, and spring onion in rich simmered broth"
                className="w-full h-full min-h-[290px] sm:min-h-[340px] object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDXNUoPbZmDrirkhKAkOAxjUc1pHc1qhd5obSMjfmqD12wwdIdHgrFWWGLc7Zmxt4CHEM-t5EMe_aGNFFjwy8vhQ-PDFGLPCK9PQWPQ1Wa0sh0VNTAXceSs4PFB6XxohN5EGUXscRgcNGYPDZS9xWOOOtSC0QvKcgn1lmXgnMQbrr_f-2NWJyfI4fFebA7MoLb_ZVsK0h4s-ttvvSY_3QwMRgISysAsKlWAuBZdG4uo8y52TTDFunFOLrCaZo0u2bJPQ"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-5">
                <span className="text-white text-[11px] font-bold bg-[#9a0c06] px-2.5 py-0.5 rounded w-max mb-1.5 shadow-xs">
                  Signature Dish
                </span>
                <p className="text-white font-display text-lg sm:text-xl font-bold">
                  Tonkotsu Soul Ramen
                </p>
                <p className="text-white/85 text-xs">
                  Rich broth with springy handmade noodles
                </p>
              </div>
            </div>

            {/* Live Prep Card */}
            <div className="col-span-5 rounded-2xl overflow-hidden shadow-sm bg-[#fbebe5] relative group h-36 sm:h-44 border border-[#efdfda]/80">
              <img
                alt="Chef handcrafting artisan sushi rolls at modern counter"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMY5Gr3zW6F-pxX7Oh0DFjnqmHDd84YVoMZkOFPgjvl7nNef0J6DNfdiUvkdFd8qyD2DpkSJnvomvGC6NybUk1pt3hSri40DNsETJF8ANGvZbhRic_Mwe8CGQb76dppW5oP-hC3Q3mXVEpDHG5NYlJCAZdlciKfuQ08AKKUyA-hlVP9Eg03IrxYDcPMlzU5C9RVXVFQpRdrYh7NnPNflxd4dgiCfHhHe3re5YvTDuqCpu7O-64uibyTCNkicANnF2W-A"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3">
                <span className="text-white text-xs font-bold drop-shadow-sm">
                  Artisan Sushi Bar
                </span>
              </div>
            </div>

            {/* Storefront Card */}
            <div className="col-span-5 rounded-2xl overflow-hidden shadow-sm bg-[#fbebe5] relative group h-36 sm:h-44 border border-[#efdfda]/80">
              <img
                alt="Warm illuminated wooden timber counter of Kokoro Ramen at Vega City Mall"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmTE48yINaxAGJcmeH6uACzqxpeyjLnIjGSPvUYUWQpFP7b2CRZFlKeTI5H-U3QqjND3H54hcqgITtRXq0gzzrzCsugbt4rHTfpGTNEWEz_aB2MdRbneTbel17jARRA4Hy8kiuJERH-VYF26eEo6d_ZdvxGdim-usUAh95erSq7Vi04pNxw741EpnXAku_em_HHAKPqJ9o0-ZcZEMz-zM7Wwk4oNTN0RbGZOrM_Y0yHcJBlNe3sbq1AOiOFCHoChWl0Q"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3">
                <span className="text-white text-xs font-bold drop-shadow-sm">
                  Vega City Counter
                </span>
              </div>
            </div>

            {/* Dining Combo Banner Below Grid */}
            <div className="col-span-12 rounded-xl bg-[#f5e5e0] p-3 sm:p-4 flex items-center justify-between shadow-xs border border-[#efdfda]">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#efdfda]">
                  <img
                    alt="Full dining tray combo"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnThVhjI4u0ykTrViM3cYHRFEm0Pzf_k4sUomDem1etM-xxVJXpVWiBy9QmrrndhWhAwFJ3lz2e8dUBbFW5h8Iy4WnLbH-xDU_60ZEjy6Nyvf0cq32WwHi5-XXTcaNAu2PPvsjZ7KndWfjgKjuRYd4h6-NwGWS5mo0psIHGRah1nHnH4hADjq15Q92BJkBqFrMOAOyAB_B3RmE5CidFzVLmWCzKz-SYv9c9kOhX1Pm5asMjnsXzx1YbTrHkxzqxuXrJg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-display text-sm sm:text-base font-bold text-[#221a17] leading-snug">
                    Soulful Combos From ₹690
                  </p>
                  <p className="text-xs text-[#5a403c]">
                    Includes choice of Ramen or Donburi + Crispy Gyoza + Zen Chai Drink
                  </p>
                </div>
              </div>
              <button
                onClick={onViewCombos}
                className="hidden sm:inline-flex px-3.5 py-2 rounded-lg bg-white text-[#221a17] text-xs font-bold hover:bg-[#fff1ec] shadow-xs border border-[#efdfda] transition-colors cursor-pointer"
              >
                View Combos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
