import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-60" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      {/* Animated neon orb */}
      <div className="pointer-events-none absolute right-[-10%] top-1/3 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-primary/20 blur-[140px] animate-pulse-neon" />

      <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Elite Fitness · Est. 2018
          </div>

          <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            <span className="gradient-text">TRANSFORM</span><br />
            YOUR BODY,<br />
            TRANSFORM YOUR <span className="neon-text">LIFE</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Step into the most premium fitness experience in the city. World-class trainers, AI-powered nutrition, and a culture of relentless progress.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#plans" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] transition-all hover:scale-105">
              Join Now
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a href="#ai-tools" className="inline-flex items-center justify-center gap-2 rounded-full glass-strong px-7 py-4 text-sm font-bold uppercase tracking-wider transition-all hover:border-primary/60">
              Get Free Diet Plan
            </a>
          </div>

          {/* Stat strip */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
            {[
              ["5K+", "Members"],
              ["50+", "Trainers"],
              ["24/7", "Open"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl sm:text-4xl neon-text">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-float">
        Scroll
      </div>
    </section>
  );
}
