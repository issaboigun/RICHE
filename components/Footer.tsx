import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 sm:py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div className="col-span-1 sm:col-span-2 md:col-span-2">
          <Link href="/" className="relative h-16 w-16 sm:h-20 sm:w-20 mb-4 block transition-transform hover:scale-105">
            <Image
              src="/logo.png"
              alt="RICHE Logo"
              fill
              className="object-contain"
            />
          </Link>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xs">
            Luxury & confidence for your everyday life. Redefining fashion with elegance and quality.
          </p>
        </div>
        
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider mb-3 sm:mb-4">Categories</h3>
          <ul className="space-y-1 sm:space-y-2">
            {['TOPS', 'PANTS', 'DRESSES', 'SCARFS', 'ABAYA', 'ISDAL', 'HomeWear' ].map((item) => (
              <li key={item}>
                <Link href={`/category/${item.toLowerCase()}`} className="text-xs sm:text-sm text-gray-700 font-medium hover:text-black transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider mb-3 sm:mb-4">Company</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <Link href="/about" className="text-xs sm:text-sm text-gray-700 font-medium hover:text-black transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-xs sm:text-sm text-gray-700 font-medium hover:text-black transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-xs sm:text-sm text-gray-700 font-medium hover:text-black transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} RICHE. All rights reserved | Designed by <a href="https://www.instagram.com/issaboigun/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">ISSA</a>.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://www.instagram.com/riche0.1/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black text-xs">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
