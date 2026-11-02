# CIS 3610 AI collaboration log

I keep this log to explain how I used AI tools, what I accepted or changed,
and how I checked the results. I treat AI output as a suggestion or draft; I
review the project files and test the code before relying on it.

## Lab 1 — project setup and technology overview

I used AI assistance to learn about the project stack and plan my beginner
workflow. The source notes I have describe a comparison of explanations about
Next.js, TypeScript, Tailwind CSS, GitHub, Vercel, local development, and common
beginner mistakes.

I do not have the original prompts or full responses saved. The old notes
identify ChatGPT and Gemini, but they also describe one source as “AI Studio,”
so I cannot verify the exact attribution or quote a response. I kept the
comparison as a learning summary, not as proof that the technical details,
accessibility recommendations, or deployment behavior were correct. I planned
to check technical claims against the actual project and official
documentation.

**What I still need to add, if I have the source material:** the original
prompts, full responses, and a confirmed attribution for the comparison.

## Lab 2 — components and collaboration

I used ChatGPT to help me understand the Lab 2 requirements, plan the
implementation, prepare prompts for Copilot, understand Git status and
testing, and plan accessibility and responsive checks. The notes I have do
not include the full ChatGPT conversations, so I am not quoting exact prompts
or responses here.

For the first part of Lab 2, Eric created the shared interfaces, fictional
property examples, illustrations, and initial property card. I reviewed the
project integration and worked on the filters, sponsor banner, and responsive
listing experience. The existing Lab 2 testing notes record command results
and distinguish reported partner checks from checks that were not confirmed.
Where Eric supplied browser or Lighthouse results, I keep those attributed
to him rather than presenting them as tests I ran.

I used Copilot assistance in VS Code for coding and documentation tasks. I
reviewed the changes and used the project's lint, TypeScript, build, and
other recorded checks. The original task prompts and complete AI responses
for every Lab 2 session are not all preserved in this repository.

## Lab 3 — data contracts and validation

### What I asked for

I asked for a strict JSON Schema using Draft 2020-12 for property records.
The requirements included property IDs, address fields, price, bedrooms,
bathrooms, square footage, amenities, ZIP codes, and local sponsors. I asked
for nonnegative or positive numeric limits, five-digit ZIP validation,
nonempty strings, enumerations, consistent sponsor records, and
`additionalProperties: false`.

I kept the JSON Schema as my primary contract. I used AJV 2020 to validate
JSON at runtime and `json-schema-to-typescript` to generate TypeScript
declarations from that schema. I chose controlled amenity identifiers rather
than free text and documented why I did not add a separate amenities
relationship table for this static project. My decision and the Property,
Sponsor, and PropertySponsor relationship are documented in
[`adr/001-data-contract.md`](../../adr/001-data-contract.md).

I also prepared the structured-output prompt in
[`ai-studio-prompt.md`](./ai-studio-prompt.md). It asks Google AI Studio for
five fictional records in a JSON object that follows the schema. I used
Google AI Studio to generate five fictional property records and saved the
response in
[`data/generated/google-ai-studio-output.json`](../../../data/generated/google-ai-studio-output.json).

**Prompt-history note:** I saved the prompt I prepared for Google AI Studio,
but I did not separately save a transcript or screenshot of the exact text I
submitted. I need to compare it with my AI Studio history before I claim that
the saved prompt exactly matches what I pasted. I have not invented a
different prompt to fill that gap.

The generated records contain property IDs and names, street/city/state/ZIP
addresses, prices, bedroom and bathroom counts, square footage, amenities,
local sponsor details, fictional source notes, and illustration paths and
descriptions.

### How I reviewed the Google AI Studio output

I checked that the original file parses as JSON, reviewed its fields against
my schema, and ran it through the project validator. The JSON is syntactically
valid, but validation failed with:

```text
Property data validation failed:
- Collection /: must be object
```

The original response has an array at the root containing an object with a
`properties` array. My schema expects the root itself to be an object with a
`properties` array. The generated records also use different field names,
uppercase IDs, and some values outside the schema's enums.

I decided to keep the original output unchanged as evidence and create a
separate derived copy:
[`data/generated/google-ai-studio-output.schema-compatible.json`](../../../data/generated/google-ai-studio-output.schema-compatible.json).
I did not change or weaken my schema to force the original output to pass.

I made these field and identifier mappings in the derived copy:

- `property_name` → `title`.
- I kept street, city, and state nested in `address`, and moved
  `address.zip_code` to the required top-level `zip_code`.
- `illustration_path` → `image_path`.
- `illustration_description` → `image_alt`.
- Sponsor `name` → `business_name`.
- Sponsor `sponsor_url` → `website_url`.
- I changed uppercase IDs to the schema's lowercase, hyphenated format.

I used only the amenity mappings I approved:

| Original value | Value in my derived copy |
|---|---|
| `Central AC` | `air-conditioning` |
| `Dishwasher` | `dishwasher` |
| `In-Unit Laundry` | `in-unit-laundry` |
| `Balcony` | `balcony` |
| `Hardwood Floors` | Unresolved; omitted from the derived amenity arrays |

I used only this sponsor-category mapping:

| Original value | Value in my derived copy |
|---|---|
| `Interior Design` | `home-services` |
| `Mortgage Services` | Unresolved; I omitted the related sponsor entry |
| `Real Estate Law` | Unresolved; I omitted the related sponsor entry |
| `Home Insurance` | Unresolved; I omitted the related sponsor entry |

I did not invent replacements for the unresolved values. I documented the
original values and decisions in
[`data/generated/README.md`](../../../data/generated/README.md). I also copied
both JSON files into [`docs/evidence/lab3/`](../../../docs/evidence/lab3/) so I
can review the original and derived evidence together.

### Other AI assistance and my review

- **Google AI Studio:** I used it to generate the five fictional property
  records. I reviewed the response against my JSON Schema, kept the original
  output unchanged, created the separate derived copy using my selected
  mappings, and validated both files. The original did not pass; the derived
  copy did.
- **Copilot in VS Code:** I used coding assistance to help implement the
  schema, validator, generated types, tests, and UI integration, and to update
  project documentation. I personally reviewed the project files and
  implementation, ran the checks below, and reviewed their output.
  **Prompt note:** I do not have a complete transcript of the coding-assistant
  conversation, so this is a summary of the work in the repository rather
  than a quoted prompt or response.
- **ChatGPT and Gemini for Lab 3:** I did not use them for a separate Lab 3
  schema-generation comparison, and I do not have Lab 3 responses from them
  to compare. My earlier Lab 1/2 notes mention ChatGPT and an uncertain
  comparison source, but that is not evidence of a Lab 3 conversation.

### Tests I ran and reviewed

| Command | Result I observed |
|---|---|
| `npm run generate:types` | Passed; generated TypeScript declarations from my JSON Schema. |
| `npm run validate:data` | Passed; all five synthetic seed records validated. |
| `npm run validate:data -- data/generated/google-ai-studio-output.schema-compatible.json` | Passed; all five derived records validated. |
| `npm test` | Passed; all five tests passed, including the missing ID, negative price, malformed ZIP, and unknown-field cases. |
| `npm run lint` | Passed with no diagnostics. |
| `npm exec tsc -- --noEmit` | Passed with no diagnostics. |
| `npm run build` | Passed; Next.js generated `/` and `/_not-found`. |
| `git diff --check` | Passed; no whitespace errors. |

I also checked the validator's invalid-data path during implementation. It
identified the failing record, listed the schema errors, and exited with
status 1. I reviewed the files and test output myself. These automated
results do not claim that I completed a new browser or partner review.

### Evidence checklist

- **Prompt:** I saved the prompt I prepared in
  [`ai-studio-prompt.md`](./ai-studio-prompt.md). I still need to confirm
  whether it exactly matches the text I submitted in AI Studio.
- **Actual response:** I saved the generated response as
  [`google-ai-studio-output.json`](../../../data/generated/google-ai-studio-output.json).
- **Original JSON evidence copy:** I saved a copy at
  [`evidence/lab3/google-ai-studio-output.json`](../../../docs/evidence/lab3/google-ai-studio-output.json).
- **Derived JSON:** I saved the separate compatible copy at
  [`google-ai-studio-output.schema-compatible.json`](../../../data/generated/google-ai-studio-output.schema-compatible.json)
  and copied it to
  [`evidence/lab3/google-ai-studio-output.schema-compatible.json`](../../../docs/evidence/lab3/google-ai-studio-output.schema-compatible.json).
- **My review decisions:** I documented my validation results and mappings in
  this log and in
  [`data/generated/README.md`](../../../data/generated/README.md).
- **Screenshot:** I do not have a Google AI Studio screenshot saved in the
  project. If I need to submit one, I will save it as
  `docs/evidence/lab3/google-ai-studio-output.png`.
