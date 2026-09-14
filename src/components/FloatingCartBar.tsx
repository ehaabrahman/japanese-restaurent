import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface FloatingCartBarProps {
  cartCount: number;
  cartTotal: number;
  previewName: string;
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  cartCount,
  cartTotal,
  previewName,
  onOpenCart,
}) => {
  if (cartCount === 0) return null;

  return (
    <div
      id="cart-bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-xl z-30 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-2xl flex items-center justify-between border border-[#efdfda] transition-all duration-300 animate-in slide-in-from-bottom-5"
    >
      <div className="flex items-center gap-3 pl-1">
        {/* Shopping bag icon with count bubble */}
        <div className="w-10 h-10 rounded-xl bg-[#bd2a1d] text-white flex items-center justify-center font-bold relative shrink-0 shadow-xs">
          <ShoppingBag className="w-5 h-5" />
          <span
            id="cart-count"
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#48645c] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
          >
            {cartCount}
          </span>
        </div>

        <div className="overflow-hidden text-left">
          <p
            id="cart-item-preview"
            className="text-xs sm:text-sm text-[#221a17] font-bold truncate max-w-[150px] sm:max-w-[220px]"
          >
            {previewName || `${cartCount} Items`}
          </p>
          <p className="text-[11px] sm:text-xs text-[#5a403c]">
            Order Total:{' '}
            <strong id="cart-total" className="text-[#9a0c06] font-bold">
              ₹{cartTotal.toFixed(2)}
            </strong>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCart}
          className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#bd2a1d] text-white text-xs sm:text-sm font-bold hover:bg-[#9a0c06] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span>Place Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
