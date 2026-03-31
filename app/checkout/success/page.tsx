'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  // If we have success=false from Paymob
  if (success === 'false') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-40 text-center space-y-8">
        <div className="flex justify-center">
          <XCircle size={60} className="text-red-500" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Payment Failed</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed uppercase font-bold">
            There was an issue processing your payment. Please try again or contact support.
          </p>
        </div>
        <div className="pt-12">
          <Link 
            href="/checkout" 
            className="inline-block px-12 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 lg:py-40 text-center space-y-8">
      <div className="flex justify-center">
        <CheckCircle size={60} className="text-black" />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter uppercase">Thank you for your order!</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed uppercase font-bold">
          Your order has been placed successfully. 
          {success === 'true' && " Your payment was processed via card."}
          Our team is now preparing your items for shipping.
        </p>
      </div>
      <div className="pt-12">
        <Link 
          href="/" 
          className="inline-block px-12 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
        >
          Return to Shop
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
