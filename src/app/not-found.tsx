import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold font-mono text-editorial-accent mb-4">404</h1>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Page Not Found</h2>
      <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-editorial-accent text-white font-medium hover:bg-editorial-accentHover transition-colors shadow-sm"
      >
        Return Home
      </Link>
    </div>
  );
}
