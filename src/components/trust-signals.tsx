import {
  Clock,
  CreditCard,
  MapPin,
  Server,
  type LucideIcon,
} from "lucide-react";

type TrustId = "hosting" | "payment" | "coverage" | "response";

export type TrustSignalItem = {
  id: TrustId;
  label: string;
};

const ICONS: Record<TrustId, LucideIcon> = {
  hosting: Server,
  payment: CreditCard,
  coverage: MapPin,
  response: Clock,
};

export function TrustSignals({ items }: { items: TrustSignalItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
      {items.map((item) => {
        const Icon = ICONS[item.id];
        return (
          <li key={item.id} className="flex items-start gap-2.5">
            <Icon
              aria-hidden
              strokeWidth={1.75}
              className="mt-0.5 size-[18px] shrink-0 text-accent"
            />
            <span className="text-xs leading-snug text-muted sm:text-sm">
              {item.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
