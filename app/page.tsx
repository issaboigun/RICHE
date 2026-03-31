import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'TOPS', href: '/category/tops', image: '/uploads/category-tops.jpg' },
  { name: 'PANTS', href: '/category/pants', image: '/uploads/category-pants.jpg' },
  { name: 'DRESSES', href: '/category/dresses', image: '/uploads/category-dresses.jpg' },
  { name: 'SCARFS', href: '/category/scarfs', image: '/uploads/category-scarfs.jpg' },
  { name: 'ABAYA', href: '/category/abaya', image: '/uploads/category-abaya.jpg' },
  { name: 'ISDAL', href: '/category/isdal', image: '/uploads/category-isdal.jpg' },
  { name: 'HomeWear', href: '/category/homewear', image: '/uploads/category-homewear.jpg' },
];

export default function Home() {
  return (
    <div style={{ width: '100%', paddingTop: '2rem', paddingBottom: '2rem' }}>
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[75vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/uploads/hero-background.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative text-center text-white space-y-4 sm:space-y-6 md:space-y-8 px-4 flex flex-col items-center">
          <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 mb-2 sm:mb-4">
            <Image
              src="/logo.png"
              alt="RICHE Logo"
              fill
              className="object-contain filter brightness-0 invert"
              priority
            />
          </div>
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter uppercase">RICHE</h1>
            <p className="text-sm sm:text-lg md:text-xl font-light tracking-[0.3em] uppercase px-2">Luxury & confidence for your everyday life</p>
          </div>
          <div className="pt-4 sm:pt-6 md:pt-8">
            <Link 
              href="/category/tops" 
              className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-white text-black font-bold text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-all uppercase shadow-2xl active:scale-95"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter uppercase">Our Categories</h2>
            <div className="h-0.5 w-12 sm:w-16 bg-pink-500 mx-auto mt-3 sm:mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={category.href}
                className="group relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden bg-gray-100 rounded-sm"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-pink-500/20 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl sm:text-2xl font-bold tracking-widest uppercase px-4 text-center">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase text-black">The RICHE Experience</h2>
            <div className="h-1 w-12 bg-black mx-auto" />
          </div>
          
          <p className="text-xl text-gray-900 font-medium leading-relaxed max-w-3xl mx-auto">
            RICHE is more than a brand; it's a lifestyle. We are dedicated to providing our customers with the highest quality fashion that exudes luxury and confidence. Our collections are carefully curated to blend timeless elegance with modern trends, ensuring that every piece you wear makes a statement. At RICHE, we believe that fashion is an expression of individuality, and we strive to empower our customers to embrace their unique style with confidence and grace.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
            <div className="space-y-2">
              <span className="block text-3xl font-black text-black">100%</span>
              <span className="text-xs text-gray-800 uppercase tracking-[0.2em] font-black">Premium Quality</span>
            </div>
            <div className="space-y-2">
              <span className="block text-3xl font-black text-black">Free</span>
              <span className="text-xs text-gray-800 uppercase tracking-[0.2em] font-black">Shipping over LE 2500</span>
            </div>
            <div className="space-y-2">
              <span className="block text-3xl font-black text-black">24/7</span>
              <span className="text-xs text-gray-800 uppercase tracking-[0.2em] font-black">Expert Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
