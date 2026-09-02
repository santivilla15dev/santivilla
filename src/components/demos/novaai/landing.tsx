import { NovaAbout } from "./about";
import { NovaBlog } from "./blog";
import { NovaContact } from "./contact";
import { novaInter } from "./font";
import { NovaFaq } from "./faq";
import { NovaFooter } from "./footer";
import { NovaNavbar } from "./navbar";
import { NovaProcess } from "./process";
import { NovaProjects } from "./projects";
import { NovaScrollVideo } from "./scroll-video";
import { NovaSectionOne } from "./section-one";
import { NovaSectionTwo } from "./section-two";
import { NovaServices } from "./services";

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
          <NovaServices />
          <NovaProcess />
          <NovaProjects />
          <NovaAbout />
          <NovaBlog />
          <NovaFaq />
          <NovaContact />
        </main>
        <NovaFooter />
      </div>
    </div>
  );
}
