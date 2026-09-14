import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { MenuItem, CartItem, AddOnOption } from '../types';
import { RAMEN_ADDONS, BOBA_ADDONS } from '../data/menuData';

interface CustomizerModalProps {
  item: MenuItem | null;
  initialVariant?: 'veg' | 'non-veg';
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (customizedItem: CartItem) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  item,
  initialVariant = 'veg',
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !item) return null;

  const isRamen = item.category === 'ramen';
  const isBoba = item.category === 'zen-chai';
  const isCombo = item.id.includes('combo') || item.id.includes('set');
  const hasDualPrice = item.nonVegPrice !== undefined;

  const [selectedVariant, setSelectedVariant] = useState<'veg' | 'non-veg'>(
    initialVariant || (item.diet === 'non-veg' ? 'non-veg' : 'veg')
  );
  const [brothStyle, setBrothStyle] = useState('Standard Savory');
  const [noodleTexture, setNoodleTexture] = useState('Standard');
  const [spiceLevel, setSpiceLevel] = useState('Classic Spicy');
  const [sweetness, setSweetness] = useState('70% Less Sweet');
  const [iceLevel, setIceLevel] = useState('Regular Ice');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Reset states when item changes
  useEffect(() => {
    setSelectedVariant(initialVariant || (item.diet === 'non-veg' ? 'non-veg' : 'veg'));
    setBrothStyle('Standard Savory');
    setNoodleTexture('Standard');
    setSpiceLevel('Classic Spicy');
    setSweetness('70% Less Sweet');
    setIceLevel('Regular Ice');
    setSelectedAddOns([]);
    setQuantity(1);
    setNotes('');
  }, [item, initialVariant]);

  // Base price calculation
  const basePrice =
    hasDualPrice && selectedVariant === 'non-veg'
      ? item.nonVegPrice!
      : item.price;

  // Add-ons total
  const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
  const unitPrice = basePrice + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleToggleAddOn = (addOn: AddOnOption) => {
    if (selectedAddOns.some((a) => a.id === addOn.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addOn.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const handleConfirmOrder = () => {
    const customized: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      basePrice,
      variant: hasDualPrice ? selectedVariant : undefined,
      brothStyle: isRamen ? brothStyle : undefined,
      noodleTexture: isRamen ? noodleTexture : undefined,
      spiceLevel: isRamen ? spiceLevel : undefined,
      sweetness: isBoba ? sweetness : undefined,
      iceLevel: isBoba ? iceLevel : undefined,
      selectedAddOns,
      notes: notes.trim() || undefined,
      unitPrice,
      quantity,
    };
    onConfirm(customized);
    onClose();
  };

  const availableAddons = isBoba ? BOBA_ADDONS : RAMEN_ADDONS;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl overflow-y-auto max-h-[90vh] border border-[#efdfda] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#efdfda]">
          <div>
            <span className="text-[11px] font-bold text-[#9a0c06] uppercase tracking-wider">
              Customize Item
            </span>
            <h3 className="font-display text-xl text-[#221a17] font-bold">
              {item.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#fbebe5] flex items-center justify-center text-[#5a403c] hover:text-[#221a17] hover:bg-[#efdfda] transition-colors"
            aria-label="Close customizer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4 py-4">
          {/* Dual Variant Toggle (Veg vs Chicken/Non-Veg) */}
          {hasDualPrice && (
            <div>
              <label className="block text-xs font-bold text-[#221a17] mb-1.5 uppercase tracking-wide">
                Preparation Style
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedVariant('veg')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    selectedVariant === 'veg'
                      ? 'border-[#48645c] bg-[#c7e6dc]/40 text-[#221a17] font-bold ring-1 ring-[#48645c]'
                      : 'border-[#efdfda] bg-white text-[#5a403c]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#48645c]"></span>
                    <span>Pure Veg / Tofu</span>
                  </span>
                  <span className="font-bold">₹{item.price}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVariant('non-veg')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    selectedVariant === 'non-veg'
                      ? 'border-[#9a0c06] bg-[#fff1ec] text-[#221a17] font-bold ring-1 ring-[#9a0c06]'
                      : 'border-[#efdfda] bg-white text-[#5a403c]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9a0c06]"></span>
                    <span>Halal Chicken</span>
                  </span>
                  <span className="font-bold">₹{item.nonVegPrice}</span>
                </button>
              </div>
            </div>
          )}

          {/* Broth Style (For Ramen & Combos) */}
          {isRamen && (
            <div>
              <label className="block text-xs font-bold text-[#221a17] mb-1.5 uppercase tracking-wide">
                Choose Broth Style
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Standard Savory', 'Extra Rich (Kotteri)'].map((style) => (
                  <label
                    key={style}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                      brothStyle === style
                        ? 'border-[#9a0c06] bg-white font-bold ring-1 ring-[#9a0c06]'
                        : 'border-[#efdfda] bg-white text-[#5a403c]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="broth-style"
                      checked={brothStyle === style}
                      onChange={() => setBrothStyle(style)}
                      className="accent-[#9a0c06]"
                    />
                    <span>{style}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Noodle Firmness (For Ramen) */}
          {isRamen && (
            <div>
              <label className="block text-xs font-bold text-[#221a17] mb-1.5 uppercase tracking-wide">
                Noodle Firmness
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['Soft', 'Standard', 'Firm (Katame)'].map((texture) => (
                  <label
                    key={texture}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer text-center transition-all ${
                      noodleTexture === texture
                        ? 'border-[#9a0c06] bg-white font-bold ring-1 ring-[#9a0c06]'
                        : 'border-[#efdfda] bg-white text-[#5a403c]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="noodle-texture"
                      checked={noodleTexture === texture}
                      onChange={() => setNoodleTexture(texture)}
                      className="accent-[#9a0c06]"
                    />
                    <span>{texture}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level (For Ramen) */}
          {isRamen && (
            <div>
              <label className="block text-xs font-bold text-[#221a17] mb-1.5 uppercase tracking-wide">
                Spice Heat
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['Mild', 'Classic Spicy', 'Extra Chili 🔥'].map((spice) => (
                  <label
                    key={spice}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer text-center transition-all ${
                      spiceLevel === spice
                        ? 'border-[#9a0c06] bg-white font-bold ring-1 ring-[#9a0c06]'
                        : 'border-[#efdfda] bg-white text-[#5a403c]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="spice-level"
                      checked={spiceLevel === spice}
                      onChange={() => setSpiceLevel(spice)}
                      className="accent-[#9a0c06]"
                    />
                    <span>{spice}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Boba Sweetness & Ice Options */}
          {isBoba && (
            <>
              <div>
                <label className="block text-xs font-bold text-[#221a17] mb-1.5 uppercase tracking-wide">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['0% Unsweetened', '70% Less Sweet', '100% Standard'].map((sweet) => (
                    <label
                      key={sweet}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                        sweetness === sweet
                          ? 'border-[#48645c] bg-white font-bold ring-1 ring-[#48645c]'
                          : 'border-[#efdfda] bg-white text-[#5a403c]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sweetness"
                        checked={sweetness === sweet}
                        onChange={() => setSweetness(sweet)}
                        className="accent-[#48645c]"
                      />
                      <span>{sweet}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#221a17] mb-1.5 uppercase tracking-wide">
                  Ice Level
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Regular Ice', 'Less Ice', 'No Ice'].map((ice) => (
                    <label
                      key={ice}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                        iceLevel === ice
                          ? 'border-[#48645c] bg-white font-bold ring-1 ring-[#48645c]'
                          : 'border-[#efdfda] bg-white text-[#5a403c]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ice-level"
                        checked={iceLevel === ice}
                        onChange={() => setIceLevel(ice)}
                        className="accent-[#48645c]"
                      />
                      <span>{ice}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Optional Add-ons list */}
          <div>
            <label className="block text-xs font-bold text-[#221a17] mb-1.5 uppercase tracking-wide">
              Optional Add-ons
            </label>
            <div className="flex flex-col gap-2 text-xs">
              {availableAddons.map((addOn) => {
                const isSelected = selectedAddOns.some((a) => a.id === addOn.id);
                return (
                  <label
                    key={addOn.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#9a0c06] bg-[#fff1ec] font-semibold'
                        : 'border-[#efdfda] bg-white text-[#221a17]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleAddOn(addOn)}
                        className="accent-[#9a0c06] w-3.5 h-3.5"
                      />
                      <span>{addOn.name}</span>
                    </span>
                    <span className="font-bold text-[#9a0c06]">+₹{addOn.price}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Special Kitchen Notes */}
          <div>
            <label className="block text-xs font-bold text-[#221a17] mb-1 uppercase tracking-wide">
              Special Notes for Kitchen
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. No green onions, extra broth hot..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#efdfda] text-[#221a17] focus:outline-hidden focus:ring-1 focus:ring-[#bd2a1d]"
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#efdfda]">
            <span className="text-xs font-bold text-[#221a17]">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-[#fbebe5] text-[#221a17] flex items-center justify-center hover:bg-[#efdfda] active:scale-95 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-display font-bold text-sm min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg bg-[#fbebe5] text-[#221a17] flex items-center justify-center hover:bg-[#efdfda] active:scale-95 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#efdfda] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#5a403c] block">Subtotal</span>
            <span className="font-display text-xl font-bold text-[#9a0c06]">
              ₹{totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="px-6 py-3 rounded-xl bg-[#bd2a1d] text-white text-xs sm:text-sm font-bold hover:bg-[#9a0c06] transition-colors shadow-md active:scale-95 cursor-pointer"
          >
            Add Customized Item
          </button>
        </div>
      </div>
    </div>
  );
};
