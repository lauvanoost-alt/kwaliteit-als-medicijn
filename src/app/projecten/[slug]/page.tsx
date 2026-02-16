import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  FileText,
  TrendingDown,
  Smile,
  PiggyBank,
  UsersRound,
  Mail,
} from 'lucide-react';
import { projects, getProjectBySlug } from '@/data/projects';
import { organizations } from '@/data/organizations';
import { contacts } from '@/data/contacts';
import { themes } from '@/data/themes';
import { Badge } from '@/components/ui/Badge';
import { Tag } from '@/components/ui/Tag';
import { ContactCard } from '@/components/ui/ContactCard';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project niet gevonden' };
  return {
    title: project.titel,
    description: project.subtitel,
  };
}

function MarkdownContent({ content }: { content: string }) {
  const html = content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hup])/gm, '<p>')
    .replace(/<p><(h[23]|ul|li)/g, '<$1')
    .replace(/<\/(h[23]|ul)><\/p>/g, '</$1>');

  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projectOrgs = project.organisaties
    .map((s) => organizations.find((o) => o.slug === s))
    .filter(Boolean);
  const projectContacts = project.contactPersonen
    .map((id) => contacts.find((c) => c.id === id))
    .filter(Boolean);
  const projectThemes = project.themas
    .map((s) => themes.find((t) => t.slug === s))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/projecten"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Terug naar projecten
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <Badge status={project.status} />
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              {project.regio}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {formatDate(project.startDatum)}
              {project.eindDatum && ` — ${formatDate(project.eindDatum)}`}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">{project.titel}</h1>
          <p className="mt-2 text-lg text-gray-500">{project.subtitel}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {projectThemes.map((theme) =>
              theme ? <Tag key={theme.slug} label={theme.label} color={theme.color} /> : null
            )}
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          {/* Doelgroep */}
          <div className="mt-8 rounded-lg border border-surface-200 bg-surface-50 p-4">
            <p className="text-sm font-medium text-gray-700">Doelgroep</p>
            <p className="mt-1 text-sm text-gray-600">{project.doelgroep}</p>
          </div>

          {/* Sections */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">Aanleiding</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">{project.aanleiding}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">Doel</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">{project.doel}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">Aanpak</h2>
            <div className="mt-2 text-gray-600">
              <MarkdownContent content={project.aanpak} />
            </div>
          </section>

          {project.resultaten && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">Resultaten</h2>
              <div className="mt-2 text-gray-600">
                <MarkdownContent content={project.resultaten} />
              </div>
            </section>
          )}

          {/* Impact metrics */}
          {project.impact && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">Impact</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.impact.wachtlijstReductie && (
                  <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                    <TrendingDown className="h-5 w-5 text-emerald-600" />
                    <p className="mt-2 text-lg font-semibold text-emerald-800">
                      {project.impact.wachtlijstReductie}
                    </p>
                    <p className="text-xs text-emerald-600">Volume-reductie</p>
                  </div>
                )}
                {project.impact.clientTevredenheid && (
                  <div className="rounded-lg border border-sky-100 bg-sky-50 p-4">
                    <Smile className="h-5 w-5 text-sky-600" />
                    <p className="mt-2 text-lg font-semibold text-sky-800">
                      {project.impact.clientTevredenheid}
                    </p>
                    <p className="text-xs text-sky-600">Tevredenheid</p>
                  </div>
                )}
                {project.impact.kostenBesparing && (
                  <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                    <PiggyBank className="h-5 w-5 text-amber-600" />
                    <p className="mt-2 text-lg font-semibold text-amber-800">
                      {project.impact.kostenBesparing}
                    </p>
                    <p className="text-xs text-amber-600">Kostenbesparing</p>
                  </div>
                )}
                {project.impact.bereik && (
                  <div className="rounded-lg border border-violet-100 bg-violet-50 p-4">
                    <UsersRound className="h-5 w-5 text-violet-600" />
                    <p className="mt-2 text-lg font-semibold text-violet-800">
                      {project.impact.bereik}
                    </p>
                    <p className="text-xs text-violet-600">Bereik</p>
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm text-gray-600">{project.impact.samenvatting}</p>
            </section>
          )}

          {project.gelpierdeLessen && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">Geleerde lessen</h2>
              <div className="mt-2 text-gray-600">
                <MarkdownContent content={project.gelpierdeLessen} />
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Organizations */}
          <div className="rounded-xl border border-surface-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-foreground">Betrokken organisaties</h3>
            <ul className="mt-3 space-y-2">
              {projectOrgs.map((org) =>
                org ? (
                  <li key={org.slug}>
                    <Link
                      href={`/organisaties/${org.slug}`}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      {org.naam}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          {/* Contact persons */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Contactpersonen</h3>
            <div className="space-y-3">
              {projectContacts.map((contact) =>
                contact ? <ContactCard key={contact.id} contact={contact} /> : null
              )}
            </div>
          </div>

          {/* Documents */}
          {project.documenten && project.documenten.length > 0 && (
            <div className="rounded-xl border border-surface-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-foreground">Documenten</h3>
              <ul className="mt-3 space-y-2">
                {project.documenten.map((doc) => (
                  <li key={doc.titel} className="flex items-start gap-2">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                    <div>
                      <p className="text-sm text-foreground">{doc.titel}</p>
                      {doc.accessLevel === 'extended' && (
                        <p className="text-xs text-amber-600">Uitgebreide toegang vereist</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-5">
            <h3 className="text-sm font-semibold text-primary-800">Meer weten?</h3>
            <p className="mt-1 text-sm text-primary-700">
              Neem contact op met de projectleider of sluit je aan bij dit initiatief.
            </p>
            {projectContacts[0] && (
              <a
                href={`mailto:${projectContacts[0].email}?subject=${encodeURIComponent(project.titel)}`}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                <Mail className="h-4 w-4" />
                Vraag stellen
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
