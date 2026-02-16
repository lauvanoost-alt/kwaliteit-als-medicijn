import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kwaliteit-Als-Medicijn-ZHZ — Jeugd GGZ Zuid-Holland Zuid',
    template: '%s | Kwaliteit-Als-Medicijn-ZHZ',
  },
  description:
    'Platform voor jeugd GGZ initiatieven in Zuid-Holland Zuid. Ontdek pilots, deel kennis en werk samen aan minder volumes en betere kwaliteit.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
