import { Link } from 'react-router-dom';
import { formatINR } from '../lib/format';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block rounded-2xl border border-line bg-white/60 overflow-hidden shadow-card hover:-translate-y-0.5 transition-transform focus-ring"
    >
      <div className="aspect-square bg-goldLight/40 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-ink2">{product.brand}</p>
        <h3 className="font-display text-lg font-medium text-ink leading-snug mt-0.5">{product.name}</h3>
        <p className="text-xs text-ink2 mt-1">
          {product.colorCount} colours · {product.storageCount} storage options
        </p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-ink2">From</p>
            <p className="tnum font-semibold text-ink">{formatINR(product.startingPrice)}</p>
          </div>
          {product.startingEmi && (
            <div className="text-right">
              <p className="text-xs text-ink2">or EMI from</p>
              <p className="tnum font-semibold text-moss">{formatINR(product.startingEmi)}/mo</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
