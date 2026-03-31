const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL || 'file:./prisma/dev.db',
});

async function main() {
  // Seed Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@riche.com' },
    update: {},
    create: {
      email: 'admin@riche.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user seeded: admin@riche.com / admin123');

  const categories = [
    { name: 'TOPS', slug: 'tops' },
    { name: 'PANTS', slug: 'pants' },
    { name: 'ABAYA', slug: 'abaya' },
    { name: 'ISDAL', slug: 'isdal' },
    { name: 'HomeWear', slug: 'homewear' },
    { name: 'DRESSES', slug: 'dresses' },
    { name: 'SCARFS', slug: 'scarfs' },
  ];

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });

    // Add sample products for each category
    if (category.slug === 'tops') {
      await prisma.product.upsert({
        where: { id: 'top-1' },
        update: {},
        create: {
          id: 'top-1',
          name: 'The Essential White Tee',
          description: 'A classic essential. Made from 100% premium cotton for ultimate comfort and style.',
          price: 450.00,
          images: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=987&auto=format&fit=crop',
          categoryId: createdCategory.id,
        },
      });
      await prisma.product.upsert({
        where: { id: 'top-2' },
        update: {},
        create: {
          id: 'top-2',
          name: 'Silk Blend Blouse',
          description: 'Elegance redefined. This silk blend blouse is perfect for both work and evening events.',
          price: 1200.00,
          images: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=987&auto=format&fit=crop',
          categoryId: createdCategory.id,
        },
      });
    }

    if (category.slug === 'abaya') {
      await prisma.product.upsert({
        where: { id: 'abaya-1' },
        update: {},
        create: {
          id: 'abaya-1',
          name: 'Midnight Black Abaya',
          description: 'Classic and sophisticated. Our midnight black abaya features delicate embroidery and premium fabric.',
          price: 2800.00,
          images: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4bcd4?q=80&w=1076&auto=format&fit=crop',
          categoryId: createdCategory.id,
        },
      });
    }

    if (category.slug === 'homewear') {
      await prisma.product.upsert({
        where: { id: 'home-1' },
        update: {},
        create: {
          id: 'home-1',
          name: 'Satin Lounge Set',
          description: 'Relax in style. This two-piece satin lounge set is designed for maximum comfort without compromising on elegance.',
          price: 950.00,
          images: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1011&auto=format&fit=crop',
          categoryId: createdCategory.id,
        },
      });
    }
  }

  console.log('Categories and sample products seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
