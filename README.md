# Raj Odedara — Manga Portfolio

A **manga/shonen anime aesthetic** developer portfolio for Raj Odedara, built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.

> _"Every section is a chapter. Every project is an arc."_

---

## ✨ Features

- 🎨 **Full Manga Aesthetic** — Complete custom design system using halftone dot overlays, dynamic speed lines, thick ink borders, and speech bubbles to mimic authentic manga.
- 🌙 **Robust Dark/Light Mode** — A fully seamless dark mode built with dynamic CSS variables. The theme swaps "ink" and "paper" color paradigms instantly without any layout breaking.
- ⚡ **Single-Page Scroll & Cinematic Animations** — Built with Framer Motion for scroll-linked animations, 3D flip technique cards, and dynamic manga page wipes when navigating.
- 🔴 **"Awakening" Easter Egg** — A hidden cinematic sequence triggered by typing `raj` or clicking a hidden watermark. It plays an intense glitch animation and permanently shifts the site into a crimson "Awakened Mode" (persisted via `localStorage`).
- 🖋️ **Custom Typography** — Utilizes a mix of Bangers, Zen Dots, Noto Sans JP, and IBM Plex Mono for a true comic book feel.
- 🖱️ **Custom Ink Cursor** — A dynamic canvas-based cursor that leaves a dripping ink trail as you navigate.
- 📱 **Fully Responsive** — Mobile-first approach; manga panels stack vertically on small screens without losing their artistic layout.
- ♿ **Accessible & SEO-Optimized** — Built with accessibility in mind, supporting `prefers-reduced-motion`, WCAG contrast standards, and the Next.js Metadata API for perfect OG tags.

---

## 🗺️ Routes

| Route | Chapter | Purpose |
|---|---|---|
| `/#hero` | Chapter 0: The Cover | Hero landing page |
| `/#about` | Chapter 1: Origin Story | Bio, education, skills |
| `/#projects` | Chapter 2: Battle Arcs | 4 project arc posters |
| `/projects/[slug]` | Arc Deep Dive | Individual project story |
| `/#experience` | Chapter 3: Training Days | Work experience timeline |
| `/#contact` | Final Panel | Contact form + social links |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion & GSAP |
| Icons | Lucide React |
| Fonts | next/font/google |
| Deployment | Vercel |

---

## 🚀 Setup

1. **Environment Variables**
   Copy the example environment file and fill in your details:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Add your Formspree endpoint URL to `NEXT_PUBLIC_FORMSPREE_URL` so the contact form can send emails.*

2. **Install & Run**
   ```bash
   # Install dependencies
   npm install

   # Start dev server
   npm run dev

   # Build for production
   npm run build
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
├── app/
│   ├── layout.tsx          # Root layout (fonts, navbar, loading screen)
│   ├── page.tsx            # Single-page stitching all main sections
│   ├── globals.css         # Manga design system & dynamic variables
│   ├── scrollbar.css       # Custom scrollbar styling
│   └── projects/
│       └── [slug]/page.tsx # Dynamic individual project deep-dives
├── components/
│   ├── sections/           # Core page sections (Hero, About, Projects, Experience, Contact)
│   ├── ArcCover.tsx        # Project card styled as manga cover
│   ├── MangaTimeline.tsx   # Sepia flashback timeline for experience
│   ├── TechniqueCard.tsx   # 3D Flip card for skills display
│   ├── HalftoneOverlay.tsx # Reusable CSS dot pattern overlay
│   ├── PageTransition.tsx  # Framer Motion manga page wipe
│   ├── Navbar.tsx          # Sticky navigation + dark mode toggle
│   ├── LoadingScreen.tsx   # Intro SVG stroke-draw animation
│   └── ...                 # Other manga UI elements (SpeechBubble, SpeedLines, etc.)
├── data/
│   ├── personal.ts         # Bio, general stats, and social links
│   ├── projects.ts         # Full arc data and narratives for projects
│   ├── skills.ts           # Technique/Skill card definitions
│   └── experience.ts       # Work experience timeline data
└── public/
    └── manga/              # Static assets (portraits, SVGs, etc.)
```

---

## 🎨 Customization

### Color Palette
Edit `app/globals.css` `@theme {}` block:
```css
@theme {
  --color-manga-paper: #F5F1E8;   /* aged paper */
  --color-manga-ink: #0A0A0A;     /* ink black */
  --color-manga-red: #D62828;     /* blood red */
  --color-manga-yellow: #FFD60A;  /* highlight yellow */
  --color-manga-gray: #2B2B2B;    /* speed line gray */
}
```

### Personal Data
Update `data/personal.ts` with your actual:
- GitHub, LinkedIn, LeetCode URLs
- Email address

### Contact Form (Formspree)
The contact form uses [Formspree](https://formspree.io) to handle submissions without a backend.
1. Create a free Formspree account and a new form.
2. Get your endpoint URL (e.g. `https://formspree.io/f/your_id`).
3. Add it to your `.env.local` file as `NEXT_PUBLIC_FORMSPREE_URL=...`.

### Resume PDF
Drop your PDF at `public/resume.pdf`.

### Portrait Image
Replace `public/manga/portrait_new.png` with your own manga-style illustration or photo.

---

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect the repo to [vercel.com](https://vercel.com) for automatic deployments.

---

## 📝 Asset Credits

- Fonts: [Google Fonts](https://fonts.google.com/) — Bangers, Zen Dots, Noto Sans JP, IBM Plex Mono
- Icons: [Lucide React](https://lucide.dev/)
- Portrait: AI-generated placeholder via Antigravity — replace with your own art
- SVG assets: Hand-crafted for this portfolio

---

## 🎯 License

MIT — feel free to fork and customize for your own portfolio.
