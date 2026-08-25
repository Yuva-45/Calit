import { useState } from "react";
import { ToolLayout } from "../../components/layout/ToolLayout";
import { getToolBySlug } from "../../registry";
import { motion, AnimatePresence } from "motion/react";
import { Copy, CheckCircle2 } from "lucide-react";
import { useCurrency } from "../../store/currency";
import { CurrencySelector } from "../../components/ui/CurrencySelector";

export function AgeCalculator() {
  const tool = getToolBySlug("age-calculator")!;
  const [dob, setDob] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{ years: number, months: number, days: number } | null>(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
    setError("");
    if (!dob || !targetDate) return;
    
    const d1 = new Date(dob);
    const d2 = new Date(targetDate);
    
    if (d1 > d2) {
      setError("Date of birth cannot be after the target date.");
      setResult(null);
      return;
    }

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm mb-12 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => { setDob(e.target.value); setError(""); }}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Date (Defaults to Today)</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => { setTargetDate(e.target.value); setError(""); }}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button 
            onClick={calculateAge}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
          >
            Calculate Age
          </button>
          
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 text-center text-red-600 dark:text-red-400 font-medium">
                  {error}
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
                  <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-2 font-medium">Exact Age</p>
                  <p className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
                    {result.years} years, {result.months} months, {result.days} days
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3>How to Calculate Age</h3>
        <p>This calculator determines your exact age in years, months, and days based on the Gregorian calendar.</p>
      </div>
    </ToolLayout>
  );
}

export function DiscountCalculator() {
  const tool = getToolBySlug("discount-calculator")!;
  const { currency, formatCurrency } = useCurrency();
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [copied, setCopied] = useState(false);

  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  const t = parseFloat(tax) || 0;

  const saved = p * (d / 100);
  const afterDiscount = p - saved;
  const taxAmount = afterDiscount * (t / 100);
  const finalPrice = afterDiscount + taxAmount;

  const handleCopy = () => {
    navigator.clipboard.writeText(formatCurrency(finalPrice));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800/80 gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Discount & Sales Price</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculate markdown, tax, and final amount in your currency.</p>
          </div>
          <CurrencySelector label="Currency" compact />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Original Price ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-medium">
                  {currency.symbol}
                </span>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="100" 
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Discount (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={discount} 
                  onChange={(e) => setDiscount(e.target.value)} 
                  placeholder="20" 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sales Tax (%) - Optional</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={tax} 
                  onChange={(e) => setTax(e.target.value)} 
                  placeholder="5" 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-center">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                <span>Original Price:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">{formatCurrency(p)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                <span>You Save:</span>
                <span className="font-bold">-{formatCurrency(saved)}</span>
              </div>
              {t > 0 && (
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                  <span>Tax Amount:</span>
                  <span className="font-medium">+{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-white">Final Price:</span>
                <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{formatCurrency(finalPrice)}</span>
              </div>
            </div>
            <button 
              onClick={handleCopy} 
              className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 rounded-xl font-semibold transition-all flex justify-center items-center gap-2 shadow-sm min-h-[44px]"
            >
              {copied ? <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={18} />} 
              {copied ? "Copied to Clipboard!" : "Copy Result"}
            </button>
          </div>
        </div>
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Calculate the final price of an item after a percentage discount and optional sales tax in your selected currency.</p>
      </div>
    </ToolLayout>
  );
}

export function BMICalculator() {
  const tool = getToolBySlug("bmi-calculator")!;
  const [system, setSystem] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return null;

    if (system === "metric") {
      // height in cm -> m
      const hm = h / 100;
      return w / (hm * hm);
    } else {
      // weight in lbs, height in inches
      return (w / (h * h)) * 703;
    }
  };

  const bmi = calculateBMI();
  
  let status = "";
  let colorClass = "";
  
  if (bmi) {
    if (bmi < 18.5) { status = "Underweight"; colorClass = "text-blue-500"; }
    else if (bmi < 25) { status = "Normal weight"; colorClass = "text-green-500"; }
    else if (bmi < 30) { status = "Overweight"; colorClass = "text-amber-500"; }
    else { status = "Obese"; colorClass = "text-red-500"; }
  }

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm mb-12 max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl inline-flex">
            <button onClick={() => setSystem("metric")} className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${system === "metric" ? "bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white" : "text-slate-500"}`}>Metric</button>
            <button onClick={() => setSystem("imperial")} className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${system === "imperial" ? "bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white" : "text-slate-500"}`}>Imperial</button>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Weight ({system === "metric" ? "kg" : "lbs"})
            </label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={system === "metric" ? "70" : "150"} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Height ({system === "metric" ? "cm" : "inches"})
            </label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder={system === "metric" ? "175" : "68"} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>

        <AnimatePresence>
          {bmi && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center">
                <p className="text-sm text-slate-500 mb-1">Your BMI is</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{bmi.toFixed(1)}</p>
                <p className={`font-semibold ${colorClass}`}>{status}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3>About BMI</h3>
        <p>Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.</p>
        <ul>
          <li>Underweight: &lt; 18.5</li>
          <li>Normal weight: 18.5 - 24.9</li>
          <li>Overweight: 25 - 29.9</li>
          <li>Obese: 30 or greater</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
