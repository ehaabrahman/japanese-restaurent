import React from 'react';
import { Plus, Flame, Leaf, Utensils } from 'lucide-react';
import { MenuItem } from '../types';

interface CuratedHighlightsProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, variant?: 'veg' | 'non-veg') => void;
}

export const CuratedHighlights: React.FC<CuratedHighlightsProps> = ({
  onSelectItem,
  onQuickAdd,
}) => {
  return (
    <section className="w-full py-10 sm:py-14 bg-[#fff1ec]/70 border-y border-[#efdfda]/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[#9a0c06] text-xs font-bold uppercase tracking-wider mb-1">
              <span>料理長のおすすめ</span>
              <span>·</span>
              <span>Daily Curator Picks</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#221a17] font-bold">
              Chef's Curated Highlights
            </h2>
          </div>
          <p className="text-sm text-[#5a403c] max-w-md">
            The dishes our regulars come back for week after week at Vega City Mall.
          </p>
        </div>

        {/* 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Highlight 1: Tonkotsu */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group border border-[#efdfda]/80">
            <div>
              <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden mb-4 relative bg-[#fbebe5]">
                <img
                  alt="Steaming bowl of Kokoro Tonkotsu Ramen with marinated egg and bok choy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtE1N1KBvhIdPQQZ53eUxnM4uvbSAFdCHy1GKjYvNIBQ4wJQAWcBxJYSx_6PA3Qj9drdTkK_MwxN6zwpe4Fpn8opMhxYeh7nXZz00oeUjY60Oju52FbqGQwD-PluMxGECxqQSjwQisdH4-rhPPV0JR825Nj7-28iLLcUiJr4b1eKFncViLtGHve6o2TwV-8rDZakSoTnCLPn_FSimsZ_Bjqhj9y7MY3jNysUEWBELqSFxF43Iuwwt2FjlmVdp0Mn2S9w"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#221a17] text-xs font-bold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#9a0c06]"></span> Non-Veg
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#c7e6dc] text-[#304c45] text-xs font-bold shadow-xs">
                    Veg Available
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-lg font-display text-sm sm:text-base font-bold text-[#9a0c06] shadow-xs">
                  ₹420 / ₹480
                </div>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-display text-lg sm:text-xl text-[#221a17] font-bold">
                  Tonkotsu Ramen
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#ffdcc5] text-[#773c00] font-bold">
                  Chef's #1
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5a403c] line-clamp-2 mb-4 leading-relaxed">
                House-made ramen noodles, spicy tofu or poached chicken, tender bok choy, house kimchi, and toasted chili oil in 12-hour simmered savory broth.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#efdfda]/60">
              <span className="text-xs text-[#5a403c] flex items-center gap-1 font-medium">
                <Flame className="w-3.5 h-3.5 text-[#773c00]" />
                <span>Mild to Spicy</span>
              </span>
              <button
                onClick={() =>
                  onSelectItem({
                    id: 'tonkotsu-ramen',
                    name: 'Tonkotsu Ramen',
                    japaneseName: '豚骨ラーメン',
                    category: 'ramen',
                    description:
                      'House-made ramen noodles, spicy tofu or poached chicken, tender bok choy, house kimchi, and toasted chili oil in 12-hour simmered savory broth.',
                    price: 420,
                    nonVegPrice: 480,
                    diet: 'both',
                    tag: "Chef's #1",
                  })
                }
                className="px-3.5 py-2 rounded-lg bg-[#bd2a1d] text-white text-xs sm:text-sm font-bold hover:bg-[#9a0c06] transition-colors shadow-xs flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Order</span>
              </button>
            </div>
          </div>

          {/* Highlight 2: Avocado & Cream Cheese Roll */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group border border-[#efdfda]/80">
            <div>
              <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden mb-4 relative bg-[#fbebe5]">
                <img
                  alt="Handcrafted avocado and cream cheese sushi rolls"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxSVaqZaGuULA5WuaoDrnaSls9OOLx9TeUA4DqtQ79ZjYviP7TOZYd3K_Y2gBC4VQKkqXo0ZbJiHowLnsDogL9GlhT43qYd7_7dn9cHiTQuqT4N5xhc2zt4rx3k0oSxyXKqZK1GCa0gV8f8CMn-B8wcefO1NcjfgVJ6xHcS963pmCU7uQbDrxcwgLkcrYO2E-8QpjcKkLWPhD07RkiobWYAvLftx-xCKor6nbpG2PIzG0_xL5mLJC2WioTGbenhuxkgQ"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#221a17] text-xs font-bold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#48645c]"></span> 100% Pure Veg
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#efdfda] text-[#5a403c] text-xs font-medium">
                    8 Pieces
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-lg font-display text-sm sm:text-base font-bold text-[#221a17] shadow-xs">
                  ₹480.00
                </div>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-display text-lg sm:text-xl text-[#221a17] font-bold">
                  Avocado &amp; Cream Cheese Roll
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#c7e6dc] text-[#304c45] font-bold">
                  Best Seller
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5a403c] line-clamp-2 mb-4 leading-relaxed">
                Buttery Hass avocado, silky cream cheese, crispy golden tanuki flakes, roasted white sesame seeds, and light spicy sriracha mayo drizzle.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#efdfda]/60">
              <span className="text-xs text-[#48645c] font-semibold flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" />
                <span>Vegetarian Kitchen</span>
              </span>
              <button
                onClick={() =>
                  onQuickAdd({
                    id: 'avocado-cream-cheese-roll',
                    name: 'Avocado & Cream Cheese Roll',
                    category: 'sushi',
                    description:
                      'Buttery Hass avocado, silky cream cheese, crispy golden tanuki flakes, roasted white sesame seeds, and light spicy sriracha mayo drizzle.',
                    price: 480,
                    diet: 'veg',
                  })
                }
                className="px-3.5 py-2 rounded-lg bg-[#bd2a1d] text-white text-xs sm:text-sm font-bold hover:bg-[#9a0c06] transition-colors shadow-xs flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Order</span>
              </button>
            </div>
          </div>

          {/* Highlight 3: Miso Soup */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group border border-[#efdfda]/80">
            <div>
              <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden mb-4 relative bg-[#fbebe5]">
                <img
                  alt="Traditional Japanese miso soup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqZfJQ-IGst0LeLniQI0JVrnFRru2XcmWY5JnHYMxIAw-oe1rJQjBE8rgS_B4l1dutRRuIIdvyl6Y14ibLkusn-9Z_LohEuakoT6Pc5ccc7OK18lR1S7Np0oI7smXw3gqzlgEv7cR2gtaPIMJQWE4SKnA6se7jFumwu2C50ton-_8aroLhB8858GUSZz4rIIuHyu19nsLVxNXg6P_b-nF6WkmYncKL3kWf1QSWwpSPljJ1gMUezFfi6BHubXgNCdC84Q"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#221a17] text-xs font-bold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#48645c]"></span> 100% Pure Veg
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-lg font-display text-sm sm:text-base font-bold text-[#221a17] shadow-xs">
                  ₹165.00
                </div>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-display text-lg sm:text-xl text-[#221a17] font-bold">
                  Traditional Miso Soup
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#efdfda] text-[#5a403c] font-bold">
                  Starter
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5a403c] line-clamp-2 mb-4 leading-relaxed">
                Warm, comforting fermented white and red miso broth infused with delicate kombu dashi, tender silken tofu, wakame seaweed, and fresh spring onions.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#efdfda]/60">
              <span className="text-xs text-[#5a403c] flex items-center gap-1 font-medium">
                <Utensils className="w-3.5 h-3.5 text-[#773c00]" />
                <span>Comfort Starter</span>
              </span>
              <button
                onClick={() =>
                  onQuickAdd({
                    id: 'traditional-miso-soup',
                    name: 'Traditional Miso Soup',
                    category: 'starters',
                    description:
                      'Warm, comforting fermented white and red miso broth infused with delicate kombu dashi, tender silken tofu, wakame seaweed, and fresh spring onions.',
                    price: 165,
                    diet: 'veg',
                  })
                }
                className="px-3.5 py-2 rounded-lg bg-[#bd2a1d] text-white text-xs sm:text-sm font-bold hover:bg-[#9a0c06] transition-colors shadow-xs flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
