import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type CategoryWithProducts = {
  id: string;
  name: string;
  slug: string;
  image?: string;
  products: Array<{
    id: string;
    name: string;
    images: string;
    price: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: 'desc' },
      },
    },
  }) as CategoryWithProducts | null;

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
      <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-12">
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter uppercase">{category.name}</h1>
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest">{category.products.length} Products</p>
          <div className="h-0.5 w-12 sm:w-16 bg-black mx-auto mt-3 sm:mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {category.products.map((product: typeof category.products[0]) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-black/10 rounded-sm">
                {product.images.split(',')[0] ? (
                  <img
                    src={product.images.split(',')[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
              </div>
              <div className="mt-3 sm:mt-4 space-y-1">
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 uppercase tracking-tight">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-light">LE {product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>

        {category.products.length === 0 && (
          <div className="py-12 sm:py-20 text-center space-y-4">
            <p className="text-gray-500 italic uppercase tracking-widest text-xs sm:text-sm">No products available in this category yet.</p>
            <Link href="/" className="inline-block text-xs font-medium uppercase tracking-widest underline decoration-1 underline-offset-4 hover:text-gray-700 active:text-gray-900">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
