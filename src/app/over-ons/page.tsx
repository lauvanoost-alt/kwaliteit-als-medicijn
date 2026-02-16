import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Over ons',
  description: 'Over MyCareTeam: het platform voor jeugd GGZ initiatieven in Zuid-Holland Zuid.',
};

const principles = [
  {
    icon: Eye,
    title: 'Transparantie',
    text: 'Alle initiatieven open en zichtbaar maken zodat iedereen kan leren van wat er al gebeurt in de regio.',
  },
  {
    icon: Users,
    title: 'Samenwerking',
    text: 'Kennis delen en samen optrekken in plaats van elk voor zich het wiel uitvinden.',
  },
  {
    icon: Target,
    title: 'Impact',
    text: 'Focussen op wat werkt en dat opschalen. Resultaten en geleerde lessen delen.',
  },
  {
    icon: Lightbulb,
    title: 'Innovatie',
    text: 'Ruimte voor experimenten en pilots. Durven te proberen en leren van wat niet werkt.',
  },
];

export default function OverOnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Over MyCareTeam</h1>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Onze missie</h2>
        <p className="mt-3 text-gray-600 leading-relaxed">
          MyCareTeam maakt alle lopende en afgeronde initiatieven rondom volume-reductie en Kwaliteit
          als Medicijn in de jeugd GGZ van Zuid-Holland Zuid zichtbaar, vindbaar en deelbaar. Zo
          kunnen zorgaanbieders en professionals leren van elkaar, kennis kopiëren en
          doorontwikkelen, en samen werken aan betere zorg met minder volumes.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Waarom dit platform?</h2>
        <div className="mt-4 space-y-3 text-gray-600 leading-relaxed">
          <p>
            Jeugd GGZ aanbieders voeren steeds vaker pilots uit gericht op het verminderen van
            instroom, het verkorten van trajecten, het normaliseren van hulpvragen en het verhogen
            van effectiviteit. Deze initiatieven zijn versnipperd en worden zelden gedeeld.
          </p>
          <p>
            Organisaties kennen elkaars pilots niet, waardoor kennis verloren gaat, opschaling
            uitblijft en elke aanbieder zelf weer het wiel moet uitvinden. Het regionale IZA-beleid
            vraagt juist om samenwerking en volume-reductie.
          </p>
          <p>
            Dit platform is de gedeelde bron voor projecten, inzichten, resultaten, geleerde lessen
            en contactpersonen. Hierdoor kunnen zorgaanbieders sneller en doelgerichter werken aan
            het verlagen van volumes.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Onze principes</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl border border-surface-200 bg-white p-5">
              <p.icon className="h-6 w-6 text-primary-500" />
              <h3 className="mt-2 font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Voor wie?</h2>
        <ul className="mt-3 space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Jeugd GGZ instellingen in de regio Zuid-Holland Zuid
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Zorgprofessionals: orthopedagogen, psychologen, behandelaren, intakers
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Beleidsadviseurs van gemeenten in ZHZ
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Projectleiders Kwaliteit als Medicijn en transformatie
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Coördinatoren van pilots, programma leads en regioteams
          </li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-primary-50 p-8">
        <h2 className="text-lg font-semibold text-primary-800">Doe mee</h2>
        <p className="mt-2 text-primary-700">
          Heeft jouw organisatie een pilot of initiatief rondom volume-reductie? Deel het op dit
          platform zodat anderen ervan kunnen leren.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Bekijk projecten
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-300 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50"
          >
            Vind professionals
          </Link>
        </div>
      </section>
    </div>
  );
}
