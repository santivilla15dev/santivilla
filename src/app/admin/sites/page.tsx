import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminSiteStatus } from "@/components/admin-site-status";
import { listSites } from "@/lib/crm/store";
import { getCrmMessages } from "@/lib/crm/messages";

export default async function AdminSitesPage() {
  const m = getCrmMessages("de");
  const sites = await listSites();

  return (
    <div>
      <h1 className="font-display text-3xl">{m.sites}</h1>
      <div className="mt-8 overflow-x-auto rounded-xl border border-line">
        <Table className="text-left text-sm">
          <TableHeader>
            <TableRow className="border-line bg-surface/50 hover:bg-surface/50">
              <TableHead className="px-4 py-3">Slug</TableHead>
              <TableHead className="px-4 py-3">Business</TableHead>
              <TableHead className="px-4 py-3">Status</TableHead>
              <TableHead className="px-4 py-3">Preview</TableHead>
              <TableHead className="px-4 py-3" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.id} className="border-line/60 hover:bg-surface/30">
                <TableCell className="px-4 py-3">{site.slug}</TableCell>
                <TableCell className="px-4 py-3">{site.businessName}</TableCell>
                <TableCell className="px-4 py-3">
                  <Badge variant="outline" className="border-line text-muted">
                    {site.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Link href={`/k/${site.slug}`} className="text-accent hover:underline">
                    /k/{site.slug}
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <AdminSiteStatus
                    id={site.id}
                    status={site.status}
                    pauseLabel={m.pause}
                    activateLabel={m.activate}
                  />
                </TableCell>
              </TableRow>
            ))}
            {!sites.length ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="px-4 py-8 text-center text-muted">
                  No sites yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
