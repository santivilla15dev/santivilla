"use client";

import { useState } from "react";
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
  const [saved, setSaved] = useState(false);

  function addItem() {
    setItems((prev) => [...prev, { name: "", price: "" }]);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setSaved(false);

    const dailyMenu = [...initialDailyMenu.filter((m) => m.date !== menuDate), { date: menuDate, items }];
    try {
      const res = await fetch(`/api/portal/sites/${siteId}/content`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dailyMenu, hoursOverrides, announcements }),
      });
      if (!res.ok) throw new Error("fail");
      setSaved(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSave} className="space-y-8">
      <section className="rounded-xl border border-line p-6">
        <h2 className="font-display text-xl">{labels.dailyMenu}</h2>
        <label className="mt-4 block text-sm">
          <span className="text-muted">{labels.date}</span>
          <input
            type="date"
            value={menuDate}
            onChange={(e) => setMenuDate(e.target.value)}
            className="mt-1 rounded-lg border border-line px-3 py-2"
          />
        </label>
        <div className="mt-4 space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item.name}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], name: e.target.value };
                  setItems(next);
                }}
                placeholder="Plato"
                className="flex-1 rounded-lg border border-line px-3 py-2 text-sm"
              />
              <input
                value={item.price ?? ""}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], price: e.target.value };
                  setItems(next);
                }}
                placeholder="€"
                className="w-24 rounded-lg border border-line px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={addItem} className="mt-3 text-sm text-accent">
          + {labels.addItem}
        </button>
      </section>

      <section className="rounded-xl border border-line p-6">
        <h2 className="font-display text-xl">{labels.hoursOverride}</h2>
        {hoursOverrides.map((o, i) => (
          <div key={i} className="mt-3 flex flex-wrap gap-2 text-sm">
            <input
              type="date"
              value={o.date}
              onChange={(e) => {
                const next = [...hoursOverrides];
                next[i] = { ...next[i], date: e.target.value };
                setHoursOverrides(next);
              }}
              className="rounded-lg border border-line px-2 py-1"
            />
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={Boolean(o.closed)}
                onChange={(e) => {
                  const next = [...hoursOverrides];
                  next[i] = { ...next[i], closed: e.target.checked };
                  setHoursOverrides(next);
                }}
              />
              {labels.closed}
            </label>
            <input
              value={o.open ?? ""}
              placeholder="09:00"
              onChange={(e) => {
                const next = [...hoursOverrides];
                next[i] = { ...next[i], open: e.target.value };
                setHoursOverrides(next);
              }}
              className="w-20 rounded-lg border border-line px-2 py-1"
            />
            <input
              value={o.close ?? ""}
              placeholder="22:00"
              onChange={(e) => {
                const next = [...hoursOverrides];
                next[i] = { ...next[i], close: e.target.value };
                setHoursOverrides(next);
              }}
              className="w-20 rounded-lg border border-line px-2 py-1"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setHoursOverrides((p) => [...p, { date: today, closed: false }])}
          className="mt-3 text-sm text-accent"
        >
          + Override
        </button>
      </section>

      <section className="rounded-xl border border-line p-6">
        <h2 className="font-display text-xl">{labels.announcements}</h2>
        <textarea
          value={announcements}
          onChange={(e) => setAnnouncements(e.target.value)}
          rows={3}
          className="mt-3 w-full rounded-lg border border-line px-3 py-2 text-sm"
        />
      </section>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-6 py-3 text-sm text-surface disabled:opacity-60"
      >
        {pending ? "…" : labels.save}
      </button>
      {saved ? <p className="text-sm text-accent">OK</p> : null}
    </form>
  );
}
