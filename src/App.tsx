import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CuratedHighlights } from './components/CuratedHighlights';
import { DigitalMenuCatalog } from './components/DigitalMenuCatalog';
import { StoreLocationSection } from './components/StoreLocationSection';
import { CustomizerModal } from './components/CustomizerModal';
import { FloatingCartBar } from './components/FloatingCartBar';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ReservationModal } from './components/ReservationModal';
import { Footer } from './components/Footer';
import { MenuItem, MenuCategory, CartItem, PlacedOrder } from './types';
import { MENU_ITEMS } from './data/menuData';

export default function App() {
  const [activeTab, setActiveTab] = useState('at-a-glance');
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('ramen');

  // Initial cart state matches screenshot: 1 Tonkotsu Ramen (₹480.00)
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartItemId: 'init-tonkotsu-1',
      menuItemId: 'tonkotsu-ramen',
      name: 'Tonkotsu Ramen',
      basePrice: 480,
      variant: 'non-veg',
      brothStyle: 'Standard Savory',
      noodleTexture: 'Standard',
      spiceLevel: 'Classic Spicy',
      selectedAddOns: [],
      unitPrice: 480,
      quantity: 1,
    },
  ]);

  // Modal states
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [customizerVariant, setCustomizerVariant] = useState<'veg' | 'non-veg'>('non-veg');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Cart math
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const latestItemName = cart.length > 0 ? cart[cart.length - 1].name : '';

  // Tab & Category Navigation
  const handleTabChange = (tabId: string, category?: MenuCategory) => {
    setActiveTab(tabId);
    if (category) {
      setActiveCategory(category);
      const menuEl = document.getElementById('menu-catalog');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tabId === 'location-and-hours') {
      const locEl = document.getElementById('location-and-hours');
      if (locEl) {
        locEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tabId === 'at-a-glance') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreMenu = () => {
    setActiveTab('craft-ramen');
    setActiveCategory('ramen');
    const menuEl = document.getElementById('menu-catalog');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewCombos = () => {
    setActiveTab('craft-ramen');
    setActiveCategory('ramen');
    const menuEl = document.getElementById('menu-catalog');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Customizer Trigger
  const handleOpenCustomizer = (
    item: MenuItem,
    _initialPrice: number,
    variant?: 'veg' | 'non-veg'
  ) => {
    setCustomizerItem(item);
    setCustomizerVariant(variant || (item.diet === 'non-veg' ? 'non-veg' : 'veg'));
    setIsCustomizerOpen(true);
  };

  // Quick Add Item directly to cart
  const handleQuickAdd = (
    item: MenuItem,
    price: number,
    variant?: 'veg' | 'non-veg'
  ) => {
    const existingIndex = cart.findIndex(
      (c) => c.menuItemId === item.id && c.variant === variant && c.selectedAddOns.length === 0
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${item.id}-${Date.now()}`,
        menuItemId: item.id,
        name: item.name,
        basePrice: price,
        variant,
        selectedAddOns: [],
        unitPrice: price,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  };

  // Add customized item from modal
  const handleAddCustomizedItem = (customizedItem: CartItem) => {
    setCart((prev) => [...prev, customizedItem]);
  };

  // Cart operations
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart(cart.filter((c) => c.cartItemId !== cartItemId));
    } else {
      setCart(
        cart.map((c) => (c.cartItemId === cartItemId ? { ...c, quantity: newQty } : c))
      );
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart(cart.filter((c) => c.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = (order: PlacedOrder) => {
    setPlacedOrder(order);
    setIsCartOpen(false);
  };

  return (
    <div className="bg-[#fff8f6] font-sans text-[#221a17] antialiased min-h-screen flex flex-col selection:bg-[#bd2a1d]/15 selection:text-[#9a0c06]">
      {/* Fixed Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content View with top offset for fixed navbar */}
      <main className="w-full pt-20 bg-[#fff8f6] flex-grow">
        {/* Hero Section */}
        <HeroSection
          onExploreMenu={handleExploreMenu}
          onViewCombos={handleViewCombos}
        />

        {/* At a Glance: Chef's Curated Highlights */}
        <CuratedHighlights
          onSelectItem={(item) =>
            handleOpenCustomizer(item, item.price, item.diet === 'both' ? 'non-veg' : undefined)
          }
          onQuickAdd={(item, variant) =>
            handleQuickAdd(item, item.price, variant)
          }
        />

        {/* Digital Izakaya Menu Catalog */}
        <DigitalMenuCatalog
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onOpenCustomizer={(item, initialPrice, variant) =>
            handleOpenCustomizer(item, initialPrice, variant)
          }
          onQuickAdd={(item, price, variant) =>
            handleQuickAdd(item, price, variant)
          }
        />

        {/* Store Experience & Location Hub */}
        <StoreLocationSection
          onOpenOrder={() => setIsCartOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Sticky Floating Quick Cart Bar (Matches screenshot bottom bar) */}
      <FloatingCartBar
        cartCount={cartCount}
        cartTotal={cartTotal}
        previewName={latestItemName}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Customization Modal */}
      <CustomizerModal
        item={customizerItem}
        initialVariant={customizerVariant}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onConfirm={handleAddCustomizedItem}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmation Live Tracker Modal */}
      <OrderConfirmationModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
