/** Generated from data/schema/property.schema.json. Do not edit directly. */

/**
 * A strict batch of one to five property records. Prices are monthly USD amounts.
 */
export interface SyntheticNeighborhoodPropertyCollection {
  /**
   * @minItems 1
   * @maxItems 5
   */
  properties:
    | [Property]
    | [Property, Property]
    | [Property, Property, Property]
    | [Property, Property, Property, Property]
    | [Property, Property, Property, Property, Property];
}
export interface Property {
  property_id: string;
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  /**
   * Monthly price in USD.
   */
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  /**
   * A list of zero or more controlled amenity identifiers.
   */
  amenities: (
    | "air-conditioning"
    | "balcony"
    | "bike-storage"
    | "dishwasher"
    | "in-unit-laundry"
    | "off-street-parking"
    | "pet-friendly"
    | "shared-garden"
  )[];
  zip_code: string;
  local_sponsors: Sponsor[];
  image_path: string;
  image_alt: string;
  source_note: string;
}
export interface Sponsor {
  sponsor_id: string;
  business_name: string;
  website_url: string;
  business_category: "community-services" | "food-and-drink" | "home-services";
}
