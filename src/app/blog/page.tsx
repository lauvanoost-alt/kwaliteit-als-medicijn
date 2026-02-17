'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  MessageSquare,
  Calendar,
  User,
  ChevronDown,
  ChevronUp,
  Send,
  Tag,
  ArrowLeft,
} from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
}

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  categoryColor: string;
  preview: string;
  fullText: string;
  likes: number;
  comments: Comment[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Eerste resultaten overbruggingszorg: 20% minder instroom in SGGZ',
    author: 'Dr. Marieke van den Berg',
    date: '12 februari 2026',
    category: 'Resultaten',
    categoryColor: 'bg-green-100 text-green-700',
    preview:
      'De pilot overbruggingszorg van De Hoop laat indrukwekkende eerste resultaten zien: 20% van de jongeren ziet af van SGGZ na het overbruggingstraject.',
    fullText: `De pilot overbruggingszorg van De Hoop, gestart in het kader van Kwaliteit als Medicijn, laat na zes maanden indrukwekkende resultaten zien. Van de jongeren die het overbruggingstraject doorliepen, ziet 20% volledig af van verdere SGGZ-behandeling. Nog eens 40% verschuift naar lichtere BGGZ-trajecten.

Het overbruggingstraject bestaat uit een combinatie van triage, e-health modules via het Life Skills-platform, groepssessies en een afsluitend eindgesprek. Jongeren gaan tijdens de wachttijd actief aan de slag met hun klachten, in plaats van passief te wachten op hun intake.

"We zien dat jongeren en hun ouders al enorm veel baat hebben bij het normaliseren van hun ervaring," vertelt projectleider Anna de Vries. "Het besef dat je niet de enige bent met deze gevoelens, en dat je zelf al stappen kunt zetten, is voor veel jongeren een kantelpunt."

De financiele impact is substantieel: bij opschaling naar de gehele regio wordt een besparing van circa 2,0 miljoen euro verwacht. Belangrijker nog: jongeren krijgen sneller passende hulp en de medicalisering van het zelfbeeld wordt voorkomen.

De kopgroep ZHZ bespreekt nu hoe het overbruggingstraject structureel ingebed kan worden in de reguliere zorgpaden, zonder dat het tot extra volume leidt.`,
    likes: 24,
    comments: [
      {
        id: 1,
        author: 'Jan Pieterse',
        date: '13 feb 2026',
        text: 'Geweldig om te zien dat de pilot zo snel resultaat oplevert. Hoe gaan we dit borgen in de contractering?',
      },
      {
        id: 2,
        author: 'Lisa de Graaf',
        date: '14 feb 2026',
        text: 'Als behandelaar merk ik ook dat jongeren die het overbruggingstraject hebben gedaan, veel gemotiveerder aan hun behandeling beginnen.',
      },
    ],
  },
  {
    id: 2,
    title: 'Kopgroep ZHZ groeit: 8 aanbieders werken samen aan passende zorg',
    author: 'Redactie KAM Platform',
    date: '5 februari 2026',
    category: 'Samenwerking',
    categoryColor: 'bg-blue-100 text-blue-700',
    preview:
      'De kopgroep Zuid-Holland Zuid is uitgebreid naar 8 zorgaanbieders die samen werken aan innovatieve interventies voor passende jeugdzorg.',
    fullText: `De kopgroep Kwaliteit als Medicijn in Zuid-Holland Zuid heeft een belangrijke mijlpaal bereikt: acht zorgaanbieders werken nu actief samen aan het ontwikkelen en opschalen van interventies die de jeugdzorg kwalitatief beter en tegelijk doelmatiger maken.

De kopgroep bestaat uit een diverse mix van aanbieders: De Hoop, Parnassia, Perspectief, Eleos, FamilySupporters en CareHouse vormen de kern, aangevuld met twee nieuwe deelnemers die hun expertise op het gebied van wijkgerichte zorg inbrengen.

Wat deze samenwerking uniek maakt, is dat aanbieders die traditioneel elkaars concurrenten zijn, nu openlijk kennis en data delen. "We hebben bewust gekozen voor transparantie," zegt kopgroepvoorzitter Thomas Bakker. "Alleen door van elkaar te leren kunnen we de zorg echt verbeteren."

De vijf initiatieven - overbruggingszorg, brede intake, kracht van kort, gezinsgerichte aanpak en integraal zorgaanbod - worden elk door een of meerdere aanbieders getrokken. De totale potentiele impact bij opschaling wordt geschat op 15-20% volumereductie, wat neerkomt op 2,9 tot 3,8 miljoen euro besparing.

De GRHO en de tien gemeenten in de regio ondersteunen de beweging door ruimte te bieden in de contractering voor innovatieve producten en door garanties te geven dat koplopers niet financieel worden benadeeld.`,
    likes: 18,
    comments: [
      {
        id: 1,
        author: 'Petra Jansen',
        date: '6 feb 2026',
        text: 'Mooi initiatief! Zijn er plannen om ook aanbieders buiten ZHZ te betrekken?',
      },
    ],
  },
  {
    id: 3,
    title: 'Kracht van Kort: hoe kortere behandelingen tot betere uitkomsten leiden',
    author: 'Prof. Dr. Erik Verhoeven',
    date: '28 januari 2026',
    category: 'Onderzoek',
    categoryColor: 'bg-purple-100 text-purple-700',
    preview:
      'Nieuw onderzoek toont aan dat kortere, doelgerichte behandeltrajecten niet alleen goedkoper zijn, maar ook tot betere uitkomsten leiden voor jongeren.',
    fullText: `Een groeiend aantal studies bevestigt wat clinici al langer vermoeden: langere behandelingen leiden niet automatisch tot betere uitkomsten. Het initiatief "De Kracht van Kort" van Perspectief en Eleos past dit inzicht toe in de praktijk.

De kerngedachte is eenvoudig maar krachtig: maak vooraf duidelijke afspraken over de behandelduur, stel concrete doelen met tussentijdse evaluaties, en bouw vertrouwen op dat hulp tijdelijk is. Dit klinkt voor de hand liggend, maar in de praktijk blijkt dat een significant deel van SGGZ-trajecten de indicatieve looptijd van een jaar overschrijdt.

"Er bestaat een zorgreflex bij behandelaren," legt prof. Verhoeven uit. "Het voelt onveilig om een traject af te ronden, ook als de doelen behaald zijn. We trainen professionals om dit patroon te doorbreken, met behoud van klinische zorgvuldigheid."

De resultaten zijn bemoedigend: in de pilotgroep werd een verkorting van 10-20% van de gemiddelde behandelduur gerealiseerd, zonder negatieve effecten op de uitkomsten. Jongeren en ouders rapporteren zelfs hogere tevredenheid, omdat de behandeling gerichter en actiever aanvoelt.

Een belangrijke randvoorwaarde is transparantie over behandelduur en praktijkvariatie. De kopgroep werkt aan een dashboard dat spiegelinformatie biedt, zodat aanbieders van elkaar kunnen leren.

De financiele impact wordt geschat op 1,8 tot 3,6 miljoen euro bij regionale opschaling, afhankelijk van de mate van adoptie.`,
    likes: 31,
    comments: [
      {
        id: 1,
        author: 'Sophie Mulder',
        date: '29 jan 2026',
        text: 'Heel herkenbaar. Als GZ-psycholoog merk ik dat duidelijke kaders juist rust geven aan zowel de jongere als de behandelaar.',
      },
      {
        id: 2,
        author: 'Mark de Boer',
        date: '30 jan 2026',
        text: 'Interessant onderzoek. Hoe wordt voorkomen dat behandelingen te kort worden en daardoor niet effectief?',
      },
    ],
  },
  {
    id: 4,
    title: 'Gemeente Veendam als inspiratie: wachtlijsten verdwenen in 2,5 jaar',
    author: 'Drs. Karin Hofstra',
    date: '15 januari 2026',
    category: 'Casestudy',
    categoryColor: 'bg-amber-100 text-amber-700',
    preview:
      'Hoe gemeente Veendam door een radicale aanpak - van 220 naar 6 aanbieders - de wachtlijsten in de jeugdzorg volledig liet verdwijnen.',
    fullText: `Het verhaal van gemeente Veendam is een van de meest inspirerende voorbeelden van hoe jeugdzorg fundamenteel anders georganiseerd kan worden. Tussen 2015 en 2022 groeide het aantal aanbieders van 30 naar 220. De gemeente had geen grip meer op kwaliteit, kosten of wachttijden.

De oplossing was radicaal: alle 220 aanbieders werden vervangen door een samenwerkingsverband van 6 aanbieders, het "Jeugdexpertise Punt" (JEP). Jongeren kunnen zonder wachttijd of indicatie terecht bij een professional van JEP, direct op school of bij de huisarts.

Het cruciale verschil: een wetenschappelijk geschoolde professional analyseert de situatie voordat er wordt ingegrepen. Het motto is "baat het niet, dan schaadt het wel" - een bewuste omkering van het gezegde die benadrukt dat onnodige interventies schade kunnen aanrichten.

De resultaten na 2,5 jaar zijn spectaculair:
- Wachtlijsten zijn volledig verdwenen
- Voor 57% van gezinnen kon een doorverwijzing naar gespecialiseerde hulp worden voorkomen
- De helft van de clienten kan voor gemiddeld 600 euro worden geholpen (voorheen 1.500 euro)
- Uithuisplaatsingen en crisisopvang zijn afgenomen
- De jeugdzorguitgaven zijn met 13% gedaald, terwijl ze landelijk met 132% stegen

"Het Veendam-model laat zien dat het kan," zegt wethouder De Jong. "Maar het vraagt politieke moed om de marktwerking los te laten en te kiezen voor kwaliteit."

Voor de regio Zuid-Holland Zuid biedt Veendam een inspirerend voorbeeld, hoewel de specifieke context verschilt. De principes - expertise naar voren, minder aanbieders, betere afstemming - zijn universeel toepasbaar.`,
    likes: 42,
    comments: [
      {
        id: 1,
        author: 'Robert van Dijk',
        date: '16 jan 2026',
        text: 'Indrukwekkende resultaten. De vraag is of dit model ook werkt in een grotere, meer verstedelijkte regio als ZHZ.',
      },
    ],
  },
  {
    id: 5,
    title: 'Wethouders in gesprek: \'We moeten durven investeren in kwaliteit\'',
    author: 'Redactie KAM Platform',
    date: '8 januari 2026',
    category: 'Interview',
    categoryColor: 'bg-rose-100 text-rose-700',
    preview:
      'Drie wethouders uit de regio Zuid-Holland Zuid delen hun visie op de transformatie van de jeugdzorg en de rol van gemeenten daarin.',
    fullText: `In een uniek rondetafelgesprek deelden drie wethouders uit de regio Zuid-Holland Zuid hun kijk op de uitdagingen en kansen in de jeugdzorg. Het gesprek vond plaats in het kader van de Kwaliteit als Medicijn-beweging.

Wethouder Annemarie de Vries (Dordrecht): "We zien al jaren dat de kosten stijgen zonder dat de uitkomsten voor jongeren verbeteren. Als gemeente hebben we de verantwoordelijkheid om anders te gaan contracteren. Dat betekent niet drukken op tarieven, maar ruimte geven voor innovatie."

Wethouder Pieter Hendriks (Gorinchem): "Het lastige is dat investeren in kwaliteit op korte termijn geld kost. Je moet durven accepteren dat de besparing pas over twee tot drie jaar zichtbaar wordt. Dat vraagt vertrouwen van de gemeenteraad."

Wethouder Sandra Vermeer (Papendrecht): "Wat mij aanspreekt aan de KAM-aanpak is dat het niet van bovenaf wordt opgelegd. Het zijn de zorgaanbieders zelf die met oplossingen komen. Onze rol is om de randvoorwaarden te scheppen."

Op de vraag wat er nodig is om de beweging te versnellen, zijn de wethouders eensgezind: regionale samenwerking is cruciaal. "Geen enkele gemeente kan dit alleen," benadrukt De Vries. "We moeten als regio een gezamenlijk verhaal vertellen aan de zorgaanbieders."

De wethouders pleiten ook voor meer transparantie in de data. "We weten dat 22% van de kostenverschillen tussen gemeenten te maken heeft met lokale werkwijzen. Laten we die data gebruiken om van elkaar te leren, niet om elkaar af te rekenen."

Het gesprek eindigde met een gezamenlijke oproep: "Investeer in kwaliteit, niet in controle. De cijfers uit Veendam en de eerste resultaten van de kopgroep ZHZ laten zien dat het werkt."`,
    likes: 15,
    comments: [
      {
        id: 1,
        author: 'Els Bakker',
        date: '9 jan 2026',
        text: 'Fijn om te lezen dat wethouders zo betrokken zijn. Hopelijk vertaalt zich dit ook naar de contractering in 2027.',
      },
      {
        id: 2,
        author: 'Ahmed Yilmaz',
        date: '10 jan 2026',
        text: 'Als huisarts in de regio herken ik het belang van regionale samenwerking. We merken dagelijks hoe versnipperd het aanbod is.',
      },
    ],
  },
];

export default function BlogPage() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [likes, setLikes] = useState<Record<number, number>>(
    Object.fromEntries(blogPosts.map((p) => [p.id, p.likes]))
  );
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [comments, setComments] = useState<Record<number, Comment[]>>(
    Object.fromEntries(blogPosts.map((p) => [p.id, p.comments]))
  );

  const togglePost = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const handleLike = (id: number) => {
    if (liked[id]) {
      setLikes((prev) => ({ ...prev, [id]: prev[id] - 1 }));
      setLiked((prev) => ({ ...prev, [id]: false }));
    } else {
      setLikes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
      setLiked((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleCommentSubmit = (postId: number) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;
    const newComment: Comment = {
      id: Date.now(),
      author: 'Jij',
      date: 'Zojuist',
      text,
    };
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <section className="bg-surface-50 min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar home
          </Link>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Blog</h1>
          <p className="mt-2 text-gray-500">
            Nieuws, inzichten en verhalen over de transformatie van jeugdzorg in Zuid-Holland Zuid
          </p>
        </div>

        {/* Blog posts */}
        <div className="space-y-6">
          {blogPosts.map((post) => {
            const isExpanded = expandedPost === post.id;
            const postComments = comments[post.id] || [];

            return (
              <article
                key={post.id}
                className="rounded-2xl border border-surface-200 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                <div className="p-6 sm:p-8">
                  {/* Category tag */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${post.categoryColor}`}
                    >
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-foreground leading-tight">
                    {post.title}
                  </h2>

                  {/* Meta */}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                  </div>

                  {/* Preview / Full text */}
                  <div className="mt-4">
                    {isExpanded ? (
                      <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {post.fullText}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 leading-relaxed">{post.preview}</p>
                    )}
                  </div>

                  {/* Read more / less */}
                  <button
                    onClick={() => togglePost(post.id)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition"
                  >
                    {isExpanded ? (
                      <>
                        Inklappen <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Lees meer <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Reactions bar */}
                <div className="border-t border-surface-200 px-6 py-3 sm:px-8 flex items-center gap-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition ${
                      liked[post.id]
                        ? 'text-red-500'
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${liked[post.id] ? 'fill-current' : ''}`}
                    />
                    {likes[post.id]}
                  </button>
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MessageSquare className="h-4 w-4" />
                    {postComments.length} reacties
                  </span>
                </div>

                {/* Comments section (visible when expanded) */}
                {isExpanded && (
                  <div className="border-t border-surface-200 px-6 py-4 sm:px-8 bg-surface-50">
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      Reacties ({postComments.length})
                    </h4>

                    {/* Existing comments */}
                    <div className="space-y-3 mb-4">
                      {postComments.map((comment) => (
                        <div
                          key={comment.id}
                          className="rounded-xl bg-white border border-surface-200 p-3"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-foreground">
                              {comment.author}
                            </span>
                            <span className="text-xs text-gray-400">{comment.date}</span>
                          </div>
                          <p className="text-sm text-gray-600">{comment.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Comment input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCommentSubmit(post.id);
                        }}
                        placeholder="Schrijf een reactie..."
                        className="flex-1 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition"
                        aria-label="Verstuur reactie"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Dit is een demonstratie. Reacties worden niet opgeslagen.
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
