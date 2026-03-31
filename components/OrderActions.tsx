'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2, X } from 'lucide-react';

const ORDER_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function OrderActions({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdateStatus = async () => {
    if (selectedStatus === currentStatus) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      setIsEditing(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      router.push('/admin/orders');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setShowDeleteConfirm(false);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
      <h2 className="text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-4 text-black">Order Status</h2>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700 font-bold">
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-sm uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-black"
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              onClick={handleUpdateStatus}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-black text-white font-black text-xs uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedStatus(currentStatus);
              }}
              className="px-4 py-3 bg-gray-100 text-black font-black text-xs uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase ${getStatusColor(currentStatus)}`}>
              {currentStatus}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Status"
            >
              <Edit2 size={16} className="text-gray-600" />
            </button>
          </div>
        </>
      )}

      <div className="border-t border-gray-200 pt-4">
        {showDeleteConfirm ? (
          <div className="space-y-3">
            <p className="text-sm font-bold text-red-700 uppercase">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteOrder}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete Order'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-3 bg-gray-100 text-black font-black text-xs uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full px-4 py-3 bg-red-50 text-red-600 font-black text-xs uppercase tracking-widest rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Delete Order
          </button>
        )}
      </div>
    </div>
  );
}
