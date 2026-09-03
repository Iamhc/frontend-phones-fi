import { formatINR } from '../lib/format';

export default function EmiPlanCard({ plan, selected, onSelect }) {
  const isZero = plan.interestRatePct === 0;

  return (
    <label
      className={`relative flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-ink/40 ${
        selected ? 'border-ink bg-ink/[0.03]' : 'border-line hover:border-ink/25'
      }`}
    >
      <input
        type="radio"
        name="emi-plan"
        className="sr-only"
        checked={selected}
        onChange={() => onSelect(plan.id)}
      />
      <span
        aria-hidden
        className={`mt-0.5 h-4 w-4 flex-none rounded-full border-2 ${
          selected ? 'border-ink' : 'border-line'
        }`}
      >
        {selected && <span className="block h-full w-full scale-50 rounded-full bg-ink" />}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="tnum font-semibold text-ink">
            {formatINR(plan.monthlyAmount)}<span className="font-normal text-ink2">/mo</span>
          </p>
          <p className="text-sm text-ink2">for {plan.tenureMonths} months</p>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              isZero ? 'bg-mossLight text-moss' : 'bg-goldLight text-gold'
            }`}
          >
            {isZero ? '0% interest' : `${plan.interestRatePct}% interest`}
          </span>
          {plan.isRecommended && (
            <span className="rounded-full bg-ink text-paper px-2 py-0.5 text-xs font-medium">
              Most popular
            </span>
          )}
          {plan.cashbackAmount > 0 && (
            <span className="rounded-full bg-clay/10 text-clay px-2 py-0.5 text-xs font-medium">
              {formatINR(plan.cashbackAmount)} cashback
            </span>
          )}
        </div>

        <p className="mt-1.5 text-xs text-ink2">
          Backed by {plan.fundName} · {plan.fundHouse}
        </p>
        {plan.cashbackNote && (
          <p className="mt-0.5 text-xs text-ink2/80">{plan.cashbackNote}</p>
        )}

        <p className="mt-1 text-xs text-ink2/70">
          Total payable: <span className="tnum">{formatINR(plan.totalPayable)}</span>
        </p>
      </div>
    </label>
  );
}
