import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  Globe,
  MapPin,
  Users,
  Building2,
  Clock,
  Star,
  Briefcase,
  Heart,
  Handshake,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
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

        {org.isKopgroep && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 border border-emerald-200">
            <Star className="h-4 w-4" />
            Kopgroep-lid Kwaliteit als Medicijn
          </div>
        )}
      </div>

      {/* Kopgroep Profiel */}
      {org.kopgroepProfiel && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-600" />
            Organisatieprofiel
          </h2>

          {/* Key stats */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {org.kopgroepProfiel.aantalClienten && (
              <div className="rounded-xl border border-surface-200 bg-white p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Users className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Cliënten</span>
                </div>
                <p className="mt-1 text-xl font-bold text-foreground">{org.kopgroepProfiel.aantalClienten}</p>
                {org.kopgroepProfiel.percentageJeugdZHZ && (
                  <p className="text-xs text-gray-500">waarvan {org.kopgroepProfiel.percentageJeugdZHZ} jeugd-GGZ in ZHZ</p>
                )}
              </div>
            )}
            {org.kopgroepProfiel.aantalMedewerkers && (
              <div className="rounded-xl border border-surface-200 bg-white p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Medewerkers</span>
                </div>
                <p className="mt-1 text-xl font-bold text-foreground">{org.kopgroepProfiel.aantalMedewerkers}</p>
                {org.kopgroepProfiel.aantalVrijwilligers && (
                  <p className="text-xs text-gray-500">+ {org.kopgroepProfiel.aantalVrijwilligers} vrijwilligers</p>
                )}
              </div>
            )}
            {org.kopgroepProfiel.aantalLocaties && (
              <div className="rounded-xl border border-surface-200 bg-white p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Building2 className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Locaties</span>
                </div>
                <p className="mt-1 text-xl font-bold text-foreground">{org.kopgroepProfiel.aantalLocaties}</p>
              </div>
            )}
            {org.kopgroepProfiel.wachttijden && (
              <div className="rounded-xl border border-surface-200 bg-white p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Wachttijden</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-foreground">{org.kopgroepProfiel.wachttijden}</p>
              </div>
            )}
          </div>

          {/* Identity badge */}
          {org.kopgroepProfiel.identiteit && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm text-purple-800 border border-purple-200">
              <Heart className="h-4 w-4" />
              {org.kopgroepProfiel.identiteit}
            </div>
          )}

          {/* Focus & Zorgaanbod */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-surface-200 bg-white p-5">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                Focusgebieden
              </h3>
              <ul className="mt-3 space-y-2">
                {org.kopgroepProfiel.focusGebieden.map((focus, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-surface-200 bg-white p-5">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary-600" />
                Zorgaanbod
              </h3>
              <ul className="mt-3 space-y-2">
                {org.kopgroepProfiel.zorgaanbod.map((aanbod, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{aanbod}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Speciale programma's */}
          {org.kopgroepProfiel.speciaalProgramma && org.kopgroepProfiel.speciaalProgramma.length > 0 && (
            <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50/50 p-5">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent-600" />
                Speciale Programma&apos;s
              </h3>
              <ul className="mt-3 space-y-2">
                {org.kopgroepProfiel.speciaalProgramma.map((prog, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                    <span>{prog}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* KAM Initiatief & Samenwerkingen */}
          <div className="mt-6 flex flex-wrap gap-4">
            {org.kopgroepProfiel.kamInitiatief && (
              <div className="rounded-xl border border-primary-200 bg-primary-50/60 p-4">
                <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 flex items-center gap-1">
                  <Handshake className="h-3 w-3" />
                  KAM Initiatief
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary-800">{org.kopgroepProfiel.kamInitiatief}</p>
              </div>
            )}
            {org.kopgroepProfiel.samenwerkingen && org.kopgroepProfiel.samenwerkingen.length > 0 && (
              <div className="rounded-xl border border-surface-200 bg-white p-4">
                <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">Samenwerkingen</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {org.kopgroepProfiel.samenwerkingen.map((s, i) => (
                    <span key={i} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Mini-profiel voor niet-kopgroep organisaties */}
      {!org.kopgroepProfiel && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary-600" />
            Organisatieprofiel
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-surface-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Over deze organisatie</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{org.beschrijving}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  <MapPin className="h-3 w-3" />
                  {org.regio}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  <Building2 className="h-3 w-3" />
                  {org.type === 'ggz-instelling' ? 'GGZ-instelling' : org.type === 'jeugdzorg-aanbieder' ? 'Jeugdzorgaanbieder' : org.type === 'gemeente' ? 'Gemeente' : org.type}
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-surface-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>Contactpersoon: <em className="text-gray-400">Nog niet beschikbaar</em></span>
                </div>
                {org.website ? (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">
                      {org.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400 italic">Website niet bekend</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{org.regio}</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-400 italic">
                Wilt u opgenomen worden met uitgebreide contactgegevens? Neem contact op met het KAM-programmabureau.
              </p>
            </div>
          </div>
        </section>
      )}

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
