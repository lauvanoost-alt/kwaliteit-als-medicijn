'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import {
  Building2,
  MapPin,
  Award,
  Search,
  Filter,
  Users,
  Star,
  ChevronRight,
} from 'lucide-react';
import { organizations } from '@/data/organizations';

const typeLabels: Record<string, string> = {
  'ggz-instelling': 'GGZ-instelling',
  gemeente: 'Gemeente',
  huisartsenpraktijk: 'Huisartsenpraktijk',
  onderwijs: 'Onderwijs',
  'jeugdzorg-aanbieder': 'Jeugdzorgaanbieder',
  overig: 'Overig',
};

type FilterMode = 'alle' | 'kopgroep' | 'overig';

export default function OrganisatiesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('alle');

  const kopgroepCount = organizations.filter((o) => o.isKopgroep).length;
  const totalCount = organizations.length;

  const filtered = useMemo(() => {
    let list = [...organizations];

    if (filter === 'kopgroep') list = list.filter((o) => o.isKopgroep);
    else if (filter === 'overig') list = list.filter((o) => !o.isKopgroep);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.naam.toLowerCase().includes(q) ||
          o.beschrijving.toLowerCase().includes(q) ||
          o.regio.toLowerCase().includes(q),
      );
    }

    // Sort: kopgroep first, then alphabetical
    list.sort((a, b) => {
      if (a.isKopgroep && !b.isKopgroep) return -1;
      if (!a.isKopgroep && b.isKopgroep) return 1;
      return a.naam.localeCompare(b.naam);
    });

    return list;
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-800 to-sky-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-6 w-6 text-primary-200" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary-200">
              Zuid-Holland Zuid
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Organisaties
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-primary-100">
            Alle {totalCount} jeugdzorgaanbieders in de regio Zuid-Holland Zuid, waarvan{' '}
            {kopgroepCount} kopgroep-leden die vooroplopen in de transformatie.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium">
              <Users className="h-4 w-4" /> {totalCount} Aanbieders
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium">
              <Star className="h-4 w-4 text-amber-300" /> {kopgroepCount} Kopgroep
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek op naam, regio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            {([
              ['alle', 'Alle'],
              ['kopgroep', `Kopgroep (${kopgroepCount})`],
              ['overig', 'Overige'],
            ] as [FilterMode, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  filter === key
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-gray-500">
          {filtered.length} organisatie{filtered.length !== 1 ? 's' : ''} gevonden
        </p>

        {/* Kopgroep Section */}
        {filter !== 'overig' && filtered.some((o) => o.isKopgroep) && (
          <>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              <Award className="h-5 w-5 text-amber-500" />
              Kopgroep Aanbieders
            </h2>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filtered
                .filter((o) => o.isKopgroep)
                .map((org) => (
                  <Link
                    key={org.slug}
                    href={`/organisaties/${org.slug}`}
                    className="group flex flex-col rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <Star className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                        Kopgroep
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-gray-900 group-hover:text-primary-700">
                      {org.naam}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">
                      {org.beschrijving}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-amber-100">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="h-3 w-3" />
                        {org.regio}
                      </span>
                      <ChevronRight className="h-4 w-4 text-amber-400 transition group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
            </div>
          </>
        )}

        {/* Other Providers */}
        {filtered.some((o) => !o.isKopgroep) && (
          <>
            {filter !== 'kopgroep' && (
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <Building2 className="h-5 w-5 text-gray-500" />
                Alle Aanbieders in de Regio
              </h2>
            )}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered
                .filter((o) => !o.isKopgroep)
                .map((org) => (
                  <Link
                    key={org.slug}
                    href={`/organisaties/${org.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary-200 hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900 group-hover:text-primary-700">
                        {org.naam}
                      </p>
                      <p className="truncate text-xs text-gray-400">
                        {typeLabels[org.type] || org.type} &middot; {org.regio}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:text-primary-400 group-hover:translate-x-0.5" />
                  </Link>
                ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Search className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4 text-lg font-medium text-gray-500">
              Geen organisaties gevonden
            </p>
            <p className="text-sm text-gray-400">
              Probeer een andere zoekterm of filter.
            </p>
          </div>
        )}

        {/* Note */}
        <p className="mt-10 text-center text-xs text-gray-400">
          Lijst van gecontracteerde jeugdzorgaanbieders in de regio Zuid-Holland
          Zuid. Kopgroep-leden zijn aanbieders die actief bijdragen aan de
          Kwaliteit als Medicijn-transformatie.
        </p>
      </div>
    </div>
  );
}
