import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  // Fade-in animation on scroll using GSAP ScrollTrigger (starts at top 75%)
  useScrollAnimation(containerRef, {
    targets: ".fade-in",
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    stagger: 0.15,
    scrollTrigger: {
      start: "top 75%",
    },
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-zinc-950"
    >
      {/* Subtle background glow */}
      <div
        className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left Column (4 cols): Label + Profile Avatar ── */}
          <div className="lg:col-span-4 space-y-8">
            <div className="fade-in opacity-0">
              <h2 className="font-syne font-extrabold text-5xl md:text-6xl text-zinc-100 tracking-tight">
                About <span className="text-gradient">Me</span>
              </h2>
            </div>

            {/* Profile Photo Placeholder */}
            <div className="fade-in opacity-0 max-w-xs">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 group">
                <img
                  src="/profile.png"
                  alt={personal.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Overlay vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
                {/* Techy accent border glow */}
                <div className="absolute inset-0 border border-sky-500/10 group-hover:border-sky-500/30 transition-colors duration-500 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ── Right Column (8 cols): Bio + Education Card ── */}
          <div className="lg:col-span-8 space-y-8">
            {/* Bio Paragraph */}
            <p className="fade-in opacity-0 font-sans text-zinc-400 text-lg md:text-xl leading-relaxed">
              {personal.bio}
            </p>

            {/* Education Detail Card */}
            <div className="fade-in opacity-0 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne font-bold text-lg text-zinc-100">
                    Education
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Academic Background
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-5 space-y-4">
                <div>
                  <h4 className="text-zinc-200 font-semibold text-base">
                    {personal.education.institution}
                  </h4>
                  <p className="text-zinc-400 text-sm mt-1">
                    {personal.education.degree}
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    {personal.education.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    {personal.education.semester}
                  </span>
                </div>

                {/* Relevant Courses */}
                {personal.education.relevantCourses && (
                  <div className="pt-2 space-y-3">
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                      Relevant Courses
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {personal.education.relevantCourses.map((course) => (
                        <span
                          key={course}
                          className="text-xs px-3 py-1.5 rounded-full bg-zinc-950 text-zinc-300 border border-zinc-800"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
