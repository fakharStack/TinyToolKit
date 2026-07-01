import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ, { buildFAQSchema, type FAQItem } from "@/components/FAQ";
import AdContainer from "@/components/AdContainer";

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Is WhatsApp Business free?",
    answer:
      "Yes. WhatsApp Business is a free app for Android and iOS. The WhatsApp Business API (for larger companies) has costs, but the standard app is free.",
  },
  {
    question: "Can I use WhatsApp Business and personal WhatsApp on the same phone?",
    answer:
      "Yes. You can run both apps simultaneously on the same device, but they must use different phone numbers.",
  },
  {
    question: "How do I create a WhatsApp link for my business?",
    answer:
      "Use our free WhatsApp Link Generator to create a wa.me link with your business number and an optional pre-filled message.",
  },
  {
    question: "What is the difference between WhatsApp Business and the API?",
    answer:
      "The WhatsApp Business App is for small businesses and is free. The API is for medium to large businesses that need automation, CRM integrations, and bulk messaging — it has a cost and requires a partner.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "WhatsApp Business Guide: How to Set Up and Grow Your Business",
  description:
    "Complete guide to using WhatsApp for business: set up a profile, create click-to-chat links, and use automation to save time.",
  author: { "@type": "Organization", name: "TinyToolKit" },
};

export default function WhatsAppBusinessGuide() {
  return (
    <>
      <Helmet>
        <title>WhatsApp Business Guide — Set Up, Links & Growth Tips | TinyToolKit</title>
        <meta
          name="description"
          content="Complete WhatsApp Business guide: create your profile, generate click-to-chat links, set up automated replies, and convert more customers."
        />
        <link rel="canonical" href="https://tinytoolkit.com/articles/whatsapp-business-guide" />
        <meta property="og:title" content="WhatsApp Business Guide" />
        <meta property="og:description" content="Set up WhatsApp Business, create links, and grow your customer base." />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(buildFAQSchema(FAQ_ITEMS))}</script>
      </Helmet>

      <div className="container mx-auto px-4 max-w-3xl py-10">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Articles" },
              { label: "WhatsApp Business Guide" },
            ]}
          />
        </div>

        <article>
          <header className="mb-10">
            <p className="text-xs text-muted-foreground mb-3">June 2026 · WhatsApp Business</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-4">
              WhatsApp Business Guide: Set Up, Links & Growth Tips
            </h1>
            <p className="text-lg text-muted-foreground">
              WhatsApp Business helps small and medium businesses communicate with customers faster. This guide covers everything from setup to using click-to-chat links to grow your audience.
            </p>
          </header>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">Create Your Business Link</p>
              <p className="text-xs text-muted-foreground mt-0.5">Generate a professional wa.me link for your business in seconds.</p>
            </div>
            <Link href="/whatsapp-link-generator" className="shrink-0">
              <Button size="sm" data-testid="biz-cta-link-generator">
                Free Link Generator <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <AdContainer />

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-3">What Is WhatsApp Business?</h2>
              <p className="text-muted-foreground leading-relaxed">
                WhatsApp Business is a free app built for small businesses. It gives you a verified business profile with your name, category, description, website, and location. You can also set automated greeting messages, away messages, and quick replies — features not available in the personal app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Setting Up Your Profile</h2>
              <ol className="space-y-4 text-muted-foreground">
                {[
                  { step: "1", title: "Download WhatsApp Business", body: "Available free on iOS and Android. Use a dedicated business phone number — it cannot be the same as your personal WhatsApp number." },
                  { step: "2", title: "Set your business name and category", body: "Your business name is permanent after verification. Choose the category that best describes your business." },
                  { step: "3", title: "Complete your profile", body: "Add your address, business hours, website URL, and a short description. A complete profile builds trust." },
                  { step: "4", title: "Enable automated messages", body: "Set a greeting message for new contacts and an away message for outside business hours." },
                ].map(({ step, title, body }) => (
                  <li key={step} className="flex gap-4">
                    <div className="bg-primary/10 text-primary font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {step}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="text-sm mt-1 leading-relaxed">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Creating a Click-to-Chat Link for Your Business</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A click-to-chat link removes the friction of saving a number. Anyone who clicks it opens a WhatsApp chat with your business instantly. Here is the format:
              </p>
              <div className="bg-muted rounded-lg px-4 py-3 font-mono text-sm break-all">
                https://wa.me/[country_code][phone]?text=Hi%2C%20I%27d%20like%20to%20know%20more
              </div>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                Use our{" "}
                <Link href="/whatsapp-link-generator" className="text-primary hover:underline">
                  WhatsApp Link Generator
                </Link>{" "}
                to build this link automatically with correct encoding.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Where to Place Your WhatsApp Business Link</h2>
              <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                {[
                  "Website header — 'Chat with us on WhatsApp' button",
                  "Contact page alongside phone/email",
                  "Instagram, Facebook, and LinkedIn bio",
                  "Google My Business profile",
                  "Email signature",
                  "Printed materials (business cards, flyers, menus) as a QR code",
                  "WhatsApp Business catalog product pages",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Quick Replies: Save Time on Repetitive Messages</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                WhatsApp Business lets you save up to 50 quick replies with a keyboard shortcut. For example, type "/" in a chat to access saved replies like "Hello! Thanks for reaching out. How can I help you today?" — perfect for FAQs, pricing inquiries, or appointment confirmations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">WhatsApp Business vs WhatsApp Business API</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold">Feature</th>
                      <th className="text-left py-2 pr-4 font-semibold">Business App</th>
                      <th className="text-left py-2 font-semibold">Business API</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground divide-y divide-border">
                    {[
                      ["Cost", "Free", "Paid (per message)"],
                      ["Best for", "Small business", "Medium-large business"],
                      ["Automation", "Basic", "Full (chatbots, CRM)"],
                      ["Agents", "1 device", "Multiple agents"],
                      ["Bulk messaging", "Limited", "Yes (approved)"],
                    ].map(([feature, app, api]) => (
                      <tr key={feature}>
                        <td className="py-2.5 pr-4 font-medium text-foreground">{feature}</td>
                        <td className="py-2.5 pr-4">{app}</td>
                        <td className="py-2.5">{api}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <h2 className="font-bold text-lg mb-2">Generate Your Business WhatsApp Link</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Free, instant, no account needed. Build your wa.me link and start receiving customer messages today.
            </p>
            <Link href="/whatsapp-link-generator">
              <Button data-testid="biz-bottom-cta">
                Open Link Generator <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-14">
            <FAQ items={FAQ_ITEMS} />
          </div>

          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-sm font-semibold mb-3">Related Articles</p>
            <div className="flex flex-col gap-2">
              <Link href="/articles/how-to-create-whatsapp-link" className="text-sm text-primary hover:underline">
                How to Create a WhatsApp Link →
              </Link>
              <Link href="/articles/instagram-whatsapp-guide" className="text-sm text-primary hover:underline">
                Instagram to WhatsApp Guide →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
