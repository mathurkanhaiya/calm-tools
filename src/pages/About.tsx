import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen flex flex-col">
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="https://i.ibb.co/jPLxnkzg/IMG-3246.jpg" alt="DailyTools Hub" className="h-8 w-8 rounded-lg object-cover" />
          <span className="font-semibold text-foreground text-sm">DailyTools Hub</span>
        </Link>
      </div>
    </header>

    <main className="flex-1 container py-12 md:py-20 max-w-2xl">
      <h1 className="text-3xl font-bold text-foreground mb-6">About DailyTools Hub</h1>

      <div className="prose prose-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>
          DailyTools Hub is a curated collection of essential everyday calculators and converters — built to be fast, reliable, and completely distraction-free. We believe simple tasks deserve simple tools.
        </p>
        <h2 className="text-lg font-semibold text-foreground !mt-8">Our Mission</h2>
        <p>
          We built DailyTools Hub because we were tired of bloated, ad-heavy tool websites that make simple calculations feel like a chore. Every tool here is handpicked for everyday usefulness, loads instantly, and works entirely in your browser — no accounts, no data collection, no friction.
        </p>
        <h2 className="text-lg font-semibold text-foreground !mt-8">What Makes Us Different</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Privacy-first:</strong> All calculations happen locally in your browser. We never store, transmit, or track your data.</li>
          <li><strong>Instant results:</strong> No loading spinners, no server calls. Every tool delivers answers the moment you type.</li>
          <li><strong>Curated, not crowded:</strong> We deliberately keep a small, high-quality set of tools rather than overwhelming you with hundreds of rarely-used utilities.</li>
          <li><strong>Mobile-friendly:</strong> Designed for one-handed use on any device, with large tap targets and clear labels.</li>
        </ul>
        <h2 className="text-lg font-semibold text-foreground !mt-8">Who It's For</h2>
        <p>
          Students doing quick homework calculations. Professionals splitting bills or converting units on the go. Anyone who values their time and wants tools that just work — without the noise.
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default About;
