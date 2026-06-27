import { useState } from "react";
import { cn } from "@/lib/utils";
import { personal } from "@/data/personal";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
];

interface NavbarProps {
  /** When true, renders with a dark glass background (used post-scroll or standalone) */
  glassy?: boolean;
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = (
    window as Window &
      typeof globalThis & {
        lenis?: { scrollTo: (target: Element, opts?: object) => void };
      }
  ).lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navbar({ glassy = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // portfolio is dark-only; toggle is decorative

  return (
    <nav
      id="navbar"
      className={cn(
        "w-full z-50 transition-all duration-300",
        glassy
          ? "bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60"
          : "bg-transparent",
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex items-center justify-between h-16 md:h-18">
        {/* ── Left: Logo ───────────────────────────────────────── */}
        <a
          href="/"
          className="font-syne font-bold text-xl tracking-tight shrink-0"
          aria-label="Home"
        >
          <span className="text-gradient">{personal.nickname}</span>
          <span className="text-zinc-600">.</span>
        </a>

        {/* ── Center: Nav links (desktop) ──────────────────────── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={cn(
                  "text-sm font-medium text-zinc-400",
                  "hover:text-zinc-100 transition-colors duration-200",
                  "relative after:absolute after:left-0 after:-bottom-0.5",
                  "after:h-px after:w-0 after:bg-sky-500",
                  "after:transition-all after:duration-300 hover:after:w-full",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right: Dark mode toggle + CTA ────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          {/* Hire Me CTA */}
          <a
            href={`mailto:${personal.email}`}
            className={cn(
              "text-sm font-semibold px-4 py-2 rounded-lg",
              "bg-sky-500 hover:bg-sky-400 text-white",
              "transition-all duration-200",
              "hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5",
            )}
          >
            Hire Me
          </a>
        </div>

        {/* ── Mobile: hamburger ────────────────────────────────── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 text-zinc-400"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
        >
          <span
            className={cn(
              "block w-6 h-0.5 bg-current transition-all duration-300 origin-center",
              menuOpen && "rotate-45 translate-y-2",
            )}
          />
          <span
            className={cn(
              "block h-0.5 bg-current transition-all duration-200",
              menuOpen ? "w-0 opacity-0" : "w-4",
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 bg-current transition-all duration-300 origin-center",
              menuOpen && "-rotate-45 -translate-y-2",
            )}
          />
        </button>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────────── */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col gap-1 pt-2 pb-4 border-t border-zinc-800/60">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                scrollTo(link.href);
              }}
              className="py-2.5 text-sm text-zinc-400 hover:text-zinc-100 font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${personal.email}`}
            className="mt-2 text-sm font-semibold px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-center transition-colors duration-200"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
