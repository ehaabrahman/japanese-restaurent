import React from 'react';
import { Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  return (
    <footer className="w-full bg-[#fbebe5] text-[#221a17] mt-auto pt-10 sm:pt-14 pb-8 border-t border-[#efdfda] shadow-[0_-2px_12px_rgba(34,26,23,0.03)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#efdfda]">
          {/* Col 1: Brand & Philosophy */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#bd2a1d] text-white flex items-center justify-center font-display text-base font-bold shadow-xs">
                心
              </div>
              <span className="font-display text-lg text-[#221a17] font-bold tracking-tight">
                KOKORO
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5a403c] leading-relaxed">
              Artisanal tonkotsu broths, hand-rolled sushi, crisp gyoza, and handcrafted Zen Chai bubble teas served with genuine Omotenashi spirit.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded bg-[#efdfda] text-xs font-semibold text-[#5a403c]">
                Halal Certified Meats
              </span>
              <span className="px-2.5 py-1 rounded bg-[#c7e6dc] text-xs font-bold text-[#304c45]">
                Dedicated Veg Kitchen
              </span>
            </div>
          </div>

          {/* Col 2: Bengaluru Outpost */}
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
            <h4 className="font-display text-base font-bold text-[#221a17]">
              Bengaluru Outpost
            </h4>
            <p className="text-[#5a403c] leading-relaxed">
              Level 3, Food Court Adjacent,<br />
              Nexus Vega City Mall, Srinivas Industrial Estate,<br />
              Bannerghatta Main Rd, Bengaluru 560076
            </p>
            <div className="pt-1">
              <a
                className="font-bold text-[#9a0c06] hover:text-[#bd2a1d] transition-colors flex items-center gap-1.5"
                href="tel:08050685249"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct: 080506 85249</span>
              </a>
            </div>
          </div>

          {/* Col 3: Service Hours */}
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
            <h4 className="font-display text-base font-bold text-[#221a17]">
              Service Hours
            </h4>
            <div className="flex flex-col gap-1.5 text-[#5a403c]">
              <div className="flex justify-between">
                <span>Mon – Thu</span>
                <span className="font-bold text-[#221a17]">11:30 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Fri – Sun</span>
                <span className="font-bold text-[#221a17]">11:30 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between text-[#48645c] font-bold pt-1">
                <span>Takeaway &amp; Delivery</span>
                <span>Until 11:30 PM</span>
              </div>
            </div>
          </div>

          {/* Col 4: Dietary Reassurance & Links */}
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
            <h4 className="font-display text-base font-bold text-[#221a17]">
              Dietary Reassurance
            </h4>
            <p className="text-xs text-[#5a403c] leading-relaxed">
              Every broth, roll, and sauce is prepared with rigorous separation between pure vegetarian (Green Seal) and authentic meat/seafood (Red Seal) preparations.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold">
              <a
                className="text-[#5a403c] hover:text-[#9a0c06] transition-colors"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <span className="text-[#e3beb8]">·</span>
              <a
                className="text-[#5a403c] hover:text-[#9a0c06] transition-colors"
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
              >
                Google Maps
              </a>
              <span className="text-[#e3beb8]">·</span>
              <a
                className="text-[#5a403c] hover:text-[#9a0c06] transition-colors"
                href="https://zomato.com"
                target="_blank"
                rel="noreferrer"
              >
                Zomato
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#8f706b]">
          <p>© 2024 Kokoro Ramen &amp; Japanese Soul Food. All rights reserved. Nexus Vega City Mall, Bengaluru.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => alert('Allergen information: Contains gluten, soy, sesame. Nut-free broths available on request. Please inform our chef of any allium or seafood allergies.')}
              className="hover:text-[#221a17] transition-colors cursor-pointer"
            >
              Allergen Guide
            </button>
            <button
              onClick={() => alert('Kokoro Privacy Policy: We only collect your contact number for real-time order pickup and table reservation confirmations.')}
              className="hover:text-[#221a17] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenReservation}
              className="hover:text-[#221a17] transition-colors cursor-pointer"
            >
              Table Reservation Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
