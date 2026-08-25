import { useState, useEffect } from "react";
import { getToolBySlug } from "../../registry";
import { ToolLayout } from "../../components/layout/ToolLayout";

export function DateDifferenceCalculator() {
  const tool = getToolBySlug("date-difference-calculator")!;
  const [date1, setDate1] = useState(new Date().toISOString().split("T")[0]);
  const [date2, setDate2] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });

  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffDays / 365);
  const remainingDays = diffDays % 365;
  const months = Math.floor(remainingDays / 30);
  const days = remainingDays % 30;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Start Date</label>
            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">End Date</label>
            <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Difference</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            {diffDays} Total Days
          </div>
          <div className="text-slate-600 dark:text-slate-300">
            {years > 0 && <span>{years} years, </span>}
            {months > 0 && <span>{months} months, </span>}
            <span>{days} days</span>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function DaysBetweenDates() {
  const tool = getToolBySlug("days-between-dates")!;
  const [date1, setDate1] = useState(new Date().toISOString().split("T")[0]);
  const [date2, setDate2] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });

  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Date</label>
            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Second Date</label>
            <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Days Between</div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{diffDays}</div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function TimeCalculator() {
  const tool = getToolBySlug("time-calculator")!;
  const [h1, setH1] = useState("0");
  const [m1, setM1] = useState("0");
  const [s1, setS1] = useState("0");
  
  const [h2, setH2] = useState("0");
  const [m2, setM2] = useState("0");
  const [s2, setS2] = useState("0");
  
  const [op, setOp] = useState<"add" | "sub">("add");

  const totalS1 = (parseInt(h1)||0) * 3600 + (parseInt(m1)||0) * 60 + (parseInt(s1)||0);
  const totalS2 = (parseInt(h2)||0) * 3600 + (parseInt(m2)||0) * 60 + (parseInt(s2)||0);
  
  const totalRes = op === "add" ? totalS1 + totalS2 : Math.max(0, totalS1 - totalS2);
  
  const resH = Math.floor(totalRes / 3600);
  const resM = Math.floor((totalRes % 3600) / 60);
  const resS = totalRes % 60;

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time 1 (HH:MM:SS)</label>
          <div className="flex gap-2">
            <input type="number" value={h1} onChange={(e) => setH1(e.target.value)} min="0" placeholder="HH" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <input type="number" value={m1} onChange={(e) => setM1(e.target.value)} min="0" max="59" placeholder="MM" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <input type="number" value={s1} onChange={(e) => setS1(e.target.value)} min="0" max="59" placeholder="SS" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <select value={op} onChange={(e) => setOp(e.target.value as any)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold">
            <option value="add">+</option>
            <option value="sub">-</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time 2 (HH:MM:SS)</label>
          <div className="flex gap-2">
            <input type="number" value={h2} onChange={(e) => setH2(e.target.value)} min="0" placeholder="HH" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <input type="number" value={m2} onChange={(e) => setM2(e.target.value)} min="0" max="59" placeholder="MM" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <input type="number" value={s2} onChange={(e) => setS2(e.target.value)} min="0" max="59" placeholder="SS" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Resulting Time (HH:MM:SS)</div>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
            {String(resH).padStart(2, '0')}:{String(resM).padStart(2, '0')}:{String(resS).padStart(2, '0')}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function CountdownCalculator() {
  const tool = getToolBySlug("countdown-calculator")!;
  
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [targetTime, setTargetTime] = useState("00:00");
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(`${targetDate}T${targetTime}:00`).getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((diff % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Date</label>
            <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Time</label>
            <input type="time" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          {timeLeft ? (
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.d}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.h}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.m}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Mins</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.s}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Secs</span>
              </div>
            </div>
          ) : (
            <div className="text-xl font-bold text-slate-900 dark:text-white py-4">Time is up!</div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

export function BusinessDaysCalculator() {
  const tool = getToolBySlug("business-days-calculator")!;
  const [date1, setDate1] = useState(new Date().toISOString().split("T")[0]);
  const [date2, setDate2] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });

  const getBusinessDays = (d1: string, d2: string) => {
    const start = new Date(d1);
    const end = new Date(d2);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    
    let current = new Date(Math.min(start.getTime(), end.getTime()));
    const final = new Date(Math.max(start.getTime(), end.getTime()));
    
    let days = 0;
    while (current <= final) {
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        days++;
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const bDays = getBusinessDays(date1, date2);

  return (
    <ToolLayout tool={tool}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Start Date</label>
            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">End Date</label>
            <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Business Days (Mon-Fri)</div>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{bDays}</div>
        </div>
      </div>
    </ToolLayout>
  );
}
