import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy & Notice",
  description: "How Ghooomo collects, uses, stores and deletes your personal data under India’s Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="28 October 2026"
      intro={
        <p>
          This notice explains, in plain language, what personal data {site.legalName} (“we”) collects through this website, why, how long we keep it,
          and how you can control it. We follow India’s Digital Personal Data Protection Act, 2023 (DPDP Act) and the rules made under it.
        </p>
      }
    >
      <h2>1. Who we are</h2>
      <p>
        {site.legalName}, {site.address}, is the Data Fiduciary for personal data collected on this website. Contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phoneDisplay}.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li><strong>Enquiry details you type in:</strong> your name, mobile/WhatsApp number, optional email, trip type (solo, couple or group), destination, travel month, number of travellers, budget, occasion and any note you add.</li>
        <li><strong>Consent record:</strong> the date and time you gave consent and the version of this notice you agreed to.</li>
        <li><strong>Basic security data:</strong> a one-way scrambled (hashed) form of your IP address, used only to block spam and abuse. We do not store your raw IP address with your enquiry.</li>
      </ul>
      <p>We do not ask for, and you should not send us, passport, Aadhaar, card or bank details through website forms. When you book, your planner will tell you exactly which documents a supplier needs and how they will be shared.</p>

      <h2>3. Why we use it</h2>
      <ul>
        <li>To reply to your enquiry and plan and quote your trip, on WhatsApp, phone or email.</li>
        <li>If you book, to make reservations with hotels, transport and activity providers for that trip.</li>
        <li>To keep this website secure and stop spam.</li>
      </ul>
      <p>We use your data only for the purpose you gave it for. We do not sell it, rent it, or use it for unrelated marketing without asking you separately.</p>

      <h2>4. Our legal basis: your consent</h2>
      <p>
        We process enquiry data on the basis of your consent, given by ticking the box on our forms. The box is never pre-ticked. You can withdraw consent at any time, and it is as easy as giving it:
        use our <Link href="/data-request">data request form</Link>, email {site.grievanceEmail}, or reply “STOP” on WhatsApp. Withdrawing does not affect anything we did before you withdrew, but we will
        stop contacting you and delete your enquiry data unless we must keep it by law (for example, invoices for a completed booking).
      </p>

      <h2>5. How long we keep it</h2>
      <ul>
        <li><strong>Enquiries that don’t become a booking:</strong> deleted automatically {site.retentionMonths} months after your last contact with us, or earlier if you ask.</li>
        <li><strong>Bookings:</strong> booking and invoice records are kept for as long as Indian tax and accounting laws require, then deleted.</li>
        <li><strong>Security logs:</strong> hashed IP data is kept for up to 90 days.</li>
      </ul>

      <h2>6. Who we share it with</h2>
      <p>Only the people and services needed to do what you asked:</p>
      <ul>
        <li><strong>Our service providers (Data Processors)</strong> who host and secure this website and its database: currently Vercel (website hosting), Supabase (database) and Cloudflare (spam protection). They act only on our instructions and under contract.</li>
        <li><strong>WhatsApp (Meta):</strong> when you choose to message us on WhatsApp, your message is handled under WhatsApp’s own terms and privacy policy.</li>
        <li><strong>Travel suppliers:</strong> only if you book, the hotels, transport, airlines and activity operators for your trip receive the details they need to serve you.</li>
        <li><strong>Authorities:</strong> if required by law or a valid legal order.</li>
      </ul>
      <p>Some providers may store data outside India in countries not restricted by the Government of India, with appropriate safeguards.</p>

      <h2>7. Your rights</h2>
      <ul>
        <li><strong>Access:</strong> ask what personal data we hold about you and how we use it.</li>
        <li><strong>Correction and completion:</strong> ask us to fix anything wrong or incomplete.</li>
        <li><strong>Erasure:</strong> ask us to delete your data when it is no longer needed for the purpose you gave it.</li>
        <li><strong>Withdraw consent</strong> at any time.</li>
        <li><strong>Grievance redressal:</strong> raise a complaint with us and get a response.</li>
        <li><strong>Nominate</strong> someone to exercise these rights for you in case of death or incapacity.</li>
      </ul>
      <p>
        Use the <Link href="/data-request">data request form</Link> or email {site.grievanceEmail}. We will verify it is really you (usually by a WhatsApp or call to the number on record)
        and respond within the time required by law. If you are not satisfied with our response, you may complain to the Data Protection Board of India.
      </p>

      <h2>8. Grievance Officer</h2>
      <p>
        Grievance Officer, {site.legalName}<br />
        Email: <a href={`mailto:${site.grievanceEmail}`}>{site.grievanceEmail}</a><br />
        Phone: {site.phoneDisplay} ({site.hours})<br />
        Address: {site.address}
      </p>

      <h2>9. Children</h2>
      <p>Our website is meant for adults. If you are under 18, please ask a parent or guardian to enquire for you. We do not knowingly collect children’s data without verifiable parental consent; if we learn we have, we delete it.</p>

      <h2>10. Cookies and tracking</h2>
      <p>
        This website uses no advertising or analytics cookies. Our spam-protection service may set a strictly necessary cookie to tell people from bots. If we ever add analytics,
        we will ask for your permission first and update this notice.
      </p>

      <h2>11. How we protect your data</h2>
      <p>
        Encrypted connections (HTTPS) everywhere, a database locked so only our server can read it, access limited to the staff who plan your trip, and spam and abuse protection on every form.
        If a personal data breach ever happens, we will inform affected people and the Data Protection Board as the law requires.
      </p>

      <h2>12. Language and changes</h2>
      <p>
        You can ask for this notice in Hindi or any language listed in the Eighth Schedule of the Constitution by writing to {site.email}. If we change this notice, we will update the date at the top,
        and if the change affects how we use data you already gave us, we will ask you again.
      </p>
    </LegalPage>
  );
}
