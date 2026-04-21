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
| Deployment | GitHub Pages via GitHub Actions |
| Contact form | Formspree |
| Fonts | Cormorant Garamond (headings) + DM Sans (body) |

---

## Project Structure

```
├── app/                            # Pages & routes (Next.js App Router)
│   ├── layout.tsx                  # Root layout (Navbar + Footer, metadata)
│   ├── globals.css                 # Global styles, Tailwind directives
│   ├── page.tsx                    # Home page
│   ├── about/
│   │   └── page.tsx                # About page (founder, essay, influences)
│   └── contact/
│       └── page.tsx                # Contact page with form
│
├── components/                     # Reusable UI components
│   ├── Navbar.tsx                  # Sticky nav with mobile hamburger menu
│   ├── Footer.tsx                  # Site footer with links
│   ├── ContactForm.tsx             # Contact form (posts to Formspree)
│   ├── AboutSections.tsx           # Collapsible sections on the About page
│   ├── WheelCube.jsx               # Animated hero visual
│   └── FadeIn.tsx                  # Framer Motion fade-in animation wrapper
│
├── data/
│   └── influences.json             # Individuals & content featured on the About page
│
├── public/                         # Static assets (.nojekyll for GitHub Pages)
│
├── .github/workflows/deploy.yml    # CI/CD: build & deploy to GitHub Pages
├── next.config.mjs                 # Next.js config (static export, no image optimization)
├── tailwind.config.ts              # Theme: colors, fonts, shadows
├── tsconfig.json                   # TypeScript config (@ path alias)
└── package.json                    # Dependencies & scripts
```

---

## Pages & Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Landing page — hero, value proposition, tenets (Curiosity/Character/Ambition), process, contact |
| `/about` | `app/about/page.tsx` | Founder bio, origin story, and influences — each collapsible. Supports `#founder`, `#essay`, `#influences` hash anchors |
| `/contact` | `app/contact/page.tsx` | Contact form + social links |

All pages are statically generated at build time.

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

## Editing Content

The About page's "Rub elbows with our inspiration" section renders from `data/influences.json`. Edit that file directly to add, remove, or reorder entries, then commit and redeploy.

---

## Development

```bash
npm install          # Install dependencies
npm run dev          # Dev server on localhost:3000
npm run build        # Static build → /out
npm run lint         # ESLint
```

The contact form submits directly to Formspree — no backend service required.

---

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys the static site to GitHub Pages.
