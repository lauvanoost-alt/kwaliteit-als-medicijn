# MyCareTeam

Platform voor jeugd GGZ initiatieven in Zuid-Holland Zuid. Maakt alle pilots en initiatieven rondom volume-reductie en Kwaliteit als Medicijn zichtbaar, vindbaar en deelbaar.

## Starten

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Pagina's

- **/** — Homepage met recente pilots, thema-navigatie en regionale statistieken
- **/projecten** — Catalogus van alle pilots met zoek- en filterfunctie
- **/projecten/[slug]** — Detailpagina per project (aanpak, resultaten, impact, contactpersonen)
- **/organisaties** — Overzicht van deelnemende organisaties
- **/organisaties/[slug]** — Organisatieprofiel met gekoppelde projecten
- **/kennisbank** — Frameworks, instrumenten, beslisbomen en richtlijnen
- **/kennisbank/[slug]** — Kennisbank artikelen
- **/community** — Directory van professionals in de regio
- **/over-ons** — Missie, principes en doelgroep

## Tech Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Lucide React (iconen)
- Mock data (TypeScript bestanden in `src/data/`)

## Projectstructuur

```
src/
├── app/          # Pagina's en routing
├── components/   # UI en layout componenten
├── data/         # Mock data (projecten, organisaties, thema's, etc.)
├── lib/          # Types, utilities, helpers
└── config/       # Site configuratie
```
