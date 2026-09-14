import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Filter } from 'lucide-react';
import { MenuItem, MenuCategory, DietType } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface DigitalMenuCatalogProps {
  activeCategory: MenuCategory;
  onSelectCategory: (cat: MenuCategory) => void;
  onOpenCustomizer: (item: MenuItem, initialPrice: number, variant?: 'veg' | 'non-veg') => void;
  onQuickAdd: (item: MenuItem, price: number, variant?: 'veg' | 'non-veg') => void;
}

export const DigitalMenuCatalog: React.FC<DigitalMenuCatalogProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenCustomizer,
  onQuickAdd,
}) => {
  const [dietFilter, setDietFilter] = useState<DietType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: MenuCategory; label: string; icon: string }[] = [
    { id: 'ramen', label: 'Ramen & Combos', icon: '🍜' },
    { id: 'sushi', label: 'Artisan Sushi Rolls', icon: '🍣' },
    { id: 'donburi', label: 'Donburi Bowls', icon: '🍚' },
    { id: 'starters', label: 'Starters & Gyozas', icon: '🥟' },
    { id: 'zen-chai', label: 'Zen Chai Boba & Spritzers', icon: '🧋' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (item.category !== activeCategory) return false;

      // Diet filter
      if (dietFilter === 'veg' && item.diet !== 'veg' && item.diet !== 'both') return false;
      if (dietFilter === 'non-veg' && item.diet !== 'non-veg' && item.diet !== 'both') return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchJp = item.japaneseName?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchJp) return false;
      }

      return true;
    });
  }, [activeCategory, dietFilter, searchQuery]);

  return (
    <section className="w-full py-10 sm:py-14 bg-[#fff8f6] relative" id="menu-catalog">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <span className="text-[#9a0c06] text-xs uppercase font-bold tracking-widest block mb-1">
              お品書き · Digital Izakaya Menu
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#221a17] font-bold">
              Explore Our Full Menu
            </h2>
            <p className="text-sm text-[#5a403c] mt-1">
              Tap any item to customize your broth, toppings, noodle firmness, or drink sweetness.
            </p>
          </div>

          {/* Search and Dietary Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[190px] sm:min-w-[220px]">
              <Search className="w-4 h-4 text-[#8f706b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ramen, sushi, boba..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#fbebe5] border border-[#efdfda] text-xs sm:text-sm text-[#221a17] focus:outline-hidden focus:ring-1 focus:ring-[#bd2a1d] placeholder:text-[#8f706b]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8f706b] hover:text-[#221a17]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#fbebe5] border border-[#efdfda]">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  dietFilter === 'all'
                    ? 'bg-white text-[#221a17] font-bold shadow-xs'
                    : 'text-[#5a403c] hover:text-[#221a17]'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  dietFilter === 'veg'
                    ? 'bg-white text-[#221a17] font-bold shadow-xs'
                    : 'text-[#5a403c] hover:text-[#221a17]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#48645c]"></span>
                <span>Veg Only</span>
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  dietFilter === 'non-veg'
                    ? 'bg-white text-[#221a17] font-bold shadow-xs'
                    : 'text-[#5a403c] hover:text-[#221a17]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#9a0c06]"></span>
                <span>Non-Veg</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation Tabs (Scrollable pills) */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#9a0c06] text-white shadow-sm'
                    : 'bg-[#fbebe5] text-[#221a17] hover:bg-[#f5e5e0] border border-[#efdfda]/60'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category Banner Highlight */}
        {activeCategory === 'ramen' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#fff1ec] p-4 sm:p-5 rounded-xl border border-[#efdfda] mb-6 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍜</span>
              <div>
                <h3 className="font-display text-base font-bold text-[#221a17]">
                  Handcrafted Craft Ramen
                </h3>
                <p className="text-xs text-[#5a403c]">
                  Prepared with scratch wheat noodles. Broths simmered slow for deep richness.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#fbebe5] text-[#221a17] self-start sm:self-auto border border-[#efdfda]">
              Broth &amp; Spice Customizer Available
            </span>
          </div>
        )}

        {activeCategory === 'sushi' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#fff1ec] p-4 sm:p-5 rounded-xl border border-[#efdfda] mb-6 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍣</span>
              <div>
                <h3 className="font-display text-base font-bold text-[#221a17]">
                  Freshly Rolled Maki &amp; Futomaki
                </h3>
                <p className="text-xs text-[#5a403c]">
                  Prepared with seasoned short-grain Japanese sushi rice, wasabi, and pickled gari ginger.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#fbebe5] text-[#221a17] self-start sm:self-auto border border-[#efdfda]">
              8 Pieces Per Roll
            </span>
          </div>
        )}

        {activeCategory === 'donburi' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#fff1ec] p-4 sm:p-5 rounded-xl border border-[#efdfda] mb-6 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍚</span>
              <div>
                <h3 className="font-display text-base font-bold text-[#221a17]">
                  Comforting Donburi Rice Bowls
                </h3>
                <p className="text-xs text-[#5a403c]">
                  Steamed Japanese rice crowned with hot simmered toppings and sweet-savory tare sauce.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#fbebe5] text-[#221a17] self-start sm:self-auto border border-[#efdfda]">
              Served with Pickled Daikon
            </span>
          </div>
        )}

        {activeCategory === 'starters' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#fff1ec] p-4 sm:p-5 rounded-xl border border-[#efdfda] mb-6 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥟</span>
              <div>
                <h3 className="font-display text-base font-bold text-[#221a17]">
                  Crispy Izakaya Starters &amp; Gyozas
                </h3>
                <p className="text-xs text-[#5a403c]">
                  Pan-crisped dumplings and crunch street snacks prepared fresh to order.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#fbebe5] text-[#221a17] self-start sm:self-auto border border-[#efdfda]">
              Freshly Pan-Fried
            </span>
          </div>
        )}

        {activeCategory === 'zen-chai' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#c7e6dc]/40 p-4 sm:p-5 rounded-xl border border-[#c7e6dc] mb-6 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧋</span>
              <div>
                <h3 className="font-display text-base font-bold text-[#221a17]">
                  Zen Chai Boba Bar &amp; Spritzers
                </h3>
                <p className="text-xs text-[#5a403c]">
                  Freshly brewed Assam tea leaves, chewy brown sugar tapioca pearls, popping boba, and fruit teas.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#c7e6dc] text-[#304c45] self-start sm:self-auto">
              Sweetness &amp; Ice Customizer
            </span>
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-2xl border border-[#efdfda] p-8">
            <p className="font-display text-lg text-[#221a17] font-bold mb-1">
              No matching dishes found
            </p>
            <p className="text-xs text-[#5a403c]">
              Try adjusting your dietary filter or search query.
            </p>
            <button
              onClick={() => {
                setDietFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#fbebe5] text-xs font-bold text-[#9a0c06] hover:bg-[#f5e5e0]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => {
              const isCombo = item.id.includes('combo') || item.id.includes('set');
              const hasDualPrice = item.nonVegPrice !== undefined;

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between border ${
                    isCombo
                      ? 'bg-[#fbebe5] border-[#efdfda]'
                      : 'bg-white border-[#efdfda]/80'
                  }`}
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        {item.diet === 'both' ? (
                          <>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#48645c] shrink-0" title="Veg option available"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#9a0c06] shrink-0" title="Non-veg option available"></span>
                          </>
                        ) : item.diet === 'veg' ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#48645c] shrink-0" title="100% Pure Veg"></span>
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#9a0c06] shrink-0" title="Non-Veg"></span>
                        )}

                        <h4 className="font-display text-base font-bold text-[#221a17] leading-tight">
                          {item.name}
                        </h4>
                      </div>

                      {item.tag && (
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded font-bold shrink-0 ${
                            item.tagColor === 'primary'
                              ? 'bg-[#bd2a1d] text-white'
                              : item.tagColor === 'secondary'
                              ? 'bg-[#c7e6dc] text-[#304c45]'
                              : 'bg-[#ffdcc5] text-[#773c00]'
                          }`}
                        >
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {item.japaneseName && (
                      <p className="text-[11px] text-[#8f706b] mb-1 font-medium tracking-wide">
                        {item.japaneseName}
                      </p>
                    )}

                    <p className="text-xs text-[#5a403c] mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Price display */}
                    <div className="flex items-baseline gap-2 mb-2">
                      {hasDualPrice ? (
                        <>
                          <span className="text-xs sm:text-sm font-bold text-[#9a0c06]">
                            ₹{item.price} (Veg)
                          </span>
                          <span className="text-xs text-[#8f706b]">/</span>
                          <span className="text-xs sm:text-sm font-bold text-[#221a17]">
                            ₹{item.nonVegPrice} (Chicken)
                          </span>
                        </>
                      ) : (
                        <span className="font-display text-base font-bold text-[#221a17]">
                          ₹{item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footers */}
                  <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#efdfda]/60">
                    <span className="text-[11px] text-[#5a403c] font-medium">
                      {item.spiceBadge || item.featureSubtitle || item.pieces || 'Handcrafted'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.category === 'ramen' || item.category === 'zen-chai' || isCombo ? (
                        <button
                          onClick={() => onOpenCustomizer(item, item.price, item.diet === 'both' ? 'veg' : undefined)}
                          className="px-3 py-1.5 rounded-lg bg-[#bd2a1d] text-white text-xs font-bold hover:bg-[#9a0c06] transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isCombo ? 'Select Combo' : 'Customize'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onQuickAdd(item, item.price, item.diet === 'both' ? 'veg' : undefined)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#fbebe5] text-[#221a17] text-xs font-bold hover:bg-[#bd2a1d] hover:text-white transition-all flex items-center gap-1 cursor-pointer active:scale-95 border border-[#efdfda]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ ADD</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
