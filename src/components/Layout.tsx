import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Zap, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string };
type NavLeaf = { label: string; href: string; children?: undefined };
type NavDropdown = { label: string; href?: undefined; children: NavChild[] };
type NavItem = NavLeaf | NavDropdown;

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function NavItem({
  item,
  mobile = false,
  onClose,
}: {
  item: (typeof NAV_LINKS)[number];
  mobile?: boolean;
  onClose?: () => void;
}) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const dropdownChildren = "children" in item ? item.children : null;

  if (dropdownChildren) {
    return (
      <div className={cn("relative", mobile && "w-full")}>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center gap-1 font-medium transition-colors",
            mobile
              ? "text-lg w-full py-2 text-foreground hover:text-primary"
              : "text-sm text-muted-foreground hover:text-foreground"
          )}
          data-testid="nav-articles-toggle"
        >
          {item.label}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
        </button>

        {open && (
          <div
            className={cn(
              mobile
                ? "mt-1 ml-4 flex flex-col gap-1"
                : "absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg py-2 z-50"
            )}
          >
            {dropdownChildren.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => { setOpen(false); onClose?.(); }}
                className={cn(
                  "block transition-colors",
                  mobile
                    ? "py-1.5 text-base text-muted-foreground hover:text-primary"
                    : "px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  const isActive = location === item.href;

  return (
    <Link
      href={item.href!}
      onClick={onClose}
      className={cn(
        "font-medium transition-colors",
        mobile
          ? "text-lg py-2 block"
          : "text-sm",
        isActive
          ? "text-primary"
          : mobile
          ? "text-foreground hover:text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
      data-testid={`nav-link-${item.label.toLowerCase()}`}
    >
      {item.label}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between max-w-6xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-primary/10 p-1.5 rounded-md group-hover:bg-primary/20 transition-colors">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">TinyToolKit</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            data-testid="nav-mobile-toggle"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav panel */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 pb-6 pt-4">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  mobile
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Brand */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-bold text-sm">TinyToolKit</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-[240px]">
                Free online tools that save you time. No signup, no cost, 100% client-side.
              </p>
            </div>

            {/* Link groups */}
            <div className="flex flex-wrap gap-8 text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Tools</p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/whatsapp-link-generator" className="text-muted-foreground hover:text-primary transition-colors">
                    WhatsApp Link Generator
                  </Link>
                  <Link href="/whatsapp-message-formatter" className="text-muted-foreground hover:text-primary transition-colors">
                    Message Formatter
                  </Link>
                  <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                    All Tools
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Articles</p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/articles/how-to-create-whatsapp-link" className="text-muted-foreground hover:text-primary transition-colors">
                    Create a WhatsApp Link
                  </Link>
                  <Link href="/articles/whatsapp-business-guide" className="text-muted-foreground hover:text-primary transition-colors">
                    WhatsApp Business Guide
                  </Link>
                  <Link href="/articles/instagram-whatsapp-guide" className="text-muted-foreground hover:text-primary transition-colors">
                    Instagram to WhatsApp
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Company</p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                  <Link href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">Sitemap</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TinyToolKit. Free forever. No data collected.
          </div>
        </div>
      </footer>
    </div>
  );
}
