import { Dumbbell, Flame, Heart, Activity, Zap, Trophy } from "lucide-react";

const items = [
  { icon: Trophy, title: "Personal Training", desc: "1-on-1 coaching tailored to your physiology and goals." },
  { icon: Flame, title: "Weight Loss Programs", desc: "Structured fat-loss protocols with measurable weekly results." },
  { icon: Dumbbell, title: "Muscle Building", desc: "Hypertrophy programming with progressive overload science." },
  { icon: Activity, title: "Functional Fitness", desc: "Real-world strength, mobility and athletic performance." },
  { icon: Heart, title: "Cardio Zone", desc: "Premium cardio floor with heart-rate guided training." },
  { icon: Zap, title: "CrossFit Training", desc: "High-intensity functional training in a competitive setting." },
];

export function Features() {
  return (
    <section id="features" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">What we do</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-6xl gradient-text">Training built for results</h2>
          <p className="mt-4 text-muted-foreground">Every program is engineered by certified specialists and refined by data from thousands of transformations.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative overflow-hidden rounded-2xl glass p-7 transition-all hover:-translate-y-1 hover:border-primary/40">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl tracking-wide">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
