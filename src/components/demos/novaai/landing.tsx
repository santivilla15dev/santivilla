import { novaInter } from "./font";
import { NovaNavbar } from "./navbar";
import { NovaScrollVideo } from "./scroll-video";
import { NovaSectionOne } from "./section-one";
import { NovaSectionTwo } from "./section-two";

export function NovaaiLanding() {
  return (
    <div
      className={`${novaInter.variable} demo-novaai relative bg-[#0a0a0a] text-white antialiased`}
    >
      <NovaScrollVideo />
      <div className="relative z-10">
        <NovaNavbar />
        <main>
          <NovaSectionOne />
          <div className="h-[80vh]" aria-hidden />
          <NovaSectionTwo />
        </main>
      </div>
    </div>
  );
}
