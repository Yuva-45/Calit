import { useState, useEffect, useRef, useMemo, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, X, ArrowRight, Zap, CornerDownLeft, Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { tools, ToolMetadata } from "../../registry";
import { useUserData } from "../../store/user-data";
import { matchTools, SearchMatchResult, KEYWORD_TOOL_PATH_MAP, getMappedToolPath } from "../../utils/searchMatcher";

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;

  const words = query
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (words.length === 0) return <span>{text}</span>;

  try {
    const regex = new RegExp(`(${words.join("|")})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark
              key={i}
              className="bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 px-0.5 rounded font-bold"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  } catch (e) {
    return <span>{text}</span>;
  }
}

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { recent, addRecent } = useUserData();
  const navigate = useNavigate();

  // Quick suggestion chips for common direct mappings
  const quickPicks = [
    { label: "convert kg to lbs", path: KEYWORD_TOOL_PATH_MAP["convert kg to lbs"] || "/converters/kg-to-lbs" },
    { label: "percentage calculator", path: KEYWORD_TOOL_PATH_MAP["percentage calculator"] || "/calculators/percentage-calculator" },
    { label: "discount calculator", path: KEYWORD_TOOL_PATH_MAP["discount calculator"] || "/calculators/discount-calculator" },
    { label: "bmi calculator", path: KEYWORD_TOOL_PATH_MAP["bmi calculator"] || "/calculators/bmi-calculator" },
    { label: "age calculator", path: KEYWORD_TOOL_PATH_MAP["age calculator"] || "/calculators/age-calculator" },
    { label: "word counter", path: KEYWORD_TOOL_PATH_MAP["word counter"] || "/text-tools/word-counter" },
    { label: "cgpa calculator", path: KEYWORD_TOOL_PATH_MAP["cgpa calculator"] || "/student/cgpa-calculator" },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const searchResults: SearchMatchResult[] = useMemo(() => {
    if (!query.trim()) return [];
    return matchTools(query).slice(0, 8);
  }, [query]);

  const recentTools: ToolMetadata[] = useMemo(() => {
    return recent
      .map(slug => tools.find(t => t.slug === slug))
      .filter((t): t is ToolMetadata => Boolean(t))
      .slice(0, 4);
  }, [recent]);

  const popularTools = useMemo(() => tools.slice(0, 5), []);

  const displayList = useMemo(() => {
    if (query.trim() !== "") {
      return searchResults.map(r => ({
        tool: r.tool,
        isDirectMatch: r.isDirectMatch,
        matchedOn: r.matchedOn,
        directPath: r.directPath,
        score: r.score
      }));
    }
    const base = recentTools.length > 0 ? recentTools : popularTools;
    return base.map(tool => ({
      tool,
      isDirectMatch: false,
      matchedOn: "Quick Access",
      directPath: tool.route,
      score: 0
    }));
  }, [query, searchResults, recentTools, popularTools]);

  const topMatch = searchResults.length > 0 && (searchResults[0].isDirectMatch || searchResults[0].score >= 80) 
    ? searchResults[0] 
    : null;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (slug: string, route: string) => {
    addRecent(slug);
    navigate(route);
    onClose();
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const directPath = getMappedToolPath(query);
    if (directPath) {
      const matched = tools.find(t => t.route === directPath);
      handleSelect(matched?.slug || "direct", directPath);
      return;
    }

    if (displayList.length > 0 && displayList[selectedIndex]) {
      const item = displayList[selectedIndex];
      handleSelect(item.tool.slug, item.directPath);
    }
  };

  // Global hotkey for search and navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev < displayList.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, displayList, selectedIndex, query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-4 sm:top-14 left-2 right-2 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-[101] overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[88vh]"
          >
            {/* Search Input Form */}
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 sm:gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                <SearchIcon size={18} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools or keywords (e.g. kg to lbs, bmi, tip)..."
                className="flex-1 min-w-0 bg-transparent border-none focus:outline-none text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 min-h-[32px] flex items-center justify-center"
                  aria-label="Clear search input"
                >
                  Clear
                </button>
              )}
              <button 
                type="button"
                onClick={onClose}
                className="shrink-0 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Close search dialog"
                title="Close"
              >
                <X size={18} />
              </button>
            </form>

            {/* Top Match Direct Banner when user enters query */}
            {topMatch && (
              <div className="mx-3 sm:mx-4 mt-3 p-3 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/5 dark:from-indigo-950/50 dark:via-purple-950/30 dark:to-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 rounded-xl flex items-center justify-between gap-2.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-sm">
                    <Sparkles size={11} /> Top Suggestion
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 truncate">
                    Direct path: <strong className="text-indigo-600 dark:text-indigo-400 font-mono">{topMatch.directPath}</strong>
                  </span>
                </div>
                <button
                  onClick={() => handleSelect(topMatch.tool.slug, topMatch.directPath)}
                  className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
                >
                  Go <CornerDownLeft size={12} />
                </button>
              </div>
            )}

            {/* Quick Intent Suggestion Chips (when no query or short query) */}
            {query.trim() === "" && (
              <div className="px-3 sm:px-4 pt-3 pb-1 border-b border-slate-100 dark:border-slate-800/60">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Compass size={13} /> Popular Direct Suggestions
                </div>
                <div className="flex flex-wrap gap-1.5 pb-2">
                  {quickPicks.map((pick) => (
                    <button
                      key={pick.path}
                      onClick={() => {
                        const matched = tools.find(t => t.route === pick.path);
                        if (matched) handleSelect(matched.slug, matched.route);
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
                    >
                      <Zap size={11} className="text-amber-500" />
                      {pick.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Search Results List */}
            <div className="overflow-y-auto p-2 flex-1">
              {query.trim() === "" && (
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {recentTools.length > 0 ? "Recently Used Tools" : "Suggested Tools"}
                </div>
              )}
              
              {query.trim() !== "" && searchResults.length === 0 && (
                <div className="py-12 px-4 text-center text-slate-500">
                  <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">No exact tools found for "{query}"</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">Try searching for keywords like "kg to lbs", "gpa", "percent", "discount", or "timer".</p>
                </div>
              )}

              <div className="flex flex-col gap-1">
                {displayList.map((item, index) => {
                  const tool = item.tool;
                  const Icon = tool.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={tool.slug}
                      onClick={() => handleSelect(tool.slug, item.directPath)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-150 group border ${
                        isSelected 
                          ? "bg-indigo-50/80 dark:bg-slate-800/90 border-indigo-200 dark:border-indigo-800/60 shadow-sm" 
                          : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 transition-transform ${
                        isSelected 
                          ? "bg-indigo-600 text-white scale-105 shadow-sm" 
                          : "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 group-hover:scale-105"
                      }`}>
                        <Icon size={18} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-xs sm:text-sm">
                          <span className="truncate">
                            <HighlightMatch text={tool.name} query={query} />
                          </span>
                          
                          {item.isDirectMatch && (
                            <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800 shrink-0">
                              Direct Match
                            </span>
                          )}
                          
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 capitalize hidden sm:inline-block shrink-0">
                            {tool.category.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          <HighlightMatch text={tool.description} query={query} />
                        </div>

                        {/* Direct Path Indicator */}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] sm:text-[11px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/40 truncate max-w-full">
                            {item.directPath}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isSelected && (
                          <span className="text-[10px] sm:text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hidden sm:inline-flex items-center gap-1">
                            Press Enter
                          </span>
                        )}
                        <div className={`p-1 rounded-lg transition-colors ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-300 dark:text-slate-600 group-hover:text-indigo-400"}`}>
                          <ArrowRight size={15} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Footer Hotkey Shortcuts */}
            <div className="bg-slate-50 dark:bg-slate-950/70 border-t border-slate-100 dark:border-slate-800 px-3 sm:px-4 py-2 text-[11px] sm:text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] text-slate-700 dark:text-slate-300">↑↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] text-slate-700 dark:text-slate-300">↵</kbd> select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] text-slate-700 dark:text-slate-300">Esc</kbd> close
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:inline">
                Calit Instant Direct Search
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


