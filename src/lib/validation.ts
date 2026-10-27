import { z } from "zod";

const clean = (s: string) => s.replace(/[\u0000-\u001F\u007F<>]/g, "").trim();

const text = (max: number) => z.string().max(max).transform(clean);

export const indianMobile = z
  .string()
  .transform((s) => s.replace(/[\s\-()]/g, ""))
  .refine((s) => /^(\+91|91|0)?[6-9]\d{9}$/.test(s), "Enter a valid 10-digit Indian mobile number")
  .transform((s) => "+91" + s.slice(-10));

export const enquirySchema = z.object({
  name: text(80).pipe(z.string().min(2, "Please enter your name")),
  phone: indianMobile,
  email: z.union([z.literal(""), z.string().max(120).email("Enter a valid email")]).optional().default(""),
  segment: z.enum(["solo", "couple", "group"]),
  destination: text(120).optional().default(""),
  packageSlug: z.string().max(80).regex(/^[a-z0-9-]*$/).optional().default(""),
  travelMonth: text(40).optional().default(""),
  travellers: text(20).optional().default(""),
  budget: text(40).optional().default(""),
  occasion: text(40).optional().default(""),
  groupType: text(40).optional().default(""),
  message: text(600).optional().default(""),
  consent: z.literal(true, { message: "Please agree so we can contact you about this enquiry" }),
  noticeVersion: z.string().max(20),
  turnstileToken: z.string().max(2048).optional().default(""),
  // honeypot: real people never fill this
  website: z.string().max(0).optional().default(""),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export const dataRequestSchema = z.object({
  name: text(80).pipe(z.string().min(2, "Please enter your name")),
  phone: indianMobile,
  email: z.union([z.literal(""), z.string().max(120).email("Enter a valid email")]).optional().default(""),
  requestType: z.enum(["access", "correction", "deletion", "withdraw-consent", "grievance"]),
  details: text(1000).optional().default(""),
  turnstileToken: z.string().max(2048).optional().default(""),
  website: z.string().max(0).optional().default(""),
});

export type DataRequest = z.infer<typeof dataRequestSchema>;
