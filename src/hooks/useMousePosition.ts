import { useEffect, useState } from "react";

export interface MousePosition {
  x: number; // raw pixel X
  y: number; // raw pixel Y
  normalizedX: number; // -1 to 1 from left to right
  normalizedY: number; // -1 to 1 from top to bottom
}

/**
 * Tracks mouse position globally.
 * Returns both raw pixel values and normalized (-1 to 1) values
 * useful for 3D parallax / camera rig offset calculations.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -((e.clientY / window.innerHeight) * 2 - 1);
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
