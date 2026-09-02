export function LiveProjectButton({ href = "#projects" }: { href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] sm:px-10 sm:py-3.5 sm:text-base"
    >
      Live Project
    </a>
  );
}
