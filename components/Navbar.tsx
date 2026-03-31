'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState, useRef } from 'react';
import { useCart } from '@/lib/CartContext';
import CartSidebar from './CartSidebar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = [
  { name: 'TOPS', href: '/category/tops' },
  { name: 'PANTS', href: '/category/pants' },
  { name: 'DRESSES', href: '/category/dresses' },
  { name: 'SCARFS', href: '/category/scarfs' },
  { name: 'ABAYA', href: '/category/abaya' },
  { name: 'ISDAL', href: '/category/isdal' },
  { name: 'HomeWear', href: '/category/homewear' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();
  const router = useRouter();
  
  // Logic for triple click
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickTime.current > 500) {
      clickCount.current = 1;
    } else {
      clickCount.current += 1;
    }
    
    lastClickTime.current = now;

    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    if (clickCount.current === 3) {
      clickCount.current = 0;
      router.push('/admin');
    } else {
      // Set a shorter timeout for faster response on mobile
      clickTimer.current = setTimeout(() => {
        if (clickCount.current === 1) {
          router.push('/');
        }
        clickCount.current = 0;
      }, 200);
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black focus:outline-none active:text-black"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={handleLogoClick}
                className="relative flex items-center group cursor-pointer transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-1 -ml-2 rounded"
                aria-label="RICHE Home (triple-click for admin)"
              >
                <div className="relative h-12 w-12 sm:h-16 sm:w-16 z-10 pointer-events-none">
                  <Image
                    src="/logo.png"
                    alt="RICHE Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="ml-2 text-lg sm:text-2xl font-bold tracking-[0.2em] text-black uppercase select-none pointer-events-none">
                  RICHE
                </span>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-xs sm:text-sm font-bold text-gray-800 hover:text-black transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2 sm:space-x-4 z-50 pointer-events-auto">
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-600 hover:text-black active:text-black relative rounded-md transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 z-40 relative w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-[60vh] overflow-y-auto">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors active:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
