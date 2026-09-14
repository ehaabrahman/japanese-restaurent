import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, ChefHat, Sparkles } from 'lucide-react';
import { PlacedOrder } from '../types';

interface OrderConfirmationModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const [prepProgress, setPrepProgress] = useState(35);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrepProgress((prev) => (prev < 85 ? prev + 10 : prev));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#efdfda] animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Success Banner */}
        <div className="text-center pb-4 border-b border-[#efdfda]">
          <div className="w-14 h-14 rounded-full bg-[#c7e6dc] text-[#304c45] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-[#48645c]" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#48645c] block mb-1">
            Order Transmitted · Omotenashi Care
          </span>
          <h2 className="font-display text-2xl text-[#221a17] font-bold">
            Order Confirmed!
          </h2>
          <p className="text-xs text-[#5a403c] mt-1">
            Thank you, <strong className="text-[#221a17]">{order.customerName}</strong>. Your meal is being handcrafted now.
          </p>
        </div>

        {/* Token and Order Reference */}
        <div className="my-5 bg-[#fff1ec] p-4 rounded-xl border border-[#efdfda] text-center">
          <span className="text-xs text-[#8f706b] uppercase font-bold tracking-wider block mb-1">
            Pickup Counter Token
          </span>
          <div className="font-display text-3xl font-extrabold text-[#9a0c06] tracking-wider mb-1">
            {order.tokenNumber}
          </div>
          <div className="text-xs text-[#5a403c]">
            Order Ref: <span className="font-mono font-bold text-[#221a17]">#{order.orderId}</span> · Placed at {order.placedAt}
          </div>
        </div>

        {/* Live Kitchen Status Tracker */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between text-xs font-bold text-[#221a17]">
            <span className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-[#bd2a1d]" />
              <span>Kitchen Progress</span>
            </span>
            <span className="text-[#9a0c06] font-bold">~{order.estimatedMinutes} Mins Remaining</span>
          </div>

          <div className="w-full bg-[#efdfda] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#bd2a1d] h-full transition-all duration-500 rounded-full"
              style={{ width: `${prepProgress}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-3 text-[10px] text-center text-[#5a403c]">
            <span className="font-bold text-[#48645c]">✓ Received</span>
            <span className="font-bold text-[#9a0c06] animate-pulse">🍜 Simmering</span>
            <span className="text-[#8f706b]">Counter Ready</span>
          </div>
        </div>

        {/* Order Details Accordion */}
        <div className="bg-white rounded-xl p-4 border border-[#efdfda] mb-5 text-xs space-y-2">
          <h4 className="font-bold text-[#221a17] uppercase text-[11px] mb-1">
            Item Summary ({order.items.length} dishes)
          </h4>
          {order.items.map((it) => (
            <div key={it.cartItemId} className="flex justify-between text-[#5a403c]">
              <span>
                {it.quantity}x {it.name}{' '}
                {it.variant && (
                  <span className="text-[10px] opacity-75">
                    ({it.variant === 'veg' ? 'Veg' : 'Chicken'})
                  </span>
                )}
              </span>
              <span className="font-bold text-[#221a17]">
                ₹{(it.unitPrice * it.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t border-[#efdfda] font-bold text-sm text-[#221a17]">
            <span>Total Paid at Counter</span>
            <span className="text-[#9a0c06]">₹{order.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Pickup Location Reminder */}
        <div className="bg-[#fbebe5] p-3.5 rounded-xl border border-[#efdfda] flex items-start gap-2.5 text-xs text-[#5a403c] mb-5">
          <MapPin className="w-4 h-4 text-[#9a0c06] shrink-0 mt-0.5" />
          <p>
            Please show token <strong className="text-[#221a17]">{order.tokenNumber}</strong> at the Kokoro counter on Level 3 Food Terrace, Nexus Vega City Mall.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#bd2a1d] text-white text-xs sm:text-sm font-bold hover:bg-[#9a0c06] transition-colors shadow-md"
        >
          Got it, Close Window
        </button>
      </div>
    </div>
  );
};
