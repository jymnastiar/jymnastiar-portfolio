# AGENT.md — Portfolio Muhammad Fadhlillah Gymnastiar

## Project Overview

Personal developer portfolio website for Muhammad Fadhlillah Gymnastiar, a 6th-semester Mathematics student at Universitas Negeri Jakarta and UI/UX & Web Developer Intern at Vinix7. Built with React + Vite + TypeScript, featuring 3D Spline objects, GSAP scroll animations, parallax effects, and smooth scroll via Lenis.

---

## Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Framework     | React 18 + Vite                     |
| Language      | TypeScript                          |
| Styling       | Tailwind CSS v4                     |
| Animation     | GSAP + ScrollTrigger, Framer Motion |
| Smooth Scroll | Lenis                               |
| 3D Objects    | Spline (`@splinetool/react-spline`) |
| Routing       | React Router DOM v6                 |

---

## Design System

### Color Palette

```
Primary   → Sky
  sky-400  #38bdf8   (accent glow, highlights)
  sky-500  #0ea5e9   (primary buttons, links)
  sky-600  #0284c7   (hover states)

Secondary → Violet
  violet-400  #a78bfa  (secondary accent, tags)
  violet-500  #8b5cf6  (secondary buttons)
  violet-600  #7c3aed  (hover states)

Base → Zinc (dark)
  zinc-950  #09090b   (primary background)
  zinc-900  #18181b   (card background)
  zinc-800  #27272a   (border, divider)
  zinc-400  #a1a1aa   (body text)
  zinc-100  #f4f4f5   (heading text)

Gradient Accent
  from-sky-500 via-violet-500 to-sky-400  (text gradient, glow)
```

### Typography

```
Display / Heading  → Syne (Google Fonts)
Body               → DM Sans (Google Fonts)
Code / Mono        → JetBrains Mono (Google Fonts)
```

### Tailwind Config Notes

```ts
fontFamily: {
  syne: ["Syne", "sans-serif"],
  sans: ["DM Sans", "sans-serif"],
  mono: ["JetBrains Mono", "monospace"],
}
```

---

## Project Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── assets/
│   ├── fonts/
│   │   ├── DM_Sans/
│   │   ├── JetBrains_Mono/
│   │   └── Syne/
│   └── images/
│       ├── projects/
│       │   ├── project-1/   (thumbnail.webp, mockup.webp, preview.webp)
│       │   ├── project-2/
│       │   ├── project-3/
│       │   └── project-4/
│       └── certificates/    (cert-1.webp ... cert-10.webp)
├── components/
│   ├── layouts/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx       (3 sub-sections: Opening, Group1, Group2)
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Certificates.tsx
│   │   └── CTAFooter.tsx
│   ├── spline/
│   │   └── RobotScene.tsx     (Spline viewer untuk robot hero)
│   └── ui/
│       ├── Modal.tsx          (Framer Motion AnimatePresence)
│       └── TextRotate.tsx     (Animated role text slide in/out)
├── data/
│   ├── personal.ts
│   ├── project.ts
│   ├── experience.ts
│   ├── skills.ts
│   └── certificates.ts
├── hooks/
│   ├── useMousePosition.ts
│   └── useScrollAnimation.ts
└── lib/
    ├── utils.ts
    └── spline.ts              (SPLINE_SCENES URLs)
```

---

## Page Sections (Top → Bottom)

### 1. Hero Section

- Opening loading animation (minimalist, GSAP Timeline)
- Navbar: Logo | Links | Dark mode toggle
- Left: "I'm a" + `<TextRotate />` (roles slide in from top, Framer Motion AnimatePresence)
- Left: Bio text + Primary & Secondary CTA buttons
- Right: Spline Robot 3D (follow cursor, loaded via `@splinetool/react-spline`)
- Background: Dark zinc-950 with subtle sky gradient glow radial di belakang robot

### 2. About Me Section

- Simple, minimal layout
- Smooth scroll entry (Lenis + GSAP ScrollTrigger fade in)
- Short bio paragraph + foto (opsional)

### 3. Projects Section

- **Sub-section 1 (Opening)**: Judul besar "My Works", teks intro, animasi masuk
- **Sub-section 2 (Group 1)**: Parallax pinned — 2 project cards berdampingan (project id 1 & 2), efek zoom/depth masuk ke dalam saat scroll, GSAP ScrollTrigger `pin: true, scrub: true`
- **Sub-section 3 (Group 2)**: Same layout — project id 3 & 4
- Setiap card: thumbnail, title, tech stack tags, link live site + GitHub

### 4. Experience Section

- Timeline vertical dengan scroll animation
- GSAP ScrollTrigger: line draw SVG + card fade in per item
- Work experience dipisahkan dari organization experience

### 5. Skills Section

- Spline 3D scene untuk tool icons (floating/rotating)
- Grid atau orbital layout untuk hard skills per kategori
- Soft skills sebagai badge sederhana

### 6. Certificates & Awards Section

- Grid 2x2 atau masonry layout
- Card dengan thumbnail sertifikat
- Klik card → modal popup (Framer Motion AnimatePresence)
- Badge rank (1st, 2nd, 3rd, Honorable Mention)

### 7. CTA Footer

- Big typography: "Let's Work Together" atau sejenisnya
- Email + social links
- Copyright

---

## Animation Guidelines

### GSAP Conventions

```ts
// ScrollTrigger default settings
ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
  start: "top 80%",
});

// Parallax project sections
gsap.to(".project-scene", {
  scrollTrigger: {
    trigger: ".project-section",
    pin: true,
    scrub: true,
    start: "top top",
    end: "bottom top",
  },
  scale: 1.4,
  ease: "none",
});
```

### Lenis Setup

```ts
// main.tsx atau App.tsx
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Connect Lenis ke GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

### Framer Motion — TextRotate

```tsx
// components/ui/TextRotate.tsx
// AnimatePresence mode="wait"
// initial: { y: -40, opacity: 0 }
// animate: { y: 0, opacity: 1 }
// exit: { y: 40, opacity: 0 }
// Interval: 2500ms per role
```

### Mobile Strategy

```ts
// Matikan animasi berat di mobile
const isMobile = window.innerWidth < 768

// Di CSS
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## Spline Integration

```ts
// src/lib/spline.ts
export const SPLINE_SCENES = {
  robot: "https://prod.spline.design/HJgO4Jrzayy3PDPj/scene.splinecode",
  skills: "", // update setelah scene skills selesai
};
```

```tsx
// components/spline/RobotScene.tsx
import Spline from "@splinetool/react-spline";
import { SPLINE_SCENES } from "@/lib/spline";
import { useState } from "react";

export default function RobotScene() {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-zinc-500 text-sm animate-pulse">
            Loading...
          </span>
        </div>
      )}
      <Spline scene={SPLINE_SCENES.robot} onLoad={() => setIsLoaded(true)} />
    </div>
  );
}
```

---

## Data Files Location

```
src/data/personal.ts      → info diri, kontak, pendidikan, roles
src/data/project.ts       → 4 projects dengan group & position
src/data/experience.ts    → work & organization experience
src/data/skills.ts        → hard skills per kategori + soft skills
src/data/certificates.ts  → 10 achievements/certificates
```

> Semua konten UI diambil dari data files ini. Jangan hardcode teks langsung di komponen.

---

## Package List

```bash
# Core
npm create vite@latest . -- --template react-ts
npm install

# Styling
npm install tailwindcss @tailwindcss/vite

# Animation
npm install gsap @gsap/react
npm install framer-motion

# Smooth Scroll
npm install lenis

# 3D / Spline
npm install @splinetool/react-spline

# Routing
npm install react-router-dom

# Utilities
npm install clsx tailwind-merge
```

---

## Coding Conventions

- Semua komponen dalam **PascalCase** (`HeroSection.tsx`)
- Semua hooks dalam **camelCase** dengan prefix `use` (`useScrollAnimation.ts`)
- Data files menggunakan **named exports**, bukan default export
- Gunakan **path alias** `@/` untuk semua import dari `src/`
- Tidak ada hardcode teks di JSX — semua dari `src/data/`
- Gunakan **`clsx` + `tailwind-merge`** untuk conditional classNames
- Animasi GSAP selalu dibersihkan di `useEffect` cleanup (`ctx.revert()`)
- Setiap Spline component wajib punya **loading state**

---

## Owner

```
Name    : Muhammad Fadhlillah Gymnastiar
Email   : fadhligymnastiar99@gmail.com
GitHub  : github.com/jymnastiar
LinkedIn: linkedin.com/in/jymnastiar
```
