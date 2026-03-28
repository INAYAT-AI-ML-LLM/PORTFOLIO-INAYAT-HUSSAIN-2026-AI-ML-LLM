"use client";
import { useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function FrameCanvas({ images }: { images: HTMLImageElement[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  // Refs — never trigger re-renders
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const rafId = useRef<number>(0);
  const isVisible = useRef(true);
  const isScrolling = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Draw one specific frame to canvas
  const drawFrame = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, index: number) => {
    const img = images[index];
    if (!img || !img.complete || img.naturalHeight === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;

    let dw: number, dh: number, dx: number, dy: number;

    // "Contain" — full image always visible, letter-boxed with #050505 bg
    if (cr > ir) {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    }

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, [images]);

  // Scroll handler — maps scroll progress to frame index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Animate during first 30% of total page scroll
    const mapped = Math.min(latest / 0.30, 1);
    targetFrame.current = Math.round(mapped * (images.length - 1));

    // Mark scrolling active and reset the idle timer
    isScrolling.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      isScrolling.current = false;
    }, 150);

    // Kick off animation loop on scroll
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  });

  // Animation loop — only runs when scrolling AND visible
  const animate = useCallback(() => {
    rafId.current = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    if (!isVisible.current) return; // Paused — canvas off screen

    // LERP to target frame
    const diff = targetFrame.current - currentFrame.current;
    if (Math.abs(diff) < 0.5) {
      // Snapped — draw exact frame and stop looping
      currentFrame.current = targetFrame.current;
      drawFrame(canvas, ctx, Math.round(currentFrame.current));
      return;
    }

    currentFrame.current += diff * 0.15;
    drawFrame(canvas, ctx, Math.round(currentFrame.current));

    // Continue loop only while frames are moving
    rafId.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ── Resize with debounce ──────────────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        // Redraw current frame after resize
        drawFrame(canvas, ctx, Math.round(currentFrame.current));
      }, 100);
    };

    // Initial size
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    // Draw the first available frame immediately so user sees something
    drawFrame(canvas, ctx, 0);

    window.addEventListener("resize", handleResize, { passive: true });

    // ── IntersectionObserver — kill rAF when off screen ───────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        // If scrolled back into view and frames are mid-animation, resume
        if (isVisible.current && !rafId.current) {
          rafId.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, drawFrame, animate]);

  return (
    <div
      className="sticky w-full overflow-hidden bg-[#050505]"
      style={{ top: "var(--navbar-h, 4rem)", height: "calc(100dvh - var(--navbar-h, 4rem))" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
      {/* Bottom fade — blends into next section */}
      <div className="absolute bottom-0 left-0 w-full h-[28vh] bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      {/* Top fade — softens edge below navbar */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#050505]/60 to-transparent pointer-events-none" />
    </div>
  );
}
