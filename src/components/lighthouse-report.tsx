import type { LighthouseMetrics } from "@/lib/audit/types";
import { formatCls, formatMs, rateCls, rateFcp, rateLcp, rateTbt, type VitalRating } from "@/lib/audit/pagespeed";
import type { SiteMessages } from "@/lib/i18n/messages/types";

type L = SiteMessages["audit"];

function ratingClass(r: VitalRating) {
  if (r === "good") return "text-accent bg-accent/10";
  if (r === "needs-improvement") return "text-[#a15c12] bg-[#a15c12]/10";
  return "text-accent-hot bg-accent-hot/10";
}

function ratingLabel(r: VitalRating, l: L) {
  if (r === "good") return l.ratingGood;
  if (r === "needs-improvement") return l.ratingNeeds;
  return l.ratingPoor;
}

export function LighthouseReport({ lighthouse, labels, loading, failed, unavailable }: {
  lighthouse: LighthouseMetrics | null;
  labels: L;
  loading: boolean;
  failed: boolean;
  unavailable: boolean;
}) {
  if (unavailable) return <p className="text-sm text-surface/50">{labels.lighthouseUnavailable}</p>;
  if (loading) {
    return (
      <div className="animate-pulse space-y-4" aria-busy="true">
        <p className="text-sm text-surface/60">{labels.lighthouseLoading}</p>
        <div className="h-2 rounded-full bg-white/10" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-20 rounded-xl bg-white/5" />)}
        </div>
      </div>
    );
  }
  if (failed || !lighthouse) return <p className="text-sm text-surface/60">{labels.lighthouseFailed}</p>;

  const bar = (label: string, value: number) => (
    <div>
      <div className="flex justify-between gap-2">
        <p className="text-xs uppercase tracking-[0.14em] text-surface/55">{label}</p>
        <p className="font-display text-2xl text-[#c9a227]">{value}</p>
      </div>
      <div className="mt-2 h-2 rounded-full bg-white/10">
        <div className={`h-full rounded-full ${value >= 90 ? "bg-accent" : value >= 50 ? "bg-[#c9a227]" : "bg-accent-hot"}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );

  const vital = (label: string, value: string, rating: VitalRating) => (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-surface/45">{label}</p>
      <p className="font-display mt-2 text-2xl text-surface">{value}</p>
      <p className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${ratingClass(rating)}`}>{ratingLabel(rating, labels)}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {bar(labels.performance, lighthouse.performance)}
        {bar(labels.accessibility, lighthouse.accessibility)}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-surface/45">{labels.vitalsTitle}</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {vital(labels.lcp, formatMs(lighthouse.lcpMs), rateLcp(lighthouse.lcpMs))}
          {vital(labels.fcp, formatMs(lighthouse.fcpMs), rateFcp(lighthouse.fcpMs))}
          {vital(labels.cls, formatCls(lighthouse.cls), rateCls(lighthouse.cls))}
          {vital(labels.tbt, formatMs(lighthouse.tbtMs), rateTbt(lighthouse.tbtMs))}
        </div>
      </div>
    </div>
  );
}
