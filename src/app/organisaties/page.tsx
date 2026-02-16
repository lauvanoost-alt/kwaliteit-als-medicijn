import Link from 'next/link';
import type { Metadata } from 'next';
import { Building2, MapPin, ArrowRight } from 'lucide-react';
import { organizations } from '@/data/organizations';

export const metadata: Metadata = {
  title: 'Organisaties',
  description: 'Deelnemende organisaties aan het Kwaliteit-Als-Medicijn-ZHZ platform in Zuid-Holland Zuid.',
};

const typeLabels: Record<string, string> = {
  'ggz-instelling': 'GGZ-instelling',
  gemeente: 'Gemeente',
  huisartsenpraktijk: 'Huisartsenpraktijk',
  onderwijs: 'Onderwijs',
  overig: 'Overig',
};

export default function OrganisatiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Organisaties</h1>
      <p className="mt-2 text-gray-500">
        Deelnemende organisaties in de regio Zuid-Holland Zuid.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <Link
            key={org.slug}
            href={`/organisaties/${org.slug}`}
            className="group flex flex-col rounded-xl border border-surface-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-surface-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {typeLabels[org.type]}
              </span>
            </div>

            <h3 className="mt-3 text-base font-semibold text-foreground group-hover:text-primary-700">
              {org.naam}
            </h3>
            <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{org.beschrijving}</p>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-surface-100">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin className="h-3 w-3" />
                {org.regio}
              </span>
              <span className="text-xs text-gray-400">{org.projectSlugs.length} project(en)</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
