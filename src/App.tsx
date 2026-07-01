import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Layout from "@/components/Layout";

// Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Pages
const Home = lazy(() => import("@/pages/Home"));
const Tools = lazy(() => import("@/pages/Tools"));
const About = lazy(() => import("@/pages/About"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Articles = lazy(() => import("@/pages/Articles"));

// WhatsApp tools (legacy routes)
const WhatsAppLinkGenerator = lazy(() => import("@/pages/WhatsAppLinkGenerator"));
const WhatsAppMessageFormatter = lazy(() => import("@/pages/WhatsAppMessageFormatter"));

// Articles
const HowToCreateWhatsappLink = lazy(() => import("@/articles/HowToCreateWhatsappLink"));
const WhatsAppBusinessGuide = lazy(() => import("@/articles/WhatsAppBusinessGuide"));
const InstagramWhatsAppGuide = lazy(() => import("@/articles/InstagramWhatsAppGuide"));

// Text tools
const WordCounter = lazy(() => import("@/pages/tools/WordCounter"));
const CharacterCounter = lazy(() => import("@/pages/tools/CharacterCounter"));
const TextCaseConverter = lazy(() => import("@/pages/tools/TextCaseConverter"));
const RemoveDuplicateLines = lazy(() => import("@/pages/tools/RemoveDuplicateLines"));
const RemoveBlankLines = lazy(() => import("@/pages/tools/RemoveBlankLines"));
const LineSorter = lazy(() => import("@/pages/tools/LineSorter"));
const TextReverser = lazy(() => import("@/pages/tools/TextReverser"));

// Web & Encoding tools
const UrlEncoder = lazy(() => import("@/pages/tools/UrlEncoder"));
const UrlDecoder = lazy(() => import("@/pages/tools/UrlDecoder"));
const Base64Encoder = lazy(() => import("@/pages/tools/Base64Encoder"));
const Base64Decoder = lazy(() => import("@/pages/tools/Base64Decoder"));
const HtmlEntityEncoder = lazy(() => import("@/pages/tools/HtmlEntityEncoder"));
const SlugGenerator = lazy(() => import("@/pages/tools/SlugGenerator"));

// Developer tools
const JsonFormatter = lazy(() => import("@/pages/tools/JsonFormatter"));
const JsonValidator = lazy(() => import("@/pages/tools/JsonValidator"));
const MarkdownPreview = lazy(() => import("@/pages/tools/MarkdownPreview"));
const LoremIpsumGenerator = lazy(() => import("@/pages/tools/LoremIpsumGenerator"));

// Security tools
const PasswordGenerator = lazy(() => import("@/pages/tools/PasswordGenerator"));

// Visual tools
const QrCodeGenerator = lazy(() => import("@/pages/tools/QrCodeGenerator"));
const ColorConverter = lazy(() => import("@/pages/tools/ColorConverter"));
const ImageToBase64 = lazy(() => import("@/pages/tools/ImageToBase64"));

// Additional Text tools
const DiffChecker = lazy(() => import("@/pages/tools/DiffChecker"));

// Additional Web & Encoding tools
const NumberBaseConverter = lazy(() => import("@/pages/tools/NumberBaseConverter"));

// Additional Developer tools
const CsvToJson = lazy(() => import("@/pages/tools/CsvToJson"));
const JsonToCsv = lazy(() => import("@/pages/tools/JsonToCsv"));
const RegexTester = lazy(() => import("@/pages/tools/RegexTester"));
const TimestampConverter = lazy(() => import("@/pages/tools/TimestampConverter"));

const queryClient = new QueryClient();

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Core pages */}
        <Route path="/" component={Home} />
        <Route path="/tools" component={Tools} />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/contact" component={Contact} />
        <Route path="/articles" component={Articles} />

        {/* WhatsApp tools */}
        <Route path="/whatsapp-link-generator" component={WhatsAppLinkGenerator} />
        <Route path="/whatsapp-message-formatter" component={WhatsAppMessageFormatter} />

        {/* Articles */}
        <Route path="/articles/how-to-create-whatsapp-link" component={HowToCreateWhatsappLink} />
        <Route path="/articles/whatsapp-business-guide" component={WhatsAppBusinessGuide} />
        <Route path="/articles/instagram-whatsapp-guide" component={InstagramWhatsAppGuide} />

        {/* Text tools */}
        <Route path="/tools/word-counter" component={WordCounter} />
        <Route path="/tools/character-counter" component={CharacterCounter} />
        <Route path="/tools/text-case-converter" component={TextCaseConverter} />
        <Route path="/tools/remove-duplicate-lines" component={RemoveDuplicateLines} />
        <Route path="/tools/remove-blank-lines" component={RemoveBlankLines} />
        <Route path="/tools/line-sorter" component={LineSorter} />
        <Route path="/tools/text-reverser" component={TextReverser} />

        {/* Web & Encoding tools */}
        <Route path="/tools/url-encoder" component={UrlEncoder} />
        <Route path="/tools/url-decoder" component={UrlDecoder} />
        <Route path="/tools/base64-encoder" component={Base64Encoder} />
        <Route path="/tools/base64-decoder" component={Base64Decoder} />
        <Route path="/tools/html-entity-encoder" component={HtmlEntityEncoder} />
        <Route path="/tools/slug-generator" component={SlugGenerator} />

        {/* Developer tools */}
        <Route path="/tools/json-formatter" component={JsonFormatter} />
        <Route path="/tools/json-validator" component={JsonValidator} />
        <Route path="/tools/markdown-preview" component={MarkdownPreview} />
        <Route path="/tools/lorem-ipsum-generator" component={LoremIpsumGenerator} />

        {/* Security tools */}
        <Route path="/tools/password-generator" component={PasswordGenerator} />

        {/* Visual tools */}
        <Route path="/tools/qr-code-generator" component={QrCodeGenerator} />
        <Route path="/tools/color-converter" component={ColorConverter} />
        <Route path="/tools/image-to-base64" component={ImageToBase64} />

        {/* Additional Text tools */}
        <Route path="/tools/diff-checker" component={DiffChecker} />

        {/* Additional Web & Encoding tools */}
        <Route path="/tools/number-base-converter" component={NumberBaseConverter} />

        {/* Additional Developer tools */}
        <Route path="/tools/csv-to-json" component={CsvToJson} />
        <Route path="/tools/json-to-csv" component={JsonToCsv} />
        <Route path="/tools/regex-tester" component={RegexTester} />
        <Route path="/tools/timestamp-converter" component={TimestampConverter} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}


function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
