import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-5xl font-bold tracking-tight text-[var(--color-accent)]">
          Pulse
        </span>
        <p className="max-w-sm text-[var(--color-text-secondary)]">
          Seu sistema de decisão diário. Em breve.
        </p>
      </div>

      <Button className="bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]">
        Começar
      </Button>

      <div className="flex gap-2">
        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-bg-elevated)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-bg-elevated)]" />
      </div>
    </main>
  );
}
