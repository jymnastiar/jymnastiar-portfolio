import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";


import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { ExperienceSection } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Certificates } from "@/components/sections/Certificates";
import { CTAFooter } from "@/components/sections/CTAFooter";
import { Footer } from "@/components/layouts/Footer";

// ── Register GSAP plugins ────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
  start: "top 80%",
});

// ── Portfolio page — single-page layout ─────────────────────
function Portfolio() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navbar is rendered inside <Hero /> — it sits at the top of the hero section */}
      <main>
        <Hero />
        <About />
        <Projects />
        <ExperienceSection />
        <Skills />
        <Certificates />
        <CTAFooter />
        <Footer />
      </main>
    </div>
  );
}

// ── App root — Lenis + GSAP ticker + React Router ────────────
export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ticker so ScrollTrigger stays in sync
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Expose lenis instance globally for Navbar smooth-anchor scrolling
    (window as Window & typeof globalThis & { lenis: Lenis }).lenis = lenis;

    return () => {
      // Cleanup on unmount
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
