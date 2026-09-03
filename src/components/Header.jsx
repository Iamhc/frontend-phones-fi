import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b border-line bg-paper/95 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2 focus-ring rounded">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">Finlet</span>
          <span className="hidden sm:inline text-xs text-ink2">buy now, invest as you pay</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink2">
          <span className="hidden sm:inline">How it works</span>
          <span className="hidden sm:inline">Fund partners</span>
          <button className="rounded-full border border-ink/15 px-4 py-1.5 text-ink hover:bg-ink hover:text-paper transition-colors focus-ring">
            Sign in
          </button>
        </nav>
      </div>
    </header>
  );
}
