'use client';

import { useSearchParams } from 'next/navigation';
import { projects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { ThemeSlug, ProjectStatus } from '@/lib/types';

export function ProjectGrid() {
  const searchParams = useSearchParams();
  const thema = searchParams.get('thema') as ThemeSlug | null;
  const status = searchParams.get('status') as ProjectStatus | null;
  const zoekterm = searchParams.get('q') || '';

  let filtered = [...projects];

  if (thema) {
    filtered = filtered.filter((p) => p.themas.includes(thema));
  }
  if (status) {
    filtered = filtered.filter((p) => p.status === status);
  }
  if (zoekterm) {
    const term = zoekterm.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.titel.toLowerCase().includes(term) ||
        p.subtitel.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-surface-200 bg-white p-12 text-center">
        <p className="text-gray-500">Geen projecten gevonden met deze filters.</p>
        <p className="mt-1 text-sm text-gray-400">Probeer andere zoektermen of filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
