import React from "react";
import { Coins, ChevronDown } from "lucide-react";
import { useCurrency, CurrencyCode } from "../../store/currency";

interface CurrencySelectorProps {
  label?: string;
  className?: string;
  compact?: boolean;
}

export function CurrencySelector({ label = "Currency", className = "", compact = false }: CurrencySelectorProps) {
  const { currencyCode, setCurrencyCode, currencies, currency } = useCurrency();

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 ${className}`}>
      {label && (
        <label 
          htmlFor="calit-currency-select"
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 shrink-0"
        >
          <Coins size={14} className="text-indigo-500 dark:text-indigo-400" />
          <span>{label}</span>
        </label>
      )}

      <div className="relative inline-block w-full sm:w-auto">
        <select
          id="calit-currency-select"
          value={currencyCode}
          onChange={(e) => setCurrencyCode(e.target.value as CurrencyCode)}
          aria-label="Select currency"
          className={`appearance-none w-full sm:w-auto bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white rounded-xl ${
            compact ? "py-1.5 pl-3 pr-8 text-xs font-medium" : "py-2.5 pl-3.5 pr-9 text-sm font-semibold min-h-[44px]"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer shadow-sm hover:border-slate-300 dark:hover:border-slate-600`}
        >
          {currencies.map((c) => (
            <option 
              key={c.code} 
              value={c.code}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-1"
            >
              {c.code} — {c.name} ({c.symbol})
            </option>
          ))}
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}
