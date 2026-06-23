import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";

const trainers = [
  { img: t1, name: "Arjun Mehta", role: "Head Strength Coach", exp: "12+ years", certs: ["NSCA-CSCS", "Precision Nutrition L2"] },
  { img: t2, name: "Sara Iyer", role: "Performance Specialist", exp: "8 years", certs: ["ACE-CPT", "FMS Level 2"] },
  { img: t3, name: "Rohit Khanna", role: "CrossFit & Conditioning", exp: "10 years", certs: ["CrossFit L3", "Kettlebell Sport"] },
];

export function Trainers() {
  return (
    <section id="trainers" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Coaches</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-6xl gradient-text">Meet the team</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t) => (
            <article key={t.name} className="group relative overflow-hidden rounded-3xl glass">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={t.img} alt={t.name} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl tracking-wide">{t.name}</h3>
                <p className="text-sm text-primary">{t.role}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-wider">{t.exp}</span>
                  {t.certs.map((c) => (
                    <span key={c} className="rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-wider">{c}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
