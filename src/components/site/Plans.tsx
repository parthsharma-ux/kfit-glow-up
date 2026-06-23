import { Check } from "lucide-react";

const plans = [
  { name: "Basic", price: "1,499", period: "/mo", features: ["Gym floor access", "Locker facility", "1 fitness assessment", "Mobile app access"], cta: "Start Basic" },
  { name: "Premium", price: "2,999", period: "/mo", features: ["Everything in Basic", "Group classes unlimited", "AI Diet Plan monthly", "2 PT sessions", "Sauna access"], cta: "Get Premium", featured: true },
  { name: "Elite", price: "5,999", period: "/mo", features: ["Everything in Premium", "Dedicated trainer", "Custom nutrition coaching", "Recovery & physio", "24/7 priority access"], cta: "Go Elite" },
];

export function Plans() {
  return (
    <section id="plans" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Membership</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-6xl gradient-text">Choose your level</h2>
          <p className="mt-4 text-muted-foreground">Cancel anytime. No hidden fees. Pause whenever you need.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-1 ${p.featured ? "glass-strong neon-border" : "glass"}`}>
              {p.featured && (
                <div className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Most Popular</div>
              )}
              <h3 className="font-display text-3xl tracking-wide">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-muted-foreground">₹</span>
                <span className="font-display text-5xl neon-text">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <ul className="my-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`block rounded-full px-5 py-3 text-center text-sm font-bold uppercase tracking-wider transition-all ${p.featured ? "bg-primary text-primary-foreground shadow-[var(--shadow-neon)] hover:scale-105" : "glass-strong hover:border-primary/60"}`}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
