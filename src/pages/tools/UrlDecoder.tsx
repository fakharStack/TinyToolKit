import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertCircle } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is URL decoding?", answer: "URL decoding converts percent-encoded sequences (like %20 or %2F) back into their original characters. It reverses the URL encoding process." },
  { question: "What does %20 decode to?", answer: "%20 decodes to a space character. Common codes include %2F (/) and %26 (&)." },
  { question: "When would decoding fail?", answer: "If the input contains invalid percent sequences (e.g. %GG or a lone %) it is malformed and cannot be decoded. The tool will show an error in that case." },
  { question: "Can I decode a full URL?", answer: "Yes, paste the full URL and the tool will decode all percent-encoded sequences in it." },
];

export default function UrlDecoder() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { isCopied, copy } = useCopy();

  let output = "";
  let hasError = false;
  if (input) {
    try {
      output = decodeURIComponent(input);
      hasError = false;
    } catch {
      output = "";
      hasError = true;
    }
  }

  return (
    <ToolPageShell
      toolId="url-decoder"
      title="URL Decoder"
      description="Decode percent-encoded URLs back to human-readable text instantly. Paste any URL-encoded string and see the result."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1.5">Encoded Input</p>
          <Textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(""); }}
            placeholder="hello%20world%20%26%20more%3Dyes"
            className="min-h-[130px] resize-y font-mono text-sm"
            data-testid="textarea-input"
          />
        </div>

        {input && hasError && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Invalid URL encoding. Check for malformed percent sequences.</span>
          </div>
        )}

        {input && !hasError && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-medium">Decoded Output</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[130px] resize-y bg-muted/30 font-mono text-sm" data-testid="textarea-output" />
          </div>
        )}

        <Button variant="outline" onClick={() => { setInput(""); setError(""); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
