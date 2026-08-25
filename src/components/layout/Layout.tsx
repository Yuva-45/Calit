import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ThemeProvider } from "../../store/theme";
import { CurrencyProvider } from "../../store/currency";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";

export function Layout() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <Header />
          
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-grow pt-20 flex flex-col"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
          
          <Footer />
          <ScrollRestoration />
        </div>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

