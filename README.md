# ✦ Antigravity — Personal Portfolio

<div align="center">

A high-performance, glassmorphic portfolio built with **Next.js 16**, **Tailwind CSS 4**, **Framer Motion**, and **next-intl** — featuring scroll-driven frame animations, elastic halo effects, and trilingual localization.

**[Live Demo →](https://phuc-anh.vercel.app)**

</div>

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion 12 |
| **Theming** | next-themes (Dark/Light) |
| **i18n** | next-intl (EN / FR / VI) |
| **Content** | MDX (gray-matter + next-mdx-remote) |
| **Icons** | Lucide React |
| **Analytics** | Vercel Analytics |
| **Fonts** | Space Grotesk + Archivo (Google Fonts) |

---

## 🏗️ Architecture

```
src/
├── app/[locale]/          # App Router pages (locale-aware)
│   ├── layout.tsx         # Root layout with providers
│   ├── globals.css        # Design system tokens + glass utilities
│   ├── blog/              # Blog routes
│   ├── project/           # Project detail routes
│   └── projects/          # Projects list route
├── components/
│   ├── layout/            # Navbar, Footer, LanguageSwitcher, StarBackground
│   ├── providers/         # ThemeProvider wrapper
│   ├── sections/          # Home, About, Skills, Projects, Blog, Contact
│   └── ui/                # SearchBar, ResumeDropdown, AvatarEffect, SectionSeparator
├── content/               # MDX blog posts + project case studies
├── hooks/                 # useMounted, useThemeDark, useNavigation
├── i18n/                  # Routing, settings, request config
├── lib/                   # blog.ts, project.ts, utils.ts (cn helper)
├── messages/              # Translation JSON: en.json, fr.json, vi.json
└── views/                 # Page-level view composers
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Pandahoccode/My-website.git
cd My-website

# Install dependencies
npm install

# Start dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## 🎨 Design System

### Glass Utilities

| Utility | Description |
|---------|------------|
| `.glass-surface` | 40px blur, frosted glass with CSS containment |
| `.antigravity-card` | Dampened spring hover with nebula glow |
| `.glass-card` | Lightweight glass for subtle elements |
| `.text-gradient-primary` | Cyan → Purple gradient text |

### Theme Variables

All theme tokens are defined in `globals.css` under `:root` (light) and `.dark` (dark), controlling backgrounds, borders, text colors, and glass opacity.

### Motion System

- **Separators**: Organic sine-wave breathing (`cubic-bezier(0.37, 0, 0.63, 1)`)
- **Cards**: Dampened spring easing (`cubic-bezier(0.16, 1, 0.3, 1)`)
- **Avatars**: Elastic halo with mouse-tracking via Framer Motion springs
- **Accessibility**: All animations respect `prefers-reduced-motion`

---

## 🌍 Localization

Three locales supported via `next-intl`:

| Locale | File |
|--------|------|
| English | `src/messages/en.json` |
| French | `src/messages/fr.json` |
| Vietnamese | `src/messages/vi.json` |

Add a new locale by:
1. Adding the locale code to `src/i18n/settings.ts` and `src/i18n/routing.ts`
2. Creating a new `src/messages/{locale}.json` translation file
3. Updating `middleware.ts` if needed

---

## 📝 Content (MDX)

Blog posts and project case studies are stored as `.mdx` files:

```
src/content/
├── blog/          # Blog posts
└── projects/      # Project case studies
```

Each file uses YAML frontmatter for metadata (title, date, tags, category, etc.) and MDX for rich content.

---

## 🚢 Deployment (Vercel)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Pandahoccode/My-website)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment

No environment variables are required. The app is fully static-compatible and uses ISR for dynamic routes.

---

## 📄 License

© 2026 Phuc Anh Dang. All rights reserved.
