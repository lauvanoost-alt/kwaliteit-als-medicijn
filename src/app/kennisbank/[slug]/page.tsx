import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { knowledgeItems, getKnowledgeBySlug } from '@/data/knowledge';
import { themes } from '@/data/themes';
import { Tag } from '@/components/ui/Tag';

export function generateStaticParams() {
  return knowledgeItems.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getKnowledgeBySlug(slug);
  if (!item) return { title: 'Niet gevonden' };
  return { title: item.titel, description: item.beschrijving };
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

export default async function KennisbankDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getKnowledgeBySlug(slug);
  if (!item) notFound();

  const itemThemes = item.themas.map((s) => themes.find((t) => t.slug === s)).filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/kennisbank"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Terug naar kennisbank
      </Link>

      <div className="mt-6">
        <div className="flex flex-wrap gap-1.5">
          {itemThemes.map((theme) =>
            theme ? <Tag key={theme.slug} label={theme.label} color={theme.color} /> : null
          )}
        </div>
        <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">{item.titel}</h1>
        <p className="mt-2 text-lg text-gray-500">{item.beschrijving}</p>
        <p className="mt-2 text-sm text-gray-400">
          Laatst bijgewerkt: {new Date(item.laatstBijgewerkt).toLocaleDateString('nl-NL')}
        </p>
      </div>

      <div className="mt-8 text-gray-600">
        <MarkdownContent content={item.inhoud} />
      </div>

      {item.bronnen && item.bronnen.length > 0 && (
        <div className="mt-8 rounded-lg border border-surface-200 bg-surface-50 p-5">
          <h3 className="text-sm font-semibold text-foreground">Bronnen</h3>
          <ul className="mt-2 space-y-1">
            {item.bronnen.map((bron) => (
              <li key={bron}>
                <a
                  href={bron}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {bron}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
