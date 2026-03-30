# Junto Advisory Website

Strategic advisory website built with **Next.js 14** (App Router), **TypeScript**, and **Tailwind CSS**. Deployed as a static site to **GitHub Pages** at [junto-advisory.com](https://junto-advisory.com).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2 (App Router, static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 + PostCSS |
| Animations | Framer Motion 11 |
| Content | Markdown with YAML frontmatter (gray-matter + remark) |
| Deployment | GitHub Pages via GitHub Actions |
| Fonts | Cormorant Garamond (headings) + DM Sans (body) |

---

## Project Structure

```
├── app/                            # Pages & routes (Next.js App Router)
│   ├── layout.tsx                  # Root layout (Navbar + Footer, metadata)
│   ├── globals.css                 # Global styles, Tailwind directives, prose styling
│   ├── page.tsx                    # Home page
│   ├── contact/
│   │   └── page.tsx                # Contact page with form
│   └── insights/
│       ├── page.tsx                # Blog listing (card grid)
│       └── [slug]/
│           └── page.tsx            # Individual blog post (dynamic route)
│
├── components/                     # Reusable UI components
│   ├── Navbar.tsx                  # Sticky nav with mobile hamburger menu
│   ├── Footer.tsx                  # Site footer with links
│   ├── ContactForm.tsx             # Contact form (posts to external API on port 3001)
│   └── FadeIn.tsx                  # Framer Motion fade-in animation wrapper
│
├── lib/                            # Utilities
│   └── posts.ts                    # Markdown post loading & parsing
│
├── content/                        # Markdown content (file-based CMS)
│   └── posts/                      # Blog posts with frontmatter (title, date, excerpt)
│       ├── navigating-uncertainty-as-a-leader.md
│       ├── the-compounding-advantage-of-clarity.md
│       └── when-to-bring-in-outside-perspective.md
│
├── public/                         # Static assets
│
├── .github/workflows/deploy.yml    # CI/CD: build & deploy to GitHub Pages
├── CNAME                           # Custom domain config
├── next.config.mjs                 # Next.js config (static export, no image optimization)
├── tailwind.config.ts              # Theme: colors, fonts, shadows
├── tsconfig.json                   # TypeScript config (@ path alias)
└── package.json                    # Dependencies & scripts
```

---

## Pages & Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Landing page — hero, tenets (Curiosity/Character/Ambition), how it works, about, CTA |
| `/insights` | `app/insights/page.tsx` | Blog listing — 2-column card grid of all posts |
| `/insights/[slug]` | `app/insights/[slug]/page.tsx` | Individual post — rendered markdown with prose styling |
| `/contact` | `app/contact/page.tsx` | Contact form + social links (LinkedIn, X) |

All pages are statically generated at build time. Dynamic routes use `generateStaticParams()`.

---

## Design System

**Color Palette:**
- `cream` (#faf8f5) — background
- `charcoal` (#2c2c2c) — primary text
- `terracotta` (#c2714f) — accent, CTAs, links
- `olive` (#6b7c4e) — secondary accent
- `ochre` (#c49a3c) — tertiary accent
- `sand` (#e8e0d0) — borders, subtle backgrounds

**Typography:** Cormorant Garamond for display headings, DM Sans for body text.

---

## Content Management

Blog posts live in `content/posts/` as Markdown files with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
excerpt: "Short description for the listing page"
---
```

`lib/posts.ts` provides: `getAllPosts()`, `getAllSlugs()`, `getPostBySlug(slug)`.

---

## Development

```bash
npm install          # Install dependencies
npm run dev          # Dev server on localhost:3000
npm run build        # Static build → /out
npm run lint         # ESLint
```

The contact form submits to `http://localhost:3001/api/contact` — requires a separate backend service.

---

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys the static site to GitHub Pages.
