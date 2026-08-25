import { TextEngine } from "../../components/tools/TextEngine";

export function WordCounter() {
  const getStats = (text: string) => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.trim() === "" ? 0 : (text.match(/[.!?]+/g) || []).length;
    
    // Add logic to count last sentence even if no punctuation
    let finalSentences = sentences;
    if (text.trim() !== "" && !/[.!?]$/.test(text.trim())) {
      finalSentences += 1;
    }

    const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(p => p.trim() !== "").length;

    return {
      text: "",
      stats: {
        "Words": words,
        "Characters": charsWithSpaces,
        "Characters (No Spaces)": charsNoSpaces,
        "Sentences": finalSentences,
        "Paragraphs": paragraphs
      }
    };
  };

  return (
    <TextEngine
      slug="word-counter"
      transform={getStats}
      showOutputArea={false}
      description={
        <>
          <h3>Free Online Word Counter</h3>
          <p>
            This tool counts the number of words, characters (with and without spaces), sentences, and paragraphs in real-time.
            It's perfect for writers, students, and professionals who need to meet strict word limits.
          </p>
          <ul>
            <li><strong>Words:</strong> Counts based on whitespace separation.</li>
            <li><strong>Characters:</strong> Useful for Twitter/X character limits.</li>
            <li><strong>Sentences:</strong> Counts periods, exclamation marks, and question marks.</li>
          </ul>
        </>
      }
    />
  );
}

export function CharacterCounter() {
  return (
    <TextEngine
      slug="character-counter"
      transform={(text) => ({
        text: "",
        stats: {
          "Total Characters": text.length,
          "Without Spaces": text.replace(/\s/g, "").length,
        }
      })}
      showOutputArea={false}
      description={<p>A fast character counting tool. Useful for social media limits, SMS limits, and meta descriptions.</p>}
    />
  );
}

export function CaseConverter() {
  const transform = (text: string) => {
    // We can't have multiple output areas with the basic engine, so let's just make the engine output uppercase
    // Wait, the prompt says "Convert text to uppercase, lowercase, title case, etc."
    // Let's modify the Case Converter to use a custom component since it has multiple outputs/buttons, 
    // OR we can just return a formatted string with all versions. A custom component might be better, but let's stick to the engine and maybe just do a dropdown? 
    // Actually, I'll build a custom one for Case Converter below since it needs action buttons.
    return text.toUpperCase(); 
  };
  
  // For now, I'll implement a custom one for Case Converter in the file.
  return <CaseConverterCustom />;
}

// Keep other text tools simple
export function RemoveDuplicateLines() {
  return (
    <TextEngine
      slug="remove-duplicate-lines"
      transform={(text) => {
        if (!text) return "";
        const lines = text.split("\n");
        const unique = [...new Set(lines)];
        return {
          text: unique.join("\n"),
          stats: {
            "Original Lines": lines.length,
            "Unique Lines": unique.length,
            "Removed": lines.length - unique.length
          }
        };
      }}
      description={<p>Clean up your lists by instantly removing duplicate lines. Processing is done securely in your browser.</p>}
    />
  );
}

export function ReverseText() {
  return (
    <TextEngine
      slug="reverse-text"
      transform={(text) => text.split("").reverse().join("")}
      description={<p>Reverses the order of all characters in your text. Perfect for creating mirrored text.</p>}
    />
  );
}

export function RemoveExtraSpaces() {
  return (
    <TextEngine
      slug="remove-extra-spaces"
      transform={(text) => {
        if (!text) return "";
        const result = text.replace(/[ \t]+/g, ' ').replace(/^ /gm, '').replace(/ $/gm, '');
        return {
          text: result,
          stats: {
            "Original Length": text.length,
            "New Length": result.length
          }
        };
      }}
      description={<p>Removes double spaces, trailing spaces, and leading spaces from text.</p>}
    />
  );
}

export function SlugGenerator() {
  return (
    <TextEngine
      slug="slug-generator"
      transform={(text) => {
        const slug = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove non-word chars
          .replace(/[\s_-]+/g, '-') // Swap spaces for hyphens
          .replace(/^-+|-+$/g, ''); // Trim hyphens
        return slug;
      }}
      description={<p>Convert blog post titles and strings into URL-friendly slugs for SEO purposes.</p>}
    />
  );
}


import { useState } from "react";
import { ToolLayout } from "../../components/layout/ToolLayout";
import { getToolBySlug } from "../../registry";
import { Copy, CheckCircle2 } from "lucide-react";

export function CaseConverterCustom() {
  const tool = getToolBySlug("case-converter")!;
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const toUpper = () => setInput(input.toUpperCase());
  const toLower = () => setInput(input.toLowerCase());
  const toTitle = () => setInput(input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
  const toSentence = () => {
    setInput(input.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm mb-12">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y mb-4"
        />
        
        <div className="flex flex-wrap gap-3 mb-4">
          <button onClick={toUpper} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">UPPER CASE</button>
          <button onClick={toLower} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">lower case</button>
          <button onClick={toTitle} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">Title Case</button>
          <button onClick={toSentence} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">Sentence case.</button>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleCopy}
            disabled={!input}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />} {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Convert your text easily between different letter cases.</p>
      </div>
    </ToolLayout>
  );
}
