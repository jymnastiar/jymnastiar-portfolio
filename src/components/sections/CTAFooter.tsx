import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function CTAFooter() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Word-by-word reveal slide up ──
      gsap.fromTo(
        ".cta-word",
        { opacity: 0, y: 110 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".cta-headline",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Fade in CTA button & social links ──
      gsap.fromTo(
        ".cta-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".cta-actions",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = ["Let's", "Work", "Together."];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 overflow-hidden bg-zinc-950"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 xl:px-16 relative z-10 text-center flex flex-col items-center justify-center">
        {/* Sub-label */}
        <div className="cta-reveal opacity-0 flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-8 bg-zinc-800" />
          <span className="font-mono text-xs text-sky-400 tracking-widest uppercase">
            06 / Get In Touch
          </span>
          <div className="h-px w-8 bg-zinc-800" />
        </div>

        {/* Giant Display Text (Slide-up effect) */}
        <h2 className="cta-headline font-syne font-extrabold text-5xl sm:text-7xl md:text-8xl text-zinc-100 leading-none tracking-tight mb-12 flex flex-wrap justify-center select-none">
          {headlineWords.map((word, idx) => (
            <span
              key={idx}
              className="inline-block overflow-hidden mr-3 sm:mr-5 md:mr-6 pb-2"
            >
              <span className="cta-word inline-block opacity-0 translate-y-[110%]">
                {idx === 2 ? (
                  <span className="text-gradient">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            </span>
          ))}
        </h2>

        {/* CTA Actions Container */}
        <div className="cta-actions w-full flex flex-col items-center gap-8">
          {/* Main Button */}
          <div className="cta-reveal opacity-0">
            <a
              href={`mailto:${personal.email}`}
              className={cn(
                "inline-flex items-center gap-3 px-8 py-4 rounded-full",
                "bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 hover:bg-sky-500/10",
                "text-zinc-100 hover:text-sky-400 font-semibold text-lg",
                "transition-all duration-300 hover:shadow-[0_0_35px_rgba(14,165,233,0.15)] group",
              )}
            >
              Get In Touch
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Secondary Social Icon Links */}
          <div className="cta-reveal opacity-0 flex items-center justify-center gap-5 mt-4">
            <a
              href={personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700/80 transition-all duration-200 hover:-translate-y-0.5"
              aria-label="GitHub Profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href={personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700/80 transition-all duration-200 hover:-translate-y-0.5"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={personal.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700/80 transition-all duration-200 hover:-translate-y-0.5"
              aria-label="Instagram Profile"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
