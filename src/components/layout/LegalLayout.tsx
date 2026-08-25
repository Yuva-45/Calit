import { ReactNode } from "react";
import { motion } from "motion/react";
import { useSEO } from "../../hooks/useSEO";
import { BackButton } from "../ui/BackButton";

export function LegalLayout({ title, lastUpdated, children }: { title: string, lastUpdated?: string, children: ReactNode }) {
  useSEO({
    title: `${title} - Calit`,
    description: `Read the ${title.toLowerCase()} for Calit, a collection of free online tools.`
  });

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-16">
      <div className="mb-6 sm:mb-8">
        <BackButton fallbackPath="/" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">{title}</h1>
        {lastUpdated && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            Last Updated: {lastUpdated}
          </p>
        )}
        
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
