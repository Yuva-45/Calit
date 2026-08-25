import { useState } from "react";
import { getToolBySlug } from "../../registry";
import { ToolLayout } from "../../components/layout/ToolLayout";
import { useCurrency } from "../../store/currency";
import { CurrencySelector } from "../../components/ui/CurrencySelector";
import { Copy, CheckCircle2 } from "lucide-react";

export function AverageCalculator() {
  const tool = getToolBySlug("average-calculator")!;
  const [input, setInput] = useState("10, 20, 30, 40, 50");

  const numbers = input.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
  const count = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const average = count > 0 ? sum / count : 0;
  const min = count > 0 ? Math.min(...numbers) : 0;
  const max = count > 0 ? Math.max(...numbers) : 0;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Enter numbers (comma separated)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 10, 20, 30"
          className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-6"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Average</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{count > 0 ? average.toLocaleString('en-US', {maximumFractionDigits: 4}) : "-"}</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Sum</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{count > 0 ? sum.toLocaleString('en-US', {maximumFractionDigits: 4}) : "-"}</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Count</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{count > 0 ? count : "-"}</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Min</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{count > 0 ? min.toLocaleString('en-US', {maximumFractionDigits: 4}) : "-"}</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Max</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{count > 0 ? max.toLocaleString('en-US', {maximumFractionDigits: 4}) : "-"}</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function RatioCalculator() {
  const tool = getToolBySlug("ratio-calculator")!;
  const [a, setA] = useState("16");
  const [b, setB] = useState("9");
  const [c, setC] = useState("1920");

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const cNum = parseFloat(c);

  let dNum: number | null = null;
  if (!isNaN(aNum) && !isNaN(bNum) && !isNaN(cNum) && aNum !== 0) {
    dNum = (bNum * cNum) / aNum;
  }

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-24 px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-semibold" />
            <span className="font-bold text-2xl text-slate-400">:</span>
            <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-24 px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-semibold" />
          </div>
          <span className="font-bold text-2xl text-slate-400">=</span>
          <div className="flex items-center gap-2">
            <input type="number" value={c} onChange={(e) => setC(e.target.value)} className="w-24 px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-semibold" />
            <span className="font-bold text-2xl text-slate-400">:</span>
            <div className="w-24 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-xl text-center font-bold text-indigo-600 dark:text-indigo-400 text-lg flex items-center justify-center">
              {dNum !== null ? (Number.isInteger(dNum) ? dNum : dNum.toFixed(2)) : "-"}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function TipCalculator() {
  const tool = getToolBySlug("tip-calculator")!;
  const { currency, formatCurrency } = useCurrency();
  const [bill, setBill] = useState("100");
  const [tipPercent, setTipPercent] = useState("15");
  const [people, setPeople] = useState("1");
  const [copied, setCopied] = useState(false);

  const billNum = parseFloat(bill) || 0;
  const tipNum = parseFloat(tipPercent) || 0;
  const peopleNum = parseInt(people) || 1;

  const tipAmount = billNum * (tipNum / 100);
  const total = billNum + tipAmount;
  const perPerson = total / Math.max(1, peopleNum);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Total: ${formatCurrency(total)} (${formatCurrency(perPerson)}/person)`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800/80 gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tip & Bill Splitter</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculate gratuity and split the bill fairly in your chosen currency.</p>
          </div>
          <CurrencySelector label="Currency" compact />
        </div>

        <div className="grid gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Bill Amount ({currency.symbol})
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-medium">
                {currency.symbol}
              </span>
              <input 
                type="number" 
                value={bill} 
                onChange={(e) => setBill(e.target.value)} 
                className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tip %</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={tipPercent} 
                  onChange={(e) => setTipPercent(e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Number of People</label>
              <input 
                type="number" 
                value={people} 
                onChange={(e) => setPeople(e.target.value)} 
                min="1" 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
              />
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Tip Amount</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(tipAmount)}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Bill</div>
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{formatCurrency(total)}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Per Person</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(perPerson)}</div>
            </div>
          </div>

          <button 
            onClick={handleCopy} 
            className="w-full sm:w-auto px-6 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl font-semibold transition-all inline-flex justify-center items-center gap-2 shadow-sm min-h-[44px]"
          >
            {copied ? <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={18} />} 
            {copied ? "Copied Bill Breakdown!" : "Copy Bill Breakdown"}
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}

export function CompoundInterestCalculator() {
  const tool = getToolBySlug("compound-interest-calculator")!;
  const { currency, formatCurrency } = useCurrency();
  const [principal, setPrincipal] = useState("1000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("10");
  const [compoundFreq, setCompoundFreq] = useState("12");

  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(time) || 0;
  const n = parseFloat(compoundFreq) || 12;

  const a = p * Math.pow((1 + r / n), n * t);
  const interest = a - p;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800/80 gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Compound Interest Growth</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculate investment returns with periodic compounding in your currency.</p>
          </div>
          <CurrencySelector label="Currency" compact />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Initial Investment ({currency.symbol})
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-medium">
                {currency.symbol}
              </span>
              <input 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(e.target.value)} 
                className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Interest Rate (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(e.target.value)} 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
              />
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 font-medium">
                %
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time (Years)</label>
            <input 
              type="number" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Compound Frequency</label>
            <select 
              value={compoundFreq} 
              onChange={(e) => setCompoundFreq(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium cursor-pointer"
            >
              <option value="1">Annually (1x/yr)</option>
              <option value="2">Semiannually (2x/yr)</option>
              <option value="4">Quarterly (4x/yr)</option>
              <option value="12">Monthly (12x/yr)</option>
              <option value="365">Daily (365x/yr)</option>
            </select>
          </div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Interest Earned</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(interest)}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Future Value</div>
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{formatCurrency(a)}</div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function SimpleInterestCalculator() {
  const tool = getToolBySlug("simple-interest-calculator")!;
  const { currency, formatCurrency } = useCurrency();
  const [principal, setPrincipal] = useState("1000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("5");

  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(time) || 0;

  const interest = p * r * t;
  const a = p + interest;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800/80 gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Simple Interest</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculate flat loan or deposit interest in your local currency.</p>
          </div>
          <CurrencySelector label="Currency" compact />
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Principal Amount ({currency.symbol})
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-medium">
                {currency.symbol}
              </span>
              <input 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(e.target.value)} 
                className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Annual Interest Rate (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(e.target.value)} 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
              />
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 font-medium">
                %
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time (Years)</label>
            <input 
              type="number" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white font-medium" 
            />
          </div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Simple Interest</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(interest)}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Amount</div>
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{formatCurrency(a)}</div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
