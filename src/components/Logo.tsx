import Link from "next/link";

type Props = {
  tone?: "ink" | "light";
  /** colour behind the logo, used to cut the overlapping rings cleanly */
  bg?: string;
  width?: number;
  /** make each ring a link to its trip page */
  ringLinks?: boolean;
  id?: string;
};

export function Wordmark({ tone = "ink", bg = "#F6F2EB", width = 172, id = "g" }: Omit<Props, "ringLinks">) {
  const ink = tone === "ink" ? "#0F2B5B" : "#FFFFFF";
  const h = Math.round((width * 190) / 1032);
  const letter = { fill: "none", stroke: ink, strokeWidth: 26, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const ring = { fill: "none", stroke: `url(#${id})`, strokeWidth: 26 };
  const cut = { fill: "none", stroke: bg, strokeWidth: 36 };
  return (
    <svg viewBox="0 20 1032 190" width={width} height={h} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="343" y1="140" x2="671" y2="140">
          <stop offset="0" stopColor="#F2603A" />
          <stop offset="0.5" stopColor="#F7AE2A" />
          <stop offset="1" stopColor="#13B2A8" />
        </linearGradient>
      </defs>
      <path {...letter} d="M155.2 68.7 A72 72 0 1 0 172 115 L118 115" />
      <path {...letter} d="M226 43 L226 187 M226 127 A38 38 0 0 1 302 127 L302 187" />
      <circle {...ring} cx="403" cy="140" r="47" />
      <circle {...cut} cx="507" cy="140" r="47" />
      <circle {...ring} cx="507" cy="140" r="47" />
      <circle {...cut} cx="611" cy="140" r="47" />
      <circle {...ring} cx="611" cy="140" r="47" />
      <path {...cut} strokeLinecap="butt" d="M450 140 A47 47 0 0 1 439 170.2" />
      <path {...ring} strokeLinecap="butt" d="M450 140 A47 47 0 0 1 439 170.2" />
      <path {...cut} strokeLinecap="butt" d="M554 140 A47 47 0 0 1 543 170.2" />
      <path {...ring} strokeLinecap="butt" d="M554 140 A47 47 0 0 1 543 170.2" />
      <circle fill="#F2603A" cx="403" cy="140" r="10" />
      <circle fill="#EFA21C" cx="494" cy="140" r="9" />
      <circle fill="#EFA21C" cx="520" cy="140" r="9" />
      <circle fill="#11A39A" cx="611" cy="127" r="9" />
      <circle fill="#11A39A" cx="599" cy="149" r="9" />
      <circle fill="#11A39A" cx="623" cy="149" r="9" />
      <path {...letter} d="M712 187 L712 127 A36 36 0 0 1 784 127 L784 187 M784 127 A36 36 0 0 1 856 127 L856 187" />
      <circle {...letter} cx="957" cy="140" r="47" />
    </svg>
  );
}

/** Logo with home link; each of the three rings links to Solo / Couple / Group. */
export function Logo({ ringLinks = true, ...props }: Props) {
  const width = props.width ?? 172;
  const h = Math.round((width * 190) / 1032);
  const ringBox = (cx: number) => ({
    left: `${((cx - 60) / 1032) * 100}%`,
    top: `${((80 - 20) / 190) * 100}%`,
    width: `${(120 / 1032) * 100}%`,
    height: `${(120 / 190) * 100}%`,
  });
  return (
    <div className="relative shrink-0" style={{ width, height: h }}>
      <Link href="/" aria-label="Ghooomo home" className="block">
        <Wordmark {...props} width={width} />
      </Link>
      {ringLinks && (
        <>
          <Link href="/solo" aria-label="Solo trips" title="Solo trips" className="absolute rounded-full" style={ringBox(403)} />
          <Link href="/couple" aria-label="Couple trips" title="Couple trips" className="absolute rounded-full" style={ringBox(507)} />
          <Link href="/group" aria-label="Group trips" title="Group trips" className="absolute rounded-full" style={ringBox(611)} />
        </>
      )}
    </div>
  );
}

/** One ring with 1, 2 or 3 dots: the mark for each trip type. */
export function RingMark({ dots, color, size = 84, cut }: { dots: 1 | 2 | 3; color: string; size?: number; cut?: string }) {
  const pts: [number, number][] = dots === 1 ? [[0, 0]] : dots === 2 ? [[-13, 0], [13, 0]] : [[0, -12], [-12, 9], [12, 9]];
  return (
    <svg width={size} height={size} viewBox="-62 -62 124 124" aria-hidden="true" focusable="false">
      {cut && <circle r="47" fill="none" stroke={cut} strokeWidth="40" />}
      <circle r="47" fill="none" stroke={color} strokeWidth="26" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={dots === 1 ? 10 : 9} fill={color} />
      ))}
    </svg>
  );
}
