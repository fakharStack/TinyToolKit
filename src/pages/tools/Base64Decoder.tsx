import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertCircle } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What does Base64 decoding do?", answer: "It converts a Base64 encoded string back to the original plain text, binary data, or Unicode characters." },
  { question: "When will decoding fail?", answer: "If the input is not valid Base64 — for example if it contains characters outside the Base64 alphabet or has incorrect padding — the tool will show an error." },
  { question: "Should I remove spaces or line breaks from the input?", answer: "Yes. Standard Base64 is a continuous string. If your Base64 has line breaks (common in email), remove them before pasting." },
  { question: "Can this decode Base64 images?", answer: "This tool decodes Base64 as text. If your Base64 represents an image it will decode to binary/unreadable characters. Use a dedicated image Base64 tool for images." },
];

export default function Base64Decoder() {
  const [input, setInput] = useState("");
  const { isCopied, copy } = useCopy();

  let output = "";
  let hasError = false;
  if (input.trim()) {
    try {
      output = decodeURIComponent(escape(atob(input.trim())));
    } catch {
      hasError = true;
    }
  }

  return (
    <ToolPageShell
      toolId="base64-decoder"
      title="Base64 Decoder"
      description="Decode any Base64 encoded string back to plain text with automatic error detection. Everything runs in your browser."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1.5">Base64 Input</p>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SGVsbG8gV29ybGQ="
            className="min-h-[130px] resize-y font-mono text-sm break-all"
            data-testid="textarea-input"
          />
        </div>

        {input.trim() && hasError && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Invalid Base64 string. Check for typos or missing padding characters (=).</span>
          </div>
        )}

        {input.trim() && !hasError && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-medium">Decoded Text</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[130px] resize-y bg-muted/30 font-mono text-sm" data-testid="textarea-output" />
          </div>
        )}

        <Button variant="outline" onClick={() => setInput("")} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
