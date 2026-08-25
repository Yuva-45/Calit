import { useState } from "react";
import { getToolBySlug } from "../../registry";
import { ToolLayout } from "../../components/layout/ToolLayout";

export function SentenceCounter() {
  const tool = getToolBySlug("sentence-counter")!;
  const [text, setText] = useState("");

  // Simple sentence count approximation based on punctuation
  const sentences = text.trim() === "" ? 0 : (text.match(/[^.!?]+[.!?]+/g) || []).length || (text.trim() ? 1 : 0);

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm mb-12">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Input Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to count sentences..."
          className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y mb-6"
        />
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center max-w-sm mx-auto">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Sentences</div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{sentences}</div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function ParagraphCounter() {
  const tool = getToolBySlug("paragraph-counter")!;
  const [text, setText] = useState("");

  const paragraphs = text.trim() === "" ? 0 : text.trim().split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm mb-12">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Input Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to count paragraphs..."
          className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y mb-6"
        />
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center max-w-sm mx-auto">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Paragraphs</div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{paragraphs}</div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function ReadingTimeCalculator() {
  const tool = getToolBySlug("reading-time-calculator")!;
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  // Average reading speed is ~200-250 words per minute. Let's use 238 wpm.
  const wpm = 238;
  const time = words / wpm;
  const minutes = Math.floor(time);
  const seconds = Math.round((time - minutes) * 60);

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm mb-12">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Input Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to calculate reading time..."
          className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y mb-6"
        />
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center max-w-sm mx-auto">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Estimated Reading Time</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {minutes} min {seconds} sec
          </div>
          <div className="text-xs text-slate-400 mt-2">Based on ~238 words per minute</div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function TextSorter() {
  const tool = getToolBySlug("text-sorter")!;
  const [input, setInput] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedLines = input
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .sort((a, b) => {
      const cmp = a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
      return sortOrder === "asc" ? cmp : -cmp;
    })
    .join("\n");

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm mb-12">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Input Text (Lines)</label>
            <div className="flex gap-2">
              <button onClick={() => setSortOrder("asc")} className={`px-3 py-1 text-sm rounded border ${sortOrder === "asc" ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-400" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"}`}>A-Z</button>
              <button onClick={() => setSortOrder("desc")} className={`px-3 py-1 text-sm rounded border ${sortOrder === "desc" ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-400" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"}`}>Z-A</button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Line 1\nLine 2..."
            className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y transition-all"
          />
        </div>

        {input.trim().length > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Sorted Result</label>
            <textarea
              readOnly
              value={sortedLines}
              className="w-full h-48 p-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none resize-y text-slate-800 dark:text-slate-200"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
