"use client";

import { useEditable } from "../ContentProvider";

export default function ButtonBlock({
  section,
  index = 0,
}: {
  section?: { data?: { label?: string; href?: string; align?: string } };
  index?: number;
}) {
  const ed = useEditable();
  const data = section?.data || {};
  const align =
    data.align === "left" ? "justify-start" : data.align === "right" ? "justify-end" : "justify-center";

  return (
    <section className="border-t hairline py-16 md:py-20">
      <div className={`mx-auto flex max-w-shell px-6 md:px-10 ${align}`}>
        <a href={data.href || "#contact"} className="btn-primary">
          <span {...ed(`sections.${index}.data.label`)}>{data.label || "Get a quote"}</span>
        </a>
      </div>
    </section>
  );
}
