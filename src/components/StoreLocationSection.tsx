import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, ShoppingBag, Copy, Check } from 'lucide-react';

interface StoreLocationSectionProps {
  onOpenOrder: () => void;
}

export const StoreLocationSection: React.FC<StoreLocationSectionProps> = ({
  onOpenOrder,
}) => {
  const [copied, setCopied] = useState(false);

  const address =
    'Srinivas Industrial Estate, Unit No RES 5, Third Floor Nexus Vega City Mall, 172/1, Bannerghatta Main Rd, Dollar Layout, BTM Layout 2nd Stage, Bengaluru, Karnataka 560076';

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-10 sm:py-14 bg-[#fff1ec]/70 border-t border-[#efdfda]/70" id="location-and-hours">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Location Visual Atmosphere */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-md bg-[#fbebe5] relative border border-[#efdfda]">
              <img
                alt="Kokoro Ramen and Zen Chai counter at Nexus Vega City Mall"
                className="w-full h-[320px] sm:h-[380px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAx_MEEWFrrEuHPP6dfSqIuwRJvswXkwZpm7WcizoZJwDdTtL6bGONWwRp-V0hPHaXq_E-OcQz9awk5fATOJxa2-QYNLz2nJlE62FT4X-FnJtqaABjKPwmI79V22XebiKGPxjmOdSXsNRybsKezsK76IdGsjQscaIbUm5w7woyGRsmrd6Idv873zNTyuczU2Jf-eKuJJgivZ-ObcW5mvfKHEwz29JJlCpySd2g2e8rDUqAPTY7WUXVL6GgCqBmC0xbzA"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6">
                <span className="px-3 py-1 rounded-md bg-[#bd2a1d] text-white text-xs font-bold w-max mb-1.5 shadow-xs">
                  Mall Level 3
                </span>
                <p className="font-display text-lg sm:text-2xl text-white font-bold">
                  Authentic Izakaya Hospitality
                </p>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                  Counter dining &amp; food court seating with swift Omotenashi service.
                </p>
              </div>
            </div>
          </div>

          {/* Address & Contact Details */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-1.5 text-[#9a0c06] text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>Bengaluru Flagship Location</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-[#221a17] font-bold mb-3">
              Visit Us at Nexus Vega City Mall
            </h2>

            <p className="text-sm text-[#5a403c] mb-5 leading-relaxed">
              Conveniently located on the 3rd Floor food terrace of Nexus Vega City Mall. Whether you're dropping by during work lunch, catching dinner before a movie, or craving authentic boba on Bannerghatta Road, our broths are hot and ready.
            </p>

            {/* Address Box */}
            <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-[#efdfda] mb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#9a0c06] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#221a17] leading-relaxed">
                    <strong className="font-bold">Address:</strong> {address}
                  </p>
                </div>
                <button
                  onClick={copyAddress}
                  title="Copy full address"
                  className="p-1.5 rounded-lg text-[#5a403c] hover:text-[#9a0c06] hover:bg-[#fff1ec] transition-colors shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-[#48645c]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Store Timing & Phone Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 bg-[#fbebe5] rounded-xl flex items-center gap-3 border border-[#efdfda]">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#48645c] shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#5a403c] block font-medium">Kitchen Hours</span>
                  <span className="text-xs sm:text-sm font-bold text-[#221a17]">
                    11:30 AM – 10:30 PM
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#fbebe5] rounded-xl flex items-center gap-3 border border-[#efdfda]">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#9a0c06] shadow-2xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#5a403c] block font-medium">Store Desk</span>
                  <a
                    href="tel:08050685249"
                    className="text-xs sm:text-sm font-bold text-[#9a0c06] hover:underline"
                  >
                    080506 85249
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://maps.google.com/?q=Nexus+Vega+City+Mall+Bannerghatta+Road+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#bd2a1d] text-white text-xs sm:text-sm font-bold hover:bg-[#9a0c06] transition-colors flex items-center gap-2 shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Mall Directions</span>
              </a>

              <button
                onClick={onOpenOrder}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-white text-[#221a17] text-xs sm:text-sm font-bold hover:bg-[#fff1ec] transition-colors flex items-center gap-2 border border-[#efdfda] shadow-2xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#48645c]" />
                <span>Pickup Order Online</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
