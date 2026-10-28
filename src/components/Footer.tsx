import Link from "next/link";
import { Wordmark } from "./Logo";
import { site } from "@/lib/site";
import { destinations } from "@/data/destinations";
import { guides } from "@/data/guides";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

const col = "flex flex-col gap-3";
const head = "eyebrow text-sun";
const link = "text-[15px] font-medium text-[#DCE4F2] hover:text-white";

export default function Footer() {
  return (
    <footer className="relative bg-night pb-28 pt-16 text-white sm:pb-12">
      <div className="ring-gradient absolute inset-x-0 top-0 h-1" aria-hidden="true" />
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-sm flex-col gap-5">
            <Link href="/" aria-label="Ghooomo home">
              <Wordmark tone="light" bg="#071530" width={210} id="ftr" />
            </Link>
            <p className="text-[15px] text-[#DCE4F2]">Tailor-made holidays around the world and across India.</p>
          </div>
          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div className={col}>
              <span className={head}>Holidays</span>
              <Link className={link} href="/packages">Trending holidays</Link>
              <Link className={link} href="/solo">Travelling solo</Link>
              <Link className={link} href="/couple">Holidays for two</Link>
              <Link className={link} href="/group">Family & groups</Link>
              {guides.map((g) => (
                <Link key={g.slug} className={link} href={`/holidays/${g.slug}`}>{g.nav}</Link>
              ))}
            </div>
            <div className={col}>
              <span className={head}>Abroad</span>
              {destinations.filter((d) => d.region === "International").map((d) => (
                <Link key={d.slug} className={link} href={`/destinations/${d.slug}`}>{d.name}</Link>
              ))}
            </div>
            <div className={col}>
              <span className={head}>In India</span>
              {destinations.filter((d) => d.region === "India").map((d) => (
                <Link key={d.slug} className={link} href={`/destinations/${d.slug}`}>{d.name}</Link>
              ))}
              <Link className={`${link} font-bold`} href="/destinations">All destinations</Link>
            </div>
            <div className={col}>
              <span className={head}>Company</span>
              <Link className={link} href="/about">About us</Link>
              <Link className={link} href="/contact">Contact</Link>
              <Link className={link} href="/terms">Terms of service</Link>
              <Link className={link} href="/cancellation-policy">Cancellation & refunds</Link>
            </div>
            <div className={col}>
              <span className={head}>Your data</span>
              <Link className={link} href="/privacy">Privacy policy</Link>
              <Link className={link} href="/data-request">Access or delete my data</Link>
            </div>
            <div className={col}>
              <span className={head}>Reach us</span>
              <a className={`${link} flex items-center gap-2`} href={`tel:${site.phoneE164}`}><PhoneIcon size={16} />{site.phoneDisplay}</a>
              <a className={`${link} flex items-center gap-2`} href={`mailto:${site.email}`}><MailIcon size={16} />{site.email}</a>
              <a className={`${link} flex items-center gap-2`} href={site.mapsUrl} target="_blank" rel="noopener noreferrer"><PinIcon size={16} />{site.address}</a>
              {site.instagram && <a className={link} href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
              {site.googleReviewsUrl && <a className={link} href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">Google reviews</a>}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/15 pt-6 text-sm font-medium text-[#C4D0E4]">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.{site.gstin ? ` GSTIN ${site.gstin}` : ""}</span>
          <span>Holidays worldwide · Solo · Couple · Group</span>
        </div>
      </div>
    </footer>
  );
}
