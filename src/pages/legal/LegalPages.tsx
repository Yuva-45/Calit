import { LegalLayout } from "../../components/layout/LegalLayout";
import { useState } from "react";

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="October 25, 2023">
      <p>At Calit, your privacy is our priority. This Privacy Policy outlines how we handle information when you use our website.</p>
      
      <h2>1. Information Collection</h2>
      <p>Calit is designed to function primarily in your browser. We do not require you to create an account to use our basic calculators and converters. Most calculations and text processing happen locally on your device.</p>
      
      <h2>2. Local Storage</h2>
      <p>We use browser local storage to save your preferences, such as Dark Mode settings, recently used tools, and favorite tools. This data never leaves your device.</p>

      <h2>3. Analytics & Advertising</h2>
      <p>We may use third-party services like Google Analytics and Google AdSense. These services may use cookies to serve personalized or non-personalized ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>
      
      <h2>4. Data Retention</h2>
      <p>Because we do not store user accounts or calculation histories on our servers, there is no personal data retention beyond what your browser stores locally.</p>
      
      <h2>5. Changes to This Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
    </LegalLayout>
  );
}

export function TermsAndConditions() {
  return (
    <LegalLayout title="Terms and Conditions" lastUpdated="October 25, 2023">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using Calit, you accept and agree to be bound by the terms and provision of this agreement.</p>
      
      <h2>2. Website Use & Calculator Accuracy</h2>
      <p>While we strive for accuracy, all calculators and tools are provided "as is" without warranty of any kind. Calit is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
      
      <h2>3. No Professional Advice</h2>
      <p>The tools provided on Calit (including financial, health, and student calculators) are for informational purposes only. They do not constitute financial, medical, legal, or professional advice. Always consult a qualified professional before making important decisions.</p>
      
      <h2>4. Intellectual Property</h2>
      <p>The design, functionality, and original content of Calit are protected by copyright and intellectual property laws.</p>
    </LegalLayout>
  );
}

export function Disclaimer() {
  return (
    <LegalLayout title="Disclaimer">
      <p>The information and tools provided by Calit are for general informational purposes only.</p>
      <p><strong>Accuracy:</strong> We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>
      <p><strong>Professional Advice:</strong> The results provided by our financial, health, educational, and other calculators are estimates and should not be used as a substitute for professional advice.</p>
    </LegalLayout>
  );
}

export function About() {
  return (
    <LegalLayout title="About Calit">
      <p>Welcome to Calit — Simple Tools, Smarter Everyday.</p>
      <p>Calit was built with a simple mission: to provide a fast, beautiful, and highly functional collection of everyday utilities without the clutter, popups, and confusing interfaces found on many older calculator websites.</p>
      
      <h2>Our Philosophy</h2>
      <ul>
        <li><strong>Speed:</strong> Tools should load instantly and work in real-time.</li>
        <li><strong>Privacy:</strong> Your calculations are yours. Most of our tools process data entirely within your browser.</li>
        <li><strong>Design:</strong> Utilitarian software doesn't have to be ugly. We believe in premium, accessible design that makes tools a joy to use.</li>
      </ul>
      
      <p>Whether you're a student calculating a GPA, a professional writing a report, or just trying to figure out a discount at the store, Calit is here to help you get it done faster.</p>
    </LegalLayout>
  );
}

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <LegalLayout title="Contact Us">
      <p>Have a question, suggestion, or found a bug? We'd love to hear from you.</p>
      
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 mt-8">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Thank you for reaching out. We will get back to you as soon as possible.</p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
              <input type="text" required className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input type="email" required className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
              <textarea required rows={5} className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors">
              Send Message
            </button>
          </form>
        )}
      </div>
    </LegalLayout>
  );
}
