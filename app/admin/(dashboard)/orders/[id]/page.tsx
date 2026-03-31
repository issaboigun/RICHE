import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import OrderActions from '@/components/OrderActions';

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

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
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/admin/orders" className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors">
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">Order Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center gap-3">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-black">Order Items</h2>
              <span className={`px-2 sm:px-3 py-1 rounded text-xs font-black tracking-widest uppercase ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="divide-y divide-gray-200">
              {order.items.map((item: any) => (
                <div key={item.id} className="p-4 sm:p-6 flex gap-3 sm:gap-4">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gray-100 rounded-sm border border-gray-200 overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.images.split(',')[0]} 
                      alt={item.product.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-black uppercase truncate text-black">{item.product.name}</p>
                    <p className="text-[10px] sm:text-xs text-gray-700 uppercase tracking-widest font-bold">Qty: {item.quantity} × LE {item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-black whitespace-nowrap">
                    LE {(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 sm:p-6 bg-gray-100 flex justify-between items-center border-t border-gray-200">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-black">Total Amount</span>
              <span className="text-lg sm:text-xl font-black text-black">LE {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-3 sm:pb-4 text-black">Customer Details</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Name</p>
                <p className="text-xs sm:text-sm font-black text-black">{order.customerName}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email</p>
                <p className="text-xs sm:text-sm font-black text-black">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Phone</p>
                <p className="text-xs sm:text-sm font-black text-black">{order.customerPhone}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Order Date</p>
                <p className="text-xs sm:text-sm font-black text-black">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Payment Method</p>
                <p className="text-xs sm:text-sm font-black text-black uppercase tracking-widest">{(order as any).paymentMethod?.replace(/_/g, ' ')}</p>
              </div>
            </div>
          </div>
          
          <OrderActions orderId={order.id} currentStatus={order.status} />
        </div>
      </div>
    </div>
  );
}
