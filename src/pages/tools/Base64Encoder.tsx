import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertCircle } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is Base64 encoding?", answer: "Base64 is an encoding scheme that converts binary or text data into a string of ASCII characters using 64 printable characters. It is commonly used to embed images in HTML/CSS or transmit data safely over text-based protocols." },
  { question: "Does Base64 encrypt my data?", answer: "No. Base64 is encoding, not encryption. Anyone can decode a Base64 string instantly. Do not use it for security purposes." },
  { question: "Why does the output end with = signs?", answer: "The = character is padding added to make the Base64 output length a multiple of 4. It is part of the standard format." },
  { question: "Does this support Unicode / non-ASCII text?", answer: "Yes. The tool correctly handles Unicode characters including emoji by converting the text through UTF-8 before encoding." },
];

export default function Base64Encoder() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { isCopied, copy } = useCopy();

  let output = "";
  let hasError = false;
  if (input) {
    try {
      output = btoa(unescape(encodeURIComponent(input)));
    } catch {
      hasError = true;
    }
  }

  return (
    <ToolPageShell
      toolId="base64-encoder"
      title="Base64 Encoder"
      description="Encode any plain text or Unicode string to Base64 format instantly in your browser. No data is sent to any server."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1.5">Plain Text Input</p>
          <Textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(""); }}
            placeholder="Enter text to encode..."
            className="min-h-[130px] resize-y font-mono text-sm"
            data-testid="textarea-input"
          />
        </div>

        {input && hasError && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Could not encode. Check for unsupported characters.</span>
          </div>
        )}

        {input && !hasError && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-medium">Base64 Output</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[130px] resize-y bg-muted/30 font-mono text-sm break-all" data-testid="textarea-output" />
          </div>
        )}

        <Button variant="outline" onClick={() => { setInput(""); setError(""); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
