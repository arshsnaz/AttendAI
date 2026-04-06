import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EEF3F4] px-4">
      <div className="text-center bg-white/85 border border-[#d2e1e5] rounded-3xl p-8 sm:p-10 shadow-xl animate-rise">
        <h1 className="mb-4 text-5xl sm:text-6xl font-black text-[#0D2237] animate-rise-delay-1">404</h1>
        <p className="mb-4 text-lg sm:text-xl text-[#4c6673] animate-rise-delay-2">Oops! Page not found</p>
        <a href="/" className="text-[#2B9FB1] underline hover:text-[#23899B] animate-rise-delay-3">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
