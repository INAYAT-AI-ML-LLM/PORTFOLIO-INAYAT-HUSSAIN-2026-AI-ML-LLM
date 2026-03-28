"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import TextScramble from "@/components/ui/TextScramble";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { useFrameSequence } from "@/hooks/useFrameSequence";

// Dynamically import FrameCanvas — never SSR'd, never blocks initial paint
const FrameCanvas = dynamic(() => import("@/components/ui/FrameCanvas"), {
  ssr: false,
});

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Detect device type once on mount
  useEffect(() => {
    setMounted(true);
    setIsMobile(
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  // Only load frames after mount and only on non-mobile
  // Mobile gets a single optimized JPG → near-instant LCP
  const shouldLoadFrames = mounted && !isMobile;
  const { images, progress, isLoaded } = useFrameSequence(
    shouldLoadFrames ? 210 : 0,
    "/images/hero section images frame/ezgif-frame-"
  );

  const showContent = isMobile || isLoaded;

  return (
    <>
      {/* ─── PRELOADER ── desktop only, fades once 10 frames preloaded ──────── */}
      <AnimatePresence mode="wait">
        {!isMobile && !isLoaded && mounted && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#050505]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Loading portfolio"
            role="status"
          >
            <div className="flex flex-col items-center gap-6 w-full max-w-xs px-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-primary animate-pulse">
                Initiating Master Build
              </span>
              <p className="font-display text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                {progress}%
              </p>
              <div className="w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-accent-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                  style={{ boxShadow: "0 0 10px rgba(0,229,255,0.8)" }}
                />
              </div>
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                Mounting Render Pipeline…
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO SECTION ─────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative h-[100dvh] md:h-[250vh] w-full"
      >
        {/* ─── BACKGROUND ─────────────────────────────────────────────────── */}
        {mounted && (
          isMobile ? (
            /* Mobile — single frame as <Image> → fast LCP, no canvas overhead */
            <div
              className="absolute inset-0 w-full h-[100dvh] overflow-hidden bg-[#050505]"
            >
              <Image
                src="/images/hero section images frame/ezgif-frame-210.jpg"
                alt="Inayat Hussain 3D portrait"
                fill
                priority
                sizes="100vw"
                quality={85}
                className="object-cover object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80" />
            </div>
          ) : (
            isLoaded && <FrameCanvas images={images} />
          )
        )}

        {/* ─── TEXT OVERLAY ────────────────────────────────────────────────── */}
        {/*  Absolute on mobile (fits screen), Sticky on desktop (scrolls with canvas) */}
        <div
          className="absolute md:sticky left-0 w-full z-10 pointer-events-none px-6 md:px-12 flex flex-col justify-end"
          style={isMobile ? {
            bottom: "8vh",
            height: "auto",
          } : {
            top: "var(--navbar-h, 4rem)",
            height: "calc(100dvh - var(--navbar-h, 4rem))",
            marginTop: "calc(-100dvh + var(--navbar-h, 4rem))",
            paddingBottom: "10vh",
          }}
          aria-live="polite"
        >
          <div className="w-full max-w-4xl mx-auto flex flex-col items-start gap-3 md:gap-4 pointer-events-auto">

            {/* Status indicator */}
            <motion.div
              className="inline-flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-accent-primary">
                System Online
              </span>
            </motion.div>

            {/* Main name — sr-only so it doesn't duplicate 3D baked text */}
            <h1 className="sr-only">Inayat Hussain</h1>

            {/* Job title — h2 for correct heading hierarchy */}
            <motion.h2
              className="font-body font-semibold text-white/90 tracking-wide leading-tight md:leading-normal"
              style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.65rem)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={showContent ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {showContent && (
                <TextScramble text="Software Engineer | Full Stack & GenAI Specialist" speed={20} play />
              )}
            </motion.h2>

            {/* Tag line */}
            <motion.div
              className="backdrop-blur-md bg-[#050505]/60 md:bg-[#050505]/50 border-l-2 p-3 md:px-5 md:py-3 rounded-r-md mt-1 mb-2 md:mt-0 max-w-[90%]"
              style={{ borderLeftColor: "var(--accent-secondary, #b026ff)" }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={showContent ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <p className="font-mono text-[11px] md:text-sm tracking-widest text-white/70 leading-relaxed md:leading-normal">
                Building Scalable Web Solutions &amp; Intelligent AI Systems
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-row flex-wrap items-center gap-3 md:gap-4 mt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <MagneticButton>
                <a
                  href="#projects"
                  id="cta-projects"
                  className="inline-flex items-center justify-center px-5 py-3 md:px-7 md:py-3.5 neon-border bg-[#0d0d0d] text-accent-primary font-display font-bold text-[10px] md:text-xs uppercase tracking-widest rounded-full hover:bg-accent-primary hover:text-[#050505] hover:shadow-[0_0_28px_rgba(0,229,255,0.4)] transition-all duration-300"
                >
                  Enter Neural Net
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  id="cta-contact"
                  className="inline-flex items-center justify-center px-5 py-3 md:px-7 md:py-3.5 border border-white/10 text-white font-display font-bold text-[10px] md:text-xs uppercase tracking-widest rounded-full hover:border-accent-secondary hover:bg-white/5 hover:shadow-[0_0_20px_rgba(176,38,255,0.2)] transition-all duration-300"
                >
                  Initiate Contact
                </a>
              </MagneticButton>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator — only on desktop during canvas sequence */}
        {!isMobile && (
          <div className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <ScrollIndicator />
          </div>
        )}
      </section>
    </>
  );
}
