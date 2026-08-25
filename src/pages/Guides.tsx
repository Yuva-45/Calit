import { BookOpen } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { Link } from "react-router-dom";
import { BackButton } from "../components/ui/BackButton";

export function Guides() {
  useSEO({
    title: "Educational Guides - Calit",
    description: "Deep dives into how our calculators and formulas work.",
  });

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
      <div className="mb-6 sm:mb-8">
        <BackButton fallbackPath="/" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-6">
          <BookOpen size={40} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
          Educational Guides
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8">
          We are crafting detailed, easy-to-understand guides explaining the mathematics and logic behind our most popular calculators. 
        </p>
        
        <div className="inline-block bg-slate-100 dark:bg-slate-800 rounded-full px-6 py-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-12">
          Coming Soon
        </div>

        <Link 
          to="/"
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-indigo-600/20"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
