import { useEffect, useState } from "react";

const links = [
  { href: "#features", label: "Training" },
  { href: "#ai-tools", label: "AI Tools" },
  { href: "#plans", label: "Plans" },
  { href: "#trainers", label: "Trainers" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass-strong" : ""}`}>
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg neon-border bg-background">
              <span className="font-display text-xl text-primary leading-none">K</span>
            </div>
            <span className="font-display text-2xl tracking-widest">K FIT <span className="neon-text">GYM</span></span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="#contact" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-105">
              Join Now
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden glass rounded-lg p-2" aria-label="Menu">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}
            </svg>
          </button>
        </div>

        {open && (
          <div className="glass-strong mt-2 rounded-2xl p-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/5">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
                Join Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
