import { Lightbulb, Building2, Layers, Users } from 'lucide-react';
import { projects } from '@/data/projects';
import { organizations } from '@/data/organizations';
import { themes } from '@/data/themes';
import { communityMembers } from '@/data/community';

const stats = [
  {
    label: 'Actieve pilots',
    value: projects.filter((p) => p.status === 'lopend').length,
    icon: Lightbulb,
  },
  {
    label: 'Organisaties',
    value: organizations.length,
    icon: Building2,
  },
  {
    label: "Thema's",
    value: themes.length,
    icon: Layers,
  },
  {
    label: 'Professionals',
    value: communityMembers.length,
    icon: Users,
  },
];

export function RegionalStats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-primary-600 p-8 sm:p-12">
        <h2 className="text-center text-2xl font-bold text-white">De regio in cijfers</h2>
        <p className="mt-2 text-center text-primary-100">
          Samen werken aan minder volumes en betere kwaliteit in Zuid-Holland Zuid
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto h-8 w-8 text-primary-200" />
              <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-primary-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
