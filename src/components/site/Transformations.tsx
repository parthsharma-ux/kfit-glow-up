const stories = [
  { name: "Vikram S.", result: "-18 kg in 6 months", quote: "K Fit's structured plan and the AI diet tool completely changed my relationship with food." },
  { name: "Priya R.", result: "+6 kg lean muscle", quote: "Best gym I've ever joined. The trainers actually understand programming." },
  { name: "Aman K.", result: "From 32% to 14% body fat", quote: "The accountability, the energy, the equipment — it's a different league." },
];

export function Transformations() {
  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Transformations</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-6xl gradient-text">Real members. Real results.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s) => (
            <article key={s.name} className="rounded-3xl glass p-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30">
                {s.result}
              </div>
              <p className="text-foreground/90 leading-relaxed">"{s.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 font-display text-primary">{s.name[0]}</div>
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">Member since 2023</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
