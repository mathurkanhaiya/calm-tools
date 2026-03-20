import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t mt-20">
    <div className="container py-10">
      <div className="grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <h4 className="font-semibold text-foreground mb-2">About</h4>
          <p className="text-muted-foreground leading-relaxed mb-2">
            DailyTools Hub is a curated collection of essential everyday tools — built to be fast, reliable, and distraction-free.
          </p>
          <Link to="/about" className="text-primary text-xs underline hover:text-primary/80 transition-colors">Learn more →</Link>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">Privacy</h4>
          <p className="text-muted-foreground leading-relaxed mb-2">
            All calculations happen in your browser. We don't store your data or track your usage.
          </p>
          <Link to="/privacy" className="text-primary text-xs underline hover:text-primary/80 transition-colors">Privacy Policy →</Link>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">Contact</h4>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Have feedback or suggestions? We'd love to hear from you.
          </p>
          <Link to="/contact" className="text-primary text-xs underline hover:text-primary/80 transition-colors">Get in touch →</Link>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DailyTools Hub. Simple tools that just work.
      </div>
    </div>
  </footer>
);

export default Footer;
