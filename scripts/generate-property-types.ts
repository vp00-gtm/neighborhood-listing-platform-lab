import { writeFile } from "node:fs/promises";
import { compileFromFile } from "json-schema-to-typescript";

async function main() {
  const generatedTypes = await compileFromFile(
    "data/schema/property.schema.json",
    {
      bannerComment:
        "/** Generated from data/schema/property.schema.json. Do not edit directly. */",
    },
  );

  await writeFile("src/types/property-schema.generated.ts", generatedTypes);
  console.log(
    "Generated src/types/property-schema.generated.ts from the JSON Schema.",
  );
}

void main();
