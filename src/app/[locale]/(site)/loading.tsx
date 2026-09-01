export default function Loading() {
  return (
    <main className="site-shell flex min-h-[60vh] items-center justify-center py-24">
      <div
        className="size-10 animate-spin rounded-full border-2 border-line border-t-accent"
        role="status"
        aria-label="Cargando"
      />
    </main>
  );
}
