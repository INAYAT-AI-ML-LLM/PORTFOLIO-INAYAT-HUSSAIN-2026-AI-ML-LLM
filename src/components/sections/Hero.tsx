"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import TechTicker from "@/components/ui/TechTicker";
import FloatingElement from "@/components/ui/FloatingElement";
import dynamic from "next/dynamic";

const HeroParticles = dynamic(() => import("@/components/three/HeroParticles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-primary" />,
});

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Scroll-Swap State Machine ──
  // false = styled image showing (initial state)
  // true  = original image showing (after user scrolled past hero and came back)
  const [showOriginal, setShowOriginal] = useState(false);
  const hasScrolledPastRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // ── Precision Scroll Tracking for Image Swap ──
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // User has scrolled 100% past hero section
    if (latest >= 0.98 && !hasScrolledPastRef.current) {
      hasScrolledPastRef.current = true;
    }

    // User is scrolling back into the hero section after having left it
    if (hasScrolledPastRef.current && latest < 0.5 && !showOriginal) {
      setShowOriginal(true);
    }
  });

  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Image parallax for depth
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = nameRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.from(chars, {
          y: 80,
          opacity: 0,
          rotateX: 40,
          stagger: 0.03,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden aurora-bg"
      id="hero"
    >
      {/* Background Layers */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <HeroParticles />
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          HERO PORTRAIT - Scroll-Reactive Image Swap Engine
          ═══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute right-0 lg:right-[1%] bottom-0 w-[28%] lg:w-[25%] h-[75%] z-[2] pointer-events-none select-none hidden md:block"
        style={{ scale: imgScale, y: imgY }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Styled Image Layer */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: showOriginal ? 0 : 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src="/images/hero-styled.jpg"
            alt="Inayat - Styled Portrait"
            fill
            className="object-contain object-bottom"
            priority
            quality={95}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Original Image Layer */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: showOriginal ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src="/images/hero-original.jpg"
            alt="Inayat - Original Portrait"
            fill
            className="object-contain object-bottom"
            priority
            quality={95}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Bottom gradient fade so image melts into the section */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent pointer-events-none" />
        
        {/* Subtle neon glow ring behind portrait */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30" 
          style={{
            background: showOriginal 
              ? "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.1) 0%, transparent 70%)"
              : "radial-gradient(ellipse at 50% 60%, rgba(0,229,255,0.15) 0%, rgba(176,38,255,0.1) 50%, transparent 70%)"
          }}
        />
      </motion.div>

      {/* Floating Geometric Elements */}
      <FloatingElement
        className="absolute top-[15%] left-[10%] opacity-[0.4] hidden md:block mix-blend-screen"
        delay={0}
        duration={8}
      >
        <svg width="80" height="80" viewBox="0 0 60 60" fill="none">
          <polygon
            points="30,2 58,17 58,43 30,58 2,43 2,17"
            stroke="var(--accent-primary)"
            strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 10px rgba(0, 229, 255, 0.5))" }}
          />
        </svg>
      </FloatingElement>

      <FloatingElement
        className="absolute top-[25%] right-[12%] opacity-[0.5] hidden md:block mix-blend-screen"
        delay={2}
        duration={7}
      >
        <span className="font-mono text-5xl text-accent-secondary" style={{ filter: "drop-shadow(0 0 10px rgba(176, 38, 255, 0.5))" }}>&lt;/&gt;</span>
      </FloatingElement>

      <FloatingElement
        className="absolute bottom-[30%] left-[8%] opacity-[0.6] hidden md:block mix-blend-screen"
        delay={1}
        duration={9}
        y={15}
      >
        <div className="w-4 h-4 rounded-full bg-accent-primary shadow-[0_0_20px_rgba(0,229,255,1)]" />
      </FloatingElement>

      <FloatingElement
        className="absolute bottom-[20%] right-[15%] opacity-[0.6] hidden md:block mix-blend-screen"
        delay={3}
        duration={6}
      >
        <div className="w-3 h-3 rounded-full bg-accent-secondary shadow-[0_0_20px_rgba(176,38,255,1)]" />
      </FloatingElement>

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 text-center md:text-left px-6 md:px-12 w-full flex flex-col items-center md:items-start md:w-[52%] md:max-w-[52%] lg:w-[48%] lg:max-w-[48%] md:ml-[2%] lg:ml-[5%]"
        style={{ opacity: contentOpacity }}
      >
        {/* Name */}
        <motion.h1
          ref={nameRef}
          className="font-display font-extrabold leading-[0.9] tracking-tighter mb-4 text-gradient-primary text-glow drop-shadow-2xl"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            scale: nameScale,
            opacity: nameOpacity,
            y: nameY,
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
          }}
        >
          {PERSONAL.displayName}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-body font-light text-text-primary mb-3 max-w-2xl text-shadow-sm"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {PERSONAL.tagline}
        </motion.p>

        {/* Sub-tagline */}
        <motion.div
          className="flex items-center gap-2 mb-12 glass-card px-6 py-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="w-2 h-2 rounded-full bg-accent-success shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
          <p className="font-mono text-sm md:text-base text-text-primary tracking-wide">
            {PERSONAL.subTagline}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton>
            <a
              href="#projects"
              className="px-8 py-4 bg-accent-primary text-bg-primary font-display font-bold text-sm uppercase tracking-widest rounded-full hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] transition-all duration-300"
              data-cursor="button"
            >
              Explore Projects
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="px-8 py-4 glass-card text-text-primary font-display font-bold text-sm uppercase tracking-widest rounded-full hover:border-accent-secondary hover:shadow-[0_0_40px_rgba(176,38,255,0.3)] hover:bg-white/5 transition-all duration-300"
              data-cursor="button"
            >
              Let&apos;s Connect
            </a>
          </MagneticButton>
        </motion.div>

        {/* Tech Ticker */}
        <motion.div
          className="mt-20 w-screen max-w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <TechTicker />
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
