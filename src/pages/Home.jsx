import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [state, setState] = useState({ status: 'loading', products: [] });

  useEffect(() => {
    let cancelled = false;
    api
      .listProducts()
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', products: data.products });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', products: [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <section className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-ink leading-tight">
          Get the phone today. Pay it off like an investment.
        </h1>
        <p className="mt-3 text-ink2">
          Every EMI plan here is backed by a partner mutual fund, so your instalments build a
          folio in the background while you pay off the device — some plans at 0% interest.
        </p>
      </section>

      {state.status === 'loading' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl border border-line bg-white/50 animate-pulse" />
          ))}
        </div>
      )}

      {state.status === 'error' && (
        <p className="text-clay">Couldn't load products. Is the API server running on port 4000?</p>
      )}

      {state.status === 'ready' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {state.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
