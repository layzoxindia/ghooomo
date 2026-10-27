type P = { size?: number; className?: string; strokeWidth?: number };

const base = (size: number, strokeWidth: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  className,
});

export const ChatIcon = ({ size = 20, className, strokeWidth = 2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 21l2-5.6A8.4 8.4 0 1 1 21 11.5z" />
    <path d="M9 10.5h.01M12.5 10.5h.01M16 10.5h.01" />
  </svg>
);
export const PhoneIcon = ({ size = 20, className, strokeWidth = 2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
export const ArrowIcon = ({ size = 18, className, strokeWidth = 2.2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const CheckIcon = ({ size = 20, className, strokeWidth = 2.5 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);
export const XIcon = ({ size = 20, className, strokeWidth = 2.5 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const MenuIcon = ({ size = 24, className, strokeWidth = 2.2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const MailIcon = ({ size = 20, className, strokeWidth = 2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
export const PinIcon = ({ size = 20, className, strokeWidth = 2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
export const ClockIcon = ({ size = 20, className, strokeWidth = 2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const ShieldIcon = ({ size = 20, className, strokeWidth = 2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
export const PlusIcon = ({ size = 22, className, strokeWidth = 2.4 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
