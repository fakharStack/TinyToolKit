import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is a URL slug?", answer: "A slug is the human-readable part of a URL that identifies a page. For example, in /blog/how-to-create-a-website, the slug is how-to-create-a-website." },
  { question: "Why are slugs important for SEO?", answer: "Search engines use URL slugs to understand page content. A descriptive, keyword-rich slug can improve rankings and is easier for users to read and remember." },
  { question: "What characters are allowed in a slug?", answer: "Only lowercase letters (a-z), numbers (0-9), and hyphens (-). All other characters including spaces, special symbols, and accented letters are removed or converted." },
  { question: "How are accented characters handled?", answer: "Accented characters like é, ñ, or ü are normalized to their closest ASCII equivalent (e, n, u) before converting to a slug." },
];

function toSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const { isCopied, copy } = useCopy();
  const slug = toSlug(input);

  return (
    <ToolPageShell
      toolId="slug-generator"
      title="URL Slug Generator"
      description="Convert any title or text into a clean, SEO-friendly URL slug with proper hyphenation and special character removal."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1.5">Title or Text</p>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How to Create a WhatsApp Link in 2026"
            className="font-mono"
            data-testid="input-slug-source"
          />
        </div>

        {slug && (
          <div className="bg-muted/30 border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Generated Slug</p>
              <Button size="sm" variant="ghost" onClick={() => copy(slug)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
              </Button>
            </div>
            <p className="font-mono text-primary text-lg break-all" data-testid="text-slug-output">{slug}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Full example URL: <span className="font-mono">https://example.com/<span className="text-primary">{slug}</span></span>
            </p>
          </div>
        )}

        <Button variant="outline" onClick={() => setInput("")} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
