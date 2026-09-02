"use client";

import { FadeIn } from "./fade-in";
import { creator3dServices } from "@/lib/demos/3d-creator";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative rounded-t-[40px] bg-white px-6 pb-32 pt-20 text-[#0C0C0C] sm:rounded-t-[50px] md:rounded-t-[60px] md:px-10 md:pb-40 md:pt-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <h2
            className="font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}
          >
            Services
          </h2>
        </FadeIn>

        <ul className="mt-12 md:mt-20">
          {creator3dServices.map((service, i) => (
            <FadeIn
              key={service.number}
              as="li"
              delay={i * 0.1}
              className="grid grid-cols-[auto_1fr] items-start gap-6 border-t py-8 md:grid-cols-[140px_1fr_1.4fr] md:gap-10 md:py-12"
              style={{ borderColor: "rgba(12, 12, 12, 0.15)" }}
            >
              <span
                className="font-black leading-none tabular-nums"
                style={{ fontSize: "clamp(2.5rem, 6vw, 88px)" }}
              >
                {service.number}
              </span>
              <h3
                className="font-semibold uppercase leading-tight tracking-tight"
                style={{ fontSize: "clamp(1.4rem, 3vw, 40px)" }}
              >
                {service.name}
              </h3>
              <p
                className="col-span-2 font-light leading-relaxed md:col-span-1"
                style={{
                  opacity: 0.6,
                  fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                }}
              >
                {service.description}
              </p>
            </FadeIn>
          ))}
        </ul>
        <div
          className="border-t"
          style={{ borderColor: "rgba(12, 12, 12, 0.15)" }}
        />
      </div>
    </section>
  );
}
