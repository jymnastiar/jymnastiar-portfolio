import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextRotate } from "@/components/ui/TextRotate";
import RobotScene from "@/components/spline/RobotScene";
import { Navbar } from "@/components/layouts/Navbar";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";
import Spline from "@splinetool/react-spline";

export function Hero() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ── Phase 1: Loading screen ────────────────────────────
      // Name fades in
      tl.fromTo(
        ".loader-name",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      )
        // Short hold
        .to(".loader-name", { opacity: 1, duration: 0.6 })
        // Fade out the whole loader overlay
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => setLoaderDone(true),
        })

        // ── Phase 2: Stagger reveal of hero content ──────────
        // Navbar slides in from top
        .fromTo(
          ".hero-navbar",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.1",
        )
        // Tag line
        .fromTo(
          ".hero-tag",
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
          "-=0.2",
        )
        // "I'm" + TextRotate heading
        .fromTo(
          ".hero-heading",
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.2",
        )
        // Bio
        .fromTo(
          ".hero-bio",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.35",
        )
        // CTA buttons (stagger)
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3",
        )
        // Social links
        .fromTo(
          ".hero-socials",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.2",
        )
        // Robot (right side) — last
        .fromTo(
          ".hero-robot",
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Loading screen overlay ─────────────────────────────── */}
      {!loaderDone && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-950 pointer-events-none"
        >
          <p className="loader-name font-syne font-bold text-4xl md:text-6xl tracking-tight text-gradient opacity-0">
            {personal.nickname}
            <span className="text-zinc-600">.</span>
          </p>
        </div>
      )}

      {/* ── Main hero content ──────────────────────────────────── */}
      <div ref={contentRef} className="flex flex-col min-h-screen">
        {/* Navbar lives inside Hero — transparent bg */}
        <div className="hero-navbar opacity-0">
          <Navbar glassy={false} />
        </div>

        {/* ── Two-column layout ─────────────────────────────────── */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col lg:flex-row items-center gap-12 pt-8 pb-16">
          {/* ── Left side (60%) ─────────────────────────────────── */}
          <div className="flex-3 max-w-2xl space-y-7">
            {/* Available tag */}
            <div className="hero-tag opacity-0 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              <span className="font-mono text-xs text-sky-400 tracking-widest uppercase">
                Open to opportunities
              </span>
            </div>

            {/* "I'm" + TextRotate */}
            <div className="hero-heading opacity-0">
              <h1 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-zinc-100 leading-[1.1] tracking-tight">
                I'm{" "}
                <TextRotate
                  words={[
                    personal.nickname,
                    ...personal.roles.map((role) => `a ${role}`),
                  ]}
                  interval={2500}
                  className="text-gradient"
                />
              </h1>
            </div>

            {/* Bio */}
            <p className="hero-bio opacity-0 font-sans text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg">
              {personal.bio}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={cn(
                  "hero-cta opacity-0",
                  "px-6 py-3 rounded-xl font-semibold text-sm text-white",
                  "bg-sky-500 hover:bg-sky-400",
                  "transition-all duration-200",
                  "hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5",
                )}
              >
                View My Work
              </a>
              <a
                href={`mailto:${personal.email}`}
                className={cn(
                  "hero-cta opacity-0",
                  "px-6 py-3 rounded-xl font-semibold text-sm text-zinc-100",
                  "bg-zinc-800 hover:bg-zinc-700",
                  "border border-zinc-700 hover:border-zinc-600",
                  "transition-all duration-200 hover:-translate-y-0.5",
                )}
              >
                Contact Me
              </a>
            </div>

            {/* Social links */}
            <div className="hero-socials opacity-0 flex items-center gap-3 pt-1">
              <SocialLink href={personal.links.github} label="GitHub">
                <GitHubIcon />
              </SocialLink>
              <SocialLink href={personal.links.linkedin} label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href={personal.links.instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <span className="h-4 w-px bg-zinc-800" />
              <span className="font-mono text-xs text-zinc-600">
                {personal.location}
              </span>
            </div>
          </div>

          {/* ── Right side (40%) — Robot ────────────────────────── */}
          <div className="hero-robot opacity-0 flex-2 flex items-center justify-center w-full h-[440px] lg:h-[580px] relative">
            {/* Radial glow behind robot */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-25 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(14,165,233,0.5) 0%, rgba(139,92,246,0.25) 45%, transparent 70%)",
              }}
            />
            {/* <RobotScene className="relative z-10 w-full h-full" /> */}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 pb-8 text-zinc-700">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            scroll
          </span>
          <div className="w-px h-10 bg-linear-to-b from-zinc-700 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "w-9 h-9 rounded-lg flex items-center justify-center",
        "text-zinc-500 hover:text-zinc-100",
        "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700",
        "transition-all duration-200 hover:-translate-y-0.5",
      )}
    >
      {children}
    </a>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
