import { ConverterEngine } from "../../components/tools/ConverterEngine";

export function KgToLbs() {
  return (
    <ConverterEngine
      slug="kg-to-lbs"
      unit1Name="Kilograms"
      unit2Name="Pounds"
      unit1Symbol="kg"
      unit2Symbol="lbs"
      convert1To2={(kg) => kg * 2.20462}
      convert2To1={(lbs) => lbs / 2.20462}
      formula1To2="lbs = kg × 2.20462"
      formula2To1="kg = lbs ÷ 2.20462"
      description={
        <>
          <h3>Understanding Kilograms and Pounds</h3>
          <p>
            The kilogram (kg) is the base unit of mass in the International System of Units (SI). 
            The pound (lbs) is a unit of mass used in the imperial and US customary systems.
          </p>
          <p>
            One kilogram is exactly equal to 2.20462262185 pounds.
          </p>
        </>
      }
    />
  );
}

export function LbsToKg() {
  return (
    <ConverterEngine
      slug="lbs-to-kg"
      unit1Name="Pounds"
      unit2Name="Kilograms"
      unit1Symbol="lbs"
      unit2Symbol="kg"
      convert1To2={(lbs) => lbs / 2.20462}
      convert2To1={(kg) => kg * 2.20462}
      formula1To2="kg = lbs ÷ 2.20462"
      formula2To1="lbs = kg × 2.20462"
      description={
        <>
          <h3>Pounds to Kilograms</h3>
          <p>
            A pound (symbol: lb) is a unit of mass used in the imperial and US customary systems. 
            The international standard symbol for the avoirdupois pound is lb.
          </p>
        </>
      }
    />
  );
}

export function CmToInches() {
  return (
    <ConverterEngine
      slug="cm-to-inches"
      unit1Name="Centimeters"
      unit2Name="Inches"
      unit1Symbol="cm"
      unit2Symbol="in"
      convert1To2={(cm) => cm / 2.54}
      convert2To1={(inV) => inV * 2.54}
      formula1To2="in = cm ÷ 2.54"
      formula2To1="cm = in × 2.54"
      description={
        <p>A centimeter (cm) is a decimal fraction of the meter. An inch is a unit of length in the British imperial and United States customary systems of measurement.</p>
      }
    />
  );
}

export function InchesToCm() {
  return (
    <ConverterEngine
      slug="inches-to-cm"
      unit1Name="Inches"
      unit2Name="Centimeters"
      unit1Symbol="in"
      unit2Symbol="cm"
      convert1To2={(inV) => inV * 2.54}
      convert2To1={(cm) => cm / 2.54}
      formula1To2="cm = in × 2.54"
      formula2To1="in = cm ÷ 2.54"
      description={
        <p>Convert inches to centimeters easily. 1 inch is exactly 2.54 centimeters.</p>
      }
    />
  );
}

export function KmToMiles() {
  return (
    <ConverterEngine
      slug="km-to-miles"
      unit1Name="Kilometers"
      unit2Name="Miles"
      unit1Symbol="km"
      unit2Symbol="mi"
      convert1To2={(km) => km * 0.621371}
      convert2To1={(mi) => mi / 0.621371}
      formula1To2="mi = km × 0.621371"
      formula2To1="km = mi ÷ 0.621371"
      description={<p>A kilometer (km) is a unit of length in the International System of Units (SI). A mile is a unit of distance in the US Customary Units and British Imperial Units.</p>}
    />
  );
}

export function MilesToKm() {
  return (
    <ConverterEngine
      slug="miles-to-km"
      unit1Name="Miles"
      unit2Name="Kilometers"
      unit1Symbol="mi"
      unit2Symbol="km"
      convert1To2={(mi) => mi / 0.621371}
      convert2To1={(km) => km * 0.621371}
      formula1To2="km = mi ÷ 0.621371"
      formula2To1="mi = km × 0.621371"
      description={<p>Convert miles to kilometers. 1 mile is approximately equal to 1.60934 kilometers.</p>}
    />
  );
}

export function CelsiusToFahrenheit() {
  return (
    <ConverterEngine
      slug="celsius-to-fahrenheit"
      unit1Name="Celsius"
      unit2Name="Fahrenheit"
      unit1Symbol="°C"
      unit2Symbol="°F"
      convert1To2={(c) => (c * 9/5) + 32}
      convert2To1={(f) => (f - 32) * 5/9}
      formula1To2="°F = (°C × 9/5) + 32"
      formula2To1="°C = (°F - 32) × 5/9"
      description={<p>Celsius is a scale based on 0° for the freezing point of water and 100° for the boiling point of water. Fahrenheit is a scale where water freezes at 32° and boils at 212°.</p>}
    />
  );
}

export function FahrenheitToCelsius() {
  return (
    <ConverterEngine
      slug="fahrenheit-to-celsius"
      unit1Name="Fahrenheit"
      unit2Name="Celsius"
      unit1Symbol="°F"
      unit2Symbol="°C"
      convert1To2={(f) => (f - 32) * 5/9}
      convert2To1={(c) => (c * 9/5) + 32}
      formula1To2="°C = (°F - 32) × 5/9"
      formula2To1="°F = (°C × 9/5) + 32"
      description={<p>Convert Fahrenheit to Celsius using the standard formula.</p>}
    />
  );
}

export function MetersToFeet() {
  return (
    <ConverterEngine
      slug="meters-to-feet"
      unit1Name="Meters"
      unit2Name="Feet"
      unit1Symbol="m"
      unit2Symbol="ft"
      convert1To2={(m) => m * 3.28084}
      convert2To1={(ft) => ft / 3.28084}
      formula1To2="ft = m × 3.28084"
      formula2To1="m = ft ÷ 3.28084"
      description={<p>Convert meters to feet. 1 meter is approximately 3.28084 feet.</p>}
    />
  );
}

export function FeetToMeters() {
  return (
    <ConverterEngine
      slug="feet-to-meters"
      unit1Name="Feet"
      unit2Name="Meters"
      unit1Symbol="ft"
      unit2Symbol="m"
      convert1To2={(ft) => ft / 3.28084}
      convert2To1={(m) => m * 3.28084}
      formula1To2="m = ft ÷ 3.28084"
      formula2To1="ft = m × 3.28084"
      description={<p>Convert feet to meters. 1 foot is exactly 0.3048 meters.</p>}
    />
  );
}

export function LitersToGallons() {
  return (
    <ConverterEngine
      slug="liters-to-gallons"
      unit1Name="Liters"
      unit2Name="US Gallons"
      unit1Symbol="L"
      unit2Symbol="gal"
      convert1To2={(l) => l * 0.264172}
      convert2To1={(g) => g / 0.264172}
      formula1To2="gal = L × 0.264172"
      formula2To1="L = gal ÷ 0.264172"
      description={<p>Convert liters to US gallons. 1 liter is approximately 0.264 US liquid gallons.</p>}
    />
  );
}

export function GallonsToLiters() {
  return (
    <ConverterEngine
      slug="gallons-to-liters"
      unit1Name="US Gallons"
      unit2Name="Liters"
      unit1Symbol="gal"
      unit2Symbol="L"
      convert1To2={(g) => g / 0.264172}
      convert2To1={(l) => l * 0.264172}
      formula1To2="L = gal ÷ 0.264172"
      formula2To1="gal = L × 0.264172"
      description={<p>Convert US liquid gallons to liters.</p>}
    />
  );
}

export function MbToGb() {
  return (
    <ConverterEngine
      slug="mb-to-gb"
      unit1Name="Megabytes"
      unit2Name="Gigabytes"
      unit1Symbol="MB"
      unit2Symbol="GB"
      convert1To2={(mb) => mb / 1024}
      convert2To1={(gb) => gb * 1024}
      formula1To2="GB = MB ÷ 1024"
      formula2To1="MB = GB × 1024"
      description={<p>Convert Megabytes to Gigabytes. In computing, binary prefix (1024) is often used for storage.</p>}
    />
  );
}

export function GbToMb() {
  return (
    <ConverterEngine
      slug="gb-to-mb"
      unit1Name="Gigabytes"
      unit2Name="Megabytes"
      unit1Symbol="GB"
      unit2Symbol="MB"
      convert1To2={(gb) => gb * 1024}
      convert2To1={(mb) => mb / 1024}
      formula1To2="MB = GB × 1024"
      formula2To1="GB = MB ÷ 1024"
      description={<p>Convert Gigabytes to Megabytes using the base 1024 conversion standard.</p>}
    />
  );
}
