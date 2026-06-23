import { MessageCircle } from "lucide-react";

export function FloatingWA() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-110 animate-pulse-neon"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
