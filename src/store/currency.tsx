import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export type CurrencyCode = 
  | "USD" 
  | "INR" 
  | "EUR" 
  | "GBP" 
  | "JPY" 
  | "CAD" 
  | "AUD" 
  | "SGD" 
  | "AED" 
  | "SAR";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
  fractionDigits: number;
}

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US", fractionDigits: 2 },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN", fractionDigits: 2 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE", fractionDigits: 2 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB", fractionDigits: 2 },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", locale: "ja-JP", fractionDigits: 0 },
  CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", locale: "en-CA", fractionDigits: 2 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", locale: "en-AU", fractionDigits: 2 },
  SGD: { code: "SGD", symbol: "S$", name: "Singapore Dollar", locale: "en-SG", fractionDigits: 2 },
  AED: { code: "AED", symbol: "د.إ", name: "UAE Dirham", locale: "ar-AE", fractionDigits: 2 },
  SAR: { code: "SAR", symbol: "﷼", name: "Saudi Riyal", locale: "ar-SA", fractionDigits: 2 },
};

export const CURRENCY_LIST: CurrencyInfo[] = Object.values(SUPPORTED_CURRENCIES);

const STORAGE_KEY = "calit-selected-currency";

/**
 * Detects whether the user is located in India based on browser timezone/locales,
 * providing a graceful fallback without relying solely on geolocation.
 */
function detectDefaultCurrency(): CurrencyCode {
  if (typeof window === "undefined") return "USD";

  try {
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
    if (saved && SUPPORTED_CURRENCIES[saved]) {
      return saved;
    }

    // Timezone check
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (
      timeZone.includes("Calcutta") ||
      timeZone.includes("Kolkata") ||
      timeZone.startsWith("Asia/Kolkata")
    ) {
      return "INR";
    }

    // Language / locale check
    const navLang = navigator.language || "";
    const navLangs = navigator.languages || [];
    if (
      navLang.endsWith("-IN") ||
      navLang === "hi" ||
      navLang === "ta" ||
      navLang === "te" ||
      navLang === "bn" ||
      navLang === "gu" ||
      navLang === "mr" ||
      navLangs.some(l => l.endsWith("-IN"))
    ) {
      return "INR";
    }
  } catch (e) {
    // Ignore and fallback
  }

  return "USD";
}

/**
 * Formats monetary amounts with proper locale-aware symbol and thousand separators.
 * Guarantees zero-glitch display for negative numbers, 0, and large numbers.
 */
export function formatCurrencyValue(
  amount: number,
  currencyCode: CurrencyCode = "USD",
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  if (isNaN(amount) || !isFinite(amount)) return "0.00";

  const curr = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const isNegative = amount < 0;
  const absVal = Math.abs(amount);

  const minDecimals = options?.minimumFractionDigits ?? (curr.fractionDigits === 0 ? 0 : 2);
  const maxDecimals = options?.maximumFractionDigits ?? curr.fractionDigits;

  try {
    const formattedNumber = new Intl.NumberFormat(curr.locale, {
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: maxDecimals,
    }).format(absVal);

    const prefix = isNegative ? "-" : "";

    // Arabic / Middle East RTL or suffix symbols
    if (currencyCode === "AED" || currencyCode === "SAR") {
      return `${prefix}${formattedNumber} ${curr.symbol}`;
    }

    return `${prefix}${curr.symbol}${formattedNumber}`;
  } catch (err) {
    // Fallback if Intl format fails
    const formatted = absVal.toFixed(maxDecimals);
    return `${isNegative ? "-" : ""}${curr.symbol}${formatted}`;
  }
}

interface CurrencyContextType {
  currencyCode: CurrencyCode;
  currency: CurrencyInfo;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatCurrency: (amount: number, options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }) => string;
  currencies: CurrencyInfo[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>(() => detectDefaultCurrency());

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
      if (saved && SUPPORTED_CURRENCIES[saved]) {
        setCurrencyCodeState(saved);
      }
    } catch (e) {}
  }, []);

  const setCurrencyCode = (code: CurrencyCode) => {
    if (SUPPORTED_CURRENCIES[code]) {
      setCurrencyCodeState(code);
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch (e) {}
    }
  };

  const currency = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;

  const value = useMemo(() => ({
    currencyCode,
    currency,
    setCurrencyCode,
    formatCurrency: (amount: number, options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }) =>
      formatCurrencyValue(amount, currencyCode, options),
    currencies: CURRENCY_LIST,
  }), [currencyCode, currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
