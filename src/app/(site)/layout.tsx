import { Analytics } from "@vercel/analytics/next";
import SiteChrome from "@/components/SiteChrome";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteChrome>{children}</SiteChrome>
      {/* Cookie-free visit counts; admin pages are outside this layout and are not counted. */}
      <Analytics />
    </>
  );
}
