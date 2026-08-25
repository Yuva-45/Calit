import { useParams, Link } from "react-router-dom";
import { getToolsByCategory, Category as CategoryType } from "../registry";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useSEO } from "../hooks/useSEO";
import { NotFound } from "./NotFound";
import { BackButton } from "../components/ui/BackButton";

export function Category() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  // Basic validation and formatting
  const isValidCategory = ["calculators", "converters", "date-time", "text-tools", "student"].includes(categorySlug || "");
  
  if (!isValidCategory) {
    return <NotFound />;
  }

  const categoryName = categorySlug!
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  useSEO({
    title: `${categoryName} Tools - Calit`,
    description: `Browse our collection of free, easy-to-use ${categoryName.toLowerCase()} and utilities for everyday use.`
  });

  const categoryTools = getToolsByCategory(categorySlug as CategoryType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Navigation Row with Back Arrow */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <BackButton fallbackPath="/" />
        <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-none py-1 min-w-0 flex-1">
          <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors shrink-0">Home</Link>
          <ChevronRight size={15} className="mx-2 flex-shrink-0 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-medium">{categoryName}</span>
        </nav>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{categoryName}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Browse our collection of free, easy-to-use {categoryName.toLowerCase()}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to={tool.route} className="block group h-full">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <div className="text-slate-400 group-hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow leading-relaxed">{tool.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {categoryTools.length === 0 && (
        <div className="py-20 text-center text-slate-500">
          We are currently updating our tool registry for this category.
        </div>
      )}
    </div>
  );
}
