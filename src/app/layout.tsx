import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Public_Sans } from "next/font/google";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteBreadcrumbs } from "@/components/site/site-breadcrumbs";
import { Analytics } from "@/components/analytics";
import { ViewTransitionHandler } from "@/components/view-transition-handler";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dave Bitter - Senior Front-end Consultant & Engineering Manager",
    template: "%s | Dave Bitter",
  },
  description:
    "Front-end consultant, developer advocate, and engineering manager who writes about web development, speaks at conferences, and occasionally makes things that work.",
  metadataBase: new URL("https://www.davebitter.com"),
  openGraph: {
    type: "website",
    siteName: "Dave Bitter",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Dave_Bitter",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={publicSans.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if("startViewTransition"in document){let r=null,t=null;window.__vtResolve=function(){t&&(clearTimeout(t),t=null);r&&(r(),r=null)};window.addEventListener("popstate",function(){if(r)return;document.documentElement.dataset.vtDirection="back";document.startViewTransition(function(){return new Promise(function(s){r=s;t=setTimeout(function(){if(r===s){s();r=null}},150)})})},!0)}`,
          }}
        />
      </head>
      <body>
        <Theme
          appearance="dark"
          accentColor="orange"
          grayColor="sand"
          radius="medium"
          scaling="100%"
        >
          <div className="flex min-h-dvh flex-col">
            <SiteNav />
            <SiteBreadcrumbs />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Theme>
        <ViewTransitionHandler />
        <Analytics />
      </body>
    </html>
  );
}
