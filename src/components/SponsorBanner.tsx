import type { SponsorBannerProps } from "@/types";

export default function SponsorBanner({ sponsor }: SponsorBannerProps) {
  return (
    <aside
      aria-label="Neighborhood sponsor"
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
        Sponsored
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">
        {sponsor.business_name}
      </h2>
      <a
        href={sponsor.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200 dark:focus-visible:outline-emerald-300"
      >
        Visit {sponsor.business_name}&apos;s website.
      </a>
    </aside>
  );
}
