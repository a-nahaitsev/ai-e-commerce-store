import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section flex flex-col items-start gap-4">
      <p className="text-label text-mute">404</p>
      <h1 className="display">Page not found</h1>
      <p className="max-w-md text-base">
        The page you are looking for does not exist or is no longer available.
      </p>
      <Link href="/" className="btn btn-primary btn-fluid mt-2">
        Back to homepage
      </Link>
    </div>
  );
}
