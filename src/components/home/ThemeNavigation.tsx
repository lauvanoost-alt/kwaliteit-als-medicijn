import Link from 'next/link';
import {
  Search,
  HeartHandshake,
  TrendingUp,
  Heart,
  Laptop,
  GraduationCap,
  Users,
  Clock,
} from 'lucide-react';
import { themes } from '@/data/themes';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  HeartHandshake,
  TrendingUp,
  Heart,
  Laptop,
  GraduationCap,
  Users,
  Clock,
};

const bgColorMap: Record<string, string> = {
  emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
  sky: 'bg-sky-50 text-sky-600 group-hover:bg-sky-100',
  amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-100',
  rose: 'bg-rose-50 text-rose-600 group-hover:bg-rose-100',
  violet: 'bg-violet-50 text-violet-600 group-hover:bg-violet-100',
  orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100',
  teal: 'bg-teal-50 text-teal-600 group-hover:bg-teal-100',
  slate: 'bg-slate-50 text-slate-600 group-hover:bg-slate-100',
};

export function ThemeNavigation() {
  return (
    <section className="bg-surface-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground">Zoek op thema</h2>
        <p className="mt-1 text-gray-500">Ontdek projecten per themagebied</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme) => {
            const Icon = iconMap[theme.icon] || Search;
            const colors = bgColorMap[theme.color] || bgColorMap.slate;
            return (
              <Link
                key={theme.slug}
                href={`/projecten?thema=${theme.slug}`}
                className="group flex items-start gap-3 rounded-xl border border-surface-200 bg-white p-4 transition-all hover:border-primary-200 hover:shadow-sm"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{theme.label}</h3>
                  <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{theme.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
