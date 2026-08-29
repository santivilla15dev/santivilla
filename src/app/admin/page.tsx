import Link from "next/link";
import { listLeads } from "@/lib/crm/store";
import { getCrmMessages } from "@/lib/crm/messages";

type Props = {
  searchParams: Promise<{ status?: string; source?: string; q?: string }>;
};

export default async function AdminPage({ searchParams }: Props) {
  const sp = await searchParams;
  const m = getCrmMessages("de");

  const leads = await listLeads({
    status: sp.status as "new" | "contacted" | "proposal" | "won" | "lost" | undefined,
    source: sp.source,
    q: sp.q,
  });

  return (
    <div>
      <h1 className="font-display text-3xl">{m.leads}</h1>

      <form className="mt-6 flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={sp.q}
          placeholder={m.search}
          className="rounded-lg border border-line px-3 py-2 text-sm"
        />
        <select name="status" defaultValue={sp.status ?? ""} className="rounded-lg border border-line px-3 py-2 text-sm">
          <option value="">{m.all}</option>
          <option value="new">{m.new}</option>
          <option value="contacted">{m.contacted}</option>
          <option value="proposal">{m.proposal}</option>
          <option value="won">{m.won}</option>
          <option value="lost">{m.lost}</option>
        </select>
        <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-surface">
          Filter
        </button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-surface/50">
            <tr>
              <th className="px-4 py-3">{m.status}</th>
              <th className="px-4 py-3">{m.source}</th>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">Hostname</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-line/60 hover:bg-surface/30">
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="text-accent hover:underline">
                    {lead.status}
                  </Link>
                </td>
                <td className="px-4 py-3">{lead.source}</td>
                <td className="px-4 py-3">{lead.businessName ?? "—"}</td>
                <td className="px-4 py-3">{lead.hostname ?? "—"}</td>
                <td className="px-4 py-3 text-muted">
                  {new Date(lead.createdAt).toLocaleDateString("de-AT")}
                </td>
              </tr>
            ))}
            {!leads.length ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No leads yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
