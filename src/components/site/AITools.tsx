import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type ReactElement } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateDietPlan } from "@/lib/fitness-ai.functions";
import { Sparkles, Calculator, Scale, PieChart, Activity, Loader2 } from "lucide-react";

type Tab = "diet" | "calorie" | "bmi" | "macro" | "bodyfat";

const tabs: { key: Tab; label: string; icon: typeof Sparkles }[] = [
  { key: "diet", label: "AI Diet Planner", icon: Sparkles },
  { key: "calorie", label: "Calorie Calculator", icon: Calculator },
  { key: "bmi", label: "BMI Calculator", icon: Scale },
  { key: "macro", label: "Macro Split", icon: PieChart },
  { key: "bodyfat", label: "Body Fat Est.", icon: Activity },
];

export function AITools() {
  const [tab, setTab] = useState<Tab>("diet");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const focusPanelAfterRender = useRef(false);
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    diet: null, calorie: null, bmi: null, macro: null, bodyfat: null,
  });

  useEffect(() => {
    if (focusPanelAfterRender.current) {
      focusPanelAfterRender.current = false;
      panelRef.current?.focus();
    }
  }, [tab]);

  function selectTab(nextKey: Tab) {
    focusPanelAfterRender.current = true;
    setTab(nextKey);
  }

  function onTabKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, idx: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const last = tabs.length - 1;
    const nextIdx =
      e.key === "ArrowRight" ? (idx === last ? 0 : idx + 1) :
      e.key === "ArrowLeft" ? (idx === 0 ? last : idx - 1) :
      e.key === "Home" ? 0 : last;
    const nextKey = tabs[nextIdx].key;
    selectTab(nextKey);
    tabRefs.current[nextKey]?.focus();
  }

  return (
    <section id="ai-tools" aria-labelledby="ai-tools-heading" className="section-pad relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">AI Fitness Suite</p>
          <h2 id="ai-tools-heading" className="font-display text-4xl tracking-tight sm:text-6xl gradient-text">Your personal AI coach</h2>
          <p className="mt-4 text-muted-foreground">Five tools powered by advanced AI. Free for everyone — no signup required.</p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="AI fitness tools"
          aria-orientation="horizontal"
          className="mb-8 flex flex-wrap gap-2"
        >
          {tabs.map(({ key, label, icon: Icon }, idx) => {
            const selected = tab === key;
            return (
              <button
                key={key}
                ref={(el) => { tabRefs.current[key] = el; }}
                id={`ai-tab-${key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`ai-panel-${key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(key)}
                onKeyDown={(e) => onTabKeyDown(e, idx)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  selected
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-neon)]"
                    : "glass hover:border-primary/40"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>

        <div
          ref={panelRef}
          role="tabpanel"
          id={`ai-panel-${tab}`}
          aria-labelledby={`ai-tab-${tab}`}
          tabIndex={0}
          className="glass-strong rounded-3xl p-6 sm:p-10 outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {tab === "diet" && <DietPlanner />}
          {tab === "calorie" && <CalorieCalc />}
          {tab === "bmi" && <BMICalc />}
          {tab === "macro" && <MacroCalc />}
          {tab === "bodyfat" && <BodyFatCalc />}
        </div>
      </div>
    </section>
  );
}

/* ---------- Shared form bits ---------- */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const id = useId();
  const child =
    isValidElement(children)
      ? cloneElement(children as ReactElement<{ id?: string; "aria-label"?: string }>, { id, "aria-label": label })
      : children;
  return (
    <div className="block">
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {child}
    </div>
  );
}
const inputCls =
  "w-full rounded-lg bg-input border border-border px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-foreground font-medium outline-none transition-all [color-scheme:dark] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:border-primary/50 [&>option]:bg-background [&>option]:text-foreground [&>option:checked]:bg-primary/20 [&>option:checked]:text-foreground";

/* ---------- AI Diet Planner ---------- */
function DietPlanner() {
  const generate = useServerFn(generateDietPlan);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState({ age: 28, weightKg: 72, heightCm: 175, gender: "male", goal: "muscle_gain", diet: "non_vegetarian" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<ReturnType<typeof generate>> | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (result && !loading) {
      resultRef.current?.focus();
    }
  }, [result, loading]);

  useEffect(() => {
    if (error) {
      errorRef.current?.focus();
    }
  }, [error]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await generate({ data: { ...form, gender: form.gender as "male" | "female" | "other", goal: form.goal as "weight_loss" | "weight_gain" | "muscle_gain" | "maintenance", diet: form.diet as "vegetarian" | "non_vegetarian" | "vegan" | "eggetarian" } });
      setResult(r ?? null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate plan");
    } finally { setLoading(false); }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={onSubmit} aria-busy={loading} className="space-y-4">
        <h3 className="font-display text-2xl tracking-wide">Tell us about you</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Age"><input type="number" className={inputCls} value={form.age} onChange={(e) => setForm({ ...form, age: +e.target.value })} /></Field>
          <Field label="Gender">
            <select className={inputCls} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
            </select>
          </Field>
          <Field label="Weight (kg)"><input type="number" className={inputCls} value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: +e.target.value })} /></Field>
          <Field label="Height (cm)"><input type="number" className={inputCls} value={form.heightCm} onChange={(e) => setForm({ ...form, heightCm: +e.target.value })} /></Field>
        </div>
        <Field label="Goal">
          <select className={inputCls} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}>
            <option value="weight_loss">Weight Loss</option>
            <option value="weight_gain">Weight Gain</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </Field>
        <Field label="Diet preference">
          <select className={inputCls} value={form.diet} onChange={(e) => setForm({ ...form, diet: e.target.value })}>
            <option value="non_vegetarian">Non-Vegetarian</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="eggetarian">Eggetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </Field>
        <button type="submit" disabled={loading} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Generating…</> : <><Sparkles className="h-4 w-4" aria-hidden="true" /> Generate My Diet</>}
        </button>
        {error && <p ref={errorRef} role="alert" tabIndex={0} className="text-sm text-destructive outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded">{error}</p>}
      </form>

      <div ref={resultRef} role="region" aria-live="polite" aria-busy={loading} aria-label="Your diet plan results" tabIndex={0} className="rounded-2xl bg-background/40 p-5 ring-1 ring-border min-h-[420px] outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
        {!result && !loading && (
          <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
            <Sparkles className="mb-3 h-8 w-8 text-primary" />
            <p className="text-sm">Your custom diet chart will appear here.</p>
          </div>
        )}
        {loading && <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {result && (
          <div className="space-y-5 text-sm">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Calories" value={`${result.calories}`} sub="kcal/day" />
              <Stat label="Water" value={`${result.waterLiters}`} sub="liters" />
              <Stat label="Protein" value={`${result.macros.proteinG}g`} sub={`C ${result.macros.carbsG}g · F ${result.macros.fatsG}g`} />
            </div>
            {(["breakfast", "lunch", "dinner", "snacks"] as const).map((k) => (
              <div key={k}>
                <h4 className="mb-2 font-display text-lg uppercase tracking-wider text-primary">{k}</h4>
                <ul className="space-y-1 text-muted-foreground">{result.meals[k].map((m, i) => <li key={i}>• {m}</li>)}</ul>
              </div>
            ))}
            <div>
              <h4 className="mb-2 font-display text-lg uppercase tracking-wider text-primary">Coach tips</h4>
              <ul className="space-y-1 text-muted-foreground">{result.tips.map((t, i) => <li key={i}>→ {t}</li>)}</ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl glass p-3 text-center">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-display text-2xl neon-text">{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

/* ---------- Calorie Calculator (Mifflin-St Jeor) ---------- */
function CalorieCalc() {
  const [f, setF] = useState({ age: 28, weight: 72, height: 175, gender: "male", activity: 1.55 });
  const bmr = f.gender === "male"
    ? 10 * f.weight + 6.25 * f.height - 5 * f.age + 5
    : 10 * f.weight + 6.25 * f.height - 5 * f.age - 161;
  const maint = Math.round(bmr * f.activity);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <h3 className="font-display text-2xl">Calorie Calculator</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Age"><input type="number" className={inputCls} value={f.age} onChange={(e) => setF({ ...f, age: +e.target.value })} /></Field>
          <Field label="Gender">
            <select className={inputCls} value={f.gender} onChange={(e) => setF({ ...f, gender: e.target.value })}>
              <option value="male">Male</option><option value="female">Female</option>
            </select>
          </Field>
          <Field label="Weight (kg)"><input type="number" className={inputCls} value={f.weight} onChange={(e) => setF({ ...f, weight: +e.target.value })} /></Field>
          <Field label="Height (cm)"><input type="number" className={inputCls} value={f.height} onChange={(e) => setF({ ...f, height: +e.target.value })} /></Field>
        </div>
        <Field label="Activity">
          <select className={inputCls} value={f.activity} onChange={(e) => setF({ ...f, activity: +e.target.value })}>
            <option value={1.2}>Sedentary</option>
            <option value={1.375}>Light (1-3 days/wk)</option>
            <option value={1.55}>Moderate (3-5 days/wk)</option>
            <option value={1.725}>Active (6-7 days/wk)</option>
            <option value={1.9}>Athlete (2x/day)</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-3 content-start">
        <ResultCard title="Maintenance" value={maint} sub="kcal/day" />
        <ResultCard title="Fat Loss" value={maint - 500} sub="kcal/day · -0.5kg/wk" />
        <ResultCard title="Muscle Gain" value={maint + 300} sub="kcal/day · lean bulk" />
      </div>
    </div>
  );
}
function ResultCard({ title, value, sub }: { title: string; value: number; sub: string }) {
  return (
    <div className="rounded-2xl glass p-6 ring-1 ring-border">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <div className="mt-1 font-display text-5xl neon-text">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

/* ---------- BMI ---------- */
function BMICalc() {
  const [w, setW] = useState(72); const [h, setH] = useState(175);
  const bmi = w / Math.pow(h / 100, 2);
  const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese";
  return (
    <div className="grid gap-8 lg:grid-cols-2 items-center">
      <div className="space-y-4 max-w-md">
        <h3 className="font-display text-2xl">BMI Calculator</h3>
        <Field label="Weight (kg)"><input type="number" className={inputCls} value={w} onChange={(e) => setW(+e.target.value)} /></Field>
        <Field label="Height (cm)"><input type="number" className={inputCls} value={h} onChange={(e) => setH(+e.target.value)} /></Field>
      </div>
      <div className="rounded-3xl glass p-10 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Your BMI</div>
        <div className="my-3 font-display text-7xl neon-text">{bmi.toFixed(1)}</div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/30">{cat}</div>
      </div>
    </div>
  );
}

/* ---------- Macro split ---------- */
function MacroCalc() {
  const [cal, setCal] = useState(2400);
  const [goal, setGoal] = useState("muscle_gain");
  const ratios: Record<string, [number, number, number]> = {
    weight_loss: [0.4, 0.35, 0.25],
    muscle_gain: [0.3, 0.45, 0.25],
    maintenance: [0.3, 0.4, 0.3],
  };
  const [pP, cP, fP] = ratios[goal];
  const p = Math.round((cal * pP) / 4);
  const c = Math.round((cal * cP) / 4);
  const fat = Math.round((cal * fP) / 9);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4 max-w-md">
        <h3 className="font-display text-2xl">Macro Split</h3>
        <Field label="Daily Calories"><input type="number" className={inputCls} value={cal} onChange={(e) => setCal(+e.target.value)} /></Field>
        <Field label="Goal">
          <select className={inputCls} value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <ResultCard title="Protein" value={p} sub="grams" />
        <ResultCard title="Carbs" value={c} sub="grams" />
        <ResultCard title="Fats" value={fat} sub="grams" />
      </div>
    </div>
  );
}

/* ---------- Body Fat (US Navy method) ---------- */
function BodyFatCalc() {
  const [f, setF] = useState({ gender: "male", waist: 82, neck: 38, hip: 92, height: 175 });
  let bf = 0;
  if (f.gender === "male") {
    bf = 495 / (1.0324 - 0.19077 * Math.log10(Math.max(1, f.waist - f.neck)) + 0.15456 * Math.log10(Math.max(1, f.height))) - 450;
  } else {
    bf = 495 / (1.29579 - 0.35004 * Math.log10(Math.max(1, f.waist + f.hip - f.neck)) + 0.221 * Math.log10(Math.max(1, f.height))) - 450;
  }
  bf = Math.max(0, Math.min(60, bf));
  return (
    <div className="grid gap-8 lg:grid-cols-2 items-center">
      <div className="space-y-4 max-w-md">
        <h3 className="font-display text-2xl">Body Fat Estimator</h3>
        <Field label="Gender">
          <select className={inputCls} value={f.gender} onChange={(e) => setF({ ...f, gender: e.target.value })}>
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Height (cm)"><input type="number" className={inputCls} value={f.height} onChange={(e) => setF({ ...f, height: +e.target.value })} /></Field>
          <Field label="Neck (cm)"><input type="number" className={inputCls} value={f.neck} onChange={(e) => setF({ ...f, neck: +e.target.value })} /></Field>
          <Field label="Waist (cm)"><input type="number" className={inputCls} value={f.waist} onChange={(e) => setF({ ...f, waist: +e.target.value })} /></Field>
          {f.gender === "female" && (
            <Field label="Hip (cm)"><input type="number" className={inputCls} value={f.hip} onChange={(e) => setF({ ...f, hip: +e.target.value })} /></Field>
          )}
        </div>
      </div>
      <div className="rounded-3xl glass p-10 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Estimated Body Fat</div>
        <div className="my-3 font-display text-7xl neon-text">{bf.toFixed(1)}%</div>
        <div className="text-xs text-muted-foreground">US Navy formula · estimate only</div>
      </div>
    </div>
  );
}
