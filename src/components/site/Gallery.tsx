import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import hero from "@/assets/hero.jpg";

const items = [
  { src: g1, span: "row-span-2", label: "Strength" },
  { src: g2, span: "", label: "Power" },
  { src: g4, span: "", label: "Conditioning" },
  { src: g3, span: "row-span-2", label: "Combat" },
  { src: hero, span: "col-span-2", label: "The Floor" },
];

export function Gallery() {
  return (
    <section id="gallery" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Gallery</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-6xl gradient-text">Inside K Fit</h2>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4">
          {items.map((it, i) => (
            <figure key={i} className={`group relative overflow-hidden rounded-2xl ${it.span}`}>
              <img src={it.src} alt={it.label} loading="lazy" className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <figcaption className="absolute bottom-3 left-3 font-display text-xl tracking-wider">{it.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
