import { 
  Percent, Calculator, DollarSign, Activity, Scaling, Target, Scale, Thermometer, 
  Ruler, RulerIcon, Droplets, HardDrive, Calendar, CalendarDays, Clock, Timer, 
  Briefcase, Type, CaseUpper, FileText, AlignLeft, BarChart, SortAsc, Scissors, Link,
  GraduationCap, Award, BookOpen
} from "lucide-react";

export type Category = "calculators" | "converters" | "date-time" | "text-tools" | "student";

export interface ToolMetadata {
  name: string;
  slug: string;
  category: Category;
  description: string;
  icon: any; // Lucide icon
  route: string;
  keywords: string[];
}

export const tools: ToolMetadata[] = [
  // Calculators
  { 
    name: "Percentage Calculator", 
    slug: "percentage-calculator", 
    category: "calculators", 
    description: "Calculate percentages, percentage change, and more.", 
    icon: Percent, 
    route: "/calculators/percentage-calculator", 
    keywords: ["percent", "percentage", "calculate percent", "percentage change", "ratio", "change", "percentage difference", "percent off"] 
  },
  { 
    name: "Age Calculator", 
    slug: "age-calculator", 
    category: "calculators", 
    description: "Calculate exact age from date of birth in years, months, and days.", 
    icon: Calendar, 
    route: "/calculators/age-calculator", 
    keywords: ["age", "calculate age", "how old am i", "birthday", "years", "months", "days", "date of birth", "dob", "chronological age"] 
  },
  { 
    name: "Discount Calculator", 
    slug: "discount-calculator", 
    category: "calculators", 
    description: "Find out the final price after a discount or coupon is applied.", 
    icon: DollarSign, 
    route: "/calculators/discount-calculator", 
    keywords: ["discount", "calculate discount", "sale", "price", "reduction", "sale price", "coupon", "markdown", "percent off"] 
  },
  { 
    name: "Average Calculator", 
    slug: "average-calculator", 
    category: "calculators", 
    description: "Calculate the mean, median, mode, sum, and range of a set of numbers.", 
    icon: Activity, 
    route: "/calculators/average-calculator", 
    keywords: ["average", "calculate average", "mean", "median", "mode", "math", "sum", "arithmetic mean"] 
  },
  { 
    name: "Ratio Calculator", 
    slug: "ratio-calculator", 
    category: "calculators", 
    description: "Solve ratio and proportion problems A:B = C:D.", 
    icon: Scaling, 
    route: "/calculators/ratio-calculator", 
    keywords: ["ratio", "calculate ratio", "proportion", "fraction", "math", "aspect ratio", "solve ratio", "simplify ratio"] 
  },
  { 
    name: "BMI Calculator", 
    slug: "bmi-calculator", 
    category: "calculators", 
    description: "Calculate Body Mass Index (BMI) and healthy weight range.", 
    icon: Target, 
    route: "/calculators/bmi-calculator", 
    keywords: ["bmi", "bmi calculator", "body mass index", "health", "weight", "fitness", "body", "ideal weight", "obesity", "healthy weight"] 
  },
  { 
    name: "Tip Calculator", 
    slug: "tip-calculator", 
    category: "calculators", 
    description: "Calculate tip amount and split bills evenly among people.", 
    icon: Calculator, 
    route: "/calculators/tip-calculator", 
    keywords: ["tip", "calculate tip", "restaurant", "gratuity", "split bill", "bill split", "split", "dining", "waiter tip"] 
  },
  { 
    name: "Compound Interest Calculator", 
    slug: "compound-interest-calculator", 
    category: "calculators", 
    description: "Calculate compound interest and future investment value over time.", 
    icon: DollarSign, 
    route: "/calculators/compound-interest-calculator", 
    keywords: ["compound interest", "interest calculator", "finance", "investment", "growth", "apy", "savings", "compound", "future value"] 
  },
  { 
    name: "Simple Interest Calculator", 
    slug: "simple-interest-calculator", 
    category: "calculators", 
    description: "Calculate simple interest and total payment on a principal sum.", 
    icon: DollarSign, 
    route: "/calculators/simple-interest-calculator", 
    keywords: ["simple interest", "interest", "finance", "loan", "apr", "principal", "flat interest", "borrowing"] 
  },
  
  // Converters
  { 
    name: "KG to LBS", 
    slug: "kg-to-lbs", 
    category: "converters", 
    description: "Convert Kilograms to Pounds (kg to lbs).", 
    icon: Scale, 
    route: "/converters/kg-to-lbs", 
    keywords: ["convert kg to lbs", "kg to lbs", "kilograms to pounds", "kg lbs", "kilos to pounds", "weight", "kilogram", "pound", "lbs", "mass"] 
  },
  { 
    name: "LBS to KG", 
    slug: "lbs-to-kg", 
    category: "converters", 
    description: "Convert Pounds to Kilograms (lbs to kg).", 
    icon: Scale, 
    route: "/converters/lbs-to-kg", 
    keywords: ["convert lbs to kg", "lbs to kg", "pounds to kilograms", "lbs kg", "pounds to kg", "weight", "pound", "kilogram", "kg", "mass"] 
  },
  { 
    name: "CM to Inches", 
    slug: "cm-to-inches", 
    category: "converters", 
    description: "Convert Centimeters to Inches (cm to in).", 
    icon: Ruler, 
    route: "/converters/cm-to-inches", 
    keywords: ["convert cm to inches", "cm to inches", "centimeters to inches", "cm in", "centimeter to inch", "length", "centimeter", "inch", "height"] 
  },
  { 
    name: "Inches to CM", 
    slug: "inches-to-cm", 
    category: "converters", 
    description: "Convert Inches to Centimeters (in to cm).", 
    icon: Ruler, 
    route: "/converters/inches-to-cm", 
    keywords: ["convert inches to cm", "inches to cm", "inches to centimeters", "in cm", "inch to centimeter", "length", "inch", "centimeter"] 
  },
  { 
    name: "KM to Miles", 
    slug: "km-to-miles", 
    category: "converters", 
    description: "Convert Kilometers to Miles (km to mi).", 
    icon: RulerIcon, 
    route: "/converters/km-to-miles", 
    keywords: ["convert km to miles", "km to miles", "kilometers to miles", "km mi", "kph to mph", "distance", "kilometer", "mile", "speed"] 
  },
  { 
    name: "Miles to KM", 
    slug: "miles-to-km", 
    category: "converters", 
    description: "Convert Miles to Kilometers (mi to km).", 
    icon: RulerIcon, 
    route: "/converters/miles-to-km", 
    keywords: ["convert miles to km", "miles to km", "miles to kilometers", "mi km", "mph to kph", "distance", "mile", "kilometer"] 
  },
  { 
    name: "Celsius to Fahrenheit", 
    slug: "celsius-to-fahrenheit", 
    category: "converters", 
    description: "Convert Celsius to Fahrenheit (°C to °F).", 
    icon: Thermometer, 
    route: "/converters/celsius-to-fahrenheit", 
    keywords: ["convert celsius to fahrenheit", "celsius to fahrenheit", "c to f", "temp converter", "temperature converter", "temperature", "heat", "weather"] 
  },
  { 
    name: "Fahrenheit to Celsius", 
    slug: "fahrenheit-to-celsius", 
    category: "converters", 
    description: "Convert Fahrenheit to Celsius (°F to °C).", 
    icon: Thermometer, 
    route: "/converters/fahrenheit-to-celsius", 
    keywords: ["convert fahrenheit to celsius", "fahrenheit to celsius", "f to c", "temperature converter", "temperature", "heat", "weather"] 
  },
  { 
    name: "Meters to Feet", 
    slug: "meters-to-feet", 
    category: "converters", 
    description: "Convert Meters to Feet (m to ft).", 
    icon: Ruler, 
    route: "/converters/meters-to-feet", 
    keywords: ["convert meters to feet", "meters to feet", "m to ft", "meter to foot", "length", "distance", "meter", "foot"] 
  },
  { 
    name: "Feet to Meters", 
    slug: "feet-to-meters", 
    category: "converters", 
    description: "Convert Feet to Meters (ft to m).", 
    icon: Ruler, 
    route: "/converters/feet-to-meters", 
    keywords: ["convert feet to meters", "feet to meters", "ft to m", "foot to meter", "length", "distance", "foot", "meter"] 
  },
  { 
    name: "Liters to Gallons", 
    slug: "liters-to-gallons", 
    category: "converters", 
    description: "Convert Liters to US Gallons (L to gal).", 
    icon: Droplets, 
    route: "/converters/liters-to-gallons", 
    keywords: ["convert liters to gallons", "liters to gallons", "l to gal", "litres to gallons", "volume", "liquid", "liter", "gallon", "fuel"] 
  },
  { 
    name: "Gallons to Liters", 
    slug: "gallons-to-liters", 
    category: "converters", 
    description: "Convert US Gallons to Liters (gal to L).", 
    icon: Droplets, 
    route: "/converters/gallons-to-liters", 
    keywords: ["convert gallons to liters", "gallons to liters", "gal to l", "gallons to litres", "volume", "liquid", "gallon", "liter"] 
  },
  { 
    name: "MB to GB", 
    slug: "mb-to-gb", 
    category: "converters", 
    description: "Convert Megabytes to Gigabytes (MB to GB).", 
    icon: HardDrive, 
    route: "/converters/mb-to-gb", 
    keywords: ["convert mb to gb", "mb to gb", "megabytes to gigabytes", "mb gb", "data", "storage", "megabyte", "gigabyte", "filesize"] 
  },
  { 
    name: "GB to MB", 
    slug: "gb-to-mb", 
    category: "converters", 
    description: "Convert Gigabytes to Megabytes (GB to MB).", 
    icon: HardDrive, 
    route: "/converters/gb-to-mb", 
    keywords: ["convert gb to mb", "gb to mb", "gigabytes to megabytes", "gb mb", "data", "storage", "gigabyte", "megabyte", "filesize"] 
  },

  // Date & Time
  { 
    name: "Date Difference", 
    slug: "date-difference-calculator", 
    category: "date-time", 
    description: "Calculate the exact time and days between two dates.", 
    icon: CalendarDays, 
    route: "/date-time/date-difference-calculator", 
    keywords: ["date difference", "date difference calculator", "days between two dates", "time between dates", "difference between dates", "duration", "how many days"] 
  },
  { 
    name: "Days Between Dates", 
    slug: "days-between-dates", 
    category: "date-time", 
    description: "Count the number of days, weeks, or months between two dates.", 
    icon: CalendarDays, 
    route: "/date-time/days-between-dates", 
    keywords: ["days between dates", "day counter", "count days", "how many days between", "days counter", "duration", "calendar count"] 
  },
  { 
    name: "Time Calculator", 
    slug: "time-calculator", 
    category: "date-time", 
    description: "Add or subtract hours, minutes, and seconds from time.", 
    icon: Clock, 
    route: "/date-time/time-calculator", 
    keywords: ["time calculator", "add time", "subtract time", "hours and minutes calculator", "hours", "minutes", "seconds", "math", "time adder"] 
  },
  { 
    name: "Countdown Calculator", 
    slug: "countdown-calculator", 
    category: "date-time", 
    description: "Calculate time remaining and countdown until a specific target date.", 
    icon: Timer, 
    route: "/date-time/countdown-calculator", 
    keywords: ["countdown calculator", "countdown timer", "time until", "event countdown", "days until", "timer", "remaining", "until"] 
  },
  { 
    name: "Business Days Calculator", 
    slug: "business-days-calculator", 
    category: "date-time", 
    description: "Calculate working business days between dates, excluding weekends.", 
    icon: Briefcase, 
    route: "/date-time/business-days-calculator", 
    keywords: ["business days calculator", "working days", "work days calculator", "exclude weekends", "work", "weekdays", "office days"] 
  },

  // Text Tools
  { 
    name: "Word Counter", 
    slug: "word-counter", 
    category: "text-tools", 
    description: "Count words, characters, sentences, and paragraphs in text.", 
    icon: FileText, 
    route: "/text-tools/word-counter", 
    keywords: ["word counter", "count words", "word count", "character count", "essay word counter", "count", "length", "stats", "text count"] 
  },
  { 
    name: "Character Counter", 
    slug: "character-counter", 
    category: "text-tools", 
    description: "Count the total number of characters with and without spaces.", 
    icon: Type, 
    route: "/text-tools/character-counter", 
    keywords: ["character counter", "count characters", "letter counter", "text length", "letters", "character count", "string length"] 
  },
  { 
    name: "Case Converter", 
    slug: "case-converter", 
    category: "text-tools", 
    description: "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and camelCase.", 
    icon: CaseUpper, 
    route: "/text-tools/case-converter", 
    keywords: ["case converter", "uppercase to lowercase", "all caps", "title case", "sentence case", "camelcase", "capitalize", "lower case"] 
  },
  { 
    name: "Remove Duplicate Lines", 
    slug: "remove-duplicate-lines", 
    category: "text-tools", 
    description: "Find and remove duplicate lines from lists or text blocks.", 
    icon: AlignLeft, 
    route: "/text-tools/remove-duplicate-lines", 
    keywords: ["remove duplicate lines", "remove duplicates", "dedupe text", "unique lines", "clean list", "deduplicate", "clean"] 
  },
  { 
    name: "Sentence Counter", 
    slug: "sentence-counter", 
    category: "text-tools", 
    description: "Count the exact number of sentences in your writing.", 
    icon: FileText, 
    route: "/text-tools/sentence-counter", 
    keywords: ["sentence counter", "count sentences", "how many sentences", "sentences", "writing stats"] 
  },
  { 
    name: "Paragraph Counter", 
    slug: "paragraph-counter", 
    category: "text-tools", 
    description: "Count the number of paragraphs in your document or article.", 
    icon: AlignLeft, 
    route: "/text-tools/paragraph-counter", 
    keywords: ["paragraph counter", "count paragraphs", "paragraph count", "paragraphs", "document stats"] 
  },
  { 
    name: "Reading Time Calculator", 
    slug: "reading-time-calculator", 
    category: "text-tools", 
    description: "Estimate how long it will take to read a blog post or speech.", 
    icon: Clock, 
    route: "/text-tools/reading-time-calculator", 
    keywords: ["reading time calculator", "estimated reading time", "how long to read", "read duration", "speech time", "reading speed"] 
  },
  { 
    name: "Remove Extra Spaces", 
    slug: "remove-extra-spaces", 
    category: "text-tools", 
    description: "Clean up text by stripping multiple consecutive whitespaces and trailing spaces.", 
    icon: Scissors, 
    route: "/text-tools/remove-extra-spaces", 
    keywords: ["remove extra spaces", "clean spaces", "remove double spaces", "trim spaces", "whitespace remover", "clean text"] 
  },
  { 
    name: "Text Sorter", 
    slug: "text-sorter", 
    category: "text-tools", 
    description: "Sort lines of text alphabetically (A-Z, Z-A) or by line length.", 
    icon: SortAsc, 
    route: "/text-tools/text-sorter", 
    keywords: ["text sorter", "sort lines", "alphabetize list", "sort a to z", "sort words", "alphabetical order", "order list"] 
  },
  { 
    name: "Reverse Text", 
    slug: "reverse-text", 
    category: "text-tools", 
    description: "Reverse text character by character or word by word.", 
    icon: Type, 
    route: "/text-tools/reverse-text", 
    keywords: ["reverse text", "flip text", "backward text", "mirror text", "invert text", "backwards"] 
  },
  { 
    name: "Slug Generator", 
    slug: "slug-generator", 
    category: "text-tools", 
    description: "Convert article titles and strings into clean, SEO-friendly URL slugs.", 
    icon: Link, 
    route: "/text-tools/slug-generator", 
    keywords: ["slug generator", "url slug generator", "create slug", "url friendly string", "permalink generator", "slugify"] 
  },

  // Student Tools
  { 
    name: "CGPA Calculator", 
    slug: "cgpa-calculator", 
    category: "student", 
    description: "Calculate your Cumulative Grade Point Average across all semesters.", 
    icon: GraduationCap, 
    route: "/student/cgpa-calculator", 
    keywords: ["cgpa calculator", "cumulative gpa", "calculate cgpa", "college cgpa", "university gpa", "semester credits", "grades average"] 
  },
  { 
    name: "GPA Calculator", 
    slug: "gpa-calculator", 
    category: "student", 
    description: "Calculate your semester GPA based on course grades and credit hours.", 
    icon: BookOpen, 
    route: "/student/gpa-calculator", 
    keywords: ["gpa calculator", "semester gpa", "calculate gpa", "grade point average", "college gpa", "course credits", "grade score"] 
  },
  { 
    name: "Marks Percentage Calculator", 
    slug: "marks-percentage-calculator", 
    category: "student", 
    description: "Calculate percentage from marks obtained in exams or tests.", 
    icon: Percent, 
    route: "/student/marks-percentage-calculator", 
    keywords: ["marks percentage calculator", "marks to percentage", "score percentage", "exam percentage", "test score", "grade percent"] 
  },
  { 
    name: "Attendance Calculator", 
    slug: "attendance-calculator", 
    category: "student", 
    description: "Calculate how many classes you must attend to meet minimum attendance requirements.", 
    icon: CalendarDays, 
    route: "/student/attendance-calculator", 
    keywords: ["attendance calculator", "calculate attendance", "bunk calculator", "classes to attend", "attendance percentage", "college attendance", "attendance tracker"] 
  },
  { 
    name: "Grade Calculator", 
    slug: "grade-calculator", 
    category: "student", 
    description: "Calculate what score you need on your final exam to achieve your target grade.", 
    icon: Award, 
    route: "/student/grade-calculator", 
    keywords: ["grade calculator", "final grade calculator", "final exam score", "target grade", "class grade", "exam weight", "course grade"] 
  },
  { 
    name: "Study Time Calculator", 
    slug: "study-time-calculator", 
    category: "student", 
    description: "Plan and divide available study hours evenly across your subjects.", 
    icon: Clock, 
    route: "/student/study-time-calculator", 
    keywords: ["study time calculator", "study planner", "study hours calculator", "how much to study", "exam prep time", "subject timetable"] 
  },
  { 
    name: "Exam Countdown", 
    slug: "exam-countdown", 
    category: "student", 
    description: "Count down days and hours remaining until your exam date.", 
    icon: Timer, 
    route: "/student/exam-countdown", 
    keywords: ["exam countdown", "days left for exam", "test countdown", "exam timer", "exam date", "countdown to test"] 
  }
];

export const getToolBySlug = (slug: string) => tools.find(t => t.slug === slug);
export const getToolsByCategory = (category: Category) => tools.filter(t => t.category === category);

