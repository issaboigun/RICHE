'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-96 md:w-[420px] bg-white z-[101] shadow-2xl transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-black-100">
            <h2 className="text-sm sm:text-lg font-bold uppercase tracking-widest text-black">Shopping Bag</h2>
            <button onClick={onClose} className="p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-colors active:bg-gray-200">
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 bg-white">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 sm:space-y-6 text-center">
                <div className="p-4 sm:p-6 bg-gray-50 rounded-full">
                  <ShoppingBag size={32} className="sm:w-10 sm:h-10 text-black" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-black">Your bag is empty</p>
                  <p className="text-xs text-gray-600 font-bold">Start adding items to your bag!</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 active:bg-gray-900 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-4 group border-b border-gray-100 pb-4 sm:pb-6 last:border-0">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 bg-white border border-gray-200 overflow-hidden rounded-sm">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0">
                    <div className="flex justify-between gap-2">
                      <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-black line-clamp-2">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-black transition-colors flex-shrink-0 p-1 active:text-red-600"
                      >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-black font-black tracking-widest uppercase">LE {item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-2">
                      <div className="flex items-center border border-black rounded-sm divide-x divide-black">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 sm:p-2 hover:bg-black hover:text-white active:bg-gray-200 transition-colors text-black"
                        >
                          <Minus size={12} className="sm:w-4 sm:h-4" />
                        </button>
                        <span className="text-xs font-black w-7 sm:w-8 text-center text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 sm:p-2 hover:bg-black hover:text-white active:bg-gray-200 transition-colors text-black"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-black bg-white space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-black">Subtotal</span>
                <span className="text-lg sm:text-xl font-black text-black">LE {totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-gray-900 font-black uppercase tracking-widest text-center">
                Shipping and taxes calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full py-3 sm:py-4 bg-black text-white text-center text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 active:bg-gray-900 transition-all shadow-lg hover:shadow-xl rounded-sm"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
