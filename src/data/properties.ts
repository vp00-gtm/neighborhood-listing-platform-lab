import propertySeed from "../../data/seed/properties.json";
import { assertValidPropertyCollection } from "@/data/property-validation";

// Import-time validation prevents malformed seed data from reaching the UI.
export const properties = assertValidPropertyCollection(propertySeed);
