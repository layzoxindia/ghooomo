import type { CSSProperties, ReactNode } from "react";

/**
 * Fade-and-rise on scroll without shipping an animation library.
 * The element renders visible on the server; RevealObserver (client) hides
 * not-yet-seen ones only after JavaScript runs, so content never depends on JS.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const Tag = as;
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
