import type { ReactNode } from "react";

type Props = { kicker: string; title: ReactNode; children?: ReactNode; align?: "left" | "center" };

export function SectionHeading({ kicker, title, children, align = "left" }: Props) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {children ? <p className="lede">{children}</p> : null}
    </div>
  );
}
