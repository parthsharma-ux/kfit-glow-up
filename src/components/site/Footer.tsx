export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg neon-border bg-background">
              <span className="font-display text-lg text-primary leading-none">K</span>
            </div>
            <span className="font-display text-xl tracking-widest">K FIT <span className="neon-text">GYM</span></span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} K Fit Gym. Transform with intent.</p>
        </div>
      </div>
    </footer>
  );
}
