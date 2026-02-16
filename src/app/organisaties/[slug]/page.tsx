import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Globe, MapPin } from 'lucide-react';
import { organizations, getOrganizationBySlug } from '@/data/organizations';
import { projects } from '@/data/projects';
import { contacts } from '@/data/contacts';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ContactCard } from '@/components/ui/ContactCard';

export function generateStaticParams() {
  return organizations.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const org = getOrganizationBySlug(slug);
  if (!org) return { title: 'Organisatie niet gevonden' };
  return { title: org.naam, description: org.beschrijving };
}

export default async function OrganisatieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const org = getOrganizationBySlug(slug);
  if (!org) notFound();

  const orgProjects = projects.filter((p) => org.projectSlugs.includes(p.slug));
  const orgContacts = org.contactPersonen
    .map((id) => contacts.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/organisaties"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Terug naar organisaties
      </Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{org.naam}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {org.regio}
          </span>
          {org.website && (
            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
            >
              <Globe className="h-4 w-4" />
              Website
            </a>
          )}
        </div>
        <p className="mt-4 text-gray-600 leading-relaxed">{org.beschrijving}</p>
      </div>

      {orgProjects.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Projecten</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {orgProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {orgContacts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Contactpersonen</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orgContacts.map((contact) =>
              contact ? <ContactCard key={contact.id} contact={contact} /> : null
            )}
          </div>
        </section>
      )}
    </div>
  );
}
