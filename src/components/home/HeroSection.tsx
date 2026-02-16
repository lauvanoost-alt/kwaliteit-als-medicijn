import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Jeugd GGZ — Zuid-Holland Zuid
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Minder volumes, betere kwaliteit door{' '}
            <span className="text-primary-600">samen te leren</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Ontdek alle lopende en afgeronde pilots rondom volume-reductie en Kwaliteit als Medicijn
            in de regio. Leer van elkaar, deel kennis en schaal op wat werkt.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
            >
              Bekijk projecten
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/kennisbank"
              className="inline-flex items-center gap-2 rounded-lg border border-surface-300 bg-white px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-surface-50"
            >
              <BookOpen className="h-4 w-4" />
              Kennisbank
            </Link>
          </div>
        </div>
      </div>
      {/* Decorative element */}
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-100 opacity-30 blur-3xl" />
      <div className="absolute -bottom-10 right-1/4 h-60 w-60 rounded-full bg-accent-400 opacity-10 blur-3xl" />
    </section>
  );
}
