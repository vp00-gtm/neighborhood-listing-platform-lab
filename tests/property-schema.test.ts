import assert from "node:assert/strict";
import { test } from "node:test";
import propertySeed from "../data/seed/properties.json";
import {
  assertValidPropertyCollection,
  getPropertyRecordErrors,
} from "../src/data/property-validation";

const validProperty: unknown = propertySeed.properties[0];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cloneValidProperty(): Record<string, unknown> {
  const property = structuredClone(validProperty);

  if (!isRecord(property)) {
    throw new Error("The valid fixture must be a property object.");
  }

  return property;
}

function assertRecordRejected(
  property: Record<string, unknown>,
  expectedError: RegExp,
) {
  assert.match(getPropertyRecordErrors(property).join("\n"), expectedError);
  assert.throws(
    () => assertValidPropertyCollection({ properties: [property] }),
    (error: unknown) => {
      if (!(error instanceof Error)) {
        return false;
      }

      assert.match(error.message, /Record 1/);
      assert.match(error.message, expectedError);
      return true;
    },
  );
}

test("accepts each of the five synthetic seed properties", () => {
  const properties = assertValidPropertyCollection(propertySeed);

  assert.equal(properties.length, 5);
});

test("rejects a property missing property_id", () => {
  const property = cloneValidProperty();
  delete property.property_id;

  assertRecordRejected(property, /required property 'property_id'/);
});

test("rejects a property with a negative price", () => {
  const property = cloneValidProperty();
  property.price = -1;

  assertRecordRejected(property, /\/price: must be >= 0/);
});

test("rejects a property with a ZIP code that is not five digits", () => {
  const property = cloneValidProperty();
  property.zip_code = "1234";

  assertRecordRejected(property, /\/zip_code: must match pattern/);
});

test("rejects an unknown property field", () => {
  const property = cloneValidProperty();
  property.unexpected = "not allowed";

  assertRecordRejected(
    property,
    /must NOT have additional properties \(unexpected\)/,
  );
});
