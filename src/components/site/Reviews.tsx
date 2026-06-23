import { Star } from "lucide-react";

const reviews = [
  { name: "Rahul Verma", rating: 5, time: "2 weeks ago", text: "Hands down the best gym experience. Equipment is top-tier and the staff genuinely care." },
  { name: "Ananya Singh", rating: 5, time: "1 month ago", text: "The AI diet tool blew me away. Followed it for 8 weeks, results speak for themselves." },
  { name: "Karan Malhotra", rating: 5, time: "3 weeks ago", text: "Worth every rupee. Premium vibe, serious training environment." },
  { name: "Neha Kapoor", rating: 5, time: "2 months ago", text: "Trainers actually program — not just count reps. Massive difference." },
];

export function Reviews() {
  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Reviews</p>
            <h2 className="font-display text-4xl tracking-tight sm:text-6xl gradient-text">4.9 / 5 on Google</h2>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
            <span className="ml-2 text-sm text-muted-foreground">1,200+ reviews</span>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl glass p-6">
              <div className="mb-3 flex">{[...Array(r.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
              <p className="text-sm text-foreground/90">"{r.text}"</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/20 text-[11px] font-bold text-primary">{r.name[0]}</div>
                <span className="font-medium text-foreground">{r.name}</span> · <span>{r.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
