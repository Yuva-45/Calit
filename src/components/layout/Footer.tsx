import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                <span className="text-lg">C</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                CALIT
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Simple Tools. Smarter Everyday.
              <br />A fast, trustworthy collection of free calculators and converters.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Tools</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/calculators" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Calculators</Link></li>
              <li><Link to="/converters" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Converters</Link></li>
              <li><Link to="/date-time" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Date & Time</Link></li>
              <li><Link to="/text-tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Text Tools</Link></li>
              <li><Link to="/student" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Student Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Guides</Link></li>
              <li><Link to="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Disclaimer</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
              <li><Link to="/advertising-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Advertising Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-medium uppercase tracking-widest">
          <div>© {currentYear} Calit. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
