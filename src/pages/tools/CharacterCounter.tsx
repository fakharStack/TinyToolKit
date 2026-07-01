import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ToolPageShell from "@/components/ToolPageShell";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What counts as a character?", answer: "Every symbol including letters, numbers, spaces, punctuation, emoji, and special characters counts as one character." },
  { question: "What is the difference between characters and characters without spaces?", answer: "The 'characters with spaces' count includes every character. 'Without spaces' removes all whitespace (spaces, tabs, newlines) before counting." },
  { question: "Can I use this for Twitter or SMS character limits?", answer: "Yes. Twitter allows 280 characters and standard SMS allows 160 characters. Watch the character count to stay within limits." },
  { question: "Is my text saved?", answer: "No. All counting happens in your browser. Your text is never sent to a server." },
];

export default function CharacterCounter() {
  const [text, setText] = useState("");

  const total = text.length;
  const noSpaces = text.replace(/\s/g, "").length;
  const letters = (text.match(/[a-zA-Z]/g) ?? []).length;
  const digits = (text.match(/\d/g) ?? []).length;
  const spaces = (text.match(/\s/g) ?? []).length;
  const special = total - letters - digits - spaces;

  const freqMap: Record<string, number> = {};
  for (const ch of text.toLowerCase()) {
    if (ch.trim() && /[a-z]/i.test(ch)) freqMap[ch] = (freqMap[ch] ?? 0) + 1;
  }
  const topChars = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <ToolPageShell
      toolId="character-counter"
      title="Character Counter"
      description="Count characters with and without spaces, plus see a breakdown by letters, digits, and special characters."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="min-h-[200px] resize-y font-mono text-sm"
          data-testid="textarea-character-counter"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Total Characters", value: total },
            { label: "Without Spaces", value: noSpaces },
            { label: "Letters", value: letters },
            { label: "Digits", value: digits },
            { label: "Spaces", value: spaces },
            { label: "Special Characters", value: special },
          ].map((s) => (
            <div key={s.label} className="bg-muted/50 border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {topChars.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm font-semibold mb-3">Top Characters</p>
            <div className="flex flex-wrap gap-2">
              {topChars.map(([ch, count]) => (
                <div key={ch} className="flex items-center gap-1.5 bg-muted rounded-md px-3 py-1.5 text-sm">
                  <span className="font-mono font-bold text-primary">"{ch}"</span>
                  <span className="text-muted-foreground">×{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button variant="outline" onClick={() => setText("")} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
