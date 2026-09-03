import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { formatINR } from '../lib/format';
import VariantPicker from '../components/VariantPicker';
import EmiPlanCard from '../components/EmiPlanCard';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [variantId, setVariantId] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setConfirmation(null);
    api
      .getProduct(slug)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        const def = data.variants.find((v) => v.isDefault) || data.variants[0];
        setVariantId(def.id);
        const rec = def.emiPlans.find((p) => p.isRecommended) || def.emiPlans[0];
        setPlanId(rec?.id ?? null);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('error'));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const variant = useMemo(
    () => product?.variants.find((v) => v.id === variantId) ?? null,
    [product, variantId]
  );
  const selectedPlan = useMemo(
    () => variant?.emiPlans.find((p) => p.id === planId) ?? null,
    [variant, planId]
  );

  function handleVariantChange(next) {
    setVariantId(next.id);
    const rec = next.emiPlans.find((p) => p.isRecommended) || next.emiPlans[0];
    setPlanId(rec?.id ?? null);
    setConfirmation(null);
  }

  async function handleProceed() {
    if (!variant || !selectedPlan) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await api.checkout(variant.id, selectedPlan.id);
      setConfirmation(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (status === 'loading') {
    return <main className="mx-auto max-w-6xl px-4 sm:px-6 py-16 text-ink2">Loading product…</main>;
  }
  if (status === 'error' || !product) {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <p className="text-clay">This product couldn't be found.</p>
        <Link to="/" className="text-ink underline mt-2 inline-block">Back to all products</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 pb-28 lg:pb-8">
      <Link to="/" className="text-sm text-ink2 hover:text-ink focus-ring rounded">← All products</Link>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10">
        {/* Image column */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="aspect-square rounded-2xl overflow-hidden bg-goldLight/40 border border-line">
            <img
              key={variant?.imageUrl}
              src={variant?.imageUrl}
              alt={`${product.brand} ${product.name} in ${variant?.color}`}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-3 text-xs text-ink2">
            {variant?.inStock ? `In stock · ${variant.stockQty} left` : 'Out of stock'}
          </p>
        </div>

        {/* Details column */}
        <div>
          <p className="text-xs uppercase tracking-wide text-ink2">{product.brand}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-1">{product.name}</h1>
          <p className="text-ink2 mt-2 max-w-md">{product.description}</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="tnum font-display text-2xl font-semibold text-ink">
              {formatINR(variant?.price ?? 0)}
            </span>
            {variant && variant.mrp > variant.price && (
              <>
                <span className="tnum text-ink2 line-through">{formatINR(variant.mrp)}</span>
                <span className="text-moss text-sm font-medium">{variant.discountPct}% off</span>
              </>
            )}
          </div>

          <div className="mt-6">
            {variant && (
              <VariantPicker
                variants={product.variants}
                selected={variant}
                onSelect={handleVariantChange}
              />
            )}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-medium text-ink">Choose your EMI plan</h2>
            <p className="text-sm text-ink2 mt-1">
              Every plan is issued against a partner mutual fund folio in your name.
            </p>
            <div className="mt-4 space-y-3">
              {variant?.emiPlans.map((plan) => (
                <EmiPlanCard
                  key={plan.id}
                  plan={plan}
                  selected={plan.id === planId}
                  onSelect={setPlanId}
                />
              ))}
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-clay">{error}</p>}

          {confirmation ? (
            <div className="mt-6 rounded-xl border border-moss/30 bg-mossLight p-4">
              <p className="font-medium text-moss">Application submitted</p>
              <p className="text-sm text-ink2 mt-1">{confirmation.message}</p>
              <p className="text-xs text-ink2 mt-2 tnum">Reference: {confirmation.confirmationId}</p>
            </div>
          ) : (
            <button
              onClick={handleProceed}
              disabled={!selectedPlan || submitting}
              className="hidden lg:block mt-6 w-full rounded-xl bg-ink text-paper py-3.5 font-medium hover:bg-ink2 transition-colors disabled:opacity-50 focus-ring"
            >
              {submitting ? 'Submitting…' : `Proceed with ${selectedPlan ? `${selectedPlan.tenureMonths}-month plan` : 'this plan'}`}
            </button>
          )}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      {!confirmation && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-line bg-paper/95 backdrop-blur p-4">
          <div className="mx-auto max-w-6xl flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-ink2">Selected plan</p>
              <p className="tnum font-semibold text-ink truncate">
                {selectedPlan ? `${formatINR(selectedPlan.monthlyAmount)}/mo` : '—'}
              </p>
            </div>
            <button
              onClick={handleProceed}
              disabled={!selectedPlan || submitting}
              className="rounded-xl bg-ink text-paper px-5 py-3 font-medium disabled:opacity-50 focus-ring"
            >
              {submitting ? 'Submitting…' : 'Proceed'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
