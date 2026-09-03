const BASE = '/api';

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  listProducts: () => request('/products'),
  getProduct: (slug) => request(`/products/${slug}`),
  checkout: (variantId, emiPlanId) =>
    request('/checkout', {
      method: 'POST',
      body: JSON.stringify({ variantId, emiPlanId }),
    }),
};
