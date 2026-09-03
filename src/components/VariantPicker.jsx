export default function VariantPicker({ variants, selected, onSelect }) {
  const storages = [...new Set(variants.map((v) => v.storage))];
  const colorsForStorage = variants.filter((v) => v.storage === selected.storage);

  return (
    <div className="space-y-4">
      {storages.length > 1 && (
        <div>
          <p className="text-xs uppercase tracking-wide text-ink2 mb-2">Storage</p>
          <div className="flex flex-wrap gap-2">
            {storages.map((storage) => {
              const active = storage === selected.storage;
              const match = variants.find((v) => v.storage === storage && v.color === selected.color)
                || variants.find((v) => v.storage === storage);
              return (
                <button
                  key={storage}
                  onClick={() => onSelect(match)}
                  className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors focus-ring ${
                    active
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line text-ink hover:border-ink/40'
                  }`}
                  aria-pressed={active}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs uppercase tracking-wide text-ink2 mb-2">
          Colour · <span className="text-ink">{selected.color}</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {colorsForStorage.map((v) => {
            const active = v.id === selected.id;
            return (
              <button
                key={v.id}
                onClick={() => onSelect(v)}
                title={v.color}
                aria-pressed={active}
                aria-label={v.color}
                className={`h-9 w-9 rounded-full border-2 transition-all focus-ring ${
                  active ? 'border-ink scale-110' : 'border-transparent hover:border-ink/30'
                }`}
              >
                <span
                  className="block h-full w-full rounded-full border border-black/10"
                  style={{ backgroundColor: v.colorHex }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
