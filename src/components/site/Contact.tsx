import { useState } from "react";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";

const WHATSAPP = "919999999999";
const PHONE = "+919999999999";

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", goal: "" });
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    const text = `Hi K Fit, I'd like to join. Name: ${form.name}, Phone: ${form.phone}, Goal: ${form.goal || "—"}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  }

  const ipt = "w-full rounded-lg bg-input border border-border px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <section id="contact" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Visit us</p>
            <h2 className="font-display text-4xl tracking-tight sm:text-6xl gradient-text">Start today</h2>
            <p className="mt-4 max-w-md text-muted-foreground">Drop in for a free trial session. Walk out with a custom plan.</p>

            <div className="mt-8 space-y-4">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-xl glass p-4 transition-all hover:border-primary/60">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><MessageCircle className="h-5 w-5" /></div>
                <div><div className="text-sm font-semibold">WhatsApp</div><div className="text-xs text-muted-foreground">Reply within 5 minutes</div></div>
              </a>
              <a href={`tel:${PHONE}`} className="flex items-center gap-3 rounded-xl glass p-4 transition-all hover:border-primary/60">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><Phone className="h-5 w-5" /></div>
                <div><div className="text-sm font-semibold">{PHONE}</div><div className="text-xs text-muted-foreground">Mon–Sun · 5am–11pm</div></div>
              </a>
              <a href="mailto:hello@kfitgym.com" className="flex items-center gap-3 rounded-xl glass p-4 transition-all hover:border-primary/60">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><Mail className="h-5 w-5" /></div>
                <div><div className="text-sm font-semibold">hello@kfitgym.com</div><div className="text-xs text-muted-foreground">We reply same day</div></div>
              </a>
              <div className="flex items-center gap-3 rounded-xl glass p-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><MapPin className="h-5 w-5" /></div>
                <div><div className="text-sm font-semibold">K Fit Gym, MG Road</div><div className="text-xs text-muted-foreground">Bengaluru, India</div></div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl glass aspect-video">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=MG+Road+Bengaluru&output=embed"
                className="h-full w-full grayscale contrast-125"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} className="glass-strong h-fit rounded-3xl p-7 space-y-4">
            <h3 className="font-display text-2xl tracking-wide">Book free trial</h3>
            <p className="text-sm text-muted-foreground">We'll get back to you on WhatsApp.</p>
            <div className="space-y-3">
              <input className={ipt} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className={ipt} placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required type="tel" />
              <select className={ipt} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}>
                <option value="">Your goal</option>
                <option>Weight Loss</option><option>Muscle Gain</option><option>General Fitness</option><option>Athletic Performance</option>
              </select>
            </div>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] transition-all hover:scale-[1.02]">
              <MessageCircle className="h-4 w-4" /> Send via WhatsApp
            </button>
            {sent && <p className="text-xs text-primary">Opening WhatsApp…</p>}
            <p className="text-[11px] text-muted-foreground">By submitting you agree to be contacted by K Fit Gym.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
