# Neighborhood Listing Platform

**Course:** CIS 3610  
**Assignment:** Lab 1 — Individual Project

## Purpose and scope

This project is a neighborhood property platform starter. Lab 1 introduces local property listings, neighborhood sponsors, and voice assistance through an accessible, informational home page.

- **Implementation author:** Vanessa Palomera
- **Planned partner reviewer:** Eric Juarez (review not yet recorded)

## Technology

- Next.js App Router 16.4.3
- React and React DOM 19.3.0
- TypeScript 5.9.3
- Tailwind CSS 4.3.3
- ESLint 9.39.5
- npm for dependency management; Git and GitHub for source control
- Vercel is the intended hosting platform; deployment is pending

## Getting started

Install Node.js and npm, then run these commands from the project directory:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the local app. Stop the development server with **Ctrl+C**.

The home page source is [`src/app/page.tsx`](./src/app/page.tsx).

## Verification commands

```bash
npm run lint
npm exec tsc -- --noEmit
npm run build
```

Run `npm test` for the property-schema unit tests and `npm run validate:data` to
validate the five seed records. See [Lab 1 testing notes](./docs/testing-lab1.md)
for the historical Lab 1 command results and manual checks.

## Deployment

**Deployment URL:** Pending deployment.

## Lab 2 — property components, filters, and sponsors

I completed the Lab 2 integration with a responsive listing grid, interactive
property cards, working search filters, and a sponsor banner. The current page
keeps the original Lab 1 introduction and displays the five validated Lab 3
seed properties below it.

The Lab 2 interface uses this hierarchy:

```text
Page
├── SearchFilters
├── Listing grid
│   └── PropertyCard × properties.length
└── SponsorBanner
```

Each card uses a semantic article, an `h3` below the listings section's `h2`,
property facts, an illustration, and a native disclosure button. The filters
apply city and maximum-rent criteria, and the sponsor banner displays a sponsor
from the validated property data. The page remains a Server Component while
interactive listing components use Client Components.

### Filter behavior

The filter form supports selecting a city and setting a maximum monthly rent.
The parent applies the filters on submit, and clearing restores all listings.
Earlier Lab 2 implementation and reviewer evidence is preserved in
[Lab 2 testing notes](./docs/testing-lab2.md). I keep any remaining manual
browser checks distinct from automated test results.

All seed property names, addresses, cities, and prices are fictional
demonstration data. Image provenance is in [image sources](./docs/image-sources.md).

## Lab 3 — data contracts and validation

I created a Draft 2020-12 JSON Schema as the primary property contract and
added five fictional seed records. AJV validates the records before they reach
the listing UI, and I generate TypeScript declarations from the same schema.
I also added tests for valid data and the required invalid cases, an ADR, and a
prompt for Google AI Studio structured output.

I generated five fictional records with Google AI Studio and saved the exact
output separately from my manually created sample. The original AI Studio
output is valid JSON, but it does not pass the project validator because its
top-level value is an array instead of the object required by the schema. I
reviewed the fields and created a separate schema-compatible copy using only
the mappings I chose and documenting unresolved values. The original output
remains unchanged; the derived copy passed validation. I reviewed the project
files and personally ran and reviewed the checks listed below.

I have not saved the Google AI Studio screenshot in the repository yet. If it
is required for submission, I will save it under
`docs/evidence/lab3/google-ai-studio-output.png`.

Run the relevant checks with:

```bash
npm run validate:data
npm run validate:data -- data/generated/google-ai-studio-output.schema-compatible.json
npm test
npm run generate:types
npm run lint
npm exec tsc -- --noEmit
npm run build
```

See [the Lab 3 decision record](./docs/adr/001-data-contract.md) and the
[Lab 3 AI log](<./docs/AI logs/testing-lab3/ai-log.md>) and
[Google AI Studio prompt](<./docs/AI logs/testing-lab3/ai-studio-prompt.md>)
for the contract decisions, AI use, and evidence notes.
