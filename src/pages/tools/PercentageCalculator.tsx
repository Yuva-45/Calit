import { useState } from "react";
import { ToolLayout } from "../../components/layout/ToolLayout";
import { getToolBySlug } from "../../registry";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Copy, CheckCircle2 } from "lucide-react";
import { formatNumber } from "../../lib/utils";

export function PercentageCalculator() {
  const tool = getToolBySlug("percentage-calculator")!;
  
  // Section 1: What is X% of Y?
  const [val1P, setVal1P] = useState("");
  const [val1V, setVal1V] = useState("");
  
  // Section 2: X is what percent of Y?
  const [val2X, setVal2X] = useState("");
  const [val2Y, setVal2Y] = useState("");

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const calc1 = () => {
    const p = parseFloat(val1P);
    const v = parseFloat(val1V);
    if (isNaN(p) || isNaN(v)) return null;
    return (p / 100) * v;
  };

  const calc2 = () => {
    const x = parseFloat(val2X);
    const y = parseFloat(val2Y);
    if (isNaN(x) || isNaN(y) || y === 0) return null;
    return (x / y) * 100;
  };

  const res1 = calc1();
  const res2 = calc2();

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 items-stretch">
        {/* Calculator 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
            What is X% of Y?
          </h2>
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-3 mb-6">
              <div className="flex items-center gap-3 w-full xl:w-auto">
                <span className="font-medium whitespace-nowrap text-slate-700 dark:text-slate-300">What is</span>
                <input
                  type="number"
                  value={val1P}
                  onChange={(e) => setVal1P(e.target.value)}
                  placeholder="20"
                  className="w-full xl:w-24 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                <span className="font-medium whitespace-nowrap text-slate-700 dark:text-slate-300">% of</span>
              </div>
              <div className="flex items-center gap-3 w-full xl:flex-1">
                <input
                  type="number"
                  value={val1V}
                  onChange={(e) => setVal1V(e.target.value)}
                  placeholder="150"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                <span className="font-medium whitespace-nowrap text-slate-700 dark:text-slate-300">?</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <AnimatePresence mode="wait">
                {res1 !== null ? (
                  <motion.div
                    key="result1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-5 flex items-center justify-between min-h-[96px]"
                  >
                    <div className="min-w-0 pr-4">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">Result</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-300 truncate">
                        {formatNumber(res1, 4)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(formatNumber(res1, 4), 'calc1')}
                      className="p-2.5 shrink-0 hover:bg-green-100 dark:hover:bg-green-800/50 rounded-lg text-green-600 dark:text-green-400 transition-colors"
                      title="Copy result"
                    >
                      {copiedId === 'calc1' ? <CheckCircle2 size={22} /> : <Copy size={22} />}
                    </button>
                  </motion.div>
                ) : (
                  <div key="empty1" className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/50 rounded-xl p-5 flex flex-col justify-center min-h-[96px]">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Result</p>
                    <p className="text-xl font-medium text-slate-400 dark:text-slate-600">
                      Enter values
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Calculator 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
            X is what percent of Y?
          </h2>
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-3 mb-6">
              <div className="flex items-center gap-3 w-full xl:w-auto">
                <input
                  type="number"
                  value={val2X}
                  onChange={(e) => setVal2X(e.target.value)}
                  placeholder="30"
                  className="w-full xl:w-24 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                <span className="font-medium whitespace-nowrap text-slate-700 dark:text-slate-300">is what % of</span>
              </div>
              <div className="flex items-center gap-3 w-full xl:flex-1">
                <input
                  type="number"
                  value={val2Y}
                  onChange={(e) => setVal2Y(e.target.value)}
                  placeholder="150"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                <span className="font-medium whitespace-nowrap text-slate-700 dark:text-slate-300">?</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <AnimatePresence mode="wait">
                {res2 !== null ? (
                  <motion.div
                    key="result2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-center justify-between min-h-[96px]"
                  >
                    <div className="min-w-0 pr-4">
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Result</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-300 truncate">
                        {formatNumber(res2, 4)}%
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(formatNumber(res2, 4) + '%', 'calc2')}
                      className="p-2.5 shrink-0 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded-lg text-blue-600 dark:text-blue-400 transition-colors"
                      title="Copy result"
                    >
                      {copiedId === 'calc2' ? <CheckCircle2 size={22} /> : <Copy size={22} />}
                    </button>
                  </motion.div>
                ) : (
                  <div key="empty2" className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/50 rounded-xl p-5 flex flex-col justify-center min-h-[96px]">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Result</p>
                    <p className="text-xl font-medium text-slate-400 dark:text-slate-600">
                      Enter values
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-4">How to Calculate Percentages</h3>
        <p className="text-slate-700 dark:text-slate-300 mb-8 max-w-3xl">
          A percentage is a number or ratio expressed as a fraction of 100. It is often denoted using the percent sign, "%".
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Vertical divider for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-slate-900 dark:text-white">Formula 1: Finding P% of V</h4>
            <p className="text-slate-700 dark:text-slate-300">To find a percentage of a specific value, you can use the formula:</p>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl font-mono text-center overflow-x-auto text-indigo-700 dark:text-indigo-400 font-medium">
              Result = (P / 100) × V
            </div>
            <p className="text-slate-700 dark:text-slate-300">For example, to find 20% of 150: (20 / 100) × 150 = 0.2 × 150 = 30.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-slate-900 dark:text-white">Formula 2: Finding what percentage X is of Y</h4>
            <p className="text-slate-700 dark:text-slate-300">To find out what percentage one number represents of another, use:</p>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl font-mono text-center overflow-x-auto text-blue-700 dark:text-blue-400 font-medium">
              Percentage = (X / Y) × 100
            </div>
            <p className="text-slate-700 dark:text-slate-300">For example, if you want to know what percentage 30 is of 150: (30 / 150) × 100 = 0.2 × 100 = 20%.</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
