import Link from "next/link";
import RingChooser from "@/components/RingChooser";
import SiteChrome from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="wrap flex min-h-[80vh] flex-col items-center justify-center gap-6 pb-20 pt-32 text-center">
        <h1 className="text-[clamp(40px,6vw,80px)] font-extrabold leading-none text-ink">This page doesn’t exist.</h1>
        <p className="max-w-[480px] text-[18px] text-muted">Pick a trip type below, or go back to the home page.</p>
        <div className="mt-4"><RingChooser /></div>
        <Link href="/" className="btn mt-4 bg-ink text-white">Back to home</Link>
      </section>
    </SiteChrome>
  );
}
