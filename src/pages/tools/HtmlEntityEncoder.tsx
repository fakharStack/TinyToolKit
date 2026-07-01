import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What are HTML entities?", answer: "HTML entities are special character codes like &amp;, &lt;, and &gt; that represent characters which have special meaning in HTML. Using entities prevents the browser from interpreting them as HTML tags." },
  { question: "Why would I encode HTML entities?", answer: "To safely display HTML code inside a web page without it being interpreted as markup. For example, to show <div> on screen, you write &lt;div&gt; in the HTML source." },
  { question: "What characters are encoded?", answer: "The five characters with special meaning in HTML: < (less-than), > (greater-than), & (ampersand), \" (double quote), and ' (single quote/apostrophe)." },
  { question: "When would I decode HTML entities?", answer: "When you have HTML source code containing entities and want to get the actual characters back, for example when processing scraped web content." },
];

const ENCODE_MAP: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const DECODE_MAP: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'" };

const encode = (s: string) => s.replace(/[&<>"']/g, (c) => ENCODE_MAP[c] ?? c);
const decode = (s: string) => s.replace(/&(?:amp|lt|gt|quot|#39|apos);/g, (e) => DECODE_MAP[e] ?? e);

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const output = mode === "encode" ? encode(input) : decode(input);
  const { isCopied, copy } = useCopy();

  return (
    <ToolPageShell
      toolId="html-entity-encoder"
      title="HTML Entity Encoder / Decoder"
      description="Encode special characters to HTML entities (&amp;, &lt;, &gt;) or decode them back to plain text. Runs entirely in your browser."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => setMode("encode")}
            data-testid="button-mode-encode"
          >
            Encode
          </Button>
          <Button
            size="sm"
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => setMode("decode")}
            data-testid="button-mode-decode"
          >
            Decode
          </Button>
        </div>

        <div>
          <p className="text-sm font-medium mb-1.5">Input</p>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? '<div class="example">Hello & World</div>' : "&lt;div&gt;Hello &amp; World&lt;/div&gt;"}
            className="min-h-[150px] resize-y font-mono text-sm"
            data-testid="textarea-input"
          />
        </div>

        {input && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-medium">{mode === "encode" ? "Encoded Output" : "Decoded Output"}</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[150px] resize-y bg-muted/30 font-mono text-sm" data-testid="textarea-output" />
          </div>
        )}

        <Button variant="outline" onClick={() => setInput("")} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
