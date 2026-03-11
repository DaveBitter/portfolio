# Dave Bitter — Portfolio

Personal portfolio and blog built with Next.js 16, Radix Themes, and Tailwind CSS. Statically generated at build time.

## Tech Stack

- **Next.js 16** — App Router, SSG via `output: "export"`, Turbopack
- **React 19** — Server Components by default
- **Radix Themes** — UI component library (dark theme, orange accent)
- **Tailwind CSS v4** — Layout and custom styling
- **TypeScript** — End to end
- **D3.js** — Radar chart on the resume page
- **highlight.js** — Syntax highlighting in articles
- **marked** — Markdown to HTML
- **View Transitions API** — Smooth page navigations with shared element morphing

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build (static export to `out/`) |
| `pnpm start` | Serve production build |
| `pnpm lint` | Run ESLint |

The `postbuild` script automatically generates static JSON API files in `out/` and `public/`.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/content/        # Static JSON API routes
│   ├── articles/           # Article list + [slug] detail
│   ├── quick-bits/         # Quick Bits list + [slug] detail
│   ├── talks/              # Talks list + [slug] detail
│   ├── friday-tips/        # Friday Tips (YouTube integration)
│   ├── resume/             # Resume page
│   ├── tags/               # Tags overview + [tag] filter
│   ├── layout.tsx          # Root layout (theme, nav, footer)
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   ├── error.tsx           # Error boundary
│   ├── sitemap.ts          # Generated sitemap
│   ├── robots.ts           # robots.txt
│   └── manifest.ts         # PWA manifest
├── components/
│   ├── article/            # Article, ArticleTeaser, ArticleTypeBadge
│   ├── resume/             # ResumePitch, WorkExperience, Education, ProfileChart
│   ├── site/               # SiteNav, SiteFooter, SiteBreadcrumbs, SiteHeader
│   ├── analytics.tsx       # Google Analytics (GA4)
│   ├── content-section.tsx # Reusable section with heading + optional link
│   ├── share.tsx           # Share button (scroll-aware on mobile)
│   ├── socials.tsx         # Social media links
│   ├── tag.tsx             # Tag badges
│   ├── transition-link.tsx # Link with View Transitions API
│   └── view-transition-handler.tsx
├── hooks/
│   └── use-scroll-direction.ts
├── lib/
│   ├── content.ts          # Content loading from markdown files
│   ├── enrich-html.ts      # HTML post-processing (links, images, videos)
│   ├── format-date.ts      # Date formatting utilities
│   ├── markdown.ts         # Markdown → HTML with syntax highlighting
│   ├── og-image.tsx        # Shared OG image generator
│   ├── view-transitions.ts # View Transitions API helpers
│   └── youtube.ts          # YouTube Data API fetcher for Friday Tips
│   └── sanity/             # Sanity CMS client + schemas (ready for future use)
├── content/                # Markdown content files
│   ├── articles/           # Articles and Quick Bits
│   ├── general/            # Copy, dictionary, headings, tags
│   ├── resume/             # Work experience and education
│   └── speaking/           # Talks
└── scripts/
    └── generate-api.ts     # Static JSON API generator
```

## Content

Content lives in markdown files under `content/`. Each file uses YAML frontmatter parsed by `gray-matter`.

To add or edit content, modify the markdown files directly. Changes take effect on the next build.

## API Endpoints

Static JSON API routes are available for external consumers:

| Endpoint | Description |
|----------|-------------|
| `/api/content/articles` | All articles |
| `/api/content/quick-bits` | All quick bits |
| `/api/content/talks` | All talks |
| `/api/content/friday-tips` | Friday tips (requires `YOUTUBE_API_KEY`) |
| `/api/content/tags` | Tag definitions |
| `/api/content/ui` | Dictionary, copy, and headings |
| `/api/content/work-and-education` | Work experience and education |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `YOUTUBE_API_KEY` | No | YouTube Data API v3 key for Friday Tips |

## View Transitions

The site uses the browser-native View Transitions API for smooth page navigations. Shared elements (article images, titles, badges, dates) morph between card and detail views. The nav and footer stay static during transitions. Back navigation animates in reverse.

## Deployment

The site exports to static HTML (`out/` directory). Deploy to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

```bash
pnpm build
# Static files are in out/
```
