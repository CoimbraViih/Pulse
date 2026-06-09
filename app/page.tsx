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

      <button className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]">
        Começar
      </button>

      <div className="flex gap-2">
        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-bg-elevated)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-bg-elevated)]" />
      </div>
    </main>
  );
}
