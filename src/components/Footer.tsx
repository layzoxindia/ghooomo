import Link from "next/link";
import { Wordmark } from "./Logo";
import { site } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

const col = "flex flex-col gap-3";
const head = "eyebrow text-sun";
const link = "text-[15px] font-medium text-[#DCE4F2] hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-16 text-white sm:pb-12">
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-sm flex-col gap-5">
            <Link href="/" aria-label="Ghooomo home">
              <Wordmark tone="light" bg="#0F2B5B" width={210} id="ftr" />
            </Link>
            <p className="text-[15px] text-[#DCE4F2]">Solo trips, couple holidays and group tours, planned from our office in Noida.</p>
          </div>
          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div className={col}>
              <span className={head}>Trips</span>
              <Link className={link} href="/solo">Solo trips</Link>
              <Link className={link} href="/couple">Couple holidays</Link>
              <Link className={link} href="/group">Group tours</Link>
              <Link className={link} href="/packages">All trips</Link>
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
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/15 pt-6 text-sm font-medium text-[#C4D0E4]">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span>Prices are per person unless stated and subject to availability.</span>
        </div>
      </div>
    </footer>
  );
}
