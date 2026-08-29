import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-role";
import { getCrmMessages } from "@/lib/crm/messages";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  if (!user) redirect("/login?next=/admin");

  const m = getCrmMessages("de");

  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="border-b border-line bg-surface px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-xl">
              Admin · {m.leads}
            </Link>
            <Link href="/admin/sites" className="text-sm text-muted hover:text-ink">
              {m.sites}
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted">{user.email}</span>
            <form action="/api/auth/logout" method="post">
              <button type="submit" className="text-accent hover:underline">
                {m.logout}
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
