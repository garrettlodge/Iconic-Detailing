"use client";

import { useContent } from "@/components/ContentProvider";

export default function TrustBar() {
  const { business, contact, reviews } = useContent();

  const cells = [
    `★ ${reviews.rating} · ${reviews.count}+ ${reviews.source} reviews`,
    business.license,
    `Serving ${contact.address.city} since ${business.foundedYear}`,
  ];

  return (
    <section className="border-y hairline">
      <div className="mx-auto grid max-w-shell grid-cols-1 px-6 md:grid-cols-3 md:px-0">
        {cells.map((c, i) => (
          <p
            key={i}
            className={`text-eyebrow flex items-center justify-center px-6 py-5 text-center md:py-6 ${
              i > 0 ? "border-t hairline md:border-l md:border-t-0" : ""
            }`}
          >
            {c}
          </p>
        ))}
      </div>
    </section>
  );
}
