import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ToolCard from "@/components/ToolCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdContainer from "@/components/AdContainer";
import { tools, TOOL_CATEGORIES, type ToolCategory } from "@/data/tools";
import { cn } from "@/lib/utils";

export default function Tools() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [query, activeCategory]);

  return (
    <>
      <Helmet>
        <title>All Free Online Tools — TinyToolKit</title>
        <meta
          name="description"
          content="Browse all free online utility tools. WhatsApp link generator, message formatter, and more. No signup, no cost, 100% client-side."
        />
        <link rel="canonical" href="https://tinytoolkit.com/tools" />
        <meta property="og:title" content="All Free Online Tools — TinyToolKit" />
        <meta property="og:description" content="Browse free WhatsApp tools and more. Instant, free, no login." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-5xl py-10">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Tools" }]} />
        </div>

        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">All Free Tools</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Utility tools built to save you time. 100% free, no login required, and everything runs in your browser.
          </p>
        </motion.header>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-tools"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-category-${cat}`}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tool count */}
        <p className="text-sm text-muted-foreground mb-5">
          {filtered.length} tool{filtered.length !== 1 ? "s" : ""} found
          {activeCategory !== "All" && ` in "${activeCategory}"`}
          {query && ` for "${query}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence>
              {filtered.map((tool) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium mb-2">No tools found</p>
            <p className="text-sm">Try a different search term or category.</p>
          </div>
        )}

        {/* Ad */}
        <div className="mt-12">
          <AdContainer />
        </div>
      </div>
    </>
  );
}
