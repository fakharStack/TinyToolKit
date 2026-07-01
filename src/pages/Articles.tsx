import React from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ChevronRight, BookOpen, Clock } from "lucide-react";
import AdContainer from "@/components/AdContainer";

const articles = [
  {
    title: "How to Create a WhatsApp Link — Step-by-Step Guide",
    description: "Learn the exact steps to create a WhatsApp click-to-chat link. Ideal for sharing on social media or in your bio.",
    href: "/articles/how-to-create-whatsapp-link",
    readTime: "3 min read",
    date: "July 1, 2026",
  },
  {
    title: "WhatsApp Business Guide — Set Up, Links & Growth Tips",
    description: "A comprehensive guide to getting the most out of WhatsApp Business for your small or medium enterprise.",
    href: "/articles/whatsapp-business-guide",
    readTime: "5 min read",
    date: "July 1, 2026",
  },
  {
    title: "How to Add a WhatsApp Link to Instagram Bio",
    description: "Step-by-step instructions for adding a direct WhatsApp link to your Instagram profile to drive customer engagement.",
    href: "/articles/instagram-whatsapp-guide",
    readTime: "4 min read",
    date: "July 1, 2026",
  }
];

export default function Articles() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "TinyToolKit Articles",
    "description": "Read the latest articles, guides, and tutorials on WhatsApp tools, link generation, and business growth by TinyToolKit.",
    "url": "https://tinytoolkit.com/articles",
    "blogPost": articles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.description,
      "url": `https://tinytoolkit.com${article.href}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>Articles & Guides | TinyToolKit</title>
        <meta name="description" content="Explore our library of articles and guides on how to optimize your WhatsApp usage, generate links, and grow your business." />
        <link rel="canonical" href="https://tinytoolkit.com/articles" />
        <meta property="og:title" content="Articles & Guides | TinyToolKit" />
        <meta property="og:description" content="Explore our library of articles and guides on how to optimize your WhatsApp usage, generate links, and grow your business." />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Articles & Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, tutorials, and deep dives to help you get the most out of WhatsApp and our free online tools.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {articles.map((article, i) => (
            <Link key={i} href={article.href}>
              <div className="group h-full bg-card hover:bg-muted/30 border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col">
                <div className="mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {article.description}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 flex items-center justify-between text-sm text-muted-foreground border-t border-border/50">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                    Read article <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <AdContainer />
      </div>
    </>
  );
}
