import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ, { buildFAQSchema, type FAQItem } from "@/components/FAQ";
import AdContainer from "@/components/AdContainer";

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Can I add a WhatsApp link directly in an Instagram post?",
    answer:
      "Instagram does not allow clickable links in post captions. The best place to put your WhatsApp link is in your bio or using Instagram's 'Link in bio' tools like Linktree.",
  },
  {
    question: "How many links can I have in my Instagram bio?",
    answer:
      "Instagram allows one clickable link in your bio natively. To add multiple links, use a bio link tool (Linktree, Beacons, etc.) and add your WhatsApp link there.",
  },
  {
    question: "Will clicking my WhatsApp bio link open the app automatically?",
    answer:
      "Yes. On a mobile device, tapping the wa.me link will prompt the user to open WhatsApp. On desktop, it opens WhatsApp Web.",
  },
  {
    question: "Can Instagram Stories link directly to WhatsApp?",
    answer:
      "Yes. Accounts with any follower count can add links to Stories using the Link sticker. Add your wa.me link there to drive direct conversations.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Add a WhatsApp Link to Your Instagram Bio",
  description:
    "Learn how to add a WhatsApp click-to-chat link to your Instagram bio, Stories, and Reels to convert followers into customers.",
  author: { "@type": "Organization", name: "TinyToolKit" },
};

export default function InstagramWhatsAppGuide() {
  return (
    <>
      <Helmet>
        <title>How to Add a WhatsApp Link to Instagram Bio | TinyToolKit</title>
        <meta
          name="description"
          content="Add a WhatsApp click-to-chat link to your Instagram bio, Stories, and Reels. Convert followers into conversations — free guide."
        />
        <link rel="canonical" href="https://tinytoolkit.com/articles/instagram-whatsapp-guide" />
        <meta property="og:title" content="Instagram to WhatsApp Guide" />
        <meta property="og:description" content="How to add a WhatsApp link to Instagram and convert followers into customers." />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(buildFAQSchema(FAQ_ITEMS))}</script>
      </Helmet>

      <div className="container mx-auto px-4 max-w-3xl py-10">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Articles" },
              { label: "Instagram to WhatsApp Guide" },
            ]}
          />
        </div>

        <article>
          <header className="mb-10">
            <p className="text-xs text-muted-foreground mb-3">June 2026 · Instagram · WhatsApp</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-4">
              How to Add a WhatsApp Link to Your Instagram Bio
            </h1>
            <p className="text-lg text-muted-foreground">
              Your Instagram bio is prime real estate. Adding a WhatsApp link there turns every profile visit into a potential conversation. Here is how to set it up in minutes.
            </p>
          </header>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">Generate Your WhatsApp Link First</p>
              <p className="text-xs text-muted-foreground mt-0.5">Create your wa.me link with a custom message — ready to paste into Instagram.</p>
            </div>
            <Link href="/whatsapp-link-generator" className="shrink-0">
              <Button size="sm" data-testid="ig-cta-link-generator">
                Create Link Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <AdContainer />

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-3">Why Link Instagram to WhatsApp?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Instagram DMs are great, but WhatsApp gives you richer communication — voice notes, documents, video calls, and end-to-end encryption. Businesses that add a WhatsApp link to Instagram see faster response times, higher customer satisfaction, and more closed sales because conversations happen in an app customers use every day.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Step 1: Create Your WhatsApp Link</h2>
              <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
                Use the{" "}
                <Link href="/whatsapp-link-generator" className="text-primary hover:underline">
                  WhatsApp Link Generator
                </Link>{" "}
                to build your link. Include a pre-filled message like:
              </p>
              <div className="bg-muted rounded-lg px-4 py-3 font-mono text-sm break-all">
                Hi! I found you on Instagram and I'd love to know more.
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                The resulting link will look like this:
              </p>
              <div className="bg-muted rounded-lg px-4 py-3 font-mono text-sm break-all mt-2">
                https://wa.me/15551234567?text=Hi!%20I%20found%20you%20on%20Instagram...
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Step 2: Add the Link to Your Instagram Bio</h2>
              <ol className="space-y-4 text-muted-foreground">
                {[
                  { step: "1", title: "Open Instagram and go to your profile", body: "Tap your profile picture at the bottom right, then tap 'Edit Profile'." },
                  { step: "2", title: "Find the 'Website' or 'Links' field", body: "On newer versions of Instagram, tap 'Add link' or 'Links'. On older versions, there is a single Website field." },
                  { step: "3", title: "Paste your wa.me link", body: "Paste the full WhatsApp link you generated. Instagram will make it clickable automatically." },
                  { step: "4", title: "Add a call-to-action in your bio text", body: "Write something like 'Chat on WhatsApp ↓' or 'DM or WhatsApp below' to direct people to click the link." },
                  { step: "5", title: "Save and test", body: "Tap 'Done' or 'Submit', then visit your own profile and tap the link to confirm it opens WhatsApp." },
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
              <h2 className="text-2xl font-bold mb-3">Using WhatsApp Links in Instagram Stories</h2>
              <p className="text-muted-foreground leading-relaxed text-sm mb-3">
                Instagram Stories support the Link sticker for all accounts. Here is how to use it:
              </p>
              <ol className="space-y-3 text-muted-foreground text-sm">
                {[
                  "Create or record your Story.",
                  "Tap the Sticker icon (smiley face) at the top.",
                  "Select the 'Link' sticker.",
                  "Paste your WhatsApp wa.me link.",
                  "Optionally customize the sticker text, e.g. 'Chat with us'.",
                  "Post the Story.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">{i + 1}.</span> {item}
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Bio Link Tools (If You Need Multiple Links)</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Instagram only allows one link in your bio natively. If you need to link to your website, WhatsApp, and a product all at once, use a bio link tool like Linktree, Beacons, or Carrd. Add your WhatsApp wa.me link as one of the options and label it clearly, such as "Message me on WhatsApp."
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Tips for Maximum Conversions</h2>
              <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                {[
                  "Add a pre-filled message that references Instagram so you know where the lead came from",
                  "Use a clear CTA in your bio text like 'Click below to chat on WhatsApp'",
                  "Add the Link sticker to every promotional Story",
                  "Mention WhatsApp in your Reels and posts: 'Link in bio to chat with us directly'",
                  "Respond quickly — WhatsApp conversations have higher expectations than DMs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <h2 className="font-bold text-lg mb-2">Build Your Instagram WhatsApp Link</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Generate a wa.me link with a custom Instagram pre-filled message in seconds.
            </p>
            <Link href="/whatsapp-link-generator">
              <Button data-testid="ig-bottom-cta">
                Create Your Link Free <ArrowRight className="ml-2 h-4 w-4" />
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
              <Link href="/articles/whatsapp-business-guide" className="text-sm text-primary hover:underline">
                WhatsApp Business Guide →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
