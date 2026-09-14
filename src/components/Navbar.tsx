import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, Clock, MapPin, Calendar } from 'lucide-react';
import { MenuCategory } from '../types';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string, category?: MenuCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'at-a-glance', label: 'At a Glance' },
    { id: 'craft-ramen', label: 'Craft Ramen', category: 'ramen' as MenuCategory },
    { id: 'artisan-sushi', label: 'Artisan Sushi', category: 'sushi' as MenuCategory },
    { id: 'donburi-and-starters', label: 'Donburi & Starters', category: 'donburi' as MenuCategory },
    { id: 'zen-chai-bubble-tea', label: 'Zen Chai Bubble Tea', category: 'zen-chai' as MenuCategory },
    { id: 'location-and-hours', label: 'Location & Hours' },
  ];

  const handleNavClick = (id: string, category?: MenuCategory) => {
    onTabChange(id, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#efdfda]/60 shadow-[0_2px_12px_rgba(34,26,23,0.05)] transition-all">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => handleNavClick('at-a-glance')}
            className="flex items-center gap-2.5 group text-left transition-transform active:scale-98"
            aria-label="Kokoro Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#bd2a1d] text-white flex items-center justify-center font-display text-lg font-bold shadow-sm transition-transform group-hover:scale-105">
              心
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg text-[#221a17] font-bold tracking-tight">
                  KOKORO
                </span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#c7e6dc] text-[#304c45] uppercase tracking-wider font-bold">
                  心
                </span>
              </div>
              <span className="text-[11px] text-[#5a403c] tracking-wider uppercase font-semibold">
                Ramen &amp; Japanese Soul Food
              </span>
            </div>
          </button>

          {/* Operational Hours Pill (Desktop XL) */}
          <div className="hidden xl:flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#fbebe5] text-[#221a17] border border-[#efdfda]/80">
            <span className="w-2 h-2 rounded-full bg-[#48645c] animate-pulse"></span>
            <span className="text-xs text-[#5a403c] font-medium">
              Open · Closes 10 PM · Vega City Mall
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#fff1ec] p-1.5 rounded-xl border border-[#efdfda]/50">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.category)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#bd2a1d] text-white font-bold shadow-sm'
                    : 'text-[#5a403c] hover:text-[#221a17] hover:bg-[#fbebe5]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Reservation / Order CTA */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#9a0c06] text-white text-xs sm:text-sm font-semibold hover:bg-[#bd2a1d] transition-all shadow-[0_4px_12px_rgba(189,42,29,0.2)] active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Order Online / Reserve</span>
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-[#fbebe5] hover:bg-[#f5e5e0] text-[#221a17] transition-colors border border-[#efdfda] active:scale-95"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#9a0c06]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#48645c] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <div className="pl-1 hidden sm:flex items-center">
            <img
              alt="Guest Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#bd2a1d]/20"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UhJPsHLksjdagjaGcezhbr-kNA72Qz6mNxvEtlk9ZLFdw1TZ3567TO96eQP05Ldlt5Og0oOFebS34WGQSidTY15lA7kCKMLmHDf4C2dSZIABde1g51nBYlSHBH3btVM5jIhB7l-p1CqwRVBFm0cJMNnuyP9rDPLVqUNSejQXEYEwTbBUaCSB4OiCpFNqdcRyvt7bwS9AKS9P9kjW88rW2WD9b5DV0vMSDQlM93cRHMuiww0QaEHQcQtDJT0jov_MbBqNKguMPA"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#221a17] hover:bg-[#fbebe5] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#efdfda] bg-[#fff8f6] px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-[#fff1ec] text-xs text-[#5a403c] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#48645c] animate-pulse"></span>
            <span>Open today 11:30 AM – 10:30 PM · Vega City Mall, 3rd Floor</span>
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.category)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#bd2a1d] text-white font-bold'
                    : 'text-[#221a17] hover:bg-[#fbebe5]'
                }`}
              >
                <span>{item.label}</span>
                {item.category && (
                  <span className="text-xs opacity-75 uppercase">{item.category}</span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#efdfda] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 rounded-xl bg-[#9a0c06] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Table / Order Ahead</span>
            </button>
            <a
              href="tel:08050685249"
              className="w-full py-2.5 rounded-xl bg-[#f5e5e0] text-[#221a17] text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#9a0c06]" />
              <span>Call Store: 080506 85249</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
