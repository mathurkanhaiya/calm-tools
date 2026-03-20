import { useState, useRef, useCallback } from "react";
import { Copy, RotateCcw, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  example: string;
  faq: { q: string; a: string }[];
  children: (props: { result: string; setResult: (v: string) => void }) => React.ReactNode;
}

const ToolCard = ({ icon, title, description, example, faq, children }: ToolCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [result, setResult] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(() => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Copied to clipboard");
    }
  }, [result]);

  const handleReset = useCallback(() => {
    setResult("");
    if (contentRef.current) {
      const inputs = contentRef.current.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        (input as HTMLInputElement).value = "";
      });
    }
  }, []);

  return (
    <div
      className={`rounded-lg border bg-card transition-all duration-[250ms] ease-out ${
        expanded ? "tool-card-shadow-hover" : "tool-card-shadow hover:tool-card-shadow-hover"
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 md:p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </span>
          <div>
            <h3 className="font-semibold text-card-foreground text-sm md:text-base">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{description}</p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-[250ms] ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div ref={contentRef} className="animate-fade-in-up border-t px-4 pb-5 pt-4 md:px-5">
          <div className="space-y-4">
            {children({ result, setResult })}

            {result && (
              <div className="animate-fade-in-up flex items-center justify-between rounded-lg bg-accent/10 px-4 py-3">
                <span className="font-semibold text-sm text-foreground">{result}</span>
                <div className="flex gap-1">
                  <button onClick={handleCopy} className="rounded-md p-1.5 hover:bg-accent/20 text-muted-foreground transition-colors" aria-label="Copy">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button onClick={handleReset} className="rounded-md p-1.5 hover:bg-accent/20 text-muted-foreground transition-colors" aria-label="Reset">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 space-y-3 border-t pt-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Example:</span> {example}
            </p>
            {faq.map((item, i) => (
              <details key={i} className="group text-xs">
                <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {item.q}
                </summary>
                <p className="mt-1 text-muted-foreground pl-0">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolCard;
