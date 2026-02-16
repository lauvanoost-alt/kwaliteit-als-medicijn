import type { Metadata } from 'next';
import { Mail, User } from 'lucide-react';
import { communityMembers } from '@/data/community';
import { themes } from '@/data/themes';
import { Tag } from '@/components/ui/Tag';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Vind collega-professionals in de regio en werk samen aan betere jeugd GGZ.',
};

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Community</h1>
      <p className="mt-2 text-gray-500">
        Vind collega-professionals in de regio, deel kennis en werk samen aan nieuwe initiatieven.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {communityMembers.map((member) => {
          const memberThemes = member.expertise
            .map((s) => themes.find((t) => t.slug === s))
            .filter(Boolean);

          return (
            <div
              key={member.id}
              className="flex flex-col rounded-xl border border-surface-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{member.naam}</h3>
                  <p className="text-sm text-gray-500">{member.functie}</p>
                  <p className="text-xs text-gray-400">{member.organisatie}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600 line-clamp-3">{member.bio}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {memberThemes.map((theme) =>
                  theme ? <Tag key={theme.slug} label={theme.label} color={theme.color} /> : null
                )}
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-400">Beschikbaar voor:</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {member.beschikbaarVoor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-surface-100 px-2 py-0.5 text-xs text-gray-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-surface-100">
                <a
                  href={`mailto:${member.id}@mycareteam.nl`}
                  className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Neem contact op
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
