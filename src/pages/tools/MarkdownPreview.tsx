import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ToolPageShell from "@/components/ToolPageShell";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What Markdown syntax is supported?", answer: "This tool supports headings (#, ##, ###), bold (**text**), italic (*text*), inline code (`code`), code blocks (```), unordered lists (- item), ordered lists (1. item), links ([text](url)), blockquotes (> text), and horizontal rules (---)." },
  { question: "Is my Markdown saved?", answer: "No. Your Markdown stays entirely in your browser and is never sent to a server." },
  { question: "Can I use this for GitHub README files?", answer: "Yes. GitHub uses a superset of CommonMark. The basic syntax this tool previews is compatible with GitHub READMEs." },
  { question: "What is Markdown used for?", answer: "Markdown is a lightweight markup language used for writing documentation, README files, blog posts, notes, and chat messages in platforms like GitHub, Slack, Discord, and Notion." },
];

function parseMarkdown(md: string): string {
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks (must come before inline code)
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.slice(3, -3).trim();
    return `<pre class="bg-muted rounded-lg px-4 py-3 overflow-x-auto text-sm font-mono my-4"><code>${code}</code></pre>`;
  });

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-5 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>');

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-3">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="border-border my-6" />');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/__(.+?)__/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="list-disc ml-5">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, (m) => `<ul class="my-3 space-y-1">${m}</ul>`);

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="list-decimal ml-5">$1</li>');

  // Paragraphs — wrap remaining lines
  html = html.replace(/^(?!<[a-zA-Z]).+$/gm, (line) => {
    if (line.trim() === "") return "";
    return `<p class="leading-relaxed my-2">${line}</p>`;
  });

  return html;
}

const SAMPLE = `# Welcome to Markdown Preview

This tool renders **Markdown** in real time.

## Features

- **Bold text** with double asterisks
- *Italic text* with single asterisks
- \`Inline code\` with backticks

## Code Block

\`\`\`
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

> Blockquotes look like this.

[Visit TinyToolKit](https://tinytoolkit.com)
`;

export default function MarkdownPreview() {
  const [input, setInput] = useState(SAMPLE);
  const [view, setView] = useState<"split" | "preview">("split");

  return (
    <ToolPageShell
      toolId="markdown-preview"
      title="Markdown Preview"
      description="Write or paste Markdown on the left and see a live rendered HTML preview on the right. No server required."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-3">
        <div className="flex gap-2">
          {(["split", "preview"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg border text-sm capitalize transition-colors ${view === v ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
              data-testid={`button-view-${v}`}
            >
              {v === "split" ? "Split View" : "Preview Only"}
            </button>
          ))}
          <Button size="sm" variant="outline" onClick={() => setInput("")} className="ml-auto" data-testid="button-clear">Clear</Button>
        </div>

        <div className={`grid gap-4 ${view === "split" ? "md:grid-cols-2" : "grid-cols-1"}`}>
          {view === "split" && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Markdown</p>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[500px] resize-y font-mono text-sm"
                data-testid="textarea-input"
              />
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Preview</p>
            <div
              className="min-h-[500px] bg-card border border-border rounded-xl p-5 prose-sm overflow-auto text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(input) }}
              data-testid="div-preview"
            />
          </div>
        </div>
      </div>
    </ToolPageShell>
  );
}
