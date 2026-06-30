import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DietInput = z.object({
  age: z.number().min(10).max(100),
  weightKg: z.number().min(25).max(300),
  heightCm: z.number().min(100).max(250),
  gender: z.enum(["male", "female", "other"]),
  goal: z.enum(["weight_loss", "weight_gain", "muscle_gain", "maintenance"]),
  diet: z.enum(["vegetarian", "non_vegetarian", "vegan", "eggetarian"]).default("non_vegetarian"),
});

const DietSchema = z.object({
  calories: z.number(),
  waterLiters: z.number(),
  macros: z.object({
    proteinG: z.number(),
    carbsG: z.number(),
    fatsG: z.number(),
  }),
  meals: z.object({
    breakfast: z.array(z.string()),
    lunch: z.array(z.string()),
    dinner: z.array(z.string()),
    snacks: z.array(z.string()),
  }),
  tips: z.array(z.string()),
});

export const generateDietPlan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => DietInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("Missing GEMINI_API_KEY. Add it in your hosting provider's env vars.");

    const prompt = `Create a personalized one-day diet plan for a K Fit Gym member.
Profile:
- Age: ${data.age}
- Weight: ${data.weightKg} kg
- Height: ${data.heightCm} cm
- Gender: ${data.gender}
- Goal: ${data.goal.replace("_", " ")}
- Diet preference: ${data.diet.replace("_", "-")}

Return realistic Indian-friendly meals with portions. Macros must sum near the calorie target.
Provide 4-5 concrete food items per meal, 3-4 actionable tips.

Respond with ONLY valid JSON (no markdown, no commentary) matching exactly this shape:
{
  "calories": number,
  "waterLiters": number,
  "macros": { "proteinG": number, "carbsG": number, "fatsG": number },
  "meals": {
    "breakfast": string[],
    "lunch": string[],
    "dinner": string[],
    "snacks": string[]
  },
  "tips": string[]
}
Use raw numbers without units or thousands separators.`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
          }),
        },
      );

      if (!res.ok) {
        const body = await res.text();
        console.error("Gemini error:", res.status, body);
        if (res.status === 429) throw new Error("AI is busy. Try again in a moment.");
        if (res.status === 401 || res.status === 403) throw new Error("Invalid GEMINI_API_KEY.");
        throw new Error(`Gemini error ${res.status}`);
      }

      const json = (await res.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      let cleaned = text.replace(/^```json\s*/im, "").replace(/^```\s*/im, "").replace(/```\s*$/im, "").trim();
      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");
      if (start !== -1 && end > start) cleaned = cleaned.slice(start, end + 1);

      const parsed = JSON.parse(cleaned);
      return DietSchema.parse(parsed);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("generateDietPlan error:", msg);
      if (msg.startsWith("Missing GEMINI_API_KEY") || msg.startsWith("Invalid GEMINI_API_KEY") || msg.startsWith("AI is busy")) {
        throw err;
      }
      throw new Error("Could not generate plan. Please try again.");
    }
  });
