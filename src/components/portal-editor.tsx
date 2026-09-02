"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { DailyMenuEntry, HoursOverride, MenuItem } from "@/lib/crm/types";

type Props = {
  siteId: string;
  initialDailyMenu: DailyMenuEntry[];
  initialHoursOverrides: HoursOverride[];
  initialAnnouncements: string;
  labels: {
    dailyMenu: string;
    hoursOverride: string;
    announcements: string;
    save: string;
    addItem: string;
    date: string;
    closed: string;
  };
};

export function PortalEditor({
  siteId,
  initialDailyMenu,
  initialHoursOverrides,
  initialAnnouncements,
  labels,
}: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const [menuDate, setMenuDate] = useState(today);
  const [items, setItems] = useState<MenuItem[]>(
    initialDailyMenu.find((m) => m.date === today)?.items ?? [{ name: "", price: "" }],
  );
  const [hoursOverrides, setHoursOverrides] = useState(initialHoursOverrides);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [pending, setPending] = useState(false);

  function addItem() {
    setItems((prev) => [...prev, { name: "", price: "" }]);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);

    const dailyMenu = [...initialDailyMenu.filter((m) => m.date !== menuDate), { date: menuDate, items }];
    try {
      const res = await fetch(`/api/portal/sites/${siteId}/content`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dailyMenu, hoursOverrides, announcements }),
      });
      if (!res.ok) throw new Error("fail");
      toast.success("OK");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSave} className="space-y-8">
      <section className="rounded-xl border border-line p-6">
        <h2 className="font-display text-xl">{labels.dailyMenu}</h2>
        <div className="mt-4">
          <Label htmlFor="portal-menu-date" className="text-sm text-muted">
            {labels.date}
          </Label>
          <Input
            id="portal-menu-date"
            type="date"
            value={menuDate}
            onChange={(e) => setMenuDate(e.target.value)}
            className="mt-1 h-auto w-auto rounded-lg border-line px-3 py-2"
          />
        </div>
        <div className="mt-4 space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={item.name}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], name: e.target.value };
                  setItems(next);
                }}
                placeholder="Plato"
                aria-label={`${labels.dailyMenu} ${i + 1}`}
                className="h-auto flex-1 rounded-lg border-line px-3 py-2 text-sm"
              />
              <Input
                value={item.price ?? ""}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], price: e.target.value };
                  setItems(next);
                }}
                placeholder="€"
                aria-label={`Precio ${i + 1}`}
                className="h-auto w-24 rounded-lg border-line px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="link"
          onClick={addItem}
          className="mt-3 h-auto p-0 text-sm text-accent"
        >
          + {labels.addItem}
        </Button>
      </section>

      <section className="rounded-xl border border-line p-6">
        <h2 className="font-display text-xl">{labels.hoursOverride}</h2>
        {hoursOverrides.map((o, i) => (
          <div key={i} className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <Input
              type="date"
              value={o.date}
              aria-label={`${labels.date} ${i + 1}`}
              onChange={(e) => {
                const next = [...hoursOverrides];
                next[i] = { ...next[i], date: e.target.value };
                setHoursOverrides(next);
              }}
              className="h-auto w-auto rounded-lg border-line px-2 py-1"
            />
            <div className="flex items-center gap-1.5">
              <Checkbox
                id={`closed-${i}`}
                checked={Boolean(o.closed)}
                onCheckedChange={(checked) => {
                  const next = [...hoursOverrides];
                  next[i] = { ...next[i], closed: checked === true };
                  setHoursOverrides(next);
                }}
              />
              <Label htmlFor={`closed-${i}`} className="text-sm font-normal">
                {labels.closed}
              </Label>
            </div>
            <Input
              value={o.open ?? ""}
              placeholder="09:00"
              aria-label={`Abre ${i + 1}`}
              onChange={(e) => {
                const next = [...hoursOverrides];
                next[i] = { ...next[i], open: e.target.value };
                setHoursOverrides(next);
              }}
              className="h-auto w-20 rounded-lg border-line px-2 py-1"
            />
            <Input
              value={o.close ?? ""}
              placeholder="22:00"
              aria-label={`Cierra ${i + 1}`}
              onChange={(e) => {
                const next = [...hoursOverrides];
                next[i] = { ...next[i], close: e.target.value };
                setHoursOverrides(next);
              }}
              className="h-auto w-20 rounded-lg border-line px-2 py-1"
            />
          </div>
        ))}
        <Button
          type="button"
          variant="link"
          onClick={() => setHoursOverrides((p) => [...p, { date: today, closed: false }])}
          className="mt-3 h-auto p-0 text-sm text-accent"
        >
          + Override
        </Button>
      </section>

      <section className="rounded-xl border border-line p-6">
        <h2 className="font-display text-xl">{labels.announcements}</h2>
        <Textarea
          value={announcements}
          onChange={(e) => setAnnouncements(e.target.value)}
          rows={3}
          aria-label={labels.announcements}
          className="mt-3 rounded-lg border-line px-3 py-2 text-sm"
        />
      </section>

      <Button
        type="submit"
        disabled={pending}
        className="h-auto rounded-full bg-ink px-6 py-3 text-sm text-surface hover:bg-accent"
      >
        {pending ? "…" : labels.save}
      </Button>
    </form>
  );
}
