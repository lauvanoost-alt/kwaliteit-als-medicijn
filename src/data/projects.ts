import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    slug: 'overbruggingszorg-dordrecht',
    titel: 'Overbruggingszorg Dordrecht',
    subtitel: 'Groepsaanbod voor jongeren op de wachtlijst voor specialistische GGZ',
    status: 'lopend',
    themas: ['overbruggingszorg', 'wachtlijstbeheer'],
    organisaties: ['yulius', 'gemeente-dordrecht'],
    doelgroep: 'Jongeren 12-18 jaar op de wachtlijst voor specialistische Jeugd GGZ',
    regio: 'Dordrecht',
    aanleiding:
      'In de regio Dordrecht stonden in 2024 gemiddeld 340 jongeren op de wachtlijst voor specialistische Jeugd GGZ. De gemiddelde wachttijd bedroeg 14 weken. Gedurende deze periode ontvingen jongeren en gezinnen nauwelijks ondersteuning, wat leidde tot verergering van klachten en hogere zorgzwaarte bij instroom.',
    doel:
      'Het bieden van laagdrempelige groepsondersteuning aan jongeren tijdens de wachtperiode, gericht op psycho-educatie, copingvaardigheden en lotgenotencontact. Doel is stabilisatie of verbetering van klachten zodat bij instroom in specialistische zorg de behandelduur korter is, of doorstroom naar lichtere zorgvormen mogelijk wordt.',
    aanpak:
      '## Opzet\n\nWekelijkse groepsbijeenkomsten (8 sessies) voor groepen van 8-10 jongeren, begeleid door een GZ-psycholoog en een ervaringsdeskundige jongere.\n\n## Inhoud\n\n- **Sessie 1-2**: Psycho-educatie over veelvoorkomende klachten (angst, stemming)\n- **Sessie 3-4**: Copingstrategieën en oefeningen\n- **Sessie 5-6**: Lotgenotencontact en ervaringen delen\n- **Sessie 7-8**: Terugvalpreventie en persoonlijk actieplan\n\n## Samenwerking\n\nHuisartsen en POH-GGZ verwijzen actief naar het groepsaanbod bij plaatsing op de wachtlijst. Terugkoppeling naar verwijzer na afloop.',
    resultaten:
      '## Tussentijdse resultaten (na 6 maanden)\n\n- 4 groepen afgerond, 35 jongeren bereikt\n- 23% van deelnemers had na afloop geen specialistische GGZ meer nodig\n- Gemiddelde klachtenreductie (SDQ): 3.2 punten\n- Tevredenheid deelnemers: 8.4 / 10\n- Tevredenheid ouders: 7.9 / 10',
    impact: {
      wachtlijstReductie: '-23% uitstroom naar lichtere zorg',
      clientTevredenheid: '8.4 / 10',
      kostenBesparing: '€85.000 per jaar',
      bereik: '35 jongeren in 6 maanden',
      samenvatting:
        'Het overbruggingszorg-aanbod leidt tot significante klachtenreductie tijdens de wachtperiode. Bijna een kwart van de deelnemers stroomt door naar lichtere zorgvormen in plaats van specialistische GGZ.',
    },
    gelpierdeLessen:
      '- Groepsaanbod werkt het best bij jongeren met internaliserende problematiek\n- Betrokkenheid van ervaringsdeskundige jongeren is cruciaal voor motivatie\n- Warme overdracht vanuit huisarts/POH-GGZ verhoogt opkomst aanzienlijk\n- Oudermodule (parallel) is gewenst — wordt in fase 2 toegevoegd',
    startDatum: '2024-09-01',
    contactPersonen: ['marieke-de-vries', 'jan-bakker'],
    tags: ['wachtlijst', 'groepsbehandeling', 'jongeren', 'psycho-educatie', 'preventie'],
    documenten: [
      {
        titel: 'Projectplan Overbruggingszorg Dordrecht',
        type: 'pdf',
        url: '#',
        accessLevel: 'free',
      },
      {
        titel: 'Tussenrapportage Q1 2025',
        type: 'pdf',
        url: '#',
        accessLevel: 'extended',
      },
    ],
    accessLevel: 'free',
    featured: true,
  },
  {
    slug: 'reablement-jeugd-zhz',
    titel: 'Reablement Jeugd ZHZ',
    subtitel: 'Herstelgericht werken: van behandelen naar activeren en zelfredzaamheid',
    status: 'lopend',
    themas: ['reablement', 'normaliseren'],
    organisaties: ['de-fjord', 'yulius'],
    doelgroep: 'Jongeren 10-18 jaar met lichte tot matige GGZ-problematiek',
    regio: 'Zuid-Holland Zuid',
    aanleiding:
      'Veel jongeren blijven langer in behandeling dan noodzakelijk omdat het ontbreekt aan een gestructureerde overgang naar zelfstandig functioneren. Het reablement-concept uit de ouderenzorg biedt kansen voor de jeugd GGZ: focus op wat de jongere zelf kan, met coaching in plaats van behandeling.',
    doel:
      'Het implementeren van een reablement-aanpak waarbij de focus verschuift van klachtreductie naar het versterken van eigen regie, dagelijks functioneren en participatie. Hierdoor worden trajecten korter en wordt terugval verminderd.',
    aanpak:
      '## Aanpak\n\nTrajecten van maximaal 12 weken met een multidisciplinair team (psycholoog, maatschappelijk werker, ervaringsdeskundige). Focus op concrete doelen in het dagelijks leven van de jongere.\n\n## Werkwijze\n\n- Gezamenlijk doelen stellen met jongere en gezin\n- Wekelijkse coaching op eigen omgeving (school, thuis, vrije tijd)\n- Inzet van e-health modules tussen sessies\n- Afsluiting met terugvalpreventieplan en warme overdracht naar sociaal domein',
    resultaten:
      '## Eerste resultaten (pilot met 20 jongeren)\n\n- Gemiddelde trajectduur: 10 weken (vs. 22 weken standaard)\n- 85% rapporteert verbeterd dagelijks functioneren\n- 70% heeft na afsluiting geen vervolgzorg nodig',
    impact: {
      wachtlijstReductie: '-55% kortere trajectduur',
      clientTevredenheid: '8.1 / 10',
      bereik: '20 jongeren (pilot)',
      samenvatting:
        'Reablement halveert de gemiddelde trajectduur en vergroot de zelfredzaamheid van jongeren. De meerderheid heeft na afloop geen vervolgzorg nodig.',
    },
    gelpierdeLessen:
      '- Professionals moeten leren "loslaten" — coachen is anders dan behandelen\n- Ouders meenemen in de aanpak is essentieel\n- Schoolbetrokkenheid versterkt het resultaat enorm',
    startDatum: '2025-01-15',
    contactPersonen: ['sophie-jansen'],
    tags: ['herstelgericht', 'zelfredzaamheid', 'coaching', 'kort-traject', 'eigen-regie'],
    accessLevel: 'free',
    featured: true,
  },
  {
    slug: 'consultatie-huisartsen-zhz',
    titel: 'Consultatie & Meekijken Huisartsen',
    subtitel: 'GGZ-expertise bij de huisarts voor betere triage en minder verwijzingen',
    status: 'lopend',
    themas: ['vroegsignalering', 'normaliseren'],
    organisaties: ['yulius', 'compass-ggz'],
    doelgroep: 'Huisartsen, POH-GGZ en hun patiënten (0-18 jaar) in ZHZ',
    regio: 'Zuid-Holland Zuid',
    aanleiding:
      'Huisartsen verwijzen jaarlijks circa 2.800 jeugdigen naar de GGZ in ZHZ. Uit analyse blijkt dat bij 30-40% van de verwijzingen de hulpvraag ook in de eerste lijn of het sociaal domein beantwoord had kunnen worden, mits de huisarts toegang had tot specialistische consultatie.',
    doel:
      'Directe consultatiemogelijkheid voor huisartsen en POH-GGZ bij een jeugd-GGZ specialist, zodat verwijzingen beter worden getrieerd en lichtere alternatieven eerder worden ingezet.',
    aanpak:
      '## Werkwijze\n\n- Wekelijks consultatie-uur (telefonisch en video) voor huisartsen in ZHZ\n- Maandelijks meekijk-spreekuur op locatie bij grotere huisartsenpraktijken\n- Gedeeld digitaal platform voor consultaanvragen en terugkoppeling\n- Gezamenlijke casuïstiekbespreking per kwartaal',
    resultaten:
      '## Resultaten na 4 maanden\n\n- 89 consultaties uitgevoerd\n- 42% van consultvragen leidde tot alternatief voor GGZ-verwijzing\n- Huisartsen waarderen het consult gemiddeld met 9.1\n- Geschatte reductie van 35 GGZ-verwijzingen',
    impact: {
      wachtlijstReductie: '-42% onnodige verwijzingen',
      clientTevredenheid: '9.1 / 10 (huisartsen)',
      kostenBesparing: '€120.000 per jaar (geschat)',
      bereik: '89 consultaties, 23 huisartsen',
      samenvatting:
        'Consultatie aan huisartsen voorkomt onnodige verwijzingen naar de GGZ. Huisartsen voelen zich gesteund en patiënten krijgen sneller passende hulp.',
    },
    startDatum: '2025-02-01',
    contactPersonen: ['ahmed-hassan', 'peter-smit'],
    tags: ['consultatie', 'huisarts', 'triage', 'eerste-lijn', 'verwijzing'],
    accessLevel: 'free',
    featured: true,
  },
  {
    slug: 'digitale-interventies-angst',
    titel: 'Digitale Interventies bij Angst',
    subtitel: 'E-health als eerste stap voor jongeren met angstklachten',
    status: 'afgerond',
    themas: ['digitale-zorg', 'wachtlijstbeheer'],
    organisaties: ['de-fjord'],
    doelgroep: 'Jongeren 12-18 jaar met milde tot matige angstklachten',
    regio: 'Hoeksche Waard',
    aanleiding:
      'Angstklachten vormen de grootste verwijsreden naar Jeugd GGZ in de regio. Veel jongeren met milde angst kunnen baat hebben bij een evidence-based digitale interventie als eerste stap, eventueel gecombineerd met beperkte face-to-face begeleiding.',
    doel:
      'Implementeren van een stepped-care model waarbij jongeren met milde angst starten met een digitale CGT-interventie (8 modules), met optionele begeleiding door een GZ-psycholoog.',
    aanpak:
      '## Stepped-care model\n\n1. **Stap 1**: Digitale CGT-module (8 weken, zelfstandig)\n2. **Stap 2**: Digitaal + begeleidingsgesprekken (bij onvoldoende resultaat)\n3. **Stap 3**: Reguliere face-to-face behandeling (bij complexere problematiek)\n\n## Implementatie\n\n- Selectie via gestandaardiseerde screening bij intake\n- Wekelijkse monitoring via digitaal dashboard\n- Tussentijdse evaluatie na 4 weken',
    resultaten:
      '## Eindresultaten\n\n- 48 jongeren gestart, 41 afgerond\n- 63% had voldoende aan stap 1 (alleen digitaal)\n- 24% had stap 2 nodig\n- 13% werd doorverwezen naar reguliere behandeling\n- Gemiddelde klachtenreductie: 45% op de SCAS',
    impact: {
      wachtlijstReductie: '-63% kon met digitale interventie volstaan',
      clientTevredenheid: '7.8 / 10',
      kostenBesparing: '€95.000 bespaard op reguliere behandelingen',
      bereik: '48 jongeren',
      samenvatting:
        'Tweederde van de jongeren met milde angst had voldoende aan een digitale interventie. Dit ontlast de wachtlijst en biedt jongeren sneller hulp.',
    },
    gelpierdeLessen:
      '- Motivatie is de sleutel: wekelijkse korte check-ins houden jongeren betrokken\n- Ouders betrekken bij modules verhoogt therapietrouw\n- Niet geschikt voor jongeren met comorbide depressie',
    startDatum: '2024-03-01',
    eindDatum: '2024-12-31',
    contactPersonen: ['sophie-jansen'],
    tags: ['e-health', 'angst', 'CGT', 'stepped-care', 'digitaal'],
    accessLevel: 'free',
    featured: false,
  },
  {
    slug: 'gezinsaanpak-crisis-preventie',
    titel: 'Gezinsaanpak Crisispreventie',
    subtitel: 'Intensieve gezinsbegeleiding om crisisplaatsingen te voorkomen',
    status: 'lopend',
    themas: ['gezinsaanpak', 'vroegsignalering'],
    organisaties: ['compass-ggz', 'gemeente-dordrecht'],
    doelgroep: 'Gezinnen met jongeren 10-18 jaar bij wie crisisplaatsing dreigt',
    regio: 'Dordrecht en omstreken',
    aanleiding:
      'In 2024 waren er 67 crisisplaatsingen van jeugdigen in ZHZ. Analyse toont dat in 40% van de gevallen eerder signalen aanwezig waren die met intensieve gezinsbegeleiding mogelijk tot de-escalatie hadden geleid.',
    doel:
      'Het inzetten van een intensief gezinsteam (beschikbaar 7 dagen per week) bij gezinnen waar escalatie dreigt, om crisisplaatsingen te voorkomen en het gezinssysteem te stabiliseren.',
    aanpak:
      '## Werkwijze\n\n- Multidisciplinair crisisteam (systeemtherapeut, maatschappelijk werker, ervaringsdeskundige ouder)\n- Bereikbaar 7/7, interventie binnen 24 uur na melding\n- Intensieve fase: 4-6 weken, meerdere contacten per week\n- Afbouwfase: 4 weken, overdracht naar reguliere hulp of sociaal domein\n\n## Signalering\n\n- Directe lijn vanuit huisartsen, scholen, wijkteams en GGZ-behandelaren\n- Gestandaardiseerde risicotaxatie bij elk eerste contact',
    resultaten:
      '## Resultaten na 8 maanden\n\n- 28 gezinnen begeleid\n- 82% geen crisisplaatsing nodig\n- Gemiddelde doorlooptijd intensieve fase: 5 weken\n- Terugval na 6 maanden: 11%',
    impact: {
      wachtlijstReductie: '82% crisisplaatsingen voorkomen',
      clientTevredenheid: '8.6 / 10',
      kostenBesparing: '€340.000 (vermeden crisisplaatsingen)',
      bereik: '28 gezinnen',
      samenvatting:
        'Bij ruim 8 op de 10 gezinnen waar crisis dreigde, kon een crisisplaatsing worden voorkomen door intensieve gezinsbegeleiding.',
    },
    startDatum: '2025-03-01',
    contactPersonen: ['peter-smit', 'linda-van-dijk'],
    tags: ['crisis', 'gezin', 'preventie', 'intensief', 'systeemtherapie'],
    accessLevel: 'free',
    featured: true,
  },
  {
    slug: 'kracht-van-kort',
    titel: 'De Kracht van Kort',
    subtitel: 'Korter en effectiever behandelen door gestructureerde aanpak en cultuurverandering',
    status: 'lopend',
    themas: ['reablement', 'normaliseren'],
    organisaties: ['perspectief', 'eleos'],
    doelgroep: 'Behandelaren en jongeren in de specialistische GGZ (SSGZ)',
    regio: 'Zuid-Holland Zuid',
    aanleiding:
      'SSGZ-trajecten overschrijden regelmatig de beoogde looptijd van 1 jaar. Er ontbreekt een helder protocol voor het bewaken van behandelduur, en bij behandelaren bestaat een "zorgreflex" — de neiging om door te behandelen in plaats van af te ronden. Dit leidt tot onnodige volumes en hogere kosten.',
    doel:
      'Behandeltrajecten in de SSGZ verkorten met 10-20% door een gestructureerde werkwijze, cultuurverandering bij behandelaren en institutionalisering in de organisatie. Hierdoor ontstaat meer capaciteit, dalen de kosten en krijgen jongeren heldere verwachtingen over de duur van hun behandeling.',
    aanpak:
      '## De aanpak in twee sporen\n\n### Spoor 1: Kracht van Kort-training voor behandelaren\n\nBehandelaren worden getraind in vier kernprincipes:\n\n1. **Vooraf afspraken over behandelduur** — bij de start van het traject wordt met de jongere en het gezin een heldere verwachting uitgesproken over de beoogde duur\n2. **Concrete behandeldoelen met tussentijdse evaluaties** — niet open-ended behandelen, maar periodiek evalueren of doelen behaald zijn en of het traject kan worden afgerond\n3. **De boodschap: hulp is tijdelijk** — vertrouwen uitstralen dat de jongere het zelf kan, behandeling is een tijdelijke ondersteuning, geen blijvende begeleiding\n4. **Goede therapeutische relatie en gelijkwaardig samenwerken** — de jongere als partner in het traject, niet als passieve ontvanger\n\n### Spoor 2: Institutionalisering in de organisatie\n\nTraining alleen is niet genoeg. Om duurzaam effect te bereiken wordt de Kracht van Kort-filosofie verankerd in de organisatie:\n\n- **Spiegelinformatie** — behandelaren krijgen inzicht in hun eigen behandelduur ten opzichte van collega\'s en de norm\n- **Periodieke evaluaties** — structureel moment waarop trajecten worden geëvalueerd op duur en voortgang\n- **Systeemaanpassingen** — administratieve en digitale systemen ondersteunen de werkwijze (bijv. automatische signalering bij overschrijding)\n\n## Wat doet Perspectief?\n\nPerspectief is initiatiefnemer en heeft behandelaren opgeleid in de Kracht van Kort-methodiek. De focus ligt op het trainen van teams en het aanpassen van werkprocessen.\n\n## Wat doet Eleos?\n\nEleos heeft medewerkers opgeleid in Kracht van Kort en legt de nadruk op borging in de interne organisatie:\n\n- Zorgprogramma\'s aangepast met duidelijke kaders voor behandelduur\n- Regiebehandelaren nemen deel aan 2-wekelijks MDO (intervisie) over trajectduur\n- Behandelaren zijn verantwoordelijk voor het naleven van de filosofie via herscholing en feedbackcycli\n- Periodieke evaluaties zijn gepland (nog niet volledig gerealiseerd)\n- De institutionalisering maakt opschaling naar andere teams mogelijk',
    resultaten:
      '## Wat levert het op?\n\n### Voor jongeren\n- Heldere verwachtingen over de duur van de behandeling\n- Extra commitment: samen werken aan concrete doelen binnen een afgebakend traject\n- Sneller weer op eigen benen staan\n\n### Maatschappelijk\n- GGZ-volumes en kosten dalen doordat trajecten korter worden\n- Meer capaciteit voor nieuwe jongeren\n\n### Besparingspotentieel\nBij een verkorting van 10-20% van behandeltrajecten is het besparingspotentieel **€1,8 tot €3,6 miljoen** per jaar (berekend op basis van 5.542 jongeren in SSGZ in ZHZ).\n\n## Wat weten we uit de literatuur?\n\n### Dimence — team Angst & Stemming\nBij Dimence leidde een vergelijkbare aanpak ertoe dat het aandeel cliënten dat langer dan 2 jaar in behandeling was daalde van circa 20% naar circa 5%.\n\n### Jeugdstem\nJeugdstem heeft vertrouwenspersonen getraind in de Kracht van Kort-principes, zodat jongeren ook vanuit hun eigen ondersteuner horen dat behandeling tijdelijk is.\n\n### Eleos\nEleos combineert training van behandelaren met structurele reflectie en borging in de organisatie. De effecten worden nog systematisch gemeten.\n\n**Let op**: De effecten van Kracht van Kort zijn landelijk nog beperkt onderzocht. Er is noodzaak tot verdere institutionalisering en systematisch meten van uitkomsten.',
    impact: {
      wachtlijstReductie: '10-20% kortere trajecten (beoogd)',
      kostenBesparing: '€1,8 - €3,6 mln besparingspotentieel per jaar',
      bereik: '5.542 jongeren in SSGZ ZHZ (potentieel)',
      samenvatting:
        'Door behandeltrajecten te verkorten met 10-20% via gestructureerde werkwijze en cultuurverandering bij behandelaren, kunnen jaarlijks miljoenen aan kosten worden bespaard en komt er meer behandelcapaciteit vrij.',
    },
    gelpierdeLessen:
      '- Training alleen is niet genoeg: institutionalisering (spiegelinformatie, evaluaties, systeemaanpassingen) is essentieel voor duurzaam effect\n- Behandelaren hebben "tegendruk" nodig om de zorgreflex te doorbreken\n- Transparantie over behandelduur en herinstroom is een belangrijke randvoorwaarde\n- Financiële incentives zoals regressieve tarieven kunnen helpen: hoe langer het traject, hoe lager het tarief per sessie\n- De combinatie van training en borging (zoals bij Eleos) maakt opschaling mogelijk',
    startDatum: '2025-06-01',
    contactPersonen: [],
    tags: ['kracht-van-kort', 'behandelduur', 'training', 'cultuurverandering', 'institutionalisering', 'SSGZ'],
    accessLevel: 'free',
    featured: true,
  },
  {
    slug: 'gezinsgerichte-aanpak',
    titel: 'Gezinsgerichte Aanpak',
    subtitel: 'Zorg voor het hele gezinssysteem in plaats van losse diagnoses en labels',
    status: 'lopend',
    themas: ['gezinsaanpak', 'normaliseren'],
    organisaties: ['familysupporters'],
    doelgroep: 'Gezinnen met jeugdigen in de GGZ waar meerdere aanbieders betrokken zijn',
    regio: 'Zuid-Holland Zuid',
    aanleiding:
      'De huidige jeugd GGZ is sterk gericht op individuele diagnoses en labels. Dit leidt tot fragmentatie: meerdere aanbieders zijn betrokken bij één gezin zonder onderlinge afstemming, er wordt gemedicaliseerd waar normalisering passender zou zijn, en het gezinssysteem als geheel wordt onvoldoende betrokken in de behandeling.',
    doel:
      'Het verschuiven van individuele, labelgerichte zorg naar een gezinsgerichte aanpak waarin het hele systeem en de context van de jongere centraal staan. Hierdoor wordt zorg passender, nemen volumes op totaalniveau af en wordt onnodige medicalisering voorkomen.',
    aanpak:
      '## De aanpak in drie pijlers\n\n### 1. Richten op de hele context\n\nNiet alleen kijken naar de jongere met een diagnose, maar naar het hele gezinssysteem. Wat speelt er thuis? Hoe verhouden gezinsleden zich tot elkaar? Welke patronen houden de problematiek in stand?\n\nDoor het gezin als geheel te betrekken, wordt de behandeling effectiever en duurzamer.\n\n### 2. Minder diagnosticeren en labelen\n\nNiet elk gedragsprobleem vraagt om een diagnose. De gezinsgerichte aanpak zet in op normalisering en het versterken van het gezinssysteem, in plaats van het plakken van labels op individuele gezinsleden.\n\nDit voorkomt onnodige medicalisering en houdt de regie bij het gezin.\n\n### 3. Afstemming tussen aanbieders\n\nWanneer meerdere aanbieders betrokken zijn bij één gezin, ontstaat er vaak overlap, tegenstrijdige adviezen en gebrek aan regie. De gezinsgerichte aanpak organiseert actieve afstemming tussen alle betrokken partijen.\n\n## Hoe werkt het in de praktijk?\n\nFamilySupporters zet in op:\n\n- **Gezinsplan als centraal instrument** — één integraal plan voor het hele gezin, niet losse behandelplannen per gezinslid\n- **Laagdrempelige afstemming** — korte lijnen tussen alle betrokken hulpverleners rondom een gezin\n- **Inzicht in verwijsgeschiedenis** — weten welke hulpverlening al eerder is ingezet, om herhaling en overlap te voorkomen\n- **Pro-actieve communicatie met huisartsen** — de huisarts als spil informeren over het gezinsplan en de voortgang',
    resultaten:
      '## Wat levert het op?\n\n### Voor gezinnen\n- Passende zorg die aansluit bij het gezinssysteem, niet alleen bij een individuele diagnose\n- Minder labels en minder medicalisering\n- Eén aanspreekpunt en samenhangend plan in plaats van losse trajecten\n- Meer regie bij het gezin zelf\n\n### Maatschappelijk\n- Lagere volumes op totaalniveau doordat het gezin als geheel wordt geholpen in plaats van individuele trajecten per gezinslid\n- Minder overlap en fragmentatie in de zorg\n- Efficiëntere inzet van schaarse GGZ-capaciteit\n\n### Status\nFamilySupporters past deze werkwijze toe in de dagelijkse praktijk. Systematische effectmeting wordt nog opgezet.',
    impact: {
      samenvatting:
        'Door zorg te richten op het hele gezinssysteem in plaats van op losse diagnoses, wordt de hulpverlening passender en samenhangender. Dit leidt tot minder volumes op totaalniveau en minder onnodige medicalisering.',
    },
    gelpierdeLessen:
      '- Een gezinsplan als declarabel product is een belangrijke randvoorwaarde — zonder financiering van het gezinsplan blijft het bij goede intenties\n- Inzicht in de verwijsgeschiedenis van het gezin is essentieel om overlap te voorkomen\n- Pro-actieve communicatie met de huisarts vergroot het draagvlak en de effectiviteit\n- Laagdrempelige afstemmingsstructuren (bijv. korte gezinsoverleggen) kosten weinig tijd maar leveren veel op',
    startDatum: '2025-06-01',
    contactPersonen: [],
    tags: ['gezinsaanpak', 'systeemgericht', 'contextgericht', 'normaliseren', 'labels', 'afstemming'],
    accessLevel: 'free',
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
