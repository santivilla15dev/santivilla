import Link from "next/link";
import { redirect } from "next/navigation";
import { PortalEditor } from "@/components/portal-editor";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthUser } from "@/lib/auth/require-role";
import { countCtaEvents, getSiteByOwner, getSiteContent } from "@/lib/crm/store";
import { getCrmMessages } from "@/lib/crm/messages";

export default async function PortalPage() {
  const user = await getAuthUser();
  if (!user) redirect("/login?next=/portal");

  const site = await getSiteByOwner(user.id);
  const m = getCrmMessages("de");

  if (!site) {
    return (
      <div>
        <h1 className="font-display text-3xl">{m.portal}</h1>
        <p className="mt-4 text-muted">{m.noSite}</p>
      </div>
    );
  }

  const content = await getSiteContent(site.id);
  const clicks7 = await countCtaEvents(site.id, 7);
  const clicks30 = await countCtaEvents(site.id, 30);

  return (
    <div>
      <h1 className="font-display text-3xl">{site.businessName}</h1>
      <p className="mt-2 text-sm text-muted">{site.slug}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="gap-0 rounded-xl border-line shadow-none [--card-spacing:--spacing(4)]">
          <CardContent>
            <p className="text-xs uppercase tracking-wider text-muted">{m.whatsappClicks}</p>
            <p className="font-display mt-2 text-3xl">{clicks7}</p>
            <p className="text-sm text-muted">{m.last7}</p>
          </CardContent>
        </Card>
        <Card className="gap-0 rounded-xl border-line shadow-none [--card-spacing:--spacing(4)]">
          <CardContent>
            <p className="text-xs uppercase tracking-wider text-muted">{m.whatsappClicks}</p>
            <p className="font-display mt-2 text-3xl">{clicks30}</p>
            <p className="text-sm text-muted">{m.last30}</p>
          </CardContent>
        </Card>
      </div>

      <p className="mt-6">
        <Link href={`/k/${site.slug}`} className="text-accent hover:underline" target="_blank">
          {m.preview} → /k/{site.slug}
        </Link>
      </p>

      <div className="mt-10">
        <PortalEditor
          siteId={site.id}
          initialDailyMenu={content?.dailyMenu ?? []}
          initialHoursRegular={
            Array.isArray(content?.hoursRegular)
              ? (content.hoursRegular as string[]).join("\n")
              : ""
          }
          initialHoursOverrides={content?.hoursOverrides ?? []}
          initialAnnouncements={content?.announcements ?? ""}
          labels={{
            dailyMenu: m.dailyMenu,
            hoursRegular: m.hoursRegular,
            hoursOverride: m.hoursOverride,
            announcements: m.announcements,
            save: m.save,
            addItem: m.addItem,
            date: m.date,
            closed: m.closed,
          }}
        />
      </div>
    </div>
  );
}
