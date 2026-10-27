import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Cancellation charges and refund timelines for holidays booked with Ghooomo India Pvt Ltd.",
  alternates: { canonical: "/cancellation-policy" },
};

const rows = [
  { when: "30 days or more before departure", charge: "10% of the total package cost" },
  { when: "15 – 29 days before departure", charge: "25% of the total package cost" },
  { when: "7 – 14 days before departure", charge: "50% of the total package cost" },
  { when: "Less than 7 days, or no-show", charge: "100% of the total package cost" },
];

export default function CancellationPage() {
  return (
    <LegalPage title="Cancellation & refunds" updated="28 October 2026" intro={<p>Plans change — here is exactly what happens if you need to cancel. Your written quote may list stricter terms for specific services (for example flights or peak-season hotels); where it does, those terms apply to that service.</p>}>
      <h2>How to cancel</h2>
      <p>Send a cancellation request in writing to {site.email} or on WhatsApp to {site.phoneDisplay}. The date we receive it is the cancellation date.</p>

      <h2>Cancellation charges</h2>
      <div className="not-prose mb-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[480px] text-left text-[16px]">
          <thead className="bg-paper-2 text-ink">
            <tr><th className="p-4 font-semibold">When you cancel</th><th className="p-4 font-semibold">Cancellation charge</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.when} className="border-t border-line text-muted">
                <td className="p-4">{r.when}</td>
                <td className="p-4 font-semibold text-text">{r.charge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul>
        <li>Flights, train tickets, visas, permits and some peak-season or special-offer hotels are non-refundable once issued or confirmed. Your quote will mark these.</li>
        <li>For international trips, any charges the supplier applies over and above the table above are passed on at actual cost.</li>
        <li>Unused services during the trip (a skipped activity, a missed night) are not refundable.</li>
      </ul>

      <h2>Changing dates instead</h2>
      <p>You can ask to move your trip to new dates once, free of our service fee, if you tell us at least 15 days before departure. Any price difference or supplier change fee applies.</p>

      <h2>If we cancel</h2>
      <p>If we have to cancel a trip for reasons within our control, you get a full refund of everything you paid us, or a new date of your choice. If a trip is cancelled because of weather, natural disasters, government orders or other events outside our control, we refund whatever suppliers refund to us and help you rebook.</p>

      <h2>Refund timeline</h2>
      <p>Approved refunds are paid to the original payment method within 7–10 working days of the supplier refunding us. Bank processing time may add a few days.</p>
    </LegalPage>
  );
}
