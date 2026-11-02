import type {
  Property,
  Sponsor,
} from "@/types/property-schema.generated";

export type { Property, Sponsor };

export interface PropertyCardProps {
  property: Property;
}

export interface SponsorBannerProps {
  sponsor: Sponsor;
}

/**
 * Controlled draft filters: city === "" means all cities; maxRentUsd ===
 * undefined means no rent limit. Change callbacks update the draft only.
 * The client parent applies that draft to listings in onSubmit.
 * SearchFilters must prevent the form's default navigation before onSubmit().
 * onClear resets both draft and applied values in the parent.
 */
export interface SearchFiltersProps {
  cities: string[];
  city: string;
  maxRentUsd?: number;
  onCityChange: (city: string) => void;
  onMaxRentChange: (maxRentUsd?: number) => void;
  onSubmit: () => void;
  onClear: () => void;
}
