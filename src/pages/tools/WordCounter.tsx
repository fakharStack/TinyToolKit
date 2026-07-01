import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ToolPageShell from "@/components/ToolPageShell";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "How does the word counter work?", answer: "It splits your text by whitespace to count words, and counts every character including spaces for the character count." },
  { question: "Is my text stored anywhere?", answer: "No. Everything runs in your browser. Your text never leaves your device." },
  { question: "How is reading time calculated?", answer: "Reading time is estimated at 200 words per minute, which is the average adult reading speed." },
  { question: "Does it count punctuation as characters?", answer: "Yes, every character including spaces, punctuation, and special symbols is counted in the total character count." },
];

function getStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const lines = text === "" ? 0 : text.split("\n").length;
  const sentences = trimmed === "" ? 0 : (trimmed.match(/[.!?]+/g) ?? []).length;
  const paragraphs = trimmed === "" ? 0 : trimmed.split(/\n{2,}/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  return { words, chars, charsNoSpaces, lines, sentences, paragraphs, readingTime };
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = getStats(text);

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.chars },
    { label: "Chars (no spaces)", value: stats.charsNoSpaces },
    { label: "Lines", value: stats.lines },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading time", value: `${stats.readingTime} min` },
  ];

  return (
    <ToolPageShell
      toolId="word-counter"
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs, and reading time in real time. Paste or type your text below."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="min-h-[220px] resize-y font-mono text-sm"
          data-testid="textarea-word-counter"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statItems.map((s) => (
            <div key={s.label} className="bg-muted/50 border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={() => setText("")} data-testid="button-clear">
          Clear
        </Button>
      </div>
    </ToolPageShell>
  );
}
