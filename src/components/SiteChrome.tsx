import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";
import SmoothScroll from "./SmoothScroll";
import RevealObserver from "./RevealObserver";
import Splash from "./Splash";

export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Splash />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white">
        Skip to content
      </a>
      <SmoothScroll />
      <RevealObserver />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
