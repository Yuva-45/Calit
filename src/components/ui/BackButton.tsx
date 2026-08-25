import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

/**
 * Reusable, accessible Back Button component for Calit.
 * Automatically hides on the Home page ('/').
 * Navigates to actual previous browser history when available,
 * or safely falls back to the parent section or home.
 */
export function BackButton({
  fallbackPath,
  className = "",
  showLabel = false,
  label = "Back"
}: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Strict exception: Do not show back button on Home page
  if (location.pathname === "/" || location.pathname === "") {
    return null;
  }

  // Infer sensible fallback based on the URL hierarchy if none is explicitly passed
  const getInferredFallback = (): string => {
    if (fallbackPath) return fallbackPath;
    
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length > 1) {
      // e.g. /converters/kg-to-lbs -> /converters
      return `/${parts[0]}`;
    }
    // e.g. /calculators or /guides or /privacy-policy -> /
    return "/";
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Check if there is valid session history in React Router / browser
    // React Router tracks history index in window.history.state.idx
    const historyIdx = window.history.state?.idx;
    const hasHistory = typeof historyIdx === "number" ? historyIdx > 0 : window.history.length > 1;

    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(getInferredFallback(), { replace: true });
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      title="Go back"
      className={`group inline-flex items-center justify-center gap-2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-slate-50 hover:bg-slate-100/90 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800/60 shadow-sm hover:shadow active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 cursor-pointer select-none shrink-0 ${className}`}
    >
      <ArrowLeft
        size={20}
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      />
      {showLabel && (
        <span className="text-sm font-medium pr-1">{label}</span>
      )}
    </button>
  );
}
