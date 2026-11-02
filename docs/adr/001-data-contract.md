# ADR 001: Property data contract and validation

## Context

The first two labs used small TypeScript interfaces and in-code sample data.
Those types help during development, but they do not check imported JSON at
runtime. A malformed address, negative price, or unexpected field could
otherwise reach a card or filter. Lab 3 needs one explicit contract that the
seed data, validator, and UI can share.

## Decision

Use JSON Schema Draft 2020-12 as the primary contract in
[`data/schema/property.schema.json`](../../data/schema/property.schema.json).
Its root is a strict object containing a `properties` array. The array accepts
one to five property records so both a one-record example and a five-record
seed can use the same schema; the seed and AI Studio prompt specifically
require five. Each record and nested address and sponsor object rejects
unknown keys with `additionalProperties: false`.

AJV 2020 validates the JSON and `ajv-formats` checks sponsor website URIs.
`json-schema-to-typescript` generates the application `Property` and `Sponsor`
types from that schema, rather than maintaining a second hand-written data
definition.
The shared runtime validator checks each record and the collection structure.
The server-side data module validates the seed before passing it to the
interactive listing components. A failure raises a descriptive error instead
of rendering invalid records.

## Alternatives

- **Free-text amenities:** flexible, but inconsistent spelling and wording
  makes filtering and comparisons unreliable. Rejected for this small app.
- **Controlled amenity values:** selected. Amenities are a unique array of
  documented identifiers such as `dishwasher` and `shared-garden`; the
  current card displays readable labels by replacing hyphens with spaces.
- **Separate amenities relationship table:** not needed for this static
  demonstration. A normalized `PropertyAmenity` join table would be useful
  later if amenities need independent metadata, localization, or database
  querying.
- **Zod as the source of truth:** not selected because the assignment prefers
  JSON Schema as the primary contract and the same schema is useful for
  structured AI output. Maintaining a second schema in Zod would duplicate
  constraints.
- **Hand-maintained TypeScript types:** avoided because they can drift from
  runtime validation. TypeScript types are instead inferred from the JSON
  Schema.

## Consequences

The schema catches malformed values at runtime and at the UI boundary, and it
can also be supplied as a structured-output contract. Strict objects may
require intentional schema updates when the product adds fields. Controlled
amenities also require a schema update before a new value can be stored.
Images and sponsor data are included in each property record because the
existing card and sponsor UI need them; they are part of the same contract,
not parallel component-only data.

The schema allows a collection of one to five records for the representative
single-record sample. The seed contains five records, and the AI Studio prompt
asks for exactly five. A future production database should enforce uniqueness
and foreign-key constraints that a JSON Schema cannot express across records.

## Data Relationships

- **Listing card:** use the property ID, display title, street and city,
  monthly price, bedroom and bathroom counts, and illustration path/alt text.
- **Property details:** add state and ZIP code, square footage, controlled
  amenities, and local sponsor links to the card information.
- **Local sponsor selection:** use the property ID and sponsor ID together;
  include the sponsor name, category, and website for display and selection.
- **Voice response:** use the display title, address, monthly price, bedroom
  and bathroom counts, square footage, amenities, and ZIP code. `source_note`
  is provenance for the application, not spoken listing content. This lab
  defines the data needed by a future voice response; it does not implement a
  voice assistant.

- **Property** is identified by `property_id` and holds its address, monthly
  USD price, bedrooms, bathrooms, square footage, amenities, ZIP code, image
  description, and provenance note.
- **Sponsor** is identified by `sponsor_id` and holds the business name,
  website, and controlled business category. In a property record,
  `local_sponsors` embeds a display-ready sponsor projection.
- **PropertySponsor** is the relational many-to-many association between
  `property_id` and `sponsor_id`. One property can have several sponsors and
  one sponsor can support several properties. The seed repeats sponsor IDs to
  demonstrate this relationship. A database can represent the association
  with a join table whose composite key is `(property_id, sponsor_id)`.

## Validation Rules

- A collection contains a `properties` array and no other root fields.
- Property IDs and sponsor IDs are nonempty lowercase hyphenated identifiers.
- Titles, address fields, image descriptions, business names, and source notes
  are nonempty strings. Address state uses a two-uppercase-letter placeholder;
  seed records use the fictional `ZZ` code.
- Price is a nonnegative monthly USD number; bedrooms are nonnegative
  integers; bathrooms are nonnegative numbers; square feet is a positive
  integer.
- ZIP codes are strings of exactly five digits. Seed ZIP values are synthetic
  examples, not claims about deliverable postal addresses.
- Amenities are unique arrays of the enumerated amenity identifiers.
- Sponsors have the required ID, name, HTTPS URI, and enumerated category.
- Unknown fields are rejected at the collection, property, address, and
  sponsor levels.

Sample validator output after the verified checks:

```text
Property data validation passed: 5 records in data/seed/properties.json
```
