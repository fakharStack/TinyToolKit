import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, MousePointerClick, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import FAQ, { buildFAQSchema, type FAQItem } from "@/components/FAQ";
import AdContainer from "@/components/AdContainer";
import { tools } from "@/data/tools";

const ARTICLES = [
  {
    title: "How to Create a WhatsApp Link",
    description: "Learn how to generate wa.me click-to-chat links and add them to your website, bio, or business card.",
    href: "/articles/how-to-create-whatsapp-link",
    date: "June 2026",
  },
  {
    title: "WhatsApp Business Guide",
    description: "A complete guide to using WhatsApp for business: set up a profile, create links, and automate replies.",
    href: "/articles/whatsapp-business-guide",
    date: "June 2026",
  },
  {
    title: "Instagram to WhatsApp Guide",
    description: "Add a WhatsApp link to your Instagram bio and convert followers into conversations.",
    href: "/articles/instagram-whatsapp-guide",
    date: "June 2026",
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Instant Results",
    description: "Every tool works in real time — no forms to submit, no waiting for servers.",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "All processing happens in your browser. We never see or store your data.",
  },
  {
    icon: MousePointerClick,
    title: "No Signup Required",
    description: "Open any tool and start using it immediately. No account, no email, no friction.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is a WhatsApp click-to-chat link?",
    answer: "A wa.me link lets anyone start a WhatsApp chat with you without having to save your phone number first. It is ideal for businesses, freelancers, and anyone who wants to make it easy for people to reach them.",
  },
  {
    question: "Is TinyToolKit free?",
    answer: "Yes, completely free with no account required. We built these tools as simple, fast utilities that anyone can use — forever.",
  },
  {
    question: "Does TinyToolKit store my phone number?",
    answer: "No. All processing happens entirely in your browser. We never see, store, or transmit your data to any servers.",
  },
  {
    question: "What WhatsApp formatting is supported?",
    answer: "WhatsApp supports bold (*text*), italic (_text_), strikethrough (~text~), and monospace (triple backtick). Our formatter lets you apply these with one click and preview the result.",
  },
  {
    question: "Can I add a pre-filled message to my WhatsApp link?",
    answer: "Yes. In the WhatsApp Link Generator, you can add a pre-filled message. When someone clicks the link, that message will automatically appear in their chat input box.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TinyToolKit",
  description: "Free online tools — generate WhatsApp links and format messages instantly.",
  applicationCategory: "Utility",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0" },
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>TinyToolKit — Free Online Tools That Save You Time</title>
        <meta
          name="description"
          content="Free online tools for WhatsApp and productivity. Generate click-to-chat links, format messages, and more — no signup, no cost, 100% client-side."
        />
        <link rel="canonical" href="https://tinytoolkit.com/" />
        <meta property="og:title" content="TinyToolKit — Free Online Tools" />
        <meta property="og:description" content="Generate WhatsApp links, format messages, and more. Free, instant, no login." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(buildFAQSchema(FAQ_ITEMS))}</script>
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background border-b border-border">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 opacity-70" />
        
        <div className="container relative mx-auto px-4 max-w-5xl py-20 md:py-28 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 hover-glow"
          >
            <Zap className="h-4 w-4" /> Free. No signup. No limits.
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6"
          >
            Free Online Tools<br className="hidden md:block" /> That <span className="text-gradient">Save You Time</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Generate WhatsApp click-to-chat links, format messages, and more — instantly in your browser. No account needed, always free.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/tools">
              <Button size="lg" className="text-base px-8 h-12 bg-gradient-primary hover-scale border-0" data-testid="button-browse-tools">
                Browse Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/whatsapp-link-generator">
              <Button size="lg" variant="outline" className="text-base px-8 h-12" data-testid="button-link-generator-hero">
                Try Link Generator
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ad placement below hero */}
      <div className="container mx-auto px-4 max-w-5xl py-6">
        <AdContainer />
      </div>

      {/* Featured Tools */}
      <section className="container mx-auto px-4 max-w-5xl py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Tools</h2>
          <p className="text-muted-foreground mt-2">
            Start with these — more tools coming soon.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/tools">
            <Button variant="outline" data-testid="button-all-tools">
              View All Tools <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 border-y border-border py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why TinyToolKit?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {BENEFITS.map((b, index) => {
              const Icon = b.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={b.title} 
                  className="bg-card border border-border rounded-xl p-6 text-center hover-scale hover-glow"
                >
                  <div className="bg-gradient-primary w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 text-white shadow-lg shadow-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad between sections */}
      <div className="container mx-auto px-4 max-w-5xl py-6">
        <AdContainer />
      </div>

      {/* Latest Articles */}
      <section className="container mx-auto px-4 max-w-5xl py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Newspaper className="h-5 w-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Latest Articles</h2>
          </div>
          <Link href="/articles/how-to-create-whatsapp-link">
            <Button variant="ghost" size="sm" className="text-primary">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {ARTICLES.map((article) => (
            <Link key={article.href} href={article.href}>
              <div className="group bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full flex flex-col"
                   data-testid={`card-article-${article.href.split("/").pop()}`}>
                <p className="text-xs text-muted-foreground mb-2">{article.date}</p>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-2 flex-1">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{article.description}</p>
                <span className="text-primary text-xs font-medium flex items-center gap-1">
                  Read more <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 border-t border-border py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>
    </>
  );
}
