import { listSites } from "@/lib/crm/store";
import { getCrmMessages } from "@/lib/crm/messages";
import Link from "next/link";

export default async function AdminSitesPage() {
  const m = getCrmMessages("de");
  const sites = await listSites();

  return (
    <div>
      <h1 className="font-display text-3xl">{m.sites}</h1>
      <div className="mt-8 overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-surface/50">
            <tr>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Preview</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id} className="border-b border-line/60">
                <td className="px-4 py-3">{site.slug}</td>
                <td className="px-4 py-3">{site.businessName}</td>
                <td className="px-4 py-3">{site.status}</td>
                <td className="px-4 py-3">
                  <Link href={`/k/${site.slug}`} className="text-accent">
                    /k/{site.slug}
                  </Link>
                </td>
              </tr>
            ))}
            {!sites.length ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  No sites yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
