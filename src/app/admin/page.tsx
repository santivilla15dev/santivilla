import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl">{m.leads}</h1>
        <a
          href="/api/admin/leads/export"
          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {m.exportCsv}
        </a>
      </div>

      <form className="mt-6 flex flex-wrap gap-3">
        <Input
          name="q"
          defaultValue={sp.q}
          placeholder={m.search}
          className="h-auto w-auto rounded-lg border-line px-3 py-2 text-sm"
        />
        <select
          name="status"
          defaultValue={sp.status ?? ""}
          className="rounded-lg border border-line bg-surface px-3 py-2 text-sm"
        >
          <option value="">{m.all}</option>
          <option value="new">{m.new}</option>
          <option value="contacted">{m.contacted}</option>
          <option value="proposal">{m.proposal}</option>
          <option value="won">{m.won}</option>
          <option value="lost">{m.lost}</option>
        </select>
        <Button
          type="submit"
          className="h-auto rounded-full bg-ink px-4 py-2 text-sm text-surface hover:bg-accent"
        >
          Filter
        </Button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-xl border border-line">
        <Table className="text-left text-sm">
          <TableHeader>
            <TableRow className="border-line bg-surface/50 hover:bg-surface/50">
              <TableHead className="px-4 py-3">{m.status}</TableHead>
              <TableHead className="px-4 py-3">{m.source}</TableHead>
              <TableHead className="px-4 py-3">Business</TableHead>
              <TableHead className="px-4 py-3">Hostname</TableHead>
              <TableHead className="px-4 py-3">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="border-line/60 hover:bg-surface/30">
                <TableCell className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`}>
                    <Badge
                      variant="outline"
                      className="border-accent/40 text-accent hover:bg-accent-soft"
                    >
                      {lead.status}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-3">{lead.source}</TableCell>
                <TableCell className="px-4 py-3">{lead.businessName ?? "—"}</TableCell>
                <TableCell className="px-4 py-3">{lead.hostname ?? "—"}</TableCell>
                <TableCell className="px-4 py-3 text-muted">
                  {new Date(lead.createdAt).toLocaleDateString("de-AT")}
                </TableCell>
              </TableRow>
            ))}
            {!leads.length ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="px-4 py-8 text-center text-muted">
                  No leads yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
