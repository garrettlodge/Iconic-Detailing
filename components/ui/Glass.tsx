import type { HTMLAttributes } from "react";

/**
 * Frosted-glass surface. Pure CSS (.glass), token-driven, so it adapts to the
 * active template's blur intensity + brand palette. `strong` = heavier blur.
 */
type Props = HTMLAttributes<HTMLDivElement> & {
  strong?: boolean;
  radius?: boolean;
};

export default function Glass({
  strong,
  radius = true,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <div
      className={[
        "glass",
        strong ? "glass-strong" : "",
        radius ? "u-radius" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
