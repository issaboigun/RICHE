'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, ShoppingBasket, Receipt, LogOut, Home, Image as ImageIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: ShoppingBasket },
  { name: 'Orders', href: '/admin/orders', icon: Receipt },
  { name: 'Images', href: '/admin/images', icon: ImageIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col min-h-screen">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-10 w-10 transition-transform group-hover:scale-110">
            <Image
              src="/logo.png"
              alt="RICHE Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-black tracking-tighter text-black uppercase">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={cn(
                "flex items-center space-x-3 px-4 py-3 text-sm font-black uppercase tracking-widest rounded-md transition-all",
                isActive 
                  ? "bg-black text-white shadow-lg" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              )}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-2">
        <Link 
          href="/"
          className="flex items-center space-x-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
        >
          <Home size={16} />
          <span>View Store</span>
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center space-x-3 w-full px-4 py-3 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all rounded-md"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
