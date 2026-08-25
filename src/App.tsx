/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { NotFound } from "./pages/NotFound";

// Tools
import { PercentageCalculator } from "./pages/tools/PercentageCalculator";
import { AgeCalculator, DiscountCalculator, BMICalculator } from "./pages/tools/Calculators";
import { AverageCalculator, RatioCalculator, TipCalculator, CompoundInterestCalculator, SimpleInterestCalculator } from "./pages/tools/MoreCalculators";
import { DateDifferenceCalculator, DaysBetweenDates, TimeCalculator, CountdownCalculator, BusinessDaysCalculator } from "./pages/tools/DateTimeTools";
import { SentenceCounter, ParagraphCounter, ReadingTimeCalculator, TextSorter } from "./pages/tools/MoreTextTools";
import { CGPACalculator, GPACalculator, MarksPercentageCalculator, AttendanceCalculator, GradeCalculator, StudyTimeCalculator, ExamCountdown } from "./pages/tools/StudentTools";

import { 
  KgToLbs, LbsToKg, CmToInches, InchesToCm, KmToMiles, MilesToKm, 
  CelsiusToFahrenheit, FahrenheitToCelsius, MetersToFeet, FeetToMeters,
  LitersToGallons, GallonsToLiters, MbToGb, GbToMb 
} from "./pages/tools/Converters";

import { 
  WordCounter, CharacterCounter, CaseConverter, RemoveDuplicateLines, 
  ReverseText, RemoveExtraSpaces, SlugGenerator 
} from "./pages/tools/TextTools";

// Legal
import { PrivacyPolicy, TermsAndConditions, Disclaimer, About, Contact } from "./pages/legal/LegalPages";
import { LegalLayout } from "./components/layout/LegalLayout";
import { Guides } from "./pages/Guides";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: ":categorySlug", element: <Category /> },
      
      // Calculators
      { path: "calculators/percentage-calculator", element: <PercentageCalculator /> },
      { path: "calculators/age-calculator", element: <AgeCalculator /> },
      { path: "calculators/discount-calculator", element: <DiscountCalculator /> },
      { path: "calculators/bmi-calculator", element: <BMICalculator /> },
      { path: "calculators/average-calculator", element: <AverageCalculator /> },
      { path: "calculators/ratio-calculator", element: <RatioCalculator /> },
      { path: "calculators/tip-calculator", element: <TipCalculator /> },
      { path: "calculators/compound-interest-calculator", element: <CompoundInterestCalculator /> },
      { path: "calculators/simple-interest-calculator", element: <SimpleInterestCalculator /> },

      // Date & Time
      { path: "date-time/age-calculator", element: <AgeCalculator /> },
      { path: "date-time/date-difference-calculator", element: <DateDifferenceCalculator /> },
      { path: "date-time/days-between-dates", element: <DaysBetweenDates /> },
      { path: "date-time/time-calculator", element: <TimeCalculator /> },
      { path: "date-time/countdown-calculator", element: <CountdownCalculator /> },
      { path: "date-time/business-days-calculator", element: <BusinessDaysCalculator /> },
      
      // Converters
      { path: "converters/kg-to-lbs", element: <KgToLbs /> },
      { path: "converters/lbs-to-kg", element: <LbsToKg /> },
      { path: "converters/cm-to-inches", element: <CmToInches /> },
      { path: "converters/inches-to-cm", element: <InchesToCm /> },
      { path: "converters/km-to-miles", element: <KmToMiles /> },
      { path: "converters/miles-to-km", element: <MilesToKm /> },
      { path: "converters/celsius-to-fahrenheit", element: <CelsiusToFahrenheit /> },
      { path: "converters/fahrenheit-to-celsius", element: <FahrenheitToCelsius /> },
      { path: "converters/meters-to-feet", element: <MetersToFeet /> },
      { path: "converters/feet-to-meters", element: <FeetToMeters /> },
      { path: "converters/liters-to-gallons", element: <LitersToGallons /> },
      { path: "converters/gallons-to-liters", element: <GallonsToLiters /> },
      { path: "converters/mb-to-gb", element: <MbToGb /> },
      { path: "converters/gb-to-mb", element: <GbToMb /> },

      // Text Tools
      { path: "text-tools/word-counter", element: <WordCounter /> },
      { path: "text-tools/character-counter", element: <CharacterCounter /> },
      { path: "text-tools/case-converter", element: <CaseConverter /> },
      { path: "text-tools/remove-duplicate-lines", element: <RemoveDuplicateLines /> },
      { path: "text-tools/reverse-text", element: <ReverseText /> },
      { path: "text-tools/remove-extra-spaces", element: <RemoveExtraSpaces /> },
      { path: "text-tools/slug-generator", element: <SlugGenerator /> },
      { path: "text-tools/sentence-counter", element: <SentenceCounter /> },
      { path: "text-tools/paragraph-counter", element: <ParagraphCounter /> },
      { path: "text-tools/reading-time-calculator", element: <ReadingTimeCalculator /> },
      { path: "text-tools/text-sorter", element: <TextSorter /> },

      // Student
      { path: "student/cgpa-calculator", element: <CGPACalculator /> },
      { path: "student/gpa-calculator", element: <GPACalculator /> },
      { path: "student/marks-percentage-calculator", element: <MarksPercentageCalculator /> },
      { path: "student/attendance-calculator", element: <AttendanceCalculator /> },
      { path: "student/grade-calculator", element: <GradeCalculator /> },
      { path: "student/study-time-calculator", element: <StudyTimeCalculator /> },
      { path: "student/exam-countdown", element: <ExamCountdown /> },

      // Legal & Info
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },
      { path: "disclaimer", element: <Disclaimer /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cookie-policy", element: <LegalLayout title="Cookie Policy"><p>This website does not use cookies for tracking. We may use local storage to save your theme preferences locally on your device.</p></LegalLayout> },
      { path: "advertising-policy", element: <LegalLayout title="Advertising Policy"><p>We partner with third-party ad networks (like Google AdSense) to display advertisements. These ads help keep our tools free to use.</p></LegalLayout> },
      { path: "guides", element: <Guides /> },
      { path: "faq", element: <LegalLayout title="Frequently Asked Questions">
        <h3 className="font-bold text-lg mt-6 mb-2">Are these tools really free?</h3>
        <p className="mb-4">Yes! All tools on Calit are 100% free to use, supported by unobtrusive advertisements.</p>
        <h3 className="font-bold text-lg mt-4 mb-2">Do you save my data?</h3>
        <p className="mb-4">No. Almost all text and mathematical processing happens locally in your browser. We do not store your text inputs or calculation histories on our servers.</p>
        <h3 className="font-bold text-lg mt-4 mb-2">Can I request a new tool?</h3>
        <p className="mb-4">Absolutely! Feel free to reach out via our Contact page with your suggestions.</p>
      </LegalLayout> },
      
      { path: "*", element: <NotFound /> }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

