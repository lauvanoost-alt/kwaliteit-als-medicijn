import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export function RecentPilots() {
  const featured = getFeaturedProjects();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Recente pilots</h2>
          <p className="mt-1 text-gray-500">Lopende en afgeronde initiatieven in de regio</p>
        </div>
        <Link
          href="/projecten"
          className="hidden items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 sm:flex"
        >
          Bekijk alle projecten
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/projecten"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600"
        >
          Bekijk alle projecten
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
