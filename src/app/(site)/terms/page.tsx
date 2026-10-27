import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the Ghooomo website and booking holidays with Ghooomo India Pvt Ltd.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="28 October 2026" intro={<p>These terms apply when you use this website or book a holiday with {site.legalName}. Please read them with our <Link href="/cancellation-policy" className="font-semibold text-ink underline">cancellation & refund policy</Link> and <Link href="/privacy" className="font-semibold text-ink underline">privacy policy</Link>.</p>}>
      <h2>1. About these packages</h2>
      <p>Packages on this website are sample itineraries with starting prices. A price shown is “from” a per-person rate on the sharing basis stated, for the cheapest available dates and room category. The final price depends on your dates, hotel availability, group size and season, and is confirmed in writing by your planner before you pay.</p>

      <h2>2. Enquiries are not bookings</h2>
      <p>Sending an enquiry or a WhatsApp message does not reserve anything. A booking is confirmed only when you accept a written quote and we receive the advance amount stated in it, after which we send you a booking confirmation.</p>

      <h2>3. Payments</h2>
      <ul>
        <li>Pay only to {site.legalName}’s company bank account or an official payment link sent by us. We never ask you to pay into a personal account.</li>
        <li>The advance and balance due dates are stated in your quote. If the balance is not paid on time, we may treat the booking as cancelled under our cancellation policy.</li>
        <li>Prices include taxes as stated in your quote. Any change in government taxes or fuel surcharges before travel may be passed on at actual cost.</li>
      </ul>

      <h2>4. Your documents and responsibilities</h2>
      <ul>
        <li>You are responsible for valid ID, passports, visas, permits and vaccinations required for your trip. We will guide you, but approval is decided by the authorities.</li>
        <li>Please tell us about any medical condition, mobility need or dietary requirement before booking so we can plan for it.</li>
        <li>High-altitude trips (such as Spiti and Ladakh) carry health risks. Follow your trip captain’s acclimatisation advice and consult a doctor if you have health concerns.</li>
      </ul>

      <h2>5. Changes by us or by suppliers</h2>
      <p>Weather, road closures, strikes, government orders or supplier issues can force changes. We will offer the closest possible alternative of similar standard. Extra costs caused by events outside our control (for example landslides, flight cancellations or natural disasters) are payable by the traveller, and we will help you claim from airlines or insurers where possible.</p>

      <h2>6. Our role</h2>
      <p>We plan your trip and book services from independent suppliers (hotels, airlines, transport and activity operators). Each supplier is responsible for its own services under its own terms. We choose suppliers with care and will help you resolve any problem on the spot.</p>

      <h2>7. Travel insurance</h2>
      <p>We strongly recommend travel insurance covering medical emergencies, cancellation and baggage. It is not included unless your quote says so.</p>

      <h2>8. Website use</h2>
      <p>Do not misuse this website, try to break its security, or submit false or someone else’s details. Photos on this website show the destination and are for illustration; your actual hotel and room may differ.</p>

      <h2>9. Complaints and governing law</h2>
      <p>If something goes wrong, tell your planner straight away so we can fix it during the trip. You can also write to {site.email}. These terms are governed by the laws of India, and courts at Gautam Buddh Nagar (Noida), Uttar Pradesh have jurisdiction.</p>
    </LegalPage>
  );
}
