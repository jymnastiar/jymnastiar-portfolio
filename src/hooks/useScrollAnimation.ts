import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ScrollAnimationOptions {
  /** Elements to animate — CSS selector string or element ref */
  targets: string | Element | Element[] | null;
  /** From-vars for gsap.fromTo */
  from?: gsap.TweenVars;
  /** To-vars for gsap.fromTo */
  to?: gsap.TweenVars;
  /** ScrollTrigger config overrides */
  scrollTrigger?: ScrollTrigger.Vars;
  /** Whether to stagger children within the scoped container */
  stagger?: number;
}

/**
 * GSAP ScrollTrigger animation hook.
 * Creates a GSAP context scoped to `containerRef` and cleans up on unmount (ctx.revert()).
 *
 * @param containerRef - Ref to the root element that scopes all GSAP selectors
 * @param options - Animation & ScrollTrigger configuration
 * @param deps - Extra dependencies to re-run animation setup
 */
export function useScrollAnimation(
  containerRef: React.RefObject<Element | null>,
  options: ScrollAnimationOptions,
  deps: unknown[] = []
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const from: gsap.TweenVars = options.from ?? {
        opacity: 0,
        y: 40,
      };
      const to: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: options.stagger ?? 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          ...options.scrollTrigger,
        },
        ...options.to,
      };

      if (options.targets) {
        gsap.fromTo(options.targets, from, to);
      }
    }, containerRef);

    ctxRef.current = ctx;

    return () => {
      ctx.revert(); // Cleanup all GSAP animations in this context
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...deps]);

  return ctxRef;
}

/**
 * Simple fade-in-up animation for a list of elements with stagger.
 * Shorthand wrapper around useScrollAnimation.
 */
export function useFadeInUp(
  containerRef: React.RefObject<Element | null>,
  selector: string = ".fade-in",
  stagger: number = 0.12,
  deps: unknown[] = []
) {
  return useScrollAnimation(
    containerRef,
    {
      targets: selector,
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      stagger,
    },
    deps
  );
}
