import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";
import { SPLINE_SCENES } from "@/lib/spline";
import { skillsByCategory, softSkills } from "@/data/skills";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_META = {
  languages: { label: "Languages" },
  frameworks: { label: "Frameworks & Libraries" },
  databases: { label: "Databases" },
  tools: { label: "Tools & Design" },
} as const;

const floatingTools = [
  { name: "React", top: "22%", left: "12%", delay: "0s", color: "bg-sky-400" },
  { name: "Next.js", top: "62%", left: "18%", delay: "-2s", color: "bg-zinc-100" },
  { name: "TypeScript", top: "30%", left: "42%", delay: "-4s", color: "bg-blue-400" },
  { name: "Python", top: "68%", left: "48%", delay: "-1s", color: "bg-yellow-400" },
  { name: "Figma", top: "18%", left: "74%", delay: "-3s", color: "bg-orange-400" },
  { name: "Node.js", top: "58%", left: "78%", delay: "-5s", color: "bg-green-400" },
  { name: "Git", top: "15%", left: "38%", delay: "-6s", color: "bg-red-400" },
  { name: "Tailwind CSS", top: "60%", left: "8%", delay: "-7s", color: "bg-sky-300" },
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [hasSplineError, setHasSplineError] = useState(false);

  const hasSplineScene = !!SPLINE_SCENES.skills;

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Opener text reveal animation ──
      gsap.fromTo(
        ".skills-opener",
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
        }
      );

      // ── Top Spline container fade in ──
      gsap.fromTo(
        ".skills-top",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-top",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Hard skills categories staggered entrance ──
      gsap.fromTo(
        ".skills-category-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Soft skills fade in ──
      gsap.fromTo(
        ".skills-soft",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-soft",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-zinc-950"
    >
      <style>{`
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(0.5deg);
          }
        }
        .animate-float-gentle {
          animation: float-gentle 7s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-20 text-left">
          <div className="skills-opener opacity-0 flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-sky-400 tracking-widest uppercase">
              04 / Skills
            </span>
            <div className="h-px flex-1 max-w-16 bg-zinc-800" />
          </div>

          <h2 className="skills-opener opacity-0 font-syne font-extrabold text-5xl md:text-6xl text-zinc-100 leading-none tracking-tight">
            My <span className="text-gradient">Toolkit</span>
          </h2>

          <p className="skills-opener opacity-0 mt-6 text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
            Technologies I work with every day, from languages and frontend frameworks to backend systems and design utilities.
          </p>
        </div>

        {/* ── Top: 3D Scene / Floating Placeholder Cloud ── */}
        <div className="skills-top opacity-0 w-full h-[400px] mb-20 relative rounded-3xl overflow-hidden bg-zinc-900/30 border border-zinc-800/60">
          {hasSplineScene && !hasSplineError ? (
            <div className="w-full h-full relative">
              {/* Spinner loader while Spline loads */}
              {!isSplineLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950/80 z-20">
                  <div className="w-8 h-8 rounded-full border-2 border-sky-500/20 border-t-sky-500 animate-spin" />
                  <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                    Loading 3D Scene...
                  </span>
                </div>
              )}
              <Spline
                scene={SPLINE_SCENES.skills}
                onLoad={() => setIsSplineLoaded(true)}
                onError={() => setHasSplineError(true)}
              />
            </div>
          ) : (
            /* Elegant Placeholder Grid of floating skill names */
            <div className="w-full h-full relative bg-radial from-zinc-950 to-zinc-900/40 flex items-center justify-center overflow-hidden">
              {/* Subtle Tech Coordinate Grid background */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(56, 189, 248, 0.15) 1.5px, transparent 1.5px)",
                  backgroundSize: "28px 28px",
                }}
              />
              
              {/* Drift ambient light behind placeholder */}
              <div
                className="absolute w-[350px] h-[350px] rounded-full opacity-[0.1] bg-sky-500/25 blur-[120px]"
                style={{ top: "10%", left: "30%" }}
              />

              {/* Floating badges */}
              {floatingTools.map((tool) => (
                <div
                  key={tool.name}
                  className="absolute px-5 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 shadow-2xl shadow-black/80 flex items-center gap-3 animate-float-gentle"
                  style={{
                    top: tool.top,
                    left: tool.left,
                    animationDelay: tool.delay,
                  }}
                >
                  <span className={cn("w-2 h-2 rounded-full shadow-lg", tool.color)} />
                  <span className="font-syne font-bold text-sm tracking-wide text-zinc-100">
                    {tool.name}
                  </span>
                </div>
              ))}

              {/* Floating Instruction overlay label */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800/80 text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                Floating Stack Cloud
              </div>
            </div>
          )}
        </div>

        {/* ── Below Spline: Hard Skills Categories ── */}
        <div className="skills-grid grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20 w-full">
          {(Object.entries(skillsByCategory) as [
            keyof typeof skillsByCategory,
            (typeof skillsByCategory)[keyof typeof skillsByCategory]
          ][]).map(([key, skills]) => {
            const meta = CATEGORY_META[key];
            return (
              <div
                key={key}
                className="skills-category-card opacity-0 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-start hover:border-zinc-700/60 transition-colors duration-300"
              >
                {/* Category Header Label */}
                <h3 className="font-syne font-bold text-xs text-zinc-500 mb-6 uppercase tracking-widest">
                  {meta.label}
                </h3>

                {/* Badge list */}
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800/80 text-zinc-100 text-sm font-medium flex items-center gap-2.5 hover:border-zinc-700 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-md shadow-sky-500/40" />
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom: Soft Skills ── */}
        <div className="skills-soft opacity-0 w-full border-t border-zinc-800/60 pt-10">
          <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-6 text-left">
            Soft Skills
          </p>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill) => (
              <span
                key={skill.name}
                className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-violet-500/20 bg-violet-500/10 text-violet-400"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
