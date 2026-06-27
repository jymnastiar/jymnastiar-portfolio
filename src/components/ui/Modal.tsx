import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/data/certificates";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
}

function getRankStyle(rank?: string) {
  if (!rank) return "text-zinc-400 bg-zinc-800/50 border-zinc-700/50";
  const r = rank.toLowerCase();
  if (r.includes("1st")) {
    return "text-sky-400 bg-sky-500/10 border-sky-500/20";
  }
  if (r.includes("2nd")) {
    return "text-violet-400 bg-violet-500/10 border-violet-500/20";
  }
  if (r.includes("3rd")) {
    return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
  }
  if (r.includes("honorable") || r.includes("mention")) {
    return "text-zinc-500 bg-zinc-600/10 border-zinc-600/20";
  }
  return "text-zinc-400 bg-zinc-800/50 border-zinc-700/50";
}

export function Modal({ isOpen, onClose, certificate }: ModalProps) {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && certificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-2xl overflow-y-auto max-h-[85vh] sm:max-h-[90vh] z-10 flex flex-col focus:outline-none"
          >
            {/* Certificate Large Image / Placeholder */}
            <div className="relative w-full aspect-4/3 max-h-[40vh] sm:max-h-[50vh] bg-zinc-950 flex items-center justify-center overflow-hidden border-b border-zinc-800/60 shrink-0">
              {certificate.thumbnail ? (
                <img
                  src={certificate.thumbnail}
                  alt={certificate.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    const placeholder =
                      el.parentElement?.querySelector(".modal-placeholder");
                    if (placeholder) placeholder.classList.remove("hidden");
                  }}
                />
              ) : null}

              {/* Placeholder fallback */}
              <div
                className={cn(
                  "modal-placeholder absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/60 text-zinc-500",
                  certificate.thumbnail ? "hidden" : "",
                )}
              >
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-zinc-700 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span className="font-mono text-[10px] sm:text-xs tracking-wider">
                  No Preview Available
                </span>
              </div>

              {/* Close Button Top Right */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-600/80 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-all duration-200"
                aria-label="Close modal"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Certificate Details */}
            <div className="p-5 sm:p-6 space-y-3 sm:space-y-4 text-left overflow-y-auto">
              {certificate.rank && (
                <div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border uppercase tracking-wider",
                      getRankStyle(certificate.rank),
                    )}
                  >
                    🏆 {certificate.rank}
                  </span>
                </div>
              )}

              <h3 className="font-syne font-bold text-lg sm:text-xl md:text-2xl text-zinc-100 leading-tight">
                {certificate.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2 text-[11px] sm:text-xs md:text-sm text-zinc-400 font-mono">
                <span>Issuer: {certificate.issuer}</span>
                <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-700" />
                <span>Year: {certificate.year}</span>
                <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-700" />
                <span className="capitalize">Type: {certificate.category}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
