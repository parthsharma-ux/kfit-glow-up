import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
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
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);

    const prompt = `Create a personalized one-day diet plan for a K Fit Gym member.
Profile:
- Age: ${data.age}
- Weight: ${data.weightKg} kg
- Height: ${data.heightCm} cm
- Gender: ${data.gender}
- Goal: ${data.goal.replace("_", " ")}
- Diet preference: ${data.diet.replace("_", "-")}

Return realistic Indian-friendly meals with portions. Macros must sum near the calorie target.
Provide 4-5 concrete food items per meal, 3-4 actionable tips.`;

    try {
      const { experimental_output } = await generateText({
        model: gateway("google/gemini-3-flash-preview"),
        experimental_output: Output.object({ schema: DietSchema }),
        prompt,
      });
      return experimental_output;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("429")) throw new Error("AI is busy. Try again in a moment.");
      if (msg.includes("402")) throw new Error("AI credits exhausted. Please add credits.");
      throw new Error("Could not generate plan. Please try again.");
    }
  });
