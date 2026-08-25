import { ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ToolMetadata } from "../../registry";
import { useSEO } from "../../hooks/useSEO";
import { BackButton } from "../ui/BackButton";

interface ToolLayoutProps {
  tool: ToolMetadata;
  children: ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://calit.tools${tool.route}`;
  const origin = typeof window !== "undefined" ? window.location.origin : "https://calit.tools";

  const getCategoryName = (category: string) => {
    return category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  const getApplicationCategory = (category: string) => {
    switch (category) {
      case "calculators":
        return "CalculationApplication";
      case "converters":
        return "ConversionApplication";
      case "date-time":
        return "DateTimeApplication";
      case "text-tools":
        return "UtilitiesApplication";
      case "student":
        return "EducationalApplication";
      default:
        return "UtilityApplication";
    }
  };

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${currentUrl}#webapp`,
        "name": tool.name,
        "headline": `${tool.name} - Free Online Tool`,
        "description": tool.description,
        "url": currentUrl,
        "applicationCategory": getApplicationCategory(tool.category),
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "softwareVersion": "1.0",
        "isAccessibleForFree": true,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "keywords": tool.keywords.join(", "),
        "creator": {
          "@type": "Organization",
          "name": "Calit",
          "url": origin
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": origin
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": getCategoryName(tool.category),
            "item": `${origin}/${tool.category}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tool.name,
            "item": currentUrl
          }
        ]
      }
    ]
  }), [tool, currentUrl, origin]);

  useSEO({
    title: `${tool.name} - Calit Tools`,
    description: tool.description,
    canonicalUrl: currentUrl,
    structuredData
  });

  const Icon = tool.icon;

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Navigation Row with Back Arrow */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <BackButton fallbackPath={`/${tool.category}`} />
        <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-none py-1 min-w-0 flex-1">
          <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors shrink-0">Home</Link>
          <ChevronRight size={15} className="mx-2 flex-shrink-0 text-slate-400" />
          <Link to={`/${tool.category}`} className="hover:text-slate-900 dark:hover:text-white transition-colors shrink-0">
            {getCategoryName(tool.category)}
          </Link>
          <ChevronRight size={15} className="mx-2 flex-shrink-0 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-medium truncate">{tool.name}</span>
        </nav>
      </div>

      {/* Header */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl text-indigo-600 dark:text-indigo-400 flex-shrink-0">
          <Icon size={40} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              {tool.name}
            </h1>
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
              {tool.route}
            </span>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Main Tool Content */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

