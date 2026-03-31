import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  const categoriesCount = await prisma.category.count();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-black uppercase">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">Total Products</p>
          <p className="text-4xl font-bold mt-2 text-black">{productsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">Total Orders</p>
          <p className="text-4xl font-bold mt-2 text-black">{ordersCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">Categories</p>
          <p className="text-4xl font-bold mt-2 text-black">{categoriesCount}</p>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tighter">Quick Actions</h2>
        <div className="flex space-x-4">
          <a 
            href="/admin/products" 
            className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest"
          >
            Manage Products
          </a>
          <a 
            href="/admin/orders" 
            className="px-6 py-3 border border-black text-black text-sm font-medium hover:bg-gray-50 transition-colors uppercase tracking-widest"
          >
            View Orders
          </a>
        </div>
      </div>
    </div>
  );
}
