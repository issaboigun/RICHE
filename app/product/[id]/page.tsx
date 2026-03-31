'use client';

import { notFound } from 'next/navigation';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useEffect, useState } from 'react';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const { id } = await params;
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        setProduct(null);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center uppercase tracking-widest text-xs">Loading...</div>;
  }

  if (!product) {
    notFound();
  }

  const images = product.images.split(',');

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 sm:mb-8 text-xs font-medium text-gray-400 uppercase tracking-widest items-center space-x-2">
        <Link href="/" className="hover:text-black">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/category/${product.category.slug}`} className="hover:text-black">{product.category.name}</Link>
        <ChevronRight size={12} />
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
        {/* Product Images */}
        <div className="space-y-3 sm:space-y-4">
          <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
            {images[0] ? (
              <img
                src={images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {images.slice(1).map((image: string, index: number) => (
                <div key={index} className="aspect-square bg-gray-100 overflow-hidden rounded-sm">
                  <img src={image} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6 sm:space-y-8 flex flex-col">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter uppercase text-black">{product.name}</h1>
            <p className="text-lg sm:text-xl font-bold text-gray-900 tracking-widest">LE {product.price.toFixed(2)}</p>
            <div className="h-0.5 w-12 sm:w-16 bg-black" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium space-y-3 sm:space-y-4">
              {product.description.split('\n').map((line: string, i: number) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <div className="pt-6 sm:pt-8 border-t border-gray-200 space-y-4 sm:space-y-6">
              <button 
                onClick={handleAddToCart}
                className="w-full py-3 sm:py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 active:bg-gray-900 transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg rounded-sm"
              >
                <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Add to Bag</span>
              </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col p-3 sm:p-4 bg-gray-100 border border-gray-200 rounded-sm space-y-1 sm:space-y-2 touch-none">
                  <span className="text-xs font-black uppercase tracking-widest text-black">Free Shipping</span>
                  <span className="text-xs text-gray-700 font-medium">On all orders over LE 2500</span>
                </div>
                <div className="flex flex-col p-3 sm:p-4 bg-gray-100 border border-gray-200 rounded-sm space-y-1 sm:space-y-2 touch-none">
                  <span className="text-xs font-black uppercase tracking-widest text-black">Exchanges</span>
                  <span className="text-xs text-gray-700 font-medium">Easy 14-day exchange policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
