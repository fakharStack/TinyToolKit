import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is URL encoding?", answer: "URL encoding converts special characters into a percent (%) followed by two hexadecimal digits so they can be safely transmitted in a URL. For example, a space becomes %20." },
  { question: "When do I need to URL encode?", answer: "Whenever you include user input in a URL query string — especially characters like spaces, &, =, #, and non-ASCII letters." },
  { question: "What is the difference between encodeURI and encodeURIComponent?", answer: "encodeURIComponent encodes more characters (including &, =, +, /) and is used for individual query parameter values. encodeURI is for encoding a full URL and preserves characters like / and :." },
  { question: "Does this encode the full URL or just a value?", answer: "This tool uses encodeURIComponent, best suited for encoding query parameter values, path segments, or any text that goes inside a URL." },
];

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const output = (() => { try { return encodeURIComponent(input); } catch { return ""; } })();
  const { isCopied, copy } = useCopy();

  return (
    <ToolPageShell
      toolId="url-encoder"
      title="URL Encoder"
      description="Encode special characters in any text using percent-encoding so it can be safely used inside a URL or query string."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1.5">Input</p>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="hello world & more=yes"
            className="min-h-[130px] resize-y font-mono text-sm"
            data-testid="textarea-input"
          />
        </div>

        {input && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-medium">Encoded Output</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[130px] resize-y bg-muted/30 font-mono text-sm break-all" data-testid="textarea-output" />
          </div>
        )}

        <Button variant="outline" onClick={() => setInput("")} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
