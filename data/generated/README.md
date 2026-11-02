# Generated-data examples

I created `sample-structured-output.json` manually as an example of structured
property data. Its property, sponsor, address, price, and source note are
synthetic and were not taken from clients or real property listings.

I generated five fictional property records with Google AI Studio and saved
the exact response in `google-ai-studio-output.json`. I kept it separate from
my manually created sample. Both files are examples of structured property
data.

I checked that the original output is valid JSON and ran it through the
project validator. It did not pass because its root is an array containing an
object, while the schema requires an object whose `properties` field contains
the records. Its field names and some enum values also differ from the schema.
I left the original file unchanged.

I created `google-ai-studio-output.schema-compatible.json` as a separate
derived copy. I mapped the property fields this way:

- `property_name` → `title`
- `address.street`, `address.city`, and `address.state` stay in the nested
  address; I moved `address.zip_code` to the required top-level `zip_code`.
- `illustration_path` → `image_path`
- `illustration_description` → `image_alt`
- Sponsor `name` → `business_name`
- Sponsor `sponsor_url` → `website_url`
- I lowercased the uppercase property and sponsor IDs and added hyphens where
  needed to match the schema's lowercase identifier pattern.

I used only the amenity mappings I selected:

| Original value | Derived value | Where used |
|---|---|---|
| `Central AC` | `air-conditioning` | PROP-101, PROP-103, PROP-104 |
| `Dishwasher` | `dishwasher` | PROP-101, PROP-103, PROP-105 |
| `In-Unit Laundry` | `in-unit-laundry` | PROP-102, PROP-104 |
| `Balcony` | `balcony` | PROP-103, PROP-105 |
| `Hardwood Floors` | Unresolved; omitted from derived amenities | PROP-101, PROP-102, PROP-104 |

I used only this sponsor-category mapping:

| Original value | Derived value | Where used |
|---|---|---|
| `Interior Design` | `home-services` | SPON-02, PROP-102 and PROP-105 |
| `Mortgage Services` | Unresolved; related sponsor omitted from derived copy | SPON-01, PROP-101 and PROP-103 |
| `Real Estate Law` | Unresolved; related sponsor omitted from derived copy | SPON-03, PROP-103 |
| `Home Insurance` | Unresolved; related sponsor omitted from derived copy | SPON-04, PROP-104 |

I did not invent values for the unresolved entries. Their original values
remain in `google-ai-studio-output.json`, and the corresponding sponsor entries
are omitted from the compatible copy where the required schema category could
not be determined. I validated the derived copy successfully; it contains
five records. The derived file does not replace or alter the original.

I also keep five fictional seed records in `../seed/properties.json`. I can
check the seed, manual sample, exact AI Studio output, and derived copy with:

```bash
npm run validate:data
npm run validate:data -- data/generated/sample-structured-output.json
npm run validate:data -- data/generated/google-ai-studio-output.json
npm run validate:data -- data/generated/google-ai-studio-output.schema-compatible.json
```
