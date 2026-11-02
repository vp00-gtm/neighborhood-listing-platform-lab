# My Google AI Studio structured-output prompt

I prepared the prompt below to ask for five fictional property records that
follow my JSON Schema. I used Google AI Studio to generate the five-record
output saved separately in
[`data/generated/google-ai-studio-output.json`](../../../data/generated/google-ai-studio-output.json).

I did not save a separate transcript or screenshot of the exact prompt I
submitted. I need to compare this saved prompt with my AI Studio history
before I can confirm that it is an exact copy of what I pasted. The generated
output did not match the schema, so I kept the original response and recorded
my review and mappings in
[`data/generated/README.md`](../../../data/generated/README.md).

When I use this prompt, I select **JSON** / `application/json` as the output
format and paste
[`data/schema/property.schema.json`](../../../data/schema/property.schema.json)
into the structured-output schema field. I review the response and run the
project validator before using it.

## Prompt I prepared

Generate exactly five realistic but completely fictional property records for
a neighborhood-listing platform.

Return one JSON object with exactly one key, `properties`, whose value is an
array of exactly five records. Follow the supplied JSON Schema exactly,
including every required property, nested address field, local sponsor field,
the enumerated amenity and business-category values, and the strict rule
against additional fields. Do not return Markdown, comments, or explanatory
text outside the JSON object.

Every `source_note` must say that the listing is a fictional scenario and was
not sourced from a real listing. Use only fictional property names, street
names, cities, sponsors, prices, and other listing details. Use `ZZ` for the
two-letter state placeholder and five-digit synthetic ZIP strings. Do not use
real addresses, real business details, personal information, or client
information. Sponsor URLs must use `https://example.com/` paths. Use only the
existing illustration paths `/images/maple-court.svg`,
`/images/cedar-studio.svg`, and `/images/willow-house.svg`; describe them as
illustrations, not photographs of the generated properties.

Choose realistic positive square-footage values, nonnegative monthly USD
prices, nonnegative bedroom and bathroom counts, and amenities only from the
schema's allowed values. Sponsor records may be reused across multiple
properties. Make the records varied and internally consistent. Do not claim
that any record is available for rent.
