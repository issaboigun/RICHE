import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPaymobAuthToken, createPaymobOrder, getPaymentKey } from '@/lib/paymob';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, address, city, total, items } = body;

    // 1. Create order in our database first (PENDING)
    const order = await prisma.$transaction(async (tx: any) => {
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          customerPhone,
          total,
          status: 'PENDING',
          paymentMethod: 'PAYMOB',
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
      return newOrder;
    });

    // 2. Paymob Flow
    // Step 1: Auth Token
    const authToken = await getPaymobAuthToken();

    // Step 2: Order Registration
    const amountCents = Math.round(total * 100);
    const paymobItems = items.map((item: any) => ({
      name: item.name || 'Product',
      amount_cents: Math.round(item.price * 100),
      description: item.name || 'Product',
      quantity: item.quantity,
    }));

    const paymobOrderId = await createPaymobOrder(authToken, amountCents, paymobItems);

    // Step 3: Payment Key
    const names = customerName.split(' ');
    const firstName = names[0] || 'Customer';
    const lastName = names.slice(1).join(' ') || 'Name';

    const billingData = {
      first_name: firstName,
      last_name: lastName,
      email: customerEmail,
      phone_number: customerPhone,
      apartment: 'NA',
      floor: 'NA',
      street: address,
      building: 'NA',
      shipping_method: 'PKG',
      postal_code: 'NA',
      city: city,
      country: 'EGP',
      state: city,
    };

    const paymentToken = await getPaymentKey(authToken, paymobOrderId.toString(), amountCents, billingData);

    // 3. Update our order with Paymob ID
    await prisma.order.update({
      where: { id: order.id },
      data: { paymobId: paymobOrderId.toString() },
    });

    return NextResponse.json({ 
      token: paymentToken, 
      iframeId: process.env.PAYMOB_IFRAME_ID 
    });

  } catch (error: any) {
    console.error('Paymob Initialization Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to initialize payment' }, { status: 500 });
  }
}
