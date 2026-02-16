import Link from 'next/link';
import { MapPin, Calendar } from 'lucide-react';
import { Project } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Tag } from '@/components/ui/Tag';
import { themes } from '@/data/themes';
import { organizations } from '@/data/organizations';
import { formatDateShort } from '@/lib/utils';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projecten/${project.slug}`}
      className="group flex flex-col rounded-xl border border-surface-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <Badge status={project.status} />
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <MapPin className="h-3 w-3" />
          {project.regio}
        </span>
      </div>

      <h3 className="mt-3 text-base font-semibold text-foreground group-hover:text-primary-700">
        {project.titel}
      </h3>
      <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{project.subtitel}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.themas.slice(0, 3).map((slug) => {
          const theme = themes.find((t) => t.slug === slug);
          return theme ? <Tag key={slug} label={theme.label} color={theme.color} /> : null;
        })}
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-surface-100">
        <span className="text-xs text-gray-400">
          {project.organisaties
            .map((slug) => organizations.find((o) => o.slug === slug)?.naam)
            .filter(Boolean)
            .join(', ')}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar className="h-3 w-3" />
          {formatDateShort(project.startDatum)}
        </span>
      </div>
    </Link>
  );
}
