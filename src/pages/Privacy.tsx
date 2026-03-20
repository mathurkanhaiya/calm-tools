import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Privacy = () => (
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
      <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground mb-8">Last updated: March 20, 2026</p>

      <div className="prose prose-sm text-muted-foreground space-y-4 leading-relaxed">
        <h2 className="text-lg font-semibold text-foreground !mt-6">1. Information We Collect</h2>
        <p>
          DailyTools Hub does not collect, store, or transmit any personal information. All calculations and conversions are performed entirely within your browser. No data ever leaves your device.
        </p>

        <h2 className="text-lg font-semibold text-foreground !mt-6">2. Cookies & Tracking</h2>
        <p>
          We do not use cookies for tracking purposes. If third-party services (such as advertising partners) are integrated in the future, they may use cookies in accordance with their own privacy policies. We will update this page accordingly.
        </p>

        <h2 className="text-lg font-semibold text-foreground !mt-6">3. Third-Party Services</h2>
        <p>
          This website may display advertisements through Google AdSense or similar services. These services may collect anonymized usage data subject to their own privacy policies. We encourage you to review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google's Privacy Policy</a> for more information.
        </p>

        <h2 className="text-lg font-semibold text-foreground !mt-6">4. Data Security</h2>
        <p>
          Since we do not collect or store personal data, the risk of data breaches is minimal. Our site is served over HTTPS to ensure a secure browsing experience.
        </p>

        <h2 className="text-lg font-semibold text-foreground !mt-6">5. Children's Privacy</h2>
        <p>
          Our tools are suitable for users of all ages. We do not knowingly collect any personal information from children or adults.
        </p>

        <h2 className="text-lg font-semibold text-foreground !mt-6">6. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date.
        </p>

        <h2 className="text-lg font-semibold text-foreground !mt-6">7. Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please visit our <Link to="/contact" className="text-primary underline">Contact page</Link>.
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default Privacy;
