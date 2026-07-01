import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function buildFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="max-w-3xl mx-auto" aria-label="FAQ">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl overflow-hidden"
            data-testid={`faq-item-${i}`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-sm md:text-base hover:bg-muted/40 transition-colors"
              aria-expanded={openIndex === i}
              data-testid={`faq-toggle-${i}`}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground shrink-0 ml-3 transition-transform duration-200",
                  openIndex === i && "rotate-180"
                )}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
