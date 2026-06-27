import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projects, type Project } from "@/data/project";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Opener text animation ──
      gsap.fromTo(
        ".projects-opener",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Bento Cards staggered entrance ──
      gsap.fromTo(
        ".bento-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-zinc-950 py-24 md:py-32 overflow-hidden"
    >
      {/* ── Static Background Depth Patterns (Super Lightweight) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle coordinate dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(56, 189, 248, 0.15) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Ambient radial glows */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)",
            transform: "translate3d(0,0,0)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
            transform: "translate3d(0,0,0)",
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
        {/* ── Sub-section 1: Opening header ── */}
        <div className="mb-16 md:mb-20 text-left">
          <div className="projects-opener opacity-0 flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-sky-400 tracking-widest uppercase">
              02 / Projects
            </span>
            <div className="h-px flex-1 max-w-16 bg-zinc-800" />
          </div>

          <h2 className="projects-opener opacity-0 font-syne font-extrabold text-5xl md:text-6xl text-zinc-100 leading-none tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>

          <p className="projects-opener opacity-0 mt-6 text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
            A curated showcase of applications I've built, combining robust
            software architecture with clean, fluid interface designs.
          </p>
        </div>

        {/* ── Sub-section 2: Bento Grid Layout ── */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── ProjectCard Component ── */

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const isWide = idx === 0 || idx === 3;
  const isImageLeft = idx === 3;

  return (
    <motion.div
      className={cn(
        "bento-card group relative rounded-3xl overflow-hidden",
        "bg-zinc-900/90 border border-zinc-800/80",
        "transition-[border-color,box-shadow] duration-200 ease-out hover:border-zinc-700/80 hover:shadow-2xl hover:shadow-black/60",
        isWide
          ? "md:col-span-7 lg:col-span-8 min-h-[380px] md:h-[400px]"
          : "md:col-span-5 lg:col-span-4 min-h-[380px] md:h-[400px] flex flex-col",
      )}
      whileHover={{ y: -6, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
    >
      {isWide ? (
        // Wide card layout (split layout)
        <div className="grid grid-cols-1 md:grid-cols-12 h-full w-full">
          {/* Image */}
          <div
            className={cn(
              "md:col-span-5 relative h-48 md:h-full bg-zinc-850 overflow-hidden",
              isImageLeft ? "md:order-1" : "md:order-2",
            )}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                const parent = el.parentElement!;
                if (!parent.querySelector(".thumb-fallback")) {
                  const fb = document.createElement("div");
                  fb.className =
                    "thumb-fallback absolute inset-0 flex items-center justify-center bg-zinc-900";
                  fb.innerHTML = `<span class="font-syne font-bold text-zinc-700 text-6xl">${project.id.toString().padStart(2, "0")}</span>`;
                  parent.appendChild(fb);
                }
              }}
            />
            {/* Gradient mask for smooth text merge */}
            <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-zinc-950/80 via-zinc-950/10 to-transparent pointer-events-none" />
          </div>

          {/* Text */}
          <div
            className={cn(
              "md:col-span-7 p-6 md:p-8 flex flex-col justify-between h-full",
              isImageLeft ? "md:order-2" : "md:order-1",
            )}
          >
            <div className="space-y-3">
              <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                {project.date}
              </span>
              <h3 className="font-syne font-bold text-2xl text-zinc-100 group-hover:text-sky-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800/40">
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/25 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              {renderLinks(project)}
            </div>
          </div>
        </div>
      ) : (
        // Narrow card layout (vertical stack layout)
        <>
          {/* Image */}
          <div className="relative h-44 bg-zinc-850 overflow-hidden shrink-0">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                const parent = el.parentElement!;
                if (!parent.querySelector(".thumb-fallback")) {
                  const fb = document.createElement("div");
                  fb.className =
                    "thumb-fallback absolute inset-0 flex items-center justify-center bg-zinc-900";
                  fb.innerHTML = `<span class="font-syne font-bold text-zinc-700 text-6xl">${project.id.toString().padStart(2, "0")}</span>`;
                  parent.appendChild(fb);
                }
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/10 to-transparent pointer-events-none" />
            <span className="absolute top-3 right-3 font-mono text-[10px] text-zinc-400 bg-zinc-950/80 backdrop-blur-sm border border-zinc-700/50 px-2.5 py-1 rounded-full">
              {project.date}
            </span>
          </div>

          {/* Text */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="font-syne font-bold text-xl text-zinc-100 group-hover:text-sky-400 transition-colors duration-350">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800/40">
              {/* Tech Stack (Limit display on narrow screen cards for clean bento sizing) */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/25 font-mono"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-500 font-mono">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              {/* Action Links */}
              {renderLinks(project)}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ── Render Links Utility ── */

function renderLinks(project: Project) {
  return (
    <div className="flex items-center gap-3 pt-2">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Live Site
        </a>
      ) : (
        <span className="flex items-center gap-1.5 text-xs text-zinc-600 select-none">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Coming Soon
        </span>
      )}
      <div className="w-px h-4 bg-zinc-800" />
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        GitHub
      </a>
    </div>
  );
}
