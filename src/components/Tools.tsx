import { useState, useEffect } from "react";
import ToolCard from "./ToolCard";
import ToolInput from "./ToolInput";
import {
  Percent, Calendar, Activity, ArrowLeftRight, Banknote,
  Tag, Clock, FileText, Binary, Calculator
} from "lucide-react";

/* ─── Percentage Calculator ─── */
export const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");

  return (
    <ToolCard
      icon={<Percent className="h-5 w-5" />}
      title="Percentage Calculator"
      description="Calculate percentages instantly"
      example="What is 15% of 200? → 30"
      faq={[
        { q: "How is percentage calculated?", a: "Multiply the value by the percentage and divide by 100." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (value && percent) {
            setResult(`${((parseFloat(value) * parseFloat(percent)) / 100).toFixed(2)}`);
          }
        }, [value, percent, setResult]);
        return (
          <div className="grid grid-cols-2 gap-3">
            <ToolInput label="Value" placeholder="200" value={value} onChange={setValue} />
            <ToolInput label="Percentage" placeholder="15" value={percent} onChange={setPercent} suffix="%" />
          </div>
        );
      }}
    </ToolCard>
  );
};

/* ─── Age Calculator ─── */
export const AgeCalculator = () => {
  const [dob, setDob] = useState("");

  return (
    <ToolCard
      icon={<Calendar className="h-5 w-5" />}
      title="Age Calculator"
      description="Find your exact age"
      example="Born Jan 1, 2000 → 26 years, 2 months, 19 days"
      faq={[
        { q: "Does it account for leap years?", a: "Yes, the calculation uses standard date arithmetic which handles leap years." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (dob) {
            const birth = new Date(dob);
            const today = new Date();
            let years = today.getFullYear() - birth.getFullYear();
            let months = today.getMonth() - birth.getMonth();
            let days = today.getDate() - birth.getDate();
            if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
            if (months < 0) { years--; months += 12; }
            setResult(`${years} years, ${months} months, ${days} days`);
          }
        }, [dob, setResult]);
        return <ToolInput label="Date of Birth" placeholder="" value={dob} onChange={setDob} type="date" />;
      }}
    </ToolCard>
  );
};

/* ─── BMI Calculator ─── */
export const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  return (
    <ToolCard
      icon={<Activity className="h-5 w-5" />}
      title="BMI Calculator"
      description="Check your Body Mass Index"
      example="70 kg, 175 cm → BMI 22.9 (Normal)"
      faq={[
        { q: "What is a healthy BMI?", a: "A BMI between 18.5 and 24.9 is generally considered healthy." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (weight && height) {
            const h = parseFloat(height) / 100;
            const bmi = parseFloat(weight) / (h * h);
            const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
            setResult(`BMI ${bmi.toFixed(1)} (${cat})`);
          }
        }, [weight, height, setResult]);
        return (
          <div className="grid grid-cols-2 gap-3">
            <ToolInput label="Weight" placeholder="70" value={weight} onChange={setWeight} suffix="kg" />
            <ToolInput label="Height" placeholder="175" value={height} onChange={setHeight} suffix="cm" />
          </div>
        );
      }}
    </ToolCard>
  );
};

/* ─── Unit Converter ─── */
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

  return (
    <ToolCard
      icon={<ArrowLeftRight className="h-5 w-5" />}
      title="Unit Converter"
      description="Convert between common units"
      example="10 km → 6.2137 miles"
      faq={[
        { q: "What units are supported?", a: "Distance (km/miles), weight (kg/lbs), and temperature (°C/°F)." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (value) setResult(conversions[mode].fn(parseFloat(value)));
        }, [value, mode, setResult]);
        return (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Conversion</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                {Object.entries(conversions).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <ToolInput label="Value" placeholder="10" value={value} onChange={setValue} />
          </div>
        );
      }}
    </ToolCard>
  );
};

/* ─── Loan / EMI Calculator ─── */
export const EMICalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");

  return (
    <ToolCard
      icon={<Banknote className="h-5 w-5" />}
      title="Loan / EMI Calculator"
      description="Calculate monthly loan payments"
      example="₹5,00,000 at 8.5% for 5 years → ₹10,254/mo"
      faq={[
        { q: "What formula is used?", a: "EMI = P × r × (1+r)^n / ((1+r)^n − 1), where r is monthly rate and n is total months." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (principal && rate && tenure) {
            const p = parseFloat(principal);
            const r = parseFloat(rate) / 12 / 100;
            const n = parseFloat(tenure) * 12;
            if (r === 0) { setResult(`EMI: ${(p / n).toFixed(2)}/mo`); return; }
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setResult(`EMI: ${emi.toFixed(2)}/mo | Total: ${(emi * n).toFixed(2)}`);
          }
        }, [principal, rate, tenure, setResult]);
        return (
          <div className="space-y-3">
            <ToolInput label="Loan Amount" placeholder="500000" value={principal} onChange={setPrincipal} />
            <div className="grid grid-cols-2 gap-3">
              <ToolInput label="Interest Rate" placeholder="8.5" value={rate} onChange={setRate} suffix="%" />
              <ToolInput label="Tenure" placeholder="5" value={tenure} onChange={setTenure} suffix="yrs" />
            </div>
          </div>
        );
      }}
    </ToolCard>
  );
};

/* ─── Discount Calculator ─── */
export const DiscountCalculator = () => {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  return (
    <ToolCard
      icon={<Tag className="h-5 w-5" />}
      title="Discount Calculator"
      description="Find the price after discount"
      example="$120 with 25% off → $90 (you save $30)"
      faq={[
        { q: "How is discount calculated?", a: "Final price = Original price × (1 − discount/100)." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (price && discount) {
            const p = parseFloat(price);
            const d = parseFloat(discount);
            const saved = (p * d) / 100;
            setResult(`Final: ${(p - saved).toFixed(2)} (Save: ${saved.toFixed(2)})`);
          }
        }, [price, discount, setResult]);
        return (
          <div className="grid grid-cols-2 gap-3">
            <ToolInput label="Original Price" placeholder="120" value={price} onChange={setPrice} />
            <ToolInput label="Discount" placeholder="25" value={discount} onChange={setDiscount} suffix="%" />
          </div>
        );
      }}
    </ToolCard>
  );
};

/* ─── Time Duration Calculator ─── */
export const TimeDurationCalculator = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <ToolCard
      icon={<Clock className="h-5 w-5" />}
      title="Time Duration Calculator"
      description="Calculate time between two timestamps"
      example="09:00 to 17:30 → 8 hours 30 minutes"
      faq={[
        { q: "Does it handle overnight durations?", a: "Currently supports same-day calculations. For overnight, the end time should be after start." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (start && end) {
            const [sh, sm] = start.split(":").map(Number);
            const [eh, em] = end.split(":").map(Number);
            let diff = eh * 60 + em - (sh * 60 + sm);
            if (diff < 0) diff += 24 * 60;
            setResult(`${Math.floor(diff / 60)}h ${diff % 60}m`);
          }
        }, [start, end, setResult]);
        return (
          <div className="grid grid-cols-2 gap-3">
            <ToolInput label="Start Time" placeholder="" value={start} onChange={setStart} type="time" />
            <ToolInput label="End Time" placeholder="" value={end} onChange={setEnd} type="time" />
          </div>
        );
      }}
    </ToolCard>
  );
};

/* ─── Word Counter ─── */
export const WordCounter = () => {
  const [text, setText] = useState("");

  return (
    <ToolCard
      icon={<FileText className="h-5 w-5" />}
      title="Word Counter"
      description="Count words, characters, and sentences"
      example='"Hello world" → 2 words, 11 characters'
      faq={[
        { q: "How are sentences counted?", a: "Sentences are split by periods, exclamation marks, and question marks." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (text.trim()) {
            const words = text.trim().split(/\s+/).length;
            const chars = text.length;
            const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
            setResult(`${words} words · ${chars} chars · ${sentences} sentences`);
          } else {
            setResult("");
          }
        }, [text, setResult]);
        return (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Your text</label>
            <textarea
              placeholder="Paste or type your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
          </div>
        );
      }}
    </ToolCard>
  );
};

/* ─── Binary ↔ Decimal Converter ─── */
export const BinaryDecimalConverter = () => {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"dec-bin" | "bin-dec">("dec-bin");

  return (
    <ToolCard
      icon={<Binary className="h-5 w-5" />}
      title="Binary ↔ Decimal"
      description="Convert between binary and decimal"
      example="42 → 101010"
      faq={[
        { q: "What number range is supported?", a: "Any standard integer within JavaScript's safe integer range." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (value) {
            try {
              if (mode === "dec-bin") {
                setResult(`Binary: ${(parseInt(value, 10) >>> 0).toString(2)}`);
              } else {
                setResult(`Decimal: ${parseInt(value, 2)}`);
              }
            } catch {
              setResult("Invalid input");
            }
          }
        }, [value, mode, setResult]);
        return (
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => { setMode("dec-bin"); setValue(""); }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "dec-bin" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                Dec → Bin
              </button>
              <button
                onClick={() => { setMode("bin-dec"); setValue(""); }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "bin-dec" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                Bin → Dec
              </button>
            </div>
            <ToolInput
              label={mode === "dec-bin" ? "Decimal" : "Binary"}
              placeholder={mode === "dec-bin" ? "42" : "101010"}
              value={value}
              onChange={setValue}
              type="text"
            />
          </div>
        );
      }}
    </ToolCard>
  );
};

/* ─── Tip Calculator ─── */
export const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState("15");
  const [people, setPeople] = useState("1");

  return (
    <ToolCard
      icon={<Calculator className="h-5 w-5" />}
      title="Tip Calculator"
      description="Split bills and calculate tips"
      example="$80 bill, 18% tip, 4 people → $4.60 each"
      faq={[
        { q: "What tip percentage is standard?", a: "15–20% is standard in most countries. Adjust based on service quality." },
      ]}
    >
      {({ setResult }) => {
        useEffect(() => {
          if (bill) {
            const b = parseFloat(bill);
            const t = parseFloat(tipPct || "0");
            const p = parseInt(people || "1", 10) || 1;
            const tip = (b * t) / 100;
            const total = b + tip;
            setResult(`Tip: ${tip.toFixed(2)} · Total: ${total.toFixed(2)} · Per person: ${(total / p).toFixed(2)}`);
          }
        }, [bill, tipPct, people, setResult]);
        return (
          <div className="space-y-3">
            <ToolInput label="Bill Amount" placeholder="80" value={bill} onChange={setBill} />
            <div className="grid grid-cols-2 gap-3">
              <ToolInput label="Tip" placeholder="15" value={tipPct} onChange={setTipPct} suffix="%" />
              <ToolInput label="People" placeholder="1" value={people} onChange={setPeople} />
            </div>
          </div>
        );
      }}
    </ToolCard>
  );
};
