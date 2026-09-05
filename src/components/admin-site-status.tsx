"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { SiteStatus } from "@/lib/crm/types";

export function AdminSiteStatus({
  id,
  status,
  pauseLabel,
  activateLabel,
}: {
  id: string;
  status: SiteStatus;
  pauseLabel: string;
  activateLabel: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const next = status === "paused" ? "active" : "paused";

  async function toggle() {
    setPending(true);
    try {
      await fetch("/api/admin/sites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={pending}
      onClick={() => void toggle()}
      className="h-auto rounded-full px-3 py-1 text-xs"
    >
      {status === "paused" ? activateLabel : pauseLabel}
    </Button>
  );
}
