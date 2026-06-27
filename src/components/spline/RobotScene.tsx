import { useState } from "react";
import Spline from "@splinetool/react-spline";
import { SPLINE_SCENES } from "@/lib/spline";
import { cn } from "@/lib/utils";

interface RobotSceneProps {
  className?: string;
}

/**
 * Spline 3D robot viewer for the Hero section.
 *
 * Loading state: animate-pulse skeleton placeholder that fills the container.
 * On load: placeholder fades out, Spline canvas fades in (700ms transition).
 */
export default function RobotScene({ className }: RobotSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* ── animate-pulse loading placeholder ─────────────────── */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-6 z-10",
          "transition-opacity duration-500",
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        {/* Pulsing robot silhouette shape */}
        <div className="relative flex flex-col items-center gap-3 animate-pulse">
          {/* Head */}
          <div className="w-20 h-20 rounded-2xl bg-zinc-800" />
          {/* Body */}
          <div className="w-28 h-32 rounded-xl bg-zinc-800" />
          {/* Legs */}
          <div className="flex gap-3">
            <div className="w-10 h-16 rounded-lg bg-zinc-800" />
            <div className="w-10 h-16 rounded-lg bg-zinc-800" />
          </div>
        </div>

        {/* Label */}
        <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase animate-pulse">
          Loading 3D...
        </span>
      </div>

      {/* ── Spline canvas ──────────────────────────────────────── */}
      <div
        className={cn(
          "w-full h-full transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <Spline
          scene={SPLINE_SCENES.robot}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}
