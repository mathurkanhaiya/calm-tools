import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import {
  PercentageCalculator,
  AgeCalculator,
  BMICalculator,
  UnitConverter,
  EMICalculator,
  DiscountCalculator,
  TimeDurationCalculator,
  WordCounter,
  BinaryDecimalConverter,
  TipCalculator,
} from "@/components/Tools";

const TOOLS = [
  { key: "percentage", keywords: "percentage percent calculate", Component: PercentageCalculator },
  { key: "age", keywords: "age birthday birth date", Component: AgeCalculator },
  { key: "bmi", keywords: "bmi body mass index weight health", Component: BMICalculator },
  { key: "unit", keywords: "unit convert km miles kg lbs temperature celsius fahrenheit", Component: UnitConverter },
  { key: "emi", keywords: "loan emi mortgage payment interest", Component: EMICalculator },
  { key: "discount", keywords: "discount sale price off savings", Component: DiscountCalculator },
  { key: "time", keywords: "time duration hours minutes clock", Component: TimeDurationCalculator },
  { key: "word", keywords: "word count character sentence text", Component: WordCounter },
  { key: "binary", keywords: "binary decimal convert number", Component: BinaryDecimalConverter },
  { key: "tip", keywords: "tip calculator bill split restaurant", Component: TipCalculator },
];

const Index = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return TOOLS;
    const q = search.toLowerCase();
    return TOOLS.filter((t) => t.keywords.includes(q) || t.key.includes(q));
  }, [search]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2.5">
            <img
              src="https://i.ibb.co/jPLxnkzg/IMG-3246.jpg"
              alt="DailyTools Hub"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="font-semibold text-foreground text-sm">DailyTools Hub</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Instant results. No friction.
          </span>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="container pt-16 pb-12 md:pt-24 md:pb-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Essential tools.{" "}
            <span className="text-primary">Nothing more.</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Fast, reliable, and distraction-free.
          </p>
          <div className="mt-8">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </section>

        {/* Tools */}
        <section className="container pb-16">
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map(({ key, Component }) => (
              <Component key={key} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-8 text-sm">
              No tools found. Try a different search.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
