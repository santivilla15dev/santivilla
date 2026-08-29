import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth/require-role";
import { getCrmMessages } from "@/lib/crm/messages";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();
  if (!user) redirect("/login?next=/portal");

  const m = getCrmMessages(user.role === "admin" ? "de" : "de");

  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="border-b border-line bg-surface px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/portal" className="font-display text-xl">
            {m.portal}
          </Link>
          <form action="/api/auth/logout" method="post">
            <button type="submit" className="text-sm text-accent hover:underline">
              {m.logout}
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
    </div>
  );
}
