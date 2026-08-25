import { Link } from "react-router-dom";
import { ArrowLeft, Search, Grid, Calculator, Percent, Clock, FileText, Activity } from "lucide-react";
import { motion } from "motion/react";
import { BackButton } from "../components/ui/BackButton";

export function NotFound() {
  const popularTools = [
    { name: "Percentage Calculator", route: "/calculators/percentage-calculator", icon: Percent },
    { name: "Age Calculator", route: "/calculators/age-calculator", icon: Clock },
    { name: "Discount Calculator", route: "/calculators/discount-calculator", icon: Calculator },
    { name: "Word Counter", route: "/text-tools/word-counter", icon: FileText },
    { name: "BMI Calculator", route: "/calculators/bmi-calculator", icon: Activity }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
      <div className="mb-6 sm:mb-8">
        <BackButton fallbackPath="/" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-[55vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl"
        >
          <h1 className="text-8xl md:text-9xl font-black text-slate-100 dark:text-slate-900 mb-2">404</h1>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Page Not Found</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-10">
            The page you're looking for may have moved, been removed, or never existed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              Go Home
            </Link>
            <Link 
              to="/calculators" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors"
            >
              <Grid size={18} />
              Explore Tools
            </Link>
            <button 
              onClick={() => {
                const searchBtn = document.querySelector('button[aria-label="Search"]') as HTMLButtonElement;
                if (searchBtn) {
                  searchBtn.click();
                } else {
                  window.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }));
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors"
            >
              <Search size={18} />
              Search Tools
            </button>
          </div>

          <div className="text-left bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Popular Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {popularTools.map((tool) => (
                <Link key={tool.route} to={tool.route} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors group">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                    <tool.icon size={18} />
                  </div>
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
