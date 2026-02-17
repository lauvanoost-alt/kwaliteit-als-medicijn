'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  X,
  Send,
  Stethoscope,
  Award,
  Building2,
  Landmark,
  Sparkles,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';

interface RoleData {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  pages: { label: string; href: string }[];
}

const roles: RoleData[] = [
  {
    id: 'zorgprofessional',
    title: 'Zorgprofessional',
    icon: Stethoscope,
    description:
      'Jij ziet dagelijks jongeren die vastlopen. Ontdek wat er al werkt en sluit je aan bij collega\u2019s in jouw regio.',
    pages: [
      { label: 'Initiatieven', href: '/initiatieven' },
      { label: 'Community', href: '/community' },
      { label: 'Quiz', href: '/quiz' },
    ],
  },
  {
    id: 'kopgroeplid',
    title: 'Zorgbestuurder (Kopgroeplid)',
    icon: Award,
    description:
      'Jullie organisatie loopt voorop. Hier vind je tools en data om jullie aanpak te versterken en resultaten zichtbaar te maken.',
    pages: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Impact Simulator', href: '/impact-simulator' },
      { label: 'Organisaties', href: '/organisaties' },
    ],
  },
  {
    id: 'geen-kopgroeplid',
    title: 'Zorgbestuurder (nog geen Kopgroeplid)',
    icon: Building2,
    description:
      'De beweging groeit \u2014 en er is plek voor jouw organisatie. Ontdek wat aansluiting kan opleveren.',
    pages: [
      { label: 'Kwaliteit als Medicijn', href: '/kwaliteit-als-medicijn' },
      { label: 'Initiatieven', href: '/initiatieven' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    id: 'wethouder',
    title: 'Wethouder',
    icon: Landmark,
    description:
      'Als bestuurder ben jij de onmisbare schakel. Zie wat deze transformatie betekent voor jongeren in jouw gemeente.',
    pages: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Gemeentekaart', href: '/gemeentekaart' },
      { label: 'Impact Simulator', href: '/impact-simulator' },
    ],
  },
  {
    id: 'verwijzer',
    title: 'Verwijzer (Huisarts / POH-GGZ)',
    icon: Stethoscope,
    description:
      'Als verwijzer ben je onmisbaar. Je kent je patiënten het beste en kunt bepalen of zorg nodig is en welke zorg past. Ontdek het aanbod, de trajecten en hoe je gericht kunt verwijzen.',
    pages: [
      { label: 'Initiatieven', href: '/initiatieven' },
      { label: 'Organisaties', href: '/organisaties' },
      { label: 'Kwaliteit als Medicijn', href: '/kwaliteit-als-medicijn' },
    ],
  },
  {
    id: 'overig',
    title: 'Overig / Nieuwsgierig',
    icon: Sparkles,
    description:
      'Gewoon benieuwd naar wat Kwaliteit als Medicijn is? Welkom! Verken het platform vrijblijvend en ontdek wat er speelt in de jeugd-GGZ.',
    pages: [
      { label: 'Home', href: '/' },
      { label: 'Quiz', href: '/quiz' },
      { label: 'Blog', href: '/blog' },
    ],
  },
];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/* ------------------------------------------------------------------ */
/*  Knowledge base for keyword-based AI-like responses                */
/* ------------------------------------------------------------------ */

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: [
      'kam',
      'kwaliteit als medicijn',
      'wat is kam',
      'uitleg',
      'pijlers',
      'strategy',
      'rapport',
      'drie pijlers',
      'evidence',
      'samen beslissen',
    ],
    answer:
      'Kwaliteit als Medicijn (KAM) is gebaseerd op het Strategy& rapport en rust op drie pijlers:\n\n1. **Verminderen van overbehandeling** \u2014 door evidence-based te werken en onnodige trajecten te voorkomen.\n2. **Vergroten van pati\u00ebntbetrokkenheid** \u2014 via samen beslissen, zodat jongeren en ouders actief meebeslissen over hun zorg.\n3. **Verbeteren van de organisatorische inrichting** \u2014 betere samenwerking, slimmere processen en data-gedreven sturing.\n\nDeze aanpak is bewezen in de curatieve zorg, onder andere bij Bernhoven en Santeon, met significante volume- en kostendalingen.',
  },
  {
    keywords: [
      'kopgroep',
      'aanbieders',
      'leden',
      'de hoop',
      'perspectief',
      'parnassia',
      'neuroscan',
      'eleos',
      'familysupporters',
      'mentaal beter',
      'carehouse',
      '8 aanbieders',
      'wie doen mee',
    ],
    answer:
      'De kopgroep KAM ZHZ bestaat uit 8 aanbieders die samen de beweging vormen:\n\n1. De Hoop\n2. Perspectief\n3. Parnassia\n4. NeuroScan\n5. Eleos\n6. FamilySupporters\n7. Mentaal Beter\n8. CareHouse\n\nDeze organisaties lopen voorop in het ontwikkelen en testen van innovatieve interventies. Samen leren ze van elkaars aanpak en schalen ze bewezen methoden op.',
  },
  {
    keywords: [
      'overbruggingszorg',
      'de hoop',
      'overbrugging',
      '1277',
      'afzien',
      'sggz',
      'besparing de hoop',
    ],
    answer:
      'Overbruggingszorg is het initiatief van De Hoop. De belangrijkste feiten:\n\n\u2022 Kosten: \u20ac1.277 per jeugdige voor het hele traject\n\u2022 20% van de jeugdigen ziet af van SGGZ na overbruggingszorg\n\u2022 40% verschuift van SGGZ naar lichtere BGGZ\n\u2022 Geschatte besparing: ~\u20ac2,0 mln (~11% van de totale SGGZ-kosten)\n\nHet idee is dat je jongeren op de wachtlijst niet l\u00e4\u00e4t wachten, maar actief begeleidt. Daardoor blijkt een deel van hen helemaal geen SGGZ meer nodig te hebben.',
  },
  {
    keywords: [
      'brede intake',
      'parnassia',
      'triage',
      'intake',
      'reductie sggz',
      'noord-holland',
    ],
    answer:
      'De Brede Intake is het initiatief van Parnassia. De kern:\n\n\u2022 Extra kosten: \u20ac250 per jeugdige (2 uur \u00e0 \u20ac125/uur)\n\u2022 30-40% reductie in SGGZ-instroom (onderkant bandbreedte aangehouden)\n\u2022 Geschatte besparing: ~\u20ac2,5 mln (~14%)\n\u2022 Gebaseerd op bewezen ervaring bij GGZ Noord-Holland-Noord\n\nDoor een bredere, zorgvuldigere intake worden jongeren direct naar de juiste zorgvorm geleid \u2014 waardoor minder jongeren onnodig in de SGGZ terechtkomen.',
  },
  {
    keywords: [
      'kracht van kort',
      'perspectief',
      'eleos',
      'behandelverkorting',
      'korter behandelen',
      'kort',
    ],
    answer:
      'Kracht van Kort is het initiatief van Perspectief & Eleos:\n\n\u2022 Doel: 10-20% behandelverkorting door effectiever en doelgerichter te behandelen\n\u2022 Geschatte besparing: \u20ac1,8 \u2013 \u20ac3,6 mln\n\u2022 Focus op kortere, intensievere behandeltrajecten zonder kwaliteitsverlies\n\nHet bewijs groeit dat kortere behandelingen minstens even effectief zijn \u2014 en soms zelfs beter, omdat de focus en motivatie behouden blijven.',
  },
  {
    keywords: [
      'gezinsgericht',
      'gezinsgerichte aanpak',
      'familysupporters',
      'neuroscan',
      'systemisch',
      'integraal werken',
      'gezin',
    ],
    answer:
      'De Gezinsgerichte Aanpak is het initiatief van FamilySupporters & NeuroScan:\n\n\u2022 Focus: systemisch en integraal werken \u2014 niet alleen het kind, maar het hele gezin behandelen\n\u2022 De business case is momenteel in ontwikkeling\n\u2022 De verwachting is dat door het gezin centraal te stellen, terugval vermindert en de zorg duurzamer effect heeft\n\nDit sluit aan bij de groeiende evidence dat jeugd-GGZ effectiever is wanneer het gezinssysteem wordt meegenomen.',
  },
  {
    keywords: [
      'integraal zorgaanbod',
      'carehouse',
      'groepsbegeleiding',
      'groep',
      '1 op 4',
      '1:4',
    ],
    answer:
      'Het Integraal Zorgaanbod is het initiatief van CareHouse:\n\n\u2022 Groepsbegeleiding in een verhouding van 1:4 (1 behandelaar op 4 jongeren)\n\u2022 De groepsbegeleiding loopt parallel aan de individuele behandeling\n\u2022 De business case is in ontwikkeling\n\nDoor groepswerk toe te voegen aan individuele behandeling profiteren jongeren van peer-support en sociale leereffecten.',
  },
  {
    keywords: [
      'besparing',
      'besparingen',
      'kosten',
      'miljoen',
      'totaal',
      'overlap',
      'sggz kosten',
      'bggz kosten',
      'geld',
      'budget',
    ],
    answer:
      'De totale geschatte besparing van alle KAM-initiatieven samen is \u20ac2,9 \u2013 \u20ac3,8 mln, gecorrigeerd voor overlap tussen de initiatieven (individuele besparingen zijn niet zomaar optelbaar).\n\nBelangrijke kengetallen:\n\u2022 SGGZ kost gemiddeld \u20ac3.800 per jeugdige\n\u2022 BGGZ kost gemiddeld \u20ac1.300 per jeugdige\n\u2022 Verschuiving van SGGZ naar BGGZ levert dus ~\u20ac2.500 per jeugdige op\n\nDe besparingen komen voort uit minder instroom in SGGZ, verschuiving naar lichtere zorg, en kortere behandelingen.',
  },
  {
    keywords: [
      'gemeente',
      'gemeenten',
      'zhz',
      'kostenverschillen',
      'sociaaleconomisch',
      'beleid',
      '10 gemeenten',
      '78%',
      '22%',
    ],
    answer:
      'In Zuid-Holland Zuid zijn 10 gemeenten betrokken bij KAM. Uit analyse blijkt:\n\n\u2022 78% van de kostenverschillen tussen gemeenten wordt verklaard door het sociaaleconomisch profiel (bevolkingssamenstelling, demografie)\n\u2022 22% hangt samen met lokaal beleid en initiatieven \u2014 d\u00e1\u00e1r zit de ruimte voor verbetering\n\nBekijk de Gemeentekaart op /gemeentekaart om te zien hoe jouw gemeente scoort en welke besparingspotentie er is.',
  },
  {
    keywords: [
      'wachtlijst',
      'wachtlijsten',
      'omzet',
      'omzetbescherming',
      'volume',
      'volumeherverdeling',
      'benadeeld',
      'koplopers',
    ],
    answer:
      'Een veelgestelde vraag: worden koplopers niet benadeeld als ze effici\u00ebnter werken?\n\nHet antwoord is nee. Via wachtlijstbemiddeling en volumeherverdeling worden wachtlijsten afgebouwd en wordt het vrijgekomen volume herverdeeld. Effici\u00ebnter werken betekent meer volume kunnen behandelen, niet minder omzet.\n\nKoplopers die sneller en beter behandelen, krijgen de ruimte om meer jongeren te helpen \u2014 en worden daar ook voor beloond.',
  },
  {
    keywords: [
      'opschaling',
      'opschalen',
      'segment',
      'regio',
      'landelijk',
      'andere regio',
      'groei',
      'schaal',
    ],
    answer:
      'De opschalingsstrategie van KAM verloopt in fases:\n\n1. **Kopgroep (segment 4)** \u2014 de huidige 8 aanbieders testen en verfijnen de interventies\n2. **Alle segmenten in ZHZ** \u2014 uitrol naar alle zorgaanbieders in Zuid-Holland Zuid\n3. **Andere regio\u2019s** \u2014 kennisdeling en implementatie in nieuwe regio\u2019s\n4. **Landelijk** \u2014 opschaling naar heel Nederland\n\nElke fase bouwt voort op de lessen en resultaten van de vorige.',
  },
  {
    keywords: [
      'simulator',
      'impact simulator',
      'rekenen',
      'rekentool',
      'zelf rekenen',
      'impact-simulator',
    ],
    answer:
      'Op /impact-simulator vind je de Impact Simulator. Hiermee kun je zelf rekenen met volumes en kosten:\n\n\u2022 Pas parameters aan zoals instroom, verschuivingspercentages en behandelduur\n\u2022 Zie direct het effect op kosten en besparingen\n\u2022 Vergelijk scenario\u2019s om te zien welke interventies het meeste opleveren\n\nDe simulator is gebaseerd op de daadwerkelijke data en business cases van de kopgroep.',
  },
  {
    keywords: [
      'huisarts',
      'verwijzer',
      'verwijzen',
      'poh',
      'poh-ggz',
      'triage',
      'verwijzing',
      'poortwachter',
    ],
    answer:
      'Huisartsen en verwijzers zijn onmisbaar in KAM. Hun rol:\n\n\u2022 **Goed verwijzen** \u2014 kritisch kijken of GGZ-zorg \u00e9cht nodig is\n\u2022 **Kennis van het aanbod** \u2014 weten welke interventies beschikbaar zijn (overbruggingszorg, brede intake, etc.)\n\u2022 **Betere triage** \u2014 de Brede Intake helpt bij het gerichter verwijzen naar de juiste zorgvorm\n\nDoor nauwer samen te werken met de kopgroep kunnen huisartsen jongeren sneller naar de juiste zorg leiden.',
  },
  {
    keywords: [
      'meedoen',
      'aanmelden',
      'aansluiten',
      'community',
      'deelnemen',
      'lid worden',
      'bijdragen',
    ],
    answer:
      'Er zijn verschillende manieren om mee te doen aan KAM:\n\n\u2022 **Community** \u2014 meld je aan via /community om vragen te stellen en ervaringen te delen\n\u2022 **Kopgroep** \u2014 de kopgroep staat open voor nieuwe leden. Neem contact op om de mogelijkheden te verkennen\n\u2022 **Informatie** \u2014 verken het platform, gebruik de Impact Simulator en lees over de initiatieven\n\nDe beweging groeit \u2014 en er is plek voor iedereen die wil bijdragen aan passende jeugdzorg.',
  },
];

const FALLBACK_ANSWER =
  'Bedankt voor je vraag! Ik kon geen direct antwoord vinden in mijn kennisbank. Probeer een van deze onderwerpen:\n\n\u2022 Wat is Kwaliteit als Medicijn?\n\u2022 Welke initiatieven zijn er? (overbruggingszorg, brede intake, kracht van kort, etc.)\n\u2022 Wie zitten er in de kopgroep?\n\u2022 Wat zijn de besparingen?\n\u2022 Hoe kan ik meedoen?\n\u2022 Wat betekent dit voor mijn gemeente?\n\u2022 Hoe werkt de Impact Simulator?\n\u2022 Wat is de rol van huisartsen/verwijzers?\n\nOf stel je vraag op een andere manier \u2014 ik zoek graag mee!';

function findBestAnswer(input: string): string {
  const lower = input.toLowerCase();
  let bestScore = 0;
  let bestAnswer = FALLBACK_ANSWER;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  }

  return bestAnswer;
}

/* ------------------------------------------------------------------ */
/*  Quick questions                                                    */
/* ------------------------------------------------------------------ */

const quickQuestions: { label: string; answer: string }[] = [
  {
    label: 'Wat is KAM?',
    answer:
      'Kwaliteit als Medicijn (KAM) is gebaseerd op het Strategy& rapport en rust op drie pijlers:\n\n1. Verminderen van overbehandeling \u2014 door evidence-based te werken\n2. Vergroten van pati\u00ebntbetrokkenheid \u2014 via samen beslissen\n3. Verbeteren van de organisatorische inrichting \u2014 betere samenwerking en sturing\n\nDe aanpak is bewezen in de curatieve zorg (Bernhoven, Santeon). De totale geschatte besparing in ZHZ is \u20ac2,9 \u2013 \u20ac3,8 mln.',
  },
  {
    label: 'Welke initiatieven zijn er?',
    answer:
      'Er zijn 5 actieve initiatieven in de kopgroep ZHZ:\n\n1. Overbruggingszorg (De Hoop) \u2014 ~11% besparing, \u20ac2,0 mln\n2. Brede Intake (Parnassia) \u2014 ~14% besparing, \u20ac2,5 mln\n3. Kracht van Kort (Perspectief & Eleos) \u2014 ~10-20% besparing\n4. Gezinsgerichte Aanpak (FamilySupporters & NeuroScan) \u2014 business case in ontwikkeling\n5. Integraal Zorgaanbod met Groepsbegeleiding (CareHouse) \u2014 business case in ontwikkeling\n\nTotale potenti\u00eble impact: \u20ac2,9 \u2013 \u20ac3,8 mln.',
  },
  {
    label: 'Wat betekent dit voor mijn gemeente?',
    answer:
      'Uit analyse blijkt dat ~78% van de kostenverschillen tussen gemeenten verklaard wordt door bevolkingskenmerken (sociaaleconomisch profiel, demografie). Maar ~22% hangt samen met lokale werkwijzen en contractafspraken \u2014 daar zit de ruimte voor verbetering.\n\nBekijk de Gemeentekaart (/gemeentekaart) om te zien hoe jouw gemeente scoort en welke besparingspotentie er is.',
  },
  {
    label: 'Hoe kan ik meedoen?',
    answer:
      'Er zijn verschillende manieren om mee te doen:\n\n\u2022 Bezoek de Community-pagina (/community) om vragen te stellen en ervaringen te delen met collega\u2019s\n\u2022 Vul het aanmeldformulier in onderaan de homepage om je aan te sluiten bij de beweging\n\u2022 Als zorgaanbieder kun je contact opnemen om te verkennen hoe je bij de kopgroep kunt aansluiten\n\nDe beweging groeit \u2014 en er is plek voor iedereen die wil bijdragen aan passende jeugdzorg.',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hoverButton, setHoverButton] = useState(false);

  const handleRoleSelect = (role: RoleData) => {
    setSelectedRole(role);
    setMessages([
      {
        role: 'assistant',
        content: `Welkom, ${role.title}! ${role.description}\n\nIk kan je helpen met vragen over Kwaliteit als Medicijn. Stel een vraag of kies een van de suggesties hieronder.`,
      },
    ]);
  };

  const handleSkipRole = () => {
    setSelectedRole({
      id: 'generic',
      title: 'Bezoeker',
      icon: Sparkles,
      description: '',
      pages: [
        { label: 'Home', href: '/' },
        { label: 'Initiatieven', href: '/initiatieven' },
        { label: 'Community', href: '/community' },
      ],
    });
    setMessages([
      {
        role: 'assistant',
        content:
          'Welkom bij de KAM Assistent! Ik help je graag met vragen over Kwaliteit als Medicijn, de initiatieven, besparingen, gemeenten en meer.\n\nStel een vraag of kies een van de suggesties hieronder.',
      },
    ]);
  };

  const handleQuickQuestion = (q: { label: string; answer: string }) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: q.label },
      { role: 'assistant', content: q.answer },
    ]);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    const answer = findBestAnswer(text);
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: text },
      { role: 'assistant', content: answer },
    ]);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setMessages([]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Pulse animation keyframes */}
      <style jsx global>{`
        @keyframes gentle-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(29, 78, 137, 0.4);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(29, 78, 137, 0);
          }
        }
      `}</style>

      {/* Floating button */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          {/* Tooltip */}
          <div
            className={`rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-all duration-200 ${
              hoverButton
                ? 'translate-y-0 opacity-100'
                : 'translate-y-1 opacity-0 pointer-events-none'
            }`}
          >
            Vraag het de KAM Assistent
            <div className="absolute -bottom-1 right-7 h-2 w-2 rotate-45 bg-gray-900" />
          </div>

          <button
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-xl hover:from-primary-500 hover:to-primary-600 transition-all duration-300 hover:scale-110"
            style={{ animation: 'gentle-pulse 3s ease-in-out infinite' }}
            aria-label="Open chat"
          >
            <MessageCircle className="h-7 w-7" />
            {/* Notification dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-accent-500" />
            </span>
          </button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl bg-white shadow-2xl border border-surface-200 overflow-hidden"
          style={{ width: '400px', height: '560px', maxHeight: 'calc(100vh - 48px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-primary-700 to-primary-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              {selectedRole && (
                <button
                  onClick={handleBack}
                  className="rounded p-0.5 hover:bg-white/20 transition"
                  aria-label="Terug"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold text-sm">KAM Assistent</span>
            </div>
            <button
              onClick={handleClose}
              className="rounded p-1 hover:bg-white/20 transition"
              aria-label="Sluiten"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4">
            {!selectedRole ? (
              /* Role selection */
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Welkom! Selecteer je rol zodat ik je beter kan helpen:
                </p>
                <div className="space-y-2">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        onClick={() => handleRoleSelect(role)}
                        className="flex w-full items-center gap-3 rounded-xl border border-surface-200 bg-surface-50 p-3 text-left hover:border-primary-300 hover:bg-primary-50 transition-all"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {role.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {role.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {/* Skip role selection */}
                <button
                  onClick={handleSkipRole}
                  className="mt-3 w-full rounded-lg border border-surface-200 bg-white py-2 text-center text-sm font-medium text-gray-500 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all"
                >
                  Overslaan
                </button>
              </div>
            ) : (
              /* Chat messages */
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-surface-100 text-foreground'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Suggested pages */}
                {selectedRole && messages.length <= 1 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-500 mb-2">
                      Relevante pagina&apos;s voor jou:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRole.pages.map((page) => (
                        <Link
                          key={page.href}
                          href={page.href}
                          className="inline-flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition"
                        >
                          {page.label}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick questions */}
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Veelgestelde vragen:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickQuestions.map((q) => (
                      <button
                        key={q.label}
                        onClick={() => handleQuickQuestion(q)}
                        className="rounded-lg border border-surface-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          {selectedRole && (
            <div className="border-t border-surface-200 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  placeholder="Stel een vraag..."
                  className="flex-1 rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                />
                <button
                  onClick={handleSend}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition"
                  aria-label="Verstuur"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
