import React from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ, { type FAQItem } from "@/components/FAQ";
import AdContainer from "@/components/AdContainer";

interface ToolPageShellProps {
  toolId: string;
  title: string;
  description: string;
  metaDescription?: string;
  faqItems: FAQItem[];
  children: React.ReactNode;
}

export default function ToolPageShell({
  toolId,
  title,
  description,
  metaDescription,
  faqItems,
  children,
}: ToolPageShellProps) {
  const pageTitle = `${title} — Free Online Tool | TinyToolKit`;
  const canonicalUrl = `https://tinytoolkit.com/tools/${toolId}`;
  const meta = metaDescription ?? description;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={meta} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={meta} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl py-10">
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: title }]} />
        </div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
        </header>

        <div className="mb-8">{children}</div>

        <div className="mb-10">
          <AdContainer />
        </div>

        <FAQ items={faqItems} />
      </div>
    </>
  );
}
