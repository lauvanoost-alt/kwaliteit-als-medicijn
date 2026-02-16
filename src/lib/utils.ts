import { ProjectStatus } from './types';

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'short',
  });
}

export const statusLabels: Record<ProjectStatus, string> = {
  idee: 'Idee',
  lopend: 'Lopend',
  afgerond: 'Afgerond',
  opgeschaald: 'Opgeschaald',
};

export const statusColors: Record<ProjectStatus, string> = {
  idee: 'bg-amber-100 text-amber-800',
  lopend: 'bg-emerald-100 text-emerald-800',
  afgerond: 'bg-sky-100 text-sky-800',
  opgeschaald: 'bg-violet-100 text-violet-800',
};
