import Link from 'next/link';
import { HeartPulse } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <HeartPulse className="h-6 w-6 text-primary-500" />
              <span className="text-lg font-bold text-primary-800">{siteConfig.naam}</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">{siteConfig.tagline}</p>
            <p className="mt-1 text-sm text-gray-500">Regio {siteConfig.regio}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Platform</h3>
            <ul className="mt-3 space-y-2">
              {siteConfig.allPages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-500 hover:text-primary-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Kwaliteit als Medicijn</h3>
            <p className="mt-3 text-sm text-gray-500">
              Betere kwaliteit van zorg leidt tot minder volumes. Dit platform maakt initiatieven in de jeugd GGZ
              zichtbaar zodat we samen sneller en slimmer kunnen werken.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-surface-200 pt-6">
          <p className="text-center text-xs text-gray-400">
            {siteConfig.naam} — Jeugd GGZ {siteConfig.regio} — Samen werken aan betere zorg
          </p>
        </div>
      </div>
    </footer>
  );
}
