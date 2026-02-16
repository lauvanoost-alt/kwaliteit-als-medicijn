import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, FileText, GitFork, Compass, BookMarked } from 'lucide-react';
import { knowledgeItems } from '@/data/knowledge';
import { themes } from '@/data/themes';
import { Tag } from '@/components/ui/Tag';
import { KnowledgeType } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Kennisbank',
  description: 'Frameworks, instrumenten, beslisbomen en richtlijnen rondom Kwaliteit als Medicijn en volume-reductie.',
};

const typeConfig: Record<KnowledgeType, { label: string; icon: typeof BookOpen; color: string }> = {
  framework: { label: 'Framework', icon: BookOpen, color: 'bg-primary-50 text-primary-600' },
  instrument: { label: 'Instrument', icon: Compass, color: 'bg-amber-50 text-amber-600' },
  beslisboom: { label: 'Beslisboom', icon: GitFork, color: 'bg-violet-50 text-violet-600' },
  richtlijn: { label: 'Richtlijn', icon: BookMarked, color: 'bg-emerald-50 text-emerald-600' },
  publicatie: { label: 'Publicatie', icon: FileText, color: 'bg-sky-50 text-sky-600' },
};

export default function KennisbankPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Kennisbank</h1>
      <p className="mt-2 text-gray-500">
        Frameworks, instrumenten, beslisbomen en richtlijnen rondom Kwaliteit als Medicijn.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {knowledgeItems.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          const itemThemes = item.themas
            .map((s) => themes.find((t) => t.slug === s))
            .filter(Boolean);

          return (
            <Link
              key={item.slug}
              href={`/kennisbank/${item.slug}`}
              className="group flex flex-col rounded-xl border border-surface-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-surface-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  {config.label}
                </span>
              </div>

              <h3 className="mt-3 text-base font-semibold text-foreground group-hover:text-primary-700">
                {item.titel}
              </h3>
              <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{item.beschrijving}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {itemThemes.map((theme) =>
                  theme ? <Tag key={theme.slug} label={theme.label} color={theme.color} /> : null
                )}
              </div>

              <p className="mt-auto pt-4 text-xs text-gray-400 border-t border-surface-100">
                Laatst bijgewerkt: {new Date(item.laatstBijgewerkt).toLocaleDateString('nl-NL')}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
