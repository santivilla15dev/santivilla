type TrustId = "hosting" | "payment" | "coverage" | "response";

export type TrustSignalItem = {
  id: TrustId;
  label: string;
};

function TrustIcon({ id }: { id: TrustId }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className: "mt-0.5 shrink-0 text-accent",
  };

  switch (id) {
    case "hosting":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="8" rx="1.5" />
          <rect x="3" y="14" width="18" height="6" rx="1.5" />
          <path d="M7 8h.01M7 17h.01" />
        </svg>
      );
    case "payment":
      return (
        <svg {...common}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
          <path d="M6 15h4" />
        </svg>
      );
    case "coverage":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.25" />
        </svg>
      );
    case "response":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
  }
}

export function TrustSignals({ items }: { items: TrustSignalItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-2.5">
          <TrustIcon id={item.id} />
          <span className="text-xs leading-snug text-muted sm:text-sm">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
