import { useState, useMemo } from "react";
import ToolCard from "./ToolCard";
import ToolInput from "./ToolInput";
import {
  Percent, Calendar, Activity, ArrowLeftRight, Banknote,
  Tag, Clock, FileText, Binary, Calculator
} from "lucide-react";

export const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");
  const result = useMemo(() => {
    if (value && percent) return `${((parseFloat(value) * parseFloat(percent)) / 100).toFixed(2)}`;
    return "";
  }, [value, percent]);

  return (
    <ToolCard
      icon={<Percent className="h-5 w-5" />}
      title="Percentage Calculator"
      description="Calculate percentages instantly"
      longDescription="Quickly find what any percentage of a number is. Whether you're calculating a tip, figuring out a discount, or working on school math, this tool gives you instant results. Simply enter the base value and the percentage you need — no formula memorization required. All processing happens in your browser for complete privacy."
      example="What is 15% of 200? → 30"
      faq={[
        { q: "How is percentage calculated?", a: "Multiply the value by the percentage and divide by 100. For example, 15% of 200 = 200 × 15 ÷ 100 = 30." },
        { q: "Can I use decimals?", a: "Yes, both the value and percentage fields accept decimal numbers for precise calculations." }
      ]}
      result={result}
      onReset={() => { setValue(""); setPercent(""); }}
    >
      <div className="grid grid-cols-2 gap-3">
        <ToolInput label="Value" placeholder="200" value={value} onChange={setValue} />
        <ToolInput label="Percentage" placeholder="15" value={percent} onChange={setPercent} suffix="%" />
      </div>
    </ToolCard>
  );
};

export const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const result = useMemo(() => {
    if (!dob) return "";
    const birth = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    return `${years} years, ${months} months, ${days} days`;
  }, [dob]);

  return (
    <ToolCard
      icon={<Calendar className="h-5 w-5" />}
      title="Age Calculator"
      description="Find your exact age"
      longDescription="Calculate your precise age in years, months, and days from your date of birth. This tool uses standard calendar arithmetic and correctly handles leap years, varying month lengths, and edge cases. Perfect for filling out official forms, calculating eligibility for age-restricted services, or simply satisfying your curiosity about exactly how old you are."
      example="Born Jan 1, 2000 → 26 years, 2 months, 19 days"
      faq={[
        { q: "Does it account for leap years?", a: "Yes, the calculation uses standard date arithmetic which accurately handles leap years and varying month lengths." },
        { q: "Is it accurate to the day?", a: "Yes, it calculates the exact difference between your birth date and today's date, down to the day." }
      ]}
      result={result}
      onReset={() => setDob("")}
    >
      <ToolInput label="Date of Birth" placeholder="" value={dob} onChange={setDob} type="date" />
    </ToolCard>
  );
};

export const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const result = useMemo(() => {
    if (!weight || !height) return "";
    const h = parseFloat(height) / 100;
    const bmi = parseFloat(weight) / (h * h);
    const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
    return `BMI ${bmi.toFixed(1)} (${cat})`;
  }, [weight, height]);

  return (
    <ToolCard
      icon={<Activity className="h-5 w-5" />}
      title="BMI Calculator"
      description="Check your Body Mass Index"
      longDescription="Body Mass Index (BMI) is a widely used screening tool that estimates body fat based on your weight and height. Enter your weight in kilograms and height in centimeters to get your BMI score along with a category label. While BMI doesn't measure body fat directly, it provides a useful starting point for understanding your weight status relative to your height."
      example="70 kg, 175 cm → BMI 22.9 (Normal)"
      faq={[
        { q: "What is a healthy BMI?", a: "A BMI between 18.5 and 24.9 is generally considered healthy for most adults. However, BMI doesn't account for muscle mass, bone density, or body composition." },
        { q: "Is BMI accurate for athletes?", a: "BMI may overestimate body fat in muscular individuals. Consult a healthcare professional for a comprehensive assessment." }
      ]}
      result={result}
      onReset={() => { setWeight(""); setHeight(""); }}
    >
      <div className="grid grid-cols-2 gap-3">
        <ToolInput label="Weight" placeholder="70" value={weight} onChange={setWeight} suffix="kg" />
        <ToolInput label="Height" placeholder="175" value={height} onChange={setHeight} suffix="cm" />
      </div>
    </ToolCard>
  );
};

export const UnitConverter = () => {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("km-mi");

  const conversions: Record<string, { label: string; fn: (v: number) => string }> = {
    "km-mi": { label: "km → miles", fn: (v) => `${(v * 0.621371).toFixed(4)} miles` },
    "mi-km": { label: "miles → km", fn: (v) => `${(v * 1.60934).toFixed(4)} km` },
    "kg-lb": { label: "kg → lbs", fn: (v) => `${(v * 2.20462).toFixed(4)} lbs` },
    "lb-kg": { label: "lbs → kg", fn: (v) => `${(v * 0.453592).toFixed(4)} kg` },
    "c-f": { label: "°C → °F", fn: (v) => `${((v * 9) / 5 + 32).toFixed(2)} °F` },
    "f-c": { label: "°F → °C", fn: (v) => `${(((v - 32) * 5) / 9).toFixed(2)} °C` },
  };

  const result = useMemo(() => {
    if (!value || isNaN(parseFloat(value))) return "";
    return conversions[mode].fn(parseFloat(value));
  }, [value, mode]);

  return (
    <ToolCard
      icon={<ArrowLeftRight className="h-5 w-5" />}
      title="Unit Converter"
      description="Convert between common units"
      longDescription="Instantly convert between the most commonly needed measurement units. Supports distance (kilometers to miles), weight (kilograms to pounds), and temperature (Celsius to Fahrenheit) conversions. Ideal for travel planning, cooking with international recipes, understanding weather forecasts, or any situation where you need quick, accurate unit conversions without searching for formulas."
      example="10 km → 6.2137 miles"
      faq={[
        { q: "What units are supported?", a: "Distance (km/miles), weight (kg/lbs), and temperature (°C/°F). More units may be added in the future." },
        { q: "How accurate are the conversions?", a: "Conversions use standard conversion factors and display results to 4 decimal places for distance/weight and 2 for temperature." }
      ]}
      result={result}
      onReset={() => setValue("")}
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Conversion</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
            {Object.entries(conversions).map(([k, v]) => (<option key={k} value={k}>{v.label}</option>))}
          </select>
        </div>
        <ToolInput label="Value" placeholder="10" value={value} onChange={setValue} />
      </div>
    </ToolCard>
  );
};

export const EMICalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const result = useMemo(() => {
    if (!principal || !rate || !tenure) return "";
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;
    if (r === 0) return `EMI: ${(p / n).toFixed(2)}/mo`;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return `EMI: ${emi.toFixed(2)}/mo | Total: ${(emi * n).toFixed(2)}`;
  }, [principal, rate, tenure]);

  return (
    <ToolCard
      icon={<Banknote className="h-5 w-5" />}
      title="Loan / EMI Calculator"
      description="Calculate monthly loan payments"
      longDescription="Plan your finances with this Equated Monthly Installment (EMI) calculator. Enter your loan amount, annual interest rate, and loan tenure to instantly see your monthly payment and total repayment amount. Works for home loans, car loans, personal loans, and education loans. Uses the standard amortization formula used by banks and financial institutions worldwide."
      example="₹5,00,000 at 8.5% for 5 years → ₹10,254/mo"
      faq={[
        { q: "What formula is used?", a: "EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is principal, r is monthly interest rate, and n is total number of months." },
        { q: "Does this include taxes or fees?", a: "This calculates the base EMI only. Actual payments may vary based on processing fees, insurance, and taxes charged by your lender." }
      ]}
      result={result}
      onReset={() => { setPrincipal(""); setRate(""); setTenure(""); }}
    >
      <div className="space-y-3">
        <ToolInput label="Loan Amount" placeholder="500000" value={principal} onChange={setPrincipal} />
        <div className="grid grid-cols-2 gap-3">
          <ToolInput label="Interest Rate" placeholder="8.5" value={rate} onChange={setRate} suffix="%" />
          <ToolInput label="Tenure" placeholder="5" value={tenure} onChange={setTenure} suffix="yrs" />
        </div>
      </div>
    </ToolCard>
  );
};

export const DiscountCalculator = () => {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const result = useMemo(() => {
    if (!price || !discount) return "";
    const p = parseFloat(price);
    const saved = (p * parseFloat(discount)) / 100;
    return `Final: ${(p - saved).toFixed(2)} (Save: ${saved.toFixed(2)})`;
  }, [price, discount]);

  return (
    <ToolCard
      icon={<Tag className="h-5 w-5" />}
      title="Discount Calculator"
      description="Find the price after discount"
      longDescription="Shopping smart starts with knowing exactly how much you'll save. Enter the original price and discount percentage to instantly see the final price and your total savings. Perfect for comparing deals during sales, calculating coupon savings, or negotiating prices. Works with any currency — just enter the numbers and get your answer."
      example="$120 with 25% off → $90 (you save $30)"
      faq={[
        { q: "How is discount calculated?", a: "Final price = Original price × (1 − discount/100). The savings amount is Original price × discount/100." },
        { q: "Can I calculate multiple discounts?", a: "This tool handles single-discount calculations. For stacked discounts, apply them sequentially using the final price as the new original." }
      ]}
      result={result}
      onReset={() => { setPrice(""); setDiscount(""); }}
    >
      <div className="grid grid-cols-2 gap-3">
        <ToolInput label="Original Price" placeholder="120" value={price} onChange={setPrice} />
        <ToolInput label="Discount" placeholder="25" value={discount} onChange={setDiscount} suffix="%" />
      </div>
    </ToolCard>
  );
};

export const TimeDurationCalculator = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const result = useMemo(() => {
    if (!start || !end) return "";
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let diff = eh * 60 + em - (sh * 60 + sm);
    if (diff < 0) diff += 24 * 60;
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  }, [start, end]);

  return (
    <ToolCard
      icon={<Clock className="h-5 w-5" />}
      title="Time Duration Calculator"
      description="Calculate time between two timestamps"
      longDescription="Find out exactly how many hours and minutes are between any two times. Enter a start and end time to get the precise duration. Handles overnight calculations automatically — so if your start time is 10 PM and end time is 6 AM, it correctly shows 8 hours. Great for tracking work hours, calculating shift lengths, or planning your daily schedule."
      example="09:00 to 17:30 → 8 hours 30 minutes"
      faq={[
        { q: "Does it handle overnight durations?", a: "Yes, if the end time is earlier than the start time, the calculator assumes the duration crosses midnight and adjusts automatically." },
        { q: "What time format should I use?", a: "Use the time picker which displays in 24-hour or 12-hour format depending on your device's locale settings." }
      ]}
      result={result}
      onReset={() => { setStart(""); setEnd(""); }}
    >
      <div className="grid grid-cols-2 gap-3">
        <ToolInput label="Start Time" placeholder="" value={start} onChange={setStart} type="time" />
        <ToolInput label="End Time" placeholder="" value={end} onChange={setEnd} type="time" />
      </div>
    </ToolCard>
  );
};

export const WordCounter = () => {
  const [text, setText] = useState("");
  const result = useMemo(() => {
    if (!text.trim()) return "";
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    return `${words} words · ${chars} chars · ${sentences} sentences`;
  }, [text]);

  return (
    <ToolCard
      icon={<FileText className="h-5 w-5" />}
      title="Word Counter"
      description="Count words, characters, and sentences"
      longDescription="Instantly count the number of words, characters, and sentences in any text. Paste an essay, article, social media post, or any content to get an accurate breakdown. Essential for writers meeting word count requirements, students checking essay lengths, social media managers fitting character limits, and anyone who needs to know the exact size of their text."
      example='"Hello world" → 2 words, 11 characters'
      faq={[
        { q: "How are sentences counted?", a: "Sentences are split by periods, exclamation marks, and question marks. Multiple consecutive punctuation marks are treated as a single separator." },
        { q: "Does it count spaces in characters?", a: "Yes, the character count includes all characters — letters, numbers, spaces, and punctuation." }
      ]}
      result={result}
      onReset={() => setText("")}
    >
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Your text</label>
        <textarea placeholder="Paste or type your text here..." value={text} onChange={(e) => setText(e.target.value)} rows={3} className="w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
      </div>
    </ToolCard>
  );
};

export const BinaryDecimalConverter = () => {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"dec-bin" | "bin-dec">("dec-bin");
  const result = useMemo(() => {
    if (!value) return "";
    try {
      if (mode === "dec-bin") return `Binary: ${(parseInt(value, 10) >>> 0).toString(2)}`;
      return `Decimal: ${parseInt(value, 2)}`;
    } catch { return "Invalid input"; }
  }, [value, mode]);

  return (
    <ToolCard
      icon={<Binary className="h-5 w-5" />}
      title="Binary ↔ Decimal"
      description="Convert between binary and decimal"
      longDescription="Convert numbers between binary (base-2) and decimal (base-10) number systems. Essential for computer science students learning about binary representation, programmers debugging low-level code, or anyone curious about how computers store and process numbers. Supports conversion in both directions with instant results."
      example="42 → 101010"
      faq={[
        { q: "What number range is supported?", a: "Any standard integer within JavaScript's 32-bit range. For decimal to binary, the unsigned 32-bit representation is used." },
        { q: "Can I convert negative numbers?", a: "Negative decimal numbers are converted to their unsigned 32-bit binary representation (two's complement)." }
      ]}
      result={result}
      onReset={() => setValue("")}
    >
      <div className="space-y-3">
        <div className="flex gap-2">
          <button onClick={() => { setMode("dec-bin"); setValue(""); }} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "dec-bin" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Dec → Bin</button>
          <button onClick={() => { setMode("bin-dec"); setValue(""); }} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "bin-dec" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Bin → Dec</button>
        </div>
        <ToolInput label={mode === "dec-bin" ? "Decimal" : "Binary"} placeholder={mode === "dec-bin" ? "42" : "101010"} value={value} onChange={setValue} type="text" />
      </div>
    </ToolCard>
  );
};

export const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState("15");
  const [people, setPeople] = useState("1");
  const result = useMemo(() => {
    if (!bill) return "";
    const b = parseFloat(bill);
    const t = parseFloat(tipPct || "0");
    const p = parseInt(people || "1", 10) || 1;
    const tip = (b * t) / 100;
    const total = b + tip;
    return `Tip: ${tip.toFixed(2)} · Total: ${total.toFixed(2)} · Per person: ${(total / p).toFixed(2)}`;
  }, [bill, tipPct, people]);

  return (
    <ToolCard
      icon={<Calculator className="h-5 w-5" />}
      title="Tip Calculator"
      description="Split bills and calculate tips"
      longDescription="Easily calculate how much to tip and split the bill among friends. Enter the total bill amount, choose your tip percentage, and specify the number of people sharing the cost. Instantly see the tip amount, total with tip, and each person's share. Takes the awkwardness out of splitting restaurant bills and ensures everyone pays their fair share."
      example="$80 bill, 18% tip, 4 people → $23.60 each"
      faq={[
        { q: "What tip percentage is standard?", a: "In the US, 15–20% is standard for sit-down restaurants. 10–15% is common for counter service. Adjust based on your location and service quality." },
        { q: "Does it round the amounts?", a: "Results are shown to 2 decimal places. You can round up or down as you prefer when paying." }
      ]}
      result={result}
      onReset={() => { setBill(""); setTipPct("15"); setPeople("1"); }}
    >
      <div className="space-y-3">
        <ToolInput label="Bill Amount" placeholder="80" value={bill} onChange={setBill} />
        <div className="grid grid-cols-2 gap-3">
          <ToolInput label="Tip" placeholder="15" value={tipPct} onChange={setTipPct} suffix="%" />
          <ToolInput label="People" placeholder="1" value={people} onChange={setPeople} />
        </div>
      </div>
    </ToolCard>
  );
};
