import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { VaultshieldLogo } from "./logo";

type Kind = "vault" | "shield" | "devices";

function inPublic(path: string): boolean {
  return existsSync(join(process.cwd(), "public", path));
}

function Mock({ kind }: { kind: Kind }) {
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-[28px]"
      style={{
        background:
          "radial-gradient(120% 90% at 80% 20%, #e8e4f8 0%, #F2F2EE 45%, #ded9d2 100%)",
      }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(115,66,226,0.12),transparent_50%)]" />
      {kind === "vault" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[58%] w-[46%] rounded-[22px] border border-[#192837]/10 bg-white/80 shadow-[0_20px_50px_rgba(25,40,55,0.12)]">
            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-[#7342E2]/80" />
            <span className="absolute -left-6 bottom-8 size-10 rounded-full bg-[conic-gradient(from_120deg,#7342E2,#7ad,#e8a,#7342E2)] shadow-lg" />
            <span className="absolute -right-5 top-10 size-8 rounded-full bg-[conic-gradient(from_40deg,#e8a,#7342E2,#7ad,#e8a)] shadow-md" />
          </div>
        </div>
      ) : null}
      {kind === "shield" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-[62%] w-[42%] items-center justify-center rounded-[40%_40%_46%_46%] bg-white/85 shadow-[0_20px_50px_rgba(25,40,55,0.12)] ring-1 ring-[#192837]/10">
            <div className="h-16 w-12 rounded-md bg-[#7342E2]/90 shadow-inner" />
          </div>
        </div>
      ) : null}
      {kind === "devices" ? (
        <div className="absolute inset-0 flex items-end justify-center gap-3 pb-[18%]">
          <div className="h-[42%] w-[18%] rounded-[18px] border border-[#192837]/10 bg-white/90 shadow-lg" />
          <div className="h-[58%] w-[38%] rounded-[14px] border border-[#192837]/10 bg-white/90 shadow-xl">
            <div className="mx-auto mt-3 flex justify-center">
              <VaultshieldLogo size={22} />
            </div>
          </div>
          <div className="mb-2 h-[16%] w-[16%] rounded-full border border-[#192837]/10 bg-white/90 shadow-md" />
        </div>
      ) : null}
    </div>
  );
}

export function VsIllustration({
  src,
  alt,
  kind,
}: {
  src: string;
  alt: string;
  kind: Kind;
}) {
  if (!inPublic(src)) return <Mock kind={kind} />;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#F2F2EE]">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 42vw" />
    </div>
  );
}
