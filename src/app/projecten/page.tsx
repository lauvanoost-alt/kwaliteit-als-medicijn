import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectGrid } from '@/components/projects/ProjectGrid';

export const metadata: Metadata = {
  title: 'Projecten',
  description:
    'Overzicht van alle pilots en initiatieven gericht op volume-reductie in de Jeugd GGZ in Zuid-Holland Zuid.',
};

export default function ProjectenPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Projecten</h1>
        <p className="mt-2 text-gray-500">
          Alle pilots en initiatieven gericht op volume-reductie en Kwaliteit als Medicijn in de regio.
        </p>
      </div>

      <Suspense fallback={null}>
        <div className="mb-8">
          <ProjectFilters />
        </div>
        <ProjectGrid />
      </Suspense>
    </div>
  );
}
