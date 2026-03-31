'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('Error deleting product');
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-center uppercase tracking-widest text-xs font-black">Loading products...</div>;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">Products</h1>
        <Link 
          href="/admin/products/new" 
          className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-8 py-3 sm:py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 active:bg-gray-900 transition-all shadow-lg hover:shadow-xl rounded-sm"
        >
          <Plus size={16} className="sm:w-5 sm:h-5" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {products.length === 0 ? (
          <div className="text-center text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-50 border border-gray-200 p-6 rounded-sm">
            No products found. Start by adding one.
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 p-4 rounded-sm space-y-3">
              <div className="flex gap-3">
                <div className="h-16 w-16 bg-gray-100 rounded-sm border border-gray-200 overflow-hidden flex-shrink-0">
                  {product.images.split(',')[0] ? (
                    <img 
                      src={product.images.split(',')[0]} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black text-black uppercase tracking-tight line-clamp-2">{product.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {product.id.slice(-6)}</p>
                  <p className="text-[10px] font-black px-2 py-1 bg-black text-white uppercase tracking-widest rounded-sm inline-block mt-1">
                    {product.category.name}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <p className="text-xs sm:text-sm font-black text-black">
                  LE {product.price.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <Link 
                    href={`/admin/products/edit/${product.id}`} 
                    className="p-2 text-black hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all border border-gray-200"
                    title="Edit"
                  >
                    <Edit size={14} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-full transition-all border border-red-100"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block bg-white border border-gray-200 shadow-sm overflow-x-auto rounded-sm">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Product Info</th>
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Category</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Price</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 sm:px-6 py-12 sm:py-16 text-center text-xs font-black text-gray-400 uppercase tracking-widest">
                  No products found. Start by adding one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gray-100 rounded-sm border border-gray-200 overflow-hidden flex-shrink-0">
                        {product.images.split(',')[0] ? (
                          <img 
                            src={product.images.split(',')[0]} 
                            alt={product.name} 
                            className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-500"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-black text-black uppercase tracking-tight">{product.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {product.id.slice(-6)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className="text-[10px] font-black px-3 py-1 bg-black text-white uppercase tracking-widest rounded-sm">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-black text-black">
                    LE {product.price.toFixed(2)}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-[10px] font-black uppercase gap-2 sm:gap-4 flex justify-end">
                    <Link 
                      href={`/admin/products/edit/${product.id}`} 
                      className="text-black hover:bg-gray-100 active:bg-gray-200 p-2 sm:p-2 rounded-full transition-all border border-gray-200"
                      title="Edit Product"
                    >
                      <Edit size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:bg-red-50 active:bg-red-100 p-2 sm:p-2 rounded-full transition-all border border-red-100"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
