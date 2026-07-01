import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is a regular expression?", answer: "A regular expression (regex) is a pattern for matching text. For example, \\d+ matches one or more digits. Regex is widely used for search, validation, and text processing." },
  { question: "What are regex flags?", answer: "Flags modify how the pattern is applied. g = global (find all matches), i = case-insensitive, m = multiline (^ and $ match line boundaries), s = dotAll (. matches newlines)." },
  { question: "What does 'global' flag do?", answer: "Without g, the regex stops at the first match. With g, it finds all non-overlapping matches in the test string." },
  { question: "Why does my regex throw an error?", answer: "Invalid syntax will cause an error. Common mistakes include unescaped special characters (use \\. instead of . for a literal dot), unbalanced brackets, or invalid escape sequences." },
];

interface Match {
  start: number;
  end: number;
  text: string;
  groups: (string | undefined)[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testStr, setTestStr] = useState("Contact us at hello@example.com or support@tinytoolkit.com for help.");

  const flagStr = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join("");

  const { matches, error } = useMemo<{ matches: Match[]; error: string }>(() => {
    if (!pattern) return { matches: [], error: "" };
    try {
      const re = new RegExp(pattern, flagStr + (flagStr.includes("g") ? "" : "g"));
      const found: Match[] = [];
      let m: RegExpExecArray | null;
      while ((m = re.exec(testStr)) !== null) {
        found.push({ start: m.index, end: m.index + m[0].length, text: m[0], groups: m.slice(1) });
        if (!flagStr.includes("g")) break;
      }
      return { matches: found, error: "" };
    } catch (e: unknown) {
      return { matches: [], error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flagStr, testStr]);

  // Build highlighted segments
  const segments: { text: string; highlighted: boolean }[] = useMemo(() => {
    if (matches.length === 0) return [{ text: testStr, highlighted: false }];
    const segs: { text: string; highlighted: boolean }[] = [];
    let last = 0;
    for (const m of matches) {
      if (m.start > last) segs.push({ text: testStr.slice(last, m.start), highlighted: false });
      segs.push({ text: testStr.slice(m.start, m.end), highlighted: true });
      last = m.end;
    }
    if (last < testStr.length) segs.push({ text: testStr.slice(last), highlighted: false });
    return segs;
  }, [matches, testStr]);

  return (
    <ToolPageShell
      toolId="regex-tester"
      title="Regex Tester"
      description="Test and debug regular expressions live. See all matches highlighted, match indices, and capture groups in real time."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        {/* Pattern */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Pattern</label>
          <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-2 bg-card focus-within:ring-2 focus-within:ring-primary/30">
            <span className="text-muted-foreground font-mono text-lg select-none">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 font-mono text-sm bg-transparent outline-none"
              placeholder="enter pattern"
              data-testid="input-pattern"
            />
            <span className="text-muted-foreground font-mono text-lg select-none">/{flagStr}</span>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-destructive text-xs mt-2">
              <AlertCircle className="h-3.5 w-3.5" />{error}
            </div>
          )}
        </div>

        {/* Flags */}
        <div className="flex flex-wrap gap-2">
          {(["g", "i", "m", "s"] as const).map((f) => (
            <label key={f} className={`flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg border text-sm font-mono transition-colors select-none ${flags[f] ? "bg-primary/10 border-primary text-primary" : "border-border text-muted-foreground"}`}>
              <input type="checkbox" checked={flags[f]} onChange={(e) => setFlags((prev) => ({ ...prev, [f]: e.target.checked }))} className="hidden" />
              {f} <span className="text-xs opacity-70">{{ g: "global", i: "ignore case", m: "multiline", s: "dotAll" }[f]}</span>
            </label>
          ))}
        </div>

        {/* Test string */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Test String</label>
          <Textarea
            value={testStr}
            onChange={(e) => setTestStr(e.target.value)}
            className="min-h-[120px] resize-y font-mono text-sm"
            data-testid="textarea-test"
          />
        </div>

        {/* Result banner */}
        {pattern && !error && (
          <div className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm ${matches.length > 0 ? "bg-green-50 text-green-800 border border-green-200" : "bg-muted text-muted-foreground border border-border"}`}>
            {matches.length > 0
              ? <><CheckCircle2 className="h-4 w-4" /><strong>{matches.length}</strong> match{matches.length !== 1 ? "es" : ""} found</>
              : "No matches"}
          </div>
        )}

        {/* Highlighted preview */}
        {testStr && !error && (
          <div>
            <p className="text-sm font-medium mb-1.5">Match Highlights</p>
            <div className="bg-card border border-border rounded-xl px-4 py-3 font-mono text-sm leading-relaxed whitespace-pre-wrap break-all" data-testid="div-highlights">
              {segments.map((seg, i) =>
                seg.highlighted
                  ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{seg.text}</mark>
                  : <span key={i}>{seg.text}</span>
              )}
            </div>
          </div>
        )}

        {/* Match list */}
        {matches.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Matches</p>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <div key={i} className="bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm font-mono">
                  <div className="flex gap-4">
                    <span className="text-muted-foreground">#{i + 1}</span>
                    <span className="font-semibold text-primary">"{m.text}"</span>
                    <span className="text-muted-foreground text-xs self-center">index {m.start}–{m.end}</span>
                  </div>
                  {m.groups.length > 0 && m.groups.some(Boolean) && (
                    <div className="mt-1 pl-6 text-xs text-muted-foreground">
                      Groups: {m.groups.map((g, gi) => <span key={gi} className="mr-2">${gi + 1}="{g ?? "undefined"}"</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageShell>
  );
}
