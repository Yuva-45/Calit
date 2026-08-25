import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { tools, getToolsByCategory } from "../registry";
import { SearchOverlay } from "../components/ui/SearchOverlay";
import { useSEO } from "../hooks/useSEO";

export function Home() {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://calit.tools";

  useSEO({ 
    title: "Calit - Free Tools for Everyday Life",
    description: "A fast, trustworthy collection of free calculators, converters, date tools, text utilities and student tools designed for everyday use.",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          "url": origin,
          "name": "Calit Tools",
          "description": "Fast, free calculators and converters for everyday life.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${origin}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Organization",
          "@id": `${origin}/#organization`,
          "name": "Calit",
          "url": origin
        }
      ]
    }
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const popularTools = tools.slice(0, 6);

  const heroDirectPicks = [
    { label: "convert kg to lbs", route: "/converters/kg-to-lbs" },
    { label: "percentage calculator", route: "/calculators/percentage-calculator" },
    { label: "bmi calculator", route: "/calculators/bmi-calculator" },
    { label: "age calculator", route: "/calculators/age-calculator" },
    { label: "word counter", route: "/text-tools/word-counter" },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden py-24 sm:py-32 flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            Free Tools for <br className="hidden sm:block" />
            <span className="text-indigo-600 dark:text-indigo-400">Everyday Life.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Calculate, convert, compare, and get things done faster with simple tools that work instantly directly in your browser.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 w-full"
          >
            <div className="relative w-full max-w-xl group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text"
                readOnly 
                onClick={() => setSearchOpen(true)}
                placeholder="Search tools or type e.g. 'convert kg to lbs'..." 
                className="w-full pl-14 pr-24 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/50 transition-all text-base sm:text-lg cursor-pointer text-slate-900 dark:text-white"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                  Ctrl K
                </kbd>
              </div>
            </div>

            {/* Quick direct suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2 max-w-xl">
              <span className="text-xs text-slate-400 font-medium mr-1">Direct suggestions:</span>
              {heroDirectPicks.map((pick) => (
                <Link
                  key={pick.route}
                  to={pick.route}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 font-medium"
                >
                  {pick.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Popular Tools Section */}
      <section className="w-full bg-slate-50 dark:bg-slate-950/50 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="text-amber-500" size={24} fill="currentColor" />
              Popular Tools
            </h2>
            <Link to="/calculators" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col"
                >
                  <Link to={tool.route} className="block group h-full">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                          <Icon size={24} />
                        </div>
                        <div className="text-slate-400 group-hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{tool.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-grow">{tool.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
