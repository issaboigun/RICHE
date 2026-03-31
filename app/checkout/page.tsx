'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    city: '',
    paymentMethod: 'CASH_ON_DELIVERY',
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Your bag is empty</h1>
        <Link href="/" className="inline-block px-8 py-3 bg-black text-white text-xs font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If Paymob is selected, use the initialization endpoint
      if (formData.paymentMethod === 'PAYMOB') {
        const response = await fetch('/api/paymob/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            total: totalPrice,
            items: cart.map(item => ({
              productId: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to initialize payment');
        }

        const { token, iframeId } = await response.json();
        
        // Clear cart before redirecting
        clearCart();
        
        // Redirect to Paymob Iframe
        window.location.href = `https://portal.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${token}`;
        return;
      }

      // Default Order Creation (COD or INSTAPAY)
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total: totalPrice,
          items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (res.ok) {
        clearCart();
        router.push('/checkout/success');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error: any) {
      console.error('Order error:', error);
      alert(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase mb-8 sm:mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
        {/* Checkout Form */}
        <div className="space-y-8 sm:space-y-12">
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2">Customer Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors text-black font-bold bg-white text-base sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors text-black font-bold bg-white text-base sm:text-sm"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors text-black font-bold bg-white text-base sm:text-sm"
                  placeholder="+20 1XX XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black mb-2">Shipping Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors text-black font-bold bg-white text-base sm:text-sm"
                  placeholder="Street name, Building number"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black mb-2">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors text-black font-bold bg-white text-base sm:text-sm"
                  placeholder="Cairo"
                />
              </div>

              <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <label className={`flex items-center justify-between p-4 sm:p-4 border rounded-sm cursor-pointer transition-all touch-target ${formData.paymentMethod === 'CASH_ON_DELIVERY' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CASH_ON_DELIVERY"
                        checked={formData.paymentMethod === 'CASH_ON_DELIVERY'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="h-6 w-6 sm:h-5 sm:w-5 text-black border-gray-300 focus:ring-black cursor-pointer"
                      />
                      <span className="ml-3 text-xs sm:text-[10px] font-black uppercase tracking-widest text-black">Cash on Delivery</span>
                    </div>
                  </label>
                  <label className={`flex items-center justify-between p-4 sm:p-4 border rounded-sm cursor-pointer transition-all touch-target ${formData.paymentMethod === 'PAYMOB' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="PAYMOB"
                        checked={formData.paymentMethod === 'PAYMOB'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="h-6 w-6 sm:h-5 sm:w-5 text-black border-gray-300 focus:ring-black cursor-pointer"
                      />
                      <span className="ml-3 text-xs sm:text-[10px] font-black uppercase tracking-widest text-black">Card / Wallet</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 active:scale-95 rounded-sm transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </section>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 p-6 sm:p-8 h-fit space-y-6 sm:space-y-8 border border-gray-200 rounded-sm order-first lg:order-last">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-gray-300 pb-2 text-black">Order Summary</h2>
          <div className="space-y-4 sm:space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between gap-3 sm:gap-4">
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 bg-white border border-gray-200 overflow-hidden flex-shrink-0 rounded-sm">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-tight text-black line-clamp-2">{item.name}</p>
                    <p className="text-[10px] sm:text-xs text-gray-700 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-bold text-black whitespace-nowrap">LE {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-4 sm:pt-6 space-y-2">
            <div className="flex justify-between text-xs text-gray-700 font-bold uppercase tracking-widest">
              <span>Subtotal</span>
              <span>LE {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-700 font-bold uppercase tracking-widest">
              <span>Shipping</span>
              <span>CALCULATED AT NEXT STEP</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base font-black uppercase tracking-widest pt-3 sm:pt-4 border-t border-gray-300 mt-3 sm:mt-4 text-black">
              <span>Total</span>
              <span>LE {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
