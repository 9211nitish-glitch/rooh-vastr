import Link from 'next/link';
import { ArrowRight, Compass, Home, Search, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#FAF7F2] px-4 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#6D1835]/10 text-[#6D1835] mb-6">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '18s' }} />
        </div>

        <span className="text-xs font-semibold tracking-[0.25em] text-[#6D1835] uppercase block mb-2">
          Page Lost in Transit
        </span>
        <h1 className="font-serif text-5xl md:text-6xl text-[#242124] font-medium tracking-tight mb-4">
          404
        </h1>
        <p className="font-serif text-2xl text-[#242124] italic mb-4">
          "Every memory has a place, but this page isn&apos;t one of them."
        </p>
        <p className="text-sm text-stone-600 mb-8 max-w-md mx-auto leading-relaxed">
          The bespoke page or gift you are looking for might have been retired, renamed, or temporarily relocated in our atelier.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6D1835] text-white px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#56132a] transition-all shadow-md"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#242124]/20 bg-white text-[#242124] px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:border-[#6D1835] hover:text-[#6D1835] transition-all"
          >
            <ShoppingBag className="w-4 h-4" /> Explore Shop
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200/80 text-xs text-stone-500">
          Looking for a custom print or personalized order?{' '}
          <Link href="/custom-printing" className="text-[#6D1835] font-semibold underline underline-offset-4 hover:opacity-80">
            Open Bespoke Studio &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
