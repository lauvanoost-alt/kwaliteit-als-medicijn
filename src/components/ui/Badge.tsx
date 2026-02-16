import { ProjectStatus } from '@/lib/types';
import { statusLabels, statusColors } from '@/lib/utils';

export function Badge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
