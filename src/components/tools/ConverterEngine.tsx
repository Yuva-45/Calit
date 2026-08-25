import React, { useState } from "react";
import { ToolLayout } from "../layout/ToolLayout";
import { getToolBySlug, ToolMetadata } from "../../registry";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeftRight, Copy, CheckCircle2 } from "lucide-react";
import { formatNumber } from "../../lib/utils";

interface ConverterEngineProps {
  slug: string;
  unit1Name: string;
  unit2Name: string;
  unit1Symbol: string;
  unit2Symbol: string;
  convert1To2: (val: number) => number;
  convert2To1: (val: number) => number;
  formula1To2: string;
  formula2To1: string;
  description: React.ReactNode;
}

export function ConverterEngine({
  slug,
  unit1Name,
  unit2Name,
  unit1Symbol,
  unit2Symbol,
  convert1To2,
  convert2To1,
  formula1To2,
  formula2To1,
  description
}: ConverterEngineProps) {
  const tool = getToolBySlug(slug);
  
  const [val1, setVal1] = useState<string>("");
  const [val2, setVal2] = useState<string>("");
  const [lastEdited, setLastEdited] = useState<1 | 2>(1);
  const [copied, setCopied] = useState(false);

  if (!tool) return <div>Tool not found</div>;

  const handleVal1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setVal1(v);
    setLastEdited(1);
    const num = parseFloat(v);
    if (!isNaN(num)) {
      setVal2(convert1To2(num).toString());
    } else {
      setVal2("");
    }
  };

  const handleVal2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setVal2(v);
    setLastEdited(2);
    const num = parseFloat(v);
    if (!isNaN(num)) {
      setVal1(convert2To1(num).toString());
    } else {
      setVal1("");
    }
  };

  const swap = () => {
    const temp1Name = unit1Name;
    // For a real swap we'd need to swap the props, but since it's a fixed component
    // we just swap the values if we want a quick swap, or rely on bi-directional typing.
    // Let's just reverse the values for UX.
    setVal1(val2);
    setVal2(val1);
    setLastEdited(lastEdited === 1 ? 2 : 1);
  };

  const handleCopy = () => {
    const textToCopy = lastEdited === 1 ? `${val2} ${unit2Symbol}` : `${val1} ${unit1Symbol}`;
    if (!textToCopy.trim() || textToCopy.includes("NaN")) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-10 shadow-sm mb-12">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          
          {/* Input 1 */}
          <div className="w-full relative">
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              {unit1Name} ({unit1Symbol})
            </label>
            <div className="relative">
              <input
                type="number"
                value={val1}
                onChange={handleVal1Change}
                placeholder="0"
                className="w-full px-5 py-4 text-2xl font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium select-none pointer-events-none">
                {unit1Symbol}
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:absolute md:left-1/2 md:top-[60%] md:-translate-x-1/2 md:-translate-y-1/2 z-10 flex justify-center w-full md:w-auto">
            <button 
              onClick={swap}
              className="bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:hover:bg-indigo-800 text-indigo-600 dark:text-indigo-400 p-3 rounded-full transition-all hover:scale-110 active:scale-95 shadow-sm border border-indigo-200 dark:border-indigo-700/50"
              title="Swap values"
            >
              <ArrowLeftRight size={20} />
            </button>
          </div>

          {/* Input 2 */}
          <div className="w-full relative">
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              {unit2Name} ({unit2Symbol})
            </label>
            <div className="relative">
              <input
                type="number"
                value={val2}
                onChange={handleVal2Change}
                placeholder="0"
                className="w-full px-5 py-4 text-2xl font-semibold bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium select-none pointer-events-none">
                {unit2Symbol}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleCopy}
            disabled={!val1 && !val2}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy Result"}
          </button>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        {description}
        
        <h3>Formulas</h3>
        <p>To convert {unit1Name} to {unit2Name}:</p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl font-mono text-center mb-4">
          {formula1To2}
        </div>
        <p>To convert {unit2Name} to {unit1Name}:</p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl font-mono text-center">
          {formula2To1}
        </div>
      </div>
    </ToolLayout>
  );
}
