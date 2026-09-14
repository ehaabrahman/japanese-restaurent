import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';
import { CartItem, PlacedOrder } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: PlacedOrder) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  const [orderType, setOrderType] = useState<'counter-pickup' | 'dine-in'>('counter-pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const packagingCharge = items.length > 0 && orderType === 'counter-pickup' ? 25 : 0;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + packagingCharge + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter your name for order pickup callout.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number for order status alerts.');
      return;
    }

    const newOrder: PlacedOrder = {
      orderId: `KOKO-${Math.floor(1000 + Math.random() * 9000)}`,
      tokenNumber: `T-${Math.floor(10 + Math.random() * 89)}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      orderType,
      items: [...items],
      subtotal,
      packagingCharge,
      tax,
      grandTotal,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 15,
    };

    onOrderPlaced(newOrder);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#fff8f6] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#efdfda] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#efdfda] bg-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#bd2a1d] text-white flex items-center justify-center font-bold">
                心
              </div>
              <h2 className="font-display text-lg text-[#221a17] font-bold">
                Your Kokoro Order
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#fbebe5] flex items-center justify-center text-[#5a403c] hover:text-[#221a17]"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dine-In vs Counter Pickup Toggle */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#fbebe5] border border-[#efdfda] text-xs">
            <button
              type="button"
              onClick={() => setOrderType('counter-pickup')}
              className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                orderType === 'counter-pickup'
                  ? 'bg-white text-[#9a0c06] shadow-xs'
                  : 'text-[#5a403c] hover:text-[#221a17]'
              }`}
            >
              Mall Pickup (3rd Flr)
            </button>
            <button
              type="button"
              onClick={() => setOrderType('dine-in')}
              className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                orderType === 'dine-in'
                  ? 'bg-white text-[#9a0c06] shadow-xs'
                  : 'text-[#5a403c] hover:text-[#221a17]'
              }`}
            >
              Izakaya Dine-In
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5a403c]">
              <div className="w-16 h-16 rounded-full bg-[#fbebe5] flex items-center justify-center mb-3 text-[#9a0c06]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-display text-base font-bold text-[#221a17] mb-1">
                Your order is empty
              </p>
              <p className="text-xs max-w-xs mb-4">
                Explore our slow-simmered broths, sushi rolls, and bubble teas to add your first dish.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#bd2a1d] text-white text-xs font-bold hover:bg-[#9a0c06]"
              >
                Explore Live Menu
              </button>
            </div>
          ) : (
            <>
              {/* Order Items List */}
              <div className="space-y-3">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="p-3.5 rounded-xl bg-white border border-[#efdfda] shadow-2xs flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display text-sm font-bold text-[#221a17]">
                            {cartItem.name}
                          </h4>
                          {cartItem.variant && (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                                cartItem.variant === 'veg'
                                  ? 'bg-[#c7e6dc] text-[#304c45]'
                                  : 'bg-[#ffd8d2] text-[#9a0c06]'
                              }`}
                            >
                              {cartItem.variant === 'veg' ? 'Veg' : 'Chicken'}
                            </span>
                          )}
                        </div>

                        {/* Customization pills */}
                        <div className="flex flex-wrap gap-1 mt-1 text-[11px] text-[#5a403c]">
                          {cartItem.brothStyle && <span>{cartItem.brothStyle} ·</span>}
                          {cartItem.noodleTexture && <span>{cartItem.noodleTexture} Noodles ·</span>}
                          {cartItem.spiceLevel && <span>{cartItem.spiceLevel}</span>}
                          {cartItem.sweetness && <span>{cartItem.sweetness} ·</span>}
                          {cartItem.iceLevel && <span>{cartItem.iceLevel}</span>}
                        </div>

                        {/* Add-ons list */}
                        {cartItem.selectedAddOns.length > 0 && (
                          <div className="mt-1 text-[10px] text-[#773c00] font-medium">
                            + {cartItem.selectedAddOns.map((a) => a.name).join(', ')}
                          </div>
                        )}

                        {cartItem.notes && (
                          <div className="mt-1 text-[10px] text-[#8f706b] italic">
                            Note: {cartItem.notes}
                          </div>
                        )}
                      </div>

                      <span className="font-display text-sm font-bold text-[#221a17] shrink-0">
                        ₹{(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity controls & delete */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#efdfda]/60">
                      <button
                        onClick={() => onRemoveItem(cartItem.cartItemId)}
                        className="text-[#8f706b] hover:text-[#9a0c06] text-xs flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                          className="w-6 h-6 rounded bg-[#fbebe5] text-[#221a17] flex items-center justify-center hover:bg-[#efdfda]"
                          aria-label="Reduce count"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold min-w-[16px] text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                          className="w-6 h-6 rounded bg-[#fbebe5] text-[#221a17] flex items-center justify-center hover:bg-[#efdfda]"
                          aria-label="Increase count"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Contact for Order Pickup */}
              <div className="bg-white p-4 rounded-xl border border-[#efdfda] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#221a17] uppercase tracking-wide">
                  <Clock className="w-4 h-4 text-[#bd2a1d]" />
                  <span>Pickup Details · Est. 15 Mins</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5a403c] mb-1">
                    Your Name (for Counter Callout)
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#efdfda] bg-[#fff8f6] focus:outline-hidden focus:ring-1 focus:ring-[#bd2a1d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5a403c] mb-1">
                    Mobile Number (for SMS Ready Token)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#efdfda] bg-[#fff8f6] focus:outline-hidden focus:ring-1 focus:ring-[#bd2a1d]"
                  />
                </div>

                {errorMsg && (
                  <p className="text-[11px] text-[#9a0c06] font-medium">{errorMsg}</p>
                )}
              </div>

              {/* Bill Details */}
              <div className="bg-white p-4 rounded-xl border border-[#efdfda] space-y-2 text-xs">
                <h4 className="font-bold text-[#221a17] uppercase tracking-wide text-[11px] mb-1">
                  Bill Summary
                </h4>
                <div className="flex justify-between text-[#5a403c]">
                  <span>Item Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {packagingCharge > 0 && (
                  <div className="flex justify-between text-[#5a403c]">
                    <span>Eco Takeaway Packaging</span>
                    <span>₹{packagingCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5a403c]">
                  <span>Restaurant GST (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#221a17] pt-2 border-t border-[#efdfda]">
                  <span>Grand Total</span>
                  <span className="text-[#9a0c06]">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer CTA */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#efdfda] bg-white flex flex-col gap-2">
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-xl bg-[#bd2a1d] text-white text-sm font-bold hover:bg-[#9a0c06] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Place Vega City Pickup Order · ₹{grandTotal.toFixed(2)}</span>
            </button>
            <p className="text-[10px] text-center text-[#8f706b]">
              Pay at counter via UPI, Card, or Cash on pickup at Level 3 Food Terrace.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
