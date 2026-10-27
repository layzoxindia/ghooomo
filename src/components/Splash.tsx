import SplashControl from "./SplashControl";

const NAVY = "#0F2B5B";

// Runs during HTML parsing, before the splash paints: show it once per browser session,
// and never for people who prefer reduced motion.
const gate = `try{var d=document.documentElement;if(sessionStorage.getItem("ghooomo-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("no-intro")}else{sessionStorage.setItem("ghooomo-intro","1");d.classList.add("intro-on")}}catch(e){document.documentElement.classList.add("no-intro")}`;

/**
 * Opening screen: the full Ghooomo logo draws itself, then the letters step aside
 * and the three rings (solo, couple, group) come forward. Pure CSS animation, so the
 * page underneath renders and loads normally. Tap, key press or scroll skips it.
 */
export default function Splash() {
  const letter = { fill: "none", stroke: "#FFFFFF", strokeWidth: 26, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, pathLength: 1 };
  const ring = { fill: "none", stroke: "url(#splash-g)", strokeWidth: 26, pathLength: 1 };
  const cut = { fill: "none", stroke: NAVY, strokeWidth: 36 };
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: gate }} />
      <div id="splash" className="splash" aria-hidden="true">
        <svg className="splash-svg" viewBox="0 -30 1032 340" focusable="false">
          <defs>
            <linearGradient id="splash-g" gradientUnits="userSpaceOnUse" x1="343" y1="140" x2="671" y2="140">
              <stop offset="0" stopColor="#F2603A" />
              <stop offset="0.5" stopColor="#F7AE2A" />
              <stop offset="1" stopColor="#13B2A8" />
            </linearGradient>
          </defs>

          <g className="sp-left">
            <path {...letter} className="sp-draw" style={{ animationDelay: "0.15s" }} d="M155.2 68.7 A72 72 0 1 0 172 115 L118 115" />
            <path {...letter} className="sp-draw" style={{ animationDelay: "0.3s" }} d="M226 43 L226 187 M226 127 A38 38 0 0 1 302 127 L302 187" />
          </g>

          <g className="sp-rings">
            <circle {...ring} className="sp-draw sp-ring" style={{ animationDelay: "0.35s" }} cx="403" cy="140" r="47" transform="rotate(-90 403 140)" />
            <circle {...cut} className="sp-fade" style={{ animationDelay: "1.05s" }} cx="507" cy="140" r="47" />
            <circle {...ring} className="sp-draw sp-ring" style={{ animationDelay: "0.5s" }} cx="507" cy="140" r="47" transform="rotate(-90 507 140)" />
            <circle {...cut} className="sp-fade" style={{ animationDelay: "1.15s" }} cx="611" cy="140" r="47" />
            <circle {...ring} className="sp-draw sp-ring" style={{ animationDelay: "0.65s" }} cx="611" cy="140" r="47" transform="rotate(-90 611 140)" />
            <g className="sp-fade" style={{ animationDelay: "1.25s" }}>
              <path {...cut} strokeLinecap="butt" d="M450 140 A47 47 0 0 1 439 170.2" />
              <path fill="none" stroke="url(#splash-g)" strokeWidth={26} strokeLinecap="butt" d="M450 140 A47 47 0 0 1 439 170.2" />
              <path {...cut} strokeLinecap="butt" d="M554 140 A47 47 0 0 1 543 170.2" />
              <path fill="none" stroke="url(#splash-g)" strokeWidth={26} strokeLinecap="butt" d="M554 140 A47 47 0 0 1 543 170.2" />
            </g>
            <circle className="sp-dot" style={{ animationDelay: "1.2s" }} fill="#F2603A" cx="403" cy="140" r="10" />
            <circle className="sp-dot" style={{ animationDelay: "1.3s" }} fill="#EFA21C" cx="494" cy="140" r="9" />
            <circle className="sp-dot" style={{ animationDelay: "1.36s" }} fill="#EFA21C" cx="520" cy="140" r="9" />
            <circle className="sp-dot" style={{ animationDelay: "1.44s" }} fill="#11A39A" cx="611" cy="127" r="9" />
            <circle className="sp-dot" style={{ animationDelay: "1.5s" }} fill="#11A39A" cx="599" cy="149" r="9" />
            <circle className="sp-dot" style={{ animationDelay: "1.56s" }} fill="#11A39A" cx="623" cy="149" r="9" />
            <g className="sp-labels">
              <text x="403" y="236" style={{ animationDelay: "2.25s" }}>Solo</text>
              <text x="507" y="236" style={{ animationDelay: "2.35s" }}>Couple</text>
              <text x="611" y="236" style={{ animationDelay: "2.45s" }}>Group</text>
            </g>
          </g>

          <g className="sp-right">
            <path {...letter} className="sp-draw" style={{ animationDelay: "0.8s" }} d="M712 187 L712 127 A36 36 0 0 1 784 127 L784 187 M784 127 A36 36 0 0 1 856 127 L856 187" />
            <circle {...letter} className="sp-draw" style={{ animationDelay: "0.95s" }} cx="957" cy="140" r="47" transform="rotate(-90 957 140)" />
          </g>
        </svg>
      </div>
      <SplashControl />
    </>
  );
}
