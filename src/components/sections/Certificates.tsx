import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { certificates, type Certificate } from "@/data/certificates";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function getRankStyle(rank?: string) {
  if (!rank) return "text-zinc-400 border-zinc-700/80 bg-zinc-800/40";
  const r = rank.toLowerCase();
  if (r.includes("1st")) {
    return "text-sky-400 border-sky-500/25 bg-sky-500/10";
  }
  if (r.includes("2nd")) {
    return "text-violet-400 border-violet-500/25 bg-violet-500/10";
  }
  if (r.includes("3rd")) {
    return "text-zinc-400 border-zinc-500/25 bg-zinc-500/10";
  }
  if (r.includes("honorable") || r.includes("mention")) {
    return "text-zinc-500 border-zinc-600/25 bg-zinc-600/10";
  }
  return "text-zinc-400 border-zinc-700/80 bg-zinc-800/40";
}

export function Certificates() {
  const containerRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Header Text Reveal ──
      gsap.fromTo(
        ".certs-opener",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Cards Stagger Fade In ──
      gsap.fromTo(
        ".cert-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".certs-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-zinc-950"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-20 text-left">
          <div className="certs-opener opacity-0 flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-sky-400 tracking-widest uppercase">
              05 / Awards
            </span>
            <div className="h-px flex-1 max-w-16 bg-zinc-800" />
          </div>

          <h2 className="certs-opener opacity-0 font-syne font-extrabold text-5xl md:text-6xl text-zinc-100 leading-none tracking-tight">
            Awards & <span className="text-gradient">Certificates</span>
          </h2>

          <p className="certs-opener opacity-0 mt-6 text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
            Recognition received from national and international competitions
            and academic events.
          </p>
        </div>

        {/* ── Grid Layout (3 columns desktop, 2 columns tablet, 1 column mobile) ── */}
        <div className="certs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {certificates.map((cert) => (
            <motion.button
              key={cert.id}
              onClick={() => setSelected(cert)}
              whileHover={{ scale: 1.012 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "cert-card cursor-pointer opacity-0 text-left w-full group relative rounded-2xl overflow-hidden",
                "bg-zinc-900/40 border border-zinc-800/80",
                "hover:border-zinc-700/60 focus:outline-none focus:ring-2 focus:ring-sky-500/50",
                "transition-colors duration-300 flex flex-col h-full",
              )}
            >
              {/* Thumbnail / Image Container (Aspect Ratio 4:3) */}
              <div className="relative w-full aspect-4/3 bg-zinc-850 shrink-0 flex items-center justify-center overflow-hidden border-b border-zinc-800/80">
                {cert.thumbnail ? (
                  <img
                    src={cert.thumbnail}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      const placeholder =
                        el.parentElement?.querySelector(".cert-placeholder");
                      if (placeholder) placeholder.classList.remove("hidden");
                    }}
                  />
                ) : null}

                {/* Standard Placeholder */}
                <div
                  className={cn(
                    "cert-placeholder absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-600",
                    cert.thumbnail ? "hidden" : "",
                  )}
                >
                  <svg
                    className="w-10 h-10 text-zinc-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent pointer-events-none" />

                {/* ID Tag */}
                <span className="absolute bottom-2 left-3 font-mono text-[10px] text-zinc-500">
                  #{cert.id.toString().padStart(2, "0")}
                </span>
              </div>

              {/* Certificate Information */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {cert.rank && (
                    <span
                      className={cn(
                        "inline-block text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                        getRankStyle(cert.rank),
                      )}
                    >
                      🏆 {cert.rank}
                    </span>
                  )}

                  <h3 className="font-syne font-bold text-base md:text-lg text-zinc-100 group-hover:text-sky-400 transition-colors duration-250 leading-snug">
                    {cert.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-zinc-800/40 flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>{cert.issuer}</span>
                  <span>{cert.year}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail Modal component */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        certificate={selected}
      />
    </section>
  );
}
