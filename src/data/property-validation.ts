import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import type { ErrorObject } from "ajv";
import propertySchema from "../../data/schema/property.schema.json";
import type {
Property,
SyntheticNeighborhoodPropertyCollection,
} from "@/types/property-schema.generated";

export type { Property };

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

const validatePropertyCollectionWithAjv =
ajv.compile<SyntheticNeighborhoodPropertyCollection>(
  propertySchema,
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatErrors(
  errors: ErrorObject[],
  prefix: string,
): string[] {
  return errors.map((error) => {
    const path = `${prefix}${error.instancePath || "/"}`;
    const unknownField =
      error.keyword === "additionalProperties" &&
      typeof error.params.additionalProperty === "string"
        ? ` (${error.params.additionalProperty})`
        : "";

    return `${path}: ${error.message ?? "is invalid"}${unknownField}`;
  });
}

export function getPropertyRecordErrors(value: unknown): string[] {
  const recordPath = "/properties/0";

  if (validatePropertyCollectionWithAjv({ properties: [value] })) {
    return [];
  }

  const recordErrors = (validatePropertyCollectionWithAjv.errors ?? [])
    .filter(
      (error) =>
        error.instancePath === recordPath ||
        error.instancePath.startsWith(`${recordPath}/`),
    )
    .map((error) => ({
      ...error,
      instancePath: error.instancePath.slice(recordPath.length),
    }));

  return formatErrors(recordErrors, "");
}

export function assertValidPropertyCollection(
  value: unknown,
): Property[] {
  const collectionIsValid = validatePropertyCollectionWithAjv(value);
  const collectionErrors = collectionIsValid
    ? []
    : [...(validatePropertyCollectionWithAjv.errors ?? [])];
  const errors = formatErrors(
    collectionErrors.filter(
      (error) => !error.instancePath.startsWith("/properties/"),
    ),
    "Collection ",
  );
  const validProperties: Property[] = [];

  if (isRecord(value) && Array.isArray(value.properties)) {
    value.properties.forEach((record, index) => {
      const recordErrors = getPropertyRecordErrors(record);

      if (recordErrors.length === 0) {
        validProperties.push(record);
        return;
      }

      const propertyId =
        isRecord(record) && typeof record.property_id === "string"
          ? ` (${record.property_id})`
          : "";
      errors.push(
        ...recordErrors.map(
          (error) => `Record ${index + 1}${propertyId} ${error}`,
        ),
      );
    });
  }

  if (errors.length > 0) {
    throw new Error(
      `Property data validation failed:\n${errors
        .map((error) => `- ${error}`)
        .join("\n")}`,
    );
  }

  return validProperties;
}
