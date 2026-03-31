const PAYMOB_API_BASE = 'https://accept.paymob.com/api';

export async function getPaymobAuthToken() {
  const res = await fetch(`${PAYMOB_API_BASE}/auth/tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: process.env.PAYMOB_API_KEY }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('Paymob Auth Error Response:', JSON.stringify(error, null, 2));
    throw new Error(`Failed to get Paymob auth token: ${JSON.stringify(error)}`);
  }

  const data = await res.json();
  return data.token;
}

export async function createPaymobOrder(authToken: string, amountCents: number, items: any[]) {
  const res = await fetch(`${PAYMOB_API_BASE}/ecommerce/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: authToken,
      delivery_needed: 'false',
      amount_cents: amountCents,
      currency: 'EGP',
      items: items,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('Paymob Order Error Response:', JSON.stringify(error, null, 2));
    throw new Error(`Failed to create Paymob order: ${JSON.stringify(error)}`);
  }

  const data = await res.json();
  return data.id;
}

export async function getPaymentKey(
  authToken: string,
  orderId: string,
  amountCents: number,
  billingData: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    apartment: string;
    floor: string;
    street: string;
    building: string;
    shipping_method: string;
    postal_code: string;
    city: string;
    country: string;
    state: string;
  }
) {
  const res = await fetch(`${PAYMOB_API_BASE}/acceptance/payment_keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: authToken,
      amount_cents: amountCents,
      expiration: 3600,
      order_id: orderId,
      billing_data: billingData,
      currency: 'EGP',
      integration_id: process.env.PAYMOB_INTEGRATION_ID,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('Paymob Payment Key Error Response:', JSON.stringify(error, null, 2));
    throw new Error(`Failed to get Paymob payment key: ${JSON.stringify(error)}`);
  }

  const data = await res.json();
  return data.token;
}
