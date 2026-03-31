import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import OrderRowActions from '@/components/OrderRowActions';

type OrderWithCount = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: string;
  paymobId: string | null;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    items: number;
  };
};

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { items: true }
      }
    }
  }) as OrderWithCount[];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">Orders</h1>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {orders.length === 0 ? (
          <div className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest bg-gray-50 border border-gray-200 p-6 rounded-sm">
            No orders found
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 p-4 rounded-sm space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-600">Order ID</p>
                  <p className="text-sm font-black text-black">#{order.id.slice(-6).toUpperCase()}</p>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-black text-black">{order.customerName}</p>
                <p className="text-xs text-gray-600 font-bold">{order.customerPhone}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-600">Date</p>
                  <p className="text-xs font-bold text-black">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-600">Total</p>
                  <p className="text-sm font-black text-black">LE {order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-gray-200">
                <Link href={`/admin/orders/${order.id}`} className="flex-1 text-xs font-black uppercase tracking-widest text-center py-2 bg-black text-white rounded-sm hover:bg-gray-800 active:bg-gray-900">
                  View
                </Link>
                <OrderRowActions orderId={order.id} />
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
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Order ID</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Customer</th>
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Date</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Total</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-[10px] font-black uppercase tracking-widest text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 sm:px-6 py-8 sm:py-12 text-center text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-black text-black">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-black text-black">{order.customerName}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase">{order.customerEmail}</div>
                  </td>
                  <td className="hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs font-bold text-gray-700 uppercase">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-black text-black">LE {order.total.toFixed(2)}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`px-2 sm:px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs font-black uppercase space-x-1 sm:space-x-2 flex justify-end gap-1 sm:gap-2">
                    <Link href={`/admin/orders/${order.id}`} className="text-black hover:underline tracking-widest text-[10px] sm:text-xs">
                      View
                    </Link>
                    <OrderRowActions orderId={order.id} />
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
