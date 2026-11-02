import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertValidPropertyCollection } from "../src/data/property-validation";

const inputPath = process.argv[2] ?? "data/seed/properties.json";
const filePath = resolve(process.cwd(), inputPath);
const source = readFileSync(filePath, "utf8");
const input: unknown = JSON.parse(source);

try {
  const properties = assertValidPropertyCollection(input);
  const recordLabel = properties.length === 1 ? "record" : "records";
  console.log(
    `Property data validation passed: ${properties.length} ${recordLabel} in ${inputPath}`,
  );
} catch (error) {
  if (!(error instanceof Error)) {
    throw error;
  }

  console.error(error.message);
  process.exitCode = 1;
}
