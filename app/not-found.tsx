export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-3">
      <h2 className="text-xl">Page Not Found</h2>
      <p className="text-sm">
        {`Sorry, the page you're looking for is not found.`}
      </p>
    </main>
  );
}
