'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { themes } from '@/data/themes';
import { ProjectStatus } from '@/lib/types';
import { statusLabels } from '@/lib/utils';

const statuses: ProjectStatus[] = ['lopend', 'afgerond', 'opgeschaald', 'idee'];

export function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeThema = searchParams.get('thema') || '';
  const activeStatus = searchParams.get('status') || '';
  const zoekterm = searchParams.get('q') || '';

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/projecten?${params.toString()}`);
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Zoek op titel, thema of trefwoord..."
          defaultValue={zoekterm}
          onChange={(e) => updateParams('q', e.target.value)}
          className="w-full rounded-lg border border-surface-200 bg-white py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

      {/* Theme filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams('thema', '')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            !activeThema
              ? 'bg-primary-600 text-white'
              : 'bg-surface-100 text-gray-600 hover:bg-surface-200'
          }`}
        >
          Alle thema&apos;s
        </button>
        {themes.map((theme) => (
          <button
            key={theme.slug}
            onClick={() => updateParams('thema', activeThema === theme.slug ? '' : theme.slug)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeThema === theme.slug
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-gray-600 hover:bg-surface-200'
            }`}
          >
            {theme.label}
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams('status', '')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            !activeStatus
              ? 'bg-primary-600 text-white'
              : 'bg-surface-100 text-gray-600 hover:bg-surface-200'
          }`}
        >
          Alle statussen
        </button>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => updateParams('status', activeStatus === status ? '' : status)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeStatus === status
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-gray-600 hover:bg-surface-200'
            }`}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>
    </div>
  );
}
