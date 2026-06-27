import { personal } from "@/data/personal";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800/80 py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Copyright */}
        <span className="text-zinc-500 font-mono text-xs text-center sm:text-left">
          &copy; {currentYear} {personal.name}. All rights reserved.
        </span>

        {/* Right Side: Social Links */}
        <div className="flex items-center gap-6">
          <a
            href={personal.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-100 font-mono text-xs transition-colors duration-200"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-100 font-mono text-xs transition-colors duration-200"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
          <a
            href={personal.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-100 font-mono text-xs transition-colors duration-200"
            aria-label="Instagram Profile"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
