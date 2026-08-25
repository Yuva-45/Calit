import React, { useState } from "react";
import { ToolLayout } from "../layout/ToolLayout";
import { getToolBySlug } from "../../registry";
import { Copy, Trash2, CheckCircle2 } from "lucide-react";

interface TextEngineProps {
  slug: string;
  transform: (text: string) => string | { text: string, stats?: Record<string, number | string> };
  description: React.ReactNode;
  placeholder?: string;
  showOutputArea?: boolean;
}

export function TextEngine({ slug, transform, description, placeholder = "Type or paste your text here...", showOutputArea = true }: TextEngineProps) {
  const tool = getToolBySlug(slug);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  if (!tool) return <div>Tool not found</div>;

  const result = transform(input);
  const outputText = typeof result === "string" ? result : result.text;
  const stats = typeof result === "object" && result.stats ? result.stats : null;

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => setInput("");

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm mb-12">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Input Text</label>
            <button 
              onClick={clear}
              className="text-sm text-slate-500 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={14} /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y transition-all"
          />
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(stats).map(([label, value]) => (
              <div key={label} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/30 text-center">
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">{label}</p>
                <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{value}</p>
              </div>
            ))}
          </div>
        )}

        {showOutputArea && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Result</label>
              <button 
                onClick={handleCopy}
                disabled={!outputText}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors disabled:opacity-50"
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>
            <textarea
              readOnly
              value={outputText}
              className="w-full h-48 p-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none resize-y text-slate-800 dark:text-slate-200"
            />
          </div>
        )}
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        {description}
      </div>
    </ToolLayout>
  );
}
