import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { experiences, type Experience } from "@/data/experience";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ─── Sort: work first, then organization ─────────────────────── */
const sorted = [
  ...experiences.filter((e) => e.type === "work"),
  ...experiences.filter((e) => e.type === "organization"),
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Opener text animation ──
      gsap.fromTo(
        ".experience-opener",
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

      /* ── 1. Desktop progress line scroll progress ── */
      gsap.to(".timeline-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 30%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      /* ── 2. Mobile progress line scroll progress ── */
      gsap.to(".timeline-progress-mobile", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 30%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      /* ── 3. Cards fade & slide from alternating sides ── */
      const cards = section.querySelectorAll<HTMLElement>(".timeline-card");
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-0 bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        {/* ── Section header ── */}
        <div className="mb-16 md:mb-20 text-left">
          <div className="experience-opener opacity-0 flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-sky-400 tracking-widest uppercase">
              03 / Experience
            </span>
            <div className="h-px flex-1 max-w-16 bg-zinc-800" />
          </div>

          <h2 className="experience-opener opacity-0 font-syne font-extrabold text-5xl md:text-6xl text-zinc-100 leading-none tracking-tight">
            Where I&apos;ve <span className="text-gradient">Grown</span>
          </h2>

          <p className="experience-opener opacity-0 mt-6 text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
            Work and organizational experiences that shaped my craft.
          </p>
        </div>

        {/* ── Timeline Container ── */}
        <div className="relative timeline-container">
          {/* Desktop base track (Gray line) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800/80 -translate-x-1/2" />

          {/* Desktop progress bar (Scroll-driven scaleY) */}
          <div
            className="timeline-progress hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-violet-500 to-sky-500 origin-top -translate-x-1/2"
            style={{ transform: "scaleY(0)" }}
          />

          {/* Mobile base track */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-800/80" />

          {/* Mobile progress bar */}
          <div
            className="timeline-progress-mobile md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-violet-500 to-sky-500 origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          {/* Alternate timeline cards */}
          <div className="space-y-10 md:space-y-16">
            {sorted.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItem
                  key={exp.id}
                  exp={exp}
                  index={i}
                  isLeft={isLeft}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TimelineItem ─────────────────────────────────────────────── */

function TimelineItem({
  exp,
  index,
  isLeft,
}: {
  exp: Experience;
  index: number;
  isLeft: boolean;
}) {
  const isWork = exp.type === "work";

  return (
    <div
      className={cn(
        "timeline-card relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 opacity-0",
        "pl-10 md:pl-0",
      )}
    >
      {/* Desktop center dot */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 z-10">
        {exp.current ? (
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-sky-500 ring-4 ring-zinc-950" />
          </span>
        ) : (
          <span
            className={cn(
              "flex h-3.5 w-3.5 rounded-full ring-4 ring-zinc-950",
              isWork ? "bg-sky-600" : "bg-violet-600",
            )}
          />
        )}
      </div>

      {/* Left Column (shows card if isLeft is true) */}
      <div
        className={cn(
          "hidden md:block",
          isLeft ? "pr-4" : "pointer-events-none opacity-0",
        )}
      >
        {isLeft && <ExperienceCard exp={exp} isLeft={isLeft} index={index} />}
      </div>

      {/* Right Column (shows card if isLeft is false) */}
      <div
        className={cn(
          "hidden md:block",
          !isLeft ? "pl-4" : "pointer-events-none opacity-0",
        )}
      >
        {!isLeft && <ExperienceCard exp={exp} isLeft={isLeft} index={index} />}
      </div>

      {/* Mobile Column (fallback single column) */}
      <div className="md:hidden col-span-1">
        <div className="absolute left-[10px] top-8 z-10">
          {exp.current ? (
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-sky-500 ring-4 ring-zinc-950" />
            </span>
          ) : (
            <span
              className={cn(
                "flex h-3 w-3 rounded-full ring-4 ring-zinc-950",
                isWork ? "bg-sky-600" : "bg-violet-600",
              )}
            />
          )}
        </div>
        <ExperienceCard exp={exp} isLeft={false} index={index} />
      </div>
    </div>
  );
}

/* ── ExperienceCard ───────────────────────────────────────────── */

function ExperienceCard({
  exp,
  isLeft,
  index,
}: {
  exp: Experience;
  isLeft: boolean;
  index: number;
}) {
  const isWork = exp.type === "work";
  const accentColor = index % 2 === 0 ? "sky" : "violet";

  return (
    <div
      className={cn(
        "w-full group rounded-2xl border p-5 md:p-6",
        "bg-zinc-900/50 border-zinc-800/80",
        "transition-all duration-200 ease-out",
        "hover:border-zinc-700/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50",
        isLeft ? "text-right" : "text-left",
      )}
    >
      {/* Badge + Period */}
      <div
        className={cn(
          "flex items-center gap-2 mb-3 flex-wrap",
          isLeft ? "justify-end" : "justify-start",
        )}
      >
        <span
          className={cn(
            "text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border",
            isWork
              ? "text-sky-400 border-sky-500/30 bg-sky-500/10"
              : "text-violet-400 border-violet-500/30 bg-violet-500/10",
          )}
        >
          {isWork ? "Work" : "Organization"}
        </span>

        {exp.current && (
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
            Current
          </span>
        )}

        <span className="font-mono text-[11px] text-zinc-500 bg-zinc-800/80 px-2.5 py-0.5 rounded-full">
          {exp.period}
        </span>
      </div>

      {/* Role + Company */}
      <h3
        className={cn(
          "font-syne font-bold text-lg md:text-xl text-zinc-100 leading-tight mb-1 transition-colors duration-200",
          accentColor === "sky"
            ? "group-hover:text-sky-400"
            : "group-hover:text-violet-400",
        )}
      >
        {exp.role}
      </h3>
      <p
        className={cn(
          "text-sm font-medium mb-4",
          accentColor === "sky" ? "text-sky-400" : "text-violet-400",
        )}
      >
        {exp.company}
      </p>

      {/* Bullet descriptions */}
      <ul className={cn("space-y-2", isLeft ? "text-right" : "text-left")}>
        {exp.description.map((point, idx) => (
          <li
            key={idx}
            className={cn(
              "flex items-start gap-2 text-xs md:text-sm text-zinc-400 leading-relaxed",
              isLeft ? "flex-row-reverse" : "flex-row",
            )}
          >
            <span
              className={cn(
                "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                accentColor === "sky" ? "bg-sky-600" : "bg-violet-600",
              )}
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
