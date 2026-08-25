import { tools, ToolMetadata } from "../registry";

/**
 * Mapping object that translates common user-entered keywords, queries,
 * and natural language phrases directly to specific internal tool paths.
 */
export const KEYWORD_TOOL_PATH_MAP: Record<string, string> = {
  // Unit & Weight Converters
  "convert kg to lbs": "/converters/kg-to-lbs",
  "kg to lbs": "/converters/kg-to-lbs",
  "kilograms to pounds": "/converters/kg-to-lbs",
  "kg to pound": "/converters/kg-to-lbs",
  "kilos to pounds": "/converters/kg-to-lbs",
  "kg in lbs": "/converters/kg-to-lbs",
  "convert kilogram to pound": "/converters/kg-to-lbs",
  
  "convert lbs to kg": "/converters/lbs-to-kg",
  "lbs to kg": "/converters/lbs-to-kg",
  "pounds to kilograms": "/converters/lbs-to-kg",
  "pound to kg": "/converters/lbs-to-kg",
  "lbs in kg": "/converters/lbs-to-kg",
  "convert pounds to kg": "/converters/lbs-to-kg",

  // Length & Distance Converters
  "convert cm to inches": "/converters/cm-to-inches",
  "cm to inches": "/converters/cm-to-inches",
  "centimeters to inches": "/converters/cm-to-inches",
  "cm to in": "/converters/cm-to-inches",
  "convert cm to inch": "/converters/cm-to-inches",

  "convert inches to cm": "/converters/inches-to-cm",
  "inches to cm": "/converters/inches-to-cm",
  "inches to centimeters": "/converters/inches-to-cm",
  "in to cm": "/converters/inches-to-cm",
  "convert inch to cm": "/converters/inches-to-cm",

  "convert km to miles": "/converters/km-to-miles",
  "km to miles": "/converters/km-to-miles",
  "kilometers to miles": "/converters/km-to-miles",
  "km to mi": "/converters/km-to-miles",
  "kph to mph": "/converters/km-to-miles",

  "convert miles to km": "/converters/miles-to-km",
  "miles to km": "/converters/miles-to-km",
  "miles to kilometers": "/converters/miles-to-km",
  "mi to km": "/converters/miles-to-km",
  "mph to kph": "/converters/miles-to-km",

  "convert meters to feet": "/converters/meters-to-feet",
  "meters to feet": "/converters/meters-to-feet",
  "m to ft": "/converters/meters-to-feet",
  "meter to foot": "/converters/meters-to-feet",

  "convert feet to meters": "/converters/feet-to-meters",
  "feet to meters": "/converters/feet-to-meters",
  "ft to m": "/converters/feet-to-meters",
  "foot to meter": "/converters/feet-to-meters",

  // Temperature Converters
  "convert celsius to fahrenheit": "/converters/celsius-to-fahrenheit",
  "celsius to fahrenheit": "/converters/celsius-to-fahrenheit",
  "c to f": "/converters/celsius-to-fahrenheit",
  "convert c to f": "/converters/celsius-to-fahrenheit",
  "centigrade to fahrenheit": "/converters/celsius-to-fahrenheit",

  "convert fahrenheit to celsius": "/converters/fahrenheit-to-celsius",
  "fahrenheit to celsius": "/converters/fahrenheit-to-celsius",
  "f to c": "/converters/fahrenheit-to-celsius",
  "convert f to c": "/converters/fahrenheit-to-celsius",

  // Volume & Data Converters
  "convert liters to gallons": "/converters/liters-to-gallons",
  "liters to gallons": "/converters/liters-to-gallons",
  "l to gal": "/converters/liters-to-gallons",
  "litres to gallons": "/converters/liters-to-gallons",

  "convert gallons to liters": "/converters/gallons-to-liters",
  "gallons to liters": "/converters/gallons-to-liters",
  "gal to l": "/converters/gallons-to-liters",
  "gallons to litres": "/converters/gallons-to-liters",

  "convert mb to gb": "/converters/mb-to-gb",
  "mb to gb": "/converters/mb-to-gb",
  "megabytes to gigabytes": "/converters/mb-to-gb",
  "mb gb": "/converters/mb-to-gb",

  "convert gb to mb": "/converters/gb-to-mb",
  "gb to mb": "/converters/gb-to-mb",
  "gigabytes to megabytes": "/converters/gb-to-mb",
  "gb mb": "/converters/gb-to-mb",

  // Calculators & Math
  "percentage calculator": "/calculators/percentage-calculator",
  "calculate percentage": "/calculators/percentage-calculator",
  "percent calculator": "/calculators/percentage-calculator",
  "percentage change": "/calculators/percentage-calculator",
  "percent off": "/calculators/percentage-calculator",
  "percent difference": "/calculators/percentage-calculator",
  "calculate percent": "/calculators/percentage-calculator",

  "age calculator": "/calculators/age-calculator",
  "calculate age": "/calculators/age-calculator",
  "how old am i": "/calculators/age-calculator",
  "birthday calculator": "/calculators/age-calculator",
  "dob calculator": "/calculators/age-calculator",

  "discount calculator": "/calculators/discount-calculator",
  "calculate discount": "/calculators/discount-calculator",
  "sale calculator": "/calculators/discount-calculator",
  "sale price": "/calculators/discount-calculator",
  "coupon calculator": "/calculators/discount-calculator",

  "average calculator": "/calculators/average-calculator",
  "calculate average": "/calculators/average-calculator",
  "mean calculator": "/calculators/average-calculator",
  "median calculator": "/calculators/average-calculator",
  "mode calculator": "/calculators/average-calculator",

  "ratio calculator": "/calculators/ratio-calculator",
  "calculate ratio": "/calculators/ratio-calculator",
  "proportion calculator": "/calculators/ratio-calculator",
  "aspect ratio calculator": "/calculators/ratio-calculator",

  "bmi calculator": "/calculators/bmi-calculator",
  "calculate bmi": "/calculators/bmi-calculator",
  "body mass index": "/calculators/bmi-calculator",
  "body mass index calculator": "/calculators/bmi-calculator",
  "ideal weight calculator": "/calculators/bmi-calculator",

  "tip calculator": "/calculators/tip-calculator",
  "calculate tip": "/calculators/tip-calculator",
  "split bill": "/calculators/tip-calculator",
  "bill split": "/calculators/tip-calculator",
  "restaurant tip": "/calculators/tip-calculator",

  "compound interest calculator": "/calculators/compound-interest-calculator",
  "calculate compound interest": "/calculators/compound-interest-calculator",
  "investment growth calculator": "/calculators/compound-interest-calculator",
  "future value calculator": "/calculators/compound-interest-calculator",

  "simple interest calculator": "/calculators/simple-interest-calculator",
  "calculate simple interest": "/calculators/simple-interest-calculator",
  "loan interest calculator": "/calculators/simple-interest-calculator",

  // Date & Time
  "date difference calculator": "/date-time/date-difference-calculator",
  "date difference": "/date-time/date-difference-calculator",
  "days between two dates": "/date-time/date-difference-calculator",
  "time between dates": "/date-time/date-difference-calculator",

  "days between dates": "/date-time/days-between-dates",
  "day counter": "/date-time/days-between-dates",
  "count days": "/date-time/days-between-dates",

  "time calculator": "/date-time/time-calculator",
  "add time": "/date-time/time-calculator",
  "subtract time": "/date-time/time-calculator",
  "hours and minutes calculator": "/date-time/time-calculator",

  "countdown calculator": "/date-time/countdown-calculator",
  "countdown timer": "/date-time/countdown-calculator",
  "days until": "/date-time/countdown-calculator",
  "time until": "/date-time/countdown-calculator",

  "business days calculator": "/date-time/business-days-calculator",
  "working days calculator": "/date-time/business-days-calculator",
  "work days between dates": "/date-time/business-days-calculator",

  // Text Tools
  "word counter": "/text-tools/word-counter",
  "count words": "/text-tools/word-counter",
  "word count": "/text-tools/word-counter",
  
  "character counter": "/text-tools/character-counter",
  "count characters": "/text-tools/character-counter",
  "letter counter": "/text-tools/character-counter",

  "case converter": "/text-tools/case-converter",
  "uppercase to lowercase": "/text-tools/case-converter",
  "all caps converter": "/text-tools/case-converter",
  "title case converter": "/text-tools/case-converter",

  "remove duplicate lines": "/text-tools/remove-duplicate-lines",
  "remove duplicates": "/text-tools/remove-duplicate-lines",
  "dedupe text": "/text-tools/remove-duplicate-lines",

  "sentence counter": "/text-tools/sentence-counter",
  "count sentences": "/text-tools/sentence-counter",

  "paragraph counter": "/text-tools/paragraph-counter",
  "count paragraphs": "/text-tools/paragraph-counter",

  "reading time calculator": "/text-tools/reading-time-calculator",
  "estimated reading time": "/text-tools/reading-time-calculator",
  "speech time calculator": "/text-tools/reading-time-calculator",

  "remove extra spaces": "/text-tools/remove-extra-spaces",
  "clean spaces": "/text-tools/remove-extra-spaces",
  "trim text": "/text-tools/remove-extra-spaces",

  "text sorter": "/text-tools/text-sorter",
  "sort lines": "/text-tools/text-sorter",
  "alphabetize list": "/text-tools/text-sorter",

  "reverse text": "/text-tools/reverse-text",
  "flip text": "/text-tools/reverse-text",
  "backward text": "/text-tools/reverse-text",

  "slug generator": "/text-tools/slug-generator",
  "url slug generator": "/text-tools/slug-generator",
  "permalink generator": "/text-tools/slug-generator",

  // Student Tools
  "cgpa calculator": "/student/cgpa-calculator",
  "calculate cgpa": "/student/cgpa-calculator",
  "cumulative gpa": "/student/cgpa-calculator",

  "gpa calculator": "/student/gpa-calculator",
  "calculate gpa": "/student/gpa-calculator",
  "semester gpa": "/student/gpa-calculator",

  "marks percentage calculator": "/student/marks-percentage-calculator",
  "marks to percentage": "/student/marks-percentage-calculator",
  "exam score percentage": "/student/marks-percentage-calculator",

  "attendance calculator": "/student/attendance-calculator",
  "bunk calculator": "/student/attendance-calculator",
  "classes to attend": "/student/attendance-calculator",

  "grade calculator": "/student/grade-calculator",
  "final grade calculator": "/student/grade-calculator",
  "target grade calculator": "/student/grade-calculator",

  "study time calculator": "/student/study-time-calculator",
  "study planner": "/student/study-time-calculator",
  "study hours calculator": "/student/study-time-calculator",

  "exam countdown": "/student/exam-countdown",
  "test countdown": "/student/exam-countdown",
  "days left for exam": "/student/exam-countdown"
};

/**
 * Normalizes input text for resilient lookup
 */
export function normalizeSearchKey(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ");
}

/**
 * Returns the exact mapped internal tool path for a given keyword query, or null if none matches.
 */
export function getMappedToolPath(rawQuery: string): string | null {
  const norm = normalizeSearchKey(rawQuery);
  if (!norm) return null;

  // Direct lookup
  if (KEYWORD_TOOL_PATH_MAP[norm]) {
    return KEYWORD_TOOL_PATH_MAP[norm];
  }

  // Check without trailing / leading punctuation
  const cleanIntent = norm
    .replace(/^(how\s+to\s+calculate|how\s+to\s+convert|calculate|convert|check|find|get|the|tool|calculator|converter)\s+/i, "")
    .trim();

  if (cleanIntent && KEYWORD_TOOL_PATH_MAP[cleanIntent]) {
    return KEYWORD_TOOL_PATH_MAP[cleanIntent];
  }

  return null;
}

/**
 * Finds the ToolMetadata object associated with the keyword mapping.
 */
export function findMappedTool(rawQuery: string): { path: string; tool: ToolMetadata } | null {
  const path = getMappedToolPath(rawQuery);
  if (!path) return null;

  const tool = tools.find(t => t.route === path);
  if (!tool) return null;

  return { path, tool };
}
