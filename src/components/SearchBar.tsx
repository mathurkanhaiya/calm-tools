import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="relative mx-auto w-full max-w-md">
    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
    <input
      type="text"
      placeholder="Search tools..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border bg-card pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 tool-card-shadow transition-all"
    />
  </div>
);

export default SearchBar;
