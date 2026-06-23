import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { AITools } from "@/components/site/AITools";
import { Transformations } from "@/components/site/Transformations";
import { Plans } from "@/components/site/Plans";
import { Trainers } from "@/components/site/Trainers";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingWA } from "@/components/site/FloatingWA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "K Fit Gym — Transform Your Body, Transform Your Life" },
      { name: "description", content: "Ultra-premium fitness in your city. Elite trainers, AI diet planner, calorie & macro tools. Join K Fit Gym today." },
      { property: "og:title", content: "K Fit Gym — Transform Your Body, Transform Your Life" },
      { property: "og:description", content: "Elite trainers, AI nutrition, world-class equipment." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Features />
      <AITools />
      <Transformations />
      <Plans />
      <Trainers />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingWA />
    </main>
  );
}
