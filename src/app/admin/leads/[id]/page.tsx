import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadDetailForm } from "@/components/admin-lead-form";
import { ConvertSiteForm } from "@/components/convert-site-form";
import { getLead } from "@/lib/crm/store";
import { getCrmMessages } from "@/lib/crm/messages";

type Props = { params: Promise<{ id: string }> };

export default async function AdminLeadPage({ params }: Props) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();

  const m = getCrmMessages("de");

  return (
    <div>
      <Link href="/admin" className="text-sm text-muted hover:text-ink">
        ← {m.back}
      </Link>
      <h1 className="font-display mt-4 text-3xl">{lead.businessName ?? lead.hostname ?? lead.id}</h1>
      <p className="mt-2 text-sm text-muted">
        {lead.source} · {lead.status} · {new Date(lead.createdAt).toLocaleString("de-AT")}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-sm">
          {lead.email ? <p>Email: {lead.email}</p> : null}
          {lead.phone ? <p>Phone: {lead.phone}</p> : null}
          {lead.url ? (
            <p>
              URL:{" "}
              <a href={lead.url} target="_blank" rel="noreferrer" className="text-accent">
                {lead.url}
              </a>
            </p>
          ) : null}
          {lead.source === "brief" && lead.url ? (
            <p>
              <Link href={lead.url} className="text-accent">
                Brief preview
              </Link>
            </p>
          ) : null}
          {lead.auditReportId ? (
            <p>
              <Link href={`/de/auditoria/report/${lead.auditReportId}`} className="text-accent">
                {m.audit}
              </Link>
            </p>
          ) : null}
          {lead.conceptId ? (
            <p>
              <Link href={`/de/concepto/${lead.conceptId}`} className="text-accent">
                {m.concept}
              </Link>
            </p>
          ) : null}
        </div>

        <LeadDetailForm
          leadId={lead.id}
          initialStatus={lead.status}
          initialNotes={lead.notes ?? ""}
          labels={{ status: m.status, notes: m.notes, save: m.save }}
        />
      </div>

      {lead.conceptId ? (
        <ConvertSiteForm
          conceptId={lead.conceptId}
          defaultSlug={(lead.hostname ?? lead.businessName ?? "site")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")}
          defaultName={lead.businessName ?? lead.hostname ?? "Site"}
          labels={{
            convertSite: m.convertSite,
            ownerEmail: m.ownerEmail,
            slug: m.slug,
            whatsapp: m.whatsapp,
            save: m.save,
          }}
        />
      ) : null}
    </div>
  );
}
