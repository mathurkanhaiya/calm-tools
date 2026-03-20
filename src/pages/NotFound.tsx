import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <img src="https://i.ibb.co/jPLxnkzg/IMG-3246.jpg" alt="DailyTools Hub" className="h-12 w-12 rounded-lg object-cover" />
        </div>
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-2">Page not found</p>
        <p className="text-sm text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
