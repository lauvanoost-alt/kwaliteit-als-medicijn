import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  TrendingDown,
  UserCheck,
  Building,
  Stethoscope,
  HeartPulse,
  Scale,
  RefreshCw,
  AlertTriangle,
  Lightbulb,
  Target,
  Users,
  BarChart3,
  ShieldCheck,
  HandHeart,
  Layers,
  ArrowDownRight,
  CircleDot,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kwaliteit als Medicijn',
  description:
    'Wat is het gedachtegoed Kwaliteit als Medicijn? Hoe leidt betere zorg tot minder volumes en lagere kosten? Uitgebreide toelichting.',
};

export default function KwaliteitAlsMedicijnPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-8 sm:p-12 text-white">
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-200">Het gedachtegoed</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Kwaliteit als Medicijn</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100 leading-relaxed">
            Betere zorg is goedkopere zorg. Door de kwaliteit van zorg te verbeteren, verminder je onnodige en
            vermijdbare behandelingen. Dat leidt tot lagere kosten, kortere wachtlijsten en meer tijd voor
            de patient.
          </p>
        </div>
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-600 opacity-30 blur-3xl" />
        <div className="absolute -bottom-8 right-1/4 h-48 w-48 rounded-full bg-accent-500 opacity-10 blur-3xl" />
      </div>

      {/* Kernidee */}
      <section className="mt-12">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-xl font-bold text-foreground">Het kernidee</h2>
        </div>
        <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
          <p>
            <strong className="text-foreground">Kwaliteit als Medicijn</strong> is een benadering ontwikkeld door
            Strategy& (onderdeel van PwC). Het centrale uitgangspunt is simpel maar krachtig: <em>meer zorg is niet
            automatisch betere zorg</em>. Door de kwaliteit van zorg te verbeteren, ontstaat een natuurlijke reductie
            van zorgvolumes — zonder in te leveren op uitkomsten. Integendeel: de uitkomsten worden beter.
          </p>
          <p>
            Het idee keert de gangbare logica om. In plaats van te besparen door te snijden in aanbod of
            toegankelijkheid, investeer je in kwaliteit. Die investering betaalt zichzelf terug doordat onnodige
            en vermijdbare zorg verdwijnt.
          </p>
        </div>
      </section>

      {/* Van vicieuze cirkel naar vliegwiel */}
      <section className="mt-12">
        <div className="flex items-start gap-3">
          <RefreshCw className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-xl font-bold text-foreground">Van vicieuze cirkel naar vliegwiel</h2>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Vicieuze cirkel */}
          <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold text-red-800">De vicieuze cirkel</h3>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-red-700">
              <li className="flex items-start gap-2">
                <CircleDot className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Kosten stijgen, dus er wordt ingezet op <strong>efficiency</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Efficiency leidt tot <strong>minder tijd</strong> voor de patient</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Minder tijd leidt tot <strong>meer verrichtingen</strong> en onnodige behandelingen</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Meer verrichtingen leiden tot <strong>hogere kosten</strong></span>
              </li>
            </ol>
          </div>

          {/* Vliegwiel */}
          <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-6">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Het vliegwiel van kwaliteit</h3>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-green-700">
              <li className="flex items-start gap-2">
                <CircleDot className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Investeer in <strong>zorgverbetering</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Meer tijd voor de patient, betere beslissingen</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="mt-0.5 h-4 w-4 shrink-0" />
                <span><strong>Minder onnodige</strong> en vermijdbare zorg</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="mt-0.5 h-4 w-4 shrink-0" />
                <span><strong>Lagere kosten</strong> en weer meer ruimte voor kwaliteit</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Waarom is dit nodig */}
      <section className="mt-12">
        <div className="flex items-start gap-3">
          <BarChart3 className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-xl font-bold text-foreground">Waarom is dit nodig?</h2>
        </div>
        <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
          <p>
            Zorgkosten stijgen jaar in jaar uit, gedreven door een toename van het <strong>aantal
            behandelingen</strong> — niet door prijsstijgingen. Vergrijzing verklaart slechts een klein deel
            van de volumegroei. De werkelijke oorzaak ligt dieper: het huidige stelsel beloont zorgverleners
            voor het aantal verrichtingen, niet voor het realiseren van gezondheidswinst.
          </p>
          <p>
            Dit leidt tot een fundamenteel probleem: goede zorg bestaat vaak uit <strong>niet
            behandelen</strong>, na zorgvuldig overleg met de patient. Maar een arts die adviseert om af te
            wachten, mist daarmee inkomsten. Dat knelt, zeker met toenemende financiele druk op instellingen.
          </p>
          <p>
            Traditionele recepten om kosten te beheersen — hogere eigen bijdragen, budgetteren, pakketverkleining —
            gaan ten koste van de toegankelijkheid of leiden tot wachtlijsten. Kwaliteit als Medicijn biedt
            een alternatief dat zowel de kosten verlaagt als de zorg verbetert.
          </p>
        </div>

        {/* Cijfer-highlight */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-primary-50 p-5 text-center">
            <p className="text-2xl font-bold text-primary-800">20-25%</p>
            <p className="mt-1 text-sm text-primary-600">van de zorg is onnodig of vermijdbaar</p>
          </div>
          <div className="rounded-xl bg-primary-50 p-5 text-center">
            <p className="text-2xl font-bold text-primary-800">60%</p>
            <p className="mt-1 text-sm text-primary-600">van de zorg mist empirische onderbouwing</p>
          </div>
          <div className="rounded-xl bg-primary-50 p-5 text-center">
            <p className="text-2xl font-bold text-primary-800">0,6%</p>
            <p className="mt-1 text-sm text-primary-600">volumegroei verklaard door vergrijzing (van ~5%)</p>
          </div>
        </div>
      </section>

      {/* De drie pijlers */}
      <section className="mt-12">
        <div className="flex items-start gap-3">
          <Layers className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-xl font-bold text-foreground">De drie pijlers</h2>
        </div>
        <p className="mt-3 text-gray-600">
          Het rapport identificeert drie pijlers voor zorgverbetering die leiden tot betere en minder zorg.
        </p>

        {/* Pijler 1 */}
        <div className="mt-8 rounded-xl border border-surface-200 bg-white p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Pijler 1: Verminderen overbehandeling en praktijkvariatie</h3>
              <p className="mt-1 text-sm text-gray-500">Meer evidence-based behandelen</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-gray-600 text-sm leading-relaxed">
            <p>
              Voor een groot deel van de alledaagse zorg ontbreekt wetenschappelijk bewijs dat deze effectief is.
              Dit gebrek aan evidence creert ruimte voor interpretatie, wat leidt tot grote <strong>praktijkvariatie</strong>:
              opvallende verschillen in behandelfrequentie tussen regio&apos;s en artsen onderling.
            </p>
            <p>
              Meer zorg is niet automatisch betere zorg. Internationaal onderzoek toont overtuigend aan dat
              grote verschillen in behandelintensiteit <strong>niet leiden tot verschillen in
              gezondheidswinst</strong>. Met name bij ouderen en patienten met complexe problematiek kan
              meer zorg zelfs schadelijk zijn.
            </p>
            <p>
              <strong>Wat helpt:</strong> Het systematisch uitwisselen van spiegelinformatie over
              behandeluitkomsten tussen professionals. Artsen die hun eigen handelen kunnen vergelijken met
              collega&apos;s, passen hun behandelpraktijk aan. Communicatieconsulten — meer tijd om met de
              patient te bespreken of behandeling echt nodig is — zijn essentieel.
            </p>
          </div>
        </div>

        {/* Pijler 2 */}
        <div className="mt-4 rounded-xl border border-surface-200 bg-white p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Pijler 2: Vergroten patientbetrokkenheid</h3>
              <p className="mt-1 text-sm text-gray-500">Samen beslissen met goed geinformeerde patienten</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-gray-600 text-sm leading-relaxed">
            <p>
              Patienten en artsen hebben vaak onuitgesproken en afwijkende doelstellingen. Wat voor de patient
              belangrijk is (minder pijn, beter functioneren) wijkt soms af van typische medische uitkomsten.
              De effectiviteit van behandelingen wordt door patienten snel overschat.
            </p>
            <p>
              Goed geinformeerde patienten maken <strong>conservatievere keuzes</strong>. Onderzoek laat zien
              dat patienten die keuzehulpen voorgelegd krijgen in gemiddeld 30% van de gevallen afzien van de
              ingreep en kiezen voor een conservatieve behandeloptie.
            </p>
            <p>
              <strong>Wat helpt:</strong> Het contact verschuiven van &quot;voorlichten over de beslissing van de
              dokter&quot; naar &quot;samen beslissen&quot;. Gebruik van keuzehulpen, betrekken van naasten, en inzet
              van lotgenotencontact en ervaringsdeskundigen.
            </p>
          </div>
          <div className="mt-4 rounded-lg bg-primary-50 p-4">
            <p className="text-sm font-semibold text-primary-800">
              Keuzehulpen leiden tot gemiddeld 30% minder keuze voor agressieve behandelopties
            </p>
          </div>
        </div>

        {/* Pijler 3 */}
        <div className="mt-4 rounded-xl border border-surface-200 bg-white p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Pijler 3: Organisatorische verbetering van de zorg</h3>
              <p className="mt-1 text-sm text-gray-500">De zorg anders inrichten</p>
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm leading-relaxed">
            <p className="mb-4">
              Het medisch systeem is ingericht op het snel uitvoeren van monodisciplinaire verrichtingen.
              Patienten doorlopen vaak een lange medische weg met risico op onnodige diagnostiek en
              behandelingen. Vier organisatorische verbeteringen:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-surface-50 p-4">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-primary-600" />
                  <h4 className="text-sm font-semibold text-foreground">Integrale diagnostiek</h4>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Vanaf het begin multidisciplinair een diagnose stellen. Dit voorkomt een dure trial-and-error
                  aanpak en onnodige behandeltrajecten.
                </p>
              </div>
              <div className="rounded-lg bg-surface-50 p-4">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-primary-600" />
                  <h4 className="text-sm font-semibold text-foreground">Integrale begeleiding chronisch zieken</h4>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Coordinatie van zorg voor patienten met meerdere aandoeningen. Richtlijnen zijn
                  geoptimaliseerd voor enkele aandoeningen, niet voor complexe patienten.
                </p>
              </div>
              <div className="rounded-lg bg-surface-50 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary-600" />
                  <h4 className="text-sm font-semibold text-foreground">Versterking eerste lijn</h4>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  De eerste lijn is vaak goedkoper en voor de patient aantrekkelijker. Specialisten
                  betrekken bij eerstelijnszorg vermindert verwijzingen.
                </p>
              </div>
              <div className="rounded-lg bg-surface-50 p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary-600" />
                  <h4 className="text-sm font-semibold text-foreground">Spreiding en concentratie</h4>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Specialistische ingrepen concentreren op plekken met leereffecten. Chronische zorg en
                  diagnostiek juist dicht bij huis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hoe werkt het: de aanpak */}
      <section className="mt-12">
        <div className="flex items-start gap-3">
          <Scale className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-xl font-bold text-foreground">De aanpak: betalen voor kwaliteit</h2>
        </div>
        <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
          <p>
            De kern van de aanpak is om zorgverleners te <strong>belonen voor kwaliteitsinitiatieven</strong> die
            onnodige zorg voorkomen. In plaats van alleen te betalen per verrichting, wordt er ook betaald voor
            zorgverbetering. De productiviteitsprikkel blijft behouden, maar wordt aangevuld door te betalen
            voor &quot;kwaliteitsproductie&quot;.
          </p>
          <p>
            Kwaliteitsinitiatieven worden vooraf doorgerekend in samenwerking met de verzekeraar. De
            kostenverlaging die ontstaat door minder onnodige zorg wordt deels teruggegeven aan de zorgverlener.
            Zo ontstaat een <strong>winstdelingsmodel</strong> dat zorgverleners intrinsiek motiveert.
          </p>
        </div>

        {/* Gefaseerde aanpak */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-foreground">Gefaseerde implementatie</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">1</div>
              <div>
                <h4 className="font-semibold text-foreground">Voorbereiding</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Selectie van betrokken zorgverleners en verzekeraars. Keuze van focusgebieden.
                  Eerste potentieelinschatting. Programmastructuur en raamwerk voor contracten.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">2</div>
              <div>
                <h4 className="font-semibold text-foreground">Kwaliteitsinitiatieven identificeren</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Zorgverleners op de werkvloer selecteren initiatieven. Business case per initiatief.
                  Financiele implicaties doorrekenen. Implementatieplan opstellen.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">3</div>
              <div>
                <h4 className="font-semibold text-foreground">Executie en monitoring</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Implementatie van de initiatieven. Voortgang monitoren. Resultaten meten en
                  winstdeling aanpassen op werkelijke voordelen. Herhalen voor nieuwe gebieden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertaling naar de Jeugd GGZ */}
      <section className="mt-12">
        <div className="flex items-start gap-3">
          <HandHeart className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-xl font-bold text-foreground">Vertaling naar de Jeugd GGZ</h2>
        </div>
        <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
          <p>
            Het Kwaliteit als Medicijn-gedachtegoed is oorspronkelijk ontwikkeld voor de curatieve zorg
            (ziekenhuizen, eerste lijn), maar de principes zijn direct toepasbaar in de jeugd GGZ.
            In de regio Zuid-Holland Zuid vertalen we de drie pijlers naar concrete initiatieven:
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
              <TrendingDown className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Minder overbehandeling</h3>
              <p className="mt-1 text-sm text-gray-500">
                <strong>De Kracht van Kort</strong> — Behandeltrajecten verkorten door gestructureerde werkwijze,
                spiegelinformatie en cultuurverandering bij behandelaren. Vooraf afspraken over behandelduur
                en tussentijdse evaluaties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
              <UserCheck className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Betere triage en samen beslissen</h3>
              <p className="mt-1 text-sm text-gray-500">
                <strong>Brede Intake</strong> — De hulpvraag vanuit meerdere perspectieven bekijken (GGZ,
                welzijn, ervaringsdeskundigheid). Voorkomt onnodige instroom in de specialistische GGZ.
                Bij GGZ NHN leidde dit tot 33-40% minder instroom.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
              <Users className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Gezinsgericht en contextgericht werken</h3>
              <p className="mt-1 text-sm text-gray-500">
                <strong>Gezinsgerichte Aanpak</strong> — Het hele gezinssysteem betrekken in plaats van losse
                diagnoses en labels. Minder medicalisering, minder fragmentatie, minder volumes op totaalniveau.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
              <HeartPulse className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Overbruggingszorg</h3>
              <p className="mt-1 text-sm text-gray-500">
                Actieve ondersteuning tijdens de wachtperiode. Bij een deel van de clienten maakt dit
                specialistische behandeling korter of zelfs overbodig. Dit is zowel kwaliteitsverbetering
                als volumereductie.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
              <ArrowDownRight className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Versterking eerste lijn</h3>
              <p className="mt-1 text-sm text-gray-500">
                <strong>Consultatie & Meekijken</strong> — GGZ-expertise bij de huisarts, zodat verwijzingen
                beter worden getrieerd en lichtere alternatieven eerder worden ingezet. Bij 42% van de
                consultvragen bleek een alternatief voor GGZ-verwijzing mogelijk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kernprincipes samengevat */}
      <section className="mt-12">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-xl font-bold text-foreground">Kernprincipes samengevat</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { title: 'Right care', text: 'De juiste zorg op het juiste moment, op de juiste plek' },
            { title: 'Lean care', text: 'Geen overbodige stappen, diagnostiek of behandelingen' },
            { title: 'Shared care', text: 'Samenwerking tussen professionals en met het gezin' },
            { title: 'Self care', text: 'Versterken van eigen regie en zelfredzaamheid' },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-primary-200 bg-primary-50/50 p-5">
              <h3 className="font-semibold text-primary-800">{p.title}</h3>
              <p className="mt-1 text-sm text-primary-700">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bron */}
      <section className="mt-12 rounded-xl bg-surface-50 p-6">
        <h3 className="text-sm font-semibold text-foreground">Bronnen</h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-500">
          <li>Strategy& / PwC — &quot;Kwaliteit als Medicijn: Aanpak voor betere zorg en lagere kosten&quot; (2012)</li>
          <li>Prof. Jan Kremer (Radboudumc), Prof. Rudi Westendorp (LUMC), Ab Klink (VGZ)</li>
          <li>Prof. Richard Grol — schatting 20-25% onnodige of vermijdbare zorg</li>
          <li>John Wennberg — onderzoek naar praktijkvariatie en overbehandeling</li>
          <li>Cochrane Collaboration — keuzehulpen en patientbetrokkenheid</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-primary-50 p-8">
        <h2 className="text-lg font-semibold text-primary-800">Bekijk de initiatieven in onze regio</h2>
        <p className="mt-2 text-primary-700">
          In Zuid-Holland Zuid passen acht kopgroep-aanbieders het Kwaliteit als Medicijn-gedachtegoed toe
          in de jeugd GGZ. Bekijk hun projecten en leer van hun ervaringen.
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
            href="/over-ons"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-300 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50"
          >
            Over de kopgroep
          </Link>
        </div>
      </section>
    </div>
  );
}
