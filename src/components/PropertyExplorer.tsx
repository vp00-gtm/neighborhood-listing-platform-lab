"use client";

import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import type { Property } from "@/types";

interface PropertyExplorerProps {
  properties: Property[];
}

export default function PropertyExplorer({
  properties,
}: PropertyExplorerProps) {
  const [cityDraft, setCityDraft] = useState("");
  const [rentDraft, setRentDraft] = useState<number | undefined>(undefined);
  const [appliedFilters, setAppliedFilters] = useState<{
    city: string;
    maxRentUsd: number | undefined;
  }>({ city: "", maxRentUsd: undefined });

  const cities = [
    ...new Set(properties.map((property) => property.address.city)),
  ].sort();
  const filteredProperties = properties.filter(
    (property) =>
      (appliedFilters.city === "" ||
        property.address.city === appliedFilters.city) &&
      (appliedFilters.maxRentUsd === undefined ||
        property.price <= appliedFilters.maxRentUsd),
  );

  function applyFilters() {
    setAppliedFilters({ city: cityDraft, maxRentUsd: rentDraft });
  }

  function clearFilters() {
    setCityDraft("");
    setRentDraft(undefined);
    setAppliedFilters({ city: "", maxRentUsd: undefined });
  }

  return (
    <>
      <SearchFilters
        cities={cities}
        city={cityDraft}
        maxRentUsd={rentDraft}
        onCityChange={setCityDraft}
        onMaxRentChange={setRentDraft}
        onSubmit={applyFilters}
        onClear={clearFilters}
      />
      {filteredProperties.length > 0 ? (
        <div className="mt-6 grid min-w-0 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.property_id} property={property} />
          ))}
        </div>
      ) : (
        <p
          role="status"
          className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
        >
          No properties match those filters. Try changing your selections or
          clear the filters to see all properties.
        </p>
      )}
    </>
  );
}
