'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    images: '',
  });

  useEffect(() => {
    async function fetchData() {
      const [catRes, prodRes] = await Promise.all([
        fetch('/api/categories'),
        fetch(`/api/products/${id}`)
      ]);
      
      const [catData, prodData] = await Promise.all([
        catRes.json(),
        prodRes.json()
      ]);
      
      setCategories(catData);
      setFormData({
        name: prodData.name,
        description: prodData.description,
        price: prodData.price.toString(),
        categoryId: prodData.categoryId,
        images: prodData.images,
      });
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.images) {
      alert('Please upload an image');
      return;
    }
    setSaving(true);

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
      }),
    });

    if (res.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      alert('Error updating product');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center uppercase tracking-widest text-xs font-black">Loading Product...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-black uppercase">Edit Product</h1>
        <Link href="/admin/products" className="text-sm text-gray-500 hover:text-black uppercase tracking-widest font-black">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-8">
        <div>
          <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Product Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all text-black font-bold bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Description</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all text-black font-bold bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Price (LE)</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all text-black font-bold bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Category</label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all bg-white text-black font-bold uppercase"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ImageUpload 
          value={formData.images} 
          onChange={(url) => setFormData({ ...formData, images: url })} 
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}
